// Vercel Serverless Function: /api/feedbacks
const https = require('https');
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
  // SQLite optional
}

const DEFAULT_SUPABASE_URL = 'https://oeoyfplweclmutgzbzll.supabase.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lb3lmcGx3ZWNsbXV0Z3piemxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyNzczOTgsImV4cCI6MjEwNjg1MzM5OH0.r8ry6Sxvi9-zP6gZnjcB288zXIBtxpvnC73nOthUgEM';

function getSupabaseConfig() {
  const rawUrl = process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const url = (rawUrl || '').replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || DEFAULT_SUPABASE_KEY;
  return { url, key, isConfigured: Boolean(url && key) };
}

function fetchSupabaseFeedbacks(limit = 100) {
  return new Promise((resolve, reject) => {
    const { url, key, isConfigured } = getSupabaseConfig();
    if (!isConfigured) return resolve(null);

    try {
      const parsedUrl = new URL(`${url}/rest/v1/feedbacks?select=*&order=created_at.desc&limit=${limit}`);
      const req = https.request({
        hostname: parsedUrl.hostname,
        port: 443,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'GET',
        headers: {
          'apikey': key,
          'Authorization': 'Bearer ' + key,
          'Accept': 'application/json'
        }
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            const data = JSON.parse(body || '[]');
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(Array.isArray(data) ? data : []);
            } else {
              reject(new Error(`Supabase error (${res.statusCode})`));
            }
          } catch (e) {
            resolve([]);
          }
        });
      });

      req.on('error', err => reject(err));
      req.end();
    } catch (e) {
      reject(e);
    }
  });
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

  if (getSupabaseConfig().isConfigured) {
    try {
      const rows = await fetchSupabaseFeedbacks();
      res.status(200).json({ feedbacks: rows, source: 'supabase' });
      return;
    } catch (sbErr) {
      console.warn('[Supabase Warning]: Failed to fetch from Supabase:', sbErr.message);
    }
  }

  if (db) {
    try {
      const rows = db.prepare('SELECT * FROM Feedback ORDER BY submitted_at DESC').all();
      res.status(200).json({ feedbacks: rows, source: 'sqlite' });
      return;
    } catch (err) {
      // Table might not exist yet if no feedback submitted
      res.status(200).json({ feedbacks: [], source: 'sqlite' });
      return;
    }
  }

  res.status(200).json({ feedbacks: [], source: 'none' });
};
