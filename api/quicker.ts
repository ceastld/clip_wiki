// Minimal proxy for Quicker action info
// Keep it simple: forward GET to upstream and return body as-is with CORS headers
export default async function handler(req: any, res: any): Promise<void> {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  // Read id from query
  const id = String(req.query.id ?? '').trim();
  if (!id) {
    res.status(400).json({ error: 'missing id' });
    return;
  }

  const targetUrl = `https://getquicker.net/open/api/actions/getactioninfo?id=${encodeURIComponent(id)}`;
  try {
    const upstream = await fetch(targetUrl, { headers: { Accept: 'application/json,text/plain,*/*' } });
    const bodyText = await upstream.text();
    const contentType = upstream.headers.get('content-type') || 'application/json; charset=utf-8';
    res.setHeader('Content-Type', contentType);
    res.status(upstream.status).send(bodyText);
  } catch {
    res.status(502).json({ error: 'upstream failed' });
  }
}


