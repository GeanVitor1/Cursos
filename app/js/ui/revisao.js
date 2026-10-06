window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;
  const comp = P.ui.componentes;

  async function render(params) {
    const versao = P.roteador.versao();
    const numero = params && Number(params.min);
    const limite = Number.isFinite(numero) && numero > 0 ? Math.max(3, Math.min(20, numero)) : 8;
    const incluirHoje = !!(params && params.escopo === 'hoje');
    const conceitos = P.progresso.conceitosParaRevisar(incluirHoje).slice(0, 8);
    if (conceitos.length) {
      P.ui.layout.definirConteudo(criar('div', { classe: 'estado-vazio', texto: 'Preparando revisão...', role: 'status' }));
      try { await P.carregador.carregarConceitos(conceitos.map(function (c) { return c.id; })); }
      catch (e) {
        console.error('[Revisão]', e);
        if (versao !== P.roteador.versao()) return;
        P.ui.layout.definirConteudo(criar('div', { classe: 'estado-vazio' }, [
          criar('p', { texto: 'Não foi possível carregar a revisão. Verifique sua conexão.' }),
          comp.botao('Tentar novamente', { onclick: function () { P.roteador.processar(); } })
        ]));
        return;
      }
      if (versao !== P.roteador.versao()) return;
    }
    const atividades = P.progresso.atividadesDeRevisao(limite, incluirHoje);
    if (!conceitos.length || !atividades.length) {
      P.ui.layout.definirConteudo(criar('div', { classe: 'pagina' }, [
        criar('div', { classe: 'pagina-cabecalho' }, [
          criar('h1', { texto: 'Revisão rápida' }),
          criar('p', { classe: 'muted', texto: 'Repetição espaçada dos conceitos em que você errou.' })
        ]),
        criar('div', { classe: 'cartao estado-vazio' }, [
          criar('h3', { texto: 'Nada vencido para revisar agora' }),
          criar('p', { texto: 'Os conceitos errados voltam em 1 dia, 3 dias, 1 semana, 2 semanas e 1 mês. Volte quando algum estiver vencido — ou siga para a próxima etapa.' }),
          comp.botao('Ir para a próxima etapa', { onclick: function () { P.roteador.ir('#/'); } })
        ])
      ]));
      return;
    }
    const etapas = atividades.map(function (atividade) {
      return { tipo: 'atividade', atividade: atividade };
    });
    P.ui.runner.iniciar({
      modo: 'revisao',
      etapas: etapas,
      titulo: 'Revisão rápida',
      subtitulo: conceitos.length + ' conceitos em foco · atividades intercaladas'
    });
  }

  P.ui.revisao = { render: render };
})(window.Plataforma);
