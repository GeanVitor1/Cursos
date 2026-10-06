const { chromium } = require('playwright');
const fs = require('node:fs');
(async () => {
  fs.mkdirSync('.gstack/qa-reports/screenshots', { recursive: true });
  const browser = await chromium.launch();
  const results = [];
  for (const [name, url, delay] of [
    ['local', 'http://127.0.0.1:8080/app/', 0],
    ['local-latencia', 'http://127.0.0.1:8080/app/', 40],
    ['vercel', 'https://cursos-azure.vercel.app/app/index.html', 0]
  ]) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    // Never send mutations to the real, shared Supabase row during QA.
    await context.route('https://*.supabase.co/**', route => route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
    if (delay) await context.route('**/*.js', async route => { await new Promise(r => setTimeout(r, delay)); await route.continue(); });
    const start = Date.now();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.locator('.home').waitFor({ timeout: 120000 });
    const readyMs = Date.now() - start;
    const resources = await page.evaluate(() => performance.getEntriesByType('resource').map(r => ({ name: r.name, ms: r.duration, bytes: r.transferSize })));
    await page.screenshot({ path: `.gstack/qa-reports/screenshots/${name}-before.png`, fullPage: true });
    await page.evaluate(() => Plataforma.roteador.ir('#/licao/sql-00'));
    await page.locator('.runner').waitFor();
    const next = page.locator('.runner-acoes .btn-primario');
    for (let i = 0; i < 20; i++) {
      if (!(await page.locator('.runner').count()) || errors.length) break;
      if (await page.locator('.passo-atividade').count()) break;
      await next.click();
    }
    await page.screenshot({ path: `.gstack/qa-reports/screenshots/${name}-exercise-before.png`, fullPage: true });
    results.push({ name, readyMs, requests: resources.length, bytes: resources.reduce((n, r) => n + r.bytes, 0), errors });
    console.log(results.at(-1));
    await context.close();
  }
  fs.writeFileSync('.gstack/qa-reports/baseline.json', JSON.stringify(results, null, 2));
  await browser.close();
})();
