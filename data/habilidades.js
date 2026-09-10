Plataforma.registrarHabilidades({
  versao: 1,
  observacao: 'Cópia executável de data/skills-map.json (carregada sem servidor). O JSON é a fonte canônica para ferramentas.',
  categorias: [
    { id: 'fundamentos', nome: 'Fundamentos', itens: ['logica', 'terminal', 'csharp', 'sql', 'ingles'] },
    { id: 'dados', nome: 'Dados com C#', itens: ['linq', 'entity-framework'] },
    { id: 'backend', nome: 'Backend', itens: ['aspnet', 'autenticacao', 'seguranca'] },
    { id: 'engenharia', nome: 'Engenharia', itens: ['arquitetura', 'testes', 'git'] },
    { id: 'frontend', nome: 'Frontend', itens: ['frontend'] },
    { id: 'operacao', nome: 'Operação', itens: ['docker', 'cicd', 'azure'] },
    { id: 'sistemas', nome: 'Sistemas distribuídos', itens: ['redis', 'mensageria', 'microsservicos'] }
  ],
  competencias: {
    logica: {
      nome: 'Lógica aplicada ao trabalho',
      trilha: 'logica',
      fase: 1,
      dependencies: [],
      skills: ['total-de-pedido', 'validar-estoque', 'encontrar-duplicados', 'agrupar-dados'],
      conceitosChave: ['logica.total', 'logica.validacao', 'logica.duplicados', 'logica.agrupamento'],
      trabalho: 'Todo dia você vai transformar uma regra de negócio em passos que o computador executa: somar itens, impedir estoque negativo, validar desconto.'
    },
    terminal: {
      nome: 'Terminal para desenvolvedores',
      trilha: 'terminal',
      fase: 1,
      dependencies: [],
      skills: ['navegar-pastas', 'rodar-dotnet', 'git-basico', 'docker-basico', 'npm-basico'],
      conceitosChave: ['terminal.comandos', 'terminal.dotnet', 'terminal.git'],
      trabalho: 'No time real, criar projetos, rodar testes e subir containers acontece pelo terminal. São poucos comandos, usados todos os dias.'
    },
    csharp: {
      nome: 'C# para Backend .NET',
      trilha: 'csharp',
      fase: 1,
      dependencies: ['logica'],
      skills: ['classes-e-objetos', 'tipos', 'metodos', 'listas', 'null', 'interfaces', 'injeção-de-dependência', 'lambda', 'async-await'],
      conceitosChave: ['csharp.classes', 'csharp.objetos', 'csharp.propriedades', 'csharp.tipos', 'csharp.metodos', 'csharp.list', 'csharp.null', 'csharp.interfaces', 'csharp.di', 'csharp.lambda', 'csharp.async'],
      trabalho: 'C# é a linguagem em que você vai escrever entidades, services e controllers. Sem esses fundamentos, Entity Framework, LINQ e ASP.NET parecem mágica.'
    },
    sql: {
      nome: 'SQL & Bancos de Dados',
      trilha: 'sql',
      fase: 1,
      dependencies: [],
      skills: ['modelagem', 'select', 'where', 'joins', 'agregacao', 'indices', 'transacoes'],
      conceitosChave: ['sql.banco', 'sql.tabela', 'sql.chave-primaria', 'sql.chave-estrangeira', 'sql.select', 'sql.where'],
      trabalho: 'Antes de qualquer ORM, existe SQL. Investigar um bug de dados quase sempre começa com um SELECT bem escrito.'
    },
    ingles: {
      nome: 'Inglês para Desenvolvedores',
      trilha: 'ingles',
      fase: 1,
      dependencies: [],
      skills: ['vocabulario-tecnico', 'mensagens-de-erro', 'documentacao', 'pull-requests', 'entrevista'],
      conceitosChave: ['ingles.vocabulario', 'ingles.frases', 'ingles.erros', 'ingles.leitura', 'sql.ingles'],
      trabalho: 'Documentação, mensagens de erro, issues e entrevistas chegam em inglês. Você não precisa ser fluente — precisa ler o que o trabalho exige.'
    },
    git: {
      nome: 'Git & GitHub Profissional',
      trilha: 'git',
      fase: 2,
      dependencies: ['terminal'],
      skills: ['commits', 'branches', 'merge', 'pull-request', 'conflitos', 'code-review', 'revert'],
      conceitosChave: ['git.branch', 'git.merge', 'git.pr', 'git.conflito', 'git.review'],
      trabalho: 'Nenhuma equipe aceita código sem histórico. Branch, pull request e code review são o fluxo diário de qualquer vaga.'
    },
    linq: {
      nome: 'LINQ',
      trilha: 'linq',
      fase: 2,
      dependencies: ['csharp', 'sql'],
      skills: ['where', 'select', 'first-e-default', 'ordenacao', 'agrupamento', 'iQueryable', 'lambda'],
      conceitosChave: ['linq.intro', 'linq.lambda', 'linq.where', 'linq.select', 'linq.first'],
      trabalho: 'Você vai ler e escrever LINQ todos os dias para consultar, filtrar e transformar dados — em coleções e no banco.'
    },
    'entity-framework': {
      nome: 'Entity Framework Core',
      trilha: 'entity-framework',
      fase: 2,
      dependencies: ['sql', 'csharp', 'linq'],
      skills: ['entidades', 'dbcontext', 'dbset', 'crud', 'migrations', 'relacionamentos', 'include', 'tracking', 'performance'],
      conceitosChave: ['ef.orm', 'ef.entidade', 'ef.dbcontext', 'ef.dbset', 'ef.savechanges', 'ef.consultas'],
      trabalho: 'É a ponte entre suas classes C# e o banco. Praticamente toda API .NET profissional acessa dados por EF Core (ou por um ORM equivalente).'
    },
    aspnet: {
      nome: 'ASP.NET Core & Web API',
      trilha: 'aspnet',
      fase: 3,
      dependencies: ['csharp', 'sql', 'linq', 'entity-framework'],
      skills: ['http', 'json', 'minimal-api', 'controllers', 'rotas', 'dtos', 'services', 'di', 'validacao', 'erros', 'logging', 'async'],
      conceitosChave: ['aspnet.http', 'aspnet.json', 'aspnet.api', 'aspnet.rotas', 'aspnet.dto', 'aspnet.di'],
      trabalho: 'É aqui que sua aplicação vira um serviço que o frontend, o app e outros sistemas consomem.'
    },
    seguranca: {
      nome: 'Segurança de Aplicações',
      trilha: 'seguranca',
      fase: 4,
      dependencies: ['aspnet', 'sql'],
      skills: ['owasp-basico', 'sql-injection', 'xss', 'csrf', 'cors', 'secrets', 'validacao', 'dados-sensiveis'],
      conceitosChave: ['seguranca.owasp', 'seguranca.injection', 'seguranca.xss', 'seguranca.secrets'],
      trabalho: 'A primeira pergunta de uma revisão de código séria: isso pode vazar ou corromper dados? Segurança é requisito, não enfeite.'
    },
    autenticacao: {
      nome: 'Autenticação & Autorização',
      trilha: 'autenticacao',
      fase: 4,
      dependencies: ['aspnet', 'seguranca'],
      skills: ['hash-de-senha', 'jwt', 'refresh-token', 'claims', 'roles', 'policies', '401-e-403'],
      conceitosChave: ['seguranca.hash', 'autenticacao.jwt', 'autenticacao.token', 'autenticacao.401', 'autenticacao.403'],
      trabalho: 'Quase toda vaga exige login, permissões e tokens. É também a área que mais gera incidentes quando é feita no improviso.'
    },
    arquitetura: {
      nome: 'Arquitetura & Qualidade de Código',
      trilha: 'arquitetura',
      fase: 4,
      dependencies: ['aspnet', 'csharp'],
      skills: ['separacao-de-responsabilidades', 'solid', 'clean-code', 'refatoracao', 'leitura-de-codigo', 'code-review', 'camadas', 'clean-architecture', 'ddd-basico'],
      conceitosChave: ['arquitetura.camadas', 'arquitetura.solid', 'arquitetura.clean', 'arquitetura.refactor', 'arquitetura.code-review'],
      trabalho: 'Durante décadas você vai ler mais código do que escreve. Refatorar e revisar com critério é o que separa júnior de profissional confiável.'
    },
    testes: {
      nome: 'Testes Automatizados',
      trilha: 'testes',
      fase: 4,
      dependencies: ['aspnet', 'csharp'],
      skills: ['xunit', 'arrange-act-assert', 'unitarios', 'mocks', 'integracao', 'tdd', 'cobertura'],
      conceitosChave: ['testes.xunit', 'testes.aaa', 'testes.mock', 'testes.integracao'],
      trabalho: 'Toda mudança precisa de uma rede de segurança. Testes são o que permite evoluir um sistema sem quebrar o que já funciona.'
    },
    frontend: {
      nome: 'Frontend: HTML, CSS, TS & React',
      trilha: 'frontend',
      fase: 5,
      dependencies: ['aspnet', 'terminal'],
      skills: ['html', 'css', 'javascript', 'typescript', 'componentes', 'hooks', 'rotas', 'formularios', 'consumo-de-api', 'autenticacao-frontend', 'estado'],
      conceitosChave: ['frontend.html', 'frontend.css', 'frontend.typescript', 'frontend.react', 'frontend.hooks'],
      trabalho: 'Full Stack significa conseguir entregar a tela que conversa com a sua API — e entender o que o frontend espera do backend.'
    },
    docker: {
      nome: 'Docker',
      trilha: 'docker',
      fase: 6,
      dependencies: ['aspnet', 'terminal'],
      skills: ['imagens', 'containers', 'portas', 'volumes', 'variaveis-de-ambiente', 'networks', 'compose'],
      conceitosChave: ['docker.imagem', 'docker.container', 'docker.portas', 'docker.compose'],
      trabalho: '\'Na minha máquina funciona\' deixa de existir: API, banco e cache sobem iguais em qualquer computador e no servidor.'
    },
    redis: {
      nome: 'Redis & Cache',
      trilha: 'redis',
      fase: 7,
      dependencies: ['aspnet', 'docker'],
      skills: ['cache-aside', 'ttl', 'serializacao', 'invalidacao'],
      conceitosChave: ['redis.cache', 'redis.ttl', 'redis.cache-aside'],
      trabalho: 'Quando o banco começa a sofrer com consultas repetidas, cache deixa de ser luxo e passa a ser requisito de performance.'
    },
    mensageria: {
      nome: 'Mensageria',
      trilha: 'mensageria',
      fase: 7,
      dependencies: ['aspnet', 'arquitetura'],
      skills: ['filas', 'producer-consumer', 'rabbitmq', 'retries', 'dead-letter', 'eventos'],
      conceitosChave: ['mensageria.fila', 'mensageria.producer', 'mensageria.rabbit', 'mensageria.dlq'],
      trabalho: 'E-mails, relatórios e integrações não podem travar a resposta da API. Filas resolvem isso no mundo real.'
    },
    cicd: {
      nome: 'CI/CD com GitHub Actions',
      trilha: 'cicd',
      fase: 8,
      dependencies: ['git', 'docker', 'testes'],
      skills: ['pipeline', 'workflows', 'build', 'testes-no-pipeline', 'artifacts', 'secrets', 'deploy'],
      conceitosChave: ['cicd.pipeline', 'cicd.actions', 'cicd.secrets', 'cicd.deploy'],
      trabalho: 'Entrega profissional não é copiar arquivo por FTP. É commit → pipeline → testes → deploy, com histórico e reversão.'
    },
    azure: {
      nome: 'Azure para Desenvolvedores .NET',
      trilha: 'azure',
      fase: 8,
      dependencies: ['docker', 'cicd'],
      skills: ['app-service', 'azure-sql', 'container-registry', 'container-apps', 'storage', 'key-vault', 'application-insights', 'service-bus', 'functions'],
      conceitosChave: ['azure.appservice', 'azure.sql', 'azure.containers', 'azure.keyvault', 'azure.insights'],
      trabalho: 'A maioria das vagas .NET no Brasil menciona Azure. Publicar, monitorar e proteger aplicações na nuvem é parte do trabalho.'
    },
    microsservicos: {
      nome: 'Microsserviços & System Design',
      trilha: 'microsservicos',
      fase: 9,
      dependencies: ['aspnet', 'arquitetura', 'mensageria', 'docker', 'azure'],
      skills: ['monolito-modular', 'comunicacao', 'consistencia-eventual', 'observabilidade', 'resiliencia', 'api-gateway'],
      conceitosChave: ['microsservicos.monolito', 'microsservicos.comunicacao', 'microsservicos.observabilidade', 'microsservicos.resiliencia'],
      trabalho: 'Você precisa saber quando NÃO usar microsserviços. A decisão certa depende de escala, time e operação — não de moda.'
    }
  }
});
