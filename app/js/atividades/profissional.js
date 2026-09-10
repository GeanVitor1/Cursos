window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;

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
      return P.atividades.montarOpcoes(atv, area, api);
    }
  });

  P.atividades.registrar('scenario', {
    rotulo: 'Cenário profissional',
    render: function (atv, area, api) {
      if (atv.cena) {
        area.appendChild(criar('div', { classe: 'cenario', texto: atv.cena }));
      }
      return P.atividades.montarOpcoes(atv, area, api);
    }
  });
})(window.Plataforma);
