// Vercel Serverless Function: /api/signup
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
    const { name, mobile, email, password } = req.body || {};

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

    res.status(200).json({
      success: true,
      message: 'Signup data recorded successfully',
      entry
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error: ' + err.message });
  }
};
