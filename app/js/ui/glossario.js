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

    const busca = criar('input', { type: 'search', classe: 'campo-busca', placeholder: 'Buscar conceito…', 'aria-label': 'Buscar no glossário' });
    pagina.appendChild(busca);
    const nomes = {};
    P.progresso.trilhas().forEach(function (t) { nomes[t.id] = t.nome || t.curto || t.id; });
    const blocos = [];

    function secao(titulo, lista, abertoPadrao, vazio) {
      const cartaoSecao = criar('div', { classe: 'cartao' }, [criar('h3', { texto: titulo + ' (' + lista.length + ')' })]);
      if (!lista.length) {
        if (vazio) cartaoSecao.appendChild(criar('p', { classe: 'muted', texto: vazio }));
        return cartaoSecao;
      }
      const grupos = {};
      lista.forEach(function (id) { const t = String(id).split('.')[0]; (grupos[t] = grupos[t] || []).push(id); });
      Object.keys(grupos).forEach(function (trilha) {
        // Cartões são montados só ao abrir o grupo: evita uma página gigante.
        const det = criar('details', { classe: 'grupo-colapsavel' });
        det.appendChild(criar('summary', { texto: (nomes[trilha] || trilha) + ' (' + grupos[trilha].length + ')' }));
        const grade = criar('div', { classe: 'glossario-grade' });
        det.appendChild(grade);
        const bloco = { det: det, grade: grade, ids: grupos[trilha], montado: false, cartoes: [] };
        function montar() {
          if (bloco.montado) return;
          bloco.montado = true;
          bloco.ids.forEach(function (id) {
            const el = cartao(id);
            el.dataset.busca = P.dom.normalizar(P.progresso.nomeConceito(id) + ' ' + id);
            bloco.cartoes.push(el);
            grade.appendChild(el);
          });
        }
        bloco.montar = montar;
        det.addEventListener('toggle', function () { if (det.open) montar(); });
        if (abertoPadrao && Object.keys(grupos).length === 1) { det.open = true; montar(); }
        blocos.push(bloco);
        cartaoSecao.appendChild(det);
      });
      return cartaoSecao;
    }

    pagina.appendChild(secao('Já estudados', estudados, true, 'Pratique uma lição para começar a preencher seu glossário.'));
    if (futuros.length) pagina.appendChild(secao('Conceitos de trilhas futuras', futuros, false));

    busca.addEventListener('input', function () {
      const termo = P.dom.normalizar(busca.value);
      blocos.forEach(function (b) {
        if (!termo) {
          b.det.hidden = false;
          b.cartoes.forEach(function (el) { el.hidden = false; });
          return;
        }
        const casam = b.ids.filter(function (id) { return P.dom.normalizar(P.progresso.nomeConceito(id) + ' ' + id).indexOf(termo) !== -1; });
        b.det.hidden = !casam.length;
        if (casam.length) {
          b.montar();
          b.det.open = true;
          b.cartoes.forEach(function (el) { el.hidden = el.dataset.busca.indexOf(termo) === -1; });
        }
      });
    });

    P.ui.layout.definirConteudo(pagina);
  }

  P.ui.glossario = { render: render };
})(window.Plataforma);
