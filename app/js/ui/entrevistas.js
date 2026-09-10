window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;
  const comp = P.ui.componentes;

  function progressoTrilha(id) {
    const r = P.progresso.daTrilha(id);
    return r ? r.percentual : 0;
  }

  function render() {
    const lista = P.interno.entrevistas || [];
    const pagina = criar('div', { classe: 'pagina' });
    pagina.appendChild(criar('div', { classe: 'pagina-cabecalho' }, [
      criar('h1', { texto: 'Entrevistas' }),
      criar('p', { classe: 'muted', texto: 'Perguntas baseadas apenas no que você já estudou. As áreas liberam conforme o progresso — sem perguntas sobre conteúdo que você ainda não viu.' })
    ]));

    const grid = criar('div', { classe: 'cards-grid' });
    lista.forEach(function (area) {
      const progresso = progressoTrilha(area.trilha);
      const liberada = progresso >= (area.desbloqueio || 50);
      const cartao = criar('div', { classe: 'cartao certificado-card' }, [
        criar('span', { classe: 'certificado-emissor', texto: area.trilha ? (P.progresso.trilha(area.trilha) || {}).nome : 'Geral' }),
        criar('h3', { texto: area.area }),
        criar('p', { classe: 'muted pequeno', texto: area.descricao }),
        criar('div', { classe: 'certificado-progresso' }, [
          comp.barra(progresso),
          criar('span', { classe: 'pct', texto: progresso + '%' })
        ]),
        liberada
          ? comp.chip('Disponível para treinar', 'sucesso')
          : comp.chip('Libera com ' + (area.desbloqueio || 50) + '% da trilha', 'aviso'),
        criar('ul', { classe: 'entrevista-perguntas' }, (area.perguntas || []).map(function (pergunta) {
          return criar('li', { texto: pergunta });
        })),
        criar('p', { classe: 'pequeno fraco', texto: liberada ? 'Leia a pergunta em voz alta e responda como se fosse uma entrevista real.' : 'Perguntas ilustrativas — responda mentalmente quando chegar lá.' })
      ]);
      grid.appendChild(cartao);
    });
    pagina.appendChild(grid);

    P.ui.layout.definirConteudo(pagina);
  }

  P.ui.entrevistas = { render: render };
})(window.Plataforma);
