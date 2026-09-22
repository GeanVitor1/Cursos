Plataforma.registrarLicao({
  id: 'sql-26',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'EXISTS e NOT EXISTS',
  subtitulo: 'Intermediário · Etapa 31',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Verificar existência de linhas com EXISTS',
    'Inverter a verificação com NOT EXISTS',
    'Escolher entre IN e EXISTS pelo que a pergunta pede'
  ],
  conceitos: ['sql.exists', 'sql.subquery', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Existe ou não existe',
      introduz: ['sql.exists'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.subquery', texto: 'Com `IN (subquery)` você filtra por uma lista de valores. Mas muitas perguntas são mais simples: "**existe** algum?"' },
        { tipo: 'texto', texto: 'O `EXISTS` (existe) devolve verdadeiro se a subquery retornar **pelo menos uma linha** — sem importar quais valores:' },
        { tipo: 'conceito', id: 'sql.exists', titulo: 'EXISTS', texto: 'Verifica se a subquery devolve ao menos uma linha. NOT EXISTS inverte: verdadeiro quando não há nenhuma.', exemplo: 'SELECT * FROM Clientes WHERE EXISTS (SELECT 1 FROM Pedidos WHERE Pedidos.ClienteId = Clientes.Id);' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Nome\nFROM Clientes\nWHERE EXISTS (SELECT 1 FROM Pedidos WHERE Pedidos.ClienteId = Clientes.Id);'
        },
        { tipo: 'nota', tom: 'info', texto: 'O `SELECT 1` é convenção: como só importa existir linha, seleciona-se uma constante barata.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql26-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que o `EXISTS` verifica?',
        opcoes: [
          'Se a subquery devolve pelo menos uma linha',
          'Se um valor está numa lista',
          'Se duas tabelas têm as mesmas colunas',
          'Se o resultado está ordenado'
        ],
        correta: 0,
        dicas: [
          'O nome já diz: existe.',
          'Valores específicos não importam aqui.'
        ],
        explicacao: '`EXISTS` pergunta pela existência de linhas; listas de valores são trabalho do `IN`.',
        conceitos: ['sql.exists']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'NOT EXISTS: os que faltam',
      blocos: [
        { tipo: 'texto', texto: 'O `NOT EXISTS` inverte a pergunta: traz as linhas **sem** par na subquery. É outra forma de achar "clientes que nunca compraram":' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Nome\nFROM Clientes\nWHERE NOT EXISTS (SELECT 1 FROM Pedidos WHERE Pedidos.ClienteId = Clientes.Id);'
        },
        { tipo: 'nota', tom: 'info', texto: 'Compare com o padrão `LEFT JOIN ... IS NULL`: mesmo resultado, dois caminhos. O `NOT EXISTS` costuma ler melhor a intenção.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql26-a2',
        tipo: 'predict-output',
        enunciado: 'Quem esta consulta retorna?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Clientes',
            colunas: ['Id', 'Nome'],
            linhas: [
              [1, 'Ana Souza'],
              [2, 'Bruno Lima']
            ]
          },
          {
            tipo: 'tabela',
            titulo: 'Pedidos',
            colunas: ['Id', 'ClienteId'],
            linhas: [
              [101, 1]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Nome\nFROM Clientes\nWHERE NOT EXISTS (SELECT 1 FROM Pedidos WHERE Pedidos.ClienteId = Clientes.Id);' }
        ],
        opcoes: [
          'Apenas Bruno Lima',
          'Apenas Ana Souza',
          'Ana Souza e Bruno Lima',
          'Nenhum cliente'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Ana tem pedido: para ela, o EXISTS é verdadeiro e o NOT a exclui.',
          2: 'Ana tem par na subquery.',
          3: 'Bruno não tem pedido: o NOT EXISTS o mantém.'
        },
        dicas: [
          'NOT EXISTS mantém quem não tem par.',
          'Quem tem pedido aqui?'
        ],
        explicacao: 'Só Bruno não tem pedido. O `NOT EXISTS` filtra exatamente os sem par.',
        conceitos: ['sql.exists']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql26-a3',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna o **nome dos clientes que têm pedido** usando EXISTS.',
        respostasAceitas: [
          'select nome from clientes where exists (select 1 from pedidos where pedidos.clienteid = clientes.id)'
        ],
        dicas: [
          'A subquery liga ClienteId ao Id.',
          'SELECT 1 basta na interna.'
        ],
        explicacao: 'Para cada cliente, o banco verifica se existe ao menos um pedido dele.',
        conceitos: ['sql.exists'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Exists',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras para a verificação: **exists** (existe) e **check** (verificar).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['exists', 'existe'],
            ['check', 'verificar']
          ]
        },
        { tipo: 'ingles', frase: 'Exists checks customers.', traducao: 'Existe verifica clientes.' },
        { tipo: 'nota', tom: 'info', texto: 'Leia como "verifique se existem clientes (com pedido)".' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql26-a4',
        tipo: 'write-code',
        enunciado: 'Exists checks customers: nomes de quem tem pedido.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select nome from clientes where exists (select 1 from pedidos where pedidos.clienteid = clientes.id)'
        ],
        dicas: [
          'EXISTS com a subquery de pedidos.',
          'Ligue as chaves no WHERE interno.'
        ],
        explicacao: 'A verificação de existência filtra os clientes com pedido.',
        conceitos: ['sql.exists', 'sql.ingles']
      }
    }
  ]
});
