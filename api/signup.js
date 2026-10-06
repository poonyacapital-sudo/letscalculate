// Vercel Serverless Function: /api/signup
const fs = require('fs');
const https = require('https');
const path = require('path');
const xlsx = require('xlsx');

const EXCEL_PATH = path.join('/tmp', 'letscalculate.in_data.xlsx');

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
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });

      req.on('error', () => resolve(false));
      req.write(data);
      req.end();
    } catch (e) {
      resolve(false);
    }
  });
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
      try { payload = JSON.parse(payload); } catch (e) {}
    }
    const { name, mobile, email, password } = payload || {};

    if (!name || name.trim().length < 2) {
      res.status(400).json({ error: 'Full name is mandatory (at least 2 characters).' });
      return;
    }

    const cleanMobile = String(mobile || '').replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length !== 10) {
      res.status(400).json({ error: 'Valid 10-digit mobile number is mandatory.' });
      return;
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      res.status(400).json({ error: 'Valid email address is mandatory.' });
      return;
    }

    if (!password || password.length < 8) {
      res.status(400).json({ error: 'Password must be at least 8 characters long.' });
      return;
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

    const entry = {
      'Full Name': name.trim(),
      'Mobile Number': cleanMobile,
      'Email ID': email.toLowerCase().trim(),
      'Signup Date & Time': formattedDate,
      'Status': 'Active Free Member'
    };

    // Append to Excel in /tmp
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

    const sheetName = (workbook.SheetNames && workbook.SheetNames.length > 0) ? workbook.SheetNames[0] : 'Signups';
    let sheet = workbook.Sheets ? workbook.Sheets[sheetName] : null;
    let rows = [];
    if (sheet) {
      rows = xlsx.utils.sheet_to_json(sheet);
    }
    rows.push(entry);

    const newSheet = xlsx.utils.json_to_sheet(rows);
    newSheet['!cols'] = [
      { wch: 26 },
      { wch: 18 },
      { wch: 32 },
      { wch: 24 },
      { wch: 20 }
    ];

    if (!workbook.Sheets) workbook.Sheets = {};
    workbook.Sheets[sheetName] = newSheet;
    if (!workbook.SheetNames) workbook.SheetNames = [];
    if (!workbook.SheetNames.includes(sheetName)) {
      workbook.SheetNames.push(sheetName);
    }

    try {
      xlsx.writeFile(workbook, EXCEL_PATH);
    } catch (writeErr) {
      // Ignored in read-only environments
    }

    // If Supabase is configured, record to cloud signups table
    if (getSupabaseConfig().isConfigured) {
      try {
        await postToSupabase('signups', {
          name: name.trim(),
          mobile: cleanMobile,
          email: email.toLowerCase().trim(),
          status: 'Active Free Member'
        });
      } catch (sbErr) {
        console.warn('[Supabase Warning]: Could not insert signup into Supabase:', sbErr.message);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Signup data recorded successfully',
      entry,
      database: getSupabaseConfig().isConfigured ? 'supabase' : 'excel'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record signup: ' + err.message });
  }
};
