Plataforma.registrarLicao({
  id: 'sql-18',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'COUNT, SUM, AVG, MIN e MAX',
  subtitulo: 'Agregação · Etapa 22',
  duracaoMin: 50,
  xp: 30,
  objetivos: [
    'Resumir muitas linhas em um número com funções de agregação',
    'Contar linhas com COUNT e somar valores com SUM',
    'Ler médias, mínimos e máximos com AVG, MIN e MAX'
  ],
  conceitos: ['sql.agregacao', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'De muitas linhas a um número',
      introduz: ['sql.agregacao'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.select', texto: 'Até agora cada linha do resultado era uma linha da tabela. Agora você vai **resumir** a tabela inteira em números.' },
        { tipo: 'texto', texto: 'Funções de **agregação** recebem uma coluna e devolvem um único valor: quantas linhas, qual a soma, qual a média:' },
        { tipo: 'conceito', id: 'sql.agregacao', titulo: 'Agregação', texto: 'Funções que resumem uma coluna em um valor: COUNT conta, SUM soma, AVG tira a média, MIN e MAX pegam os extremos.', exemplo: 'SELECT COUNT(*) FROM Pedidos;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT COUNT(*) AS TotalPedidos\nFROM Pedidos;'
        },
        { tipo: 'nota', tom: 'info', texto: '`COUNT(*)` conta linhas. O asterisco aqui significa "as linhas", não "as colunas".' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql18-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que `SELECT COUNT(*) FROM Pedidos;` devolve?',
        opcoes: [
          'A quantidade de linhas da tabela Pedidos',
          'A soma dos valores dos pedidos',
          'A lista de todos os pedidos',
          'O valor do pedido mais caro'
        ],
        correta: 0,
        dicas: [
          'COUNT vem de contar.',
          'O resultado é um número só.'
        ],
        explicacao: '`COUNT(*)` resume a tabela inteira em um número: quantas linhas existem.',
        conceitos: ['sql.agregacao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Somando e tirando a média',
      blocos: [
        { tipo: 'texto', texto: '`SUM` (soma) e `AVG` (média, de average) trabalham sobre uma coluna numérica:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT SUM(ValorTotal) AS TotalVendido,\n       AVG(ValorTotal) AS TicketMedio\nFROM Pedidos;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Cada função vira uma coluna do resultado. O alias (`AS TotalVendido`) dá nome legível ao número.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql18-a2',
        tipo: 'fill-code',
        enunciado: 'Complete para somar o valor de todos os pedidos.',
        codigo: 'SELECT {{1}}(ValorTotal) AS TotalVendido\nFROM Pedidos;',
        lacunas: [['sum']],
        dicas: [
          'É a função de soma.',
          'Três letras.'
        ],
        explicacao: '`SUM(ValorTotal)` soma a coluna inteira em um único número.',
        conceitos: ['sql.agregacao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Mínimo e máximo',
      blocos: [
        { tipo: 'texto', texto: '`MIN` pega o menor valor e `MAX` o maior — funcionam com números e com textos (ordem alfabética):' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT MIN(Preco) AS MaisBarato,\n       MAX(Preco) AS MaisCaro\nFROM Produtos;'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Agregação sem filtro resume a **tabela inteira**. Com `WHERE`, ela resume só as linhas filtradas — os dois combinam.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql18-a3',
        tipo: 'predict-output',
        enunciado: 'O que esta consulta devolve?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Produtos',
            colunas: ['Nome', 'Preco'],
            linhas: [
              ['Mouse', 99.0],
              ['Teclado', 200.0],
              ['Monitor', 900.0]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT MAX(Preco) AS MaisCaro\nFROM Produtos\nWHERE Preco < 500;' }
        ],
        opcoes: [
          '200',
          '900',
          '99',
          '500'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O WHERE filtra antes: o Monitor (900) fica de fora.',
          2: 'MAX pega o maior entre os filtrados, não o menor.',
          3: '500 é o limite do filtro, não um preço da tabela.'
        },
        dicas: [
          'O WHERE age primeiro.',
          'Entre 99 e 200, o maior é 200.'
        ],
        explicacao: 'O `WHERE` deixa Mouse e Teclado; o `MAX` pega 200. Filtro antes, resumo depois.',
        conceitos: ['sql.agregacao', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql18-a4',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna a **quantidade de clientes ativos**.',
        respostasAceitas: [
          'select count(*) as total from clientes where ativo = 1',
          'select count(*) from clientes where ativo = 1'
        ],
        dicas: [
          'COUNT(*) conta linhas.',
          'Filtre os ativos com WHERE.'
        ],
        explicacao: '`SELECT COUNT(*) FROM Clientes WHERE Ativo = 1;` — filtra primeiro, conta depois.',
        conceitos: ['sql.agregacao', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql18-a5',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada função ao que ela calcula.',
        pares: [
          ['COUNT', 'Quantidade de linhas'],
          ['SUM', 'Soma dos valores'],
          ['AVG', 'Média dos valores'],
          ['MIN', 'Menor valor']
        ],
        dicas: [
          'AVG vem de average (média).',
          'COUNT vem de contar.'
        ],
        explicacao: 'As quatro funções cobrem o resumo básico: contar, somar, média e extremos.',
        conceitos: ['sql.agregacao'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Count',
      blocos: [
        { tipo: 'texto', texto: 'Sem palavra nova: a frase usa só o que você já sabe — e a palavra **count** (contar) você já usa no SQL.' },
        { tipo: 'ingles', frase: 'Count all orders.', traducao: 'Conte todos os pedidos.' },
        { tipo: 'nota', tom: 'info', texto: '**count** = "conte". A frase inteira vira `SELECT COUNT(*) FROM Pedidos;`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql18-a6',
        tipo: 'write-code',
        enunciado: 'Count all orders.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select count(*) as total from pedidos',
          'select count(*) from pedidos'
        ],
        dicas: [
          'count = conte; orders = pedidos.',
          'COUNT(*) conta as linhas.'
        ],
        explicacao: 'Traduzindo: "count all orders" = conte todos os pedidos. `SELECT COUNT(*) FROM Pedidos;`.',
        conceitos: ['sql.agregacao', 'sql.ingles']
      }
    }
  ]
});
