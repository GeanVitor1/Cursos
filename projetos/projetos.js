Plataforma.registrarProjetos([
  {
    id: 'p1',
    numero: 1,
    nome: 'API de Produtos',
    fase: 3,
    trilhas: ['sql', 'csharp', 'linq', 'entity-framework', 'aspnet'],
    descricao: 'A primeira aplicação real: uma API REST para cadastrar, consultar, atualizar e excluir produtos.',
    criterios: [
      'Modelagem da tabela Produtos em SQL',
      'Classe Produto como entidade no C#',
      'DbContext, DbSet e consultas com LINQ',
      'Endpoints GET, POST, PUT e DELETE com status codes corretos'
    ]
  },
  {
    id: 'p2',
    numero: 2,
    nome: 'Clientes + Produtos + Pedidos',
    fase: 4,
    trilhas: ['entity-framework', 'aspnet', 'seguranca', 'arquitetura'],
    descricao: 'Relacionamentos de verdade: um cliente com vários pedidos, cada pedido com vários itens.',
    criterios: [
      'Relacionamentos 1:N com chave estrangeira',
      'Include e projeções com DTOs',
      'Services separando a regra de negócio',
      'Tratamento de erros padronizado e validação de entrada'
    ]
  },
  {
    id: 'p3',
    numero: 3,
    nome: 'Sistema de Estoque',
    fase: 5,
    trilhas: ['testes', 'frontend'],
    descricao: 'Movimentações de entrada e saída, saldo por produto e painel React consumindo a API.',
    criterios: [
      'Testes unitários das regras de estoque',
      'Relatório de saldo com agregação SQL',
      'Frontend React com TypeScript',
      'Integração frontend e backend'
    ]
  },
  {
    id: 'p4',
    numero: 4,
    nome: 'Mini E-commerce',
    fase: 6,
    trilhas: ['autenticacao', 'docker'],
    descricao: 'Catálogo, carrinho, pedidos e autenticação com JWT — tudo rodando com Docker Compose.',
    criterios: [
      'Registro e login com JWT',
      'Autorização por perfil (cliente e admin)',
      'API + SQL Server + Redis via Docker Compose',
      'Variáveis de ambiente e volumes'
    ]
  },
  {
    id: 'p5',
    numero: 5,
    nome: 'Sistema Completo Full Stack',
    fase: 8,
    trilhas: ['redis', 'mensageria', 'cicd', 'azure', 'microsservicos'],
    descricao: 'A aplicação de portfólio: frontend, API, cache, filas, testes, pipeline e deploy na nuvem.',
    criterios: [
      'Cache com Redis e invalidação correta',
      'Fila para e-mails e processamento assíncrono',
      'Testes unitários e de integração no pipeline',
      'Deploy automatizado no Azure via GitHub Actions'
    ]
  }
]);
