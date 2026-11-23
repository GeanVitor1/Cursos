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

  // Revisão espaçada das palavras salvas (todas as músicas).
  const CHAVE_PALAVRAS = 'letra-musica:palavras';
  const INTERVALOS = [1, 3, 7, 15, 30, 60];
  function hoje() { return Math.floor(Date.now() / 86400000); }
  function lerPalavras() { try { return JSON.parse(localStorage.getItem(CHAVE_PALAVRAS) || '{}'); } catch (e) { return {}; } }
  function salvarPalavras(m) { try { localStorage.setItem(CHAVE_PALAVRAS, JSON.stringify(m)); } catch (e) { /* sem armazenamento */ } }
  function salvarPalavra(palavra, linha, musica) {
    const w = String(palavra || '').toLowerCase().replace(/[^a-z']/g, '');
    if (w.length < 2) return false;
    const m = lerPalavras();
    if (!m[w]) m[w] = { nivel: 0, proxima: hoje(), linha: linha, musica: musica };
    salvarPalavras(m);
    return true;
  }
  function pendentes() {
    const m = lerPalavras();
    return Object.keys(m).filter(function (w) { return m[w].proxima <= hoje(); });
  }

  let apiYouTube = null;
  function carregarApiYouTube(pronto) {
    if (window.YT && window.YT.Player) { pronto(); return; }
    if (!apiYouTube) {
      apiYouTube = [];
      const anterior = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () { if (anterior) anterior(); apiYouTube.forEach(function (f) { f(); }); apiYouTube = []; };
      const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(s);
    }
    apiYouTube.push(pronto);
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
      raiz.appendChild(transferencia());
    }

    // Levar o estudo (letra, traduções, trechos e palavras) para outro aparelho.
    function transferencia() {
      const area = el('div', { classe: 'letra-botoes' });
      area.appendChild(el('button', { type: 'button', classe: 'btn-link', texto: '📤 Copiar meu estudo', onclick: function (ev) {
        const codigo = JSON.stringify({ v: 1, id: id, dados: dados, palavras: lerPalavras() });
        const ok = function () { ev.target.textContent = '✅ Copiado! Cole no outro aparelho'; };
        if (navigator.clipboard) navigator.clipboard.writeText(codigo).then(ok, function () { window.prompt('Copie este código:', codigo); });
        else window.prompt('Copie este código:', codigo);
      } }));
      area.appendChild(el('button', { type: 'button', classe: 'btn-link', texto: '📥 Colar estudo de outro aparelho', onclick: function () {
        const codigo = window.prompt('Cole o código copiado no outro aparelho:');
        if (!codigo) return;
        try {
          const o = JSON.parse(codigo);
          if (!o || o.id !== id || !o.dados) { window.alert('Esse código é de outra música.'); return; }
          dados = o.dados; persistir();
          const m = lerPalavras(); Object.keys(o.palavras || {}).forEach(function (w) { if (!m[w]) m[w] = o.palavras[w]; }); salvarPalavras(m);
          if (dados.letra) telaPartes(); else telaColar();
        } catch (e) { window.alert('Código inválido.'); }
      } }));
      return area;
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
      const n = pendentes().length;
      raiz.appendChild(el('button', { type: 'button', classe: 'btn btn-secundario', texto: '🧠 Revisar palavras salvas (' + n + ' para hoje)', onclick: telaRevisao }));
      raiz.appendChild(el('button', { type: 'button', classe: 'btn-link', texto: 'Editar / trocar a letra', onclick: telaColar }));
      raiz.appendChild(transferencia());
    }

    function fmt(t) { t = Math.max(0, Math.round(t || 0)); return Math.floor(t / 60) + ':' + String(t % 60).padStart(2, '0'); }

    // Player que toca só o trecho desta parte. Usa o vídeo local (assets/videos/<id>.mp4)
    // quando existe; no site publicado cai para o vídeo do YouTube com a mesma lógica de trechos.
    function playerParte(i, total) {
      const caixa = el('div', { classe: 'letra-video' });
      const palco = el('div', { classe: 'letra-video-palco' });
      const info = el('div', { classe: 'letra-video-info', texto: 'Carregando vídeo…' });
      let repetir = false;
      let midia = null;
      dados.trechos = dados.trechos || {};
      function trecho() {
        const d = midia ? midia.duracao() : 0;
        return dados.trechos[i] || { ini: d * i / total, fim: d * (i + 1) / total };
      }
      function atualizar() { const t = trecho(); info.textContent = 'Trecho da parte ' + (i + 1) + ': ' + fmt(t.ini) + ' → ' + fmt(t.fim); }
      function vigiar() {
        if (!midia || !midia.tocando()) return;
        if (midia.tempo() >= trecho().fim) { if (repetir) midia.ir(trecho().ini); else midia.pausar(); }
      }
      function pronto(m) { midia = m; midia.ir(trecho().ini); atualizar(); }

      function usarYouTube() {
        palco.innerHTML = '';
        const alvo = el('div');
        palco.appendChild(alvo);
        carregarApiYouTube(function () {
          const yt = new window.YT.Player(alvo, {
            host: 'https://www.youtube-nocookie.com', videoId: id,
            playerVars: { playsinline: 1, rel: 0, modestbranding: 1 },
            events: { onReady: function () {
              pronto({
                duracao: function () { return yt.getDuration() || 0; },
                tempo: function () { return yt.getCurrentTime() || 0; },
                ir: function (t) { yt.seekTo(t, true); },
                tocar: function () { yt.playVideo(); },
                pausar: function () { yt.pauseVideo(); },
                tocando: function () { return yt.getPlayerState() === 1; },
                velocidade: function (v) { yt.setPlaybackRate(v); }
              });
            } }
          });
          const relogio = setInterval(function () { if (!document.body.contains(caixa)) clearInterval(relogio); else vigiar(); }, 200);
        });
      }

      const video = el('video', { src: '../assets/videos/' + id + '.mp4', preload: 'metadata', playsinline: '', controls: '' });
      video.addEventListener('loadedmetadata', function () {
        pronto({
          duracao: function () { return video.duration || 0; },
          tempo: function () { return video.currentTime; },
          ir: function (t) { video.currentTime = t; },
          tocar: function () { video.play(); },
          pausar: function () { video.pause(); },
          tocando: function () { return !video.paused; },
          velocidade: function (v) { video.playbackRate = v; }
        });
      });
      video.addEventListener('timeupdate', vigiar);
      video.addEventListener('error', usarYouTube);
      palco.appendChild(video);

      function ajustar(campo, delta) {
        if (!midia) return;
        const t = trecho(); const novo = { ini: t.ini, fim: t.fim };
        novo[campo] = delta === null ? midia.tempo() : Math.max(0, novo[campo] + delta);
        if (novo.fim <= novo.ini) novo.fim = novo.ini + 1;
        dados.trechos[i] = novo; persistir(); atualizar();
      }
      let taxa = 1;
      const velocidade = el('button', { type: 'button', classe: 'btn btn-secundario', texto: 'Velocidade 1x', onclick: function () {
        taxa = taxa === 1 ? 0.75 : (taxa === 0.75 ? 0.5 : 1);
        if (midia) midia.velocidade(taxa);
        velocidade.textContent = 'Velocidade ' + taxa + 'x';
      } });
      const rep = el('button', { type: 'button', classe: 'btn btn-secundario', texto: '🔁 Repetir: não', onclick: function () {
        repetir = !repetir; rep.textContent = '🔁 Repetir: ' + (repetir ? 'sim' : 'não');
      } });
      caixa.appendChild(palco);
      caixa.appendChild(info);
      caixa.appendChild(gravador());
      caixa.appendChild(el('div', { classe: 'letra-botoes' }, [
        el('button', { type: 'button', classe: 'btn btn-primario', texto: '▶ Tocar esta parte', onclick: function () { if (midia) { midia.ir(trecho().ini); midia.tocar(); } } }), rep, velocidade
      ]));
      caixa.appendChild(el('details', { classe: 'letra-ajuste' }, [
        el('summary', { texto: 'Ajustar o trecho (se a parte não bater com a letra)' }),
        el('div', { classe: 'letra-botoes' }, [
          el('button', { type: 'button', classe: 'btn-link', texto: 'Início = agora', onclick: function () { ajustar('ini', null); } }),
          el('button', { type: 'button', classe: 'btn-link', texto: 'Início −2s', onclick: function () { ajustar('ini', -2); } }),
          el('button', { type: 'button', classe: 'btn-link', texto: 'Início +2s', onclick: function () { ajustar('ini', 2); } }),
          el('button', { type: 'button', classe: 'btn-link', texto: 'Fim = agora', onclick: function () { ajustar('fim', null); } }),
          el('button', { type: 'button', classe: 'btn-link', texto: 'Fim −2s', onclick: function () { ajustar('fim', -2); } }),
          el('button', { type: 'button', classe: 'btn-link', texto: 'Fim +2s', onclick: function () { ajustar('fim', 2); } })
        ])
      ]));
      return caixa;
    }

    // Grava a voz do aluno para comparar com o original (shadowing).
    function gravador() {
      const area = el('div', { classe: 'letra-botoes' });
      if (!navigator.mediaDevices || !window.MediaRecorder) return area;
      let rec = null, pedacos = [], url = null;
      const audio = el('audio', { controls: '', hidden: '' });
      const btn = el('button', { type: 'button', classe: 'btn btn-secundario', texto: '🎙️ Gravar minha voz', onclick: function () {
        if (rec && rec.state === 'recording') { rec.stop(); return; }
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
          pedacos = []; rec = new MediaRecorder(stream);
          rec.ondataavailable = function (e) { if (e.data.size) pedacos.push(e.data); };
          rec.onstop = function () {
            stream.getTracks().forEach(function (t) { t.stop(); });
            if (url) URL.revokeObjectURL(url);
            url = URL.createObjectURL(new Blob(pedacos, { type: rec.mimeType }));
            audio.src = url; audio.hidden = false;
            btn.textContent = '🎙️ Gravar de novo';
          };
          rec.start(); btn.textContent = '⏹ Parar gravação';
        }).catch(function () { btn.textContent = '🎙️ Microfone bloqueado'; });
      } });
      area.appendChild(btn); area.appendChild(audio);
      return area;
    }

    function telaRevisao() {
      raiz.innerHTML = '';
      const m = lerPalavras();
      const fila = pendentes();
      raiz.appendChild(el('div', { classe: 'letra-topo' }, [
        el('button', { type: 'button', classe: 'btn-link', texto: '← Partes', onclick: telaPartes }),
        el('strong', { texto: '🧠 Revisão: ' + fila.length + ' palavra(s) para hoje' })
      ]));
      if (!fila.length) {
        raiz.appendChild(el('p', { classe: 'letra-ajuda', texto: 'Nada para revisar hoje. Toque em palavras da letra no passo 1 para salvá-las; elas voltam em 1, 3, 7, 15, 30 e 60 dias.' }));
        return;
      }
      const w = fila[0], item = m[w];
      const verso = el('div', { classe: 'letra-cartao-verso', hidden: '' }, [
        el('div', { texto: 'Na linha: ' + (item.linha || '') }),
        el('div', { classe: 'letra-ajuda', texto: item.musica ? '(' + item.musica + ')' : '' })
      ]);
      function responder(lembrou) {
        item.nivel = lembrou ? Math.min(item.nivel + 1, INTERVALOS.length - 1) : 0;
        item.proxima = hoje() + (lembrou ? INTERVALOS[item.nivel] : 0) + (lembrou ? 0 : 0);
        if (!lembrou) item.proxima = hoje() + 1;
        m[w] = item; salvarPalavras(m); telaRevisao();
      }
      raiz.appendChild(el('div', { classe: 'letra-cartao' }, [
        el('div', { classe: 'letra-cartao-palavra', texto: w }),
        el('button', { type: 'button', classe: 'btn-link', texto: '🔊 Ouvir', onclick: function () { falar(w, true); } }),
        el('p', { classe: 'letra-ajuda', texto: 'Você lembra o que significa? Pense, depois veja o contexto.' }),
        verso,
        el('div', { classe: 'letra-botoes' }, [
          el('button', { type: 'button', classe: 'btn btn-secundario', texto: 'Ver contexto', onclick: function () { verso.hidden = false; falar(item.linha || w); } }),
          el('button', { type: 'button', classe: 'btn btn-primario', texto: '✅ Lembrei', onclick: function () { responder(true); } }),
          el('button', { type: 'button', classe: 'btn btn-secundario', texto: '❌ Não lembrei', onclick: function () { responder(false); } })
        ])
      ]));
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
      [['entender', '1. Ouvir e entender'], ['ditado', '2. Ditado'], ['completar', '3. Completar de memória'], ['cantar', '4. Cantar junto']].forEach(function (a) {
        abas.appendChild(el('button', { type: 'button', classe: 'letra-aba' + (modo === a[0] ? ' ativa' : ''), texto: a[1], onclick: function () { telaParte(i, a[0]); } }));
      });
      raiz.appendChild(abas);
      raiz.appendChild(playerParte(i, partes.length));

      if (modo === 'entender') {
        raiz.appendChild(el('p', { classe: 'letra-ajuda', texto: 'Toque o trecho no vídeo, depois ouça cada linha (🐢 = devagar), repita em voz alta e escreva o que você acha que ela quer dizer. Toque numa palavra para ouvi-la e salvá-la na revisão (fica destacada).' }));
        linhas.forEach(function (linha, j) {
          const k = i + ':' + j;
          const palavras = el('div', { classe: 'letra-linha-texto' });
          linha.split(/\s+/).forEach(function (p) {
            const b = el('button', { type: 'button', classe: 'letra-palavra' + (lerPalavras()[p.toLowerCase().replace(/[^a-z']/g, '')] ? ' salva' : ''), texto: p, title: 'Ouvir e salvar para revisão', onclick: function () { falar(p.replace(/[^A-Za-z']/g, ''), true); if (salvarPalavra(p, linha, def.titulo)) b.classList.add('salva'); } });
            palavras.appendChild(b);
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
        raiz.appendChild(el('button', { type: 'button', classe: 'btn btn-primario', texto: 'Próximo: ditado →', onclick: function () { telaParte(i, 'ditado'); } }));
      }

      if (modo === 'completar') {
        raiz.appendChild(el('p', { classe: 'letra-ajuda', texto: 'Algumas palavras sumiram. Toque o trecho do vídeo (use 🔁 e 0.75x) e complete. Acertando tudo, a parte fica concluída.' }));
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

      if (modo === 'ditado') {
        raiz.appendChild(el('p', { classe: 'letra-ajuda', texto: 'Sem olhar a letra: toque o trecho (use 🔁 e 0.75x) e escreva cada linha do jeito que ouvir. Depois confira palavra por palavra.' }));
        const entradas = linhas.map(function (linha, j) {
          const inp = el('input', { classe: 'letra-traducao', placeholder: 'Linha ' + (j + 1) + ' — escreva o que ouviu' });
          const res = el('div', { classe: 'letra-ditado-res' });
          raiz.appendChild(el('div', { classe: 'letra-linha' }, [inp, res]));
          return { inp: inp, res: res, linha: linha };
        });
        const total = el('div', { classe: 'letra-resultado' });
        raiz.appendChild(el('button', { type: 'button', classe: 'btn btn-primario', texto: 'Conferir ditado', onclick: function () {
          let certas = 0, todas = 0;
          entradas.forEach(function (e) {
            const digitadas = e.inp.value.split(/\s+/).map(normalizar).filter(Boolean);
            e.res.innerHTML = '';
            e.linha.split(/\s+/).forEach(function (p) {
              const ok = digitadas.indexOf(normalizar(p)) !== -1;
              todas += 1; if (ok) certas += 1;
              e.res.appendChild(el('span', { classe: 'letra-ditado-palavra ' + (ok ? 'certo' : 'errado'), texto: p }));
            });
          });
          total.textContent = certas + ' de ' + todas + ' palavras (' + Math.round(100 * certas / Math.max(1, todas)) + '%). As vermelhas são os sons que seu ouvido ainda não pega: ouça esses pedaços de novo.';
        } }));
        raiz.appendChild(total);
      }

      if (modo === 'cantar') {
        raiz.appendChild(el('p', { classe: 'letra-ajuda', texto: 'Ligue o 🔁, toque o trecho e cante junto lendo. Depois esconda a letra e tente de novo só de memória.' }));
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
