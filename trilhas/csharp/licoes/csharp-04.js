Plataforma.registrarLicao({
  id: 'csharp-04',
  trilha: 'csharp',
  tipo: 'licao',
  titulo: 'Null: quando o valor não existe',
  subtitulo: 'C# · Etapa 4',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Entender o que null representa',
    'Reconhecer e evitar NullReferenceException',
    'Usar verificação e o operador ?. com segurança'
  ],
  conceitos: ['csharp.null', 'csharp.leitura', 'csharp.propriedades'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Null não é vazio, nem zero',
      introduz: ['csharp.null'],
      blocos: [
        { tipo: 'texto', texto: 'Todo cliente tem um telefone? Nem sempre. Como representar "ainda não informado" quando a coluna é de texto?' },
        { tipo: 'conceito', id: 'csharp.null', titulo: 'Null', texto: 'Ausência de valor: a variável existe, mas não aponta para nenhum objeto ou texto. É diferente de "" (texto vazio) e de 0 (número zero).', exemplo: 'Cliente cliente = null;' },
        { tipo: 'texto', texto: 'Em C#, `null` significa **ausência de valor**: a variável existe, mas não aponta para nenhum objeto ou texto. É diferente de `""` (texto vazio) e de `0` (número zero).' },
        { tipo: 'tabela', titulo: 'Três situações diferentes', colunas: ['Valor', 'Significa'], linhas: [
          ['""', 'Um texto que existe, mas está vazio'],
          ['0', 'Um número que existe e vale zero'],
          ['null', 'Nenhum valor: nada foi informado']
        ] },
        { tipo: 'nota', tom: 'info', texto: 'Bancos de dados têm o mesmo conceito (`NULL`). Quando as ferramentas de banco leem uma coluna vazia, elas trazem `null` para o C#.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'O erro mais famoso do .NET',
      introduz: ['csharp.excecoes'],
      blocos: [
        { tipo: 'texto', texto: 'Se você tentar acessar uma propriedade de algo que está `null`, o programa é interrompido por um erro. No C#, esse tipo de erro interrompe a execução e é chamado de **exceção**.' },
        { tipo: 'conceito', id: 'csharp.excecoes', titulo: 'Exceção', texto: 'Um erro que interrompe o programa quando algo inesperado acontece. Pode ser tratada depois com try/catch (você verá em uma próxima etapa).', exemplo: 'NullReferenceException' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'Cliente cliente = null;\n\n// Lança NullReferenceException\nConsole.WriteLine(cliente.Nome);' },
        { tipo: 'diagrama', arte: 'cliente ──► null\n              │\n   cliente.Nome ──► ✖ nada para acessar\n              ▼\n   NullReferenceException' },
        { tipo: 'nota', tom: 'atencao', texto: 'A mensagem do erro não diz onde o null nasceu — só onde ele apareceu. Por isso, ler os **detalhes do erro** é uma habilidade importante na **investigação de erro**.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs04-a1',
        tipo: 'find-error',
        dimensao: 'reconhecimento',
        enunciado: 'Este código apresenta erro em tempo de execução. Qual linha é a causa?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'Cliente cliente = null;\n\nif (cliente.Nome != null)\n{\n    Console.WriteLine("Tem nome");\n}' }
        ],
        opcoes: [
          'A linha `if (cliente.Nome != null)` — acessa `.Nome` quando `cliente` já é null',
          'A linha `Cliente cliente = null;` — null não existe em C#',
          'A linha `Console.WriteLine("Tem nome");` — falta um return',
          'Nenhuma: o código funciona porque o if protege'
        ],
        correta: 0,
        feedbackErro: {
          1: '`null` é um valor válido em C#. O problema é acessar algo a partir dele sem verificar.',
          2: 'WriteLine não é o problema aqui.',
          3: 'A verificação é feita tarde demais: primeiro acessa, depois checa.'
        },
        dicas: ['Leia da esquerda para a direita: o que é cliente antes do if?', 'Você pode verificar o Nome de algo que não existe?'],
        explicacao: 'Antes de acessar `cliente.Nome`, é preciso verificar `cliente != null`. O if correto verificaria o próprio cliente, não a propriedade.',
        conceitos: ['csharp.null']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Como se proteger',
      blocos: [
        { tipo: 'texto', texto: 'A verificação direta é a mais comum:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'if (cliente != null)\n{\n    Console.WriteLine(cliente.Nome);\n}' },
        { tipo: 'texto', texto: 'O operador `?.` (null-conditional) só acessa a propriedade se o objeto existir. Quando o objeto é null, o resultado também é null:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'string nome = cliente?.Nome;' },
        { tipo: 'texto', texto: 'E o `??` (null-coalescing) fornece um valor alternativo quando o resultado é null:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'string nome = cliente?.Nome ?? "Sem nome";' },
        { tipo: 'glossario', titulo: 'Dicionário do null', itens: [
          ['!= null', 'verificação', 'Só entra no bloco se houver objeto.'],
          ['?.', 'null-conditional', 'Acessa a propriedade apenas se o objeto existir.'],
          ['??', 'null-coalescing', 'Usa um valor alternativo quando o primeiro é null.'],
          ['?', 'tipo anulável', 'Em `string? Nome`, avisa que a propriedade pode ser null.']
        ] }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs04-a2',
        tipo: 'predict-output',
        dimensao: 'reconhecimento',
        enunciado: 'O que este código exibe?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'Cliente cliente = null;\nstring nome = cliente?.Nome ?? "Sem nome";\n\nConsole.WriteLine(nome);' }
        ],
        opcoes: ['Sem nome', 'NullReferenceException', 'null', 'Uma linha em branco'],
        correta: 0,
        feedbackErro: {
          1: 'O `?.` evita exatamente esse erro: sem objeto, o resultado é null em vez de exceção.',
          2: 'O `??` transforma o null em "Sem nome" antes de escrever.',
          3: 'Quando não há valor, o `??` fornece o texto alternativo.'
        },
        dicas: ['Comece pelo `?.`: cliente é null, então...', 'Depois o `??` entra em ação.'],
        explicacao: '`cliente?.Nome` resulta em null; o `?? "Sem nome"` troca o null pelo texto. Resultado: "Sem nome".',
        conceitos: ['csharp.null']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs04-a3',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete para exibir o nome do cliente apenas se o cliente existir.',
        codigo: 'if (cliente {{1}} null)\n{\n    Console.WriteLine(cliente.Nome);\n}',
        lacunas: [['!=']],
        dicas: ['Queremos entrar no bloco quando o cliente existe.', '"Diferente de" em C# é composto por dois caracteres.'],
        explicacao: '`cliente != null` é a verificação clássica: só acessa o objeto quando ele existe.',
        conceitos: ['csharp.null', 'csharp.condicoes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs04-a4',
        tipo: 'code-review',
        dimensao: 'aplicacao',
        enunciado: 'Você está revisando a alteração de um colega. Onde está o risco?',
        ticket: { numero: '#4821', titulo: 'Melhoria no relatório de clientes', corpo: 'Adicionada a exibição do telefone do cliente no relatório. Em produção (o ambiente real, onde os clientes usam o sistema), alguns relatórios quebraram com NullReferenceException.' },
        autor: 'colega de time',
        diff: [
          ' public string GerarLinha(Cliente cliente)',
          ' {',
          '+    return cliente.Nome + " - " + cliente.Telefone.Length;',
          ' }'
        ],
        opcoes: [
          '`cliente.Telefone` pode ser null e acessar `.Length` quebra; falta verificar ou usar `?.`',
          'O método deveria estar em outra classe',
          'Falta verificar se o telefone é vazio antes de usar',
          'O retorno deveria ser um número'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Mover o método para outra classe não evita acessar um valor null.',
          2: 'Verificar se o texto é vazio não protege contra um valor null; é preciso verificar a ausência ou usar `?.`.',
          3: 'O relatório exibe texto; o tipo está adequado.'
        },
        dicas: ['O ticket fala de NullReferenceException em produção.', 'Qual chamada acontece sem verificação?'],
        explicacao: 'Telefone é opcional (pode ser null). Acessar `.Length` (o tamanho do texto) direto quebra. A correção: `cliente.Telefone?.Length` ou verificação antes. Esse é um erro real de revisão de código.',
        conceitos: ['csharp.null'],
        desafio: true
      }
    }
  ]
});
