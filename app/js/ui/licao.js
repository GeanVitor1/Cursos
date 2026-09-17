window.Plataforma = window.Plataforma || {};

(function (P) {
  function render(params) {
    const licao = P.interno.licoes[params.id];
    if (!licao) {
      P.ui.layout.naoEncontrado();
      return;
    }
    if (!licao.etapas || !licao.etapas.length) {
      P.ui.layout.definirConteudo(P.dom.criar('div', { classe: 'estado-vazio' }, [
        P.dom.criar('h3', { texto: 'Etapa sem conteúdo ainda' }),
        P.dom.criar('p', { texto: 'Esta etapa faz parte do roadmap planejado.' })
      ]));
      return;
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
