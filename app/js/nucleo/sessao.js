window.Plataforma = window.Plataforma || {};

(function (P) {
  let sessao = null;
  let intervalo = null;

  function restanteMs() {
    if (!sessao) return 0;
    return sessao.duracaoMs - (Date.now() - sessao.inicio);
  }

  function info() {
    if (!sessao) return null;
    const restante = Math.max(0, restanteMs());
    return {
      minutos: sessao.minutos,
      tipo: sessao.tipo,
      restanteMs: restante,
      expirada: restante <= 0
    };
  }

  function atualizar() {
    if (!sessao) return;
    if (P.ui && P.ui.layout && P.ui.layout.atualizarSessao) {
      P.ui.layout.atualizarSessao(info());
    }
    if (restanteMs() <= 0 && !sessao.avisada) {
      sessao.avisada = true;
      if (P.ui && P.ui.layout && P.ui.layout.toast) {
        P.ui.layout.toast('Tempo planejado concluído. Ótimo trabalho!', 'aviso');
      }
    }
  }

  function iniciar(minutos, tipo) {
    encerrar();
    sessao = {
      minutos: minutos,
      tipo: tipo || 'estudo',
      inicio: Date.now(),
      duracaoMs: minutos * 60000,
      avisada: false
    };
    intervalo = window.setInterval(atualizar, 1000);
    atualizar();
    return info();
  }

  function encerrar() {
    if (intervalo) {
      window.clearInterval(intervalo);
      intervalo = null;
    }
    sessao = null;
    if (P.ui && P.ui.layout && P.ui.layout.atualizarSessao) P.ui.layout.atualizarSessao(null);
  }

  P.sessao = {
    iniciar: iniciar,
    encerrar: encerrar,
    info: info,
    ativa: function () { return !!sessao; }
  };
})(window.Plataforma);
