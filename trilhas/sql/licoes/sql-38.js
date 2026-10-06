Plataforma.registrarLicao({
  id: 'sql-38',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Análise de pagamentos e relatórios',
  subtitulo: 'Profissional · Etapa 44',
  duracaoMin: 60,
  xp: 30,
  objetivos: [
    'Medir receita por status e período',
    'Calcular taxa de cancelamento e ticket médio',
    'Montar o relatório financeiro do mês'
  ],
  conceitos: ['sql.pagamento', 'sql.group-by', 'sql.case', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Dinheiro por status',
      introduz: ['sql.pagamento'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.group-by', texto: 'Agrupar por status separa pagos, pendentes e cancelados. Agora esses grupos viram dinheiro.' },
        { tipo: 'texto', texto: 'Análise de **pagamentos** responde quanto entrou, quanto travou e quanto se perdeu:' },
        { tipo: 'conceito', id: 'sql.pagamento', titulo: 'Análise de pagamentos', texto: 'Agregações sobre valores por status e período para medir receita, perda e ticket.', exemplo: 'SELECT Status, SUM(ValorTotal) FROM Pedidos GROUP BY Status;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Status, SUM(ValorTotal) AS Total, COUNT(*) AS Qtd\nFROM Pedidos\nGROUP BY Status;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Soma mostra dinheiro; contagem mostra volume. Os dois juntos contam a história completa.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql38-a1',
        tipo: 'predict-output',
        enunciado: 'Qual é o Total do grupo Pago?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Pedidos',
            colunas: ['Status', 'ValorTotal'],
            linhas: [
              ['Pago', 100.0],
              ['Pago', 300.0],
              ['Cancelado', 200.0]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Status, SUM(ValorTotal) AS Total\nFROM Pedidos\nGROUP BY Status;' }
        ],
        opcoes: [
          '400',
          '600',
          '200',
          '100'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Cancelado não soma no grupo Pago.',
          2: 'Some só os Pagos: 100 + 300.',
          3: 'Há dois pedidos pagos.'
        },
        dicas: [
          'Some os valores com Status Pago.',
          '100 + 300.'
        ],
        explicacao: 'Pago soma 400; Cancelado soma 200 em outro grupo.',
        conceitos: ['sql.pagamento', 'sql.group-by']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Taxa de cancelamento',
      blocos: [
        { tipo: 'texto', texto: 'Com `CASE` dentro da agregação dá para medir proporções — como a fatia de pedidos cancelados:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT COUNT(*) AS Total,\n       SUM(CASE WHEN Status = \'Cancelado\' THEN 1 ELSE 0 END) AS Cancelados\nFROM Pedidos;'
        },
        { tipo: 'nota', tom: 'info', texto: 'O `CASE` transforma cada linha em 1 ou 0; a `SUM` conta os cancelados. Dividir um pelo outro dá a taxa.' },
        { tipo: 'trabalho', texto: 'Taxa de cancelamento, ticket médio e receita por período são os três números que a diretoria pergunta todo mês. Eles nascem dessas consultas.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql38-a2',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna o **ticket médio** (média de ValorTotal) dos pedidos pagos.',
        respostasAceitas: [
          "select avg(valortotal) as ticket from pedidos where status = 'Pago'",
          "select avg(valortotal) from pedidos where status = 'Pago'"
        ],
        dicas: [
          'Filtre os Pagos com WHERE.',
          'Média é AVG.'
        ],
        explicacao: 'Filtra o grupo e resume: ticket médio dos pagos.',
        conceitos: ['sql.pagamento', 'sql.agregacao'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Payment',
      blocos: [
        { tipo: 'texto', texto: 'Uma palavra nova para o dinheiro que entra: **payment** (pagamento).' },
        {
          tipo: 'vocab',
          titulo: 'Palavra nova (1)',
          pares: [
            ['payment', 'pagamento']
          ]
        },
        { tipo: 'ingles', frase: 'Payments with status paid.', traducao: 'Pagamentos com status pago.' },
        { tipo: 'nota', tom: 'info', texto: '**payments** = "pagamentos". O filtro da análise financeira.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql38-a3',
        tipo: 'write-code',
        enunciado: 'Payments with status paid: some os valores.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          "select sum(valortotal) as total from pedidos where status = 'Pago'",
          "select sum(valortotal) from pedidos where status = 'Pago'"
        ],
        dicas: [
          'payments = pagamentos; paid = pago.',
          'SUM com WHERE de Status.'
        ],
        explicacao: 'A receita dos pagos em uma soma.',
        conceitos: ['sql.pagamento', 'sql.ingles']
      }
    }
  ]
});
