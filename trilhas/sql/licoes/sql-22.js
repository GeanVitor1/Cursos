Plataforma.registrarLicao({
  id: 'sql-22',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Subqueries',
  subtitulo: 'Intermediário · Etapa 27',
  duracaoMin: 50,
  xp: 30,
  objetivos: [
    'Usar uma consulta dentro de outra com subquery',
    'Filtrar com IN e uma lista vinda do banco',
    'Comparar com valores calculados por subquery'
  ],
  conceitos: ['sql.subquery', 'sql.in', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Consulta dentro de consulta',
      introduz: ['sql.subquery'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.in', texto: 'Você compara com listas fixas usando `IN`. Mas e se a lista estiver **dentro do próprio banco**?' },
        { tipo: 'texto', texto: 'Uma **subquery** (subconsulta) é um `SELECT` dentro de outro, entre parênteses. O banco roda a de dentro primeiro e usa o resultado na de fora:' },
        { tipo: 'conceito', id: 'sql.subquery', titulo: 'Subquery', texto: 'Consulta dentro de outra, entre parênteses. A interna roda primeiro e entrega valores para a externa.', exemplo: 'SELECT * FROM Clientes WHERE Id IN (SELECT ClienteId FROM Pedidos);' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Nome\nFROM Clientes\nWHERE Id IN (SELECT ClienteId FROM Pedidos);'
        },
        { tipo: 'nota', tom: 'info', texto: 'Leia de dentro para fora: primeiro os ClienteIds com pedido, depois os nomes desses clientes.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql22-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que a subquery `(SELECT ClienteId FROM Pedidos)` entrega para a consulta externa?',
        opcoes: [
          'A lista de ClienteIds que têm pedido',
          'Os nomes dos clientes',
          'A quantidade de pedidos',
          'A tabela Pedidos inteira'
        ],
        correta: 0,
        dicas: [
          'Ela seleciona uma coluna só.',
          'A externa usa essa lista no IN.'
        ],
        explicacao: 'A interna devolve a lista de ClienteIds; a externa filtra os clientes dessa lista.',
        conceitos: ['sql.subquery', 'sql.in']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Subquery que devolve um valor',
      blocos: [
        { tipo: 'texto', texto: 'Quando a interna devolve **um único valor**, a externa pode comparar com operador comum:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Nome, Preco\nFROM Produtos\nWHERE Preco > (SELECT AVG(Preco) FROM Produtos);'
        },
        { tipo: 'nota', tom: 'info', texto: '"Acima da média": a interna calcula a média; a externa filtra quem passa dela. O parêntese é obrigatório.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql22-a2',
        tipo: 'predict-output',
        enunciado: 'Quais produtos esta consulta retorna?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Produtos',
            colunas: ['Nome', 'Preco'],
            linhas: [
              ['Mouse', 100.0],
              ['Teclado', 200.0],
              ['Monitor', 300.0]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Nome\nFROM Produtos\nWHERE Preco > (SELECT AVG(Preco) FROM Produtos);' }
        ],
        opcoes: [
          'Teclado e Monitor',
          'Apenas Monitor',
          'Mouse e Teclado',
          'Todos os produtos'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A média é 200; Teclado (200) não é maior que 200.',
          2: 'Compare com a média, não com o máximo.',
          3: 'Mouse (100) está abaixo da média.'
        },
        dicas: [
          'Calcule a média primeiro: (100 + 200 + 300) / 3.',
          'Maior que a média, estritamente.'
        ],
        explicacao: 'A média é 200. Teclado e Monitor passam; Mouse fica de fora.',
        conceitos: ['sql.subquery', 'sql.agregacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql22-a3',
        tipo: 'fill-code',
        enunciado: 'Complete para trazer clientes que têm pedido.',
        codigo: 'SELECT Nome\nFROM Clientes\nWHERE Id {{1}} (SELECT ClienteId FROM Pedidos);',
        lacunas: [['in']],
        dicas: [
          'A subquery devolve uma lista.',
          'Lista pede IN.'
        ],
        explicacao: '`WHERE Id IN (...)` filtra pelos valores que a interna devolve.',
        conceitos: ['sql.subquery', 'sql.in']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql22-a4',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna o **nome dos produtos acima da média de preço**.',
        respostasAceitas: [
          'select nome from produtos where preco > (select avg(preco) from produtos)'
        ],
        dicas: [
          'A interna calcula AVG(Preco).',
          'A externa compara com >.'
        ],
        explicacao: 'Interna calcula a média; externa filtra quem passa dela.',
        conceitos: ['sql.subquery', 'sql.agregacao'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Subquery',
      blocos: [
        { tipo: 'texto', texto: 'Uma palavra nova para consultas aninhadas: **subquery** (subconsulta).' },
        {
          tipo: 'vocab',
          titulo: 'Palavra nova (1)',
          pares: [
            ['subquery', 'subconsulta']
          ]
        },
        { tipo: 'ingles', frase: 'Query with subquery.', traducao: 'Consulta com subconsulta.' },
        { tipo: 'nota', tom: 'info', texto: '**queries with subqueries** = "consultas com subconsultas".' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql22-a5',
        tipo: 'write-code',
        enunciado: 'Queries with subqueries: nomes dos clientes com pedido.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          "SELECT Nome FROM Clientes WHERE Id IN (SELECT ClienteId FROM Pedidos);"
        ],
        dicas: [
          'A interna lista ClienteId.',
          'A externa filtra com IN.'
        ],
        explicacao: '`SELECT Nome FROM Clientes WHERE Id IN (SELECT ClienteId FROM Pedidos);`.',
        conceitos: ['sql.subquery', 'sql.ingles']
      }
    }
  ]
});
