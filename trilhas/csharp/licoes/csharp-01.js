Plataforma.registrarLicao({
  id: 'csharp-01',
  trilha: 'csharp',
  tipo: 'licao',
  titulo: 'Variáveis, tipos e decisões',
  subtitulo: 'C# · Etapa 1',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Declarar variáveis com o tipo certo',
    'Diferenciar int, decimal, string, bool e var',
    'Tomar decisões no código com if'
  ],
  conceitos: ['csharp.variaveis', 'csharp.tipos', 'csharp.condicoes'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Variável é uma caixa etiquetada',
      introduz: ['csharp.variaveis', 'csharp.tipos'],
      blocos: [
        { tipo: 'texto', texto: 'Uma **variável** guarda um valor com um nome para você usar depois. No C#, cada variável tem um **tipo**, que define que espécie de valor cabe nela.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'int estoque = 25;\ndecimal preco = 100.50m;\nstring nome = "Mouse";\nbool ativo = true;' },
        { tipo: 'tabela', titulo: 'Os tipos que você mais vai usar no backend', colunas: ['Tipo', 'Guarda', 'Exemplo'], linhas: [
          ['int', 'números inteiros', '25'],
          ['decimal', 'dinheiro (com centavos)', '100.50m'],
          ['string', 'texto', '"Mouse"'],
          ['bool', 'verdadeiro ou falso', 'true / false'],
          ['DateTime', 'data e hora', 'DateTime.Now']
        ], legenda: 'Os mesmos conceitos do banco (INT, DECIMAL, VARCHAR, BIT) têm um tipo correspondente em C#.' },
        { tipo: 'nota', tom: 'info', texto: 'Você também verá `var` no código. `var` não é "sem tipo": é o compilador descobrindo o tipo pelo valor. `var preco = 100.50m;` continua sendo decimal.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs01-a1',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada valor ao tipo mais adequado em C#.',
        pares: [
          ['"Notebook"', 'string'],
          ['42', 'int'],
          ['199.90m', 'decimal'],
          ['true', 'bool'],
          ['DateTime.Now', 'DateTime']
        ],
        dicas: ['Preço tem centavos: é decimal.', 'Verdadeiro/falso é bool.'],
        explicacao: 'Escolher o tipo certo evita erros de arredondamento e conversões desnecessárias.',
        conceitos: ['csharp.tipos']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Decidindo com if',
      introduz: ['csharp.condicoes'],
      blocos: [
        { tipo: 'texto', texto: 'Código de verdade toma decisões. O `if` (se) executa um bloco somente quando a condição é verdadeira:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'int estoque = 4;\n\nif (estoque < 10)\n{\n    Console.WriteLine("Estoque baixo");\n}' },
        { tipo: 'nota', tom: 'info', texto: '`Console.WriteLine` apenas escreve uma mensagem na tela para você enxergar o resultado. Não é preciso decorar: em APIs você raramente vai usá-lo.' },
        { tipo: 'glossario', titulo: 'Símbolos deste código', itens: [
          ['( )', 'parênteses', 'Envolvem a condição que o if vai avaliar.'],
          ['{ }', 'chaves', 'Delimitam o bloco de código que será executado quando a condição for verdadeira.']
        ] },
        { tipo: 'texto', texto: 'A condição `estoque < 10` é um `bool`: ou é verdadeira, ou é falsa. Os operadores são parecidos com SQL: `>`, `<`, `>=`, `<=`, `==` (igual) e `!=` (diferente).' },
        { tipo: 'nota', tom: 'atencao', texto: 'Em C#, igualdade é `==` (dois sinais). Em SQL é `=` (um sinal). Alternar entre os dois é um erro clássico — e você vai ver os dois no mesmo projeto.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs01-a2',
        tipo: 'predict-output',
        dimensao: 'reconhecimento',
        enunciado: 'O que este código escreve na tela?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'int estoque = 15;\nstring mensagem = "Estoque OK";\n\nif (estoque < 10)\n{\n    mensagem = "Estoque baixo";\n}\n\nConsole.WriteLine(mensagem);' }
        ],
        opcoes: ['Estoque OK', 'Estoque baixo', 'Nada é escrito', '15'],
        correta: 0,
        feedbackErro: {
          1: 'A condição `15 < 10` é falsa, então o bloco de dentro do if não roda. A mensagem original permanece.',
          2: 'Sempre há um WriteLine no final; algo será escrito.',
          3: 'O código escreve a variável mensagem, não o número.'
        },
        dicas: ['O if só executa quando a condição é verdadeira.', '15 é menor que 10?'],
        explicacao: 'Como `15 < 10` é falso, o bloco interno é ignorado e `mensagem` continua "Estoque OK".',
        conceitos: ['csharp.condicoes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs01-a3',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete o código para aplicar a regra: quando o estoque for menor que 5, avisar que precisa repor.',
        codigo: 'int estoque = 3;\n\nif (estoque {{1}} 5)\n{\n    Console.WriteLine("Precisa repor");\n}',
        lacunas: [['<']],
        dicas: ['"Menor que" em C# usa o mesmo sinal do SQL.', 'É um único caractere.'],
        explicacao: '`estoque < 5` é verdadeiro para 3, então a mensagem aparece.',
        conceitos: ['csharp.condicoes', 'csharp.variaveis']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs01-a4',
        tipo: 'write-code',
        dimensao: 'construcao',
        enunciado: 'Escreva um `if` que aplique 10% de desconto quando o preço for maior que 100. Use a variável `preco` e grave o resultado em `precoFinal`.',
        esqueleto: 'decimal preco = 150.00m;\ndecimal precoFinal = preco;\n\n// seu if aqui',
        validar: function (valor) {
          const t = P.dom.normalizarCodigo(valor).replace(/m/g, '');
          return t.indexOf('preco>100') !== -1 && t.indexOf('preco*0.9') !== -1;
        },
        respostasAceitas: ['if (preco > 100) { precoFinal = preco * 0.9m; }'],
        dicas: ['A condição é `preco > 100`.', '10% de desconto significa multiplicar por 0.9.'],
        explicacao: '`if (preco > 100) { precoFinal = preco * 0.9m; }` — a decisão fica no código, não na cabeça de quem usa.',
        conceitos: ['csharp.condicoes', 'csharp.variaveis']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs01-a5',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Um estagiário escreveu `decimal preco = 100;` e depois `preco = "cento e vinte";`. O projeto não compila.',
        enunciado: 'Qual é a explicação correta para o erro?',
        opcoes: [
          'A variável foi declarada como decimal e não aceita texto; o tipo precisa ser compatível com o valor',
          'Variáveis não podem mudar de valor depois de criadas',
          'O C# só aceita números inteiros',
          'Falta um ponto e vírgula no final da segunda linha'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Variáveis podem mudar de valor. O problema é o tipo do novo valor.',
          2: 'C# aceita decimais (decimal) e muitos outros tipos, não só inteiros.',
          3: 'O erro apontado é de tipo, não de pontuação.'
        },
        dicas: ['Lembre que cada variável tem um tipo definido.', 'Uma variável decimal aceita texto?'],
        explicacao: 'O tipo protege o programa: `decimal` só aceita números. Esse "não deixa passar" é uma vantagem, não um obstáculo.',
        conceitos: ['csharp.tipos', 'csharp.variaveis'],
        desafio: true
      }
    }
  ]
});
