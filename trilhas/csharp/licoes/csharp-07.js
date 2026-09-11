Plataforma.registrarLicao({
  id: 'csharp-07',
  trilha: 'csharp',
  tipo: 'licao',
  titulo: 'Generics e lambdas: lendo x => x.Ativo',
  subtitulo: 'C# · Etapa 7',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Entender o que <T> significa em List<T>',
    'Entender uma regra passada como função',
    'Ler e escrever expressões lambda como p => p.Ativo'
  ],
  conceitos: ['csharp.generics', 'csharp.lambda', 'csharp.metodos', 'csharp.list'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Generics em uma frase',
      blocos: [
        { tipo: 'texto', texto: 'Você já usou `List<Produto>`. O que está entre `<` e `>` é o tipo dos itens. Se a lista fosse de textos, seria `List<string>`; de números, `List<int>`.' },
        { tipo: 'destaque', texto: '**Generic** é um recurso que permite escrever código uma vez e reutilizá-lo para vários tipos, sem perder a segurança de tipos.' },
        { tipo: 'texto', texto: 'Em `List<T>`, o `T` é um espaço reservado ("algum tipo"). Quando você escreve `List<Produto>`, o T vira Produto. É por isso que a lista aceita produtos e recusa textos.' },
        { tipo: 'diagrama', arte: 'List<T>  (molde genérico)\n   │\n   ├── List<Produto>  → aceita produtos\n   ├── List<string>   → aceita textos\n   └── List<int>      → aceita inteiros' },
        { tipo: 'nota', tom: 'info', texto: 'Você vai reencontrar generics em `Func<T, bool>`, em `Task<T>` e nas consultas ao banco que verá mais adiante. O conceito é sempre o mesmo. Você não precisa entender `Func` e `Task` agora — vamos ver em detalhe nas próximas lições.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs07-a1',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'O que `List<Cliente>` significa?',
        opcoes: [
          'Uma lista que aceita apenas objetos do tipo Cliente',
          'Uma lista que aceita qualquer coisa',
          'Um cliente com vários atributos',
          'Uma lista de textos'
        ],
        correta: 0,
        feedbackErro: {
          1: 'É exatamente o contrário: o tipo entre < > restringe o que entra.',
          2: 'Cliente é um único objeto; a lista guarda vários itens.',
          3: 'Textos seriam List<string>.'
        },
        dicas: ['O tipo entre < > define o conteúdo aceito.', 'Compare com List<Produto> da etapa de listas.'],
        explicacao: 'O generic deixa a lista específica: só entram clientes. O compilador impede o resto.',
        conceitos: ['csharp.generics']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O problema: cada filtro vira um método novo',
      blocos: [
        { tipo: 'texto', texto: 'Sua aplicação precisa filtrar produtos de várias formas: ativos, com estoque baixo, mais caros que 100... Se cada forma virar um método, o código cresce sem parar:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'public List<Produto> FiltrarAtivos(List<Produto> produtos) { ... }\npublic List<Produto> FiltrarCaros(List<Produto> produtos) { ... }\npublic List<Produto> FiltrarSemEstoque(List<Produto> produtos) { ... }' },
        { tipo: 'texto', texto: 'Todas fazem a mesma coisa: percorrer a lista e decidir, item por item, se ele entra ou não. A única diferença é **a regra**.' },
        { tipo: 'destaque', texto: 'E se a **regra** pudesse ser passada como argumento? O C# permite: uma função pode receber outra função.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'A regra como argumento',
      blocos: [
        { tipo: 'texto', texto: 'Em vez de um método para cada filtro, que tal receber **a regra** como argumento? O C# permite: uma função pode receber outra função.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'public List<Produto> Filtrar(List<Produto> produtos, Func<Produto, bool> regra)\n{\n    List<Produto> resultado = new List<Produto>();\n\n    foreach (Produto produto in produtos)\n    {\n        if (regra(produto))\n        {\n            resultado.Add(produto);\n        }\n    }\n\n    return resultado;\n}' },
        { tipo: 'texto', texto: '`Func<Produto, bool>` é um tipo de função: recebe um `Produto` e devolve um `bool` (verdadeiro/falso). O método percorre a lista e pergunta a cada item: "a regra aprova você?"' },
        { tipo: 'nota', tom: 'info', texto: 'Agora só falta escrever a regra que será passada. É o que você faz na próxima tela.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'A lambda: a regra escrita na hora',
      introduz: ['csharp.lambda'],
      blocos: [
        { tipo: 'texto', texto: 'A **regra** é decidida por quem chama o método, escrita na hora em uma forma curta chamada **lambda**:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'List<Produto> ativos = Filtrar(produtos, p => p.Ativo);\nList<Produto> caros = Filtrar(produtos, p => p.Preco > 100);' },
        { tipo: 'conceito', id: 'csharp.lambda', titulo: 'Lambda (a seta =>)', texto: 'Uma regra curta escrita na hora, no formato `item => condição`. O `=>` se lê "tal que": "o item p, tal que p.Ativo". O item antes da seta é temporário; a condição depois da seta devolve verdadeiro ou falso.', exemplo: 'p => p.Ativo   // para cada produto p, considere p.Ativo' },
        { tipo: 'diagrama', arte: 'Lista original          Aplicar regra: p => p.Ativo\n\nMouse    Ativo=true   → true   → ✅ mantém\nTeclado  Ativo=true   → true   → ✅ mantém\nMonitor  Ativo=false  → false  → ❌ remove\nCabo     Ativo=true   → true   → ✅ mantém\n\nResultado: Mouse, Teclado, Cabo' },
        { tipo: 'texto', texto: 'Destrinchando `p => p.Ativo`:' },
        { tipo: 'lista', itens: [
          '`p` — um nome temporário para **cada item** que está sendo testado.',
          '`=>` — a seta que separa o item da regra. Lê-se "tal que".',
          '`p.Ativo` — acessa a propriedade Ativo daquele item (verdadeiro ou falso).'
        ] },
        { tipo: 'nota', tom: 'atencao', texto: 'Leia `p => p.Ativo` assim: "para um produto p, o critério é p.Ativo". Você vai reencontrar essa forma na trilha de consultas de dados.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs07-a2',
        tipo: 'predict-output',
        dimensao: 'reconhecimento',
        enunciado: 'Qual lista o filtro produz?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'List<Produto> resultado = Filtrar(produtos, p => p.Preco > 100);' },
          { tipo: 'tabela', titulo: 'Produtos', colunas: ['Nome', 'Preco'], linhas: [['Mouse', 100.0], ['Teclado', 200.0], ['Monitor', 900.0]] }
        ],
        opcoes: ['Teclado e Monitor', 'Mouse, Teclado e Monitor', 'Apenas Monitor', 'Mouse e Teclado'],
        correta: 0,
        feedbackErro: {
          1: 'O operador `>` não inclui o valor igual: Mouse custa exatamente 100.',
          2: 'Apenas um item passa? Confira Monitor (900).',
          3: 'Mouse (100) não é maior que 100.'
        },
        dicas: ['O critério é `Preco > 100` (estritamente maior).', '100 passa no critério? Não.'],
        explicacao: 'Teclado (200) e Monitor (900) satisfazem `p.Preco > 100`. Mouse (100) fica de fora porque é igual, não maior.',
        conceitos: ['csharp.lambda']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs07-a3',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada lambda ao critério que ela representa.',
        pares: [
          ['p => p.Ativo', 'Mantém apenas produtos ativos'],
          ['p => p.Preco > 100', 'Mantém produtos mais caros que 100'],
          ['p => p.Estoque == 0', 'Mantém produtos sem estoque'],
          ['p => p.Nome == "Mouse"', 'Mantém apenas o produto chamado Mouse']
        ],
        dicas: ['Leia "p" como "cada produto".', 'Depois da seta vem a condição que precisa ser verdadeira.'],
        explicacao: 'Toda lambda segue a forma `item => condição`. O item é temporário; a condição decide se ele entra.',
        conceitos: ['csharp.lambda']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs07-a4',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete a lambda que mantém apenas clientes ativos.',
        codigo: 'List<Cliente> ativos = Filtrar(clientes, c {{1}} c.{{2}});',
        lacunas: [['=>'], ['Ativo']],
        dicas: ['A seta da lambda é formada por dois caracteres.', 'A propriedade de ativo fica em maiúscula no código.'],
        explicacao: '`c => c.Ativo` — o item temporário é `c`, a condição é a propriedade Ativo. Essa forma é a mesma que você vai usar para filtrar dados mais adiante.',
        conceitos: ['csharp.lambda']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs07-a5',
        tipo: 'write-code',
        dimensao: 'construcao',
        enunciado: 'Chame o método `Filtrar` para manter apenas produtos com estoque menor que 10.',
        esqueleto: 'List<Produto> resultado = Filtrar(produtos, );',
        validar: function (valor) {
          const t = P.dom.normalizarCodigo(valor).replace(/ /g, '');
          const lambdaOk = t.indexOf('=>') !== -1 && t.indexOf('estoque<10') !== -1;
          return lambdaOk && (t.indexOf('filtrar(produtos,') !== -1 || t.indexOf('filtrar') === -1);
        },
        respostasAceitas: ['List<Produto> resultado = Filtrar(produtos, p => p.Estoque < 10);'],
        dicas: ['A lambda vai no segundo argumento.', 'Use `p => p.Estoque < 10`.'],
        explicacao: 'Você acabou de escrever a estrutura mental de um filtro: uma coleção + uma regra. Mais adiante isso vai ganhar um nome e uma sintaxe ainda mais curta.',
        conceitos: ['csharp.lambda', 'csharp.metodos']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs07-a6',
        tipo: 'explain',
        dimensao: 'construcao',
        enunciado: 'Explique com suas palavras.',
        pergunta: 'O que significa a expressão `x => x.Ativo`? Explique o papel do x duas vezes.',
        criterios: [
          'O x representa um item temporário da coleção',
          'Depois da seta está a condição avaliada para aquele item',
          'O resultado é verdadeiro/falso para decidir se o item entra ou não'
        ],
        palavrasChave: ['item', 'cada', 'tempor', 'condi', 'verdade', 'falso', 'true', 'false', 'entra', 'mantém', 'mantem', 'filtra'],
        exemplo: 'O primeiro x é um nome temporário para cada item que está sendo testado. A condição depois da seta (x.Ativo) devolve verdadeiro para ativos e falso para inativos; assim o item entra no resultado, e quem filtra mantém apenas os aprovados.',
        dicas: ['Não se prenda à palavra lambda: explique o comportamento.', 'Pense no item e no teste que ele passa.'],
        explicacao: 'Entender a lambda por dentro é o que permite ler qualquer filtro de dados sem decorar.',
        conceitos: ['csharp.lambda'],
        desafio: true
      }
    }
  ]
});
