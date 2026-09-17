Plataforma.registrarLicao({
  id: 'sql-06',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Ordenando resultados com ORDER BY',
  subtitulo: 'Iniciante · Etapa 1',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Ordenar o resultado de uma consulta com ORDER BY',
    'Escolher a direção com ASC e DESC',
    'Ordenar por mais de uma coluna'
  ],
  conceitos: ['sql.order-by', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O banco não promete ordem',
      introduz: ['sql.order-by'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.select', texto: 'Você já busca colunas com `SELECT ... FROM` e já filtra linhas com `WHERE`. Agora vai controlar **a ordem** em que as linhas aparecem.' },
        { tipo: 'texto', texto: 'Sem instrução, o banco devolve as linhas na ordem que for mais conveniente para ele. Isso muda de banco para banco e não é garantido entre execuções.' },
        { tipo: 'texto', texto: 'Para decidir a ordem, use `ORDER BY` (ordene por) depois do filtro:' },
        { tipo: 'conceito', id: 'sql.order-by', titulo: 'ORDER BY', texto: 'A parte da consulta que define a ordem em que as linhas aparecem no resultado.', exemplo: 'SELECT Nome, Preco FROM Produtos ORDER BY Preco;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Nome, Preco\nFROM Produtos\nORDER BY Preco;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Sem `ASC` nem `DESC`, a ordem é **crescente** (`ASC`) por padrão: do menor para o maior, de A para Z.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql06-a1',
        tipo: 'multiple-choice',
        enunciado: 'Para que serve o `ORDER BY` em uma consulta?',
        opcoes: [
          'Definir a ordem em que as linhas aparecem no resultado',
          'Escolher quais colunas aparecem',
          'Filtrar as linhas que não interessam',
          'Somar os valores de uma coluna'
        ],
        correta: 0,
        dicas: [
          'Ele não escolhe colunas nem filtra linhas.',
          'Pense na palavra "ordenar".'
        ],
        explicacao: '`ORDER BY` organiza o resultado. Quem escolhe colunas é o `SELECT`; quem filtra linhas é o `WHERE`.',
        conceitos: ['sql.order-by']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Do maior para o menor com DESC',
      blocos: [
        { tipo: 'texto', texto: 'Para inverter a ordem, use `DESC` (descending, decrescente):' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Nome, Preco\nFROM Produtos\nORDER BY Preco DESC;'
        },
        {
          tipo: 'tabela',
          titulo: 'Resultado',
          colunas: ['Nome', 'Preco'],
          linhas: [
            ['Monitor', 900.0],
            ['Teclado', 200.0],
            ['Mouse', 99.0]
          ],
          legenda: 'Do mais caro para o mais barato.'
        },
        { tipo: 'nota', tom: 'atencao', texto: '`ORDER BY` vem **depois** do `WHERE`, quando os dois aparecem.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql06-a2',
        tipo: 'predict-output',
        enunciado: 'Em que ordem os produtos aparecem?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Produtos',
            colunas: ['Nome', 'Estoque'],
            linhas: [
              ['Mouse', 25],
              ['Teclado', 4],
              ['Monitor', 12]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Nome, Estoque\nFROM Produtos\nORDER BY Estoque DESC;' }
        ],
        opcoes: [
          'Mouse, Monitor, Teclado',
          'Teclado, Monitor, Mouse',
          'Mouse, Teclado, Monitor',
          'A ordem não muda'
        ],
        correta: 0,
        feedbackErro: {
          1: 'DESC é do maior para o menor: o Teclado tem o menor estoque e fica por último.',
          2: 'Monitor (12) fica entre Mouse (25) e Teclado (4).',
          3: 'ORDER BY sempre muda a ordem; o padrão seria Teclado, Monitor, Mouse.'
        },
        dicas: [
          'DESC começa pelo maior valor.',
          'Estoque: 25, 4 e 12.'
        ],
        explicacao: 'Com `DESC`, o maior estoque vem primeiro: Mouse (25), Monitor (12), Teclado (4).',
        conceitos: ['sql.order-by']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Empates e textos',
      blocos: [
        { tipo: 'texto', texto: 'Quando duas linhas empatam na primeira coluna, você pode definir um segundo critério. Ele decide o desempate:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: "SELECT Nome, Cidade\nFROM Clientes\nORDER BY Cidade ASC, Nome ASC;"
        },
        { tipo: 'texto', texto: 'A ordem alfabética também vale para colunas de texto: o banco compara as letras de A até Z.' },
        { tipo: 'nota', tom: 'info', texto: 'Pense na lista de critérios como colunas de uma planilha: o primeiro decide, o segundo desempata.' },
        { tipo: 'trabalho', texto: 'Relatórios de trabalho quase sempre têm uma ordem combinada: pedidos do mais recente para o mais antigo, produtos do mais vendido para o menos vendido. Sem `ORDER BY`, o relatório sai diferente a cada execução.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql06-a3',
        tipo: 'order-blocks',
        enunciado: 'Monte a consulta que retorna **nome e preço** dos produtos, do mais barato para o mais caro.',
        blocos: ['SELECT', 'Nome, Preco', 'FROM', 'Produtos', 'ORDER BY', 'Preco ASC;'],
        dicas: [
          'A direção crescente é ASC.',
          'ORDER BY fica depois do FROM.'
        ],
        explicacao: '`SELECT Nome, Preco FROM Produtos ORDER BY Preco ASC;` — a ordem crescente é o padrão, mas pode ser escrita para deixar a intenção explícita.',
        conceitos: ['sql.order-by']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql06-a4',
        tipo: 'fill-code',
        enunciado: 'Complete para listar os produtos **do mais caro para o mais barato**.',
        codigo: 'SELECT Nome, Preco\nFROM Produtos\nORDER BY Preco {{1}};',
        lacunas: [['desc']],
        dicas: [
          'Decrescente em inglês é descending.',
          'São quatro letras.'
        ],
        explicacao: '`ORDER BY Preco DESC` coloca o maior preço no topo do resultado.',
        conceitos: ['sql.order-by']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql06-a5',
        tipo: 'write-code',
        enunciado: 'Escreva uma consulta que retorne **nome e preço** dos produtos, do mais caro para o mais barato.',
        respostasAceitas: ['select nome, preco from produtos order by preco desc'],
        dicas: [
          'Liste as colunas depois do SELECT.',
          'Use ORDER BY com DESC na coluna Preco.'
        ],
        explicacao: '`SELECT Nome, Preco FROM Produtos ORDER BY Preco DESC;` — as colunas pedidas e a ordenação decrescente pelo preço.',
        conceitos: ['sql.order-by']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Sort by',
      blocos: [
        { tipo: 'texto', texto: 'Uma palavra nova para pedir ordenação em inglês: **sort** (ordenar).' },
        {
          tipo: 'vocab',
          titulo: 'Palavra nova (1)',
          pares: [
            ['sort', 'ordenar']
          ]
        },
        { tipo: 'ingles', frase: 'Sort all customers by name.', traducao: 'Ordene todos os clientes por nome.' },
        { tipo: 'nota', tom: 'info', texto: '**sort by** = "ordenar por". Repare que **by** aparece nas duas línguas: `ORDER BY` no SQL e **sort by** na frase em inglês.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql06-a6',
        tipo: 'write-code',
        enunciado: 'Sort all customers by **Nome**.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select * from clientes order by nome',
          'select * from clientes order by nome asc'
        ],
        dicas: [
          'customers = clientes; name = nome.',
          'A ordem crescente é o padrão do ORDER BY.'
        ],
        explicacao: 'Traduzindo: "sort all customers by name" = ordene todos os clientes por nome. Consulta: `SELECT * FROM Clientes ORDER BY Nome;`.',
        conceitos: ['sql.order-by', 'sql.ingles']
      }
    }
  ]
});
