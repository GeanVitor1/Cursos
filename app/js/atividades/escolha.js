window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;

  function montarOpcoes(atv, area, api) {
    const marcadores = ['A', 'B', 'C', 'D', 'E', 'F'];
    const opcoes = atv.opcoes || [];
    const ordem = P.dom.embaralhar(opcoes.map(function (_, i) { return i; }));
    let selecionada = -1;
    let travado = false;
    const botoes = [];
    const lista = criar('div', { classe: 'opcoes' });

    ordem.forEach(function (original, pos) {
      const botao = criar('button', { classe: 'opcao', type: 'button' }, [
        criar('span', { classe: 'opcao-marcador', texto: marcadores[pos] || String(pos + 1) }),
        criar('span', { classe: 'opcao-texto', html: P.dom.formatar(opcoes[original]) })
      ]);
      botao.dataset.indiceOriginal = original;
      botao.addEventListener('click', function () {
        if (travado) return;
        selecionada = original;
        botoes.forEach(function (b) { b.classList.toggle('selecionada', b === botao); });
        api.marcarRespondida(true);
      });
      botoes.push(botao);
      lista.appendChild(botao);
    });

    area.appendChild(lista);

    return {
      verificar: function () {
        travado = true;
        const correta = atv.correta;
        botoes.forEach(function (b, pos) {
          const original = ordem[pos];
          b.classList.add('travada');
          b.classList.remove('selecionada');
          if (original === correta) b.classList.add('correta');
          else if (original === selecionada) b.classList.add('errada');
        });
        return { correto: selecionada === correta, selecionada: selecionada };
      },
      revelar: function () {
        travado = true;
        botoes.forEach(function (b, pos) {
          b.classList.add('travada');
          b.classList.remove('selecionada');
          if (ordem[pos] === atv.correta) b.classList.add('correta');
        });
      },
      prepararNovaTentativa: function () {
        travado = false;
        selecionada = -1;
        botoes.forEach(function (b) {
          b.classList.remove('selecionada', 'correta', 'errada', 'travada');
        });
        api.marcarRespondida(false);
      }
    };
  }

  function itemAfirmacao(afirmacao, indice, respostas, referencias, aoResponder) {
    let travado = false;
    const botoes = {};
    function escolher(valor) {
      if (travado) return;
      respostas[indice] = valor;
      botoes.verdadeiro.classList.toggle('ativo', valor === true);
      botoes.falso.classList.toggle('ativo', valor === false);
      aoResponder();
    }
    botoes.verdadeiro = criar('button', { classe: 'tf-botao', type: 'button', texto: 'Verdadeiro', onclick: function () { escolher(true); } });
    botoes.falso = criar('button', { classe: 'tf-botao', type: 'button', texto: 'Falso', onclick: function () { escolher(false); } });
    referencias[indice] = { botoes: botoes, travar: function (t) { travado = t; } };
    return criar('div', { classe: 'tf-afirmacao' }, [
      criar('div', { classe: 'tf-linha' }, [
        criar('div', { classe: 'tf-texto', html: P.dom.formatar(afirmacao.texto) }),
        criar('div', { classe: 'tf-botoes' }, [botoes.verdadeiro, botoes.falso])
      ])
    ]);
  }

  P.atividades.registrar('multiple-choice', {
    rotulo: 'Múltipla escolha',
    render: function (atv, area, api) {
      return montarOpcoes(atv, area, api);
    }
  });

  P.atividades.registrar('true-false', {
    rotulo: 'Verdadeiro ou falso',
    render: function (atv, area, api) {
      const afirmacoes = atv.afirmacoes || [];
      const respostas = afirmacoes.map(function () { return null; });
      const referencias = [];
      let travado = false;
      const container = criar('div', { classe: 'tf-afirmacoes' });

      afirmacoes.forEach(function (afirmacao, i) {
        container.appendChild(itemAfirmacao(afirmacao, i, respostas, referencias, function () {
          api.marcarRespondida(respostas.every(function (r) { return r !== null; }));
        }));
      });
      area.appendChild(container);

      return {
        verificar: function () {
          travado = true;
          let correto = true;
          const detalhes = [];
          afirmacoes.forEach(function (afirmacao, i) {
            const resposta = respostas[i];
            const escolhaCerta = resposta === !!afirmacao.correta;
            if (!escolhaCerta) {
              correto = false;
              if (afirmacao.explicacao) detalhes.push(afirmacao.explicacao);
            }
            const ref = referencias[i];
            ref.travar(true);
            const escolhido = resposta === true ? ref.botoes.verdadeiro : ref.botoes.falso;
            const oposto = resposta === true ? ref.botoes.falso : ref.botoes.verdadeiro;
            escolhido.classList.remove('ativo');
            if (escolhaCerta) {
              escolhido.classList.add('correta');
            } else {
              escolhido.classList.add('errada');
              oposto.classList.add('correta');
            }
          });
          return { correto: correto, selecionada: null, detalhes: detalhes };
        },
        revelar: function () {
          travado = true;
          afirmacoes.forEach(function (afirmacao, i) {
            const ref = referencias[i];
            ref.travar(true);
            ref.botoes.verdadeiro.classList.remove('ativo', 'errada');
            ref.botoes.falso.classList.remove('ativo', 'errada');
            const certo = afirmacao.correta ? ref.botoes.verdadeiro : ref.botoes.falso;
            certo.classList.add('correta');
          });
        },
        prepararNovaTentativa: function () {
          travado = false;
          afirmacoes.forEach(function (afirmacao, i) {
            const ref = referencias[i];
            ref.travar(false);
            ref.botoes.verdadeiro.classList.remove('correta', 'errada');
            ref.botoes.falso.classList.remove('correta', 'errada');
          });
          api.marcarRespondida(respostas.every(function (r) { return r !== null; }));
        }
      };
    }
  });

  P.atividades.registrar('translate', {
    rotulo: 'Vocabulário',
    render: function (atv, area, api) {
      if (atv.termo) {
        area.appendChild(criar('div', { classe: 'vocab-destaque' }, [
          criar('span', { classe: 'ingles-rotulo', texto: atv.direcao === 'pt-en' ? 'Português → English' : 'English → português' }),
          criar('span', { classe: 'vocab-termo', texto: atv.termo }),
          criar('button', {
            classe: 'btn-link btn-ouvir',
            texto: '🔊 Ouvir',
            title: 'Ouvir a pronúncia',
            onclick: function () { P.ui.componentes.falar(atv.termo); }
          })
        ]));
      }
      return montarOpcoes(atv, area, api);
    }
  });

  P.atividades.registrar('reading', {
    rotulo: 'Leitura',
    render: function (atv, area, api) {
      const blocoLeitura = criar('div', { classe: 'leitura-texto' });
      if (atv.titulo) blocoLeitura.appendChild(criar('div', { classe: 'leitura-titulo', texto: atv.titulo }));
      blocoLeitura.appendChild(criar('p', { texto: atv.texto || '' }));
      area.appendChild(blocoLeitura);
      if (atv.pergunta) {
        area.appendChild(criar('p', { classe: 'atividade-enunciado', html: P.dom.formatar(atv.pergunta) }));
      }
      return montarOpcoes(atv, area, api);
    }
  });

  P.atividades.montarOpcoes = montarOpcoes;
})(window.Plataforma);
