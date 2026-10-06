// Vercel Serverless Function: /api/feedback
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const https = require('https');

function getSupabaseConfig() {
  let hostname = 'tjkjyjrjolooivcnqvll.supabase.co';
  if (process.env.SUPABASE_URL) {
    try {
      const u = new URL(process.env.SUPABASE_URL);
      hostname = u.hostname;
    } catch (e) {}
  } else if (process.env.SUPABASE_HOST) {
    hostname = process.env.SUPABASE_HOST;
  }

  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || [
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqa2p5anJqb2xvb2l2Y25xdmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyODM0MzgsImV4cCI6MjEwNjg1OTQzOH0',
    'jymQpw1wX9DjBILWvhFi1dE69HhSRgWZ1-VoL_TnNWE'
  ].join('.');

  return { hostname, key };
}

function appendFeedbackToSupabase(fbData) {
  return new Promise((resolve) => {
    try {
      const { hostname, key } = getSupabaseConfig();
      const payload = JSON.stringify({
        name: fbData.name,
        email: fbData.email,
        phone_number: fbData.phone_number,
        best_here: fbData.best_here,
        improvements: fbData.improvements || null
      });

      const req = https.request({
        hostname: hostname,
        port: 443,
        path: '/rest/v1/feedbacks',
        method: 'POST',
        timeout: 4000,
        headers: {
          'apikey': key,
          'Authorization': 'Bearer ' + key,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          resolve(res.statusCode >= 200 && res.statusCode < 300);
        });
      });

      req.on('timeout', () => { req.destroy(); resolve(false); });
      req.on('error', () => resolve(false));
      req.write(payload);
      req.end();
    } catch (e) {
      resolve(false);
    }
  });
}


let DB_PATH = path.join(__dirname, '..', 'feedback.db');
let EXCEL_PATH = path.join(__dirname, '..', 'letscalculate.in_data.xlsx');

if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
  DB_PATH = path.join('/tmp', 'feedback.db');
  EXCEL_PATH = path.join('/tmp', 'letscalculate.in_data.xlsx');
}

let db = null;
try {
  const { DatabaseSync } = require('node:sqlite');
  db = new DatabaseSync(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS Feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR NOT NULL,
      email VARCHAR UNIQUE NOT NULL,
      phone_number VARCHAR NOT NULL,
      best_here TEXT NOT NULL,
      improvements TEXT,
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
} catch (e) {
  console.warn('[SQLite Init Warning]:', e.message);
}

// Append Feedback data to Excel
function appendFeedbackToExcel(fbData) {
  let workbook;
  try {
    if (fs.existsSync(EXCEL_PATH)) {
      workbook = xlsx.readFile(EXCEL_PATH);
    } else {
      workbook = xlsx.utils.book_new();
    }
  } catch (e) {
    workbook = xlsx.utils.book_new();
  }

  const sheetName = 'Feedback';
  let sheet = workbook.Sheets ? workbook.Sheets[sheetName] : null;
  let rows = [];
  if (sheet) {
    rows = xlsx.utils.sheet_to_json(sheet);
  }

  const now = new Date();
  const formattedDate = now.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const newEntry = {
    'Feedback ID': fbData.id || (rows.length + 1),
    'Full Name': fbData.name,
    'Email Address': fbData.email,
    'Phone Number': fbData.phone_number,
    'What is Best Here': fbData.best_here,
    'Improvements or Additions': fbData.improvements || 'N/A',
    'Submitted At': formattedDate
  };

  rows.push(newEntry);

  const newSheet = xlsx.utils.json_to_sheet(rows);
  newSheet['!cols'] = [
    { wch: 14 },
    { wch: 24 },
    { wch: 30 },
    { wch: 18 },
    { wch: 45 },
    { wch: 45 },
    { wch: 24 }
  ];

  if (!workbook.Sheets) workbook.Sheets = {};
  workbook.Sheets[sheetName] = newSheet;
  if (!workbook.SheetNames) workbook.SheetNames = [];
  if (!workbook.SheetNames.includes(sheetName)) {
    workbook.SheetNames.push(sheetName);
  }

  try {
    xlsx.writeFile(workbook, EXCEL_PATH);
  } catch (e) {
    console.warn('[Excel Write Warning]:', e.message);
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    let payload = req.body;
    if (typeof payload === 'string') {
      try { payload = JSON.parse(payload); } catch(e) {}
    }
    const { name, email, phone_number, best_here, improvements } = payload || {};

    // 1. Validation: Name (alphabets only)
    if (!name || !name.trim()) {
      res.status(400).json({ error: 'Name is required.' });
      return;
    }
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name.trim())) {
      res.status(400).json({ error: 'Name must contain only alphabets and spaces, no numbers or special characters.' });
      return;
    }

    // 2. Validation: Email (valid format)
    if (!email || !email.trim()) {
      res.status(400).json({ error: 'Email is required.' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      res.status(400).json({ error: 'Please enter a valid email format (e.g. example@example.com).' });
      return;
    }

    // 3. Validation: Phone Number (10 digits only)
    if (!phone_number) {
      res.status(400).json({ error: 'Phone number is required.' });
      return;
    }
    if (!/^\d{10}$/.test(String(phone_number).trim())) {
      res.status(400).json({ error: 'Phone number must be exactly 10 digits, numeric only.' });
      return;
    }

    // 4. Validation: Best Here (min 10 chars)
    if (!best_here || best_here.trim().length < 10) {
      res.status(400).json({ error: 'What is best here must be at least 10 characters.' });
      return;
    }

    // 5. Validation: Improvements (optional, min 10 chars if filled)
    if (improvements && improvements.trim().length > 0 && improvements.trim().length < 10) {
      res.status(400).json({ error: 'What can be improved must be at least 10 characters if filled.' });
      return;
    }

    const cleanEmail = email.toLowerCase().trim();
    let insertedId = null;

    if (db) {
      try {
        const stmt = db.prepare(`
          INSERT INTO Feedback (name, email, phone_number, best_here, improvements)
          VALUES (?, ?, ?, ?, ?)
        `);
        const info = stmt.run(name.trim(), cleanEmail, String(phone_number).trim(), best_here.trim(), improvements?.trim() || null);
        insertedId = Number(info.lastInsertRowid);
      } catch (dbErr) {
        if (dbErr.message && (dbErr.message.includes('UNIQUE constraint failed') || dbErr.message.includes('Feedback.email'))) {
          res.status(409).json({ error: 'Feedback from this email address has already been submitted. Thank you!' });
          return;
        }
        throw dbErr;
      }
    }

    await appendFeedbackToSupabase({ name: name.trim(), email: cleanEmail, phone_number: String(phone_number).trim(), best_here: best_here.trim(), improvements: improvements?.trim() || null });

    appendFeedbackToExcel({
      id: insertedId,
      name: name.trim(),
      email: cleanEmail,
      phone_number: String(phone_number).trim(),
      best_here: best_here.trim(),
      improvements: improvements?.trim() || null
    });

    res.status(200).json({
      success: true,
      message: 'Thank you for your feedback!',
      id: insertedId
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record feedback: ' + err.message });
  }
};
