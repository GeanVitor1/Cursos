window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;

  function cartao(id) {
    const info = P.ui.componentes.definicaoConceito(id);
    const estado = P.dados.estadoConceito(id);
    const simbolo = estado === 'dominado' ? '🟢' : (estado ? '🟡' : '⚪');
    const cartaoEl = criar('div', { classe: 'glossario-card' });
    cartaoEl.appendChild(criar('div', { classe: 'glossario-card-topo' }, [
      criar('strong', { texto: P.progresso.nomeConceito(id) }),
      criar('span', { classe: 'chip', texto: simbolo + ' ' + (info && info.licao ? (P.interno.licoes[info.licao] || {}).titulo : 'não estudado') })
    ]));
    cartaoEl.appendChild(criar('p', { classe: 'pequeno', texto: (info && info.definicao) || 'A definição aparece na lição em que o conceito é introduzido.' }));
    if (info && info.exemplo) {
      cartaoEl.appendChild(criar('div', { classe: 'conceito-exemplo' }, [criar('code', { texto: info.exemplo })]));
    }
    return cartaoEl;
  }

  function render() {
    const conceitos = P.interno.conceitos || {};
    const ids = Object.keys(conceitos);
    const estudados = [];
    const futuros = [];
    ids.forEach(function (id) {
      if (P.dados.estadoConceito(id)) estudados.push(id);
      else futuros.push(id);
    });
    const pagina = criar('div', { classe: 'pagina' });
    pagina.appendChild(criar('div', { classe: 'pagina-cabecalho' }, [
      criar('h1', { texto: 'Glossário de conceitos' }),
      criar('p', { classe: 'muted', texto: 'Definições curtas de tudo o que a plataforma ensina. Conceitos que você ainda não estudou ficam guardados para não estragar a surpresa.' })
    ]));

    pagina.appendChild(criar('div', { classe: 'cartao' }, [
      criar('h3', { texto: 'Já estudados (' + estudados.length + ')' }),
      estudados.length
        ? criar('div', { classe: 'glossario-grade' }, estudados.map(cartao))
        : criar('p', { classe: 'muted', texto: 'Pratique uma lição para começar a preencher seu glossário.' })
    ]));

    if (futuros.length) {
      const detalhes = criar('details', { classe: 'cartao' });
      detalhes.appendChild(criar('summary', { texto: 'Conceitos de trilhas futuras (' + futuros.length + ') — clique para ver', style: 'cursor:pointer;font-weight:650' }));
      detalhes.appendChild(criar('div', { classe: 'glossario-grade' }, futuros.map(cartao)));
      pagina.appendChild(detalhes);
    }

    P.ui.layout.definirConteudo(pagina);
  }

  P.ui.glossario = { render: render };
})(window.Plataforma);
