Plataforma.registrarLicao({
  id: 'sql-27',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Funções de data',
  subtitulo: 'Intermediário · Etapa 32',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Ler e comparar datas com GETDATE, YEAR, MONTH e DAY',
    'Calcular diferenças com DATEDIFF e deslocar com DATEADD',
    'Filtrar por períodos: mês atual, últimos dias, anos'
  ],
  conceitos: ['sql.datas', 'sql.where', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Datas são valores comparáveis',
      introduz: ['sql.datas'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.tipos-dados', texto: 'Colunas de data guardam dia, mês, ano (e às vezes hora). E datas **se comparam** como números:' },
        { tipo: 'texto', texto: 'Funções de data extraem partes ou calculam sobre datas. As essenciais:' },
        { tipo: 'conceito', id: 'sql.datas', titulo: 'Funções de data', texto: 'GETDATE devolve hoje; YEAR, MONTH e DAY extraem partes; DATEDIFF mede a diferença; DATEADD desloca.', exemplo: 'SELECT YEAR(DataPedido) FROM Pedidos;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT YEAR(DataPedido) AS Ano,\n       MONTH(DataPedido) AS Mes\nFROM Pedidos;'
        },
        { tipo: 'nota', tom: 'info', texto: '`YEAR`, `MONTH` e `DAY` recebem a data e devolvem números. Servem no `SELECT`, no `WHERE` e no `GROUP BY`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql27-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que `SELECT YEAR(DataPedido) FROM Pedidos;` devolve?',
        opcoes: [
          'O ano de cada pedido, um por linha',
          'A quantidade de pedidos por ano',
          'A data completa de cada pedido',
          'O pedido mais recente'
        ],
        correta: 0,
        dicas: [
          'YEAR extrai só o ano.',
          'Sem GROUP BY, uma linha por pedido.'
        ],
        explicacao: '`YEAR` transforma cada data no seu ano. Para resumir por ano, combine com `GROUP BY`.',
        conceitos: ['sql.datas']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Diferenças e deslocamentos',
      blocos: [
        { tipo: 'texto', texto: '`DATEDIFF` (diferença de datas) mede o intervalo entre duas datas na unidade que você pedir:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT DATEDIFF(day, DataPedido, GETDATE()) AS DiasAtras\nFROM Pedidos;'
        },
        { tipo: 'texto', texto: 'E `DATEADD` (adiciona à data) desloca uma data para frente ou para trás:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT * FROM Pedidos\nWHERE DataPedido > DATEADD(day, -30, GETDATE());'
        },
        { tipo: 'nota', tom: 'info', texto: '"Últimos 30 dias" = data maior que hoje menos 30 dias. Esse padrão aparece em quase todo relatório.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql27-a2',
        tipo: 'fill-code',
        enunciado: 'Complete para trazer pedidos dos últimos 7 dias.',
        codigo: 'SELECT * FROM Pedidos\nWHERE DataPedido > DATEADD(day, {{1}}, GETDATE());',
        lacunas: [['-7']],
        dicas: [
          'Deslocar para trás usa número negativo.',
          'Sete dias atrás.'
        ],
        explicacao: '`DATEADD(day, -7, GETDATE())` é a data de sete dias atrás; o `WHERE` filtra dali para frente.',
        conceitos: ['sql.datas', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql27-a3',
        tipo: 'predict-output',
        enunciado: 'Hoje é 2026-09-21. Quais pedidos esta consulta retorna?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Pedidos',
            colunas: ['Id', 'DataPedido'],
            linhas: [
              [101, '2026-09-20'],
              [102, '2026-08-01'],
              [103, '2026-09-21']
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Id FROM Pedidos\nWHERE MONTH(DataPedido) = 9;' }
        ],
        opcoes: [
          '101 e 103',
          '101, 102 e 103',
          'Apenas 103',
          'Apenas 102'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Agosto (102) não é mês 9.',
          2: 'Setembro tem dois pedidos: 101 e 103.',
          3: 'O dia não importa; só o mês.'
        },
        dicas: [
          'MONTH extrai o mês de cada data.',
          'Setembro é o mês 9.'
        ],
        explicacao: '101 (setembro) e 103 (setembro) passam; 102 é de agosto.',
        conceitos: ['sql.datas', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql27-a4',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna o **ano de cada pedido**.',
        respostasAceitas: [
          'select year(datapedido) as ano from pedidos',
          'select year(datapedido) from pedidos'
        ],
        dicas: [
          'YEAR recebe a data.',
          'Apelide de Ano.'
        ],
        explicacao: '`SELECT YEAR(DataPedido) FROM Pedidos;` — um ano por linha.',
        conceitos: ['sql.datas'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Sem palavra nova',
      blocos: [
        { tipo: 'texto', texto: 'Nada novo: filtre por data só com o que você já sabe.' },
        { tipo: 'ingles', frase: 'Filter orders by date.', traducao: 'Filtre pedidos por data.' },
        { tipo: 'trabalho', texto: '"Últimos 30 dias", "este mês", "este ano": filtros de período com `DATEADD` e `MONTH`/`YEAR` sustentam painéis de vendas, relatórios financeiros e campanhas.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql27-a5',
        tipo: 'write-code',
        enunciado: 'Filter orders by date: pedidos de setembro (mês 9).',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select * from pedidos where month(datapedido) = 9'
        ],
        dicas: [
          'MONTH extrai o mês.',
          'Compare com 9.'
        ],
        explicacao: '`SELECT * FROM Pedidos WHERE MONTH(DataPedido) = 9;`.',
        conceitos: ['sql.datas', 'sql.ingles']
      }
    }
  ]
});
