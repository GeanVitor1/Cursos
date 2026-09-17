Plataforma.registrarLicao({
  id: 'sql-10',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Textos com LIKE',
  subtitulo: 'Iniciante · Etapa 5',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Buscar por parte de um texto com LIKE',
    'Usar os coringas % e _ nos padrões',
    'Combinar LIKE com NOT'
  ],
  conceitos: ['sql.like', 'sql.texto-aspas', 'sql.not', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Procurando por parte do texto',
      introduz: ['sql.like'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.texto-aspas', texto: 'Você compara textos com `=` quando conhece o valor exato. Agora vai buscar por **parte** de um texto.' },
        { tipo: 'texto', texto: 'O `LIKE` (parecido com) compara a coluna com um **padrão**. O `%` representa qualquer quantidade de caracteres — inclusive nenhum:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: "SELECT Nome\nFROM Clientes\nWHERE Nome LIKE 'A%';",
          legenda: 'Nomes que começam com A.'
        },
        { tipo: 'conceito', id: 'sql.like', titulo: 'LIKE', texto: 'Compara texto por padrão. % representa qualquer quantidade de caracteres e _ um único caractere.', exemplo: "WHERE Nome LIKE 'A%'" },
        { tipo: 'nota', tom: 'info', texto: '`LIKE \'A%\'` começa com A. `LIKE \'%silva%\'` contém "silva" em qualquer posição. O padrão sempre vai entre aspas simples.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql10-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que o padrão `\'%silva%\'` encontra?',
        opcoes: [
          'Nomes que contêm "silva" em qualquer posição',
          'Apenas o nome exatamente igual a "silva"',
          'Nomes que começam com "silva"',
          'Nomes que terminam com "silva"'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Sem os %, o LIKE compararia o texto inteiro.',
          2: 'Com o % na frente, o texto pode ter qualquer coisa antes de "silva".',
          3: 'Com o % no final, o texto pode ter qualquer coisa depois de "silva".'
        },
        dicas: [
          'O % na frente libera qualquer texto antes.',
          'O % no final libera qualquer texto depois.'
        ],
        explicacao: 'Os dois `%` permitem qualquer coisa antes e depois: o resultado são os nomes que **contêm** "silva".',
        conceitos: ['sql.like']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Posições do coringa e o _',
      blocos: [
        { tipo: 'texto', texto: 'A posição do `%` muda a busca: no começo, no fim ou nos dois lados.' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: "SELECT Nome\nFROM Clientes\nWHERE Nome LIKE '%Souza';",
          legenda: 'Terminam com Souza.'
        },
        { tipo: 'texto', texto: 'Existe também o `_` (sublinhado): ele representa **um único caractere**, nem mais, nem menos.' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: "SELECT Nome\nFROM Clientes\nWHERE Nome LIKE 'A_a%';",
          legenda: 'Começam com A, têm um caractere qualquer e depois a.'
        },
        { tipo: 'nota', tom: 'atencao', texto: '`%` e `_` são coringas: eles não procuram esses símbolos no texto, e sim **qualquer** caractere.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql10-a2',
        tipo: 'predict-output',
        enunciado: 'Quais clientes esta consulta retorna?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Clientes',
            colunas: ['Nome'],
            linhas: [
              ['Ana Souza'],
              ['Bruno Lima'],
              ['Carla Souza'],
              ['Diego Souza Lima']
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: "SELECT Nome\nFROM Clientes\nWHERE Nome LIKE '%Souza';" }
        ],
        opcoes: [
          'Ana Souza e Carla Souza',
          'Carla Souza e Diego Souza Lima',
          'Apenas Ana Souza',
          'Todos os clientes'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Diego Souza Lima termina com "Lima", não com "Souza".',
          2: 'Bruno Lima não tem Souza no nome.',
          3: 'Carla Souza também termina com Souza.'
        },
        dicas: [
          'O padrão termina com Souza, sem % depois.',
          'Quem tem algo depois de "Souza" não entra.'
        ],
        explicacao: 'Com `%` apenas no início, o texto precisa **terminar** com "Souza". Diego termina com "Lima" e fica de fora.',
        conceitos: ['sql.like']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql10-a3',
        tipo: 'fill-code',
        enunciado: 'Complete para encontrar os clientes cujo nome **começa com Ana**.',
        codigo: "SELECT *\nFROM Clientes\nWHERE Nome {{1}} 'Ana%';",
        lacunas: [['like']],
        dicas: [
          'É o operador de comparação por padrão.',
          'Quatro letras.'
        ],
        explicacao: '`WHERE Nome LIKE \'Ana%\'` compara a coluna com o padrão que começa com Ana.',
        conceitos: ['sql.like', 'sql.texto-aspas']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql10-a4',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre o LIKE.',
        afirmacoes: [
          { texto: 'LIKE \'A%\' encontra qualquer texto que comece com A.', correta: true, explicacao: 'O % libera o resto do texto.' },
          { texto: 'O _ representa qualquer quantidade de caracteres.', correta: false, explicacao: 'O _ representa exatamente um caractere; quem representa vários é o %.' },
          { texto: 'O padrão do LIKE deve ficar entre aspas simples.', correta: true, explicacao: 'É texto, como qualquer outro valor de texto em SQL.' }
        ],
        dicas: [
          '% = qualquer quantidade; _ = um caractere.',
          'Padrão é texto: aspas simples.'
        ],
        explicacao: '`%` libera vários caracteres, `_` exige exatamente um, e o padrão é um texto entre aspas simples.',
        conceitos: ['sql.like', 'sql.texto-aspas']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql10-a5',
        tipo: 'write-code',
        enunciado: 'Escreva uma consulta que retorne os clientes cujo nome **contém "silva"**.',
        respostasAceitas: [
          "select * from clientes where nome like '%silva%'"
        ],
        dicas: [
          'Contém = % dos dois lados.',
          'O padrão fica entre aspas simples.'
        ],
        explicacao: '`SELECT * FROM Clientes WHERE Nome LIKE \'%silva%\';` — qualquer coisa antes e depois de "silva".',
        conceitos: ['sql.like']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Excluindo padrões com NOT LIKE',
      blocos: [
        { tipo: 'texto', texto: 'Como no `NOT IN`, o `NOT` também funciona com padrões. `NOT LIKE` exclui quem casa com o padrão:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: "SELECT Nome\nFROM Clientes\nWHERE Nome NOT LIKE 'A%';",
          legenda: 'Nomes que não começam com A.'
        },
        { tipo: 'trabalho', texto: 'Uma busca de CRM costuma oferecer "começa com", "contém" e "termina com". Por baixo, as três viram padrões de `LIKE` com o `%` em posições diferentes.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql10-a6',
        tipo: 'write-code',
        enunciado: 'Escreva uma consulta que retorne os clientes cujo nome **termina com "Lima"**.',
        respostasAceitas: [
          "select * from clientes where nome like '%lima'"
        ],
        dicas: [
          'Termina com = % apenas no início do padrão.',
          'Aspas simples em volta de tudo.'
        ],
        explicacao: '`SELECT * FROM Clientes WHERE Nome LIKE \'%Lima\';` — qualquer coisa antes, mas "Lima" no final.',
        conceitos: ['sql.like'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Starts with',
      blocos: [
        { tipo: 'texto', texto: 'Para descrever o início de um texto em inglês: **starts with** (começa com).' },
        {
          tipo: 'vocab',
          titulo: 'Termo novo (1)',
          pares: [
            ['starts with', 'começa com']
          ]
        },
        { tipo: 'ingles', frase: 'The name starts with A.', traducao: 'O nome começa com A.' },
        { tipo: 'nota', tom: 'info', texto: '**starts with A** = "começa com A" — exatamente a ideia de `LIKE \'A%\'`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql10-a7',
        tipo: 'write-code',
        enunciado: 'Retrieve all customers where the name starts with A.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          "select * from clientes where nome like 'a%'"
        ],
        dicas: [
          'starts with A = começa com A.',
          'Use LIKE com o padrão A%.'
        ],
        explicacao: 'Traduzindo: "retrieve all customers where the name starts with A" = recupere todos os clientes cujo nome começa com A. `SELECT * FROM Clientes WHERE Nome LIKE \'A%\';`.',
        conceitos: ['sql.like', 'sql.ingles']
      }
    }
  ]
});
