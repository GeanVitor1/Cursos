Plataforma.registrarLicao({
  id: 'sql-13',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Por que JOIN existe',
  subtitulo: 'Relacionamentos · Etapa 16',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Entender por que dados separados precisam ser reunidos',
    'Ler um JOIN com ON ligando as tabelas',
    'Prever o resultado de uma junção simples'
  ],
  conceitos: ['sql.join', 'sql.chave-estrangeira', 'sql.relacionamento', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O problema das tabelas separadas',
      introduz: ['sql.join'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.chave-estrangeira', texto: 'Pedidos guarda ClienteId apontando para Clientes. O vínculo existe — mas cada `SELECT` até agora leu **uma tabela por vez**.' },
        { tipo: 'texto', texto: 'E quando a pergunta mistura as duas? "Quero o nome do cliente de cada pedido." O nome está em Clientes; o pedido está em Pedidos. É para isso que existe o `JOIN` (juntar):' },
        { tipo: 'conceito', id: 'sql.join', titulo: 'JOIN', texto: 'Combina linhas de duas tabelas usando a condição do ON, que compara a chave estrangeira com a chave primária.', exemplo: 'SELECT * FROM Pedidos JOIN Clientes ON Pedidos.ClienteId = Clientes.Id;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Pedidos.Id, Clientes.Nome\nFROM Pedidos\nJOIN Clientes ON Pedidos.ClienteId = Clientes.Id;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Leia em voz alta: "de Pedidos, junte Clientes onde o ClienteId do pedido for igual ao Id do cliente". O `ON` é a **condição da junção**.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql13-a1',
        tipo: 'multiple-choice',
        enunciado: 'Para que serve o `JOIN` em uma consulta?',
        opcoes: [
          'Combinar linhas de duas tabelas usando uma condição',
          'Criar uma tabela nova no banco',
          'Filtrar linhas de uma única tabela',
          'Ordenar o resultado por duas colunas'
        ],
        correta: 0,
        dicas: [
          'Ele trabalha com duas tabelas ao mesmo tempo.',
          'Pense no verbo "juntar".'
        ],
        explicacao: '`JOIN` junta linhas de duas tabelas pela condição do `ON`. Filtrar é `WHERE`; ordenar é `ORDER BY`.',
        conceitos: ['sql.join']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Lendo a condição do ON',
      blocos: [
        { tipo: 'texto', texto: 'O `ON` diz **como** as tabelas se encaixam. Quase sempre é chave estrangeira de um lado e chave primária do outro:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Clientes.Nome, Pedidos.ValorTotal\nFROM Clientes\nJOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Repare o nome da coluna antes do ponto: `Pedidos.ClienteId` e `Clientes.Id`. Com duas tabelas, dizer só `Id` gera ambiguidade — o banco não sabe de qual tabela você fala.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql13-a2',
        tipo: 'fill-code',
        enunciado: 'Complete para juntar Pedidos com Clientes.',
        codigo: 'SELECT Clientes.Nome\nFROM Pedidos\n{{1}} Clientes ON Pedidos.ClienteId = Clientes.Id;',
        lacunas: [['join']],
        dicas: [
          'É o verbo que junta tabelas.',
          'Quatro letras.'
        ],
        explicacao: '`JOIN Clientes ON ...` — a junção acontece depois do `FROM`, com a condição no `ON`.',
        conceitos: ['sql.join', 'sql.chave-estrangeira']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O que sai na junção',
      blocos: [
        {
          tipo: 'tabela',
          titulo: 'Pedidos',
          colunas: ['Id', 'ClienteId', 'ValorTotal'],
          linhas: [
            [101, 1, 250.0],
            [102, 2, 80.0]
          ]
        },
        {
          tipo: 'tabela',
          titulo: 'Clientes',
          colunas: ['Id', 'Nome'],
          linhas: [
            [1, 'Ana Souza'],
            [2, 'Bruno Lima']
          ]
        },
        { tipo: 'texto', texto: 'A consulta abaixo combina cada pedido com o nome do dono. O resultado tem **uma linha por pedido**, agora com o nome junto:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Pedidos.Id, Clientes.Nome, Pedidos.ValorTotal\nFROM Pedidos\nJOIN Clientes ON Pedidos.ClienteId = Clientes.Id;'
        },
        {
          tipo: 'tabela',
          titulo: 'Resultado',
          colunas: ['Id', 'Nome', 'ValorTotal'],
          linhas: [
            [101, 'Ana Souza', 250.0],
            [102, 'Bruno Lima', 80.0]
          ]
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql13-a3',
        tipo: 'predict-output',
        enunciado: 'Quantas linhas o resultado tem?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Pedidos (3 linhas, ClienteId 1, 1 e 2)',
            colunas: ['Id', 'ClienteId'],
            linhas: [
              [101, 1],
              [102, 1],
              [103, 2]
            ]
          },
          {
            tipo: 'tabela',
            titulo: 'Clientes (2 linhas)',
            colunas: ['Id', 'Nome'],
            linhas: [
              [1, 'Ana Souza'],
              [2, 'Bruno Lima']
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Pedidos.Id, Clientes.Nome\nFROM Pedidos\nJOIN Clientes ON Pedidos.ClienteId = Clientes.Id;' }
        ],
        opcoes: [
          '3 linhas, uma por pedido',
          '2 linhas, uma por cliente',
          '5 linhas, somando as duas tabelas',
          '6 linhas, cada pedido com cada cliente'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A junção não resume por cliente: cada pedido vira uma linha.',
          2: 'O JOIN não soma linhas; ele combina.',
          3: 'Cada pedido combina com um único cliente, não com todos.'
        },
        dicas: [
          'Cada pedido tem um dono.',
          'Conte pelos pedidos, não pelos clientes.'
        ],
        explicacao: 'Cada um dos 3 pedidos encontra seu cliente pelo `ON`. O resultado tem 3 linhas: Ana aparece duas vezes, uma por pedido.',
        conceitos: ['sql.join', 'sql.relacionamento']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql13-a4',
        tipo: 'find-error',
        enunciado: 'Esta consulta foi recusada na revisão. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Nome\nFROM Pedidos\nJOIN Clientes;' }
        ],
        opcoes: [
          'Falta o ON com a condição da junção',
          'O SELECT deveria ser SELECT *',
          'JOIN só funciona com três tabelas',
          'Nada — a consulta está correta'
        ],
        correta: 0,
        feedbackErro: {
          1: 'SELECT Nome funciona; o problema é outro.',
          2: 'JOIN funciona com duas tabelas.',
          3: 'Sem ON o banco não sabe como encaixar as tabelas.'
        },
        dicas: [
          'Compare com o JOIN da etapa anterior.',
          'O que liga Pedidos a Clientes?'
        ],
        explicacao: 'Todo `JOIN` precisa do `ON` dizendo como as tabelas se relacionam. Sem ele, a consulta nem faz sentido.',
        conceitos: ['sql.join', 'sql.chave-estrangeira']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Join',
      blocos: [
        { tipo: 'texto', texto: 'A palavra **join** (juntar) você já usa no SQL. Veja como ela aparece num pedido de trabalho — sem palavra nova, só combinando o que você já sabe:' },
        { tipo: 'ingles', frase: 'Join customers and orders.', traducao: 'Junte clientes e pedidos.' },
        { tipo: 'nota', tom: 'info', texto: '**join** = "junte". A frase inteira vira `... JOIN ...`: juntar clientes e pedidos.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql13-a5',
        tipo: 'write-code',
        enunciado: 'Join customers and orders.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select pedidos.id, clientes.nome from pedidos join clientes on pedidos.clienteid = clientes.id'
        ],
        dicas: [
          'customers = clientes; orders = pedidos.',
          'A condição liga ClienteId ao Id.'
        ],
        explicacao: 'Traduzindo: "join customers and orders" = junte clientes e pedidos. `SELECT Pedidos.Id, Clientes.Nome FROM Pedidos JOIN Clientes ON Pedidos.ClienteId = Clientes.Id;`.',
        conceitos: ['sql.join', 'sql.ingles']
      }
    }
  ]
});
