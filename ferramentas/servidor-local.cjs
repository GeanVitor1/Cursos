const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' };

function criarServidor(diretorio = root) {
  const raiz = fs.realpathSync.native(diretorio);
  const dentro = target => {
    const relativa = path.relative(raiz, target);
    return relativa !== '..' && !relativa.startsWith('..' + path.sep) && !path.isAbsolute(relativa);
  };
  const privado = pathname => pathname.split(/[\\/]/).filter(Boolean).some(p => p.startsWith('.') || ['node_modules', 'tests', 'ferramentas', 'test-results', 'playwright-report'].includes(p.toLowerCase()));
  return http.createServer(async (req, res) => {
    let pathname;
    try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
    catch { res.writeHead(400).end(); return; }
    if (/[:\0]/.test(pathname)) { res.writeHead(400).end(); return; }
    if (privado(pathname)) {
      res.writeHead(403).end(); return;
    }
    let target = path.resolve(raiz, '.' + pathname);
    if (!dentro(target)) { res.writeHead(403).end(); return; }
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }).end(); return; }
    try {
      if ((await fs.promises.stat(target)).isDirectory()) target = path.join(target, 'index.html');
      target = await fs.promises.realpath(target);
      if (!dentro(target) || privado(path.relative(raiz, target))) { res.writeHead(403).end(); return; }
      const stat = await fs.promises.stat(target);
      if (!stat.isFile()) { res.writeHead(404).end(); return; }
      const tipo = types[path.extname(target).toLowerCase()] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': tipo + (/^(text\/|application\/json)/.test(tipo) ? '; charset=utf-8' : ''),
        'Content-Length': stat.size,
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Cache-Control': 'no-cache',
      });
      if (req.method === 'HEAD') { res.end(); return; }
      const stream = fs.createReadStream(target);
      stream.on('error', () => res.destroy());
      res.on('close', () => stream.destroy());
      stream.pipe(res);
    } catch { res.writeHead(404).end(); }
  });
}

if (require.main === module) criarServidor().listen(Number(process.env.PORT || 8080), '127.0.0.1');
module.exports = { criarServidor };
