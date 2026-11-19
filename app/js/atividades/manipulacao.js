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
          return { correto: pareados === pares.length, semErros: errosTentativa === 0 };
        },
        revelar: function () {
          travado = true;
          colunaEsq.querySelectorAll('.match-item').forEach(function (b) { b.classList.add('pareado'); });
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

  // Compara pelo texto dos blocos (linhas idênticas são intercambiáveis) e aceita `ordensAceitas`
  // opcionais: lista de ordens alternativas, cada uma com índices (0-based) ou textos dos blocos.
  function ordemAceita(atv, ordem) {
    const blocos = atv.blocos || [];
    if (ordem.length !== blocos.length) return false;
    const montado = ordem.map(function (i) { return String(blocos[i]).trim(); });
    const candidatas = [blocos.map(function (b) { return String(b).trim(); })];
    (Array.isArray(atv.ordensAceitas) ? atv.ordensAceitas : []).forEach(function (alt) {
      if (!Array.isArray(alt) || alt.length !== blocos.length) return;
      candidatas.push(alt.map(function (x) { return typeof x === 'number' ? String(blocos[x]).trim() : String(x).trim(); }));
    });
    return candidatas.some(function (cand) { return cand.every(function (t, pos) { return t === montado[pos]; }); });
  }
  P.atividades.ordemAceita = ordemAceita;

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

      const limparBtn = criar('button', {
        classe: 'btn-link ordenar-limpar', type: 'button', texto: 'Limpar montagem',
        onclick: function () { if (travado) return; ordem = []; atualizar(); }
      });
      container.appendChild(criar('div', { classe: 'ordenar-acoes' }, [
        criar('span', { classe: 'ordenar-instrucao', texto: 'Dica: na montagem, use Alt + ↑/↓ para mover um bloco.' }),
        limparBtn
      ]));

      function mover(indice, delta) {
        const pos = ordem.indexOf(indice);
        const alvo = pos + delta;
        if (pos < 0 || alvo < 0 || alvo >= ordem.length) return;
        ordem.splice(pos, 1);
        ordem.splice(alvo, 0, indice);
        atualizar();
        const novo = encaixe.querySelectorAll('.bloco-item')[alvo];
        if (novo) novo.focus();
      }

      function botaoItem(item, encaixado, posicao) {
        const botao = criar('button', {
          classe: 'bloco-item' + (encaixado ? ' encaixado' : ''), type: 'button', texto: item.texto,
          'aria-label': encaixado ? 'Posição ' + (posicao + 1) + ': ' + item.texto + '. Enter remove; Alt+setas reordena.' : 'Adicionar: ' + item.texto
        });
        botao.addEventListener('click', function () {
          if (travado) return;
          if (encaixado) ordem = ordem.filter(function (i) { return i !== item.indice; });
          else ordem.push(item.indice);
          atualizar();
        });
        if (encaixado) {
          botao.addEventListener('keydown', function (ev) {
            if (travado || !ev.altKey) return;
            if (ev.key === 'ArrowUp') { ev.preventDefault(); mover(item.indice, -1); }
            else if (ev.key === 'ArrowDown') { ev.preventDefault(); mover(item.indice, 1); }
          });
        }
        return botao;
      }

      function atualizar() {
        P.dom.limpar(pool);
        P.dom.limpar(encaixe);
        itens.forEach(function (item) {
          if (ordem.indexOf(item.indice) === -1) pool.appendChild(botaoItem(item, false));
        });
        ordem.forEach(function (indice, pos) {
          const item = itens.filter(function (i) { return i.indice === indice; })[0];
          encaixe.appendChild(botaoItem(item, true, pos));
        });
        limparBtn.disabled = !ordem.length;
        api.marcarRespondida(ordem.length === corretos.length);
      }

      atualizar();

      return {
        verificar: function () {
          travado = true;
          const ok = ordemAceita(atv, ordem);
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
