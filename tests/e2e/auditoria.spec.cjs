const { test, expect } = require('@playwright/test');
const { abrir } = require('./curso-helper.cjs');
test.use({ timezoneId: 'America/Sao_Paulo' });

test.beforeEach(async ({ context }) => {
  await context.route('https://*.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
});

test('explicação mantém foco no modal e devolve ao botão de origem', async ({ page }) => {
  await abrir(page);
  await page.evaluate(() => {
    document.querySelector('.nav-item[data-rota="inicio"]').focus();
    Plataforma.ui.componentes.abrirConceito('sql.select');
  });
  const modal = page.getByRole('dialog', { name: /SELECT/i });
  await expect(modal).toBeVisible();
  for (const tecla of ['Tab', 'Tab', 'Shift+Tab']) {
    await page.keyboard.press(tecla);
    await expect(modal.getByRole('button', { name: 'Entendi' })).toBeFocused();
  }
  await page.keyboard.press('Escape');
  await expect(page.locator('.modal')).toHaveCount(0);
  await expect(page.locator('.nav-item[data-rota="inicio"]')).toBeFocused();
});

test('sincronização atrasada não substitui a página após navegar', async ({ page }) => {
  await abrir(page, '#/dados');
  await page.evaluate(() => {
    Plataforma.nuvem.sincronizar = () => new Promise(resolve => { window.finalizarSincronizacao = () => resolve({ atualizado: false }); });
  });
  await page.getByRole('button', { name: 'Sincronizar com a nuvem agora', exact: true }).click();
  await page.locator('.nav-item[data-rota="mapa"]').click();
  await expect(page.locator('#conteudo h1')).toContainText('Mapa de carreira');
  await page.evaluate(() => window.finalizarSincronizacao());
  await expect(page.locator('#conteudo h1')).toContainText('Mapa de carreira');
  await expect(page).toHaveURL(/#\/mapa$/);
});

test('tema importado e tema de outra aba são aplicados à interface', async ({ page, context }) => {
  await abrir(page);
  const outra = await context.newPage();
  await abrir(outra);
  await page.getByRole('button', { name: 'Alternar tema' }).click();
  await expect(outra.locator('html')).toHaveAttribute('data-tema', 'escuro');
  await outra.evaluate(() => {
    const dados = Plataforma.dados.exportar();
    dados.configuracoes.tema = 'claro';
    Plataforma.dados.importar(dados);
  });
  await expect(page.locator('html')).toHaveAttribute('data-tema', 'claro');
  await expect(outra.locator('html')).toHaveAttribute('data-tema', 'claro');
});

test('cabeçalhos de níveis contam somente lições publicadas', async ({ page }) => {
  await abrir(page, '#/trilha/frontend');
  const niveis = page.locator('.nivel-bloco');
  for (let i = 0; i < await niveis.count(); i++) {
    await expect(niveis.nth(i).locator('.nivel-titulo .chip')).toHaveText('Em produção');
  }
  await page.evaluate(() => Plataforma.roteador.ir('#/trilha/ingles'));
  await expect(page.locator('.nivel-bloco').filter({ has: page.locator('.etapa.planejada') }).first().locator('.nivel-titulo .chip')).toContainText(/liberadas|Em produção/);
});

test('comandos com flags diferentes e caixa incorreta são rejeitados', async ({ page }) => {
  await abrir(page);
  const resultados = await page.evaluate(() => {
    const P = Plataforma;
    const atv = { id: 'git-audit', tipo: 'write-code', conceitos: ['git.reset'], respostasAceitas: ['git reset --soft HEAD~1'] };
    const area = document.createElement('div');
    const motor = P.atividades.encontrar('write-code').render(atv, area, { marcarRespondida() {} });
    return ['git reset --soft HEAD~1', 'git reset --hard HEAD~1', 'git reset', 'GIT reset --soft HEAD~1'].map(valor => {
      area.querySelector('textarea').value = valor;
      return motor.verificar().correto;
    });
  });
  expect(resultados).toEqual([true, false, false, false]);
});

test('revisão de hoje usa a data local após a meia-noite UTC', async ({ page, context }) => {
  await page.clock.install({ time: new Date('2026-10-07T01:30:00Z') });
  await abrir(page);
  const total = await page.evaluate(() => {
    const P = Plataforma;
    P.dados.responderConceito(['sql.select'], false, false, { evento: 'erro-noturno' });
    return P.progresso.conceitosParaRevisar(true).length;
  });
  expect(total).toBe(1);
});

test('menu mobile usa teclado e telas intermediárias preservam o cabeçalho', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await abrir(page);
  await expect(page.locator('.sidebar')).not.toBeVisible();
  const menu = page.getByTitle('Abrir menu completo', { exact: true });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('.sidebar .nav-item.ativo')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button', { name: 'Alternar tema' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('.sidebar .nav-item').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(page.locator('.sidebar')).not.toBeVisible();
  await page.locator('.bottom-item[data-rota="dados"]').click();
  await menu.click();
  await expect(page.locator('.sidebar .nav-item[data-rota="dados"]')).toBeFocused();
  await page.keyboard.press('Escape');
  for (const width of [961, 980, 1024]) {
    await page.setViewportSize({ width, height: 812 });
    await expect(page.locator('.chip-nuvem')).toBeVisible();
    await expect(page.locator('.sidebar')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('nomes herdados de objetos não são aceitos como páginas do catálogo', async ({ page }) => {
  await abrir(page);
  for (const rota of ['#/licao/__proto__', '#/licao/toString', '#/trilha/constructor']) {
    await page.evaluate(rota => Plataforma.roteador.ir(rota), rota);
    await expect(page.getByRole('heading', { name: 'Página não encontrada' })).toBeVisible();
  }
});
