Plataforma.registrarLicao({
  id: 'sql-33',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Locks e concorrência',
  subtitulo: 'Avançado · Etapa 39',
  duracaoMin: 50,
  xp: 30,
  objetivos: [
    'Entender locks como travas temporárias do banco',
    'Reconhecer deadlocks e como evitá-los',
    'Manter transações curtas para reduzir espera'
  ],
  conceitos: ['sql.locks', 'sql.transacoes', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Duas pessoas, mesma linha',
      introduz: ['sql.locks'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.transacoes', texto: 'Transações garantem tudo-ou-nada. Mas e quando **duas transações** mexem na mesma linha ao mesmo tempo?' },
        { tipo: 'texto', texto: 'O banco usa **locks** (travas): ao alterar uma linha, ele a tranca até confirmar. Quem chega depois **espera** a vez:' },
        { tipo: 'conceito', id: 'sql.locks', titulo: 'Lock', texto: 'Trava temporária que o banco coloca na linha alterada até o COMMIT ou ROLLBACK.', exemplo: 'Duas vendas do último item em estoque: a segunda espera a primeira confirmar.' },
        { tipo: 'nota', tom: 'info', texto: 'Lock não é erro: é o mecanismo que impede duas escritas conflitantes. O problema é quando a espera vira impasse.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql33-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que acontece quando duas transações tentam alterar a mesma linha?',
        opcoes: [
          'A segunda espera a primeira confirmar ou reverter',
          'As duas alteram juntas e o banco soma os valores',
          'A segunda é cancelada na hora',
          'A linha é duplicada'
        ],
        correta: 0,
        dicas: [
          'O banco tranca a linha.',
          'Pense em fila, não em disputa.'
        ],
        explicacao: 'O lock segura a segunda até a primeira terminar. Concorrência controlada, sem corrupção.',
        conceitos: ['sql.locks']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Deadlock: o abraço mortal',
      blocos: [
        { tipo: 'texto', texto: 'O **deadlock** (impasse mortal) acontece quando duas transações trancam recursos diferentes e cada uma espera pela outra. Ninguém anda:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: '-- Sessão A\nBEGIN TRANSACTION;\nUPDATE Produtos SET Estoque = Estoque - 1 WHERE Id = 7;   -- A tranca o produto 7\nUPDATE Pedidos SET Status = \'Pago\' WHERE Id = 183;  -- A espera o pedido 183\n\n-- Sessão B (ao mesmo tempo)\nBEGIN TRANSACTION;\nUPDATE Pedidos SET Status = \'Pago\' WHERE Id = 183;  -- B tranca o pedido 183\nUPDATE Produtos SET Estoque = Estoque - 1 WHERE Id = 7;   -- B espera o produto 7'
        },
        { tipo: 'texto', texto: 'A trancou o produto 7 e agora quer o pedido 183; B trancou o pedido 183 e agora quer o produto 7. Cada uma espera a outra, e nenhuma anda. O SQL Server detecta o impasse, escolhe uma **vítima** (erro 1205), reverte a transação dela e deixa a outra terminar. A aplicação deve tentar a transação de novo.' },
        { tipo: 'nota', tom: 'atencao', texto: 'A defesa é ordem e brevidade: acesse recursos sempre na mesma ordem e confirme rápido. Transação longa é convite a deadlock.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql33-a2',
        tipo: 'true-false',
        enunciado: 'Avalie as afirmações sobre concorrência.',
        afirmacoes: [
          { texto: 'Locks fazem a segunda transação esperar a primeira terminar.', correta: true, explicacao: 'A trava segura a vez de cada uma.' },
          { texto: 'Deadlock se resolve sozinho se esperar bastante.', correta: false, explicacao: 'Ninguém anda: o banco precisa eleger uma vítima e reverter.' },
          { texto: 'Transações curtas reduzem a chance de espera e impasse.', correta: true, explicacao: 'Menos tempo trancado, menos fila.' }
        ],
        dicas: [
          'Impasse não se desfaz sozinho.',
          'Brevidade ajuda.'
        ],
        explicacao: 'Espera é normal; impasse exige intervenção; brevidade previne.',
        conceitos: ['sql.locks', 'sql.transacoes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql33-a3',
        tipo: 'scenario',
        enunciado: 'Dois caixas vendem o último item do estoque ao mesmo tempo. Qual comportamento protege a venda?',
        cena: 'O produto 7 tem Estoque = 1. Cada caixa roda uma transação que baixa o estoque e confirma.',
        opcoes: [
          'O banco tranca a linha: a segunda venda espera e depois vê estoque 0',
          'Os dois confirmam juntos e o estoque fica -1 sem nenhum problema',
          'O banco duplica o último item para conseguir atender os dois caixas',
          'As duas transações se cancelam sozinhas e nenhuma venda acontece'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Estoque negativo é corrupção de regra de negócio.',
          2: 'Linhas não se duplicam sozinhas.',
          3: 'Nada se cancela sozinho.'
        },
        dicas: [
          'A trava serializa as duas vendas.',
          'A segunda enxerga o resultado da primeira.'
        ],
        explicacao: 'O lock ordena as vendas. A aplicação deve verificar o estoque depois da espera e recusar a segunda venda.',
        conceitos: ['sql.locks'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Lock',
      blocos: [
        { tipo: 'texto', texto: 'Uma palavra nova para as travas: **lock** (trava).' },
        {
          tipo: 'vocab',
          titulo: 'Palavra nova (1)',
          pares: [
            ['lock', 'trava']
          ]
        },
        { tipo: 'ingles', frase: 'Locks protect rows.', traducao: 'Travas protegem linhas.' },
        { tipo: 'trabalho', texto: 'Em dia de pico (liquidação, lançamento), a concorrência no estoque decide quem vende e quem pede desculpas. Entender locks é entender o gargalo.', fonte: '💼 No trabalho' },
        { tipo: 'vida-real', emoji: '🔒', titulo: 'Duas atendentes abrem o mesmo pedido para alterar ao mesmo tempo', texto: 'O banco coloca uma trava no pedido e a segunda espera a primeira terminar a transação. Se a primeira deixar a transação aberta e sair para o almoço, a segunda fica parada. Por isso as transações devem ser curtas.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql33-a4',
        tipo: 'multiple-choice',
        enunciado: 'Locks protect rows. O que a frase diz?',
        opcoes: [
          'Travas protegem linhas',
          'Linhas protegem travas',
          'Travas apagam linhas',
          'Linhas trancam travas'
        ],
        correta: 0,
        dicas: [
          'locks = travas; rows = linhas.',
          'protect = proteger.'
        ],
        explicacao: 'Sujeito, verbo, objeto: travas protegem linhas.',
        conceitos: ['sql.locks', 'sql.ingles']
      }
    }
  ]
});
