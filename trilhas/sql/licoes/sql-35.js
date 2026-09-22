Plataforma.registrarLicao({
  id: 'sql-35',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Window functions',
  subtitulo: 'Avançado · Etapa 41',
  duracaoMin: 60,
  xp: 30,
  objetivos: [
    'Rankear linhas com ROW_NUMBER e OVER',
    'Particionar o ranking com PARTITION BY',
    'Comparar cada linha com o total usando janelas'
  ],
  conceitos: ['sql.window', 'sql.order-by', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Ranking sem resumir',
      introduz: ['sql.window'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.group-by', texto: 'O `GROUP BY` resume e esconde as linhas. Mas e para numerar as linhas **sem** escondê-las?' },
        { tipo: 'texto', texto: 'Uma **window function** (função de janela) calcula sobre um conjunto de linhas mantendo cada linha no resultado. A mais usada numera:' },
        { tipo: 'conceito', id: 'sql.window', titulo: 'Window function', texto: 'Função com OVER que calcula sobre uma janela de linhas sem resumir o resultado.', exemplo: 'ROW_NUMBER() OVER (ORDER BY Preco DESC)' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Nome, Preco,\n       ROW_NUMBER() OVER (ORDER BY Preco DESC) AS Posicao\nFROM Produtos;'
        },
        {
          tipo: 'tabela',
          titulo: 'Resultado',
          colunas: ['Nome', 'Preco', 'Posicao'],
          linhas: [
            ['Monitor', 900.0, 1],
            ['Teclado', 200.0, 2],
            ['Mouse', 100.0, 3]
          ]
        },
        { tipo: 'nota', tom: 'info', texto: 'O `OVER` define a janela e a ordem do ranking. As linhas continuam todas lá — agora numeradas.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql35-a1',
        tipo: 'predict-output',
        enunciado: 'Qual é a Posicao do Teclado?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Nome,\n       ROW_NUMBER() OVER (ORDER BY Preco DESC) AS Posicao\nFROM Produtos;' }
        ],
        opcoes: [
          '2',
          '1',
          '3',
          '200'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O mais caro (Monitor) fica com 1.',
          2: 'A posição conta a ordem, não o preço.',
          3: 'Posicao é o ranking, não o valor.'
        },
        dicas: [
          'DESC: maior preço primeiro.',
          'Teclado é o do meio.'
        ],
        explicacao: 'Monitor 1, Teclado 2, Mouse 3: o ranking segue o preço decrescente.',
        conceitos: ['sql.window', 'sql.order-by']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Ranking por grupo com PARTITION BY',
      blocos: [
        { tipo: 'texto', texto: 'O `PARTITION BY` (particione por) reinicia a contagem para cada grupo — como um `GROUP BY` que não esconde linhas:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Cidade, Nome,\n       ROW_NUMBER() OVER (PARTITION BY Cidade ORDER BY Nome) AS Posicao\nFROM Clientes;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Cada cidade tem seu próprio 1, 2, 3... Para "o top 3 de cada categoria", filtre `WHERE Posicao <= 3` numa CTE por fora.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql35-a2',
        tipo: 'multiple-choice',
        enunciado: 'O que o PARTITION BY faz no OVER?',
        opcoes: [
          'Reinicia a numeração para cada grupo',
          'Ordena o resultado final',
          'Filtra os grupos pequenos',
          'Remove linhas repetidas'
        ],
        correta: 0,
        dicas: [
          'Pense em "top N por categoria".',
          'Cada partição tem sua sequência.'
        ],
        explicacao: '`PARTITION BY` divide a janela em grupos independentes, cada um com sua numeração.',
        conceitos: ['sql.window']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql35-a3',
        tipo: 'fill-code',
        enunciado: 'Complete para numerar produtos do mais caro ao mais barato.',
        codigo: 'SELECT Nome,\n       ROW_NUMBER() {{1}} (ORDER BY Preco DESC) AS Posicao\nFROM Produtos;',
        lacunas: [['over']],
        dicas: [
          'A palavra que abre a janela.',
          'Quatro letras.'
        ],
        explicacao: '`OVER` introduz a janela onde a função calcula.',
        conceitos: ['sql.window']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql35-a4',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que numera os **pedidos do maior para o menor valor**.',
        respostasAceitas: [
          'select id, row_number() over (order by valortotal desc) as posicao from pedidos'
        ],
        dicas: [
          'ROW_NUMBER() OVER (...) com ORDER BY.',
          'Maior primeiro = DESC.'
        ],
        explicacao: 'Cada pedido ganha sua posição no ranking de valores.',
        conceitos: ['sql.window', 'sql.order-by'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Window',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras para as janelas: **window** (janela) e **rank** (classificação).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['window', 'janela'],
            ['rank', 'classificação']
          ]
        },
        { tipo: 'ingles', frase: 'Window ranks rows.', traducao: 'Janela classifica linhas.' },
        { tipo: 'trabalho', texto: '"Top 3 por categoria", "última compra de cada cliente", "posição no ranking": window functions resolvem o que GROUP BY sozinho não alcança.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql35-a5',
        tipo: 'write-code',
        enunciado: 'Window ranks rows: numere os produtos por preço decrescente.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select nome, row_number() over (order by preco desc) as posicao from produtos'
        ],
        dicas: [
          'ROW_NUMBER() OVER com ORDER BY Preco DESC.',
          'Apelide de Posicao.'
        ],
        explicacao: 'O ranking nasce dentro do OVER, sem resumir nada.',
        conceitos: ['sql.window', 'sql.ingles']
      }
    }
  ]
});
