// Vercel Serverless Function: /api/download-excel
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const EXCEL_PATH = path.join('/tmp', 'letscalculate.in_data.xlsx');

const ADMIN_SECRET = process.env.ADMIN_API_KEY || process.env.ADMIN_SECRET || 'letscalculate-admin-2026';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const token = req.query?.token || req.query?.key || (req.headers.authorization || '').replace('Bearer ', '');
  if (token !== ADMIN_SECRET) {
    res.status(401).json({ error: 'Unauthorized: Admin authentication token required.' });
    return;
  }

  let buffer;
  if (fs.existsSync(EXCEL_PATH)) {
    buffer = fs.readFileSync(EXCEL_PATH);
  } else {
    // Generate empty workbook with structure
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
    buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
  }

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="letscalculate.in_data.xlsx"');
  res.status(200).send(buffer);
};
