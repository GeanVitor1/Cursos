Plataforma.registrarLicao({
  id: 'sql-14',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'INNER JOIN na prática',
  subtitulo: 'Relacionamentos · Etapa 17',
  duracaoMin: 60,
  xp: 30,
  objetivos: [
    'Entender que o JOIN padrão só traz combinações que existem dos dois lados',
    'Escrever INNER JOIN com ON',
    'Combinar JOIN com WHERE'
  ],
  conceitos: ['sql.inner-join', 'sql.join', 'sql.where', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Só entra quem combina dos dois lados',
      introduz: ['sql.inner-join'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.join', texto: 'Você junta tabelas com `JOIN ... ON`. O que ninguém contou ainda: existe mais de um tipo de junção.' },
        { tipo: 'texto', texto: 'O `JOIN` que você já usa tem um nome completo: `INNER JOIN` (junção interna). Ele só devolve as linhas que **combinam dos dois lados**:' },
        { tipo: 'conceito', id: 'sql.inner-join', titulo: 'INNER JOIN', texto: 'Devolve apenas as linhas que têm par dos dois lados da condição do ON.', exemplo: 'SELECT * FROM Pedidos INNER JOIN Clientes ON Pedidos.ClienteId = Clientes.Id;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Clientes.Nome, Pedidos.ValorTotal\nFROM Clientes\nINNER JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;'
        },
        { tipo: 'nota', tom: 'info', texto: '`JOIN` sozinho é apelido de `INNER JOIN`. Escrever `INNER` deixa a intenção explícita — prefira assim em código que outros vão ler.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql14-a1',
        tipo: 'predict-output',
        enunciado: 'Quem aparece no resultado?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Clientes',
            colunas: ['Id', 'Nome'],
            linhas: [
              [1, 'Ana Souza'],
              [2, 'Bruno Lima'],
              [3, 'Carla Dias']
            ]
          },
          {
            tipo: 'tabela',
            titulo: 'Pedidos',
            colunas: ['Id', 'ClienteId'],
            linhas: [
              [101, 1],
              [102, 1]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Clientes.Nome\nFROM Clientes\nINNER JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;' }
        ],
        opcoes: [
          'Ana Souza (duas vezes)',
          'Ana Souza, Bruno Lima e Carla Dias',
          'Ana Souza e Bruno Lima',
          'Nenhum cliente'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Bruno e Carla não têm pedido: o INNER JOIN os deixa de fora.',
          2: 'Bruno não tem pedido, então não combina.',
          3: 'Ana tem dois pedidos e combina duas vezes.'
        },
        dicas: [
          'Só entra quem combina dos dois lados.',
          'Quem não tem pedido fica de fora.'
        ],
        explicacao: 'Só Ana tem pedidos (dois). O `INNER JOIN` devolve Ana duas vezes — uma por pedido — e ignora Bruno e Carla.',
        conceitos: ['sql.inner-join']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'JOIN com WHERE',
      blocos: [
        { tipo: 'texto', texto: 'A junção monta as linhas combinadas; o `WHERE` filtra o resultado montado. A ordem na consulta é sempre essa:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Clientes.Nome, Pedidos.ValorTotal\nFROM Clientes\nINNER JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id\nWHERE Pedidos.ValorTotal > 100;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Primeiro o banco junta (`JOIN ... ON`), depois filtra (`WHERE`). Com duas tabelas, prefixe as colunas (`Pedidos.ValorTotal`) para não haver dúvida.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql14-a2',
        tipo: 'fill-code',
        enunciado: 'Complete para trazer o nome dos clientes junto de cada pedido.',
        codigo: 'SELECT Clientes.Nome, Pedidos.ValorTotal\nFROM Clientes\n{{1}} JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;',
        lacunas: [['inner']],
        dicas: [
          'É o tipo de JOIN que só traz combinações dos dois lados.',
          'Cinco letras.'
        ],
        explicacao: '`INNER JOIN` deixa explícito que só entram linhas com par dos dois lados.',
        conceitos: ['sql.inner-join']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql14-a3',
        tipo: 'multiple-choice',
        enunciado: 'Um cliente sem nenhum pedido aparece no resultado de um `INNER JOIN` entre Clientes e Pedidos?',
        opcoes: [
          'Não, porque ele não combina com nenhuma linha de Pedidos',
          'Sim, com os valores do pedido em branco',
          'Sim, mas só uma vez',
          'Sim, repetido para cada pedido da tabela'
        ],
        correta: 0,
        dicas: [
          'INNER só traz par combinado.',
          'Sem pedido, não há par.'
        ],
        explicacao: 'Sem par do outro lado, a linha some do resultado. É exatamente esse comportamento que as próximas lições vão contornar.',
        conceitos: ['sql.inner-join']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql14-a4',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna o **nome do cliente e o valor** dos pedidos acima de 100.',
        respostasAceitas: [
          'select clientes.nome, pedidos.valortotal from clientes inner join pedidos on pedidos.clienteid = clientes.id where pedidos.valortotal > 100',
          'select clientes.nome, pedidos.valortotal from pedidos inner join clientes on pedidos.clienteid = clientes.id where pedidos.valortotal > 100'
        ],
        dicas: [
          'Junte as tabelas pelo ON e filtre pelo WHERE.',
          'Prefixe ValorTotal com a tabela.'
        ],
        explicacao: '`SELECT Clientes.Nome, Pedidos.ValorTotal FROM Clientes INNER JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id WHERE Pedidos.ValorTotal > 100;`.',
        conceitos: ['sql.inner-join', 'sql.where']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Inner e outer',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras para os lados da junção: **inner** (interno) e **outer** (externo).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['inner', 'interno'],
            ['outer', 'externo']
          ]
        },
        { tipo: 'ingles', frase: 'Inner and outer join.', traducao: 'Junção interna e externa.' },
        { tipo: 'nota', tom: 'info', texto: '**inner join** = "junção interna". O `OUTER` aparece nos próximos tipos de `JOIN`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql14-a5',
        tipo: 'write-code',
        enunciado: 'Inner join de Clientes com Pedidos, trazendo Nome e ValorTotal.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select clientes.nome, pedidos.valortotal from clientes inner join pedidos on pedidos.clienteid = clientes.id'
        ],
        dicas: [
          'INNER JOIN com ON ligando ClienteId ao Id.',
          'Liste Nome e ValorTotal.'
        ],
        explicacao: '`SELECT Clientes.Nome, Pedidos.ValorTotal FROM Clientes INNER JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;`.',
        conceitos: ['sql.inner-join', 'sql.ingles']
      }
    }
  ]
});
