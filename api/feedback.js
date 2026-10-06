// Vercel Serverless Function: /api/feedback
const fs = require('fs');
const https = require('https');
const path = require('path');
const xlsx = require('xlsx');

let DB_PATH = path.join(__dirname, '..', 'feedback.db');
let EXCEL_PATH = path.join(__dirname, '..', 'letscalculate.in_data.xlsx');

if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
  DB_PATH = path.join('/tmp', 'feedback.db');
  EXCEL_PATH = path.join('/tmp', 'letscalculate.in_data.xlsx');
}

// Optional SQLite connection (active only in persistent server environments)
let db = null;
if (!process.env.VERCEL && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
  try {
    const sqliteMod = 'node:sqlite';
    const sqlite = module.require ? module.require(sqliteMod) : require(sqliteMod);
    if (sqlite && sqlite.DatabaseSync) {
      db = new sqlite.DatabaseSync(DB_PATH);
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
    }
  } catch (e) {
    // SQLite not available in this environment
  }
}

// Supabase PostgREST Client (Native HTTPS - 100% Serverless & Zero Dependency)
function getSupabaseConfig() {
  const url = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || '';
  return { url, key, isConfigured: Boolean(url && key) };
}

function postToSupabase(endpoint, payload) {
  return new Promise((resolve, reject) => {
    const { url, key, isConfigured } = getSupabaseConfig();
    if (!isConfigured) return resolve(null);

    try {
      const parsedUrl = new URL(`${url}/rest/v1/${endpoint}`);
      const data = JSON.stringify(payload);

      const req = https.request({
        hostname: parsedUrl.hostname,
        port: 443,
        path: parsedUrl.pathname + (parsedUrl.search || ''),
        method: 'POST',
        headers: {
          'apikey': key,
          'Authorization': 'Bearer ' + key,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
          'Content-Length': Buffer.byteLength(data)
        }
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(body || '{}');
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(Array.isArray(parsed) ? parsed[0] : parsed);
            } else {
              const err = new Error(parsed.message || `Supabase error (${res.statusCode})`);
              err.status = res.statusCode;
              reject(err);
            }
          } catch (parseErr) {
            resolve(null);
          }
        });
      });

      req.on('error', (err) => reject(err));
      req.write(data);
      req.end();
    } catch (err) {
      reject(err);
    }
  });
}

// Append Feedback data to Excel (Backup)
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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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
      try { payload = JSON.parse(payload); } catch (e) {}
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

    // 1. If Supabase is configured, save directly to cloud PostgreSQL table
    if (getSupabaseConfig().isConfigured) {
      try {
        const sbResult = await postToSupabase('feedbacks', {
          name: name.trim(),
          email: cleanEmail,
          phone_number: String(phone_number).trim(),
          best_here: best_here.trim(),
          improvements: improvements?.trim() || null
        });
        insertedId = sbResult?.id || insertedId;
      } catch (sbErr) {
        if (sbErr.status === 409 || (sbErr.message && (sbErr.message.includes('duplicate key') || sbErr.message.includes('UNIQUE')))) {
          res.status(409).json({ error: 'Feedback from this email address has already been submitted. Thank you!' });
          return;
        }
        console.warn('[Supabase Warning]: Could not insert feedback into Supabase:', sbErr.message);
      }
    }

    // 2. Save to local SQLite (if available)
    if (db) {
      try {
        const stmt = db.prepare(`
          INSERT INTO Feedback (name, email, phone_number, best_here, improvements)
          VALUES (?, ?, ?, ?, ?)
        `);
        const info = stmt.run(name.trim(), cleanEmail, String(phone_number).trim(), best_here.trim(), improvements?.trim() || null);
        insertedId = insertedId || Number(info.lastInsertRowid);
      } catch (dbErr) {
        if (dbErr.message && (dbErr.message.includes('UNIQUE constraint failed') || dbErr.message.includes('Feedback.email'))) {
          res.status(409).json({ error: 'Feedback from this email address has already been submitted. Thank you!' });
          return;
        }
        console.warn('[SQLite Warning]:', dbErr.message);
      }
    }

    // 3. Append to Excel (if available)
    try {
      appendFeedbackToExcel({
        id: insertedId,
        name: name.trim(),
        email: cleanEmail,
        phone_number: String(phone_number).trim(),
        best_here: best_here.trim(),
        improvements: improvements?.trim() || null
      });
    } catch (excelErr) {
      console.warn('[Excel Warning]:', excelErr.message);
    }

    res.status(200).json({
      success: true,
      message: 'Thank you for your feedback!',
      id: insertedId,
      source: getSupabaseConfig().isConfigured ? 'supabase' : (db ? 'sqlite' : 'excel')
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record feedback: ' + err.message });
  }
};
