Plataforma.registrarLicao({
  id: 'sql-04',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Combinando filtros com AND e OR',
  subtitulo: 'Fundamentos · Etapa 4',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Combinar duas condições com AND e com OR',
    'Entender a precedência entre eles',
    'Usar parênteses para deixar a intenção clara'
  ],
  conceitos: ['sql.and-or', 'sql.parenteses', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Duas condições ao mesmo tempo',
      introduz: ['sql.and-or'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.where', texto: 'Você já sabe filtrar com `WHERE` e comparar com `=`, `>` e `<`. Agora vai combinar duas condições na mesma consulta.' },
        { tipo: 'texto', texto: 'Filtrar por uma condição é útil. Mas o trabalho real pede coisas como: "clientes **ativos** que moram em **Curitiba**".' },
        { tipo: 'texto', texto: 'O operador `AND` exige que **as duas condições sejam verdadeiras**:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT *\nFROM Clientes\nWHERE Ativo = 1\n  AND Cidade = \'Curitiba\';'
        },
        {
          tipo: 'tabela',
          titulo: 'Resultado',
          colunas: ['Id', 'Nome', 'Cidade', 'Ativo'],
          linhas: [[1, 'Ana Souza', 'Curitiba', 1]],
          legenda: 'Diego também é de Curitiba, mas está inativo. Ficou de fora.'
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql04-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que o `AND` exige em uma consulta com duas condições?',
        opcoes: [
          'Que as duas condições sejam verdadeiras para a linha aparecer',
          'Que pelo menos uma das condições seja verdadeira',
          'Que as duas sejam falsas',
          'Que a primeira condição seja ignorada'
        ],
        correta: 0,
        feedbackErro: {
          1: '"Pelo menos uma" é o comportamento do OR, não do AND.',
          2: 'Se as duas fossem falsas, nenhuma linha passaria em qualquer critério.',
          3: 'Nenhuma condição é ignorada: o banco avalia todas.'
        },
        dicas: [
          'AND é rigoroso: exige tudo.',
          'Se uma condição falhar, a linha inteira é descartada.'
        ],
        explicacao: 'AND funciona como um funil duplo: a linha precisa passar pelas duas condições ao mesmo tempo.',
        conceitos: ['sql.and-or']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Qualquer uma das condições: OR',
      blocos: [
        { tipo: 'texto', texto: 'Já o `OR` aceita a linha se **pelo menos uma** condição for verdadeira.' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Nome, Cidade, Ativo\nFROM Clientes\nWHERE Cidade = \'Curitiba\'\n   OR Ativo = 1;'
        },
        {
          tipo: 'tabela',
          titulo: 'Dados',
          colunas: ['Nome', 'Cidade', 'Ativo'],
          linhas: [
            ['Ana', 'Curitiba', 1],
            ['Bruno', 'Recife', 1],
            ['Carla', 'São Paulo', 0],
            ['Diego', 'Curitiba', 0]
          ]
        },
        { tipo: 'destaque', texto: 'Pense assim: `AND` diminui o resultado (mais exigente). `OR` aumenta o resultado (mais permissivo).' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql04-a2',
        tipo: 'predict-output',
        enunciado: 'Usando a tabela de clientes acima, quem a consulta retorna?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Nome\nFROM Clientes\nWHERE Cidade = \'Curitiba\'\n   OR Ativo = 1;' },
          {
            tipo: 'tabela',
            colunas: ['Nome', 'Cidade', 'Ativo'],
            linhas: [
              ['Ana', 'Curitiba', 1],
              ['Bruno', 'Recife', 1],
              ['Carla', 'São Paulo', 0],
              ['Diego', 'Curitiba', 0]
            ]
          }
        ],
        opcoes: [
          'Ana, Bruno e Diego',
          'Apenas Ana',
          'Ana e Diego',
          'Todos os quatro clientes'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Bruno não é de Curitiba, mas está ativo: o OR aceita uma condição ou a outra.',
          2: 'Ana e Diego passam por Curitiba, mas Bruno passa por estar ativo.',
          3: 'Carla não é de Curitiba nem está ativa.'
        },
        dicas: [
          'Basta satisfazer uma das condições.',
          'Carla não é de Curitiba nem está ativa. Diego não está ativo, mas é de Curitiba.'
        ],
        explicacao: 'Ana (as duas condições), Bruno (ativo) e Diego (Curitiba) entram. Carla não atende nenhuma condição.',
        conceitos: ['sql.and-or']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql04-a3',
        tipo: 'fill-code',
        enunciado: 'Complete para retornar clientes que são **ativos E moram em Curitiba**.',
        codigo: 'SELECT *\nFROM Clientes\nWHERE Ativo = 1 {{1}} Cidade = \'Curitiba\';',
        lacunas: [['and']],
        dicas: [
          'As duas condições precisam ser verdadeiras.',
          'É o oposto de OR.'
        ],
        explicacao: '`AND` exige as duas condições. O resultado traz apenas quem atende tudo.',
        conceitos: ['sql.and-or']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Cuidado com a precedência',
      introduz: ['sql.parenteses'],
      blocos: [
        { tipo: 'texto', texto: 'Quando AND e OR aparecem juntos, o banco avalia o `AND` primeiro — como a multiplicação antes da soma na matemática.' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: '-- O banco lê assim:\nWHERE Ativo = 1\n   OR (Cidade = \'Pendente\' AND ValorTotal > 500)'
        },
        { tipo: 'texto', texto: 'Para deixar a intenção explícita, use parênteses. Eles eliminam qualquer dúvida — inclusive para quem revisa seu código:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'WHERE (Status = \'Pendente\' OR Status = \'Enviado\')\n  AND ValorTotal > 500;'
        },
        { tipo: 'destaque', texto: 'Profissionais usam parênteses mesmo quando "não precisam". Legibilidade vale mais do que economizar caracteres.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql04-a4',
        tipo: 'order-blocks',
        enunciado: 'Ordene os blocos para montar a consulta: pedidos pendentes ou enviados, com valor acima de 500.',
        blocos: [
          'SELECT Id, ValorTotal',
          'FROM Pedidos',
          'WHERE (Status = \'Pendente\' OR Status = \'Enviado\')',
          'AND ValorTotal > 500;'
        ],
        dicas: [
          'SELECT primeiro, depois FROM e por último WHERE.',
          'A condição com OR fica entre parênteses para o AND se aplicar ao grupo todo.'
        ],
        explicacao: 'Os parênteses agrupam o OR, e o AND se aplica ao grupo: (pendente ou enviado) E (valor acima de 500).',
        conceitos: ['sql.parenteses', 'sql.and-or']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql04-a5',
        tipo: 'find-error',
        enunciado: 'O banco acusou erro de sintaxe. O que está errado?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT *\nFROM Clientes\nWHERE (Ativo = 1 AND Cidade = \'Curitiba\';' }
        ],
        opcoes: [
          'Falta fechar o parêntese antes do ponto e vírgula',
          'Falta a palavra FROM',
          'AND não pode ser usado dentro de parênteses',
          'O texto deveria estar entre aspas duplas'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O FROM está presente no início da consulta.',
          2: 'AND dentro de parênteses é normal e recomendado.',
          3: 'Aspas simples para texto está correto; o problema é o parêntese.'
        },
        dicas: [
          'Conte os parênteses: um abriu... e o outro?',
          'Todo parêntese aberto precisa ser fechado.'
        ],
        explicacao: 'Parênteses sempre vêm em pares. O erro: `WHERE (Ativo = 1 AND Cidade = \'Curitiba\';` — falta o `)` antes do `;`.',
        conceitos: ['sql.parenteses']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql04-a6',
        tipo: 'write-code',
        enunciado: 'The manager wants all orders that are either **pending** or **shipped**, with a total value above 500.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select * from pedidos where (status = \'pendente\' or status = \'enviado\') and valortotal > 500',
          'select * from pedidos where valortotal > 500 and (status = \'pendente\' or status = \'enviado\')'
        ],
        dicas: [
          'pending = Pendente, shipped = Enviado, orders = Pedidos.',
          'Use parênteses no OR e combine com AND ValorTotal > 500.'
        ],
        explicacao: 'Traduzindo: pedidos com status Pendente ou Enviado E ValorTotal > 500. Os parênteses garantem que o AND se aplique ao grupo inteiro.',
        conceitos: ['sql.and-or', 'sql.parenteses', 'sql.ingles'],
        desafio: true
      }
    }
  ]
});
