window.Plataforma = window.Plataforma || {};

(function (P) {
  P.interno = {
    trilhas: {},
    licoes: {},
    manifesto: null,
    conceitos: {},
    certificacoes: [],
    projetos: [],
    entrevistas: [],
    habilidades: null,
    registroConceitos: null,
    nivelamento: null
  };

  P.conf = {
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
  P.registrarLicao = function (licao) { P.interno.licoes[licao.id] = licao; };
  P.registrarConceitos = function (mapa) { Object.assign(P.interno.conceitos, mapa); };
  P.registrarCertificacoes = function (lista) { P.interno.certificacoes = lista; };
  P.registrarProjetos = function (lista) { P.interno.projetos = lista; };
  P.registrarEntrevistas = function (lista) { P.interno.entrevistas = lista; };
  P.registrarHabilidades = function (mapa) { P.interno.habilidades = mapa; };
  P.registrarRegistroConceitos = function (mapa) { P.interno.registroConceitos = mapa; };
  P.registrarNivelamento = function (dados) { P.interno.nivelamento = dados; };
})(window.Plataforma);
