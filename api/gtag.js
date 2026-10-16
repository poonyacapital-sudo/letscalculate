const https = require('https');

module.exports = (req, res) => {
  const gaId = req.query.id || 'G-VXBDESQ0E4';
  const targetUrl = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;

  https.get(targetUrl, (proxyRes) => {
    res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(proxyRes.statusCode || 200);
    proxyRes.pipe(res);
  }).on('error', (err) => {
    console.error('[GA Proxy Error]:', err.message);
    res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
    res.status(200).send('/* GA Proxy Fallback */ window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}');
  });
};
