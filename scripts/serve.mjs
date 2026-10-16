import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const page = new URL('../src/index.html', import.meta.url);
const port = Number(process.env.PORT || 4173);
createServer(async (request, response) => {
  const path = new URL(request.url, 'http://127.0.0.1').pathname;
  if (!['/', '/index.html'].includes(path)) {
    response.writeHead(404); response.end('Not Found'); return;
  }
  try {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(await readFile(page));
  } catch {
    response.writeHead(500); response.end('Unable to load page');
  }
}).listen(port, '127.0.0.1', () => console.log(`http://127.0.0.1:${port}`));
