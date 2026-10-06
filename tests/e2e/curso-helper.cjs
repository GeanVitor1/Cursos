const { expect } = require('@playwright/test');
async function abrir(page, route = '#/') {
  await page.goto('/app/' + route);
  await expect(page.locator('.app-shell')).toBeVisible();
}
async function resposta(page, atv) {
  const scope = page.locator('.atividade-area');
  if (['multiple-choice', 'find-error', 'interpret-code', 'predict-output', 'translate', 'reading', 'debug', 'scenario', 'code-review', 'choose-image'].includes(atv.tipo) || atv.tipo === 'listening' && atv.modo !== 'escrever') {
    await scope.locator(`[data-indice-original="${atv.correta}"]`).click();
  } else if (atv.tipo === 'fill-code') {
    const inputs = scope.locator('input');
    for (let i = 0; i < atv.lacunas.length; i++) await inputs.nth(i).fill(atv.lacunas[i][0]);
  } else if (atv.tipo === 'write-code') {
    await scope.locator('textarea').fill((atv.respostasAceitas?.[0] || atv.exemplo || '').replace(/\[(seu nome|nome)\]/g, 'Ana').replace(/\[sua idade\]/g, 'twenty'));
  } else if (atv.tipo === 'explain') {
    await scope.locator('textarea').fill(atv.exemplo || atv.palavrasChave.map(p => Array.isArray(p) ? p[0] : p).join(' ') + ' com uma explicação completa.');
  } else if (atv.tipo === 'listening') {
    await scope.locator('input').fill(atv.resposta);
  } else if (atv.tipo === 'true-false') {
    for (let i = 0; i < atv.afirmacoes.length; i++) await scope.locator('.tf-afirmacao').nth(i).getByRole('button', { name: atv.afirmacoes[i].correta ? 'Verdadeiro' : 'Falso', exact: true }).click();
  } else if (atv.tipo === 'match-pairs') {
    for (let i = 0; i < atv.pares.length; i++) {
      await scope.locator('.match-coluna').nth(0).locator(`[data-indice="${i}"]`).click();
      await scope.locator('.match-coluna').nth(1).locator(`[data-indice="${i}"]`).click();
    }
  } else if (atv.tipo === 'order-blocks') {
    for (const bloco of atv.blocos) await scope.locator('.ordenar-pool').getByRole('button', { name: bloco, exact: true }).first().click();
  } else if (atv.tipo === 'visualizer') {
    while (!(await page.locator('.runner-acoes .btn-primario').isEnabled())) await scope.locator('.visualizador-controles button').click();
  } else if (atv.tipo === 'dialogue') {
    for (const turno of atv.turnos) {
      await scope.locator(`.dialogo-opcoes [data-indice-original="${turno.correta}"]`).click();
      await expect(scope.locator('.dialogo-opcoes .correta')).toHaveCount(0);
    }
  } else throw new Error('Tipo sem cobertura: ' + atv.tipo);
}
async function fazerLicao(page, id) {
  await page.evaluate(id => Plataforma.roteador.ir('#/licao/' + id), id);
  await expect(page.locator('.runner')).toBeVisible();
  const etapas = await page.evaluate(id => Plataforma.interno.licoes[id].etapas, id);
  for (let i = 0; i < etapas.length; i++) {
    await expect(page.locator('.runner-contador')).toHaveText(`${i + 1}/${etapas.length}`);
    const action = page.locator('.runner-acoes .btn-primario');
    if (etapas[i].tipo === 'atividade') {
      if (etapas[i].atividade.tipo !== 'visualizer') await expect(action).toBeDisabled();
      await resposta(page, etapas[i].atividade);
      await expect(action).toBeEnabled();
      await action.click();
      await expect(page.locator('.feedback.correto'), `${id} / ${etapas[i].atividade.id}: resposta modelo rejeitada`).toBeVisible();
      await expect(page.locator('.runner-contador')).toHaveText(`${i + 1}/${etapas.length}`);
    }
    await action.click();
  }
  await expect(page.locator('.conclusao')).toBeVisible();
  expect(await page.evaluate(id => Plataforma.dados.estaConcluida(id), id)).toBe(true);
}

module.exports = { abrir, fazerLicao, resposta };
