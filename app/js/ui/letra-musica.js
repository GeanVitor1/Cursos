/* Estudo de letra de música parte por parte.
   A letra é colada pelo próprio aluno (direitos autorais) e fica salva só neste navegador. */
(function () {
  const P = window.Plataforma;

  function chave(id) { return 'letra-musica:' + id; }
  function ler(id) {
    try { return JSON.parse(localStorage.getItem(chave(id)) || 'null'); } catch (e) { return null; }
  }
  function salvar(id, dados) {
    try { localStorage.setItem(chave(id), JSON.stringify(dados)); } catch (e) { /* armazenamento indisponível */ }
  }

  function el(tag, attrs, filhos) {
    const n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'texto') n.textContent = attrs[k];
      else if (k === 'classe') n.className = attrs[k];
      else if (k.indexOf('on') === 0) n.addEventListener(k.slice(2), attrs[k]);
      else n.setAttribute(k, attrs[k]);
    });
    (filhos || []).forEach(function (f) { if (f) n.appendChild(f); });
    return n;
  }

  function falar(texto, lento) {
    if (!texto || !window.speechSynthesis) return;
    try {
      const f = new SpeechSynthesisUtterance(texto);
      f.lang = 'en-US'; f.rate = lento ? 0.65 : 0.9;
      window.speechSynthesis.cancel(); window.speechSynthesis.speak(f);
    } catch (e) { /* sem áudio */ }
  }

  // Divide em partes: estrofes separadas por linha em branco; estrofes longas viram partes de até 4 linhas.
  function dividir(texto) {
    const partes = [];
    String(texto || '').replace(/\r/g, '').split(/\n\s*\n/).forEach(function (bloco) {
      const linhas = bloco.split('\n').map(function (l) { return l.trim(); })
        .filter(function (l) { return l && !/^\[.*\]$/.test(l); });
      for (let i = 0; i < linhas.length; i += 4) partes.push(linhas.slice(i, i + 4));
    });
    return partes;
  }

  function normalizar(p) { return String(p || '').toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9']/g, ''); }

  function render(def) {
    const id = String(def.youtube || def.titulo || 'musica');
    let dados = ler(id) || { letra: '', traducoes: {}, concluidas: {} };
    const raiz = el('div', { classe: 'letra-estudo' });

    function persistir() { salvar(id, dados); }

    function telaColar() {
      raiz.innerHTML = '';
      const area = el('textarea', { classe: 'letra-colar', rows: '10', placeholder: 'Cole aqui a letra em inglês (copie de um site de letras ou da descrição do vídeo). Deixe uma linha em branco entre as estrofes.' });
      area.value = dados.letra || '';
      raiz.appendChild(el('div', { classe: 'letra-rotulo', texto: '🎤 Estudar a letra parte por parte' }));
      raiz.appendChild(el('p', { classe: 'letra-ajuda', texto: 'Cole a letra uma vez: ela é dividida em partes curtas e fica salva neste navegador. Em cada parte você ouve, entende, traduz e depois completa as palavras de memória.' }));
      raiz.appendChild(area);
      raiz.appendChild(el('button', { type: 'button', classe: 'btn btn-primario', texto: 'Começar o estudo', onclick: function () {
        if (!area.value.trim()) { area.focus(); return; }
        dados.letra = area.value; persistir(); telaPartes();
      } }));
    }

    function telaPartes() {
      raiz.innerHTML = '';
      const partes = dividir(dados.letra);
      const feitas = partes.filter(function (_, i) { return dados.concluidas[i]; }).length;
      raiz.appendChild(el('div', { classe: 'letra-rotulo', texto: '🎤 Letra em ' + partes.length + ' partes — ' + feitas + ' concluídas' }));
      const barra = el('div', { classe: 'letra-barra' }, [el('div', { classe: 'letra-barra-cheia', style: 'width:' + (partes.length ? Math.round(100 * feitas / partes.length) : 0) + '%' })]);
      raiz.appendChild(barra);
      const lista = el('div', { classe: 'letra-partes' });
      partes.forEach(function (linhas, i) {
        lista.appendChild(el('button', { type: 'button', classe: 'letra-parte-btn' + (dados.concluidas[i] ? ' feita' : ''), onclick: function () { telaParte(i, 'entender'); } }, [
          el('strong', { texto: (dados.concluidas[i] ? '✅ ' : '▶ ') + 'Parte ' + (i + 1) }),
          el('span', { texto: linhas[0] + (linhas.length > 1 ? ' …' : '') })
        ]));
      });
      raiz.appendChild(lista);
      raiz.appendChild(el('button', { type: 'button', classe: 'btn-link', texto: 'Editar / trocar a letra', onclick: telaColar }));
    }

    function telaParte(i, modo) {
      const partes = dividir(dados.letra);
      const linhas = partes[i];
      raiz.innerHTML = '';
      raiz.appendChild(el('div', { classe: 'letra-topo' }, [
        el('button', { type: 'button', classe: 'btn-link', texto: '← Partes', onclick: telaPartes }),
        el('strong', { texto: 'Parte ' + (i + 1) + ' de ' + partes.length })
      ]));
      const abas = el('div', { classe: 'letra-abas' });
      [['entender', '1. Ouvir e entender'], ['completar', '2. Completar de memória'], ['cantar', '3. Cantar junto']].forEach(function (a) {
        abas.appendChild(el('button', { type: 'button', classe: 'letra-aba' + (modo === a[0] ? ' ativa' : ''), texto: a[1], onclick: function () { telaParte(i, a[0]); } }));
      });
      raiz.appendChild(abas);

      if (modo === 'entender') {
        raiz.appendChild(el('p', { classe: 'letra-ajuda', texto: 'Ouça cada linha (🐢 = devagar), repita em voz alta e escreva o que você acha que ela quer dizer. Toque numa palavra para ouvi-la sozinha.' }));
        linhas.forEach(function (linha, j) {
          const k = i + ':' + j;
          const palavras = el('div', { classe: 'letra-linha-texto' });
          linha.split(/\s+/).forEach(function (p) {
            palavras.appendChild(el('button', { type: 'button', classe: 'letra-palavra', texto: p, onclick: function () { falar(p.replace(/[^A-Za-z']/g, ''), true); } }));
          });
          const trad = el('input', { classe: 'letra-traducao', placeholder: 'O que essa linha quer dizer? (em português)' });
          trad.value = dados.traducoes[k] || '';
          trad.addEventListener('input', function () { dados.traducoes[k] = trad.value; persistir(); });
          raiz.appendChild(el('div', { classe: 'letra-linha' }, [
            el('div', { classe: 'letra-linha-acoes' }, [
              el('button', { type: 'button', classe: 'btn-link', texto: '🔊', title: 'Ouvir', onclick: function () { falar(linha); } }),
              el('button', { type: 'button', classe: 'btn-link', texto: '🐢', title: 'Ouvir devagar', onclick: function () { falar(linha, true); } })
            ]),
            palavras, trad
          ]));
        });
        raiz.appendChild(el('button', { type: 'button', classe: 'btn btn-primario', texto: 'Próximo: completar de memória →', onclick: function () { telaParte(i, 'completar'); } }));
      }

      if (modo === 'completar') {
        raiz.appendChild(el('p', { classe: 'letra-ajuda', texto: 'Algumas palavras sumiram. Ouça no vídeo (ou no 🔊) e complete. Acertando tudo, a parte fica concluída.' }));
        const campos = [];
        linhas.forEach(function (linha) {
          const div = el('div', { classe: 'letra-linha letra-completar' }, [el('button', { type: 'button', classe: 'btn-link', texto: '🔊', onclick: function () { falar(linha); } })]);
          linha.split(/\s+/).forEach(function (p, n) {
            const limpa = normalizar(p);
            if (limpa.length >= 3 && n % 3 === 1) {
              const inp = el('input', { classe: 'letra-lacuna', size: String(Math.max(3, limpa.length)), 'aria-label': 'palavra que falta' });
              inp.dataset.certa = limpa; campos.push(inp); div.appendChild(inp);
            } else div.appendChild(el('span', { classe: 'letra-palavra-fixa', texto: p }));
          });
          raiz.appendChild(div);
        });
        const resultado = el('div', { classe: 'letra-resultado' });
        raiz.appendChild(el('div', { classe: 'letra-botoes' }, [
          el('button', { type: 'button', classe: 'btn btn-primario', texto: 'Verificar', onclick: function () {
            let certos = 0;
            campos.forEach(function (c) {
              const ok = normalizar(c.value) === c.dataset.certa;
              c.classList.toggle('certo', ok); c.classList.toggle('errado', !ok);
              if (ok) certos += 1;
            });
            const tudo = certos === campos.length;
            resultado.textContent = tudo ? '🎉 Perfeito! Parte concluída.' : certos + ' de ' + campos.length + ' certas. Ouça de novo e tente as vermelhas.';
            if (tudo) { dados.concluidas[i] = true; persistir(); }
            if (P && P.sons && P.sons.tocar) { try { P.sons.tocar(tudo ? 'acerto' : 'erro'); } catch (e) { /* opcional */ } }
          } }),
          el('button', { type: 'button', classe: 'btn btn-secundario', texto: 'Mostrar respostas', onclick: function () {
            campos.forEach(function (c) { c.placeholder = c.dataset.certa; });
          } })
        ]));
        raiz.appendChild(resultado);
        if (i + 1 < partes.length) raiz.appendChild(el('button', { type: 'button', classe: 'btn-link', texto: 'Ir para a parte ' + (i + 2) + ' →', onclick: function () { telaParte(i + 1, 'entender'); } }));
      }

      if (modo === 'cantar') {
        raiz.appendChild(el('p', { classe: 'letra-ajuda', texto: 'Toque o vídeo nesta parte e cante junto lendo. Depois esconda a letra e tente de novo só de memória.' }));
        const bloco = el('div', { classe: 'letra-karaoke' });
        linhas.forEach(function (l, j) {
          bloco.appendChild(el('div', { classe: 'letra-karaoke-linha' }, [
            el('div', { texto: l }),
            dados.traducoes[i + ':' + j] ? el('div', { classe: 'letra-karaoke-trad', texto: dados.traducoes[i + ':' + j] }) : null
          ]));
        });
        raiz.appendChild(bloco);
        raiz.appendChild(el('button', { type: 'button', classe: 'btn btn-secundario', texto: 'Esconder / mostrar letra', onclick: function () { bloco.classList.toggle('oculta'); } }));
      }
    }

    if (dados.letra) telaPartes(); else telaColar();
    return raiz;
  }

  window.Plataforma = window.Plataforma || {};
  window.Plataforma.letraMusica = { render: render, dividir: dividir };
})();
