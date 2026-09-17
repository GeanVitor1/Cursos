Plataforma.registrarLicao({
  id: 'sql-08',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Limitando resultados (TOP e LIMIT)',
  subtitulo: 'Iniciante · Etapa 3',
  duracaoMin: 30,
  xp: 30,
  objetivos: [
    'Limitar a quantidade de linhas com TOP e LIMIT',
    'Entender por que limitar sem ORDER BY é arriscado',
    'Combinar limites com ordenação'
  ],
  conceitos: ['sql.limite', 'sql.order-by', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Só as primeiras linhas',
      introduz: ['sql.limite'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.order-by', texto: 'Você já ordena o resultado com `ORDER BY`. Agora vai aprender a pedir **apenas uma parte** dele.' },
        { tipo: 'texto', texto: 'Muitas perguntas de trabalho são do tipo "quais são os 3 mais caros?". Para isso, o resultado é limitado. O comando muda de banco para banco:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT TOP 3 Nome, Preco\nFROM Produtos\nORDER BY Preco DESC;',
          legenda: 'SQL Server: TOP logo depois do SELECT.'
        },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Nome, Preco\nFROM Produtos\nORDER BY Preco DESC\nLIMIT 3;',
          legenda: 'MySQL e PostgreSQL: LIMIT no final.'
        },
        { tipo: 'nota', tom: 'info', texto: '`TOP` e `LIMIT` fazem o mesmo em bancos diferentes. Use o do banco do seu projeto — e saiba ler os dois.' },
        { tipo: 'conceito', id: 'sql.limite', titulo: 'Limitar resultados', texto: 'Limita quantas linhas o resultado devolve: TOP (SQL Server) e LIMIT (MySQL e PostgreSQL).', exemplo: 'SELECT TOP 3 * FROM Produtos ORDER BY Preco DESC;' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql08-a1',
        tipo: 'multiple-choice',
        enunciado: 'Qual consulta retorna os **3 produtos mais caros** em um banco SQL Server?',
        opcoes: [
          'SELECT TOP 3 Nome, Preco FROM Produtos ORDER BY Preco DESC;',
          'SELECT 3 Nome, Preco FROM Produtos ORDER BY Preco ASC;',
          'SELECT Nome, Preco FROM Produtos WHERE Preco > 3;',
          'SELECT Nome, Preco FROM Produtos LIMIT 3;'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O número 3 não é TOP, e a ordem crescente traria os mais baratos.',
          2: 'Preco > 3 filtra por preço, não por quantidade de linhas.',
          3: 'LIMIT é de MySQL e PostgreSQL, não do SQL Server.'
        },
        dicas: [
          'No SQL Server, a quantidade vem com TOP.',
          'Mais caros pede ordem decrescente.'
        ],
        explicacao: '`SELECT TOP 3 ... ORDER BY Preco DESC` junta a quantidade (TOP 3) com o critério (maior preço primeiro).',
        conceitos: ['sql.limite', 'sql.order-by']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Limite sem ordem é sorteio',
      blocos: [
        { tipo: 'texto', texto: 'Esta consulta é legal, mas imprevisível: ela devolve 3 produtos quaisquer, na ordem que o banco quiser.' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT TOP 3 Nome, Preco\nFROM Produtos;'
        },
        { tipo: 'nota', tom: 'atencao', texto: '`TOP` sem `ORDER BY` escolhe **quais linhas** de forma arbitrária. "Os 3 mais caros" só existe quando existe a ordenação.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql08-a2',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre TOP e LIMIT.',
        afirmacoes: [
          { texto: 'SELECT TOP 3 * FROM Produtos; devolve 3 linhas, mas não necessariamente as mais caras.', correta: true, explicacao: 'Sem ORDER BY, quais linhas vêm primeiro é arbitrário.' },
          { texto: 'LIMIT 3 é a forma equivalente no MySQL e no PostgreSQL.', correta: true, explicacao: 'Os dois bancos usam LIMIT no final da consulta.' },
          { texto: 'TOP 3 devolve exatamente 3 linhas mesmo se a tabela tiver 2 registros.', correta: false, explicacao: 'Se a tabela tem menos linhas, o resultado tem menos linhas. O TOP é um teto, não uma garantia.' }
        ],
        dicas: [
          'Sem ORDER BY não existe "mais caro".',
          'Pense no que acontece quando a tabela é menor que o limite.'
        ],
        explicacao: 'TOP e LIMIT definem um teto de linhas; a escolha de quais linhas vem depende da ordenação.',
        conceitos: ['sql.limite', 'sql.order-by']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql08-a3',
        tipo: 'fill-code',
        enunciado: 'Complete para listar os **5 produtos mais caros** no SQL Server.',
        codigo: 'SELECT {{1}} 5 Nome, Preco\nFROM Produtos\nORDER BY Preco DESC;',
        lacunas: [['top', 'limit']],
        dicas: [
          'No SQL Server a palavra vem entre SELECT e o número.',
          'São três letras.'
        ],
        explicacao: '`SELECT TOP 5 ... ORDER BY Preco DESC` — o limite vem antes das colunas, no SQL Server.',
        conceitos: ['sql.limite', 'sql.order-by']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql08-a4',
        tipo: 'write-code',
        enunciado: 'Escreva uma consulta que retorne os **5 produtos mais caros** (nome e preço).',
        respostasAceitas: [
          'select top 5 nome, preco from produtos order by preco desc',
          'select top 5 * from produtos order by preco desc',
          'select nome, preco from produtos order by preco desc limit 5',
          'select * from produtos order by preco desc limit 5'
        ],
        dicas: [
          'Use TOP 5 depois do SELECT ou LIMIT 5 no final.',
          'Não esqueça o ORDER BY Preco DESC.'
        ],
        explicacao: 'As duas formas corretas: `SELECT TOP 5 Nome, Preco FROM Produtos ORDER BY Preco DESC;` ou `SELECT Nome, Preco FROM Produtos ORDER BY Preco DESC LIMIT 5;`.',
        conceitos: ['sql.limite', 'sql.order-by']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql08-a5',
        tipo: 'order-blocks',
        enunciado: 'Monte a consulta que retorna os **2 produtos com menos estoque**.',
        blocos: ['SELECT TOP 2 *', 'FROM', 'Produtos', 'ORDER BY', 'Estoque ASC;'],
        dicas: [
          'Menos estoque = ordem crescente.',
          'O TOP 2 fica junto do asterisco.'
        ],
        explicacao: '`SELECT TOP 2 * FROM Produtos ORDER BY Estoque ASC;` — menos estoque primeiro e no máximo duas linhas.',
        conceitos: ['sql.limite', 'sql.order-by']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · First',
      blocos: [
        { tipo: 'texto', texto: '**first** (primeiro) aparece nas frases de trabalho para pedir as primeiras linhas de um resultado.' },
        { tipo: 'ingles', frase: 'Retrieve the first 10 rows.', traducao: 'Recupere as primeiras 10 linhas.' },
        { tipo: 'nota', tom: 'info', texto: '**the first 10 rows** = "as primeiras 10 linhas". É a ideia do `TOP 10` / `LIMIT 10`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql08-a6',
        tipo: 'write-code',
        enunciado: 'Retrieve the first 5 orders.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select top 5 * from pedidos',
          'select * from pedidos limit 5'
        ],
        dicas: [
          'orders = pedidos; first 5 = as 5 primeiras.',
          'Use TOP 5 depois do SELECT ou LIMIT 5 no final.'
        ],
        explicacao: 'Traduzindo: "retrieve the first 5 orders" = recupere os 5 primeiros pedidos. `SELECT TOP 5 * FROM Pedidos;` ou `SELECT * FROM Pedidos LIMIT 5;`.',
        conceitos: ['sql.limite', 'sql.ingles']
      }
    }
  ]
});
