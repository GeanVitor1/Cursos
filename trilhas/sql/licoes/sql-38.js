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
          codigo: 'SELECT COUNT(*) AS Total,\n       SUM(CASE WHEN Status = \'Cancelado\' THEN 1 ELSE 0 END) AS Cancelados,\n       100.0 * SUM(CASE WHEN Status = \'Cancelado\' THEN 1 ELSE 0 END) / COUNT(*) AS TaxaPercentual\nFROM Pedidos;'
        },
        { tipo: 'nota', tom: 'info', texto: 'O `CASE` transforma cada linha em 1 ou 0; a `SUM` conta os cancelados. Dividir um pelo outro dá a taxa. Atenção: no SQL Server, `int / int` é divisão inteira (`2 / 8` dá `0`). Por isso a conta começa com `100.0 *`, que força casas decimais.' },
        { tipo: 'trabalho', texto: 'Taxa de cancelamento, ticket médio e receita por período são os três números que a diretoria pergunta todo mês. Eles nascem dessas consultas.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql38-a2',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna o **ticket médio** (média de ValorTotal, apelide de **Ticket**) dos pedidos pagos.',
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
      titulo: 'Receita por período',
      blocos: [
        { tipo: 'texto', texto: 'Para medir a receita de um mês, filtre as datas com um intervalo: do primeiro dia do mês (inclusive) até o primeiro dia do mês seguinte (exclusive):' },
        { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT SUM(ValorTotal) AS Receita\nFROM Pedidos\nWHERE Status = \'Pago\'\n  AND DataPedido >= \'2026-09-01\'\n  AND DataPedido < \'2026-10-01\';' },
        { tipo: 'nota', tom: 'info', texto: 'Esse intervalo pega o mês inteiro, inclusive pedidos com hora no último dia, e deixa o banco usar um índice em `DataPedido`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql38-a4',
        tipo: 'multiple-choice',
        enunciado: 'Em um mês com 8 pedidos e 2 cancelados, qual expressão calcula a taxa de cancelamento em percentual no SQL Server?',
        opcoes: [
          '100.0 * 2 / 8, que devolve 25.0',
          '2 / 8 * 100, que devolve 25',
          '2 / 8, que devolve 0.25',
          '100 / 8 * 2, que devolve 25.0'
        ],
        correta: 0,
        feedbackErro: {
          1: '`2 / 8` é divisão inteira e dá 0; multiplicar 0 por 100 continua 0.',
          2: 'Com dois inteiros, o SQL Server devolve 0, não 0.25.',
          3: '`100 / 8` também é divisão inteira (12) e o resultado fica 24, não 25.'
        },
        dicas: [
          'Divisão entre dois inteiros descarta a parte decimal.',
          'Comece a conta por um número com casas decimais, como 100.0.'
        ],
        explicacao: '`100.0 * 2 / 8` força decimal desde o primeiro passo e dá 25.0. Com inteiros, `2 / 8` vira 0.',
        conceitos: ['sql.relatorios']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql38-a5',
        tipo: 'multiple-choice',
        enunciado: 'Qual filtro soma a receita dos pedidos **Pagos de setembro de 2026** e ainda deixa o banco usar um índice em `DataPedido`?',
        opcoes: [
          'WHERE Status = \'Pago\' AND DataPedido >= \'2026-09-01\' AND DataPedido < \'2026-10-01\'',
          'WHERE Status = \'Pago\' AND MONTH(DataPedido) = 9 AND YEAR(DataPedido) = 2026',
          'WHERE Status = \'Pago\' AND DataPedido = \'2026-09\'',
          'WHERE Status = \'Pago\' AND DataPedido > \'2026-09-01\' AND DataPedido < \'2026-09-30\''
        ],
        correta: 0,
        feedbackErro: {
          1: 'Dá o resultado certo, mas MONTH e YEAR aplicam função na coluna e desligam o índice.',
          2: 'Uma data completa nunca é igual a "2026-09": a comparação não pega o mês.',
          3: 'O `>` descarta o dia 1 e o `<` descarta o dia 30 e as horas dele: o mês fica incompleto.'
        },
        dicas: [
          'Compare a coluna direto, sem função, com um intervalo.',
          'O intervalo termina no primeiro dia do mês seguinte, exclusive.'
        ],
        explicacao: '`>= 1º dia do mês` e `< 1º dia do próximo mês` cobre o mês inteiro e mantém a coluna sem função, permitindo o uso de índice.',
        conceitos: ['sql.relatorios']
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
        { tipo: 'nota', tom: 'info', texto: '**payments** = "pagamentos". O filtro da análise financeira.' },
        { tipo: 'vida-real', emoji: '💰', titulo: 'O financeiro quer separar o dinheiro que entrou do que ainda está pendente', texto: 'Uma consulta só calcula `SUM(CASE WHEN Status = \'Pago\' THEN ValorTotal ELSE 0 END)` para o que entrou, e outra soma equivalente para o pendente. Cancelados ficam de fora, e os dois números saem lado a lado.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql38-a3',
        tipo: 'write-code',
        enunciado: 'Payments with status paid: some os valores, com alias **Total**.',
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
