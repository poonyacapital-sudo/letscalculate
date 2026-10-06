// Vercel Serverless Function: /api/feedbacks
const path = require('path');

let DB_PATH = path.join(__dirname, '..', 'feedback.db');
if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
  DB_PATH = path.join('/tmp', 'feedback.db');
}

let db = null;
try {
  const { DatabaseSync } = require('node:sqlite');
  db = new DatabaseSync(DB_PATH);
} catch (e) {
  console.warn('[SQLite Init Warning]:', e.message);
}

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

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  if (db) {
    try {
      const rows = db.prepare('SELECT * FROM Feedback ORDER BY submitted_at DESC').all();
      res.status(200).json({ feedbacks: rows });
      return;
    } catch (err) {
      // Table might not exist yet if no feedback submitted
      res.status(200).json({ feedbacks: [] });
      return;
    }
  }

  res.status(200).json({ feedbacks: [] });
};
