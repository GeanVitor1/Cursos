Plataforma.registrarTrilha({
  id: 'aspnet',
  nome: 'ASP.NET Core & Web API',
  curto: 'ASP.NET',
  sigla: 'API',
  descricao: 'Construindo APIs REST reais: HTTP, JSON, Minimal APIs, controllers, DTOs, services, injeção de dependência, validação, erros e logging.',
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
        { id: 'aspnet-cp-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 40, tipo: 'prova' }
      ]
    },
    {
      id: 'http',
      nome: 'HTTP na prática',
      etapas: [
        { titulo: 'GET e POST', duracao: 45 },
        { titulo: 'PUT e PATCH', duracao: 40 },
        { titulo: 'DELETE', duracao: 30 },
        { titulo: 'Status codes corretos: 200, 201, 204, 400, 404, 500', duracao: 45 },
        { titulo: 'Parâmetros de rota, query e corpo', duracao: 45 },
        { titulo: 'Swagger e OpenAPI', duracao: 35 },
        { titulo: 'Checkpoint — HTTP', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'organizacao',
      nome: 'Organização de uma API',
      etapas: [
        { titulo: 'Controllers: quando usar em vez de Minimal API', duracao: 45 },
        { titulo: 'DTOs: por que não expor a entidade', duracao: 45 },
        { titulo: 'Services: a regra de negócio fora do controller', duracao: 50 },
        { titulo: 'Injeção de dependência na prática', duracao: 50 },
        { titulo: 'appsettings e configuração por ambiente', duracao: 40 },
        { titulo: 'Checkpoint — Organização', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'qualidade',
      nome: 'Qualidade',
      etapas: [
        { titulo: 'Validação de entrada', duracao: 45 },
        { titulo: 'Tratamento de erros e respostas padronizadas', duracao: 50 },
        { titulo: 'Logging estruturado', duracao: 40 },
        { titulo: 'async/await em APIs', duracao: 40 },
        { titulo: 'Checkpoint — Qualidade', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'projeto',
      nome: 'Projeto guiado',
      etapas: [
        { titulo: 'API de produtos completa', duracao: 70 },
        { titulo: 'API de clientes + pedidos', duracao: 80 },
        { titulo: 'Revisão do projeto e próximos passos', duracao: 40 },
        { titulo: 'Checkpoint final — ASP.NET', duracao: 60, tipo: 'prova' }
      ]
    }
  ]
});
