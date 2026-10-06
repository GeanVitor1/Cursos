const { test, expect } = require('@playwright/test');
const { abrir, fazerLicao, resposta } = require('./curso-helper.cjs');
test.beforeEach(async ({ context }) => {
  await context.route('https://*.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
});
test('menu, navegação, tema, glossário, backup e nivelamento', async ({ page }) => {
  await abrir(page);
  for (const selector of ['mapa', 'certificacoes', 'projetos', 'entrevistas', 'glossario', 'nivelamento', 'dados']) {
    if (selector === 'nivelamento') { await page.locator('.nav-item[data-rota="trilha-ingles"]').click(); await page.getByRole('button', { name: 'Fazer teste de nivelamento', exact: true }).click(); }
    else await page.locator(`.nav-item[data-rota="${selector}"]`).click();
    await expect(page).toHaveURL(new RegExp('#/' + selector));
    if (selector === 'glossario') { await page.locator('summary').click(); await expect(page.locator('details')).toHaveAttribute('open', ''); }
  }
  await page.getByRole('button', { name: 'Alternar tema' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-tema', 'escuro');
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exportar progresso', exact: true }).click();
  expect((await download).suggestedFilename()).toBe('progresso.json');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.locator('.bottom-nav button[data-rota="inicio"]').click();
  await expect(page.locator('.home')).toBeVisible();
  await page.getByTitle('Abrir menu completo', { exact: true }).click();
  await expect(page.locator('.app-shell')).toHaveClass(/menu-aberto/);
  await page.locator('.nav-item[data-rota="dados"]').click();
  await expect(page.locator('.app-shell')).not.toHaveClass(/menu-aberto/);
});
for (const width of [320, 375]) test('exercícios e conclusão acessíveis em ' + width + 'px', async ({ page }) => {
  test.setTimeout(180000);
  await page.setViewportSize({ width, height: 812 });
  await abrir(page);
  for (const id of ['sql-00', 'terminal-00', 'en-a1-00']) await fazerLicao(page, id);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: '.gstack/qa-reports/screenshots/conclusao-mobile-' + width + '.png', fullPage: true });
});
test('nivelamento termina sem XP e permite escolher o nível', async ({ page }) => {
  await abrir(page, '#/nivelamento');
  await page.getByRole('button', { name: 'Começar o teste', exact: true }).click();
  const etapas = await page.evaluate(() => Plataforma.interno.nivelamento.etapas);
  for (const e of etapas) {
    if (e.tipo === 'atividade') {
      await resposta(page, e.atividade);
      await page.locator('.runner-acoes .btn-primario').click();
      await expect(page.locator('.feedback.correto')).toBeVisible();
    }
    await page.locator('.runner-acoes .btn-primario').click();
  }
  await expect(page.locator('#conteudo h1')).toHaveText(/Seu nível estimado/);
  expect(await page.evaluate(() => Plataforma.dados.estado().xp)).toBe(0);
  await page.getByRole('button', { name: 'Quero começar do A1 mesmo assim' }).click();
  expect(await page.evaluate(() => Plataforma.dados.obterNivelIngles())).toBe('A1');
});
test('falha de arquivo permite tentar novamente sem pular a atividade', async ({ page, context }) => {
  let failures = 1;
  await context.route('**/sql-00.js', r => failures-- > 0 ? r.fulfill({ status: 404, body: '' }) : r.continue());
  await abrir(page);
  await page.locator('.home').getByRole('button', { name: 'Começar etapa', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Não foi possível carregar a lição' })).toBeVisible();
  await page.getByRole('button', { name: 'Tentar novamente', exact: true }).click();
  await expect(page.locator('.runner-contador')).toHaveText(/^1\//);
});
test('redirecionamento da raiz preserva a rota e URL inválida mostra erro navegável', async ({ page }) => {
  await page.goto('/#/mapa');
  await expect(page.locator('#conteudo h1')).toHaveText(/Mapa/);
  await page.evaluate(() => { location.hash = '#/trilha/%E0%A4%A'; });
  await expect(page.getByRole('heading', { name: 'Página não encontrada' })).toBeVisible();
  await page.getByRole('button', { name: 'Voltar ao início' }).click();
  await expect(page.locator('.home')).toBeVisible();
});

test('navegação renderiza uma vez e preserva voltar e avançar do navegador', async ({ page }) => {
  await abrir(page);
  const versao = await page.evaluate(() => Plataforma.roteador.versao());
  await page.locator('.nav-item[data-rota="mapa"]').click();
  await expect(page.locator('#conteudo h1')).toHaveText(/Mapa/);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  expect(await page.evaluate(() => Plataforma.roteador.versao())).toBe(versao + 1);
  await page.locator('.nav-item[data-rota="dados"]').click();
  await expect(page).toHaveURL(/#\/dados$/);
  await page.goBack();
  await expect(page.locator('#conteudo h1')).toHaveText(/Mapa/);
  await page.goForward();
  await expect(page).toHaveURL(/#\/dados$/);
  await expect(page.getByRole('button', { name: 'Exportar progresso', exact: true })).toBeVisible();
});

test('atualização de progresso em segundo plano preserva o menu mobile aberto', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await abrir(page);
  await page.getByTitle('Abrir menu completo', { exact: true }).click();
  await expect(page.locator('.app-shell')).toHaveClass(/menu-aberto/);
  await page.evaluate(() => Plataforma.dados.adicionarXp(1, 'etapa:menu:0'));
  await expect(page.locator('.rodape-stats')).toContainText('1 XP');
  await expect(page.locator('.app-shell')).toHaveClass(/menu-aberto/);
  await page.locator('.nav-item[data-rota="dados"]').click();
  await expect(page.locator('.app-shell')).not.toHaveClass(/menu-aberto/);
  await expect(page.locator('#conteudo h1')).toHaveText('Meu progresso');
});
