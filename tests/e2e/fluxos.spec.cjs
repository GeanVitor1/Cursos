const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
test.beforeEach(async ({ context, page }) => {
  await context.route('https://*.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  await page.addInitScript(() => { performance.setResourceTimingBufferSize(2000); });
});
const { abrir, fazerLicao } = require('./curso-helper.cjs');
test('todas as páginas e trilhas em desktop e mobile', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await abrir(page);
  const ids = await page.evaluate(() => Object.keys(Plataforma.interno.trilhas));
  for (const width of [1280, 375, 320]) {
    await page.setViewportSize({ width, height: 812 });
    for (const route of ['/', '/mapa', '/revisao', '/certificacoes', '/projetos', '/entrevistas', '/dados', '/glossario', '/nivelamento', ...ids.map(id => '/trilha/' + id)]) {
      await page.evaluate(route => Plataforma.roteador.ir('#' + route), route);
      await expect(page.locator('#conteudo')).not.toBeEmpty();
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    fs.mkdirSync('.gstack/qa-reports/screenshots', { recursive: true });
    await page.evaluate(() => Promise.all(document.getAnimations().map(a => a.finished)));
    await page.screenshot({ path: `.gstack/qa-reports/screenshots/trilha-${width}-after.png`, fullPage: true });
  }
  expect(errors).toEqual([]);
});
test('SQL completo por cliques únicos, persistência e replay sem XP duplicado', async ({ page }) => {
  test.setTimeout(600000);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await abrir(page);
  const ids = await page.evaluate(() => Plataforma.progresso.daTrilha('sql').comLicao.map(e => e.licao));
  for (const id of ids) await fazerLicao(page, id);
  const xp = await page.evaluate(() => Plataforma.dados.estado().xp);
  await page.reload();
  await expect(page.locator('.app-shell')).toBeVisible();
  expect(await page.evaluate(() => Plataforma.progresso.daTrilha('sql').percentual)).toBe(100);
  await fazerLicao(page, ids[0]);
  expect(await page.evaluate(() => Plataforma.dados.estado().xp)).toBe(xp);
  expect(errors).toEqual([]);
});
const vm = require('node:vm');
let catalogo;
vm.runInNewContext(fs.readFileSync('data/catalogo.js', 'utf8'), { Plataforma: { registrarCatalogo: c => { catalogo = c; } } });
test.describe('lições publicadas', () => {
  test.describe.configure({ mode: 'parallel' });
  for (const meta of catalogo.licoes.filter(l => l.disponivel && l.trilha !== 'sql')) {
    test(meta.id + ' completa por cliques únicos', async ({ page }) => {
      test.setTimeout(180000);
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await abrir(page);
      await page.evaluate(id => {
        const state = Plataforma.dados.exportar();
        state.licoes = {};
        for (const l of Object.values(Plataforma.interno.licoes)) if (l.disponivel && l.id !== id) state.licoes[l.id] = { status: 'concluida', concluidaEm: '2026-01-01T00:00:00Z' };
        Plataforma.dados.importar(state, true);
      }, meta.id);
      await fazerLicao(page, meta.id);
      expect(errors).toEqual([]);
    });
  }
});
