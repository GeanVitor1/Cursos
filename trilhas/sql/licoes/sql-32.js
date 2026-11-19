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
        { tipo: 'conceito', id: 'sql.transacoes', titulo: 'Transação', texto: 'Pacote atômico de comandos: BEGIN abre, COMMIT confirma tudo, ROLLBACK desfaz tudo.', exemplo: 'BEGIN TRANSACTION; UPDATE ...; UPDATE ...; COMMIT;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'BEGIN TRANSACTION;\nUPDATE Contas SET Saldo = Saldo - 100 WHERE Id = 1;\nUPDATE Contas SET Saldo = Saldo + 100 WHERE Id = 2;\nCOMMIT;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Entre `BEGIN TRANSACTION` e `COMMIT`, nada é definitivo. O `ROLLBACK` **não é automático**: quem detecta o erro (um tratamento de erro, como o mostrado abaixo, ou a aplicação) é que executa o `ROLLBACK`, e então o banco desfaz tudo o que a transação fez. Se a conexão cair antes do `COMMIT`, o banco também reverte a transação aberta.' },
        { tipo: 'futuro', conceitos: ['csharp.excecoes'], titulo: 'Prévia: TRY...CATCH', texto: '`BEGIN TRY ... END TRY` agrupa comandos que podem falhar. Se qualquer um deles der erro, a execução pula direto para o bloco `BEGIN CATCH ... END CATCH`, onde você decide o que fazer — aqui, desfazer a transação. A ideia de tratar erros dessa forma será aprofundada quando você estudar exceções.' },
        { tipo: 'codigo', linguagem: 'sql', codigo: 'BEGIN TRY\n  BEGIN TRANSACTION;\n  UPDATE Contas SET Saldo = Saldo - 100 WHERE Id = 1;\n  UPDATE Contas SET Saldo = Saldo + 100 WHERE Id = 2;\n  COMMIT TRANSACTION;\nEND TRY\nBEGIN CATCH\n  ROLLBACK TRANSACTION;\nEND CATCH;', legenda: 'Padrão T-SQL: se um UPDATE falhar, o CATCH executa o ROLLBACK e nada fica pela metade.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Dialeto T-SQL: no SQL Server a transação abre com `BEGIN TRANSACTION` (ou `BEGIN TRAN`). O `BEGIN;` puro é de PostgreSQL, e `START TRANSACTION` é de MySQL.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql32-a1',
        tipo: 'multiple-choice',
        enunciado: 'O segundo UPDATE falha no meio da transação. O que acontece com o primeiro?',
        opcoes: [
          'É desfeito quando ocorre o ROLLBACK: nada vale',
          'Continua valendo, sem nenhuma conferência',
          'Vale pela metade, com o saldo parcial',
          'O banco escolhe ao acaso qual manter'
        ],
        correta: 0,
        dicas: [
          'Transação é atômica.',
          'Pense em "tudo ou nada".'
        ],
        explicacao: 'Atomicidade: ou os dois UPDATEs valem, ou nenhum. Quando o erro é tratado com `ROLLBACK` (pelo tratamento de erro ou pela aplicação), o estado anterior é restaurado.',
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
          codigo: 'BEGIN TRANSACTION;\nINSERT INTO Pedidos (ClienteId, ValorTotal) VALUES (1, 250);\nUPDATE Produtos SET Estoque = Estoque - 1 WHERE Id = 7;\nCOMMIT;'
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
          'BEGIN TRANSACTION;',
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
      tipo: 'atividade',
      atividade: {
        id: 'sql32-a5',
        tipo: 'write-code',
        enunciado: 'Algo deu errado no meio da transação aberta. Escreva o comando que **desfaz** tudo o que ela fez (T-SQL).',
        respostasAceitas: [
          'ROLLBACK;',
          'ROLLBACK TRANSACTION;',
          'ROLLBACK TRAN;',
          'ROLLBACK WORK;'
        ],
        dicas: [
          'É o comando que faz o papel contrário do COMMIT.',
          'Pode ser escrito só com essa palavra.'
        ],
        explicacao: '`ROLLBACK` desfaz todas as alterações feitas desde o `BEGIN TRANSACTION`, devolvendo o banco ao estado anterior.',
        conceitos: ['sql.transacoes']
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
        { tipo: 'nota', tom: 'info', texto: '**protect** = "proteger": a transação protege a integridade.' },
        { tipo: 'vida-real', emoji: '💳', titulo: 'A luz cai depois de gravar o pagamento e antes de baixar o estoque', texto: 'Sem transação, o cliente pagou e o estoque continua igual, o que gera venda de produto que não existe. Com `BEGIN TRANSACTION` e `COMMIT`, os dois passos acontecem juntos ou nenhum acontece. Se algo falhar no meio, o `ROLLBACK` desfaz o que foi gravado.' }
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
          'BEGIN TRANSACTION; UPDATE Contas SET Saldo = Saldo - 100 WHERE Id = 1; UPDATE Contas SET Saldo = Saldo + 100 WHERE Id = 2; COMMIT;',
          'BEGIN TRANSACTION; UPDATE Contas SET Saldo = Saldo - 100 WHERE Id = 1; UPDATE Contas SET Saldo = Saldo + 100 WHERE Id = 2; COMMIT TRANSACTION;',
          'BEGIN TRANSACTION; UPDATE Contas SET Saldo = Saldo - 100 WHERE Id = 1; UPDATE Contas SET Saldo = Saldo + 100 WHERE Id = 2; COMMIT TRAN;',
          'BEGIN TRAN; UPDATE Contas SET Saldo = Saldo - 100 WHERE Id = 1; UPDATE Contas SET Saldo = Saldo + 100 WHERE Id = 2; COMMIT;',
          'BEGIN TRAN; UPDATE Contas SET Saldo = Saldo - 100 WHERE Id = 1; UPDATE Contas SET Saldo = Saldo + 100 WHERE Id = 2; COMMIT TRANSACTION;',
          'BEGIN TRAN; UPDATE Contas SET Saldo = Saldo - 100 WHERE Id = 1; UPDATE Contas SET Saldo = Saldo + 100 WHERE Id = 2; COMMIT TRAN;',
          'START TRANSACTION; UPDATE Contas SET Saldo = Saldo - 100 WHERE Id = 1; UPDATE Contas SET Saldo = Saldo + 100 WHERE Id = 2; COMMIT;',
          'START TRANSACTION; UPDATE Contas SET Saldo = Saldo - 100 WHERE Id = 1; UPDATE Contas SET Saldo = Saldo + 100 WHERE Id = 2; COMMIT TRANSACTION;',
          'START TRANSACTION; UPDATE Contas SET Saldo = Saldo - 100 WHERE Id = 1; UPDATE Contas SET Saldo = Saldo + 100 WHERE Id = 2; COMMIT TRAN;',
          'BEGIN; UPDATE Contas SET Saldo = Saldo - 100 WHERE Id = 1; UPDATE Contas SET Saldo = Saldo + 100 WHERE Id = 2; COMMIT;',
          'BEGIN; UPDATE Contas SET Saldo = Saldo - 100 WHERE Id = 1; UPDATE Contas SET Saldo = Saldo + 100 WHERE Id = 2; COMMIT TRANSACTION;',
          'BEGIN; UPDATE Contas SET Saldo = Saldo - 100 WHERE Id = 1; UPDATE Contas SET Saldo = Saldo + 100 WHERE Id = 2; COMMIT TRAN;'
        ],
        dicas: [
          'A transação abre antes dos UPDATEs e confirma depois deles.',
          'Dois UPDATEs no meio: um tira da conta 1, o outro põe na conta 2.'
        ],
        explicacao: 'Pacote atômico: tira de uma, põe na outra, confirma junto.',
        conceitos: ['sql.transacoes', 'sql.ingles']
      }
    }
  ]
});
