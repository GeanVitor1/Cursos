window.Plataforma = window.Plataforma || {};

(function (P) {
  P.interno = {
    trilhas: Object.create(null),
    licoes: Object.create(null),
    manifesto: null,
    conceitos: Object.create(null),
    certificacoes: [],
    projetos: [],
    entrevistas: [],
    habilidades: null,
    registroConceitos: null,
    nivelamento: null
  };

  P.conf = {
    // Habilitar somente após aplicar ferramentas/supabase-progresso.sql.
    sincronizacaoAtomica: false,
    xpAtividade: 10,
    xpAtividadeRevisao: 5,
    xpDesafio: 50,
    xpDesafioRevisao: 20,
    xpAula: 30,
    xpProva: 100,
    xpRevisaoBonus: 20,
    xpRevelado: 2,
    intervalosRevisao: [1, 3, 7, 14, 30],
    maxAtividadesPorConceitoRevisao: 2,
    errosParaAjudaExtra: 2
  };

  window.P = P;

  P.registrarManifesto = function (manifesto) { P.interno.manifesto = manifesto; };
  P.registrarTrilha = function (trilha) { P.interno.trilhas[trilha.id] = trilha; };
  // Ritmo de aprendizagem: ninguém memoriza várias frases de uma vez.
  // Uma tela de conteúdo com vários itens de vocabulário vira uma sequência
  // de telas curtas: uma frase por tela (ou até duas palavras soltas), e cada
  // tela nova começa pedindo para lembrar o item anterior antes de seguir.
  function porTela(pares) {
    const algumaFrase = pares.some(function (par) { return /\s/.test(String(par[0]).trim()); });
    return algumaFrase ? 1 : 2;
  }

  function dividirVocab(etapa) {
    const blocos = etapa.blocos || [];
    const pos = blocos.findIndex(function (b) {
      return b && b.tipo === 'vocab' && Array.isArray(b.pares) && b.pares.length > porTela(b.pares);
    });
    if (pos < 0) return [etapa];
    const vocab = blocos[pos];
    const tam = porTela(vocab.pares);
    const grupos = [];
    for (let i = 0; i < vocab.pares.length; i += tam) grupos.push(vocab.pares.slice(i, i + tam));
    const titulo = etapa.titulo || 'Palavras novas';
    return grupos.map(function (grupo, g) {
      const ultimo = g === grupos.length - 1;
      let novos = [];
      if (g === 0) novos = blocos.slice(0, pos);
      else novos.push({ tipo: 'lembrar', pares: grupos[g - 1] });
      novos.push(Object.assign({}, vocab, {
        titulo: 'Palavra nova · ' + (g + 1) + ' de ' + grupos.length,
        pares: grupo
      }));
      if (ultimo) novos = novos.concat(blocos.slice(pos + 1));
      const parte = Object.assign({}, etapa, {
        titulo: titulo + ' (' + (g + 1) + '/' + grupos.length + ')',
        blocos: novos
      });
      if (g > 0) { delete parte.introduz; delete parte.introduzVocab; }
      return parte;
    }).reduce(function (lista, parte, g, todas) {
      // A última parte pode ter outro bloco vocab grande: divide também.
      return lista.concat(g === todas.length - 1 ? dividirVocab(parte) : [parte]);
    }, []);
  }

  function aplicarRitmo(licao) {
    if (!Array.isArray(licao.etapas)) return;
    let mudou = false;
    licao.etapas = licao.etapas.reduce(function (lista, etapa) {
      if (!etapa || etapa.tipo !== 'conteudo') return lista.concat([etapa]);
      const partes = dividirVocab(etapa);
      if (partes.length > 1) mudou = true;
      return lista.concat(partes);
    }, []);
    if (mudou) licao.ritmoDividido = true;
  }
  P.aplicarRitmo = aplicarRitmo;

  P.registrarLicao = function (licao) {
    aplicarRitmo(licao);
    (licao.etapas || []).forEach(function (etapa) {
      if (etapa.atividade) etapa.atividade.trilha = licao.trilha;
    });
    P.interno.licoes[licao.id] = Object.assign({}, P.interno.licoes[licao.id] || {}, licao);
  };
  P.registrarCatalogo = function (catalogo) {
    catalogo.licoes.forEach(function (l) { P.interno.licoes[l.id] = l; });
    P.interno.definicoes = catalogo.definicoes;
  };
  P.registrarConceitos = function (mapa) { Object.assign(P.interno.conceitos, mapa); };
  P.registrarCertificacoes = function (lista) { P.interno.certificacoes = lista; };
  P.registrarProjetos = function (lista) { P.interno.projetos = lista; };
  P.registrarEntrevistas = function (lista) { P.interno.entrevistas = lista; };
  P.registrarHabilidades = function (mapa) { P.interno.habilidades = mapa; };
  P.registrarRegistroConceitos = function (mapa) { P.interno.registroConceitos = mapa; };
  P.registrarNivelamento = function (dados) { P.interno.nivelamento = dados; };
})(window.Plataforma);
