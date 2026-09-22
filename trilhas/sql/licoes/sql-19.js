Plataforma.registrarLicao({
  id: 'sql-19',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'GROUP BY',
  subtitulo: 'Agregação · Etapa 23',
  duracaoMin: 50,
  xp: 30,
  objetivos: [
    'Separar linhas em grupos com GROUP BY',
    'Combinar grupos com funções de agregação',
    'Ler relatórios agrupados por categoria'
  ],
  conceitos: ['sql.group-by', 'sql.agregacao', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Resumir por partes',
      introduz: ['sql.group-by'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.agregacao', texto: 'O `COUNT(*)` resume a tabela inteira em um número. Mas e se a pergunta for "quantos pedidos **por status**"?' },
        { tipo: 'texto', texto: 'O `GROUP BY` (agrupe por) separa as linhas em grupos e calcula a função **dentro de cada grupo**:' },
        { tipo: 'conceito', id: 'sql.group-by', titulo: 'GROUP BY', texto: 'Separa as linhas em grupos por uma coluna e aplica a agregação em cada grupo.', exemplo: 'SELECT Status, COUNT(*) AS Total FROM Pedidos GROUP BY Status;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Status, COUNT(*) AS Total\nFROM Pedidos\nGROUP BY Status;'
        },
        {
          tipo: 'tabela',
          titulo: 'Resultado',
          colunas: ['Status', 'Total'],
          linhas: [
            ['Pago', 12],
            ['Pendente', 5],
            ['Cancelado', 2]
          ],
          legenda: 'Uma linha por grupo, com a contagem de cada um.'
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql19-a1',
        tipo: 'predict-output',
        enunciado: 'Quantas linhas o resultado tem?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Clientes',
            colunas: ['Nome', 'Cidade'],
            linhas: [
              ['Ana Souza', 'Curitiba'],
              ['Bruno Lima', 'Recife'],
              ['Carla Dias', 'Curitiba']
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Cidade, COUNT(*) AS Total\nFROM Clientes\nGROUP BY Cidade;' }
        ],
        opcoes: [
          '2 linhas: uma por cidade',
          '3 linhas: uma por cliente',
          '1 linha com o total geral',
          '4 linhas'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O GROUP BY resume por cidade, não por cliente.',
          2: 'Sem GROUP BY seria 1 linha; com ele, uma por grupo.',
          3: 'Existem só duas cidades diferentes.'
        },
        dicas: [
          'Conte as cidades diferentes.',
          'Cada grupo vira uma linha.'
        ],
        explicacao: 'Curitiba e Recife formam 2 grupos. O resultado tem 2 linhas: Curitiba com 2, Recife com 1.',
        conceitos: ['sql.group-by', 'sql.agregacao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'A coluna do grupo aparece no SELECT',
      blocos: [
        { tipo: 'texto', texto: 'Regra de ouro: a coluna que está no `GROUP BY` aparece no `SELECT`, junto com as funções. Todo o resto some no resumo:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Cidade, SUM(ValorTotal) AS Total\nFROM Clientes\nJOIN Pedidos ON Pedidos.ClienteId = Clientes.Id\nGROUP BY Cidade;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Junção e agrupamento combinam: o `JOIN` monta as linhas e o `GROUP BY` resume por cidade.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql19-a2',
        tipo: 'fill-code',
        enunciado: 'Complete para contar pedidos por status.',
        codigo: 'SELECT Status, COUNT(*) AS Total\nFROM Pedidos\n{{1}} Status;',
        lacunas: [['group by']],
        dicas: [
          'A cláusula separa em grupos.',
          'São duas palavras.'
        ],
        explicacao: '`GROUP BY Status` cria um grupo por status e conta dentro de cada um.',
        conceitos: ['sql.group-by']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql19-a3',
        tipo: 'find-error',
        enunciado: 'Esta consulta com GROUP BY foi recusada. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Nome, COUNT(*) AS Total\nFROM Clientes\nGROUP BY Cidade;' }
        ],
        opcoes: [
          'Nome está no SELECT mas o grupo é por Cidade',
          'Falta o WHERE',
          'COUNT não funciona com GROUP BY',
          'Nada — a consulta está correta'
        ],
        correta: 0,
        feedbackErro: {
          1: 'WHERE é opcional com GROUP BY.',
          2: 'COUNT é a função mais comum com GROUP BY.',
          3: 'Nome varia dentro do grupo Cidade: o banco não saberia qual mostrar.'
        },
        dicas: [
          'Compare o SELECT com o GROUP BY.',
          'Cada grupo tem vários nomes diferentes.'
        ],
        explicacao: 'No `SELECT` só entra a coluna do grupo (Cidade) e funções. `Nome` varia dentro do grupo e não pode aparecer solto.',
        conceitos: ['sql.group-by', 'sql.agregacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql19-a4',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna o **total vendido por cidade** (tabelas Clientes e Pedidos).',
        respostasAceitas: [
          'select cidade, sum(valortotal) as total from clientes join pedidos on pedidos.clienteid = clientes.id group by cidade',
          'select clientes.cidade, sum(pedidos.valortotal) as total from clientes join pedidos on pedidos.clienteid = clientes.id group by clientes.cidade'
        ],
        dicas: [
          'Junte as tabelas, agrupe por Cidade e some ValorTotal.',
          'A ordem é JOIN, depois GROUP BY.'
        ],
        explicacao: 'Junta, agrupa por cidade e soma dentro de cada grupo: o relatório clássico de vendas por região.',
        conceitos: ['sql.group-by', 'sql.agregacao', 'sql.join'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Group',
      blocos: [
        { tipo: 'texto', texto: 'Uma palavra nova para os grupos: **group** (grupo).' },
        {
          tipo: 'vocab',
          titulo: 'Palavra nova (1)',
          pares: [
            ['group', 'grupo']
          ]
        },
        { tipo: 'ingles', frase: 'Group rows by status.', traducao: 'Agrupe as linhas por status.' },
        { tipo: 'nota', tom: 'info', texto: '**group by** = "agrupe por". A frase descreve exatamente o `GROUP BY`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql19-a5',
        tipo: 'write-code',
        enunciado: 'Group rows by status, contando os pedidos.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select status, count(*) as total from pedidos group by status'
        ],
        dicas: [
          'Agrupe por Status.',
          'Conte dentro de cada grupo.'
        ],
        explicacao: '`SELECT Status, COUNT(*) FROM Pedidos GROUP BY Status;` — uma linha por status.',
        conceitos: ['sql.group-by', 'sql.ingles']
      }
    }
  ]
});
