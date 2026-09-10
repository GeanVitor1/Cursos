Plataforma.registrarEntrevistas([
  {
    area: 'C# para Backend',
    trilha: 'csharp',
    desbloqueio: 50,
    descricao: 'O que todo entrevistador espera que um dev .NET júnior saiba explicar com exemplos.',
    perguntas: [
      'Qual a diferença entre classe e objeto?',
      'O que é null e por que NullReferenceException acontece?',
      'Qual problema a injeção de dependência resolve?',
      'O que significa a expressão x => x.Ativo?',
      'Para que serve async/await em uma API?'
    ]
  },
  {
    area: 'SQL & Banco de Dados',
    trilha: 'sql',
    desbloqueio: 50,
    descricao: 'Do conceito de banco até joins e agregação, como aparece em entrevistas de júnior e pleno.',
    perguntas: [
      'O que é uma chave primária e uma chave estrangeira?',
      'Qual a diferença entre WHERE e HAVING?',
      'Quando um LEFT JOIN retorna linhas que o INNER JOIN não retorna?',
      'Como você investigaria uma consulta lenta em produção?'
    ]
  },
  {
    area: 'LINQ & Entity Framework Core',
    trilha: 'entity-framework',
    desbloqueio: 50,
    descricao: 'Perguntas sobre ORM, LINQ, tracking, migrations e relação com SQL.',
    perguntas: [
      'O que é um ORM e que problema ele resolve?',
      'O que é o DbContext e o que é um DbSet?',
      'O que acontece entre o Add e o SaveChanges?',
      'Qual a diferença entre AsNoTracking e o comportamento padrão?',
      'Como o EF Core traduz um Where em SQL?'
    ]
  },
  {
    area: 'ASP.NET Core & APIs',
    trilha: 'aspnet',
    desbloqueio: 50,
    descricao: 'HTTP, rotas, DTOs e boas práticas de API.',
    perguntas: [
      'Qual a diferença entre PUT e PATCH?',
      'Por que usar DTOs em vez de expor a entidade?',
      'Quando retornar 400, 404, 409 e 500?',
      'O que é injeção de dependência e qual o benefício em uma API?'
    ]
  },
  {
    area: 'Segurança de Aplicações',
    trilha: 'seguranca',
    desbloqueio: 50,
    descricao: 'OWASP básico aplicado ao código que você escreve todos os dias.',
    perguntas: [
      'O que é SQL Injection e como o EF Core ajuda a evitar?',
      'Qual a diferença entre autenticação e autorização?',
      'Por que senhas nunca podem ser gravadas em texto puro?',
      'Onde guardar segredos como connection strings?'
    ]
  },
  {
    area: 'Arquitetura',
    trilha: 'arquitetura',
    desbloqueio: 50,
    descricao: 'SOLID, camadas e decisões de arquitetura que aparecem em entrevistas de pleno.',
    perguntas: [
      'Explique o princípio da responsabilidade única com um exemplo seu.',
      'Quando você NÃO usaria Clean Architecture?',
      'O que é inversão de dependência na prática?',
      'Como você decide entre monolito e microsserviços?'
    ]
  },
  {
    area: 'Git, Docker e CI/CD',
    trilha: 'git',
    desbloqueio: 50,
    descricao: 'Fluxo de trabalho, conflitos, containers e entrega contínua.',
    perguntas: [
      'Descreva seu fluxo com branches e pull requests.',
      'O que você faz quando aparece um conflito de merge?',
      'Qual a diferença entre imagem e container?',
      'O que um pipeline de CI deve rodar antes do deploy?'
    ]
  }
]);
