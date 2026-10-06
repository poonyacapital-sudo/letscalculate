const http = require('http');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const DEFAULT_SUPABASE_URL = 'https://oeoyfplweclmutgzbzll.supabase.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lb3lmcGx3ZWNsbXV0Z3piemxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyNzczOTgsImV4cCI6MjEwNjg1MzM5OH0.r8ry6Sxvi9-zP6gZnjcB288zXIBtxpvnC73nOthUgEM';

function getSupabaseConfig() {
  const rawUrl = process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const url = (rawUrl || '').replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || DEFAULT_SUPABASE_KEY;
  return { url, key, isConfigured: Boolean(url && key) };
}

async function insertSupabaseFeedback(payload) {
  const { url, key, isConfigured } = getSupabaseConfig();
  if (!isConfigured) return null;
  const res = await fetch(`${url}/rest/v1/feedbacks`, {
    method: 'POST',
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(payload)
  });
  const text = await res.text();
  let data = null;
  try { data = JSON.parse(text); } catch (e) { data = text; }
  if (!res.ok) {
    const err = new Error(data?.message || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return Array.isArray(data) ? data[0] : data;
}

async function getSupabaseFeedbacks(limit = 100) {
  const { url, key, isConfigured } = getSupabaseConfig();
  if (!isConfigured) return null;
  const res = await fetch(`${url}/rest/v1/feedbacks?select=*&order=created_at.desc&limit=${limit}`, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

const PORT = process.env.PORT || 3000;
let EXCEL_PATH = path.join(__dirname, 'letscalculate.in_data.xlsx');
if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
  EXCEL_PATH = path.join('/tmp', 'letscalculate.in_data.xlsx');
}

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=UTF-8',
  '.xml': 'application/xml; charset=UTF-8',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};

// Helper: Append Signup data to letscalculate.in_data.xlsx
function appendSignupToExcel(signupData) {
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
    'Full Name': signupData.name.trim(),
    'Mobile Number': String(signupData.mobile).trim(),
    'Email ID': signupData.email.toLowerCase().trim(),
    'Signup Date & Time': formattedDate,
    'Status': 'Active Free Member'
  };

  rows.push(newEntry);

  const newSheet = xlsx.utils.json_to_sheet(rows);
  newSheet['!cols'] = [
    { wch: 26 }, // Full Name
    { wch: 18 }, // Mobile Number
    { wch: 32 }, // Email ID
    { wch: 24 }, // Signup Date & Time
    { wch: 20 }  // Status
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
    if (writeErr.code === 'EROFS' || (writeErr.message && writeErr.message.includes('read-only'))) {
      EXCEL_PATH = path.join('/tmp', 'letscalculate.in_data.xlsx');
      xlsx.writeFile(workbook, EXCEL_PATH);
    } else {
      throw writeErr;
    }
  }

  console.log(`[EXCEL] Successfully stored signup: ${newEntry['Full Name']} (${newEntry['Mobile Number']}) in letscalculate.in_data.xlsx`);
  return newEntry;
}

// Database Setup for Feedback using Node.js Native SQLite
let DB_PATH = path.join(__dirname, 'feedback.db');
if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
  DB_PATH = path.join('/tmp', 'feedback.db');
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
  console.log('[DATABASE] SQLite Feedback table initialized at:', DB_PATH);
} catch (dbErr) {
  console.error('[DATABASE Error] Failed to initialize SQLite:', dbErr.message);
}

// Helper: Append Feedback data to letscalculate.in_data.xlsx
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
    { wch: 14 }, // ID
    { wch: 24 }, // Name
    { wch: 30 }, // Email
    { wch: 18 }, // Phone
    { wch: 45 }, // Best Here
    { wch: 45 }, // Improvements
    { wch: 24 }  // Date
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
    if (writeErr.code === 'EROFS' || (writeErr.message && writeErr.message.includes('read-only'))) {
      EXCEL_PATH = path.join('/tmp', 'letscalculate.in_data.xlsx');
      xlsx.writeFile(workbook, EXCEL_PATH);
    }
  }
}

// Security: Rate Limiting
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_POST_REQUESTS_PER_WINDOW = 15;
const ipRequestLogs = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  let clientLog = ipRequestLogs.get(ip) || [];
  clientLog = clientLog.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  ipRequestLogs.set(ip, clientLog);

  if (clientLog.length >= MAX_POST_REQUESTS_PER_WINDOW) {
    return true;
  }
  clientLog.push(now);
  return false;
}

// Security: Admin Authentication Secret
const ADMIN_API_SECRET = process.env.ADMIN_API_KEY || process.env.ADMIN_SECRET || 'letscalculate-admin-2026';

function isAuthorizedAdmin(req) {
  const authHeader = req.headers['authorization'] || '';
  if (authHeader === `Bearer ${ADMIN_API_SECRET}`) return true;

  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const tokenQuery = parsedUrl.searchParams.get('token') || parsedUrl.searchParams.get('key');
    if (tokenQuery === ADMIN_API_SECRET) return true;
  } catch (e) {}

  return false;
}

// Security: Input Sanitization
function sanitizeText(str, maxLen = 1000) {
  if (!str) return '';
  return String(str)
    .slice(0, maxLen)
    .replace(/[<>]/g, '')
    .trim();
}

// Security: HTTP Response Headers
function applySecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self';");
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
}

const server = http.createServer((req, res) => {
  applySecurityHeaders(res);

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1').split(',')[0].trim();
  let reqUrl = req.url.split('?')[0];

  // API Route: Save Signup Data to Excel
  if (reqUrl === '/api/signup' && req.method === 'POST') {
    if (isRateLimited(clientIp)) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Too many requests. Please wait a few minutes before trying again.' }));
      return;
    }

    let body = '';
    let bodyTooLarge = false;
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 65536) {
        bodyTooLarge = true;
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Payload too large. Maximum 64KB allowed.' }));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (bodyTooLarge) return;
      try {
        const payload = JSON.parse(body || '{}');
        let { name, mobile, email, password } = payload;
        name = sanitizeText(name, 100);
        email = sanitizeText(email, 100);

        // Mandatory validations
        if (!name || name.trim().length < 2) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Full name is mandatory (at least 2 characters).' }));
          return;
        }

        const cleanMobile = String(mobile || '').replace(/\D/g, '');
        if (!cleanMobile || cleanMobile.length !== 10) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Valid 10-digit mobile number is mandatory.' }));
          return;
        }

        if (!email || !email.includes('@') || !email.includes('.')) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Valid email address is mandatory.' }));
          return;
        }

        if (!password || password.length < 8) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Password must be at least 8 characters long.' }));
          return;
        }

        const entry = appendSignupToExcel({ name, mobile: cleanMobile, email });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Signup data stored in letscalculate.in_data.xlsx',
          entry
        }));
      } catch (err) {
        console.error('[API Error] /api/signup:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to record signup: ' + err.message }));
      }
    });
    return;
  }

  // API Route: Download Excel File (Protected by Admin Auth)
  if (reqUrl === '/api/download-excel' || reqUrl === '/letscalculate.in_data.xlsx') {
    if (!isAuthorizedAdmin(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Admin authentication token required to download spreadsheet data.' }));
      return;
    }

    let targetPath = EXCEL_PATH;
    if (!fs.existsSync(targetPath) && fs.existsSync(path.join('/tmp', 'letscalculate.in_data.xlsx'))) {
      targetPath = path.join('/tmp', 'letscalculate.in_data.xlsx');
    }
    if (fs.existsSync(targetPath)) {
      const data = fs.readFileSync(targetPath);
      res.writeHead(200, {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="letscalculate.in_data.xlsx"'
      });
      res.end(data);
      return;
    }
    // Generate fresh workbook with headers if not yet created
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet([]);
    ws['!cols'] = [
      { wch: 26 },
      { wch: 18 },
      { wch: 32 },
      { wch: 24 },
      { wch: 20 }
    ];
    xlsx.utils.book_append_sheet(wb, ws, 'Signups');
    const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
    res.writeHead(200, {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="letscalculate.in_data.xlsx"'
    });
    res.end(buffer);
    return;
  }

  // API Route: Get Signups as JSON (Protected by Admin Auth)
  if (reqUrl === '/api/signups' && req.method === 'GET') {
    if (!isAuthorizedAdmin(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Admin authentication token required to access signups list.' }));
      return;
    }

    try {
      let targetPath = EXCEL_PATH;
      if (!fs.existsSync(targetPath) && fs.existsSync(path.join('/tmp', 'letscalculate.in_data.xlsx'))) {
        targetPath = path.join('/tmp', 'letscalculate.in_data.xlsx');
      }
      if (!fs.existsSync(targetPath)) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ signups: [] }));
        return;
      }
      const wb = xlsx.readFile(targetPath);
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = xlsx.utils.sheet_to_json(sheet);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ signups: rows }));
      return;
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
      return;
    }
  }

  // API Route: Submit Feedback (with Rate Limiting, Body Size Limit, Sanitization & SQLite storage)
  if (reqUrl === '/api/feedback' && req.method === 'POST') {
    if (isRateLimited(clientIp)) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Too many requests. Please wait a few minutes before submitting feedback again.' }));
      return;
    }

    let body = '';
    let bodyTooLarge = false;
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 65536) {
        bodyTooLarge = true;
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Payload too large. Maximum 64KB allowed.' }));
        req.destroy();
      }
    });
    req.on('end', async () => {
      if (bodyTooLarge) return;
      try {
        const payload = JSON.parse(body || '{}');
        let { name, email, phone_number, best_here, improvements } = payload;

        name = sanitizeText(name, 60);
        email = sanitizeText(email, 100).toLowerCase();
        phone_number = sanitizeText(phone_number, 20);
        best_here = sanitizeText(best_here, 2000);
        improvements = sanitizeText(improvements, 2000);

        // 1. Validation: Name (only alphabets, required)
        if (!name) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Name is required.' }));
          return;
        }
        if (!/^[A-Za-z\s]+$/.test(name)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Name must contain only alphabets and spaces, no numbers or special characters.' }));
          return;
        }

        // 2. Validation: Email (valid email format, required)
        if (!email) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email is required.' }));
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Please enter a valid email format (e.g. example@example.com).' }));
          return;
        }

        // 3. Validation: Phone Number (10 digits only, required)
        if (!phone_number) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Phone number is required.' }));
          return;
        }
        if (!/^\d{10}$/.test(phone_number)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Phone number must be exactly 10 digits, numeric only.' }));
          return;
        }

        // 4. Validation: What is best here (minimum 10 characters, required)
        if (!best_here) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'What is best here is required.' }));
          return;
        }
        if (best_here.length < 10) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'What is best here must be at least 10 characters.' }));
          return;
        }

        // 5. Validation: Improvements (optional, minimum 10 characters if filled)
        if (improvements && improvements.length < 10) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'What can be improved must be at least 10 characters if filled.' }));
          return;
        }

        let insertedId = null;

        // 1. If Supabase is configured, save directly to cloud PostgreSQL table
        if (getSupabaseConfig().isConfigured) {
          try {
            const sbResult = await insertSupabaseFeedback({ name, email, phone_number, best_here, improvements });
            insertedId = sbResult?.id || insertedId;
          } catch (sbErr) {
            if (sbErr.status === 409 || (sbErr.message && (sbErr.message.includes('duplicate key') || sbErr.message.includes('UNIQUE')))) {
              res.writeHead(409, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Feedback from this email address has already been submitted. Thank you!' }));
              return;
            }
            console.warn('[Supabase Warning]:', sbErr.message);
          }
        }

        // 2. Save to SQLite Database using Prepared Statement (SQL Injection safe)
        if (db) {
          try {
            const stmt = db.prepare(`
              INSERT INTO Feedback (name, email, phone_number, best_here, improvements)
              VALUES (?, ?, ?, ?, ?)
            `);
            const info = stmt.run(name, email, phone_number, best_here, improvements || null);
            insertedId = insertedId || Number(info.lastInsertRowid);
          } catch (dbErr) {
            if (dbErr.message && (dbErr.message.includes('UNIQUE constraint failed') || dbErr.message.includes('Feedback.email'))) {
              res.writeHead(409, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Feedback from this email address has already been submitted. Thank you!' }));
              return;
            }
            console.warn('[SQLite Warning]:', dbErr.message);
          }
        }

        // 3. Append to Excel Sheet for spreadsheet reporting
        try {
          appendFeedbackToExcel({ id: insertedId, name, email, phone_number, best_here, improvements });
        } catch (excelErr) {
          console.warn('[EXCEL Warning] Could not append feedback to excel:', excelErr.message);
        }

        console.log(`[FEEDBACK] Recorded from: ${name} (${email}) - ID: ${insertedId}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Thank you for your feedback!',
          id: insertedId,
          source: getSupabaseConfig().isConfigured ? 'supabase' : (db ? 'sqlite' : 'excel')
        }));
      } catch (err) {
        console.error('[API Error] /api/feedback:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to record feedback: ' + err.message }));
      }
    });
    return;
  }

  // API Route: Get Feedbacks list (Protected by Admin Auth)
  if (reqUrl === '/api/feedbacks' && req.method === 'GET') {
    if (!isAuthorizedAdmin(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Admin authentication token required to access feedback submissions.' }));
      return;
    }

    if (getSupabaseConfig().isConfigured) {
      try {
        const rows = await getSupabaseFeedbacks();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ feedbacks: rows, source: 'supabase' }));
        return;
      } catch (sbErr) {
        console.warn('[Supabase Warning]: Failed to fetch feedbacks:', sbErr.message);
      }
    }

    if (db) {
      try {
        const rows = db.prepare('SELECT * FROM Feedback ORDER BY submitted_at DESC').all();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ feedbacks: rows, source: 'sqlite' }));
        return;
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ feedbacks: [], source: 'none' }));
      return;
    }
  }

  // 1. Prevent Directory Traversal and Null Byte Injection
  if (reqUrl.includes('\0') || reqUrl.includes('..')) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request');
    return;
  }

  // 2. Deny access to sensitive files, database, source code, internal configs & directories
  const lowerUrl = reqUrl.toLowerCase();
  const isBlocked = 
    lowerUrl.startsWith('/.') || 
    lowerUrl.includes('.db') || 
    lowerUrl.includes('.sqlite') || 
    lowerUrl.includes('.xlsx') || 
    lowerUrl.includes('.xls') || 
    lowerUrl.includes('package') || 
    lowerUrl.includes('server.js') || 
    lowerUrl.includes('build-bundle.js') || 
    lowerUrl.includes('node_modules') || 
    lowerUrl.includes('/scratch') || 
    lowerUrl.includes('/api') || 
    lowerUrl.includes('/brain') || 
    lowerUrl.endsWith('.md');

  if (isBlocked) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Access Denied');
    return;
  }

  // Static File Serving
  if (reqUrl === '/') reqUrl = '/index.html';
  const filePath = path.resolve(__dirname, '.' + reqUrl);

  // Security: Prevent directory traversal outside web root
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Access Denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA hash routing or 404
      const fallback = path.join(__dirname, 'index.html');
      fs.readFile(fallback, (err2, content) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err3, data) => {
      if (err3) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
        return;
      }
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`letscalculate.in server running at http://localhost:${PORT}`);
  console.log(`Excel file target: ${EXCEL_PATH}`);
});
