// Vercel Serverless Function: /api/signup
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const EXCEL_PATH = path.join('/tmp', 'letscalculate.in_data.xlsx');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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
    } catch(e) {
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

    xlsx.writeFile(workbook, EXCEL_PATH);

    res.status(200).json({
      success: true,
      message: 'Signup data recorded successfully in letscalculate.in_data.xlsx',
      entry
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record signup: ' + err.message });
  }
};
