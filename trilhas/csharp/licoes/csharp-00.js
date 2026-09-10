Plataforma.registrarLicao({
  id: 'csharp-00',
  trilha: 'csharp',
  tipo: 'licao',
  titulo: 'Classes e objetos: o molde dos dados',
  subtitulo: 'C# · Etapa 0',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Entender por que agrupar dados em uma classe',
    'Reconhecer classe como molde e objeto como cópia preenchida',
    'Criar propriedades e criar um objeto com new',
    'Entender o acesso por ponto (objeto.propriedade)'
  ],
  conceitos: ['csharp.classes', 'csharp.objetos', 'csharp.propriedades', 'csharp.tipos', 'csharp.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O problema: dados espalhados',
      blocos: [
        { tipo: 'texto', texto: 'Imagine que sua aplicação precisa guardar um produto. Se cada dado ficar em uma variável separada, a bagunça começa:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'string nome1 = "Mouse";\ndecimal preco1 = 100;\nint estoque1 = 25;\n\nstring nome2 = "Teclado";\ndecimal preco2 = 200;\nint estoque2 = 10;' },
        { tipo: 'nota', tom: 'info', texto: 'Você vai reconhecer `string`, `decimal` e `int` na próxima tela. Por enquanto, repare apenas no formato: cada dado tem um tipo, um nome e um valor.' },
        { tipo: 'texto', texto: 'Agora responda mentalmente: como você faria uma lista de produtos? Como enviaria um produto inteiro para outro código? Como saber que `preco1` pertence a `nome1`?' },
        { tipo: 'destaque', texto: 'O primeiro passo para organizar dados em C# é **agrupar o que pertence à mesma coisa**.' },
        { tipo: 'trabalho', texto: 'Em projetos .NET, quase tudo que entra e sai de uma aplicação é representado por classes: Produto, Cliente, Pedido, Pagamento.', fonte: '💼 Em uma vaga .NET' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Classe é o molde',
      introduz: ['csharp.classes', 'csharp.propriedades', 'csharp.tipos'],
      blocos: [
        { tipo: 'texto', texto: 'Uma **classe** descreve quais dados uma coisa tem. Ela não é o produto em si — é o molde a partir do qual produtos são criados.' },
        { tipo: 'diagrama', arte: 'CLASSE Produto (molde)\n┌─────────────────────┐\n│ Id        int       │\n│ Nome      string    │\n│ Preco     decimal   │\n│ Estoque   int       │\n│ Ativo     bool      │\n│ Categoria string    │\n└─────────────────────┘\n          │ criar um objeto\n          ▼\nOBJETO (preenchido)\n┌─────────────────────┐\n│ Id = 1              │\n│ Nome = "Mouse"      │\n│ Preco = 100.00      │\n│ Estoque = 25        │\n│ Ativo = true        │\n│ Categoria = "Mouse" │\n└─────────────────────┘' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'public class Produto\n{\n    public int Id { get; set; }\n    public string Nome { get; set; }\n    public decimal Preco { get; set; }\n    public int Estoque { get; set; }\n    public bool Ativo { get; set; }\n    public string Categoria { get; set; }\n}' },
        { tipo: 'glossario', titulo: 'Decifrando o código', itens: [
          ['public', 'acessível de fora da classe', 'Define quem pode usar aquela parte do código.'],
          ['class', 'classe', 'A palavra que declara um molde de dados e comportamento.'],
          ['int / string / decimal', 'tipos', 'int = número inteiro; string = texto; decimal = número com centavos.'],
          ['bool', 'verdadeiro ou falso', 'bool guarda apenas `true` (verdadeiro) ou `false` (falso). Ex.: Ativo.'],
          ['{ get; set; }', 'propriedade', 'Permite ler (get) e gravar (set) um valor do objeto.'],
          ['valor', 'conteúdo guardado', 'O dado em si: "Mouse" é o valor da propriedade Nome.']
        ] },
        { tipo: 'glossario', titulo: 'Símbolos do código', itens: [
          [';', 'ponto e vírgula', 'Termina uma instrução.'],
          ['{ }', 'chaves', 'Abrem e fecham um bloco de código.'],
          ['=', 'atribuição', 'Guarda um valor em uma variável ou propriedade.'],
          ['" "', 'aspas', 'Delimitam um texto (string).'],
          ['( )', 'parênteses', 'Envolvem uma chamada de código, como ao criar um objeto.'],
          ['//', 'comentário', 'O computador ignora o que vem depois dele na linha.']
        ] },
        { tipo: 'nota', tom: 'info', texto: 'Cada `{ get; set; }` é uma **propriedade**. É assim que o C# expõe os dados de um objeto para o resto do sistema.' },
        { tipo: 'futuro', conceitos: ['ef.entidade'], texto: 'Guarde a ideia de classe. Quando chegarmos ao Entity Framework, você verá como uma classe C# pode representar uma tabela do banco — e cada propriedade, uma coluna.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs00-a1',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'Qual é o principal problema de representar produtos com variáveis soltas (`nome1`, `preco1`, `nome2`, `preco2`...)?',
        opcoes: [
          'Os dados da mesma coisa ficam separados e é difícil juntá-los ou transportá-los',
          'O C# não aceita variáveis com números no nome',
          'Variáveis de texto ocupam muito espaço no banco',
          'O programa fica mais rápido quando há mais variáveis'
        ],
        correta: 0,
        feedbackErro: {
          1: 'C# aceita números no nome, mas evitamos por clareza. O problema real é outro.',
          2: 'Ainda não estamos falando de banco. Pense em organizar os dados dentro do programa.',
          3: 'Mais variáveis não deixam o programa mais rápido; deixam mais difícil de manter.'
        },
        dicas: ['Pense em como você entregaria um produto inteiro para outro código.', 'O que mantém nome, preço e estoque unidos?'],
        explicacao: 'Quando os dados do mesmo item ficam espalhados, qualquer operação (listar, ordenar, salvar) vira um malabarismo. A classe resolve isso.',
        conceitos: ['csharp.classes', 'csharp.propriedades']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Criando o objeto com new',
      introduz: ['csharp.objetos'],
      blocos: [
        { tipo: 'texto', texto: 'Para transformar o molde em um produto de verdade, usamos `new`. A variável passa a ter o tipo `Produto`:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'Produto produto = new Produto();\nproduto.Id = 1;\nproduto.Nome = "Mouse";\nproduto.Preco = 100.00m;\nproduto.Estoque = 25;' },
        { tipo: 'conceito', id: 'csharp.objetos', titulo: 'Objeto', texto: 'Uma cópia preenchida do molde, criada com new. É o produto de verdade, com valores.', exemplo: 'Produto produto = new Produto();' },
        { tipo: 'texto', texto: 'Repare no ponto (`.`): `produto.Nome` significa "acesse a propriedade Nome **dentro do objeto** produto". O ponto é o caminho de entrada no objeto.' },
        { tipo: 'nota', tom: 'atencao', texto: 'O sufixo `m` em `100.00m` diz ao C# que o valor é `decimal` (dinheiro). Sem ele, o compilador entende como outro tipo de número (compilador = o programa que traduz seu código C# para o computador executar).' },
        { tipo: 'trabalho', texto: 'Classes como `Produto` são exatamente o que o Entity Framework mapeia para tabelas. O que você aprendeu aqui é o ponto de partida da trilha de dados.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs00-a2',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada termo ao seu papel.',
        pares: [
          ['Classe', 'Molde que descreve os dados'],
          ['Objeto', 'Uma cópia preenchida do molde'],
          ['Propriedade', 'Um dado do objeto, como Nome ou Preco'],
          ['Valor', 'O conteúdo guardado na propriedade']
        ],
        dicas: ['A classe descreve. O objeto existe.', 'Nome é a propriedade; "Mouse" é o valor.'],
        explicacao: 'Classe descreve, objeto é a cópia preenchida, propriedade é o campo e valor é o conteúdo.',
        conceitos: ['csharp.classes', 'csharp.objetos', 'csharp.propriedades']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs00-a3',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete a criação de um produto chamado "Teclado", com preço 200.00 e estoque 10.',
        codigo: 'Produto produto = {{1}} Produto();\nproduto.Nome = "Teclado";\nproduto.{{2}} = 200.00m;\nproduto.Estoque = 10;',
        lacunas: [['new'], ['Preco']],
        dicas: ['A palavra que cria uma cópia do molde tem 3 letras.', 'A propriedade de valor no código está em maiúscula.'],
        explicacao: '`new Produto()` cria o objeto e `produto.Preco = 200.00m` preenche a propriedade com um decimal.',
        conceitos: ['csharp.objetos', 'csharp.propriedades']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs00-a4',
        tipo: 'order-blocks',
        dimensao: 'ordenacao',
        enunciado: 'Ordene os blocos para criar e preencher um produto.',
        blocos: [
          'Produto produto = new Produto();',
          'produto.Id = 7;',
          'produto.Nome = "Monitor";',
          'produto.Preco = 900.00m;'
        ],
        dicas: ['Primeiro você cria o objeto, depois preenche.', 'Sem o new, não existe objeto para preencher.'],
        explicacao: 'A ordem é: criar com `new` e depois preencher as propriedades. Sempre.',
        conceitos: ['csharp.objetos', 'csharp.propriedades']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs00-a5',
        tipo: 'write-code',
        dimensao: 'construcao',
        enunciado: 'Escreva uma classe `Cliente` com as propriedades `Id` (int), `Nome` (string), `Email` (string), `Telefone` (string) e `Ativo` (bool).',
        esqueleto: 'public class Cliente\n{\n    // suas propriedades aqui\n}',
        validar: function (valor) {
          const t = P.dom.normalizar(valor);
          return t.indexOf('class cliente') !== -1 &&
            t.indexOf('int id') !== -1 &&
            t.indexOf('string nome') !== -1 &&
            t.indexOf('string email') !== -1 &&
            t.indexOf('string telefone') !== -1 &&
            t.indexOf('bool ativo') !== -1 &&
            t.indexOf('get') !== -1 && t.indexOf('set') !== -1;
        },
        respostasAceitas: ['public class Cliente { public int Id { get; set; } public string Nome { get; set; } public string Email { get; set; } public string Telefone { get; set; } public bool Ativo { get; set; } }'],
        dicas: ['Uma propriedade segue o padrão: tipo + Nome + { get; set; }.', 'Use public antes de cada propriedade.'],
        explicacao: 'Cada propriedade precisa de tipo, nome e `{ get; set; }`. Essa é a base das classes que você vai mapear no Entity Framework.',
        conceitos: ['csharp.classes', 'csharp.propriedades', 'csharp.tipos']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs00-a6',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Você entrou em um projeto e encontrou um código que salva o produto recebendo 9 valores separados: nome, preco, estoque, categoria, fornecedor, peso, altura, largura e ativo. Cada vez que alguém chama esse código, precisa lembrar a ordem exata dos 9 valores.',
        enunciado: 'Qual mudança resolve a raiz do problema?',
        opcoes: [
          'Criar uma classe Produto e passar um único objeto para o código que salva o produto',
          'Escrever a lista de valores em um comentário',
          'Criar outro código que também recebe 9 valores separados',
          'Criar uma classe diferente para cada produto'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Comentário não valida nada: na próxima chamada o erro volta.',
          2: 'Outro código com 9 valores separados repete o mesmo problema em dobro.',
          3: 'Uma classe diferente para cada produto não agrupa os dados de um produto; apenas multiplica o trabalho.'
        },
        dicas: ['O problema é agrupar informações do mesmo conceito.', 'Foi exatamente para isso que você aprendeu classe e objeto.'],
        explicacao: 'Com a classe Produto, o código passa a receber uma coisa só, com significado claro. Esse é o uso mais comum de classes no backend.',
        conceitos: ['csharp.classes', 'csharp.objetos'],
        desafio: true
      }
    }
  ]
});
