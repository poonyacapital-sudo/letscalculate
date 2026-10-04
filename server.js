const http = require('http');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

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

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let reqUrl = req.url.split('?')[0];

  // API Route: Save Signup Data to Excel
  if (reqUrl === '/api/signup' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const { name, mobile, email, password } = payload;

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

  // API Route: Download Excel File
  if (reqUrl === '/api/download-excel' || reqUrl === '/letscalculate.in_data.xlsx') {
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

  // API Route: Get Signups as JSON
  if (reqUrl === '/api/signups' && req.method === 'GET') {
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

  // Static File Serving
  if (reqUrl === '/') reqUrl = '/index.html';
  const filePath = path.join(__dirname, reqUrl);

  // Security: prevent directory traversal
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
