Plataforma.registrarCertificacoes([
  {
    id: 'az-900',
    emissor: 'Microsoft',
    nome: 'Azure Fundamentals (AZ-900)',
    descricao: 'Fundamentos de cloud e serviços Azure, do ponto de vista de quem desenvolve aplicações.',
    trilhas: { azure: 0.5, docker: 0.2, cicd: 0.2, ingles: 0.1 },
    conhecimentos: ['Cloud', 'App Service', 'Azure SQL', 'Containers', 'CI/CD', 'Inglês técnico'],
    observacao: 'Recomendada como primeira certificação Microsoft para quem vem do desenvolvimento.'
  },
  {
    id: 'az-204',
    emissor: 'Microsoft',
    nome: 'Azure Developer Associate (AZ-204)',
    descricao: 'Desenvolver soluções no Azure: aplicações, storage, segurança, mensageria e observabilidade.',
    trilhas: { azure: 0.4, aspnet: 0.2, autenticacao: 0.15, mensageria: 0.15, testes: 0.1 },
    conhecimentos: ['App Service', 'Azure Functions', 'Storage', 'Key Vault', 'Service Bus', 'Application Insights']
  },
  {
    id: 'dp-900',
    emissor: 'Microsoft',
    nome: 'Azure Data Fundamentals (DP-900)',
    descricao: 'Fundamentos de dados relacionais e não relacionais no Azure.',
    trilhas: { sql: 0.7, 'entity-framework': 0.3 },
    conhecimentos: ['Modelagem', 'SQL', 'Azure SQL', 'Armazenamento de dados']
  },
  {
    id: 'github-foundations',
    emissor: 'GitHub',
    nome: 'GitHub Foundations',
    descricao: 'Git, GitHub, colaboração, pull requests, Actions e gestão de projetos.',
    trilhas: { git: 0.6, cicd: 0.4 },
    conhecimentos: ['Git', 'Branches', 'Pull Requests', 'GitHub Actions', 'Colaboração']
  },
  {
    id: 'docker-foundations',
    emissor: 'Docker',
    nome: 'Docker Foundations',
    descricao: 'Imagens, containers, volumes, redes e orquestração com Compose.',
    trilhas: { docker: 1.0 },
    conhecimentos: ['Imagens', 'Containers', 'Volumes', 'Networks', 'Compose']
  }
]);
