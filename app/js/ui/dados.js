window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;
  const comp = P.ui.componentes;

  function formatarTempo(minutos) {
    if (minutos < 60) return minutos + ' min';
    const horas = Math.floor(minutos / 60);
    const resto = minutos % 60;
    return horas + 'h' + (resto ? ' ' + resto + 'min' : '');
  }

  function exportarArquivo() {
    const conteudo = JSON.stringify(P.dados.exportar(), null, 2);
    const blob = new Blob([conteudo], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'progresso.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    P.ui.layout.toast('Arquivo progresso.json gerado', 'sucesso');
  }

  function importarArquivo(arquivo) {
    const leitor = new FileReader();
    leitor.onload = function () {
      try {
        P.dados.importar(JSON.parse(leitor.result));
        P.ui.layout.toast('Progresso importado com sucesso', 'sucesso');
        render();
      } catch (e) {
        P.ui.layout.toast('Falha ao importar: ' + e.message, 'erro');
      }
    };
    leitor.readAsText(arquivo);
  }

  async function resetar() {
    const confirmou = await comp.confirmar({
      titulo: 'Zerar todo o progresso?',
      texto: 'XP, streak e histórico de conceitos serão apagados. Esta ação não pode ser desfeita.',
      rotuloOk: 'Zerar progresso',
      perigo: true
    });
    if (!confirmou) return;
    P.dados.resetar();
    P.ui.layout.toast('Progresso zerado', 'aviso');
    render();
  }

  function statusChip(estado) {
    const mapa = {
      dominado: ['🟢 Dominado', 'sucesso'],
      revisar: ['🟡 Precisa revisar', 'aviso'],
      aprendendo: ['🟡 Aprendendo', 'aviso'],
      dificuldade: ['🔴 Dificuldade', 'erro']
    };
    const def = mapa[estado] || ['⚪ Sem prática', null];
    return comp.chip(def[0], def[1]);
  }

  function render() {
    const resumo = P.progresso.resumo();
    const conceitos = P.dados.resumoConceitos().sort(function (a, b) {
      return (b.erros + b.acertos) - (a.erros + a.acertos);
    });
    const pagina = criar('div', { classe: 'pagina' });

    pagina.appendChild(criar('div', { classe: 'pagina-cabecalho' }, [
      criar('h1', { texto: 'Meu progresso' }),
      criar('p', { classe: 'muted', texto: 'Tudo fica salvo no seu navegador. Exporte o arquivo para backup ou para levar entre dispositivos.' })
    ]));

    if (!P.dados.localStorageDisponivel()) {
      pagina.appendChild(criar('div', { classe: 'bloco-nota atencao' }, [
        criar('span', { classe: 'nota-marca', texto: '!' }),
        criar('div', { texto: 'Este navegador bloqueou o armazenamento local (localStorage). O progresso funciona durante a sessão, mas não será salvo. Exporte o arquivo antes de fechar.' })
      ]));
    }

    pagina.appendChild(criar('div', { classe: 'dados-grid' }, [
      criar('div', { classe: 'stat-card' }, [criar('span', { classe: 'stat-valor', texto: String(resumo.xp) }), criar('span', { classe: 'stat-rotulo', texto: 'XP total' })]),
      criar('div', { classe: 'stat-card' }, [criar('span', { classe: 'stat-valor', texto: 'Nível ' + resumo.nivel.nivel }), criar('span', { classe: 'stat-rotulo', texto: 'faltam ' + Math.max(0, resumo.nivel.proximo - resumo.nivel.xp) + ' XP para o próximo' })]),
      criar('div', { classe: 'stat-card' }, [criar('span', { classe: 'stat-valor', texto: '🔥 ' + resumo.streak.atual }), criar('span', { classe: 'stat-rotulo', texto: 'dias seguidos · recorde ' + resumo.streak.recorde })]),
      criar('div', { classe: 'stat-card' }, [criar('span', { classe: 'stat-valor', texto: String(resumo.licoesConcluidas) }), criar('span', { classe: 'stat-rotulo', texto: 'etapas concluídas' })]),
      criar('div', { classe: 'stat-card' }, [criar('span', { classe: 'stat-valor', texto: formatarTempo(resumo.tempoMinutos) }), criar('span', { classe: 'stat-rotulo', texto: 'tempo estimado de estudo' })]),
      criar('div', { classe: 'stat-card' }, [criar('span', { classe: 'stat-valor', texto: '🟢 ' + resumo.dominados }), criar('span', { classe: 'stat-rotulo', texto: resumo.dificuldade + ' com dificuldade · ' + resumo.revisar + ' a revisar' })])
    ]));

    pagina.appendChild(criar('div', { classe: 'cartao' }, [
      criar('h3', { texto: 'Backup e portabilidade' }),
      criar('p', { classe: 'muted pequeno', texto: 'O arquivo pode ser guardado em data/progresso.json dentro do projeto para versionar sua evolução.' }),
      criar('div', { classe: 'dados-acoes' }, [
        comp.botao('Exportar progresso', { onclick: exportarArquivo }),
        criar('label', { classe: 'btn btn-fantasma' }, [
          'Importar progresso',
          criar('input', {
            type: 'file',
            accept: 'application/json,.json',
            hidden: true,
            onchange: function (ev) {
              if (ev.target.files && ev.target.files[0]) importarArquivo(ev.target.files[0]);
            }
          })
        ]),
        comp.botao('Zerar progresso', { tipo: 'perigo', onclick: resetar })
      ])
    ]));

    const cartaoTabela = criar('div', { classe: 'cartao' });
    cartaoTabela.appendChild(criar('h3', { texto: 'Domínio por conceito' }));
    if (!conceitos.length) {
      cartaoTabela.appendChild(criar('p', { classe: 'muted', texto: 'Pratique uma etapa para começar a medir seu domínio.' }));
    } else {
      const tabela = criar('table', { classe: 'tabela-conceitos' }, [
        criar('thead', {}, [criar('tr', {}, [
          criar('th', { texto: 'Conceito' }),
          criar('th', { texto: 'Domínio' }),
          criar('th', { texto: 'Acertos' }),
          criar('th', { texto: 'Erros' }),
          criar('th', { texto: 'Próxima revisão' }),
          criar('th', { texto: 'Status' })
        ])])
      ]);
      const corpo = criar('tbody');
      conceitos.forEach(function (c) {
        const agenda = c.agenda;
        const proxima = agenda && agenda.proximaEm ? agenda.proximaEm : '—';
        corpo.appendChild(criar('tr', {}, [
          criar('td', { texto: P.progresso.nomeConceito(c.id) }),
          criar('td', {}, [criar('span', { texto: ((c.dominio && c.dominio.geral) || 0) + '%' })]),
          criar('td', { texto: String(c.acertos) }),
          criar('td', { texto: String(c.erros) }),
          criar('td', { texto: proxima }),
          criar('td', {}, [statusChip(c.estado)])
        ]));
      });
      tabela.appendChild(corpo);
      cartaoTabela.appendChild(tabela);
    }
    pagina.appendChild(cartaoTabela);

    P.ui.layout.definirConteudo(pagina);
  }

  P.ui.dados = { render: render };
})(window.Plataforma);
