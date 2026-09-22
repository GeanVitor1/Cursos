Plataforma.registrarLicao({
  id: 'sql-23',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'CTEs (WITH)',
  subtitulo: 'Intermediário · Etapa 28',
  duracaoMin: 50,
  xp: 30,
  objetivos: [
    'Organizar consultas com CTE e WITH',
    'Dar nome a um resultado intermediário',
    'Reutilizar a CTE na consulta principal'
  ],
  conceitos: ['sql.cte', 'sql.subquery', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Nomeando um resultado',
      introduz: ['sql.cte'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.subquery', texto: 'Subqueries aninhadas funcionam, mas ficam difíceis de ler quando crescem. A CTE resolve isso dando **nome** ao pedaço.' },
        { tipo: 'texto', texto: 'Uma **CTE** (Common Table Expression, expressão de tabela comum) é um resultado nomeado com `WITH` (com), usado pela consulta principal:' },
        { tipo: 'conceito', id: 'sql.cte', titulo: 'CTE', texto: 'Resultado intermediário nomeado com WITH, reutilizado pela consulta principal.', exemplo: 'WITH Ativos AS (SELECT * FROM Clientes WHERE Ativo = 1) SELECT * FROM Ativos;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'WITH Ativos AS (\n  SELECT * FROM Clientes WHERE Ativo = 1\n)\nSELECT Nome FROM Ativos;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Leia de cima para baixo: primeiro define Ativos, depois consulta Ativos como se fosse tabela.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql23-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que a CTE `Ativos` representa na consulta do exemplo?',
        opcoes: [
          'O resultado nomeado dos clientes ativos, usado pelo SELECT final',
          'Uma tabela nova criada no banco',
          'Um filtro aplicado depois do SELECT',
          'A ordenação do resultado'
        ],
        correta: 0,
        dicas: [
          'Ela tem nome e definição.',
          'Nada muda no banco.'
        ],
        explicacao: 'CTE é apelido de resultado: define uma vez, usa como tabela. Não cria nada permanente.',
        conceitos: ['sql.cte']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'CTE com agregação',
      blocos: [
        { tipo: 'texto', texto: 'O poder aparece quando a CTE resume e a principal filtra o resumo — sem aninhar parênteses:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'WITH Totais AS (\n  SELECT Cidade, COUNT(*) AS Total\n  FROM Clientes\n  GROUP BY Cidade\n)\nSELECT Cidade FROM Totais WHERE Total > 2;'
        },
        { tipo: 'nota', tom: 'info', texto: 'A CTE agrupa; o `SELECT` final filtra. Cada parte fica legível isoladamente.' },
        { tipo: 'trabalho', texto: 'Em relatórios longos, CTEs nomeadas por etapa (Base, Totais, Filtrados) viram documentação viva: quem lê entende o raciocínio sem decifrar parênteses.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql23-a2',
        tipo: 'order-blocks',
        enunciado: 'Ordene os blocos para montar a CTE de clientes ativos.',
        blocos: [
          'WITH Ativos AS (',
          'SELECT * FROM Clientes WHERE Ativo = 1',
          ')',
          'SELECT Nome FROM Ativos;'
        ],
        dicas: [
          'WITH abre a definição.',
          'O SELECT final usa o nome.'
        ],
        explicacao: 'Define Ativos com WITH, fecha o parêntese e consulta pelo nome.',
        conceitos: ['sql.cte']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql23-a3',
        tipo: 'find-error',
        enunciado: 'Esta consulta com CTE foi recusada. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Nome FROM Ativos\nWITH Ativos AS (SELECT * FROM Clientes);' }
        ],
        opcoes: [
          'O WITH precisa vir antes do SELECT que usa a CTE',
          'Falta o JOIN',
          'CTE precisa de GROUP BY',
          'Nada — a consulta está correta'
        ],
        correta: 0,
        feedbackErro: {
          1: 'JOIN não é obrigatório com CTE.',
          2: 'GROUP BY não tem a ver com o erro.',
          3: 'O nome Ativos ainda não existe quando o SELECT roda.'
        },
        dicas: [
          'Definição vem antes do uso.',
          'A ordem de leitura é de cima para baixo.'
        ],
        explicacao: '`WITH` define primeiro; o `SELECT` usa depois. Inverter quebra a consulta.',
        conceitos: ['sql.cte']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql23-a4',
        tipo: 'write-code',
        enunciado: 'Escreva a CTE **Caros** com produtos acima de 500 e liste seus nomes.',
        respostasAceitas: [
          'with caros as (select * from produtos where preco > 500) select nome from caros'
        ],
        dicas: [
          'WITH Caros AS (...) e depois SELECT.',
          'Filtre Preco > 500 na interna.'
        ],
        explicacao: 'Define Caros com o filtro e consulta os nomes pelo apelido.',
        conceitos: ['sql.cte', 'sql.where'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Common table',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras para o nome completo da CTE: **common** (comum) e **expression** (expressão).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['common', 'comum'],
            ['expression', 'expressão']
          ]
        },
        { tipo: 'ingles', frase: 'Common table expressions.', traducao: 'Expressões de tabela comuns.' },
        { tipo: 'nota', tom: 'info', texto: '**common table expression** = "expressão de tabela comum": um resultado com nome.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql23-a5',
        tipo: 'write-code',
        enunciado: 'Common table expressions: CTE Ativos e seus nomes.',
        placeholder: 'WITH ...',
        respostasAceitas: [
          'with ativos as (select * from clientes where ativo = 1) select nome from ativos'
        ],
        dicas: [
          'WITH Ativos AS (...) primeiro.',
          'SELECT Nome FROM Ativos depois.'
        ],
        explicacao: 'A CTE nomeia os ativos; o SELECT final lê pelo nome.',
        conceitos: ['sql.cte', 'sql.ingles']
      }
    }
  ]
});
