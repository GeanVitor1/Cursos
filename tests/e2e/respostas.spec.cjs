const { test, expect } = require('@playwright/test');
const { abrir } = require('./curso-helper.cjs');

test.beforeEach(async ({ context }) => {
  await context.route('https://*.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
});

test('resposta enviada pelo aluno é aceita na lição real e ganha XP de acerto', async ({ page }) => {
  await abrir(page);
  await page.evaluate(() => {
    const P = Plataforma, estado = P.dados.exportar();
    const ids = P.progresso.daTrilha('sql').comLicao.map(e => e.licao);
    for (const id of ids.slice(0, ids.indexOf('sql-12'))) estado.licoes[id] = { status: 'concluida', concluidaEm: '2026-01-01T00:00:00Z' };
    P.dados.importar(estado, true);
    P.dados.atualizarRascunho('sql-12', 3);
    P.roteador.ir('#/licao/sql-12');
  });
  await expect(page.locator('.runner-contador')).toHaveText('4/11');
  await page.getByRole('textbox', { name: 'Sua resposta', exact: true }).fill("insert into produtos (Nome , Preço) values ('Teclado',200);");
  await page.getByRole('button', { name: 'Verificar', exact: true }).click();
  await expect(page.locator('.feedback.correto')).toBeVisible();
  await expect(page.locator('.feedback-xp')).toHaveText('+10 XP');
  await expect(page.locator('.resposta-esperada')).toBeHidden();
  await page.screenshot({ path: '.gstack/qa-reports/sql-12-resposta-aluno-correta.png', fullPage: true });
  await page.reload();
  await expect(page.locator('.runner-contador')).toHaveText('4/11');
  await page.getByRole('textbox', { name: 'Sua resposta', exact: true }).fill("INSERT INTO Produtos (Nome, Preco) VALUES ('Teclado', 200)");
  await page.getByRole('button', { name: 'Verificar', exact: true }).click();
  await expect(page.locator('.feedback.correto')).toBeVisible();
  expect(await page.evaluate(() => Plataforma.dados.estado().xp)).toBe(10);
});

test('todas as variantes dos gabaritos e variações reais passam pelos campos da interface', async ({ page }) => {
  test.setTimeout(120000);
  await abrir(page);
  await page.evaluate(async () => { await Promise.all(Object.values(Plataforma.interno.licoes).filter(l => l.disponivel).map(l => Plataforma.carregador.carregarLicao(l.id))); });
  const resultado = await page.evaluate(() => {
    const P = Plataforma, falhas = [], contagem = {};
    for (const l of Object.values(P.interno.licoes)) for (const e of l.etapas || []) {
      const a = e.atividade;
      if (!a || !['fill-code', 'write-code', 'explain', 'listening'].includes(a.tipo) || a.tipo === 'listening' && a.modo !== 'escrever') continue;
      const variantes = [];
      if (a.tipo === 'fill-code') {
        const modelo = a.lacunas.map(lista => lista[0]);
        variantes.push({ valor: modelo, correta: true });
        a.lacunas.forEach((lista, i) => lista.forEach(v => {
          const valores = modelo.slice(); valores[i] = '  ' + v + '  ';
          variantes.push({ valor: valores, correta: true });
          if (['ingles', 'sql'].includes(a.trilha)) variantes.push({ valor: valores.map(x => x.toUpperCase()), correta: true });
        }));
        modelo.forEach((_, i) => { const valores = modelo.slice(); valores[i] = 'ZZZ_INVALIDO'; variantes.push({ valor: valores, correta: false }); });
      } else if (a.tipo === 'write-code') {
        for (const r of a.respostasAceitas) {
          const valor = r.replace(/\[(seu nome|nome)\]/g, 'Ana').replace(/\[sua idade\]/g, 'twenty');
          variantes.push({ valor, correta: true }, { valor: '  ' + valor + '  ', correta: true });
          if (a.trilha === 'sql') {
            const mudar = fn => valor.match(/'(?:[^']|'')*'|[^']+/g).map(t => t.startsWith("'") ? t : fn(t)).join('');
            variantes.push({ valor: mudar(t => t.toUpperCase()), correta: true }, { valor: mudar(t => t.toLowerCase().replace(/preco/g, 'preço').replace(/posicao/g, 'posição')).normalize('NFD'), correta: true });
          }
          if (a.trilha === 'ingles') variantes.push({ valor: valor.toUpperCase(), correta: true }, { valor: valor.replace(/'/g, '’').replace(/ /g, '   '), correta: true });
        }
        variantes.push({ valor: 'ZZZ_INVALIDO_987 ZZZ_INVALIDO_987', correta: false });
      } else if (a.tipo === 'explain') {
        variantes.push({ valor: a.exemplo, correta: true }, { valor: a.exemplo.toUpperCase().normalize('NFD'), correta: true }, { valor: 'ZZZ_INVALIDO_987 ZZZ_INVALIDO_987', correta: false });
      } else variantes.push({ valor: a.resposta, correta: true }, { valor: '  ' + a.resposta + '  ', correta: true }, { valor: a.resposta + '0', correta: false });
      for (const v of variantes) {
        const area = document.createElement('div'); document.body.appendChild(area);
        let respondida = false, motor;
        try {
          motor = P.atividades.encontrar(a.tipo).render(a, area, { marcarRespondida: r => { respondida = r; } });
          if (a.tipo === 'fill-code') area.querySelectorAll('input').forEach((input, i) => { input.value = v.valor[i]; input.dispatchEvent(new Event('input')); });
          else { const input = area.querySelector('textarea, input'); input.value = v.valor; input.dispatchEvent(new Event('input')); }
          const atual = motor.verificar().correto;
          contagem[a.tipo] = (contagem[a.tipo] || 0) + 1;
          if (atual !== v.correta || v.correta && !respondida) falhas.push({ licao: l.id, id: a.id, entrada: v.valor, esperada: v.correta, atual, respondida });
          motor.prepararNovaTentativa();
          const campos = [...area.querySelectorAll('input, textarea')];
          if (campos.some(el => el.disabled || el.readOnly)) falhas.push(a.id + ': nova tentativa bloqueada');
        } catch (err) { falhas.push(a.id + ': ' + err.message); }
        finally { if (motor && motor.destruir) motor.destruir(); area.remove(); }
      }
    }
    return { falhas, contagem };
  });
  console.log('Variações verificadas na interface:', resultado.contagem);
  expect(resultado.falhas).toEqual([]);
});
