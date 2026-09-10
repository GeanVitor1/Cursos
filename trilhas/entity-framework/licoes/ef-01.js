Plataforma.registrarLicao({
  id: 'ef-01',
  trilha: 'entity-framework',
  tipo: 'licao',
  titulo: 'DbContext e DbSet: a porta e as gavetas',
  subtitulo: 'EF Core · Etapa 1',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Entender o papel do DbContext como conexão com o banco',
    'Entender o DbSet como coleção de entidades de um tipo',
    'Ler uma classe de contexto'
  ],
  conceitos: ['ef.dbcontext', 'ef.dbset', 'ef.entidade', 'csharp.di'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'A porta de entrada para o banco',
      introduz: ['ef.dbcontext'],
      blocos: [
        { tipo: 'texto', texto: 'Sua aplicação precisa de uma porta de entrada para conversar com o banco. No Entity Framework, existe um objeto responsável por essa conversa: ele abre a conexão, acompanha as mudanças e envia os comandos.' },
        { tipo: 'destaque', texto: 'Esse objeto é chamado de **DbContext**.' },
        { tipo: 'conceito', id: 'ef.dbcontext', titulo: 'DbContext', texto: 'A porta de entrada para o banco: abre a conexão, acompanha as mudanças e envia os comandos.', exemplo: 'MercadoAuroraContext : DbContext' },
        { tipo: 'diagrama', arte: 'Sua aplicação (camada de dados)\n        │\n        ▼\n     DbContext  ◄── a porta de entrada\n        │\n        ▼\n   Banco de dados (Mercado Aurora)' },
        { tipo: 'nota', tom: 'info', texto: 'Analogia útil: pense no DbContext como a **porta e o balcão** de uma loja. É por ele que você pede, entrega e consulta. Sem a porta, ninguém entra.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'DbSet: uma gaveta para cada tipo de coisa',
      introduz: ['ef.dbset'],
      blocos: [
        { tipo: 'texto', texto: 'Dentro do DbContext existem as gavetas. Cada gaveta guarda um tipo de entidade e corresponde a uma tabela. Elas são chamadas de **DbSet**.' },
        { tipo: 'conceito', id: 'ef.dbset', titulo: 'DbSet', texto: 'Uma "gaveta" de entidades de um tipo, ligada a uma tabela do banco.', exemplo: 'public DbSet<Produto> Produtos { get; set; }' },
        { tipo: 'diagrama', arte: 'MercadoAuroraContext (DbContext)\n┌──────────────────────────────────────┐\n│  DbSet<Produto>  Produtos   ──► tabela Produtos │\n│  DbSet<Cliente>  Clientes   ──► tabela Clientes │\n│  DbSet<Pedido>   Pedidos    ──► tabela Pedidos  │\n└──────────────────────────────────────┘' },
        { tipo: 'texto', texto: 'Com a gaveta nas mãos, você não escreve `SELECT * FROM Produtos`. Você pergunta ao DbSet:' },
        { tipo: 'nota', tom: 'info', texto: 'Antes de usar, guarde o nome: o objeto `context` é o seu DbContext — a porta de entrada do banco. É por ele que você chega aos DbSets.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'context.Produtos' },
        { tipo: 'nota', tom: 'atencao', texto: '`context.Produtos` é um `DbSet<Produto>`: parece uma lista de produtos, mas por baixo conversa com a tabela. É nele que você aplica LINQ.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef01-a1',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada elemento do EF ao seu papel.',
        pares: [
          ['DbContext', 'Porta de entrada: conexão e acompanhamento'],
          ['DbSet<Produto>', 'Gaveta de produtos, ligada à tabela Produtos'],
          ['Produto', 'Entidade mapeada para uma linha'],
          ['context.Produtos', 'Acesso à gaveta de produtos']
        ],
        dicas: ['O contexto conecta.', 'O DbSet representa uma tabela/coleção.'],
        explicacao: 'Contexto conecta; DbSet representa a tabela; a entidade representa a linha.',
        conceitos: ['ef.dbcontext', 'ef.dbset']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'A classe de contexto',
      blocos: [
        { tipo: 'texto', texto: 'O contexto é uma classe que você escreve uma vez. Cada `DbSet` vira uma propriedade:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'public class MercadoAuroraContext : DbContext\n{\n    public MercadoAuroraContext(DbContextOptions<MercadoAuroraContext> options)\n        : base(options)\n    {\n    }\n\n    public DbSet<Produto> Produtos { get; set; }\n    public DbSet<Cliente> Clientes { get; set; }\n    public DbSet<Pedido> Pedidos { get; set; }\n}' },
        { tipo: 'glossario', titulo: 'Decifrando a classe', itens: [
          [': DbContext', 'herda de', 'Sua classe ganha todo o comportamento do EF Core.'],
          ['DbContextOptions', 'configuração de conexão', 'Recebe o endereço e as credenciais do banco (connection string) e outras escolhas.'],
          ['construtor', 'recebe opções', 'O padrão de injeção de dependência que você já estudou.'],
          ['DbSet<X>', 'gaveta', 'Uma propriedade por tabela que você quer acessar.']
        ] },
        { tipo: 'nota', tom: 'info', texto: '`DbContextOptions` e `base(options)` são apenas configuração: você não precisa entender esta linha agora. Ela diz ao contexto onde o banco está — vamos detalhar mais adiante.' },
        { tipo: 'nota', tom: 'info', texto: 'O nome termina com **Context** por convenção. O `Produtos` no plural acompanha o nome da tabela.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef01-a2',
        tipo: 'interpret-code',
        dimensao: 'reconhecimento',
        enunciado: 'O que a linha `public DbSet<Cliente> Clientes { get; set; }` declara?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'public DbSet<Cliente> Clientes { get; set; }' }
        ],
        opcoes: [
          'Uma coleção de entidades Cliente que conversa com a tabela Clientes',
          'Um cliente específico',
          'Uma lista de strings com nomes de clientes',
          'Uma conexão separada com outro banco'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Um cliente específico seria um objeto Cliente; o DbSet guarda vários.',
          2: 'O tipo dentro de < > é Cliente, não string.',
          3: 'O contexto mantém uma conexão; o DbSet é uma tabela/coleção.'
        },
        dicas: ['DbSet é a gaveta, não o item.', 'O tipo entre < > define o que entra.'],
        explicacao: 'Cada DbSet corresponde a uma tabela e permite consultar e manipular suas linhas como entidades.',
        conceitos: ['ef.dbset', 'ef.entidade']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef01-a3',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete o contexto para expor as tabelas Produtos e Pedidos.',
        codigo: 'public class MercadoAuroraContext : DbContext\n{\n    public {{1}}<Produto> Produtos { get; set; }\n    public DbSet<{{2}}> Pedidos { get; set; }\n}',
        lacunas: [['DbSet'], ['pedido', 'Pedido']],
        dicas: ['A gaveta chama-se DbSet.', 'A entidade de pedidos é Pedido.'],
        explicacao: 'Cada propriedade DbSet<T> abre uma tabela para consulta e gravação.',
        conceitos: ['ef.dbcontext', 'ef.dbset']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef01-a4',
        tipo: 'multiple-choice',
        dimensao: 'aplicacao',
        enunciado: 'Você precisa buscar os produtos ativos. Considerando o que já aprendeu de LINQ, qual código parte da gaveta correta?',
        opcoes: [
          'context.Produtos.Where(p => p.Ativo)',
          'context.Clientes.Where(p => p.Ativo)',
          'context.Produtos.Select(p => p.Ativo)',
          'produtos.Where(p => p.Ativo)'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Clientes guarda clientes, não produtos.',
          2: 'Select transforma, não filtra.',
          3: '`produtos` é uma lista em memória; a consulta deve partir da gaveta `context.Produtos`.'
        },
        dicas: ['Cada DbSet guarda um tipo de entidade.', 'Produtos estão em context.Produtos.'],
        explicacao: 'O DbSet é o ponto de partida das consultas. O LINQ que você aprendeu vale exatamente igual aqui. Na próxima lição você verá como executar essa consulta e transformar o resultado em uma lista.',
        conceitos: ['ef.dbset', 'linq.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef01-a5',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Um colega criou um novo contexto a cada linha de um método, um para ler cliente e outro para ler pedidos. A aplicação começou a dar erro ao salvar pedido com cliente lido no outro contexto.',
        enunciado: 'Qual é a explicação correta?',
        opcoes: [
          'O DbContext acompanha os objetos que carrega; usar contextos diferentes para o mesmo fluxo quebra esse acompanhamento',
          'O EF Core só permite ler uma tabela por vez',
          'Contextos não podem ser criados em métodos',
          'O problema é usar LINQ em dois contextos'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Um contexto pode ler várias tabelas; o problema é a falta de um contexto único para o fluxo.',
          2: 'Contextos podem ser criados em métodos, mas o ciclo de vida precisa ser pensado.',
          3: 'LINQ funciona com qualquer contexto; o problema é o acompanhamento entre eles.'
        },
        dicas: ['O DbContext "conhece" os objetos que carregou.', 'Se o objeto veio de outro contexto, o atual não o reconhece.'],
        explicacao: 'Um fluxo de trabalho normalmente usa um DbContext por operação. É por isso que o registro do contexto na inicialização da aplicação precisa ser pensado — assunto de ASP.NET, veremos depois.',
        conceitos: ['ef.dbcontext', 'csharp.di']
      }
    }
  ]
});
