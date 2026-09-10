Plataforma.registrarLicao({
  id: 'csharp-08',
  trilha: 'csharp',
  tipo: 'licao',
  titulo: 'Exceções: quando algo dá errado',
  subtitulo: 'C# · Etapa 8',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Entender o que é uma exceção e quando ela acontece',
    'Usar try/catch para tratar falhas esperadas',
    'Reconhecer tratamentos que escondem problemas'
  ],
  conceitos: ['csharp.excecoes', 'csharp.leitura', 'csharp.null'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Falhas acontecem',
      introduz: ['csharp.excecoes'],
      blocos: [
        { tipo: 'texto', texto: 'Um arquivo pode não existir. Uma conversão de texto para número pode receber "abc". Um serviço externo pode estar fora do ar. Quando o C# não consegue continuar, ele **lança uma exceção**.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'int numero = int.Parse("abc");\n// FormatException: "abc" não é um número' },
        { tipo: 'glossario', titulo: 'Decifrando o código', itens: [
          ['int.Parse(texto)', 'converter para número', 'Tenta transformar um texto em número inteiro; se não conseguir, lança uma exceção.'],
          ['FormatException', 'formato inválido', 'A exceção lançada quando o texto não está no formato esperado.'],
          ['lançar exceção', 'interromper com erro', 'O programa para aquele fluxo e sinaliza que algo deu errado.']
        ] },
        { tipo: 'diagrama', arte: 'Código normal\n     │  erro inesperado\n     ▼\nExceção lançada\n     │  sobe a pilha de chamadas\n     ▼\nAplicação encerra com erro (se ninguém tratar)' },
        { tipo: 'nota', tom: 'info', texto: 'A `NullReferenceException` que você já viu é um tipo de exceção. O mecanismo é o mesmo para todas.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Tratando com try/catch',
      blocos: [
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'try\n{\n    int numero = int.Parse(textoDigitado);\n    Console.WriteLine(numero);\n}\ncatch (FormatException)\n{\n    Console.WriteLine("Digite apenas números.");\n}' },
        { tipo: 'lista', itens: [
          '`try`: tenta executar o bloco.',
          '`catch`: captura a exceção e decide o que fazer.',
          'O catch declara **qual tipo** de exceção ele trata — o ideal é ser específico.'
        ] },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'catch (Exception)\n{\n    // não faça isso: engole qualquer erro\n}' },
        { tipo: 'destaque', texto: 'Capturar tudo e não fazer nada é pior do que não tratar: o erro desaparece da tela e reaparece como bug misterioso em produção.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs08-a1',
        tipo: 'predict-output',
        dimensao: 'reconhecimento',
        enunciado: 'O que este código exibe?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'try\n{\n    int numero = int.Parse("42");\n    Console.WriteLine(numero + 1);\n}\ncatch (FormatException)\n{\n    Console.WriteLine("Valor inválido");\n}' }
        ],
        opcoes: ['43', 'Valor inválido', '42', 'Nada'],
        correta: 0,
        feedbackErro: {
          1: '"42" é um número válido: não há exceção para capturar.',
          2: 'O valor é impresso após somar 1.',
          3: 'O WriteLine dentro do try sempre roda quando não há erro.'
        },
        dicas: ['"42" consegue virar número inteiro?', 'Sem exceção, o catch não é executado.'],
        explicacao: 'A conversão funciona, o `catch` é ignorado e o programa escreve 43.',
        conceitos: ['csharp.excecoes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs08-a2',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete para tratar a conversão inválida de um preço recebido como texto.',
        codigo: '{{1}}\n{\n    decimal preco = decimal.Parse(texto);\n    Console.WriteLine(preco);\n}\n{{2}} (FormatException)\n{\n    Console.WriteLine("Preço inválido");\n}',
        lacunas: [['try'], ['catch']],
        dicas: ['O bloco que tenta executar vem primeiro.', 'O bloco que captura a falha vem depois.'],
        explicacao: '`try` tenta, `catch` captura. Estrutura básica de tratamento de erro em qualquer aplicação .NET.',
        conceitos: ['csharp.excecoes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs08-a3',
        tipo: 'code-review',
        dimensao: 'aplicacao',
        enunciado: 'O time recebeu tickets de "preço errado" que ninguém consegue explicar. Encontre o problema na revisão.',
        ticket: { numero: '#5390', titulo: 'Preços gravados como zero', corpo: 'Alguns pedidos foram salvos com preço 0. O time não encontra erro nos logs.' },
        autor: 'colega de time',
        diff: [
          '+ public decimal LerPreco(string texto)',
          '+ {',
          '+     try',
          '+     {',
          '+         return decimal.Parse(texto);',
          '+     }',
          '+     catch (Exception)',
          '+     {',
          '+         return 0;',
          '+     }',
          '+ }'
        ],
        opcoes: [
          'O catch engole qualquer erro e devolve 0, escondendo a causa; o correto é tratar o erro ou deixá-lo subir com registro',
          'O return deveria ser 1',
          'O método deveria ser void',
          'O try não pode conter um return'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Trocar 0 por 1 só muda o valor errado, não resolve a causa.',
          2: 'Um método de leitura precisa devolver o preço; void pioraria.',
          3: 'É permitido retornar dentro do try.'
        },
        dicas: ['O log não mostra erro nenhum. Por quê?', 'Onde o erro está sendo silenciado?'],
        explicacao: 'Catch genérico devolvendo 0 transforma um erro visível em um dado incorreto e silencioso. A correção é registrar o erro (log) e devolver falha para quem chamou, ou tratar apenas FormatException.',
        conceitos: ['csharp.excecoes'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs08-a4',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada parte ao seu papel no tratamento de erro.',
        pares: [
          ['try', 'Bloco que tenta executar'],
          ['catch', 'Captura a exceção lançada'],
          ['throw', 'Lança uma exceção'],
          ['finally', 'Executa sempre, com ou sem erro']
        ],
        dicas: ['"finally" = finalmente, sempre acontece.', 'throw é a ação de lançar.'],
        explicacao: 'Entender essas quatro palavras é suficiente para ler a maioria dos tratamentos de erro em projetos .NET.',
        conceitos: ['csharp.excecoes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs08-a5',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Uma aplicação precisa registrar um pedido. O banco pode ficar indisponível por alguns segundos durante a operação. Se falhar, o cliente precisa saber e o time precisa ser avisado pelo log.',
        enunciado: 'Qual conduta é a mais profissional?',
        opcoes: [
          'Tratar a falha, registrar no log com detalhes e devolver um erro claro para quem chamou',
          'Ignorar a falha e devolver sucesso',
          'Devolver valores zerados para a operação continuar',
          'Descobrir a causa olhando o banco manualmente depois'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Devolver sucesso quando nada foi salvo engana o cliente e cria retrabalho.',
          2: 'Dados zerados corrompem o sistema e escondem a causa.',
          3: 'Log estruturado existe exatamente para isso: investigar sem adivinhação.'
        },
        dicas: ['Pense no cliente e no time de suporte.', 'O erro precisa ser visível e registrado.'],
        explicacao: 'Profissionalmente, erro tratado = mensagem clara + registro + sem corrupção de dados. É o que você vai implementar na trilha de ASP.NET.',
        conceitos: ['csharp.excecoes'],
        desafio: true
      }
    }
  ]
});
