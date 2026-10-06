window.Plataforma = window.Plataforma || {};

(function (P) {
  async function render(params) {
    const versao = P.roteador.versao();
    let licao = P.interno.licoes[params.id];
    if (!licao) {
      P.ui.layout.naoEncontrado();
      return;
    }
    if (licao.disponivel === false) {
      P.ui.layout.definirConteudo(P.dom.criar('div', { classe: 'estado-vazio' }, [
        P.dom.criar('h3', { texto: 'Etapa sem conteúdo ainda' }),
        P.dom.criar('p', { texto: 'Esta etapa faz parte do roadmap planejado.' })
      ]));
      return;
    }
    if (!licao.etapas) {
      P.ui.layout.definirConteudo(P.dom.criar('div', { classe: 'estado-vazio', texto: 'Carregando lição...', role: 'status' }));
      try { licao = await P.carregador.carregarLicao(params.id); }
      catch (e) {
        console.error('[Lição]', e);
        if (versao !== P.roteador.versao()) return;
        P.ui.layout.definirConteudo(P.dom.criar('div', { classe: 'estado-vazio' }, [
          P.dom.criar('h3', { texto: 'Não foi possível carregar a lição' }),
          P.dom.criar('p', { texto: 'Seu progresso está preservado. Verifique sua conexão e tente novamente.' }),
          P.ui.componentes.botao('Tentar novamente', { onclick: function () { P.roteador.processar(); } })
        ]));
        return;
      }
      if (versao !== P.roteador.versao()) return;
    }
    const info = P.progresso.statusLicao(licao.id);
    if (info && (info.status === 'bloqueada' || info.status === 'planejada')) {
      P.ui.layout.toast(
        info.status === 'bloqueada'
          ? 'Conclua a etapa anterior para liberar esta.'
          : 'Etapa ainda em produção — não há o que concluir nela agora.',
        'aviso'
      );
      P.roteador.ir('#/trilha/' + info.trilhaId);
      return;
    }
    P.ui.runner.iniciar({
      modo: 'licao',
      licao: licao,
      etapas: licao.etapas,
      titulo: licao.titulo,
      subtitulo: licao.subtitulo || ''
    });
  }

  P.ui.licao = { render: render };
})(window.Plataforma);
