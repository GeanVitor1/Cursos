Plataforma.registrarLicao({
  id: 'csharp-02',
  trilha: 'csharp',
  tipo: 'licao',
  titulo: 'Métodos: ações com entrada e saída',
  subtitulo: 'C# · Etapa 2',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Entender por que métodos existem',
    'Ler a assinatura de um método: nome, parâmetros e retorno',
    'Escrever um método pequeno que recebe valores e devolve um resultado'
  ],
  conceitos: ['csharp.metodos', 'csharp.leitura', 'csharp.variaveis'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O problema: a mesma conta em vários lugares',
      blocos: [
        { tipo: 'texto', texto: 'Suponha que o cálculo do total de um item apareça em três lugares diferentes: no carrinho, no resumo do pedido e no e-mail de confirmação.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: '// No carrinho\ndecimal total1 = preco1 * quantidade1;\n\n// No resumo do pedido\ndecimal total2 = preco2 * quantidade2;\n\n// No e-mail\ndecimal total3 = preco3 * quantidade3;' },
        { tipo: 'texto', texto: 'Se a regra mudar (por exemplo, incluir imposto), você precisa lembrar de alterar **todos** os lugares. Um esquecimento vira bug de cobrança.' },
        { tipo: 'destaque', texto: 'Um **método** dá nome a uma ação. A regra passa a viver em um lugar só, e todos chamam aquele lugar.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Método: uma ação com nome',
      introduz: ['csharp.metodos'],
      blocos: [
        { tipo: 'texto', texto: 'Um **método** dá nome a uma ação. A regra passa a viver em um lugar só, e todos chamam pelo nome.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'public decimal CalcularTotal(decimal preco, int quantidade)\n{\n    decimal total = preco * quantidade;\n    return total;\n}' },
        { tipo: 'glossario', titulo: 'O começo da assinatura', itens: [
          ['método', 'ação', 'Bloco de código com nome que executa uma tarefa.'],
          ['CalcularTotal', 'nome da ação', 'É por esse nome que o método é chamado.']
        ] },
        { tipo: 'nota', tom: 'info', texto: 'Nas próximas telas você vai destrinchar as **entradas** (parâmetros) e a **saída** (retorno) desse mesmo código, uma parte por vez.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Parâmetros: as entradas',
      blocos: [
        { tipo: 'texto', texto: 'Entre parênteses vêm as entradas do método: os valores que ele precisa receber para trabalhar. Cada entrada é um **parâmetro** com tipo e nome.' },
        { tipo: 'diagrama', arte: 'public decimal CalcularTotal(decimal preco, int quantidade)\n  │       │            │                    │\n  │       │            │                    └─ parâmetros (entradas)\n  │       │            └─ nome da ação\n  │       └─ tipo do retorno (o que devolve)\n  └─ quem pode usar' },
        { tipo: 'glossario', titulo: 'Entradas', itens: [
          ['parâmetro', 'entrada', 'Valor que o método precisa receber para trabalhar.'],
          ['preco / quantidade', 'parâmetros', 'Cada parâmetro tem tipo e nome: `decimal preco`, `int quantidade`.']
        ] }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Retorno: a saída',
      blocos: [
        { tipo: 'texto', texto: 'O método devolve um resultado ao final — esse resultado é o **retorno**. A palavra `return` entrega o valor para quem chamou.' },
        { tipo: 'glossario', titulo: 'Saída', itens: [
          ['retorno', 'saída', 'Resultado que o método devolve para quem chamou.'],
          ['return', 'devolve o resultado', 'Palavra-chave que entrega o valor do método.'],
          ['void', 'não devolve nada', 'Usado quando o método executa algo, mas não devolve valor.']
        ] },
        { tipo: 'texto', texto: 'Quando o método não devolve nada, usamos `void` no lugar do tipo de retorno. É o caso de ações como enviar um e-mail.' },
        { tipo: 'texto', texto: 'Chamamos o método assim: `decimal total = CalcularTotal(100.00m, 3);` — o resultado (300.00) é devolvido e guardado em `total`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs02-a1',
        tipo: 'interpret-code',
        dimensao: 'reconhecimento',
        enunciado: 'O que este método faz?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'public bool EstaComEstoqueBaixo(int estoque)\n{\n    return estoque < 10;\n}' }
        ],
        opcoes: [
          'Devolve verdadeiro quando o estoque é menor que 10 e falso quando não é',
          'Altera o estoque para 10',
          'Soma 10 ao estoque',
          'Escreve uma mensagem na tela'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O método não grava nada: ele só devolve uma resposta (bool).',
          2: 'Não há soma no código; compare com o operador `<`.',
          3: 'Não existe Console.WriteLine; o retorno é o valor da comparação.'
        },
        dicas: ['O tipo de retorno é bool (verdadeiro/falso).', 'A expressão `estoque < 10` já é uma comparação.'],
        explicacao: 'Métodos que começam com "Esta" ou "Tem" normalmente devolvem bool. Aqui, a pergunta "está com estoque baixo?" vira código reutilizável.',
        conceitos: ['csharp.metodos', 'csharp.condicoes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs02-a2',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete o método para que ele devolva o total (preço × quantidade).',
        codigo: 'public decimal CalcularTotal(decimal preco, int quantidade)\n{\n    decimal total = preco * quantidade;\n    {{1}} total;\n}',
        lacunas: [['return']],
        dicas: ['A palavra que devolve um valor de dentro do método.', 'É a mesma palavra que aparece em `return estoque < 10;`.'],
        explicacao: 'Sem `return`, o método não entrega o resultado para quem chamou. O compilador reclama disso.',
        conceitos: ['csharp.metodos']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs02-a3',
        tipo: 'write-code',
        dimensao: 'construcao',
        enunciado: 'Escreva o método `CalcularTotal` recebendo `decimal preco` e `int quantidade`, devolvendo o total.',
        esqueleto: 'public decimal CalcularTotal(decimal preco, int quantidade)\n{\n    // seu código aqui\n}',
        validar: function (valor) {
          const t = P.dom.normalizarCodigo(valor);
          return t.indexOf('preco*quantidade') !== -1 &&
            /return\(?(preco\*quantidade|total)\)?/.test(t);
        },
        respostasAceitas: ['public decimal CalcularTotal(decimal preco, int quantidade) { return preco * quantidade; }'],
        dicas: ['A assinatura já está no esqueleto; falta o corpo.', 'O corpo pode ser uma única linha: `return preco * quantidade;`'],
        explicacao: 'Métodos pequenos e com uma responsabilidade clara são a base do código que outros conseguem ler. Esse é o caminho até os métodos de uma aplicação real.',
        conceitos: ['csharp.metodos']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs02-a4',
        tipo: 'predict-output',
        dimensao: 'reconhecimento',
        enunciado: 'O que aparece na tela?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'public int Dobrar(int valor)\n{\n    return valor * 2;\n}\n\nint resultado = Dobrar(7);\nConsole.WriteLine(resultado);' }
        ],
        opcoes: ['14', '7', '2', 'Nada'],
        correta: 0,
        feedbackErro: {
          1: 'O método devolve o valor dobrado, então 7 vira algo maior.',
          2: 'O 2 é o multiplicador, não o resultado.',
          3: 'Há um WriteLine, algo é exibido.'
        },
        dicas: ['Substitua valor por 7 na conta.', '7 × 2 = ?'],
        explicacao: 'A chamada `Dobrar(7)` devolve 14, que é guardado em `resultado` e impresso.',
        conceitos: ['csharp.metodos']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs02-a5',
        tipo: 'explain',
        dimensao: 'construcao',
        enunciado: 'Explique com suas palavras.',
        pergunta: 'Por que vale a pena extrair uma conta repetida para um método, em vez de copiá-la em cada lugar?',
        criterios: [
          'Citar que a regra fica em um único lugar',
          'Citar que mudanças futuras ficam mais seguras',
          'Citar legibilidade ou reaproveitamento'
        ],
        palavrasChave: ['um lugar', 'unico', 'mud', 'alter', 'reutiliz', 'reaproveit', 'legiv', 'repet', 'duplic'],
        exemplo: 'Porque a regra fica em um único lugar: se ela mudar, altero o método e todos os usos passam a ter o comportamento correto. Isso evita repetir e duplicar a regra, deixa o código mais legível e permite reaproveitar a lógica.',
        dicas: ['Pense no dia em que a regra mudar.', 'Pense em quem vai ler o código depois.'],
        explicacao: 'Centralizar a regra em um lugar é uma das primeiras boas práticas que você vai usar no trabalho: elimina duplicação e reduz o risco de bugs.',
        conceitos: ['csharp.metodos']
      }
    }
  ]
});
