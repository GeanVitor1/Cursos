Plataforma.registrarLicao({
  id: 'sql-15',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'LEFT JOIN e RIGHT JOIN',
  subtitulo: 'Relacionamentos · Etapa 18',
  duracaoMin: 60,
  xp: 30,
  objetivos: [
    'Manter todas as linhas de um lado com LEFT JOIN',
    'Entender o RIGHT JOIN como espelho do LEFT',
    'Escolher o tipo de JOIN pelo que a pergunta pede'
  ],
  conceitos: ['sql.left-join', 'sql.inner-join', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Quando o INNER não basta',
      introduz: ['sql.left-join'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.inner-join', texto: 'O `INNER JOIN` esconde quem não tem par. Mas e a pergunta "quais clientes **nunca compraram**"? Ela precisa justamente dos escondidos.' },
        { tipo: 'texto', texto: 'O `LEFT JOIN` (junção à esquerda) mantém **todas as linhas da tabela da esquerda**, mesmo sem par. Onde não há combinação, as colunas da direita vêm vazias:' },
        { tipo: 'conceito', id: 'sql.left-join', titulo: 'LEFT JOIN', texto: 'Mantém todas as linhas da tabela da esquerda; sem par, as colunas da direita vêm vazias.', exemplo: 'SELECT * FROM Clientes LEFT JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Clientes.Nome, Pedidos.ValorTotal\nFROM Clientes\nLEFT JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;'
        },
        {
          tipo: 'tabela',
          titulo: 'Resultado (Bruno não tem pedido)',
          colunas: ['Nome', 'ValorTotal'],
          linhas: [
            ['Ana Souza', 250.0],
            ['Ana Souza', 80.0],
            ['Bruno Lima', null]
          ],
          legenda: 'Bruno aparece com ValorTotal vazio: é o nulo marcando a ausência de par.'
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql15-a1',
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
            colunas: ['Id', 'ClienteId'],
            linhas: [
              [101, 1]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Clientes.Nome\nFROM Clientes\nLEFT JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;' }
        ],
        opcoes: [
          'Ana Souza e Bruno Lima',
          'Apenas Ana Souza',
          'Apenas Bruno Lima',
          'Nenhum cliente'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O LEFT JOIN mantém a esquerda inteira: Bruno entra mesmo sem pedido.',
          2: 'Ana combina e entra; Bruno entra sem combinar.',
          3: 'Ana tem pedido e combina normalmente.'
        },
        dicas: [
          'LEFT mantém toda a tabela da esquerda.',
          'Bruno não tem par, mas continua no resultado.'
        ],
        explicacao: 'Ana entra pelo par; Bruno entra sem par, com as colunas de Pedidos vazias. O `LEFT JOIN` não esconde ninguém da esquerda.',
        conceitos: ['sql.left-join']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'RIGHT JOIN é o espelho',
      blocos: [
        { tipo: 'texto', texto: 'O `RIGHT JOIN` (junção à direita) faz o espelho: mantém **todas as linhas da tabela da direita**:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Clientes.Nome, Pedidos.ValorTotal\nFROM Clientes\nRIGHT JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Na prática, quase todo mundo escreve `LEFT JOIN` e troca a ordem das tabelas quando precisa do espelho. Entenda o `RIGHT`, mas prefira o `LEFT` no seu código.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql15-a2',
        tipo: 'multiple-choice',
        enunciado: 'Qual consulta lista **todos os clientes**, com ou sem pedido?',
        opcoes: [
          'SELECT Clientes.Nome FROM Clientes LEFT JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;',
          'SELECT Clientes.Nome FROM Clientes INNER JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;',
          'SELECT Clientes.Nome FROM Clientes RIGHT JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;',
          'SELECT Clientes.Nome FROM Clientes WHERE Pedidos.ClienteId = Clientes.Id;'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O INNER esconderia os clientes sem pedido.',
          2: 'O RIGHT manteria os pedidos, não os clientes.',
          3: 'WHERE não junta tabelas; sem JOIN não há Pedidos no FROM.'
        },
        dicas: [
          'A tabela a preservar é Clientes, à esquerda.',
          'INNER esconde; RIGHT preserva o lado errado.'
        ],
        explicacao: 'Com Clientes à esquerda, o `LEFT JOIN` preserva todos os clientes. As outras opções escondem alguém ou nem juntam.',
        conceitos: ['sql.left-join', 'sql.inner-join']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql15-a3',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna o **nome de todos os clientes** e o valor dos pedidos (quando existirem).',
        respostasAceitas: [
          "SELECT Clientes.Nome, Pedidos.ValorTotal FROM Clientes LEFT JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;"
        ],
        dicas: [
          'Preserve a tabela da esquerda: Clientes.',
          'A condição do ON liga ClienteId ao Id.'
        ],
        explicacao: '`SELECT Clientes.Nome, Pedidos.ValorTotal FROM Clientes LEFT JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;`.',
        conceitos: ['sql.left-join']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Achando quem nunca comprou',
      blocos: [
        { tipo: 'texto', texto: 'Junte o `LEFT JOIN` com um filtro de vazio e nasce uma pergunta clássica de negócio: quem nunca comprou?' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Clientes.Nome\nFROM Clientes\nLEFT JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id\nWHERE Pedidos.Id IS NULL;'
        },
        { tipo: 'nota', tom: 'info', texto: 'O `LEFT` traz todo mundo; o `WHERE ... IS NULL` fica só com quem não combinou. É o padrão "esquerda menos direita".' },
        { tipo: 'trabalho', texto: 'Campanhas de reativação começam exatamente aqui: a lista de clientes sem nenhum pedido. O time de marketing pede essa lista toda semana.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql15-a4',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna o **nome dos clientes que nunca fizeram pedido**.',
        respostasAceitas: [
          "SELECT Clientes.Nome FROM Clientes LEFT JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id WHERE Pedidos.Id IS NULL;"
        ],
        dicas: [
          'LEFT JOIN preserva os clientes.',
          'Filtre quem ficou sem par com IS NULL.'
        ],
        explicacao: '`SELECT Clientes.Nome FROM Clientes LEFT JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id WHERE Pedidos.Id IS NULL;`.',
        conceitos: ['sql.left-join', 'sql.null']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Left e right',
      blocos: [
        { tipo: 'texto', texto: 'As direções da junção em inglês: **left** (esquerda) e **right** (direita).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['left', 'esquerda'],
            ['right', 'direita']
          ]
        },
        { tipo: 'ingles', frase: 'Left join and right join.', traducao: 'Junção à esquerda e à direita.' },
        { tipo: 'nota', tom: 'info', texto: '**left join** = "junção à esquerda". O lado nomeado é o lado preservado.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql15-a5',
        tipo: 'write-code',
        enunciado: 'Left join de Clientes com Pedidos, trazendo todos os nomes.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          "SELECT Clientes.Nome FROM Clientes LEFT JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;"
        ],
        dicas: [
          'LEFT JOIN preserva a esquerda.',
          'A condição do ON é a de sempre.'
        ],
        explicacao: '`SELECT Clientes.Nome FROM Clientes LEFT JOIN Pedidos ON Pedidos.ClienteId = Clientes.Id;`.',
        conceitos: ['sql.left-join', 'sql.ingles'],
        desafio: true
      }
    }
  ]
});
