Plataforma.registrarLicao({
  id: 'sql-21',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Relatórios de vendas reais',
  subtitulo: 'Agregação · Etapa 25',
  duracaoMin: 60,
  xp: 30,
  objetivos: [
    'Montar relatórios combinando JOIN, GROUP BY e HAVING',
    'Ordenar relatórios pelo valor agregado',
    'Ler um pedido de relatório e traduzi-lo em consulta'
  ],
  conceitos: ['sql.relatorios', 'sql.group-by', 'sql.having', 'sql.order-by', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O relatório mais pedido',
      introduz: ['sql.relatorios'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.having', texto: 'Você junta, agrupa e filtra grupos. Agora vai montar o relatório que todo gestor pede.' },
        { tipo: 'texto', texto: '"Quero o total vendido por cidade, só das cidades acima de 1000, da maior para a menor." Uma frase, quatro cláusulas:' },
        { tipo: 'conceito', id: 'sql.relatorios', titulo: 'Relatório agregado', texto: 'Consulta que combina junção, agrupamento, filtro de grupo e ordenação para responder uma pergunta de negócio.', exemplo: 'SELECT ... JOIN ... GROUP BY ... HAVING ... ORDER BY ...;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Cidade, SUM(ValorTotal) AS Total\nFROM Clientes\nJOIN Pedidos ON Pedidos.ClienteId = Clientes.Id\nGROUP BY Cidade\nHAVING SUM(ValorTotal) > 1000\nORDER BY Total DESC;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Cada cláusula responde uma parte do pedido: JOIN (de onde), GROUP BY (por quem), HAVING (quais grupos), ORDER BY (em que ordem).' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql21-a1',
        tipo: 'order-blocks',
        enunciado: 'Ordene os blocos do relatório: total por cidade acima de 500, do maior para o menor.',
        blocos: [
          'SELECT Cidade, SUM(ValorTotal) AS Total',
          'FROM Clientes JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id',
          'GROUP BY Cidade',
          'HAVING SUM(ValorTotal) > 500',
          'ORDER BY Total DESC;'
        ],
        dicas: [
          'HAVING vem depois do GROUP BY.',
          'ORDER BY fecha a consulta.'
        ],
        explicacao: 'A ordem fixa: SELECT, FROM/JOIN, GROUP BY, HAVING, ORDER BY.',
        conceitos: ['sql.relatorios', 'sql.having']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Alias no agregado',
      blocos: [
        { tipo: 'texto', texto: 'Repare que o `ORDER BY` usou `Total`, o alias da soma. Depois de nomear a coluna agregada, o resto da consulta pode chamá-la pelo apelido:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Status, COUNT(*) AS Total\nFROM Pedidos\nGROUP BY Status\nORDER BY Total DESC;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Isso deixa o `ORDER BY` legível: ordenar pelo "Total" em vez de repetir a função.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql21-a2',
        tipo: 'predict-output',
        enunciado: 'Qual é a primeira linha do resultado?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Pedidos',
            colunas: ['Status', 'ValorTotal'],
            linhas: [
              ['Pago', 100.0],
              ['Pago', 200.0],
              ['Pendente', 500.0]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Status, SUM(ValorTotal) AS Total\nFROM Pedidos\nGROUP BY Status\nORDER BY Total DESC;' }
        ],
        opcoes: [
          'Pendente, 500',
          'Pago, 300',
          'Pago, 200',
          'Pendente, 100'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Pago soma 100 + 200 = 300, menos que os 500 de Pendente.',
          2: 'Some os dois pedidos Pagos antes de comparar.',
          3: 'Pendente tem um pedido só, de 500.'
        },
        dicas: [
          'Some por grupo primeiro.',
          'DESC coloca o maior Total no topo.'
        ],
        explicacao: 'Pago soma 300; Pendente soma 500. Em ordem decrescente, Pendente abre o relatório.',
        conceitos: ['sql.relatorios', 'sql.order-by']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql21-a3',
        tipo: 'write-code',
        enunciado: 'Escreva o relatório: **quantidade de pedidos por status**, só status com mais de 1 pedido.',
        respostasAceitas: [
          'SELECT Status, COUNT(*) AS Total FROM Pedidos GROUP BY Status HAVING COUNT(*) > 1;',
          'SELECT Status, COUNT(*) FROM Pedidos GROUP BY Status HAVING COUNT(*) > 1;'
        ],
        dicas: [
          'Agrupe por Status e conte.',
          'Filtre o grupo com HAVING.'
        ],
        explicacao: '`SELECT Status, COUNT(*) FROM Pedidos GROUP BY Status HAVING COUNT(*) > 1;`.',
        conceitos: ['sql.relatorios', 'sql.having'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Sem palavra nova',
      blocos: [
        { tipo: 'texto', texto: 'Nada novo aqui: o relatório em inglês usa só o que você já sabe.' },
        { tipo: 'ingles', frase: 'Join orders and products.', traducao: 'Junte pedidos e produtos.' },
        { tipo: 'trabalho', texto: 'Relatório agregado com JOIN + GROUP BY + HAVING + ORDER BY é o formato de 8 em cada 10 pedidos de dados no trabalho. Dominar essa forma cobre a maioria dos chamados.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql21-a4',
        tipo: 'write-code',
        enunciado: 'Join orders and products, contando itens por produto.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select produtos.nome, count(*) as total from itenspedido join produtos on itenspedido.produtoid = produtos.id group by produtos.nome'
        ],
        dicas: [
          'Junte ItensPedido com Produtos.',
          'Agrupe pelo nome do produto.'
        ],
        explicacao: 'Junta, agrupa por produto e conta: quantos itens vendidos de cada um.',
        conceitos: ['sql.relatorios', 'sql.ingles']
      }
    }
  ]
});
