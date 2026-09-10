Plataforma.registrarManifesto({
  nome: 'Trilha .NET',
  versao: 2,
  fases: [
    { id: 1, nome: 'Fase 1 — Fundamentos', descricao: 'SQL, C# aplicado, lógica, terminal e inglês para desenvolvimento', trilhas: ['sql', 'csharp', 'logica', 'terminal', 'ingles'] },
    { id: 2, nome: 'Fase 2 — Dados com C#', descricao: 'LINQ, Entity Framework Core e Git profissional', trilhas: ['linq', 'entity-framework', 'git'] },
    { id: 3, nome: 'Fase 3 — Backend', descricao: 'ASP.NET Core e construção de REST APIs', trilhas: ['aspnet'] },
    { id: 4, nome: 'Fase 4 — Segurança e engenharia', descricao: 'Segurança, autenticação, arquitetura e testes', trilhas: ['seguranca', 'autenticacao', 'arquitetura', 'testes'] },
    { id: 5, nome: 'Fase 5 — Frontend', descricao: 'HTML, CSS, TypeScript e React integrados à API', trilhas: ['frontend'] },
    { id: 6, nome: 'Fase 6 — Operação', descricao: 'Docker e ambientes reproduzíveis', trilhas: ['docker'] },
    { id: 7, nome: 'Fase 7 — Sistemas distribuídos', descricao: 'Redis, mensageria e comunicação assíncrona', trilhas: ['redis', 'mensageria'] },
    { id: 8, nome: 'Fase 8 — Cloud e entrega', descricao: 'CI/CD com GitHub Actions e Azure', trilhas: ['cicd', 'azure'] },
    { id: 9, nome: 'Fase 9 — Escala', descricao: 'Microsserviços e system design básico', trilhas: ['microsservicos'] }
  ],
  arquivos: [
    '../certificacoes/certificacoes.js',
    '../projetos/projetos.js',
    '../entrevistas/entrevistas.js',
    '../data/nivelamento-ingles.js'
  ],
  trilhas: [
    {
      id: 'sql',
      arquivo: '../trilhas/sql/trilha.js',
      licoes: [
        '../trilhas/sql/licoes/sql-00.js',
        '../trilhas/sql/licoes/sql-01.js',
        '../trilhas/sql/licoes/sql-02.js',
        '../trilhas/sql/licoes/sql-03.js',
        '../trilhas/sql/licoes/sql-04.js',
        '../trilhas/sql/licoes/sql-05.js',
        '../provas/sql-fundamentos.js'
      ]
    },
    {
      id: 'csharp',
      arquivo: '../trilhas/csharp/trilha.js',
      licoes: [
        '../trilhas/csharp/licoes/csharp-00.js',
        '../trilhas/csharp/licoes/csharp-01.js',
        '../trilhas/csharp/licoes/csharp-02.js',
        '../trilhas/csharp/licoes/csharp-03.js',
        '../trilhas/csharp/licoes/csharp-04.js',
        '../trilhas/csharp/licoes/csharp-05.js',
        '../trilhas/csharp/licoes/csharp-06.js',
        '../trilhas/csharp/licoes/csharp-07.js',
        '../trilhas/csharp/licoes/csharp-08.js',
        '../trilhas/csharp/licoes/csharp-09.js'
      ]
    },
    { id: 'logica', arquivo: '../trilhas/logica/trilha.js', licoes: ['../trilhas/logica/licoes/logica-00.js'] },
    { id: 'terminal', arquivo: '../trilhas/terminal/trilha.js', licoes: ['../trilhas/terminal/licoes/terminal-00.js'] },
    { id: 'ingles', arquivo: '../trilhas/ingles/trilha.js', licoes: [
      '../trilhas/ingles/licoes/en-a1-00.js',
      '../trilhas/ingles/licoes/en-a1-01.js',
      '../trilhas/ingles/licoes/en-a1-02.js',
      '../trilhas/ingles/licoes/en-a1-03.js',
      '../trilhas/ingles/licoes/en-a1-04.js',
      '../trilhas/ingles/licoes/en-a1-05.js',
      '../trilhas/ingles/licoes/en-a1-06.js',
      '../trilhas/ingles/licoes/en-a1-07.js',
      '../trilhas/ingles/licoes/en-a1-08.js',
      '../provas/ingles-a1.js',
      '../trilhas/ingles/licoes/en-a2-00.js',
      '../trilhas/ingles/licoes/en-a2-01.js',
      '../trilhas/ingles/licoes/en-a2-02.js',
      '../trilhas/ingles/licoes/ingles-00.js',
      '../trilhas/ingles/licoes/ingles-01.js'
    ] },
    {
      id: 'linq',
      arquivo: '../trilhas/linq/trilha.js',
      licoes: [
        '../trilhas/linq/licoes/linq-00.js',
        '../trilhas/linq/licoes/linq-01.js',
        '../trilhas/linq/licoes/linq-02.js',
        '../trilhas/linq/licoes/linq-03.js'
      ]
    },
    {
      id: 'entity-framework',
      arquivo: '../trilhas/entity-framework/trilha.js',
      licoes: [
        '../trilhas/entity-framework/licoes/ef-00.js',
        '../trilhas/entity-framework/licoes/ef-01.js',
        '../trilhas/entity-framework/licoes/ef-02.js',
        '../trilhas/entity-framework/licoes/ef-03.js'
      ]
    },
    { id: 'git', arquivo: '../trilhas/git/trilha.js', licoes: [] },
    {
      id: 'aspnet',
      arquivo: '../trilhas/aspnet/trilha.js',
      licoes: [
        '../trilhas/aspnet/licoes/aspnet-00.js',
        '../trilhas/aspnet/licoes/aspnet-01.js',
        '../trilhas/aspnet/licoes/aspnet-02.js'
      ]
    },
    { id: 'seguranca', arquivo: '../trilhas/seguranca/trilha.js', licoes: [] },
    { id: 'autenticacao', arquivo: '../trilhas/autenticacao/trilha.js', licoes: [] },
    { id: 'arquitetura', arquivo: '../trilhas/arquitetura/trilha.js', licoes: [] },
    { id: 'testes', arquivo: '../trilhas/testes/trilha.js', licoes: [] },
    { id: 'frontend', arquivo: '../trilhas/frontend/trilha.js', licoes: [] },
    { id: 'docker', arquivo: '../trilhas/docker/trilha.js', licoes: [] },
    { id: 'redis', arquivo: '../trilhas/redis/trilha.js', licoes: [] },
    { id: 'mensageria', arquivo: '../trilhas/mensageria/trilha.js', licoes: [] },
    { id: 'cicd', arquivo: '../trilhas/cicd/trilha.js', licoes: [] },
    { id: 'azure', arquivo: '../trilhas/azure/trilha.js', licoes: [] },
    { id: 'microsservicos', arquivo: '../trilhas/microsservicos/trilha.js', licoes: [] }
  ]
});
