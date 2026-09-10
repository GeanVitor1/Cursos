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
    'mock': { licao: null, nome: 'mock' },
    'materializar': { licao: null, nome: 'materializar' },
    'stack trace': { licao: null, nome: 'stack trace' },
    'anti-padrao': { licao: null, nome: 'anti-padrão' },
    'estatico': { licao: null, nome: 'estático' },
    'boilerplate': { licao: null, nome: 'boilerplate' },
    'migration': { licao: null, nome: 'migration' },
    'tracking': { licao: null, nome: 'tracking' },
    'dto': { licao: null, nome: 'DTO' },
    'controller': { licao: null, nome: 'controller' },
    'logging': { licao: null, nome: 'logging' },
    'refatorar': { licao: null, nome: 'refatorar' },
    'hash': { licao: null, nome: 'hash' },
    'token': { licao: null, nome: 'token' },
    'cache': { licao: null, nome: 'cache' },
    'acoplamento': { licao: 'csharp-05', nome: 'acoplamento' }
  }
});
