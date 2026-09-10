window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;
  const comp = P.ui.componentes;
  const NIVEIS = ['A1', 'A2', 'B1', 'B2', 'C1'];

  function avaliar(respostas) {
    const porNivel = {};
    (respostas || []).forEach(function (r) {
      const n = r.nivel || 'A1';
      porNivel[n] = porNivel[n] || { total: 0, acertos: 0 };
      porNivel[n].total += 1;
      if (r.correto) porNivel[n].acertos += 1;
    });
    let recomendado = 'A1';
    for (let i = 0; i < NIVEIS.length; i += 1) {
      const nivel = NIVEIS[i];
      const info = porNivel[nivel];
      if (!info) continue;
      if (info.acertos / info.total >= 0.6) recomendado = nivel;
      else break;
    }
    return { porNivel: porNivel, recomendado: recomendado };
  }

  function definirEIr(nivel) {
    P.dados.definirNivelIngles(nivel);
    P.ui.layout.toast('Nível de partida: ' + nivel, 'sucesso');
    P.roteador.ir('#/trilha/ingles');
  }

  function mostrarResultado(resumo) {
    const resultado = avaliar(resumo.respostas);
    const pagina = criar('div', { classe: 'pagina' });
    pagina.appendChild(criar('div', { classe: 'pagina-cabecalho' }, [
      criar('h1', { texto: 'Seu nível estimado: ' + resultado.recomendado }),
      criar('p', { classe: 'muted', texto: 'Resultado do teste de nivelamento. Você pode começar por aqui ou escolher o A1 para revisar a base.' })
    ]));

    const cartao = criar('div', { classe: 'cartao' });
    cartao.appendChild(criar('h3', { texto: 'Acertos por nível' }));
    NIVEIS.forEach(function (nivel) {
      const info = resultado.porNivel[nivel] || { total: 0, acertos: 0 };
      const pct = info.total ? Math.round((info.acertos / info.total) * 100) : 0;
      cartao.appendChild(criar('div', { classe: 'nivel-ingles-linha' }, [
        criar('span', { classe: 'nivel-ingles-nome', texto: nivel + (nivel === resultado.recomendado ? ' ★' : '') }),
        comp.barra(pct),
        criar('span', { classe: 'pct', texto: info.acertos + '/' + info.total })
      ]));
    });
    pagina.appendChild(cartao);

    pagina.appendChild(criar('div', { classe: 'conclusao-acoes' }, [
      comp.botao('Começar pelo ' + resultado.recomendado, { onclick: function () { definirEIr(resultado.recomendado); } }),
      comp.botao('Quero começar do A1 mesmo assim', { tipo: 'suave', onclick: function () { definirEIr('A1'); } }),
      comp.botao('Refazer o teste', { tipo: 'fantasma', onclick: function () { iniciarTeste(); } })
    ]));

    P.ui.layout.definirConteudo(pagina);
  }

  function iniciarTeste() {
    const dados = P.interno.nivelamento;
    if (!dados || !dados.etapas || !dados.etapas.length) {
      P.ui.layout.toast('Teste de nivelamento indisponível.', 'erro');
      return;
    }
    P.ui.runner.iniciar({
      modo: 'nivelamento',
      etapas: dados.etapas,
      titulo: dados.titulo || 'Teste de nivelamento',
      subtitulo: dados.descricao || '',
      semPontuacao: true,
      aoFinalizar: mostrarResultado
    });
  }

  function render() {
    const nivelAtual = P.dados.obterNivelIngles();
    const pagina = criar('div', { classe: 'pagina' });
    pagina.appendChild(criar('div', { classe: 'pagina-cabecalho' }, [
      criar('h1', { texto: 'Teste de nivelamento de inglês' }),
      criar('p', { classe: 'muted', texto: (P.interno.nivelamento && P.interno.nivelamento.descricao) || 'Descubra seu ponto de partida entre A1 e C1.' })
    ]));

    if (nivelAtual) {
      pagina.appendChild(criar('div', { classe: 'bloco-nota sucesso' }, [
        criar('span', { classe: 'nota-marca', texto: '✓' }),
        criar('div', { texto: 'Seu nível de partida atual é **' + nivelAtual + '**. Você pode refazer o teste ou mudar a recomendação.' })
      ]));
    }

    pagina.appendChild(criar('div', { classe: 'cartao' }, [
      criar('h3', { texto: 'Como funciona' }),
      criar('ul', { classe: 'objetivos' }, [
        criar('li', { texto: '10 questões curtas e progressivas, de A1 a C1.' }),
        criar('li', { texto: 'Não vale XP e não bloqueia nada.' }),
        criar('li', { texto: 'No final, você escolhe começar pelo nível recomendado ou pelo A1.' })
      ]),
      criar('div', { classe: 'conclusao-acoes' }, [
        comp.botao(nivelAtual ? 'Refazer o teste' : 'Começar o teste', { onclick: iniciarTeste }),
        comp.botao('Ir para a trilha de inglês', { tipo: 'fantasma', onclick: function () { P.roteador.ir('#/trilha/ingles'); } })
      ])
    ]));

    P.ui.layout.definirConteudo(pagina);
  }

  P.ui.nivelamento = { render: render, iniciar: iniciarTeste, avaliar: avaliar };
})(window.Plataforma);
