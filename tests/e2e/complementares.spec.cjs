const { test, expect } = require('@playwright/test');
const { abrir, fazerLicao, resposta } = require('./curso-helper.cjs');

test.beforeEach(async ({ context }) => {
  await context.route('https://*.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
});

test('backup importado pela interface restaura lição e XP; arquivo inválido preserva os dados', async ({ page }) => {
  await abrir(page);
  await fazerLicao(page, 'sql-00');
  await page.locator('.nav-item[data-rota="dados"]').click();
  const original = await page.evaluate(() => Plataforma.dados.exportar());
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exportar progresso', exact: true }).click();
  const file = await (await download).path();
  await page.getByRole('button', { name: 'Zerar progresso', exact: true }).click();
  await page.locator('.modal').getByRole('button', { name: 'Zerar progresso', exact: true }).click();
  expect(await page.evaluate(() => Plataforma.dados.estado().xp)).toBe(0);
  await page.locator('input[type="file"]').setInputFiles(file);
  await expect(page.locator('.toast.sucesso').filter({ hasText: 'Progresso importado' })).toBeVisible();
  expect(await page.evaluate(() => Plataforma.dados.estado().xp)).toBe(original.xp);
  expect(await page.evaluate(() => Plataforma.dados.estaConcluida('sql-00'))).toBe(true);
  await page.locator('input[type="file"]').setInputFiles({ name: 'invalido.json', mimeType: 'application/json', buffer: Buffer.from('{"xp":-10}') });
  await expect(page.locator('.toast.erro')).toContainText('Falha ao importar');
  await page.reload();
  await expect(page.locator('.app-shell')).toBeVisible();
  expect(await page.evaluate(() => Plataforma.dados.estado().xp)).toBe(original.xp);
  expect(await page.evaluate(() => Plataforma.dados.estaConcluida('sql-00'))).toBe(true);
});

test('revisão carrega exercícios sob demanda, conclui e registra prática sem concluir a lição', async ({ page }) => {
  await abrir(page);
  await page.evaluate(() => {
    const P = Plataforma;
    const id = P.interno.licoes['sql-00'].conceitos[0];
    P.dados.responderConceito([id], false, false, { evento: 'qa:revisao' });
    const iniciar = P.ui.runner.iniciar;
    P.ui.runner.iniciar = function (options) {
      window.qaEtapasRevisao = options.etapas;
      return iniciar(options);
    };
    P.roteador.ir('#/revisao/3/hoje');
  });
  await expect(page.locator('.runner')).toBeVisible();
  const etapas = await page.evaluate(() => window.qaEtapasRevisao);
  expect(etapas.length).toBeGreaterThan(0);
  expect(etapas.length).toBeLessThanOrEqual(3);
  for (let i = 0; i < etapas.length; i++) {
    await expect(page.locator('.runner-contador')).toHaveText(`${i + 1}/${etapas.length}`);
    await resposta(page, etapas[i].atividade);
    await page.locator('.runner-acoes .btn-primario').click();
    await expect(page.locator('.feedback.correto')).toBeVisible();
    await page.locator('.runner-acoes .btn-primario').click();
  }
  await expect(page.locator('.conclusao')).toBeVisible();
  expect(await page.evaluate(() => Plataforma.dados.estaConcluida('sql-00'))).toBe(false);
  expect(await page.evaluate(() => Plataforma.dados.estado().xp)).toBeGreaterThan(0);
  const xp = await page.evaluate(() => Plataforma.dados.estado().xp);
  await page.reload();
  await expect(page.locator('.app-shell')).toBeVisible();
  expect(await page.evaluate(() => Plataforma.dados.estado().xp)).toBe(xp);
});

test('sessão, dicas, explicação e revelação respondem com um clique e não repetem XP', async ({ page }) => {
  await abrir(page);
  for (const minutos of [5, 15, 30, 60]) {
    await page.locator('.sessao-opcao').filter({ hasText: new RegExp(' ' + minutos + ' minutos') }).click();
    await page.evaluate(() => Plataforma.dados.importar(Plataforma.dados.exportar(), true));
    await expect(page.locator('.sessao-opcao.ativa')).toContainText(minutos + ' minutos');
  }
  await page.getByRole('button', { name: 'Iniciar sessão', exact: true }).click();
  await expect(page.locator('.runner')).toBeVisible();
  expect(await page.evaluate(() => Plataforma.sessao.info().minutos)).toBe(60);
  await page.getByTitle('Encerrar sessão', { exact: true }).click();
  expect(await page.evaluate(() => Plataforma.sessao.ativa())).toBe(false);
  while (!(await page.locator('.passo-atividade').count())) await page.locator('.runner-acoes .btn-primario').click();
  await page.getByRole('button', { name: 'Preciso de uma dica', exact: true }).click();
  await expect(page.locator('.caixa-dica')).toBeVisible();
  await page.getByRole('button', { name: /Ver explicação do tema/ }).click();
  await expect(page.locator('.modal')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.modal')).toHaveCount(0);
  const indice = await page.evaluate(() => Number(document.querySelector('.runner-contador').textContent.split('/')[0]) - 1);
  const atividade = await page.evaluate(i => Plataforma.interno.licoes['sql-00'].etapas[i].atividade, indice);
  for (let tentativa = 0; tentativa < 2; tentativa++) {
    await page.locator(`[data-indice-original="${atividade.correta === 0 ? 1 : 0}"]`).click();
    await page.locator('.runner-acoes .btn-primario').click();
    await expect(page.locator('.feedback.errado')).toBeVisible();
    if (tentativa === 0) await page.locator('.runner-acoes .btn-primario').click();
  }
  await page.getByRole('button', { name: 'Ver resposta', exact: true }).click();
  const xp = await page.evaluate(() => Plataforma.dados.estado().xp);
  await page.reload();
  await expect(page.locator('.runner')).toBeVisible();
  await resposta(page, atividade);
  await page.locator('.runner-acoes .btn-primario').click();
  await expect(page.locator('.feedback.correto')).toBeVisible();
  expect(await page.evaluate(() => Plataforma.dados.estado().xp)).toBe(xp);
});
