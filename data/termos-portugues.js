Plataforma.registrarTermosPortugues({
  observacao: 'Léxico de termos técnicos em português. Cada termo tem a lição em que é explicado pela primeira vez; o linter-pedagogico falha se o termo aparecer antes (em atividade) ou avisa (em conteúdo). licao: null significa "nunca usar antes de uma lição própria explicar o termo" — usado para jargão de trilhas ainda não publicadas. A busca ignora acentos e exige limite de palavra.',

  termos: {
    'compilador': { licao: 'csharp-00', nome: 'compilador' },
    'compila': { licao: 'csharp-00', nome: 'compila/compilar' },
    'compilar': { licao: 'csharp-00', nome: 'compilar' },
    'compilacao': { licao: 'csharp-00', nome: 'compilação' },

    'consulta': { licao: 'sql-00', nome: 'consulta' },
    'consultar': { licao: 'sql-00', nome: 'consultar' },
    'filtro': { licao: 'sql-03', nome: 'filtro' },
    'filtrar': { licao: 'sql-03', nome: 'filtrar' },
    'filtra': { licao: 'sql-03', nome: 'filtra' },

    'parametro': { licao: 'csharp-02', nome: 'parâmetro' },
    'parametros': { licao: 'csharp-02', nome: 'parâmetros' },
    'testavel': { licao: 'csharp-05', nome: 'testável' },
    'teste': { licao: 'csharp-05', nome: 'teste' },
    'testes': { licao: 'csharp-05', nome: 'testes' },
    'testar': { licao: 'csharp-05', nome: 'testar' },
    'testada': { licao: 'csharp-05', nome: 'testada' },
    'testado': { licao: 'csharp-05', nome: 'testado' },
    'service': { licao: 'csharp-06', nome: 'service (classe de serviço)' },
    'producao': { licao: 'csharp-04', nome: 'produção (ambiente real)' },

    'entidade': { licao: 'ef-00', nome: 'entidade' },
    'entidades': { licao: 'ef-00', nome: 'entidades' },

    'endpoint': { licao: 'aspnet-02', nome: 'endpoint' },

    'frontend': { licao: 'terminal-00', nome: 'frontend' },
    'container': { licao: 'terminal-00', nome: 'container' },

    'deploy': { licao: 'ingles-00', nome: 'deploy' },
    'pull request': { licao: 'ingles-00', nome: 'pull request' },
    'code review': { licao: 'ingles-00', nome: 'code review' },

    'performance': { licao: null, nome: 'performance (usar "desempenho")' },
    'mock': { licao: 'testes-04', nome: 'mock' },
    'materializar': { licao: null, nome: 'materializar' },
    'stack trace': { licao: null, nome: 'stack trace' },
    'anti-padrao': { licao: null, nome: 'anti-padrão' },
    'estatico': { licao: null, nome: 'estático' },
    'boilerplate': { licao: null, nome: 'boilerplate' },
    'migration': { licao: 'ef-04', nome: 'migration' },
    'tracking': { licao: 'ef-14', nome: 'tracking' },
    'dto': { licao: 'aspnet-10', nome: 'DTO' },
    'controller': { licao: 'aspnet-09', nome: 'controller' },
    'logging': { licao: 'aspnet-16', nome: 'logging' },
    'refatorar': { licao: 'arquitetura-09', nome: 'refatorar' },
    'hash': { licao: 'seguranca-01', nome: 'hash' },
    'token': { licao: 'autenticacao-02', nome: 'token' },
    'cache': { licao: 'docker-09', nome: 'cache' },
    'acoplamento': { licao: 'csharp-05', nome: 'acoplamento' }
  }
});
