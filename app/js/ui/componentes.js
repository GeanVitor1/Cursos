window.Plataforma = window.Plataforma || {};

(function (P) {
  P.ui = P.ui || {};
  const d = P.dom;
  const criar = d.criar;

  function botao(rotulo, opcoes) {
    opcoes = opcoes || {};
    const tipo = opcoes.tipo || 'primario';
    const el = criar('button', {
      classe: tipo === 'link' ? 'btn-link' : 'btn btn-' + tipo,
      texto: rotulo
    });
    if (opcoes.classe) el.className = opcoes.classe;
    if (opcoes.id) el.id = opcoes.id;
    if (opcoes.desabilitado) el.disabled = true;
    if (opcoes.onclick) el.addEventListener('click', opcoes.onclick);
    return el;
  }

  function barra(percentual, variante) {
    const preenchimento = criar('div', { classe: 'barra-preenchimento' + (variante ? ' ' + variante : '') });
    preenchimento.style.width = Math.max(0, Math.min(100, percentual || 0)) + '%';
    return criar('div', { classe: 'barra' + (variante ? ' barra-' + variante : '') }, [preenchimento]);
  }

  function chip(texto, variante) {
    return criar('span', { classe: 'chip' + (variante ? ' chip-' + variante : ''), texto: texto });
  }

  function nota(bloco) {
    const tom = bloco.tom || 'info';
    const marcas = { info: 'i', atencao: '!', sucesso: '✓' };
    return criar('div', { classe: 'bloco bloco-nota ' + tom }, [
      criar('span', { classe: 'nota-marca', texto: marcas[tom] || 'i' }),
      criar('div', { html: d.formatar(bloco.texto) })
    ]);
  }

  function blocoCodigo(bloco) {
    const partes = [];
    partes.push(criar('div', { classe: 'codigo-topo' }, [
      criar('span', { texto: bloco.linguagem || 'code' }),
      bloco.titulo ? criar('span', { texto: bloco.titulo }) : null
    ]));
    partes.push(criar('pre', {}, [criar('code', { texto: bloco.codigo || '' })]));
    if (bloco.legenda) partes.push(criar('div', { classe: 'codigo-legenda', html: d.formatar(bloco.legenda) }));
    return criar('figure', { classe: 'bloco codigo-bloco' }, partes);
  }

  function blocoDiagrama(bloco) {
    const partes = [criar('pre', { classe: 'diagrama', texto: bloco.arte || '' })];
    if (bloco.legenda) partes.push(criar('div', { classe: 'diagrama-legenda', html: d.formatar(bloco.legenda) }));
    return criar('div', { classe: 'bloco' }, partes);
  }

  function blocoTabela(bloco) {
    const tabela = criar('table', { classe: 'tabela-dados' });
    if (bloco.colunas) {
      tabela.appendChild(criar('thead', {}, [
        criar('tr', {}, bloco.colunas.map(function (c) { return criar('th', { texto: c }); }))
      ]));
    }
    const corpo = criar('tbody');
    (bloco.linhas || []).forEach(function (linha, indice) {
      const destacada = (bloco.destaques || []).indexOf(indice) !== -1;
      corpo.appendChild(criar('tr', { classe: destacada ? 'linha-destaque' : null }, linha.map(function (valor) {
        return criar('td', { texto: String(valor) });
      })));
    });
    tabela.appendChild(corpo);
    const partes = [];
    if (bloco.titulo) partes.push(criar('div', { classe: 'tabela-titulo', texto: bloco.titulo }));
    partes.push(criar('div', { classe: 'tabela-rolagem' }, [tabela]));
    if (bloco.legenda) partes.push(criar('div', { classe: 'tabela-legenda', html: d.formatar(bloco.legenda) }));
    return criar('div', { classe: 'bloco tabela-bloco' }, partes);
  }

  function blocoTrabalho(bloco) {
    return criar('div', { classe: 'bloco bloco-trabalho' }, [
      criar('div', { classe: 'trabalho-topo' }, [
        criar('span', { classe: 'trabalho-icone', texto: '💼' }),
        criar('span', { classe: 'trabalho-rotulo', texto: bloco.titulo || 'No trabalho' })
      ]),
      criar('div', { classe: 'trabalho-texto', html: d.formatar(bloco.texto) }),
      bloco.fonte ? criar('div', { classe: 'trabalho-fonte', texto: bloco.fonte }) : null
    ]);
  }

  function blocoGlossario(bloco) {
    const itens = (bloco.itens || []).map(function (item) {
      return criar('div', { classe: 'glossario-linha' }, [
        criar('span', { classe: 'glossario-termo', texto: item[0] }),
        criar('span', { classe: 'glossario-sig', texto: item[1] }),
        criar('span', { classe: 'glossario-significado', html: d.formatar(item[2] || '') })
      ]);
    });
    return criar('div', { classe: 'bloco glossario' }, [
      criar('div', { classe: 'tabela-titulo', texto: bloco.titulo || 'Dicionário rápido' })
    ].concat(itens));
  }

  function blocoConceito(bloco) {
    return criar('div', { classe: 'bloco conceito-card', dataset: { conceito: bloco.id } }, [
      criar('div', { classe: 'conceito-topo' }, [
        criar('span', { classe: 'conceito-marca', texto: '📘' }),
        criar('span', { classe: 'conceito-rotulo', texto: 'Conceito novo' }),
        criar('strong', { classe: 'conceito-titulo', texto: bloco.titulo || P.progresso.nomeConceito(bloco.id) })
      ]),
      criar('div', { classe: 'conceito-definicao', html: d.formatar(bloco.texto || '') }),
      bloco.exemplo ? criar('div', { classe: 'conceito-exemplo' }, [
        criar('span', { classe: 'pequeno fraco', texto: 'Exemplo' }),
        criar('code', { texto: bloco.exemplo })
      ]) : null
    ]);
  }

  function blocoRetoma(bloco) {
    const partes = [
      criar('div', { classe: 'retoma-topo' }, [
        criar('span', { classe: 'retoma-icone', texto: '🔗' }),
        criar('span', { classe: 'retoma-rotulo', texto: bloco.titulo || 'Você já aprendeu' })
      ]),
      criar('div', { classe: 'retoma-texto', html: d.formatar(bloco.texto || '') })
    ];
    if (bloco.conceito && P.interno.conceitos[bloco.conceito]) {
      partes.push(criar('button', {
        classe: 'btn-link',
        texto: 'Relembrar: ' + P.progresso.nomeConceito(bloco.conceito),
        onclick: function () { abrirConceito(bloco.conceito); }
      }));
    }
    return criar('div', { classe: 'bloco bloco-retoma' }, partes);
  }

  function blocoFuturo(bloco) {
    return criar('div', { classe: 'bloco bloco-futuro' }, [
      criar('div', { classe: 'futuro-topo' }, [
        criar('span', { classe: 'futuro-icone', texto: '🧭' }),
        criar('span', { classe: 'futuro-rotulo', texto: bloco.titulo || 'Isso será importante depois' })
      ]),
      criar('div', { classe: 'futuro-texto', html: d.formatar(bloco.texto || '') })
    ]);
  }

  function definicaoConceito(id) {
    const registro = P.interno.registroConceitos;
    let info = registro && registro.conceitos ? registro.conceitos[id] : null;
    if (!info) {
      Object.keys(P.interno.licoes).forEach(function (lid) {
        if (info) return;
        (P.interno.licoes[lid].etapas || []).forEach(function (etapa) {
          (etapa.blocos || []).forEach(function (b) {
            if (b && b.tipo === 'conceito' && b.id === id) {
              info = { definicao: b.texto, exemplo: b.exemplo, licao: lid, titulo: b.titulo };
            }
          });
        });
      });
    } else {
      info = Object.assign({}, info);
      Object.keys(P.interno.licoes).forEach(function (lid) {
        (P.interno.licoes[lid].etapas || []).forEach(function (etapa) {
          (etapa.blocos || []).forEach(function (b) {
            if (b && b.tipo === 'conceito' && b.id === id && !info.licao) info.licao = lid;
          });
        });
      });
    }
    return info;
  }

  function abrirConceito(id) {
    const info = definicaoConceito(id);
    const nome = P.progresso.nomeConceito(id);
    return new Promise(function (resolver) {
      const fundo = criar('div', { classe: 'modal-fundo' });
      const caixa = criar('div', { classe: 'modal' }, [
        criar('span', { classe: 'pequeno fraco', texto: info && info.licao ? 'Ensinado em: ' + (P.interno.licoes[info.licao] || {}).titulo : 'Definição' }),
        criar('h3', { texto: nome }),
        criar('p', { html: d.formatar((info && info.definicao) || 'A definição deste conceito aparece na lição em que ele é introduzido.') }),
        info && info.exemplo ? criar('div', { classe: 'conceito-exemplo' }, [
          criar('span', { classe: 'pequeno fraco', texto: 'Exemplo' }),
          criar('code', { texto: info.exemplo })
        ]) : null,
        criar('div', { classe: 'modal-acoes' }, [
          criar('button', { classe: 'btn btn-primario', texto: 'Entendi', onclick: fechar })
        ])
      ]);
      fundo.appendChild(caixa);
      function fechar() { fundo.remove(); resolver(true); }
      fundo.addEventListener('click', function (ev) { if (ev.target === fundo) fechar(); });
      document.body.appendChild(fundo);
    });
  }

  function blocoVocab(bloco) {
    const linhas = (bloco.pares || []).map(function (par) {
      return criar('div', { classe: 'vocab-linha' }, [
        criar('div', { classe: 'vocab-en', texto: par[0] }),
        criar('div', { classe: 'vocab-pt', texto: par[1] })
      ]);
    });
    const partes = [];
    if (bloco.titulo) partes.push(criar('div', { classe: 'tabela-titulo', texto: bloco.titulo }));
    partes.push(criar('div', { classe: 'vocab' }, linhas));
    return criar('div', { classe: 'bloco tabela-bloco' }, partes);
  }

  function blocoIngles(def) {
    const partes = [
      criar('div', { classe: 'ingles-topo' }, [
        criar('div', { classe: 'ingles-rotulo', texto: 'English' }),
        criar('button', {
          classe: 'btn-link btn-ouvir',
          texto: '🔊 Ouvir',
          title: 'Ouvir a pronúncia',
          onclick: function () { falar(def.frase); }
        })
      ]),
      criar('div', { classe: 'ingles-frase', texto: def.frase })
    ];
    if (def.traducao && !def.ocultarTraducao) {
      partes.push(criar('div', { classe: 'ingles-traducao', texto: def.traducao }));
    } else if (def.traducao) {
      const traducao = criar('div', { classe: 'ingles-traducao', texto: def.traducao, hidden: true });
      const alternar = criar('button', {
        classe: 'btn-link',
        texto: 'Mostrar tradução',
        onclick: function () {
          traducao.hidden = !traducao.hidden;
          alternar.textContent = traducao.hidden ? 'Mostrar tradução' : 'Ocultar tradução';
        }
      });
      partes.push(traducao, alternar);
    }
    return criar('div', { classe: 'bloco bloco-ingles' }, partes);
  }

  function falar(texto) {
    if (!texto || !window.speechSynthesis) return;
    try {
      const fala = new SpeechSynthesisUtterance(texto);
      fala.lang = 'en-US';
      fala.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(fala);
    } catch (e) { /* áudio indisponível */ }
  }

  function blocoConteudo(bloco) {
    if (!bloco) return null;
    if (typeof bloco === 'string') {
      return criar('p', { classe: 'bloco bloco-texto', html: d.formatar(bloco) });
    }
    switch (bloco.tipo) {
      case 'texto':
        return criar('p', { classe: 'bloco bloco-texto', html: d.formatar(bloco.texto) });
      case 'destaque':
        return criar('div', { classe: 'bloco bloco-destaque', html: d.formatar(bloco.texto) });
      case 'nota':
        return nota(bloco);
      case 'lista':
        return criar('ul', { classe: 'bloco bloco-lista' }, (bloco.itens || []).map(function (item) {
          return criar('li', { html: d.formatar(item) });
        }));
      case 'passos':
        return criar('ol', { classe: 'bloco bloco-passos' }, (bloco.itens || []).map(function (item) {
          return criar('li', { html: d.formatar(item) });
        }));
      case 'codigo':
        return blocoCodigo(bloco);
      case 'diagrama':
        return blocoDiagrama(bloco);
      case 'tabela':
        return blocoTabela(bloco);
      case 'vocab':
        return blocoVocab(bloco);
      case 'trabalho':
        return blocoTrabalho(bloco);
      case 'glossario':
        return blocoGlossario(bloco);
      case 'conceito':
        return blocoConceito(bloco);
      case 'retoma':
        return blocoRetoma(bloco);
      case 'futuro':
        return blocoFuturo(bloco);
      case 'ingles':
        return blocoIngles(bloco);
      default:
        return criar('p', { classe: 'bloco bloco-texto', html: d.formatar(bloco.texto || '') });
    }
  }

  const simbolosConceito = { dominado: '🟢', revisar: '🟡', aprendendo: '🟡', dificuldade: '🔴' };

  function chipConceito(id) {
    const estado = P.dados.estadoConceito(id);
    const marca = estado ? (simbolosConceito[estado] || '🟡') : '⚪';
    const el = criar('button', {
      classe: 'chip chip-conceito chip-conceito-botao',
      type: 'button',
      title: 'O que é isso?',
      texto: marca + ' ' + P.progresso.nomeConceito(id),
      onclick: function () { abrirConceito(id); }
    });
    return el;
  }

  function confirmar(opcoes) {
    opcoes = opcoes || {};
    return new Promise(function (resolver) {
      const fundo = criar('div', { classe: 'modal-fundo' });
      const caixa = criar('div', { classe: 'modal' }, [
        criar('h3', { texto: opcoes.titulo || 'Confirmar' }),
        criar('p', { html: d.formatar(opcoes.texto || '') }),
        criar('div', { classe: 'modal-acoes' }, [
          criar('button', { classe: 'btn btn-fantasma', texto: opcoes.rotuloCancelar || 'Cancelar', onclick: function () { fechar(false); } }),
          criar('button', { classe: 'btn ' + (opcoes.perigo ? 'btn-perigo' : 'btn-primario'), texto: opcoes.rotuloOk || 'Confirmar', onclick: function () { fechar(true); } })
        ])
      ]);
      fundo.appendChild(caixa);
      function fechar(valor) {
        fundo.remove();
        resolver(valor);
      }
      fundo.addEventListener('click', function (ev) { if (ev.target === fundo) fechar(false); });
      document.body.appendChild(fundo);
      const primeiro = caixa.querySelector('.btn');
      if (primeiro) primeiro.focus();
    });
  }

  P.ui.componentes = {
    botao: botao,
    barra: barra,
    chip: chip,
    chipConceito: chipConceito,
    blocoConteudo: blocoConteudo,
    blocoIngles: blocoIngles,
    falar: falar,
    confirmar: confirmar,
    definicaoConceito: definicaoConceito,
    abrirConceito: abrirConceito
  };
  P.ui.modal = { confirmar: confirmar };
})(window.Plataforma);
