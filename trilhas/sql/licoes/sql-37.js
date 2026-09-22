Plataforma.registrarLicao({
  id: 'sql-37',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Consultas de estoque',
  subtitulo: 'Profissional · Etapa 43',
  duracaoMin: 60,
  xp: 30,
  objetivos: [
    'Montar alertas de estoque baixo com filtros e ordenação',
    'Cruzar estoque com vendas usando JOIN',
    'Priorizar reposição pelo giro de cada produto'
  ],
  conceitos: ['sql.estoque', 'sql.where', 'sql.order-by', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O alerta de estoque baixo',
      introduz: ['sql.estoque'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.where', texto: 'Filtro simples resolve o chamado mais comum do varejo: "o que está acabando?"' },
        { tipo: 'texto', texto: 'Consultas de **estoque** monitoram quantidades: o que está baixo, o que zerou, o que gira rápido:' },
        { tipo: 'conceito', id: 'sql.estoque', titulo: 'Consultas de estoque', texto: 'Filtros e ordenações sobre quantidades para alertar, priorizar e repor.', exemplo: 'SELECT * FROM Produtos WHERE Estoque < 10 ORDER BY Estoque;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Nome, Estoque\nFROM Produtos\nWHERE Estoque < 10\nORDER BY Estoque;'
        },
        { tipo: 'nota', tom: 'info', texto: 'O menor estoque abre a lista: quem repõe ataca o topo primeiro.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql37-a1',
        tipo: 'write-code',
        enunciado: 'Escreva o alerta: **nome e estoque** dos produtos com menos de 5 unidades, do menor para o maior.',
        respostasAceitas: [
          'select nome, estoque from produtos where estoque < 5 order by estoque',
          'select nome, estoque from produtos where estoque < 5 order by estoque asc'
        ],
        dicas: [
          'Filtre com WHERE e ordene com ORDER BY.',
          'Crescente é o padrão.'
        ],
        explicacao: 'Filtro + ordenação: o alerta nasce pronto para a reposição.',
        conceitos: ['sql.estoque', 'sql.where']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Estoque que gira',
      blocos: [
        { tipo: 'texto', texto: 'Estoque baixo de produto parado é uma coisa; de produto que vende todo dia, é emergência. Cruzar com vendas prioriza:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Produtos.Nome, Produtos.Estoque, COUNT(*) AS Vendas\nFROM Produtos\nJOIN ItensPedido ON ItensPedido.ProdutoId = Produtos.Id\nWHERE Produtos.Estoque < 10\nGROUP BY Produtos.Nome, Produtos.Estoque\nORDER BY Vendas DESC;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Pouco estoque + muitas vendas = repor já. Pouco estoque + zero vendas = revisar o mix.' },
        { tipo: 'trabalho', texto: 'Ruptura (produto em falta) é dinheiro perdido na hora. Por isso o alerta de estoque com giro roda todo dia de manhã no varejo.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql37-a2',
        tipo: 'predict-output',
        enunciado: 'Qual produto abre a lista?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Produtos',
            colunas: ['Nome', 'Estoque'],
            linhas: [
              ['Mouse', 3],
              ['Teclado', 0],
              ['Monitor', 8]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Nome, Estoque\nFROM Produtos\nWHERE Estoque < 10\nORDER BY Estoque;' }
        ],
        opcoes: [
          'Teclado, com 0',
          'Mouse, com 3',
          'Monitor, com 8',
          'Nenhum: o filtro exclui tudo'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Zero é menor que 3: Teclado abre.',
          2: 'Oito é o maior dos três.',
          3: 'Todos passam no filtro.'
        },
        dicas: [
          'Ordem crescente começa do menor.',
          'Zero conta como estoque.'
        ],
        explicacao: 'Teclado zerado abre o alerta: ruptura total.',
        conceitos: ['sql.estoque', 'sql.order-by']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql37-a3',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna produtos com **estoque zerado**.',
        respostasAceitas: [
          'select nome from produtos where estoque = 0'
        ],
        dicas: [
          'Zerado = igual a zero.',
          'Filtre com WHERE.'
        ],
        explicacao: 'Ruptura pura: `WHERE Estoque = 0`.',
        conceitos: ['sql.estoque'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Low stock',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras para o alerta: **low** (baixo) e **stock** (estoque).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['low', 'baixo'],
            ['stock', 'estoque']
          ]
        },
        { tipo: 'ingles', frase: 'Orders with low stock.', traducao: 'Pedidos com estoque baixo.' },
        { tipo: 'nota', tom: 'info', texto: '**low stock** = "estoque baixo": o coração do alerta.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql37-a4',
        tipo: 'write-code',
        enunciado: 'Orders with low stock: nomes com menos de 10 unidades.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select nome from produtos where estoque < 10'
        ],
        dicas: [
          'low stock = estoque baixo.',
          'Menos de 10.'
        ],
        explicacao: 'O alerta em SQL direto.',
        conceitos: ['sql.estoque', 'sql.ingles']
      }
    }
  ]
});
