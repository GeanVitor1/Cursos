const { test, expect } = require('@playwright/test');
test('início aparece mesmo com a nuvem pendente', async ({ context, page }) => {
  let release;
  const hold = new Promise(resolve => { release = resolve; });
  await context.route('https://*.supabase.co/**', async route => { await hold; await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }); });
  await page.goto('/app/');
  await expect(page.locator('.home')).toBeVisible({ timeout: 3000 });
  await expect(page.locator('.chip-nuvem')).toHaveText(/Baixando/);
  release();
  await expect(page.locator('.chip-nuvem')).toHaveText(/Sincronizado/);
});
test('HTTP 503 é informado sem falso sucesso e sem perder XP local', async ({ context, page }) => {
  await context.route('https://*.supabase.co/**', route => route.fulfill({ status: 503, body: 'unavailable' }));
  await page.goto('/app/#/dados');
  await expect(page.locator('.chip-nuvem')).toHaveText(/Offline/);
  await page.evaluate(() => Plataforma.dados.adicionarXp(10, 'etapa:teste:0'));
  await page.getByRole('button', { name: 'Sincronizar com a nuvem agora' }).click();
  await expect(page.locator('.toast.erro')).toContainText('Falha na sincronização');
  expect(await page.evaluate(() => Plataforma.dados.estado().xp)).toBe(10);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('trilha-net.estado.v1')).xp)).toBe(10);
});
test('salvamentos são serializados e incorporam progresso durante a requisição', async ({ context, page }) => {
  let stored = null, writes = 0, concurrent = 0, maxConcurrent = 0, entered;
  let release;
  const first = new Promise(resolve => { entered = resolve; });
  const hold = new Promise(resolve => { release = resolve; });
  await context.route('https://*.supabase.co/**', async route => {
    if (route.request().method() === 'POST') {
      writes++; concurrent++; maxConcurrent = Math.max(maxConcurrent, concurrent);
      if (writes === 1) { entered(); await hold; }
      stored = route.request().postDataJSON().dados;
      await route.fulfill({ status: 201, body: '' });
      concurrent--;
    } else await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(stored ? [{ dados: stored }] : []) });
  });
  await page.goto('/app/');
  await expect(page.locator('.home')).toBeVisible();
  await page.evaluate(() => { Plataforma.dados.adicionarXp(10, 'etapa:teste:0'); Plataforma.nuvem.salvarRemoto(null, true); });
  await first;
  await page.evaluate(() => { Plataforma.dados.adicionarXp(10, 'etapa:teste:1'); Plataforma.nuvem.salvarRemoto(null, true); });
  release();
  await expect.poll(() => stored?.xp).toBe(20);
  await expect(page.locator('.chip-nuvem')).toHaveText(/Sincronizado/);
  expect(maxConcurrent).toBe(1);
  expect(await page.evaluate(() => Plataforma.dados.estado().xp)).toBe(20);
});
test('zerar progresso não volta a trazer o estado antigo da nuvem', async ({ context, page }) => {
  const old = { xp: 100, licoes: { 'sql-00': { status: 'concluida', concluidaEm: '2026-01-01' } }, streak: { dias: [] } };
  await context.route('https://*.supabase.co/**', route => route.fulfill({ status: 200, contentType: 'application/json', body: route.request().method() === 'GET' ? JSON.stringify([{ dados: old }]) : '' }));
  await page.goto('/app/#/dados');
  await expect(page.locator('.chip-nuvem')).toHaveText(/Sincronizado/);
  await page.getByRole('button', { name: 'Zerar progresso', exact: true }).click();
  await page.locator('.modal').getByRole('button', { name: 'Zerar progresso', exact: true }).click();
  await expect.poll(() => page.evaluate(() => Plataforma.dados.estado().xp)).toBe(0);
  await page.evaluate(() => Plataforma.nuvem.sincronizar());
  expect(await page.evaluate(() => Plataforma.dados.estado().xp)).toBe(0);
});
