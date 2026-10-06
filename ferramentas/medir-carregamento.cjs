const { chromium } = require('playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
async function servir(directory) {
  const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    const file = path.join(directory, pathname === '/app/' ? '/app/index.html' : pathname);
    const type = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' }[path.extname(file)] || 'application/octet-stream';
    fs.readFile(file, (e, data) => { res.writeHead(e ? 404 : 200, { 'Content-Type': type + '; charset=utf-8' }); res.end(e ? '' : data); });
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return server;
}
(async () => {
  const browser = await chromium.launch();
  const servers = [];
  const results = [];
  try {
    for (const [label, directory, delay] of [
      ['antes-local', path.join(root, '.gstack/qa-reports/original'), 0],
      ['antes-latencia40', path.join(root, '.gstack/qa-reports/original'), 40],
      ['depois-local', root, 0],
      ['depois-latencia40', root, 40]
    ]) {
      if (!fs.existsSync(path.join(directory, 'app/index.html'))) continue;
      const server = await servir(directory); servers.push(server);
      const context = await browser.newContext();
      await context.addInitScript(() => performance.setResourceTimingBufferSize(2000));
      await context.route('https://*.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
      if (delay) await context.route('**/*.js', async r => { await new Promise(resolve => setTimeout(resolve, delay)); await r.continue(); });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      const start = Date.now();
      await page.goto(`http://127.0.0.1:${server.address().port}/app/`);
      await page.locator('.home').waitFor({ timeout: 120000 });
      const ms = Date.now() - start;
      const metrics = await page.evaluate(() => {
        const r = performance.getEntriesByType('resource');
        return { requests: r.length, bytes: r.reduce((n, v) => n + v.transferSize, 0), lessonRequests: r.filter(v => v.name.includes('/licoes/')).length };
      });
      results.push({ label, ms, ...metrics, errors });
      console.log(results.at(-1));
      await page.screenshot({ path: '.gstack/qa-reports/screenshots/' + label + '.png', fullPage: true });
      await context.close();
    }
    fs.writeFileSync('.gstack/qa-reports/performance.json', JSON.stringify(results, null, 2));
  } finally { await browser.close(); for (const server of servers) server.close(); }
})();
