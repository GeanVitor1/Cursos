Plataforma.registrarTrilha({
  id: 'aspnet',
  nome: 'ASP.NET Core & Web API',
  curto: 'ASP.NET',
  sigla: 'API',
  descricao: 'Construindo APIs com rotas, JSON e respostas: os fundamentos da web e a sua primeira API em C#.',
  fase: 3,
  status: 'disponivel',
  prerequisitos: [
    { trilha: 'csharp', min: 100 },
    { trilha: 'sql', min: 100 },
    { trilha: 'linq', min: 100 },
    { trilha: 'entity-framework', min: 100 }
  ],
  niveis: [
    {
      id: 'fundamentos',
      nome: 'Fundamentos',
      etapas: [
        { id: 'aspnet-00', titulo: 'Como a web funciona: request e response', duracao: 35, licao: 'aspnet-00' },
        { id: 'aspnet-01', titulo: 'JSON: o idioma que as APIs falam', duracao: 30, licao: 'aspnet-01' },
        { id: 'aspnet-02', titulo: 'Sua primeira API: rota, endpoint e resposta', duracao: 50, licao: 'aspnet-02' },
        { id: 'aspnet-cp-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 40, licao: 'aspnet-cp-fundamentos', tipo: 'prova' },
      ]
    },
    {
      id: 'http',
      nome: 'HTTP na prática',
      etapas: [
        { id: 'aspnet-03', titulo: 'GET e POST', duracao: 45, licao: 'aspnet-03' },
        { id: 'aspnet-04', titulo: 'PUT e PATCH', duracao: 40, licao: 'aspnet-04' },
        { id: 'aspnet-05', titulo: 'DELETE', duracao: 30, licao: 'aspnet-05' },
        { id: 'aspnet-06', titulo: 'Status codes corretos: 200, 201, 204, 400, 404, 500', duracao: 45, licao: 'aspnet-06' },
        { id: 'aspnet-07', titulo: 'Parâmetros de rota, query e corpo', duracao: 45, licao: 'aspnet-07' },
        { id: 'aspnet-08', titulo: 'Swagger e OpenAPI', duracao: 35, licao: 'aspnet-08' },
        { id: 'aspnet-checkpoint-http', titulo: 'Checkpoint — HTTP', duracao: 45, licao: 'aspnet-checkpoint-http', tipo: 'prova' },
      ]
    },
    {
      id: 'organizacao',
      nome: 'Organização de uma API',
      etapas: [
        { id: 'aspnet-09', titulo: 'Controllers: quando usar em vez de Minimal API', duracao: 45, licao: 'aspnet-09' },
        { id: 'aspnet-10', titulo: 'DTOs: por que não expor a entidade', duracao: 45, licao: 'aspnet-10' },
        { id: 'aspnet-11', titulo: 'Services: a regra de negócio fora do controller', duracao: 50, licao: 'aspnet-11' },
        { id: 'aspnet-12', titulo: 'Injeção de dependência na prática', duracao: 50, licao: 'aspnet-12' },
        { id: 'aspnet-13', titulo: 'appsettings e configuração por ambiente', duracao: 40, licao: 'aspnet-13' },
        { id: 'aspnet-checkpoint-organizacao', titulo: 'Checkpoint — Organização', duracao: 45, licao: 'aspnet-checkpoint-organizacao', tipo: 'prova' },
      ]
    },
    {
      id: 'qualidade',
      nome: 'Qualidade',
      etapas: [
        { id: 'aspnet-14', titulo: 'Validação de entrada', duracao: 45, licao: 'aspnet-14' },
        { id: 'aspnet-15', titulo: 'Tratamento de erros e respostas padronizadas', duracao: 50, licao: 'aspnet-15' },
        { id: 'aspnet-16', titulo: 'Logging estruturado', duracao: 40, licao: 'aspnet-16' },
        { id: 'aspnet-17', titulo: 'async/await em APIs', duracao: 40, licao: 'aspnet-17' },
        { id: 'aspnet-checkpoint-qualidade', titulo: 'Checkpoint — Qualidade', duracao: 45, licao: 'aspnet-checkpoint-qualidade', tipo: 'prova' },
      ]
    },
    {
      id: 'projeto',
      nome: 'Projeto guiado',
      etapas: [
        { id: 'aspnet-18', titulo: 'API de produtos completa', duracao: 70, licao: 'aspnet-18' },
        { id: 'aspnet-19', titulo: 'API de clientes + pedidos', duracao: 80, licao: 'aspnet-19' },
        { id: 'aspnet-20', titulo: 'Revisão do projeto e próximos passos', duracao: 40, licao: 'aspnet-20' },
        { id: 'aspnet-checkpoint-projeto', titulo: 'Checkpoint final — ASP.NET', duracao: 60, licao: 'aspnet-checkpoint-projeto', tipo: 'prova' },
      ]
    }
  ]
});
