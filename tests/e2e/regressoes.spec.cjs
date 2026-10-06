const { test, expect } = require('@playwright/test');
test.beforeEach(async ({ context, page }) => {
  await context.route('https://*.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  await page.goto('/app/');
  await expect(page.locator('.home')).toBeVisible();
});
test('duplo clique e tecla repetida avançam exatamente uma etapa', async ({ page }) => {
  await page.evaluate(() => Plataforma.roteador.ir('#/licao/sql-00'));
  await expect(page.locator('.runner-contador')).toHaveText(/^1\//);
  await page.locator('.runner-acoes .btn-primario').dblclick();
  await expect(page.locator('.runner-contador')).toHaveText(/^2\//);
  await page.evaluate(() => {
    document.activeElement.blur();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', repeat: true, bubbles: true }));
  });
  await expect(page.locator('.runner-contador')).toHaveText(/^3\//);
});
test('modal impede Enter no exercício e sair conserva posição', async ({ page }) => {
  await page.evaluate(() => Plataforma.roteador.ir('#/licao/sql-00'));
  await expect(page.locator('.runner')).toBeVisible();
  await page.locator('.runner-acoes .btn-primario').click();
  await page.locator('.runner-sair').click();
  await expect(page.locator('.modal')).toBeVisible();
  await page.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })));
  await expect(page.locator('.runner-contador')).toHaveText(/^2\//);
  await page.locator('.modal').getByRole('button', { name: 'Sair', exact: true }).click();
  await expect(page.locator('.runner')).toHaveCount(0);
  await page.evaluate(() => Plataforma.roteador.ir('#/licao/sql-00'));
  await expect(page.locator('.runner-contador')).toHaveText(/^2\//);
  await page.reload();
  await expect(page.locator('.runner-contador')).toHaveText(/^2\//);
});
test('erro, nova tentativa, acerto, voltar e atualizar não duplicam XP', async ({ page }) => {
  await page.evaluate(() => Plataforma.roteador.ir('#/licao/sql-00'));
  await expect(page.locator('.runner')).toBeVisible();
  while (!(await page.locator('.passo-atividade').count())) await page.locator('.runner-acoes .btn-primario').click();
  const correct = await page.evaluate(() => {
    const step = Number(document.querySelector('.runner-contador').textContent.split('/')[0]) - 1;
    return Plataforma.interno.licoes['sql-00'].etapas[step].atividade.correta;
  });
  await page.locator(`.opcao[data-indice-original="${correct === 0 ? 1 : 0}"]`).click();
  await page.locator('.runner-acoes .btn-primario').click();
  await expect(page.locator('.feedback.errado')).toBeVisible();
  await page.locator('.runner-acoes .btn-primario').click();
  await expect(page.locator('.runner-acoes .btn-primario')).toBeDisabled();
  await page.locator(`.opcao[data-indice-original="${correct}"]`).click();
  await page.locator('.runner-acoes .btn-primario').click();
  await expect(page.locator('.feedback.correto')).toBeVisible();
  const xp = await page.evaluate(() => Plataforma.dados.estado().xp);
  await page.reload();
  await expect(page.locator('.runner')).toBeVisible();
  await page.locator(`.opcao[data-indice-original="${correct}"]`).click();
  await page.locator('.runner-acoes .btn-primario').click();
  expect(await page.evaluate(() => Plataforma.dados.estado().xp)).toBe(xp);
});
test('lição atrasada não sobrescreve a navegação mais recente', async ({ page, context }) => {
  let release;
  const wait = new Promise(resolve => { release = resolve; });
  await context.route('**/sql-00.js', async route => { await wait; await route.continue(); });
  await page.evaluate(() => Plataforma.roteador.ir('#/licao/sql-00'));
  await expect(page.getByText('Carregando lição...', { exact: true })).toBeVisible();
  await page.evaluate(() => Plataforma.roteador.ir('#/mapa'));
  await expect(page.locator('#conteudo h1')).toHaveText(/Mapa/);
  release();
  await expect.poll(() => page.evaluate(() => !!Plataforma.interno.licoes['sql-00'].etapas)).toBe(true);
  await expect(page.locator('.runner')).toHaveCount(0);
});
test('lições bloqueadas e planejadas não ganham conclusão por atalhos', async ({ page }) => {
  await page.evaluate(() => Plataforma.roteador.ir('#/licao/sql-01'));
  await expect(page.locator('.runner')).toHaveCount(0);
  await page.evaluate(() => Plataforma.roteador.ir('#/trilha/sql'));
  expect(await page.locator('.etapa.bloqueada .btn-check-etapa').count()).toBe(0);
  expect(await page.evaluate(() => Plataforma.progresso.daTrilha('linq').total)).toBe(4);
});
