Plataforma.registrarLicao({
  id: 'sql-32',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Transações e integridade',
  subtitulo: 'Avançado · Etapa 38',
  duracaoMin: 50,
  xp: 30,
  objetivos: [
    'Agrupar comandos em transações com BEGIN e COMMIT',
    'Desfazer tudo com ROLLBACK em caso de erro',
    'Entender atomicidade: tudo ou nada'
  ],
  conceitos: ['sql.transacoes', 'sql.update', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Tudo ou nada',
      introduz: ['sql.transacoes'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.update', texto: 'Cada comando até agora valia sozinho. Mas uma transferência bancária são **dois** comandos: tirar de uma conta, pôr na outra. E se o sistema cair no meio?' },
        { tipo: 'texto', texto: 'Uma **transação** agrupa comandos num pacote atômico: ou **todos** valem (`COMMIT`, confirmar) ou **nenhum** vale (`ROLLBACK`, reverter):' },
        { tipo: 'conceito', id: 'sql.transacoes', titulo: 'Transação', texto: 'Pacote atômico de comandos: BEGIN abre, COMMIT confirma tudo, ROLLBACK desfaz tudo.', exemplo: 'BEGIN; UPDATE ...; UPDATE ...; COMMIT;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'BEGIN;\nUPDATE Contas SET Saldo = Saldo - 100 WHERE Id = 1;\nUPDATE Contas SET Saldo = Saldo + 100 WHERE Id = 2;\nCOMMIT;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Entre `BEGIN` e `COMMIT`, nada é definitivo. Se qualquer comando falhar, o `ROLLBACK` apaga o rascunho inteiro.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql32-a1',
        tipo: 'multiple-choice',
        enunciado: 'O segundo UPDATE falha no meio da transação. O que acontece com o primeiro?',
        opcoes: [
          'É desfeito pelo ROLLBACK: nada vale',
          'Continua valendo normalmente',
          'Vale pela metade',
          'O banco escolhe aleatoriamente'
        ],
        correta: 0,
        dicas: [
          'Transação é atômica.',
          'Pense em "tudo ou nada".'
        ],
        explicacao: 'Atomicidade: ou os dois UPDATEs valem, ou nenhum. O `ROLLBACK` restaura o estado anterior.',
        conceitos: ['sql.transacoes']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Quando usar',
      blocos: [
        { tipo: 'texto', texto: 'Use transação sempre que **duas ou mais escritas** precisarem andar juntas: débito e crédito, pedido e baixa de estoque, insert e log:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'BEGIN;\nINSERT INTO Pedidos (ClienteId, ValorTotal) VALUES (1, 250);\nUPDATE Produtos SET Estoque = Estoque - 1 WHERE Id = 7;\nCOMMIT;'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Leituras (`SELECT`) sozinhas não precisam de transação. E transação aberta por muito tempo prende recursos — abra, execute, confirme, feche.' },
        { tipo: 'trabalho', texto: 'Pagamentos, estoque e saldos sempre rodam em transação. Revisar código financeiro sem ela é reprovar na hora.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql32-a2',
        tipo: 'order-blocks',
        enunciado: 'Ordene os blocos de uma transferência segura de 100 entre contas.',
        blocos: [
          'BEGIN;',
          'UPDATE Contas SET Saldo = Saldo - 100 WHERE Id = 1;',
          'UPDATE Contas SET Saldo = Saldo + 100 WHERE Id = 2;',
          'COMMIT;'
        ],
        dicas: [
          'Abre, executa, confirma.',
          'Tira de uma, põe na outra.'
        ],
        explicacao: 'BEGIN abre o pacote, os dois UPDATEs executam, COMMIT confirma tudo junto.',
        conceitos: ['sql.transacoes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql32-a3',
        tipo: 'find-error',
        enunciado: 'Esta rotina de transferência foi recusada. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'UPDATE Contas SET Saldo = Saldo - 100 WHERE Id = 1;\nUPDATE Contas SET Saldo = Saldo + 100 WHERE Id = 2;' }
        ],
        opcoes: [
          'Falta a transação: se o segundo falhar, o primeiro já valeu',
          'Falta o SELECT antes',
          'UPDATE não aceita expressões como Saldo - 100',
          'Nada — a rotina está correta'
        ],
        correta: 0,
        feedbackErro: {
          1: 'SELECT antes é boa prática, mas não é o erro central.',
          2: 'Expressões em SET são permitidas.',
          3: 'Sem BEGIN/COMMIT não há atomicidade.'
        },
        dicas: [
          'Os dois comandos valem separados.',
          'O que acontece se cair no meio?'
        ],
        explicacao: 'Sem transação, cada UPDATE vale sozinho. Falha no meio = dinheiro sumido de uma conta sem chegar na outra.',
        conceitos: ['sql.transacoes'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Protect',
      blocos: [
        { tipo: 'texto', texto: 'Uma palavra nova para o que a transação garante: **protect** (proteger).' },
        {
          tipo: 'vocab',
          titulo: 'Palavra nova (1)',
          pares: [
            ['protect', 'proteger']
          ]
        },
        { tipo: 'ingles', frase: 'Transactions protect orders.', traducao: 'Transações protegem pedidos.' },
        { tipo: 'nota', tom: 'info', texto: '**protect** = "proteger": a transação protege a integridade.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql32-a4',
        tipo: 'write-code',
        enunciado: 'Transactions protect orders: transfira 100 da conta 1 para a 2.',
        placeholder: 'BEGIN ...',
        respostasAceitas: [
          'begin; update contas set saldo = saldo - 100 where id = 1; update contas set saldo = saldo + 100 where id = 2; commit;'
        ],
        dicas: [
          'BEGIN abre, COMMIT fecha.',
          'Dois UPDATEs no meio.'
        ],
        explicacao: 'Pacote atômico: tira de uma, põe na outra, confirma junto.',
        conceitos: ['sql.transacoes', 'sql.ingles']
      }
    }
  ]
});
