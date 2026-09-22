Plataforma.registrarLicao({
  id: 'sql-16',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Múltiplos JOINs',
  subtitulo: 'Relacionamentos · Etapa 19',
  duracaoMin: 60,
  xp: 30,
  objetivos: [
    'Encadear dois ou mais JOINs na mesma consulta',
    'Ler o caminho da junção tabela por tabela',
    'Combinar tipos diferentes de JOIN'
  ],
  conceitos: ['sql.join-multiplo', 'sql.join', 'sql.left-join', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Três tabelas, dois JOINs',
      introduz: ['sql.join-multiplo'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.join', texto: 'Você junta duas tabelas com `JOIN ... ON`. Perguntas reais costumam atravessar **três ou mais**.' },
        { tipo: 'texto', texto: '"Quero o nome do cliente e o nome do produto de cada item vendido." Cliente está em Clientes, produto em Produtos, e a venda em ItensPedido — que aponta para os dois. A consulta encadeia dois `JOINs`:' },
        { tipo: 'conceito', id: 'sql.join-multiplo', titulo: 'Múltiplos JOINs', texto: 'Cada JOIN adiciona uma tabela ao resultado, com seu próprio ON. A ordem segue o caminho do relacionamento.', exemplo: 'SELECT * FROM ItensPedido JOIN Pedidos ON ... JOIN Clientes ON ...;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Clientes.Nome, Produtos.Nome\nFROM ItensPedido\nJOIN Pedidos ON ItensPedido.PedidoId = Pedidos.Id\nJOIN Clientes ON Pedidos.ClienteId = Clientes.Id\nJOIN Produtos ON ItensPedido.ProdutoId = Produtos.Id;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Leia de cima para baixo como um caminho: ItensPedido → Pedidos → Clientes, e ItensPedido → Produtos. Cada `ON` usa as chaves do par que está juntando.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql16-a1',
        tipo: 'order-blocks',
        enunciado: 'Ordene os blocos para montar a consulta que traz o nome do cliente de cada item vendido.',
        blocos: [
          'SELECT Clientes.Nome',
          'FROM ItensPedido',
          'JOIN Pedidos ON ItensPedido.PedidoId = Pedidos.Id',
          'JOIN Clientes ON Pedidos.ClienteId = Clientes.Id;'
        ],
        dicas: [
          'O FROM abre com a tabela do meio.',
          'Cada JOIN precisa do seu ON.'
        ],
        explicacao: 'ItensPedido aponta para Pedidos, que aponta para Clientes. Dois JOINs, dois ONs, um caminho só.',
        conceitos: ['sql.join-multiplo']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O ON de cada par',
      blocos: [
        { tipo: 'texto', texto: 'O erro mais comum é copiar o `ON` errado. Cada junção tem sua própria condição, usando as colunas **daquele par**:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Produtos.Nome, Pedidos.Id\nFROM Produtos\nJOIN ItensPedido ON ItensPedido.ProdutoId = Produtos.Id\nJOIN Pedidos ON ItensPedido.PedidoId = Pedidos.Id;'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'O primeiro `ON` fala de ProdutoId (par Produtos–ItensPedido); o segundo fala de PedidoId (par ItensPedido–Pedidos). Trocar os dois quebra a lógica.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql16-a2',
        tipo: 'find-error',
        enunciado: 'Esta consulta com dois JOINs foi recusada. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Clientes.Nome\nFROM ItensPedido\nJOIN Pedidos ON ItensPedido.PedidoId = Pedidos.Id\nJOIN Clientes ON ItensPedido.ProdutoId = Clientes.Id;' }
        ],
        opcoes: [
          'O segundo ON usa a coluna errada: ProdutoId não aponta para Clientes',
          'Falta um terceiro JOIN',
          'JOIN não aceita três tabelas',
          'Nada — a consulta está correta'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Dois JOINs bastam para três tabelas.',
          2: 'JOIN aceita quantas tabelas o caminho pedir.',
          3: 'ProdutoId aponta para Produtos, não para Clientes.'
        },
        dicas: [
          'Confira para onde cada chave estrangeira aponta.',
          'ProdutoId é par de quem?'
        ],
        explicacao: 'ItensPedido.ProdutoId aponta para Produtos.Id, não para Clientes.Id. O ON correto do segundo JOIN usa Pedidos.ClienteId = Clientes.Id.',
        conceitos: ['sql.join-multiplo', 'sql.chave-estrangeira']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql16-a3',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna o **nome do produto** de cada item vendido (tabela ItensPedido com ProdutoId).',
        respostasAceitas: [
          'select produtos.nome from itenspedido join produtos on itenspedido.produtoid = produtos.id'
        ],
        dicas: [
          'ItensPedido aponta para Produtos por ProdutoId.',
          'Um JOIN com seu ON resolve.'
        ],
        explicacao: '`SELECT Produtos.Nome FROM ItensPedido JOIN Produtos ON ItensPedido.ProdutoId = Produtos.Id;`.',
        conceitos: ['sql.join-multiplo', 'sql.join']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Misturando INNER e LEFT',
      blocos: [
        { tipo: 'texto', texto: 'Os tipos podem se misturar: um `INNER` onde o par é obrigatório e um `LEFT` onde pode faltar. Exemplo: itens com produto obrigatório, mas cliente opcional:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Produtos.Nome, Clientes.Nome\nFROM ItensPedido\nJOIN Produtos ON ItensPedido.ProdutoId = Produtos.Id\nLEFT JOIN Pedidos ON ItensPedido.PedidoId = Pedidos.Id\nLEFT JOIN Clientes ON Pedidos.ClienteId = Clientes.Id;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Cada `JOIN` guarda seu tipo. Leia um por vez: o primeiro exige o produto; os outros dois preservam mesmo sem par.' },
        { tipo: 'trabalho', texto: 'Relatórios que atravessam 3 ou 4 tabelas são rotina em e-commerce: item → pedido → cliente → produto. Desenhar o caminho antes de escrever evita ON trocado.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql16-a4',
        tipo: 'multiple-choice',
        enunciado: 'Na consulta do exemplo misto, o que acontece com um item cujo pedido foi excluído?',
        opcoes: [
          'O item continua no resultado, com cliente vazio',
          'O item some do resultado',
          'O produto some do resultado',
          'A consulta retorna erro'
        ],
        correta: 0,
        dicas: [
          'O primeiro JOIN é INNER; os outros são LEFT.',
          'O item combina com o produto?'
        ],
        explicacao: 'O `INNER` com Produtos segura o item; os dois `LEFT` seguintes preservam a linha mesmo sem pedido nem cliente.',
        conceitos: ['sql.join-multiplo', 'sql.left-join', 'sql.inner-join']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Três tabelas',
      blocos: [
        { tipo: 'texto', texto: 'Uma palavra nova para a terceira tabela: **product** (produto).' },
        {
          tipo: 'vocab',
          titulo: 'Palavra nova (1)',
          pares: [
            ['product', 'produto']
          ]
        },
        { tipo: 'ingles', frase: 'Join customers, orders and products.', traducao: 'Junte clientes, pedidos e produtos.' },
        { tipo: 'nota', tom: 'info', texto: 'A frase cresce junto com a consulta: dois `JOINs` para três tabelas.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql16-a5',
        tipo: 'write-code',
        enunciado: 'Join customers, orders and products.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select clientes.nome, pedidos.id, produtos.nome from itenspedido join pedidos on itenspedido.pedidoid = pedidos.id join clientes on pedidos.clienteid = clientes.id join produtos on itenspedido.produtoid = produtos.id'
        ],
        dicas: [
          'Dois JOINs para Clientes e um para Produtos.',
          'Cada ON usa o par da sua junção.'
        ],
        explicacao: 'Traduzindo: junte clientes, pedidos e produtos. Três `JOINs` partindo de ItensPedido, cada um com seu `ON`.',
        conceitos: ['sql.join-multiplo', 'sql.ingles'],
        desafio: true
      }
    }
  ]
});
