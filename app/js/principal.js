window.Plataforma = window.Plataforma || {};

(function (P) {
  function erroFatal(erro) {
    const app = document.getElementById('app');
    P.dom.limpar(app);
    app.appendChild(P.dom.criar('div', { classe: 'tela-erro' }, [
      P.dom.criar('h1', { texto: 'Não foi possível carregar a plataforma' }),
      P.dom.criar('p', { classe: 'muted', texto: 'Verifique se todos os arquivos do projeto estão presentes e recarregue a página. Se abriu o arquivo direto do disco, tente servir a pasta com um servidor local (por exemplo: npx serve).' }),
      P.dom.criar('pre', { classe: 'erro-caixa', texto: String((erro && erro.message) || erro || 'Erro desconhecido') })
    ]));
  }

  async function iniciar() {
    try {
      await P.carregador.carregarTudo();
    } catch (e) {
      erroFatal(e);
      return;
    }

    P.ui.layout.montar();

    const reparadas = P.dados.repararProgresso();
    if (reparadas) {
      P.ui.layout.toast(
        reparadas === 1
          ? 'Ajuste no progresso: 1 etapa que ficou para trás foi marcada como concluída para não te prender. Você pode revê-la quando quiser.'
          : 'Ajuste no progresso: ' + reparadas + ' etapas que ficaram para trás foram marcadas como concluídas para não te prender. Você pode revê-las quando quiser.',
        'aviso'
      );
    }

    P.roteador.registrar('/', function () { P.ui.inicio.render(); });
    P.roteador.registrar('/mapa', function () { P.ui.mapa.render(); });
    P.roteador.registrar('/trilha/:id', function (params) { P.ui.trilha.render(params); });
    P.roteador.registrar('/licao/:id', function (params) { P.ui.licao.render(params); });
    P.roteador.registrar('/revisao', function () { P.ui.revisao.render(); });
    P.roteador.registrar('/revisao/:min', function (params) { P.ui.revisao.render(params); });
    P.roteador.registrar('/revisao/:min/:escopo', function (params) { P.ui.revisao.render(params); });
    P.roteador.registrar('/certificacoes', function () { P.ui.certificacoes.render(); });
    P.roteador.registrar('/projetos', function () { P.ui.projetos.render(); });
    P.roteador.registrar('/entrevistas', function () { P.ui.entrevistas.render(); });
    P.roteador.registrar('/dados', function () { P.ui.dados.render(); });
    P.roteador.registrar('/glossario', function () { P.ui.glossario.render(); });
    P.roteador.registrar('/nivelamento', function () { P.ui.nivelamento.render(); });

    P.roteador.iniciar();
  }

  window.addEventListener('error', function (ev) {
    if (ev.error && !document.querySelector('.runner') && !document.querySelector('.home')) {
      erroFatal(ev.error);
    }
  });

  iniciar();
})(window.Plataforma);
