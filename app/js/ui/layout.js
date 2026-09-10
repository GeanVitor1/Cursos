window.Plataforma = window.Plataforma || {};

(function (P) {
  P.ui = P.ui || {};
  const criar = P.dom.criar;

  const itensFixos = [
    { rota: 'inicio', rotulo: 'Início', icone: '◆', hash: '#/' },
    { rota: 'mapa', rotulo: 'Mapa de carreira', icone: '⬢', hash: '#/mapa' },
    { rota: 'revisao', rotulo: 'Revisão', icone: '↻', hash: '#/revisao' },
    { rota: 'glossario', rotulo: 'Glossário', icone: '📘', hash: '#/glossario' },
    { rota: 'certificacoes', rotulo: 'Certificações', icone: '✓', hash: '#/certificacoes' },
    { rota: 'projetos', rotulo: 'Projetos', icone: '▣', hash: '#/projetos' },
    { rota: 'entrevistas', rotulo: 'Entrevistas', icone: '◈', hash: '#/entrevistas' },
    { rota: 'dados', rotulo: 'Meu progresso', icone: '▤', hash: '#/dados' }
  ];

  let conteudoEl = null;
  let chipSessao = null;

  function itemNav(rota, rotulo, icone, hash, pct) {
    const filhos = [
      criar('span', { classe: 'nav-icone' + (String(icone).length > 1 ? ' nav-sigla' : ''), texto: icone }),
      criar('span', { texto: rotulo })
    ];
    if (pct != null) {
      const span = criar('span', { classe: 'nav-pct' });
      span.dataset.pctTrilha = rota.indexOf('trilha-') === 0 ? rota.slice('trilha-'.length) : rota;
      span.textContent = pct + '%';
      filhos.push(span);
    }
    return criar('button', {
      classe: 'nav-item',
      dataset: { rota: rota },
      onclick: function () {
        fecharMenu();
        P.roteador.ir(hash);
      }
    }, filhos);
  }

  function montarSidebar() {
    const marca = criar('div', { classe: 'sidebar-marca' }, [
      criar('div', { classe: 'marca-logo', texto: 'T' }),
      criar('div', { classe: 'marca' }, [
        document.createTextNode('Trilha'),
        criar('span', { texto: '.NET' })
      ])
    ]);

    const nav = criar('nav', { classe: 'sidebar-nav' }, [
      criar('div', { classe: 'nav-titulo', texto: 'Plataforma' })
    ]);
    itensFixos.forEach(function (item) {
      nav.appendChild(itemNav(item.rota, item.rotulo, item.icone, item.hash));
    });
    nav.appendChild(criar('div', { classe: 'nav-titulo', texto: 'Trilhas' }));
    P.progresso.trilhas().forEach(function (t) {
      const resumo = P.progresso.daTrilha(t.id);
      const item = itemNav('trilha-' + t.id, t.curto || t.nome || t.id, t.sigla || '•', '#/trilha/' + t.id, resumo ? resumo.percentual : 0);
      if (resumo && resumo.status === 'bloqueada') item.classList.add('bloqueada');
      nav.appendChild(item);
    });

    const stats = criar('div', { classe: 'rodape-stats' });
    const rodape = criar('div', { classe: 'sidebar-rodape' }, [
      stats,
      criar('button', { classe: 'btn-link', texto: 'Alternar tema', onclick: alternarTema })
    ]);

    return criar('aside', { classe: 'sidebar' }, [marca, nav, rodape]);
  }

  function montar() {
    const app = document.getElementById('app');
    P.dom.limpar(app);
    chipSessao = criar('div', { classe: 'chip-sessao', hidden: true });
    const botaoMenu = criar('button', {
      classe: 'menu-botao',
      title: 'Abrir menu',
      texto: '☰',
      onclick: abrirMenu
    });
    const topo = criar('header', { classe: 'topo' }, [
      criar('div', { classe: 'topo-esquerda' }, [
        botaoMenu,
        criar('span', { classe: 'topo-titulo', texto: 'Formação Full Stack .NET — uma etapa por vez' })
      ]),
      criar('div', { classe: 'topo-direita' }, [chipSessao])
    ]);
    conteudoEl = criar('main', { classe: 'conteudo', id: 'conteudo' });
    const area = criar('div', { classe: 'area' }, [topo, conteudoEl]);
    const fundo = criar('div', { classe: 'drawer-fundo', onclick: fecharMenu });
    const navInferior = criar('nav', { classe: 'bottom-nav' }, [
      itemInferior('inicio', 'Início', '◆', '#/'),
      itemInferior('mix-ingles', 'Inglês', 'EN', '#/trilha/ingles'),
      itemInferior('revisao', 'Revisão', '↻', '#/revisao'),
      itemInferior('dados', 'Progresso', '▤', '#/dados'),
      botaoMenuInferior()
    ]);
    app.appendChild(criar('div', { classe: 'app-shell' }, [montarSidebar(), area, fundo, navInferior]));
    aplicarTema(P.dados.tema());
    P.dados.aoMudar(atualizarEstatisticas);
    atualizarEstatisticas();
  }

  function itemInferior(rota, rotulo, icone, hash) {
    return criar('button', {
      classe: 'bottom-item',
      dataset: { rota: rota },
      onclick: function () { P.roteador.ir(hash); }
    }, [
      criar('span', { classe: 'bottom-icone', texto: icone }),
      criar('span', { classe: 'bottom-rotulo', texto: rotulo })
    ]);
  }

  function botaoMenuInferior() {
    return criar('button', {
      classe: 'bottom-item',
      title: 'Abrir menu completo',
      onclick: abrirMenu
    }, [
      criar('span', { classe: 'bottom-icone', texto: '☰' }),
      criar('span', { classe: 'bottom-rotulo', texto: 'Menu' })
    ]);
  }

  function abrirMenu() {
    const shell = document.querySelector('.app-shell');
    if (shell) shell.classList.add('menu-aberto');
    const fundo = document.querySelector('.drawer-fundo');
    if (fundo) fundo.classList.add('visivel');
  }

  function fecharMenu() {
    const shell = document.querySelector('.app-shell');
    if (shell) shell.classList.remove('menu-aberto');
    const fundo = document.querySelector('.drawer-fundo');
    if (fundo) fundo.classList.remove('visivel');
  }

  function definirConteudo(elemento) {
    if (!conteudoEl) return;
    P.dom.limpar(conteudoEl);
    if (elemento) conteudoEl.appendChild(elemento);
    window.scrollTo(0, 0);
  }

  function marcarAtivo(rota, param) {
    const alvo = rota === 'trilha' && param ? 'trilha-' + param : (rota === 'inicio' ? 'inicio' : rota);
    document.querySelectorAll('.nav-item').forEach(function (el) {
      el.classList.toggle('ativo', el.dataset.rota === alvo);
    });
    document.querySelectorAll('.bottom-item').forEach(function (el) {
      const r = el.dataset.rota;
      if (!r) return;
      let ativo = false;
      if (r === 'inicio') ativo = rota === 'inicio';
      else if (r === 'mix-ingles') ativo = (rota === 'trilha' && param === 'ingles') || rota === 'nivelamento';
      else if (r === 'mix-revisao') ativo = rota === 'revisao';
      else ativo = r === rota;
      el.classList.toggle('ativo', ativo);
    });
    fecharMenu();
  }

  function atualizarEstatisticas() {
    const resumo = P.progresso.resumo();
    document.querySelectorAll('[data-pct-trilha]').forEach(function (el) {
      const r = P.progresso.daTrilha(el.dataset.pctTrilha);
      if (!r) {
        el.textContent = '—';
      } else if (r.status === 'bloqueada') {
        el.textContent = '🔒';
      } else if (r.status === 'planejada') {
        el.textContent = '—';
      } else {
        el.textContent = r.percentual + '%';
      }
    });
    document.querySelectorAll('.nav-item[data-rota^="trilha-"]').forEach(function (el) {
      const id = el.dataset.rota.slice('trilha-'.length);
      const r = P.progresso.daTrilha(id);
      el.classList.toggle('bloqueada', !!(r && r.status === 'bloqueada'));
    });
    const stats = document.querySelector('.rodape-stats');
    if (stats) {
      P.dom.limpar(stats);
      stats.appendChild(criar('span', { classe: 'stat-mini', texto: '🔥 ' + resumo.streak.atual + (resumo.streak.atual === 1 ? ' dia' : ' dias') }));
      stats.appendChild(criar('span', { classe: 'stat-mini', texto: 'Nível ' + resumo.nivel.nivel }));
      stats.appendChild(criar('span', { classe: 'stat-mini', texto: resumo.xp + ' XP' }));
    }
  }

  function atualizarSessao(info) {
    if (!chipSessao) return;
    if (!info) {
      chipSessao.hidden = true;
      return;
    }
    chipSessao.hidden = false;
    chipSessao.classList.toggle('expirada', info.expirada);
    P.dom.limpar(chipSessao);
    let texto = 'Tempo concluído';
    if (!info.expirada) {
      const total = Math.max(0, Math.floor(info.restanteMs / 1000));
      const min = String(Math.floor(total / 60)).padStart(2, '0');
      const seg = String(total % 60).padStart(2, '0');
      texto = 'Sessão ' + min + ':' + seg;
    }
    chipSessao.appendChild(criar('span', { texto: texto }));
    chipSessao.appendChild(criar('button', {
      texto: '×',
      title: 'Encerrar sessão',
      onclick: function () { P.sessao.encerrar(); }
    }));
  }

  function toast(mensagem, tipo) {
    const container = document.getElementById('toasts');
    if (!container) return;
    const el = criar('div', { classe: 'toast' + (tipo ? ' ' + tipo : ''), texto: mensagem });
    container.appendChild(el);
    window.requestAnimationFrame(function () { el.classList.add('visivel'); });
    window.setTimeout(function () {
      el.classList.remove('visivel');
      window.setTimeout(function () { el.remove(); }, 250);
    }, 3200);
  }

  function aplicarTema(tema) {
    document.documentElement.setAttribute('data-tema', tema === 'escuro' ? 'escuro' : 'claro');
  }

  function alternarTema() {
    const novo = P.dados.tema() === 'escuro' ? 'claro' : 'escuro';
    P.dados.definirTema(novo);
    aplicarTema(novo);
  }

  function naoEncontrado() {
    const comp = P.ui.componentes;
    definirConteudo(criar('div', { classe: 'estado-vazio' }, [
      criar('h3', { texto: 'Página não encontrada' }),
      criar('p', { texto: 'O endereço acessado não existe nesta plataforma.' }),
      comp.botao('Voltar ao início', { onclick: function () { P.roteador.ir('#/'); } })
    ]));
  }

  P.ui.layout = {
    montar: montar,
    definirConteudo: definirConteudo,
    marcarAtivo: marcarAtivo,
    atualizarEstatisticas: atualizarEstatisticas,
    atualizarSessao: atualizarSessao,
    toast: toast,
    aplicarTema: aplicarTema,
    alternarTema: alternarTema,
    naoEncontrado: naoEncontrado,
    abrirMenu: abrirMenu,
    fecharMenu: fecharMenu
  };
})(window.Plataforma);
