window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;

  // Duas decisões independentes: solução e motivo. Não basta acertar a opção.
  P.atividades.montarDecisao = function (atv, area, api) {
    if (!atv.justificativa) return P.atividades.montarOpcoes(atv, area, api);
    let solucao = false, motivo = false;
    const escolha = criar('div', { classe: 'decisao-solucao' });
    const razao = criar('div', { classe: 'decisao-motivo' });
    area.appendChild(escolha);
    area.appendChild(criar('p', { texto: 'Qual raciocínio sustenta essa decisão?' }));
    area.appendChild(razao);
    const a = P.atividades.montarOpcoes(atv, escolha, { marcarRespondida: function (v) { solucao = v; api.marcarRespondida(solucao && motivo); } });
    const b = P.atividades.montarOpcoes(atv.justificativa, razao, { marcarRespondida: function (v) { motivo = v; api.marcarRespondida(solucao && motivo); } });
    return {
      verificar: function () {
        const x = a.verificar(), y = b.verificar();
        return { correto: x.correto && y.correto, selecionada: x.selecionada, detalhes: y.correto ? [] : ['Revise a justificativa: ' + atv.justificativa.explicacao] };
      },
      revelar: function () { a.revelar(); b.revelar(); },
      prepararNovaTentativa: function () { a.prepararNovaTentativa(); b.prepararNovaTentativa(); }
    };
  };

  P.atividades.registrar('debug', {
    rotulo: 'Debug',
    render: function (atv, area, api) {
      if (atv.ticket) {
        area.appendChild(criar('div', { classe: 'debug-ticket' }, [
          criar('div', { classe: 'debug-ticket-topo' }, [
            criar('span', { texto: 'Ticket ' + (atv.ticket.numero || '') }),
            criar('span', { texto: atv.ticket.titulo ? '· ' + atv.ticket.titulo : '' })
          ]),
          criar('div', { classe: 'debug-ticket-corpo', texto: atv.ticket.corpo || '' })
        ]));
      }
      if (atv.log) {
        area.appendChild(criar('div', { classe: 'codigo-bloco' }, [
          criar('div', { classe: 'codigo-topo' }, [criar('span', { texto: atv.rotuloLog || 'log' })]),
          criar('pre', { classe: 'debug-log' }, [criar('code', { texto: atv.log })])
        ]));
      }
      return P.atividades.montarDecisao(atv, area, api);
    }
  });

  P.atividades.registrar('scenario', {
    rotulo: 'Cenário profissional',
    render: function (atv, area, api) {
      if (atv.cena) {
        area.appendChild(criar('div', { classe: 'cenario', texto: atv.cena }));
      }
      return P.atividades.montarDecisao(atv, area, api);
    }
  });
})(window.Plataforma);
