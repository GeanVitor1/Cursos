Plataforma.registrarLicao({
  id: 'csharp-00',
  trilha: 'csharp',
  tipo: 'licao',
  titulo: 'Classes e objetos: o molde dos dados',
  subtitulo: 'C# · Etapa 0',
  duracaoMin: 60,
  xp: 30,
  objetivos: [
    'Entender por que agrupar dados em uma classe',
    'Reconhecer classe, propriedade, valor e objeto',
    'Criar propriedades e criar um objeto com new',
    'Entender o acesso por ponto (objeto.propriedade)'
  ],
  conceitos: ['csharp.classes', 'csharp.propriedades', 'csharp.valor', 'csharp.objetos', 'csharp.tipos', 'csharp.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O problema: dados espalhados',
      blocos: [
        { tipo: 'texto', texto: 'Imagine que sua aplicação precisa guardar um produto. Se cada dado ficar em uma variável separada, a bagunça começa:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'string nome1 = "Mouse";\ndecimal preco1 = 100;\nint estoque1 = 25;\n\nstring nome2 = "Teclado";\ndecimal preco2 = 200;\nint estoque2 = 10;' },
        { tipo: 'nota', tom: 'info', texto: 'Não se preocupe com `string`, `decimal` e `int` agora. Repare apenas no formato: cada dado tem um tipo, um nome e um valor.' },
        { tipo: 'texto', texto: 'Agora responda mentalmente: como você faria uma lista de produtos? Como enviaria um produto inteiro para outro código? Como saber que `preco1` pertence a `nome1`?' },
        { tipo: 'destaque', texto: 'O primeiro passo para organizar dados em C# é **agrupar o que pertence à mesma coisa**.' },
        { tipo: 'trabalho', texto: 'Em projetos .NET, quase tudo que entra e sai de uma aplicação é representado por classes: Produto, Cliente, Pedido, Pagamento.', fonte: '💼 Em uma vaga .NET' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Classe é o molde',
      introduz: ['csharp.classes'],
      blocos: [
        { tipo: 'texto', texto: 'Uma **classe** descreve **quais dados** uma coisa tem. Ela não é o produto em si — é o molde a partir do qual produtos são criados.' },
        { tipo: 'diagrama', arte: 'CLASSE Produto (molde)\n┌──────────────┐\n│ Id           │\n│ Nome         │\n│ Preco        │\n│ Estoque      │\n│ Ativo        │\n└──────────────┘\nUm molde descreve os dados. Ainda não há valores.' },
        { tipo: 'conceito', id: 'csharp.classes', titulo: 'Classe', texto: 'Um molde que descreve quais dados uma coisa tem.', exemplo: 'A classe Produto descreve Id, Nome, Preco, Estoque e Ativo.' },
        { tipo: 'destaque', texto: 'Pense em uma ficha de cadastro em branco: os campos estão definidos, mas ninguém preencheu ainda. Isso é uma classe.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs00-a0',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'O que uma classe representa?',
        opcoes: [
          'Um molde que descreve quais dados um tipo de coisa tem',
          'Um produto já preenchido com valores',
          'Um banco de dados completo',
          'Uma pasta com vários arquivos'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Preenchido com valores é o objeto, que vem depois. A classe é o molde.',
          2: 'Classe não é banco de dados: é uma descrição de dados dentro do programa.',
          3: 'Classe não é pasta; é a estrutura que descreve dados.'
        },
        dicas: ['Pense na ficha de cadastro em branco.', 'O molde descreve, mas não tem valores.'],
        explicacao: 'A classe é o molde: descreve os dados de algo (Produto, Cliente...), mas ainda não contém valores.',
        conceitos: ['csharp.classes']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Propriedades: os dados do molde',
      introduz: ['csharp.propriedades'],
      blocos: [
        { tipo: 'texto', texto: 'Cada dado descrito pela classe é uma **propriedade**. No molde Produto, `Id`, `Nome`, `Preco`, `Estoque` e `Ativo` são propriedades.' },
        { tipo: 'diagrama', arte: 'CLASSE Produto\n┌──────────────────────────┐\n│ Id        ◄─ propriedade │\n│ Nome      ◄─ propriedade │\n│ Preco     ◄─ propriedade │\n│ Estoque   ◄─ propriedade │\n└──────────────────────────┘' },
        { tipo: 'conceito', id: 'csharp.propriedades', titulo: 'Propriedade', texto: 'Um dado do molde, como Nome ou Preco. Ela descreve que informação existe, sem guardar valor ainda.', exemplo: 'Nome, Preco e Estoque são propriedades da classe Produto.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs00-a7',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'Na classe Produto, o que é **Nome**?',
        opcoes: [
          'Uma propriedade: um dado que todo produto possui',
          'O valor "Mouse"',
          'Um objeto já preenchido',
          'O banco de dados onde os produtos ficam'
        ],
        correta: 0,
        feedbackErro: {
          1: '"Mouse" é um valor que pode preencher a propriedade, não a propriedade em si.',
          2: 'Objeto é o molde preenchido; Nome é apenas um dos dados descritos.',
          3: 'Banco de dados é outro assunto: aqui estamos dentro do programa.'
        },
        dicas: ['Propriedade é o dado descrito no molde.', 'Ela ainda não tem valor.'],
        explicacao: '`Nome` é uma propriedade: um dado que a classe descreve. O valor (como "Mouse") só aparece quando o objeto é preenchido.',
        conceitos: ['csharp.propriedades']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Valor: o conteúdo de cada propriedade',
      introduz: ['csharp.valor'],
      blocos: [
        { tipo: 'texto', texto: 'A propriedade é o rótulo; o **valor** é o conteúdo guardado nela.' },
        { tipo: 'tabela', titulo: 'Propriedade × valor', colunas: ['Propriedade', 'Valor'], linhas: [
          ['Nome', '"Mouse"'],
          ['Preco', '100.00'],
          ['Estoque', '25'],
          ['Ativo', 'true']
        ] },
        { tipo: 'conceito', id: 'csharp.valor', titulo: 'Valor', texto: 'O conteúdo guardado em uma propriedade.', exemplo: 'Nome = "Mouse": "Mouse" é o valor.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs00-a8',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada propriedade ao valor que ela guarda.',
        pares: [
          ['Nome', '"Mouse"'],
          ['Preco', '100.00'],
          ['Estoque', '25'],
          ['Ativo', 'true']
        ],
        dicas: ['A propriedade fica à esquerda; o conteúdo dela, à direita.', 'Preco guarda dinheiro; Estoque, quantidade.'],
        explicacao: 'A propriedade é o campo; o valor é o conteúdo. Essa dupla vai aparecer em todo objeto que você criar.',
        conceitos: ['csharp.valor', 'csharp.propriedades']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Objeto: o molde preenchido',
      introduz: ['csharp.objetos'],
      blocos: [
        { tipo: 'texto', texto: 'Quando o molde é preenchido com valores, nasce um **objeto**: a coisa de verdade. Em C#, criar um objeto usa a palavra `new`.' },
        { tipo: 'diagrama', arte: 'CLASSE Produto (molde)        OBJETO produto (preenchido)\n┌──────────────┐              ┌──────────────────────┐\n│ Id           │    ── new ──►│ Id = 1               │\n│ Nome         │              │ Nome = "Mouse"       │\n│ Preco        │              │ Preco = 100.00       │\n└──────────────┘              └──────────────────────┘' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'Produto produto = new Produto();' },
        { tipo: 'conceito', id: 'csharp.objetos', titulo: 'Objeto', texto: 'Uma cópia preenchida do molde, criada com new.', exemplo: 'Produto produto = new Produto();' },
        { tipo: 'nota', tom: 'info', texto: 'A variável `produto` é do tipo `Produto` e passa a apontar para um objeto recém-criado.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs00-a9',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'O que acontece ao escrever `Produto produto = new Produto();`?',
        opcoes: [
          'Um objeto novo é criado a partir do molde Produto',
          'Uma nova classe chamada Produto é declarada',
          'O produto é gravado no banco de dados',
          'Todas as propriedades são preenchidas automaticamente'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A classe já foi declarada antes; `new` cria uma cópia dela.',
          2: 'Aqui não há gravação em banco: o objeto existe apenas na memória do programa.',
          3: 'O objeto nasce vazio; você preenche as propriedades depois.'
        },
        dicas: ['`new` cria uma cópia do molde.', 'A classe já existia; o que nasce agora é o objeto.'],
        explicacao: '`new Produto()` cria um objeto a partir da classe. Ele nasce sem valores preenchidos.',
        conceitos: ['csharp.objetos']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Preenchendo o objeto: objeto.propriedade',
      blocos: [
        { tipo: 'texto', texto: 'Para preencher ou ler uma propriedade, usamos o ponto: `produto.Nome` significa "a propriedade Nome dentro do objeto produto".' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'Produto produto = new Produto();\nproduto.Id = 1;\nproduto.Nome = "Mouse";\nproduto.Preco = 100.00m;\nproduto.Estoque = 25;' },
        { tipo: 'glossario', titulo: 'Símbolos do código', itens: [
          [';', 'ponto e vírgula', 'Termina uma instrução.'],
          ['=', 'atribuição', 'Guarda um valor em uma variável ou propriedade.'],
          ['" "', 'aspas', 'Delimitam um texto (string).'],
          ['( )', 'parênteses', 'Envolvem a chamada de `new Produto()`.'],
          ['.', 'ponto', 'Acessa uma propriedade dentro do objeto: `produto.Nome`.']
        ] },
        { tipo: 'nota', tom: 'atencao', texto: 'O sufixo `m` em `100.00m` diz ao C# que o valor é `decimal` (dinheiro). Sem ele, o compilador entende como outro tipo de número.' }
      ]
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
      tipo: 'conteudo',
      titulo: 'A forma de uma propriedade em C#',
      blocos: [
        { tipo: 'texto', texto: 'Até aqui você viu as propriedades como ideia. Em C#, cada propriedade é escrita em uma forma fixa:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'public string Nome { get; set; }' },
        { tipo: 'tabela', titulo: 'Cada parte da linha', colunas: ['Parte', 'Papel'], linhas: [
          ['public', 'pode ser usada de fora da classe'],
          ['string', 'o tipo do valor que a propriedade guarda'],
          ['Nome', 'o nome da propriedade'],
          ['{ get; set; }', 'permite ler (get) e gravar (set) o valor']
        ] },
        { tipo: 'glossario', titulo: 'Símbolos que faltam', itens: [
          ['{ get; set; }', 'ler e gravar', 'Permite ler (get) e gravar (set) o valor da propriedade.'],
          ['{ }', 'chaves', 'Abrem e fecham o bloco de código da classe.'],
          ['//', 'comentário', 'O computador ignora o que vem depois dele na linha.']
        ] },
        { tipo: 'nota', tom: 'info', texto: 'Você não precisa decorar `public` e `{ get; set; }` agora. Por enquanto, reconheça que toda propriedade tem tipo, nome e a parte de leitura/gravação.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs00-a10',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete a propriedade que guarda o nome do cliente como texto.',
        codigo: 'public {{1}} Nome { {{2}}; set; }',
        lacunas: [['string'], ['get']],
        dicas: ['Texto em C# é o tipo `string`.', 'A parte que lê o valor se chama `get`.'],
        explicacao: '`public string Nome { get; set; }` — tipo `string`, nome `Nome`, leitura (`get`) e gravação (`set`).',
        conceitos: ['csharp.propriedades']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Tipos: qual espécie de valor cada propriedade guarda',
      introduz: ['csharp.tipos'],
      blocos: [
        { tipo: 'texto', texto: 'O tipo vem antes do nome da propriedade e define que espécie de valor ela aceita. Estes quatro aparecem o tempo todo:' },
        { tipo: 'tabela', titulo: 'Tipos do dia a dia', colunas: ['Tipo', 'Guarda', 'Exemplo'], linhas: [
          ['int', 'números inteiros', '25'],
          ['string', 'textos', '"Mouse"'],
          ['decimal', 'dinheiro (com centavos)', '100.50m'],
          ['bool', 'verdadeiro ou falso', 'true / false']
        ] },
        { tipo: 'conceito', id: 'csharp.tipos', titulo: 'Tipo', texto: 'Define que espécie de valor cabe: int (inteiro), string (texto), decimal (dinheiro) e bool (verdadeiro/falso).', exemplo: 'int Id; string Nome; decimal Preco; bool Ativo.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs00-a11',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada valor ao tipo mais adequado em C#.',
        pares: [
          ['"Mouse"', 'string'],
          ['25', 'int'],
          ['100.50m', 'decimal'],
          ['true', 'bool']
        ],
        dicas: ['Preço tem centavos: é decimal.', 'Verdadeiro/falso é bool.'],
        explicacao: 'O tipo certo evita erros: texto é `string`, contagem é `int`, dinheiro é `decimal` e sim/não é `bool`.',
        conceitos: ['csharp.tipos']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'A classe completa',
      blocos: [
        { tipo: 'texto', texto: 'Agora as peças se encaixam. Leia a classe Produto devagar: `public class` abre o molde; cada linha com tipo + nome + `{ get; set; }` é uma propriedade.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'public class Produto\n{\n    public int Id { get; set; }\n    public string Nome { get; set; }\n    public decimal Preco { get; set; }\n    public int Estoque { get; set; }\n    public bool Ativo { get; set; }\n}' },
        { tipo: 'glossario', titulo: 'Decifrando a classe', itens: [
          ['class', 'classe', 'A palavra que declara um molde de dados.'],
          ['public', 'acessível de fora', 'Permite usar a classe e as propriedades de outros lugares.']
        ] },
        { tipo: 'nota', tom: 'info', texto: 'Uma propriedade de cada vez: `public int Id { get; set; }` é uma propriedade chamada Id, do tipo int.' },
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
      tipo: 'atividade',
      atividade: {
        id: 'cs00-a2',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada termo ao seu papel.',
        pares: [
          ['Classe', 'Molde que descreve os dados'],
          ['Propriedade', 'Um dado do molde, como Nome ou Preco'],
          ['Valor', 'O conteúdo guardado na propriedade'],
          ['Objeto', 'Uma cópia preenchida do molde']
        ],
        dicas: ['A classe descreve. O objeto existe.', 'Nome é a propriedade; "Mouse" é o valor.'],
        explicacao: 'Classe descreve, propriedade é o dado, valor é o conteúdo e objeto é a cópia preenchida.',
        conceitos: ['csharp.classes', 'csharp.objetos', 'csharp.propriedades', 'csharp.valor']
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
