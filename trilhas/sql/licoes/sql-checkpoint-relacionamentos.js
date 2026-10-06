Plataforma.registrarLicao({
  id: 'sql-checkpoint-relacionamentos',
  trilha: 'sql',
  tipo: 'prova',
  titulo: 'Checkpoint — Joins',
  subtitulo: 'Relacionamentos · Etapa 21',
  duracaoMin: 45,
  xp: 100,
  objetivos: [
    'Consolidar JOIN, INNER, LEFT e múltiplas junções',
    'Escolher o tipo certo de JOIN para cada pergunta',
    'Ler consultas com aliases sem se perder'
  ],
  conceitos: ['sql.join', 'sql.inner-join', 'sql.left-join', 'sql.join-multiplo', 'sql.aliases', 'sql.where', 'sql.chave-estrangeira', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova de nível: Relacionamentos',
      blocos: [
        { tipo: 'texto', texto: 'São **10 atividades** sobre junções: condição do ON, tipos de JOIN, múltiplas tabelas e aliases. Sem nota de bloqueio — o resultado mostra o que revisar.' },
        {
          tipo: 'lista',
          itens: [
            'Leia cada cenário como um chamado real.',
            'Pode usar dicas — o resultado continua contando.',
            'Ao final, você verá seu domínio conceito por conceito.'
          ]
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-j1',
        tipo: 'multiple-choice',
        enunciado: 'O que o `ON` define numa consulta com JOIN?',
        opcoes: [
          'A condição que liga as duas tabelas',
          'As colunas que aparecem no resultado',
          'A ordem das linhas',
          'O filtro de valores nulos'
        ],
        correta: 0,
        dicas: [
          'Ele compara chave estrangeira com chave primária.',
          'Sem ele, a junção não faz sentido.'
        ],
        explicacao: 'O `ON` é a condição da junção. Colunas são do `SELECT`; ordem é `ORDER BY`.',
        conceitos: ['sql.join', 'sql.chave-estrangeira']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-j2',
        tipo: 'predict-output',
        enunciado: 'Quem aparece no resultado?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Clientes',
            colunas: ['Id', 'Nome'],
            linhas: [
              [1, 'Ana Souza'],
              [2, 'Bruno Lima']
            ]
          },
          {
            tipo: 'tabela',
            titulo: 'Pedidos',
            colunas: ['Id', 'ClienteId', 'ValorTotal'],
            linhas: [
              [101, 1, 250.0],
              [102, 1, 80.0]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Clientes.Nome, Pedidos.ValorTotal\nFROM Clientes\nINNER JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;' }
        ],
        opcoes: [
          'Ana Souza duas vezes, com 250 e 80',
          'Ana Souza e Bruno Lima, uma vez cada',
          'Apenas Bruno Lima',
          'Nenhum cliente'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Bruno não tem pedido e o INNER o esconde.',
          2: 'Sem pedido, Bruno não combina.',
          3: 'Ana combina com dois pedidos.'
        },
        dicas: [
          'INNER só traz quem combina.',
          'Ana tem dois pedidos.'
        ],
        explicacao: 'Os dois pedidos de Ana combinam; Bruno fica de fora. Resultado: Ana duas vezes.',
        conceitos: ['sql.inner-join']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-j3',
        tipo: 'fill-code',
        enunciado: 'Complete para trazer **todos os clientes**, com ou sem pedido.',
        codigo: 'SELECT Clientes.Nome\nFROM Clientes\n{{1}} JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;',
        lacunas: [['left']],
        dicas: [
          'Preserve a tabela da esquerda.',
          'Quatro letras.'
        ],
        explicacao: '`LEFT JOIN` mantém todos os clientes; quem não tem pedido vem com valores vazios.',
        conceitos: ['sql.left-join']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-j4',
        tipo: 'multiple-choice',
        enunciado: 'Qual consulta encontra os clientes que **nunca compraram**?',
        opcoes: [
          'SELECT Clientes.Nome FROM Clientes LEFT JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id WHERE Pedidos.Id IS NULL;',
          'SELECT Clientes.Nome FROM Clientes INNER JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;',
          'SELECT Clientes.Nome FROM Clientes WHERE Pedidos.Id IS NULL;',
          'SELECT Clientes.Nome FROM Pedidos LEFT JOIN Clientes ON Pedidos.ClienteId = Clientes.Id;'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O INNER esconde justamente quem nunca comprou.',
          2: 'Sem JOIN não existe Pedidos na consulta.',
          3: 'Com Pedidos à esquerda, o LEFT preservaria os pedidos, não os clientes.'
        },
        dicas: [
          'É o padrão "esquerda menos direita".',
          'Preserve Clientes e filtre os sem par.'
        ],
        explicacao: '`LEFT JOIN` retorna todas as linhas; `WHERE ... IS NULL` fica só com quem não combinou.',
        conceitos: ['sql.left-join', 'sql.null']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-j5',
        tipo: 'order-blocks',
        enunciado: 'Ordene para montar a consulta que traz o nome do produto de cada item.',
        blocos: [
          'SELECT Produtos.Nome',
          'FROM ItensPedido',
          'JOIN Produtos ON ItensPedido.ProdutoId = Produtos.Id;'
        ],
        dicas: [
          'O FROM abre com a tabela do meio.',
          'O ON usa o par da junção.'
        ],
        explicacao: 'ItensPedido aponta para Produtos por ProdutoId: um JOIN com seu ON.',
        conceitos: ['sql.join-multiplo', 'sql.join']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-j6',
        tipo: 'find-error',
        enunciado: 'O que há de errado nesta consulta?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT c.Nome\nFROM Clientes AS c\nJOIN Pedidos AS p ON p.ClienteId = Clientes.Id;' }
        ],
        opcoes: [
          'Misturou alias com nome original: deveria ser c.Id, não Clientes.Id',
          'Falta o INNER antes do JOIN',
          'Alias precisa de aspas',
          'Nada — a consulta está correta'
        ],
        correta: 0,
        feedbackErro: {
          1: 'JOIN sozinho já é INNER; escrever INNER é opcional.',
          2: 'Alias não usa aspas.',
          3: 'Depois de AS c, o banco espera c, não Clientes.'
        },
        dicas: [
          'O alias substitui o nome.',
          'Confira o ON com atenção.'
        ],
        explicacao: 'Com alias `c`, todo o resto da consulta deve usar `c` — inclusive no `ON`.',
        conceitos: ['sql.aliases', 'sql.join']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-j7',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna **nome do cliente e valor** dos pedidos, só de pedidos acima de 100.',
        respostasAceitas: [
          'select clientes.nome, pedidos.valortotal from clientes inner join pedidos on pedidos.clienteid = clientes.id where pedidos.valortotal > 100',
          'select clientes.nome, pedidos.valortotal from clientes join pedidos on pedidos.clienteid = clientes.id where pedidos.valortotal > 100'
        ],
        dicas: [
          'JOIN com ON, depois WHERE.',
          'Prefixe ValorTotal com a tabela.'
        ],
        explicacao: 'Junta pelo `ON` e filtra pelo `WHERE`: as duas cláusulas têm papéis diferentes.',
        conceitos: ['sql.inner-join', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-j8',
        tipo: 'true-false',
        enunciado: 'Avalie as afirmações sobre JOINs.',
        afirmacoes: [
          { texto: 'Todo JOIN precisa de um ON com a condição da junção.', correta: true, explicacao: 'Sem ON não há como encaixar as tabelas.' },
          { texto: 'RIGHT JOIN mantém todas as linhas da tabela da esquerda.', correta: false, explicacao: 'RIGHT preserva a direita; quem preserva a esquerda é o LEFT.' },
          { texto: 'Uma consulta pode misturar INNER e LEFT JOIN.', correta: true, explicacao: 'Cada JOIN guarda seu tipo; a leitura é um por vez.' }
        ],
        dicas: [
          'ON é obrigatório.',
          'O lado nomeado é o lado preservado.'
        ],
        explicacao: 'ON sempre; LEFT preserva a esquerda e RIGHT a direita; tipos diferentes podem se misturar.',
        conceitos: ['sql.join', 'sql.left-join', 'sql.join-multiplo']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-j9',
        tipo: 'write-code',
        enunciado: 'Left join de Clientes com Pedidos filtrando ValorTotal acima de 200.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          "SELECT Clientes.Nome, Pedidos.ValorTotal FROM Clientes LEFT JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id WHERE Pedidos.ValorTotal > 200;"
        ],
        dicas: [
          'LEFT JOIN preserva os clientes.',
          'O WHERE filtra o resultado montado.'
        ],
        explicacao: '`SELECT Clientes.Nome, Pedidos.ValorTotal FROM Clientes LEFT JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id WHERE Pedidos.ValorTotal > 200;`.',
        conceitos: ['sql.left-join', 'sql.where', 'sql.ingles']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-j10',
        tipo: 'scenario',
        enunciado: 'O relatório de itens vendidos precisa do nome do cliente e do nome do produto. Por onde começar?',
        cena: 'ItensPedido aponta para Pedidos (PedidoId) e para Produtos (ProdutoId). Pedidos aponta para Clientes (ClienteId).',
        opcoes: [
          'Partir de ItensPedido e juntar Pedidos, Clientes e Produtos, um ON por par',
          'Juntar Clientes com Produtos direto, sem passar por Pedidos',
          'Ler as quatro tabelas separadas e juntar na mão',
          'Usar um único JOIN com três ONs encadeados'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Clientes e Produtos não têm vínculo direto.',
          2: 'O banco junta; fazer na mão não escala.',
          3: 'Cada JOIN tem exatamente um ON.'
        },
        dicas: [
          'Siga as chaves estrangeiras.',
          'Três junções, três ONs.'
        ],
        explicacao: 'O caminho segue os vínculos: ItensPedido → Pedidos → Clientes e ItensPedido → Produtos, um `ON` por par.',
        conceitos: ['sql.join-multiplo', 'sql.chave-estrangeira']
      }
    }
  ]
});
