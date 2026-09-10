window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;
  const comp = P.ui.componentes;

  function menorProgresso(trilhas) {
    if (!trilhas || !trilhas.length) return 100;
    let menor = 100;
    trilhas.forEach(function (id) {
      const r = P.progresso.daTrilha(id);
      if (r && r.percentual < menor) menor = r.percentual;
    });
    return menor;
  }

  function render() {
    const lista = P.interno.projetos || [];
    const pagina = criar('div', { classe: 'pagina' });
    pagina.appendChild(criar('div', { classe: 'pagina-cabecalho' }, [
      criar('h1', { texto: 'Projetos' }),
      criar('p', { classe: 'muted', texto: 'Cada bloco de habilidades termina em algo real. Os projetos evoluem junto com você — nunca pedem tecnologia que você ainda não estudou.' })
    ]));

    const grid = criar('div', { classe: 'cards-grid' });
    lista.forEach(function (projeto) {
      const progresso = menorProgresso(projeto.trilhas);
      const pronto = progresso >= 60;
      const cartao = criar('div', { classe: 'cartao certificado-card' }, [
        criar('span', { classe: 'certificado-emissor', texto: 'Projeto ' + projeto.numero + ' · Fase ' + projeto.fase }),
        criar('h3', { texto: projeto.nome }),
        criar('p', { classe: 'muted pequeno', texto: projeto.descricao }),
        criar('div', { classe: 'requisitos' }, (projeto.trilhas || []).map(function (id) {
          const t = P.progresso.trilha(id);
          const r = P.progresso.daTrilha(id);
          return t ? comp.chip((t.curto || t.nome) + ' · ' + r.percentual + '%') : null;
        })),
        pronto
          ? comp.chip('Você já pode começar', 'sucesso')
          : comp.chip('Requisitos em andamento · ' + progresso + '%', 'aviso'),
        criar('ul', { classe: 'projeto-criterios' }, (projeto.criterios || []).map(function (c) {
          return criar('li', { texto: c });
        }))
      ]);
      grid.appendChild(cartao);
    });
    pagina.appendChild(grid);

    P.ui.layout.definirConteudo(pagina);
  }

  P.ui.projetos = { render: render };
})(window.Plataforma);
