Plataforma.registrarLicao({
  id: 'sql-checkpoint-intermediario',
  trilha: 'sql',
  tipo: 'prova',
  titulo: 'Checkpoint — Intermediário',
  subtitulo: 'Intermediário · Etapa 34',
  duracaoMin: 50,
  xp: 100,
  objetivos: [
    'Consolidar subqueries, CTEs e CASE',
    'Combinar UNION, EXISTS e funções',
    'Ler consultas intermediárias completas'
  ],
  conceitos: ['sql.subquery', 'sql.cte', 'sql.case', 'sql.union', 'sql.exists', 'sql.datas', 'sql.strings', 'sql.where', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova de nível: Intermediário',
      blocos: [
        { tipo: 'texto', texto: 'São **10 atividades** sobre o nível Intermediário: consultas aninhadas, CTEs, classificação, uniões, existência e funções. Sem nota de bloqueio.' },
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
        id: 'cp-i1',
        tipo: 'multiple-choice',
        enunciado: 'Qual é a diferença prática entre subquery e CTE?',
        opcoes: [
          'A CTE nomeia o resultado intermediário; a subquery aninha entre parênteses',
          'A CTE cria tabela permanente; a subquery não',
          'Subquery só funciona com JOIN',
          'Não há diferença prática'
        ],
        correta: 0,
        dicas: [
          'Pense em legibilidade.',
          'Uma tem nome, a outra tem parênteses.'
        ],
        explicacao: 'Mesmo poder, escrita diferente: CTE nomeia com WITH; subquery aninha. Nada é criado no banco.',
        conceitos: ['sql.subquery', 'sql.cte']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i2',
        tipo: 'fill-code',
        enunciado: 'Complete a CTE de pedidos acima de 100.',
        codigo: '{{1}} Altos AS (\n  SELECT * FROM Pedidos WHERE ValorTotal > 100\n)\nSELECT COUNT(*) AS Total FROM Altos;',
        lacunas: [['with']],
        dicas: [
          'A palavra que abre a definição nomeada.',
          'Quatro letras.'
        ],
        explicacao: '`WITH Altos AS (...)` define; o SELECT final usa o nome.',
        conceitos: ['sql.cte']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i3',
        tipo: 'predict-output',
        enunciado: 'O que aparece em Faixa para um produto de 150?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: "SELECT Nome,\n       CASE WHEN Preco > 500 THEN 'Caro'\n            WHEN Preco > 100 THEN 'Médio'\n            ELSE 'Barato' END AS Faixa\nFROM Produtos;" }
        ],
        opcoes: [
          'Médio',
          'Caro',
          'Barato',
          '150'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Caro exige mais de 500.',
          2: '150 passa do segundo WHEN.',
          3: 'A coluna mostra o texto, não o número.'
        },
        dicas: [
          'O CASE para no primeiro WHEN verdadeiro.',
          '150 > 500? 150 > 100?'
        ],
        explicacao: 'Falha no primeiro, passa no segundo: Médio.',
        conceitos: ['sql.case']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i4',
        tipo: 'multiple-choice',
        enunciado: 'Quando usar UNION ALL em vez de UNION?',
        opcoes: [
          'Quando não há repetidos ou eles não importam, por ser mais rápido',
          'Quando as colunas são incompatíveis',
          'Quando precisa ordenar o resultado',
          'Quando há apenas uma tabela'
        ],
        correta: 0,
        dicas: [
          'Pense no custo da deduplicação.',
          'ALL pula uma verificação.'
        ],
        explicacao: '`UNION ALL` empilha sem verificar repetidos: mais rápido quando a dedup é desnecessária.',
        conceitos: ['sql.union']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i5',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna o **nome dos clientes sem pedido** usando NOT EXISTS.',
        respostasAceitas: [
          'select nome from clientes where not exists (select 1 from pedidos where pedidos.clienteid = clientes.id)'
        ],
        dicas: [
          'NOT EXISTS inverte a verificação.',
          'Ligue as chaves na interna.'
        ],
        explicacao: 'Sem par na subquery, o cliente entra no resultado.',
        conceitos: ['sql.exists']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i6',
        tipo: 'multiple-choice',
        enunciado: 'Qual consulta traz pedidos dos últimos 30 dias?',
        opcoes: [
          'SELECT * FROM Pedidos WHERE DataPedido > DATEADD(day, -30, GETDATE());',
          'SELECT * FROM Pedidos WHERE DataPedido = DATEADD(day, -30, GETDATE());',
          'SELECT * FROM Pedidos WHERE DAY(DataPedido) > 30;',
          'SELECT * FROM Pedidos WHERE DataPedido > 30;'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Igualdade traria só o dia exato de 30 dias atrás.',
          2: 'DAY extrai o dia do mês, não compara datas.',
          3: 'Data não se compara com número puro.'
        },
        dicas: [
          'Últimos 30 dias = intervalo, não igualdade.',
          'Desloque a data atual para trás.'
        ],
        explicacao: 'Data maior que hoje menos 30 dias: o intervalo dos últimos 30 dias.',
        conceitos: ['sql.datas', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i7',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna **nomes em maiúsculas** dos clientes de Curitiba.',
        respostasAceitas: [
          "select upper(nome) as nome from clientes where cidade = 'curitiba'",
          "select upper(nome) from clientes where cidade = 'curitiba'"
        ],
        dicas: [
          'UPPER padroniza a caixa.',
          'Filtre a cidade com WHERE.'
        ],
        explicacao: 'Função no SELECT, filtro no WHERE: cada cláusula no seu papel.',
        conceitos: ['sql.strings', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i8',
        tipo: 'true-false',
        enunciado: 'Avalie as afirmações.',
        afirmacoes: [
          { texto: 'Toda CTE precisa ser usada pelo SELECT que vem depois dela.', correta: true, explicacao: 'Definir sem usar não faz sentido — e o WITH exige o SELECT seguinte.' },
          { texto: 'CASE avalia os WHENs em ordem e para no primeiro verdadeiro.', correta: true, explicacao: 'A ordem dos WHENs define as faixas.' },
          { texto: 'EXISTS devolve os valores encontrados pela subquery.', correta: false, explicacao: 'EXISTS devolve só verdadeiro/falso; valores são trabalho do IN.' }
        ],
        dicas: [
          'WITH pede o SELECT seguinte.',
          'EXISTS não retorna dados.'
        ],
        explicacao: 'CTE pede uso, CASE respeita ordem, EXISTS só verifica existência.',
        conceitos: ['sql.cte', 'sql.case', 'sql.exists']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i9',
        tipo: 'write-code',
        enunciado: 'Filter orders by date: pedidos do ano 2026.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select * from pedidos where year(datapedido) = 2026'
        ],
        dicas: [
          'YEAR extrai o ano.',
          'Compare com 2026.'
        ],
        explicacao: '`SELECT * FROM Pedidos WHERE YEAR(DataPedido) = 2026;`.',
        conceitos: ['sql.datas', 'sql.ingles']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i10',
        tipo: 'scenario',
        enunciado: 'O relatório mensal precisa, por cidade: total de clientes, ticket médio e uma faixa (Quente acima de 1000, senão Frio). Qual estrutura resolve?',
        cena: 'Clientes tem Cidade; Pedidos tem ValorTotal e ClienteId. O relatório agrupa por cidade e classifica o total.',
        opcoes: [
          'JOIN + GROUP BY com SUM e AVG, e CASE sobre a soma para a faixa',
          'Apenas SELECT com WHERE por cidade',
          'UNION de uma consulta por cidade',
          'DELETE dos grupos pequenos e SELECT do resto'
        ],
        correta: 0,
        feedbackErro: {
          1: 'WHERE filtra linhas, não monta o relatório.',
          2: 'Uma consulta por cidade não escala.',
          3: 'Apagar dados para fazer relatório é inaceitável.'
        },
        dicas: [
          'Agrupe e resuma primeiro.',
          'A faixa nasce de uma condição sobre o total.'
        ],
        explicacao: 'GROUP BY com SUM/AVG monta os números; CASE classifica; tudo numa consulta só.',
        conceitos: ['sql.case', 'sql.group-by', 'sql.agregacao']
      }
    }
  ]
});
