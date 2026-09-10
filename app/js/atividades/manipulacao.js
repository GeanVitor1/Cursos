window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;

  P.atividades.registrar('match-pairs', {
    rotulo: 'Fazer conexões',
    render: function (atv, area, api) {
      const pares = atv.pares || [];
      let selecionado = null;
      let pareados = 0;
      let errosTentativa = 0;
      let travado = false;

      const colunaEsq = criar('div', { classe: 'match-coluna' });
      const colunaDir = criar('div', { classe: 'match-coluna' });
      const container = criar('div', { classe: 'match' }, [colunaEsq, colunaDir]);
      area.appendChild(container);

      const itensEsq = pares.map(function (par, i) { return { texto: par[0], indice: i }; });
      const itensDir = P.dom.embaralhar(pares.map(function (par, i) { return { texto: par[1], indice: i }; }));

      function montarBotoes() {
        P.dom.limpar(colunaEsq);
        P.dom.limpar(colunaDir);
        itensEsq.forEach(function (item) {
          const botao = criar('button', { classe: 'match-item', type: 'button', texto: item.texto });
          botao.dataset.indice = item.indice;
          botao.addEventListener('click', function () { selecionar(botao, item); });
          colunaEsq.appendChild(botao);
        });
        itensDir.forEach(function (item) {
          const botao = criar('button', { classe: 'match-item', type: 'button', texto: item.texto });
          botao.dataset.indice = item.indice;
          botao.addEventListener('click', function () { tentarPar(botao, item); });
          colunaDir.appendChild(botao);
        });
      }

      function selecionar(botao, item) {
        if (travado || botao.classList.contains('pareado')) return;
        colunaEsq.querySelectorAll('.match-item').forEach(function (b) { b.classList.remove('selecionado'); });
        botao.classList.add('selecionado');
        selecionado = { botao: botao, item: item };
      }

      function tentarPar(botao, item) {
        if (travado || botao.classList.contains('pareado')) return;
        if (!selecionado) {
          botao.classList.add('erro');
          window.setTimeout(function () { botao.classList.remove('erro'); }, 500);
          return;
        }
        if (selecionado.item.indice === item.indice) {
          botao.classList.add('pareado');
          selecionado.botao.classList.remove('selecionado');
          selecionado.botao.classList.add('pareado');
          selecionado = null;
          pareados += 1;
          api.marcarRespondida(pareados === pares.length);
        } else {
          errosTentativa += 1;
          botao.classList.add('erro');
          const esquerdo = selecionado.botao;
          esquerdo.classList.add('erro');
          window.setTimeout(function () {
            botao.classList.remove('erro');
            esquerdo.classList.remove('erro');
          }, 550);
          selecionado = null;
        }
      }

      montarBotoes();

      return {
        verificar: function () {
          travado = true;
          colunaEsq.querySelectorAll('.match-item').forEach(function (b) { b.classList.add('travada'); });
          colunaDir.querySelectorAll('.match-item').forEach(function (b) { b.classList.add('travada'); });
          return { correto: errosTentativa === 0 };
        },
        revelar: function () {
          travado = true;
          colunaEsq.querySelectorAll('.match-item').forEach(function (b) { b.classList.add('pareado', 'selecionado'); });
          colunaDir.querySelectorAll('.match-item').forEach(function (b) { b.classList.add('pareado'); });
        },
        prepararNovaTentativa: function () {
          travado = false;
          selecionado = null;
          pareados = 0;
          errosTentativa = 0;
          montarBotoes();
          api.marcarRespondida(false);
        }
      };
    }
  });

  P.atividades.registrar('order-blocks', {
    rotulo: 'Ordenar código',
    render: function (atv, area, api) {
      const corretos = atv.blocos || [];
      let ordem = [];
      let travado = false;
      const pool = criar('div', { classe: 'ordenar-pool' });
      const encaixe = criar('div', { classe: 'ordenar-area' });
      const container = criar('div', { classe: 'ordenar' }, [
        criar('div', { classe: 'ordenar-rotulo', texto: 'Blocos disponíveis' }),
        pool,
        criar('div', { classe: 'ordenar-rotulo', texto: 'Sua montagem' }),
        encaixe
      ]);
      area.appendChild(container);

      const itens = P.dom.embaralhar(corretos.map(function (texto, i) { return { texto: texto, indice: i }; }));

      function botaoItem(item, encaixado) {
        const botao = criar('button', { classe: 'bloco-item' + (encaixado ? ' encaixado' : ''), type: 'button', texto: item.texto });
        botao.addEventListener('click', function () {
          if (travado) return;
          if (encaixado) ordem = ordem.filter(function (i) { return i !== item.indice; });
          else ordem.push(item.indice);
          atualizar();
        });
        return botao;
      }

      function atualizar() {
        P.dom.limpar(pool);
        P.dom.limpar(encaixe);
        itens.forEach(function (item) {
          if (ordem.indexOf(item.indice) === -1) pool.appendChild(botaoItem(item, false));
        });
        ordem.forEach(function (indice) {
          const item = itens.filter(function (i) { return i.indice === indice; })[0];
          encaixe.appendChild(botaoItem(item, true));
        });
        api.marcarRespondida(ordem.length === corretos.length);
      }

      atualizar();

      return {
        verificar: function () {
          travado = true;
          const ok = ordem.length === corretos.length && ordem.every(function (indice, pos) { return indice === pos; });
          encaixe.classList.add('verificada');
          encaixe.classList.add(ok ? 'correta' : 'errada');
          return { correto: ok };
        },
        revelar: function () {
          travado = true;
          ordem = corretos.map(function (_, i) { return i; });
          atualizar();
          encaixe.classList.add('verificada', 'correta');
          encaixe.classList.remove('errada');
        },
        prepararNovaTentativa: function () {
          travado = false;
          encaixe.classList.remove('verificada', 'correta', 'errada');
          api.marcarRespondida(ordem.length === corretos.length);
        }
      };
    }
  });
})(window.Plataforma);
