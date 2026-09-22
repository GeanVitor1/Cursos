Plataforma.registrarLicao({
  id: 'sql-checkpoint-profissional',
  trilha: 'sql',
  tipo: 'prova',
  titulo: 'Checkpoint final — SQL Profissional',
  subtitulo: 'Profissional · Etapa 46',
  duracaoMin: 60,
  xp: 100,
  objetivos: [
    'Consolidar modelagem, estoque, pagamentos e otimização',
    'Resolver cenários profissionais completos',
    'Fechar a trilha SQL com domínio comprovado'
  ],
  conceitos: ['sql.modelagem', 'sql.estoque', 'sql.pagamento', 'sql.otimizacao', 'sql.join', 'sql.group-by', 'sql.transacoes', 'sql.indices', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova final: SQL Profissional',
      blocos: [
        { tipo: 'texto', texto: 'São **10 atividades** fechando a trilha: modelagem, estoque, pagamentos, otimização e os fundamentos que sustentam tudo. Sem nota de bloqueio.' },
        {
          tipo: 'lista',
          itens: [
            'Resolva como quem está de plantão.',
            'Pode usar dicas — o resultado continua contando.',
            'Ao final, você verá seu domínio conceito por conceito.'
          ]
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-p1',
        tipo: 'scenario',
        enunciado: 'Onde guardar o endereço de entrega de cada pedido?',
        cena: 'Clientes tem endereço fixo; cada pedido pode ir para casa, trabalho ou presente.',
        opcoes: [
          'Numa coluna de Pedidos, pois varia por pedido',
          'Sobrescrevendo o endereço em Clientes',
          'No nome do cliente, entre parênteses',
          'Não guardar em lugar nenhum'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Sobrescrever apaga o histórico.',
          2: 'Nome não guarda endereço.',
          3: 'Dado usado precisa estar modelado.'
        },
        dicas: [
          'O dado mora onde varia.',
          'Varia por pedido.'
        ],
        explicacao: 'Modelagem: coluna de Pedidos para o variável, Clientes para o fixo.',
        conceitos: ['sql.modelagem']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-p2',
        tipo: 'write-code',
        enunciado: 'Escreva o alerta de ruptura: **nome dos produtos com estoque zerado**.',
        respostasAceitas: [
          'select nome from produtos where estoque = 0'
        ],
        dicas: [
          'Zerado = igual a zero.',
          'Filtre com WHERE.'
        ],
        explicacao: 'Ruptura pura em uma linha de filtro.',
        conceitos: ['sql.estoque', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-p3',
        tipo: 'predict-output',
        enunciado: 'Qual é o Total do grupo Pago?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Pedidos',
            colunas: ['Status', 'ValorTotal'],
            linhas: [
              ['Pago', 150.0],
              ['Cancelado', 400.0],
              ['Pago', 250.0]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Status, SUM(ValorTotal) AS Total\nFROM Pedidos\nGROUP BY Status;' }
        ],
        opcoes: [
          '400',
          '800',
          '150',
          '250'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Cancelado soma em outro grupo.',
          2: 'Some os dois Pagos: 150 + 250.',
          3: 'Há dois pedidos pagos.'
        },
        dicas: [
          'Some os valores do grupo Pago.',
          '150 + 250.'
        ],
        explicacao: 'Pago soma 400; Cancelado soma 400 em outro grupo.',
        conceitos: ['sql.pagamento', 'sql.group-by']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-p4',
        tipo: 'multiple-choice',
        enunciado: 'Uma transferência entre contas precisa de transação porque:',
        opcoes: [
          'Os dois UPDATEs precisam valer juntos ou nenhum valer',
          'SELECT não funciona sem transação',
          'Transação deixa a consulta mais rápida',
          'É obrigatório em todo SELECT'
        ],
        correta: 0,
        dicas: [
          'Pense no "tudo ou nada".',
          'Leitura sozinha não precisa.'
        ],
        explicacao: 'Atomicidade para escritas que andam juntas.',
        conceitos: ['sql.transacoes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-p5',
        tipo: 'find-error',
        enunciado: 'O que há de errado nesta rotina de transferência?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'UPDATE Contas SET Saldo = Saldo - 50 WHERE Id = 1;\nUPDATE Contas SET Saldo = Saldo + 50 WHERE Id = 2;' }
        ],
        opcoes: [
          'Falta BEGIN/COMMIT: sem transação não há atomicidade',
          'Falta o SELECT das contas',
          'UPDATE não aceita dois comandos seguidos',
          'Nada — a rotina está correta'
        ],
        correta: 0,
        feedbackErro: {
          1: 'SELECT antes é boa prática, mas não é o erro.',
          2: 'Comandos seguidos são permitidos.',
          3: 'Falha no meio deixa metade valendo.'
        },
        dicas: [
          'Os comandos valem separados.',
          'Falta o pacote atômico.'
        ],
        explicacao: 'Sem BEGIN/COMMIT, cada UPDATE vale sozinho: risco de metade da transferência.',
        conceitos: ['sql.transacoes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-p6',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna o **total vendido por cidade**, só acima de 1000, do maior para o menor.',
        respostasAceitas: [
          'select cidade, sum(valortotal) as total from clientes join pedidos on pedidos.clienteid = clientes.id group by cidade having sum(valortotal) > 1000 order by total desc'
        ],
        dicas: [
          'JOIN, GROUP BY, HAVING, ORDER BY.',
          'Use o alias no ORDER BY.'
        ],
        explicacao: 'O relatório completo numa consulta só.',
        conceitos: ['sql.pagamento', 'sql.join', 'sql.having', 'sql.order-by']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-p7',
        tipo: 'multiple-choice',
        enunciado: 'O plano mostra Table Scan de 90% com filtro por Cidade. Primeira ação?',
        opcoes: [
          'Criar índice em Cidade e medir de novo',
          'Apagar linhas antigas da tabela',
          'Trocar o servidor de lugar',
          'Desistir da consulta'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Apagar dados não é otimizar.',
          2: 'Hardware vem depois do índice.',
          3: 'Scan com filtro tem solução conhecida.'
        },
        dicas: [
          'Scan pede índice.',
          'Meça antes e depois.'
        ],
        explicacao: 'Índice na coluna do filtro + nova medição.',
        conceitos: ['sql.otimizacao', 'sql.indices']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-p8',
        tipo: 'true-false',
        enunciado: 'Avalie as afirmações de fechamento.',
        afirmacoes: [
          { texto: 'Dado que varia por pedido mora na tabela de pedidos.', correta: true, explicacao: 'Modelagem: o dado mora onde varia.' },
          { texto: 'SELECT * com função no WHERE ajuda o índice.', correta: false, explicacao: 'Atrapalha: asterisco puxa demais e função desliga o índice.' },
          { texto: 'Transações curtas reduzem espera e impasse.', correta: true, explicacao: 'Brevidade: menos tempo trancado, menos fila.' }
        ],
        dicas: [
          'Onde varia, mora.',
          'Função no WHERE desliga índice.'
        ],
        explicacao: 'Modelagem, reescrita e brevidade: o trio profissional.',
        conceitos: ['sql.modelagem', 'sql.otimizacao', 'sql.locks']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-p9',
        tipo: 'write-code',
        enunciado: 'Design tables first: crie a view de clientes ativos.',
        placeholder: 'CREATE ...',
        respostasAceitas: [
          'create view ativos as select * from clientes where ativo = 1'
        ],
        dicas: [
          'CREATE VIEW nome AS ...',
          'Filtre os ativos.'
        ],
        explicacao: 'Consulta guardada com nome, pronta para reuso.',
        conceitos: ['sql.views', 'sql.ingles']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-p10',
        tipo: 'scenario',
        enunciado: 'Dia de pico: o relatório de ruptura travou e as vendas continuam. Qual sequência resolve?',
        cena: 'O alerta de estoque roda a cada 5 minutos varrendo Produtos inteira; o plano mostra Table Scan; dois caixas vendem o último item juntos.',
        opcoes: [
          'Índice na coluna filtrada + transação curta na venda + alerta com colunas listadas',
          'Apagar o alerta e vender no escuro',
          'Travar a tabela inteira o dia todo',
          'Pedir para um caixa esperar o dia acabar'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Sem alerta, a ruptura volta.',
          2: 'Trava total paralisa a loja.',
          3: 'Fila manual não escala.'
        },
        dicas: [
          'Junte índice, transação e reescrita.',
          'Cada problema tem sua ferramenta.'
        ],
        explicacao: 'Índice tira o scan, transação protege a venda, colunas listadas aliviam a leitura: o pacote profissional completo.',
        conceitos: ['sql.otimizacao', 'sql.transacoes', 'sql.estoque']
      }
    }
  ]
});
