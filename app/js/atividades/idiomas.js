window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;

  function falarIngles(texto, lento) {
    if (!texto || !window.speechSynthesis) return false;
    try {
      const fala = new SpeechSynthesisUtterance(texto);
      fala.lang = 'en-US';
      fala.rate = lento ? 0.7 : 0.92;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(fala);
      return true;
    } catch (e) {
      return false;
    }
  }

  P.atividades.registrar('listening', {
    rotulo: 'Listening',
    render: function (atv, area, api) {
      const wrap = criar('div', { classe: 'listening' });
      const controles = criar('div', { classe: 'listening-controles' });
      const textoOculto = criar('div', { classe: 'listening-texto', hidden: true });
      const suportaAudio = !!window.speechSynthesis;

      const botaoOuvir = criar('button', {
        classe: 'btn btn-primario listening-botao',
        type: 'button',
        texto: '🔊 Ouvir',
        onclick: function () { falarIngles(atv.audio, false); }
      });
      const botaoLento = criar('button', {
        classe: 'btn btn-suave listening-botao',
        type: 'button',
        texto: '🐢 Devagar',
        onclick: function () { falarIngles(atv.audio, true); }
      });
      const botaoTexto = criar('button', {
        classe: 'btn-link',
        type: 'button',
        texto: 'Não consigo ouvir — mostrar texto',
        onclick: function () {
          textoOculto.hidden = !textoOculto.hidden;
          botaoTexto.textContent = textoOculto.hidden ? 'Não consigo ouvir — mostrar texto' : 'Ocultar texto';
        }
      });
      controles.appendChild(botaoOuvir);
      controles.appendChild(botaoLento);
      wrap.appendChild(controles);
      wrap.appendChild(botaoTexto);
      if (atv.audio) textoOculto.appendChild(criar('span', { classe: 'ingles-frase', texto: atv.audio }));
      wrap.appendChild(textoOculto);
      if (!suportaAudio) {
        textoOculto.hidden = false;
        wrap.appendChild(criar('div', { classe: 'bloco-nota info' }, [
          criar('span', { classe: 'nota-marca', texto: 'i' }),
          criar('div', { texto: 'Seu navegador não tem voz em inglês disponível. O texto apareceu para você continuar praticando — tente outro navegador para ouvir a pronúncia.' })
        ]));
      } else {
        window.setTimeout(function () { botaoOuvir.focus(); }, 100);
      }

      if (atv.modo === 'escrever') {
        const input = criar('input', {
          classe: 'listening-input',
          type: 'text',
          placeholder: atv.placeholder || 'Escreva o que você ouviu...',
          autocomplete: 'off',
          autocapitalize: 'off',
          spellcheck: 'false'
        });
        wrap.appendChild(input);
        input.addEventListener('input', function () {
          api.marcarRespondida(input.value.trim().length > 1);
        });
        area.appendChild(wrap);
        function normalizar(t) {
          return String(t).toLowerCase().replace(/[.,!?;:'"’]/g, '').replace(/\s+/g, ' ').trim();
        }
        return {
          verificar: function () {
            const certo = normalizar(input.value) === normalizar(atv.resposta);
            input.classList.add(certo ? 'correta' : 'errada');
            return { correto: certo, selecionada: null };
          },
          revelar: function () {
            input.value = atv.resposta;
            input.readOnly = true;
            input.classList.remove('errada');
            input.classList.add('correta');
          },
          prepararNovaTentativa: function () {
            input.classList.remove('correta', 'errada');
            input.readOnly = false;
            api.marcarRespondida(input.value.trim().length > 1);
          },
          focar: function () { input.focus(); }
        };
      }

      const opcoes = atv.opcoes || [];
      let selecionada = null;
      let travado = false;
      const lista = criar('div', { classe: 'opcoes listening-opcoes' });
      const botoes = opcoes.map(function (texto, i) {
        const botao = criar('button', {
          classe: 'opcao',
          type: 'button',
          onclick: function () {
            if (travado) return;
            botoes.forEach(function (b) { b.classList.remove('selecionada'); });
            botao.classList.add('selecionada');
            selecionada = i;
            api.marcarRespondida(true);
          }
        }, [
          criar('span', { classe: 'opcao-marcador', texto: String.fromCharCode(65 + i) }),
          criar('span', { texto: texto })
        ]);
        lista.appendChild(botao);
        return botao;
      });
      wrap.appendChild(lista);
      area.appendChild(wrap);

      return {
        verificar: function () {
          travado = true;
          botoes.forEach(function (b, i) {
            b.classList.remove('selecionada');
            if (i === atv.correta) b.classList.add('correta');
          });
          if (selecionada !== atv.correta && selecionada != null) botoes[selecionada].classList.add('errada');
          return { correto: selecionada === atv.correta, selecionada: selecionada };
        },
        revelar: function () {
          travado = true;
          botoes.forEach(function (b, i) {
            if (i === atv.correta) b.classList.add('correta');
          });
        },
        prepararNovaTentativa: function () {
          travado = false;
          selecionada = null;
          botoes.forEach(function (b) { b.classList.remove('correta', 'errada', 'selecionada'); });
          api.marcarRespondida(false);
        }
      };
    }
  });

  P.atividades.registrar('choose-image', {
    rotulo: 'Escolher a imagem',
    render: function (atv, area, api) {
      const grid = criar('div', { classe: 'imagem-grid' });
      const opcoes = atv.opcoes || [];
      let selecionada = null;
      let travado = false;
      if (atv.audio) {
        const ouvir = criar('button', {
          classe: 'btn btn-suave',
          type: 'button',
          texto: '🔊 Ouvir a palavra',
          onclick: function () { falarIngles(atv.audio, false); }
        });
        area.appendChild(criar('div', { classe: 'listening-controles' }, [ouvir]));
      }
      const botoes = opcoes.map(function (opcao, i) {
        const texto = typeof opcao === 'string' ? opcao : opcao.texto;
        const emoji = typeof opcao === 'string' ? '' : opcao.emoji;
        const botao = criar('button', {
          classe: 'imagem-card',
          type: 'button',
          title: texto || '',
          onclick: function () {
            if (travado) return;
            botoes.forEach(function (b) { b.classList.remove('selecionada'); });
            botao.classList.add('selecionada');
            selecionada = i;
            api.marcarRespondida(true);
          }
        }, [
          criar('span', { classe: 'imagem-emoji', texto: emoji }),
          texto ? criar('span', { classe: 'imagem-rotulo', texto: texto }) : null
        ]);
        grid.appendChild(botao);
        return botao;
      });
      area.appendChild(grid);

      return {
        verificar: function () {
          travado = true;
          botoes.forEach(function (b, i) {
            b.classList.remove('selecionada');
            if (i === atv.correta) b.classList.add('correta');
          });
          if (selecionada !== atv.correta && selecionada != null) botoes[selecionada].classList.add('errada');
          return { correto: selecionada === atv.correta, selecionada: selecionada };
        },
        revelar: function () {
          travado = true;
          botoes.forEach(function (b, i) { if (i === atv.correta) b.classList.add('correta'); });
        },
        prepararNovaTentativa: function () {
          travado = false;
          selecionada = null;
          botoes.forEach(function (b) { b.classList.remove('correta', 'errada', 'selecionada'); });
          api.marcarRespondida(false);
        }
      };
    }
  });

  P.atividades.registrar('dialogue', {
    rotulo: 'Diálogo',
    render: function (atv, area, api) {
      const turnos = atv.turnos || [];
      const conversa = criar('div', { classe: 'dialogo' });
      if (atv.cena) conversa.appendChild(criar('div', { classe: 'dialogo-cena', texto: atv.cena }));
      const linhas = criar('div', { classe: 'dialogo-linhas' });
      const opcoesBox = criar('div', { classe: 'dialogo-opcoes' });
      conversa.appendChild(linhas);
      conversa.appendChild(opcoesBox);
      area.appendChild(conversa);

      let indice = 0;
      let erros = 0;
      let travado = false;

      function bolha(quem, texto) {
        return criar('div', { classe: 'dialogo-bolha ' + (quem === 'outro' ? 'outro' : 'jogador') }, [
          criar('span', { classe: 'dialogo-quem', texto: quem === 'outro' ? (atv.interlocutor || 'A') : 'Você' }),
          criar('span', { texto: texto })
        ]);
      }

      function renderTurno() {
        travado = false;
        P.dom.limpar(opcoesBox);
        if (indice >= turnos.length) {
          api.marcarRespondida(true);
          return;
        }
        const turno = turnos[indice];
        linhas.appendChild(bolha('outro', turno.fala));
        if (turno.audio !== false) falarIngles(turno.fala, false);
        const botoes = (turno.opcoes || []).map(function (texto, i) {
          const botao = criar('button', {
            classe: 'opcao dialogo-opcao',
            type: 'button',
            onclick: function () {
              if (travado) return;
              travado = true;
              const certo = i === turno.correta;
              if (!certo) erros += 1;
              botoes.forEach(function (b, j) {
                if (j === turno.correta) b.classList.add('correta');
              });
              if (!certo) botao.classList.add('errada');
              linhas.appendChild(bolha('jogador', turno.opcoes[turno.correta]));
              indice += 1;
              window.setTimeout(renderTurno, certo ? 550 : 900);
            }
          }, [
            criar('span', { classe: 'opcao-marcador', texto: String.fromCharCode(65 + i) }),
            criar('span', { texto: texto })
          ]);
          opcoesBox.appendChild(botao);
          return botao;
        });
      }

      renderTurno();
      api.marcarRespondida(false);

      return {
        verificar: function () {
          travado = true;
          return { correto: indice >= turnos.length && erros === 0, selecionada: null };
        },
        revelar: function () {
          travado = true;
          P.dom.limpar(opcoesBox);
          while (indice < turnos.length) {
            linhas.appendChild(bolha('jogador', turnos[indice].opcoes[turnos[indice].correta]));
            indice += 1;
          }
          api.marcarRespondida(true);
        },
        prepararNovaTentativa: function () {
          P.dom.limpar(linhas);
          P.dom.limpar(opcoesBox);
          indice = 0;
          erros = 0;
          renderTurno();
          api.marcarRespondida(false);
        }
      };
    }
  });
})(window.Plataforma);
