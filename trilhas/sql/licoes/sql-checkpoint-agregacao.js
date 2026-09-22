Plataforma.registrarLicao({
  id: 'sql-checkpoint-agregacao',
  trilha: 'sql',
  tipo: 'prova',
  titulo: 'Checkpoint — Agregação',
  subtitulo: 'Agregação · Etapa 26',
  duracaoMin: 40,
  xp: 100,
  objetivos: [
    'Consolidar funções de agregação e GROUP BY',
    'Diferenciar WHERE de HAVING na prática',
    'Montar relatórios agregados completos'
  ],
  conceitos: ['sql.agregacao', 'sql.group-by', 'sql.having', 'sql.relatorios', 'sql.where', 'sql.order-by', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova de nível: Agregação',
      blocos: [
        { tipo: 'texto', texto: 'São **10 atividades** sobre resumo de dados: funções, grupos, filtros de grupo e relatórios. Sem nota de bloqueio — o resultado mostra o que revisar.' },
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
        id: 'cp-g1',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada função ao que ela calcula.',
        pares: [
          ['COUNT', 'Quantidade de linhas'],
          ['SUM', 'Soma dos valores'],
          ['AVG', 'Média dos valores'],
          ['MAX', 'Maior valor']
        ],
        dicas: [
          'AVG vem de average.',
          'COUNT vem de contar.'
        ],
        explicacao: 'Contar, somar, média e extremos: o kit básico de resumo.',
        conceitos: ['sql.agregacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-g2',
        tipo: 'predict-output',
        enunciado: 'Quantas linhas o resultado tem?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Produtos',
            colunas: ['Nome', 'Preco'],
            linhas: [
              ['Mouse', 99.0],
              ['Teclado', 200.0],
              ['Monitor', 200.0]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Preco, COUNT(*) AS Total\nFROM Produtos\nGROUP BY Preco;' }
        ],
        opcoes: [
          '2 linhas: uma por preço diferente',
          '3 linhas: uma por produto',
          '1 linha com o total geral',
          'Nenhuma linha'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O GROUP BY resume por preço, não por produto.',
          2: 'Com GROUP BY há uma linha por grupo.',
          3: 'Teclado e Monitor formam um grupo de preço 200.'
        },
        dicas: [
          'Conte os preços diferentes.',
          '200 aparece duas vezes.'
        ],
        explicacao: 'Dois preços diferentes (99 e 200) formam dois grupos: 2 linhas.',
        conceitos: ['sql.group-by', 'sql.agregacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-g3',
        tipo: 'multiple-choice',
        enunciado: 'Onde vai a condição "grupos com mais de 10 linhas"?',
        opcoes: [
          'No HAVING, depois do GROUP BY',
          'No WHERE, antes do GROUP BY',
          'No ORDER BY',
          'No SELECT, junto das colunas'
        ],
        correta: 0,
        dicas: [
          'Condição sobre contagem é filtro de grupo.',
          'WHERE não enxerga função agregada.'
        ],
        explicacao: 'Filtro sobre grupo é `HAVING`, depois do `GROUP BY`.',
        conceitos: ['sql.having', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-g4',
        tipo: 'fill-code',
        enunciado: 'Complete para somar vendas por cidade.',
        codigo: 'SELECT Cidade, SUM(ValorTotal) AS Total\nFROM Clientes\nJOIN Pedidos ON Pedidos.ClienteId = Clientes.Id\n{{1}} Cidade;',
        lacunas: [['group by']],
        dicas: [
          'Falta separar em grupos.',
          'Duas palavras.'
        ],
        explicacao: 'Sem `GROUP BY` a soma seria geral; com ele, uma soma por cidade.',
        conceitos: ['sql.group-by']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-g5',
        tipo: 'find-error',
        enunciado: 'O que há de errado nesta consulta?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Cidade, COUNT(*) AS Total\nFROM Clientes\nWHERE COUNT(*) > 2\nGROUP BY Cidade;' }
        ],
        opcoes: [
          'WHERE com função agregada: deveria ser HAVING',
          'Falta o JOIN com Pedidos',
          'COUNT precisa de DISTINCT',
          'Nada — a consulta está correta'
        ],
        correta: 0,
        feedbackErro: {
          1: 'JOIN não é obrigatório para agrupar Clientes.',
          2: 'DISTINCT não tem a ver com o erro.',
          3: 'O WHERE roda antes do agrupamento e não enxerga o COUNT.'
        },
        dicas: [
          'O COUNT existe em que momento?',
          'Filtro de grupo tem cláusula própria.'
        ],
        explicacao: '`COUNT(*) > 2` filtra grupos: vai no `HAVING`, depois do `GROUP BY`.',
        conceitos: ['sql.having', 'sql.group-by']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-g6',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna o **ticket médio** (média de ValorTotal) dos pedidos.',
        respostasAceitas: [
          'select avg(valortotal) as ticket from pedidos',
          'select avg(valortotal) from pedidos'
        ],
        dicas: [
          'Média é AVG.',
          'Dê um alias legível.'
        ],
        explicacao: '`SELECT AVG(ValorTotal) FROM Pedidos;` — um número resumindo a tabela inteira.',
        conceitos: ['sql.agregacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-g7',
        tipo: 'true-false',
        enunciado: 'Avalie as afirmações sobre agregação.',
        afirmacoes: [
          { texto: 'No SELECT com GROUP BY só entram a coluna do grupo e funções.', correta: true, explicacao: 'Outras colunas variam dentro do grupo e não podem aparecer soltas.' },
          { texto: 'HAVING pode ser usado sem GROUP BY na mesma consulta.', correta: false, explicacao: 'HAVING filtra grupos; sem GROUP BY não há grupos para filtrar.' },
          { texto: 'WHERE e HAVING podem aparecer na mesma consulta.', correta: true, explicacao: 'WHERE filtra linhas antes; HAVING filtra grupos depois.' }
        ],
        dicas: [
          'Pense na ordem: WHERE, GROUP BY, HAVING.',
          'Cada cláusula tem seu momento.'
        ],
        explicacao: 'SELECT com grupo só aceita coluna do grupo e funções; HAVING precisa de grupos; WHERE e HAVING convivem.',
        conceitos: ['sql.group-by', 'sql.having', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-g8',
        tipo: 'write-code',
        enunciado: 'Escreva o relatório: **total vendido por status**, só status acima de 100, do maior para o menor.',
        respostasAceitas: [
          'select status, sum(valortotal) as total from pedidos group by status having sum(valortotal) > 100 order by total desc'
        ],
        dicas: [
          'Agrupe, filtre o grupo e ordene.',
          'Use o alias no ORDER BY.'
        ],
        explicacao: 'GROUP BY resume, HAVING filtra os grupos, ORDER BY organiza: o relatório completo.',
        conceitos: ['sql.relatorios', 'sql.having', 'sql.order-by']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-g9',
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
        explicacao: 'Traduzindo: "count all orders" = conte todos os pedidos.',
        conceitos: ['sql.agregacao', 'sql.ingles']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-g10',
        tipo: 'scenario',
        enunciado: 'O gestor quer saber quais cidades compram mais. Qual consulta responde?',
        cena: 'Clientes tem Cidade; Pedidos tem ValorTotal e ClienteId. O relatório deve mostrar cidade e total, só acima de 1000, ordenado.',
        opcoes: [
          'SELECT Cidade, SUM(ValorTotal) AS Total FROM Clientes JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id GROUP BY Cidade HAVING SUM(ValorTotal) > 1000 ORDER BY Total DESC;',
          'SELECT Cidade, SUM(ValorTotal) AS Total FROM Clientes WHERE SUM(ValorTotal) > 1000 GROUP BY Cidade;',
          'SELECT Cidade FROM Clientes ORDER BY Cidade;',
          'SELECT Cidade, COUNT(*) AS Total FROM Clientes GROUP BY Cidade;'
        ],
        correta: 0,
        feedbackErro: {
          1: 'WHERE não aceita função agregada.',
          2: 'Sem junção e sem soma não há total vendido.',
          3: 'Contar cidades não mede vendas.'
        },
        dicas: [
          'Precisa juntar, somar, filtrar grupos e ordenar.',
          'Filtro de grupo é HAVING.'
        ],
        explicacao: 'O relatório completo: JOIN monta, GROUP BY resume, HAVING filtra, ORDER BY organiza.',
        conceitos: ['sql.relatorios', 'sql.join', 'sql.having']
      }
    }
  ]
});
