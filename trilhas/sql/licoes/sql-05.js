Plataforma.registrarLicao({
  id: 'sql-05',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'IN, BETWEEN e NOT',
  subtitulo: 'Fundamentos · Etapa 5',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Usar IN para comparar com uma lista de valores',
    'Usar BETWEEN para intervalos',
    'Usar NOT para inverter condições'
  ],
  conceitos: ['sql.in', 'sql.between', 'sql.not', 'sql.and-or', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Três operadores que você vai usar muito',
      introduz: ['sql.in', 'sql.between', 'sql.not'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.and-or', texto: 'Você já combina condições com `AND` e `OR`. Agora conheça três atalhos que deixam as consultas mais curtas e legíveis.' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: '-- IN: valor dentro de uma lista\nWHERE Cidade IN (\'Curitiba\', \'Recife\');\n\n-- BETWEEN: dentro de um intervalo (inclui os extremos)\nWHERE Preco BETWEEN 100 AND 500;\n\n-- NOT: inverte a condição\nWHERE Status NOT IN (\'Cancelado\', \'Estornado\');'
        },
        {
          tipo: 'lista',
          itens: [
            '`IN` substitui vários OR encadeados.',
            '`BETWEEN a AND b` equivale a `>= a AND <= b`.',
            '`NOT` inverte qualquer condição: `NOT IN`, `NOT LIKE`, `NOT EXISTS`.'
          ]
        },
        { tipo: 'nota', tom: 'info', texto: '`BETWEEN` **inclui** os dois extremos. `Preco BETWEEN 100 AND 500` traz também os produtos de exatamente 100 e de exatamente 500.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql05-a1',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada operador ao seu uso.',
        pares: [
          ['IN', 'Lista de valores possíveis'],
          ['BETWEEN', 'Intervalo entre dois valores'],
          ['NOT', 'Inverte a condição'],
          ['AND', 'Todas as condições verdadeiras'],
          ['OR', 'Pelo menos uma condição verdadeira']
        ],
        dicas: [
          'IN lembra "está dentro de".',
          'BETWEEN lembra "entre".'
        ],
        explicacao: 'Com esse kit você cobre a maioria das condições do dia a dia. O resto é combinação.',
        conceitos: ['sql.in', 'sql.between', 'sql.not', 'sql.and-or']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql05-a2',
        tipo: 'fill-code',
        enunciado: 'Complete para buscar clientes de Curitiba **ou** do Recife sem repetir a coluna Cidade.',
        codigo: 'SELECT *\nFROM Clientes\nWHERE Cidade {{1}} (\'Curitiba\', \'Recife\');',
        lacunas: [['in']],
        dicas: [
          'Existe um operador feito exatamente para listas.',
          'Tem duas letras.'
        ],
        explicacao: '`Cidade IN (\'Curitiba\', \'Recife\')` é equivalente a `Cidade = \'Curitiba\' OR Cidade = \'Recife\'`, porém mais legível.',
        conceitos: ['sql.in']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql05-a3',
        tipo: 'predict-output',
        enunciado: 'Quais produtos esta consulta retorna?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Produtos',
            colunas: ['Id', 'Nome', 'Preco'],
            linhas: [
              [1, 'Mouse', 99.0],
              [2, 'Teclado', 100.0],
              [3, 'Monitor', 500.0],
              [4, 'Webcam', 501.0]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Nome\nFROM Produtos\nWHERE Preco BETWEEN 100 AND 500;' }
        ],
        opcoes: [
          'Teclado e Monitor',
          'Apenas Teclado',
          'Mouse, Teclado e Monitor',
          'Teclado, Monitor e Webcam'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Monitor custa 500, que é o limite superior — e o BETWEEN inclui os extremos.',
          2: 'Mouse custa 99, ficou abaixo do intervalo.',
          3: 'Webcam custa 501, acima do limite de 500.'
        },
        dicas: [
          'BETWEEN inclui os dois extremos.',
          'Verifique quem está exatamente em 100 e 500.'
        ],
        explicacao: 'Teclado (100) e Monitor (500) entram porque BETWEEN é inclusivo. Mouse (99) e Webcam (501) ficam de fora.',
        conceitos: ['sql.between']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql05-a4',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso.',
        afirmacoes: [
          { texto: 'O operador IN aceita números sem aspas: Id IN (1, 2, 3).', correta: true, explicacao: 'Números entram sem aspas; textos precisam de aspas simples.' },
          { texto: 'BETWEEN 100 AND 500 inclui os valores 100 e 500.', correta: true, explicacao: 'BETWEEN é inclusivo nos dois extremos.' },
          { texto: 'NOT IN traz os valores que estão dentro da lista.', correta: false, explicacao: 'NOT IN faz o contrário: exclui os valores da lista.' }
        ],
        dicas: [
          'BETWEEN é inclusivo nos dois extremos.',
          'Pense no que o NOT faz com a condição.'
        ],
        explicacao: 'IN funciona para números e textos; BETWEEN inclui os extremos; NOT inverte — `NOT IN` exclui os valores listados.',
        conceitos: ['sql.in', 'sql.between', 'sql.not']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql05-a5',
        tipo: 'write-code',
        enunciado: 'Escreva uma consulta que retorne **produtos ativos com preço entre 100 e 500** (inclusive), usando BETWEEN.',
        respostasAceitas: [
          'select * from produtos where ativo = 1 and preco between 100 and 500',
          'select * from produtos where preco between 100 and 500 and ativo = 1'
        ],
        dicas: [
          'Combine a condição de ativo com AND.',
          'Use `Preco BETWEEN 100 AND 500`.'
        ],
        explicacao: '`WHERE Ativo = 1 AND Preco BETWEEN 100 AND 500` — duas condições, uma com BETWEEN, unidas por AND.',
        conceitos: ['sql.between', 'sql.and-or']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql05-a6',
        tipo: 'scenario',
        enunciado: 'O time de suporte precisa listar pedidos que **não** estão cancelados nem estornados. Qual consulta é a mais legível?',
        cena: 'A tabela Pedidos tem a coluna Status com valores como Pago, Pendente, Cancelado e Estornado.',
        opcoes: [
          'SELECT * FROM Pedidos WHERE Status NOT IN (\'Cancelado\', \'Estornado\');',
          'SELECT * FROM Pedidos WHERE Status = \'Pago\';',
          'SELECT * FROM Pedidos WHERE Status <> \'Cancelado\';',
          'SELECT * FROM Pedidos WHERE Status BETWEEN \'Cancelado\' AND \'Estornado\';'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Filtrar apenas Pago deixaria de fora Pendente e outros status válidos.',
          2: 'Falta excluir também Estornado.',
          3: 'BETWEEN compara ordem alfabética e traria resultados sem sentido.'
        },
        dicas: [
          'São dois valores a excluir.',
          'Existe um operador que combina exclusão com lista.'
        ],
        explicacao: '`NOT IN` exclui uma lista de valores. Também funcionaria `Status <> \'Cancelado\' AND Status <> \'Estornado\'`, mas NOT IN é mais legível.',
        conceitos: ['sql.not', 'sql.in'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql05-a7',
        tipo: 'write-code',
        enunciado: 'The support team asks for all orders that are **not cancelled**, with a total between 100 and 1000.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select * from pedidos where status <> \'cancelado\' and valortotal between 100 and 1000',
          'select * from pedidos where valortotal between 100 and 1000 and status <> \'cancelado\'',
          'select * from pedidos where status not in (\'cancelado\') and valortotal between 100 and 1000'
        ],
        dicas: [
          'not cancelled = não cancelado.',
          'between 100 and 1000 = intervalo inclusivo.'
        ],
        explicacao: 'Traduzindo: pedidos com status diferente de Cancelado E ValorTotal no intervalo. Você combinou tradução de inglês, operador de diferença e BETWEEN.',
        conceitos: ['sql.not', 'sql.between', 'sql.ingles'],
        desafio: true
      }
    }
  ]
});
