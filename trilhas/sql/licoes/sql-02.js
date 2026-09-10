Plataforma.registrarLicao({
  id: 'sql-02',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Seu primeiro SELECT',
  subtitulo: 'Fundamentos · Etapa 2',
  duracaoMin: 50,
  xp: 30,
  objetivos: [
    'Escrever consultas com SELECT e FROM',
    'Escolher colunas específicas em vez de usar *',
    'Diferenciar SELECT de INSERT, UPDATE e DELETE'
  ],
  conceitos: ['sql.select', 'sql.from', 'sql.colunas', 'sql.comandos-sql', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Como conversamos com o banco',
      introduz: ['sql.select', 'sql.from'],
      blocos: [
        { tipo: 'texto', texto: 'A aplicação não abre a tabela e olha para ela. Ela **pergunta** ao banco, usando uma linguagem chamada **SQL** (Structured Query Language — linguagem de consulta estruturada).' },
        {
          tipo: 'diagrama',
          arte: 'Sua aplicação\n     │  "SELECT * FROM Clientes;"\n     ▼\n  Banco de dados\n     │  tabela com os dados\n     ▼\nSua aplicação recebe a resposta'
        },
        { tipo: 'texto', texto: 'A consulta tem duas partes principais. Leia em voz alta: "selecione tudo **da tabela** Clientes".' },
        { tipo: 'conceito', id: 'sql.select', titulo: 'SELECT', texto: 'O comando que consulta dados. Ele diz o que você quer ver.', exemplo: 'SELECT Nome FROM Clientes;' },
        { tipo: 'conceito', id: 'sql.from', titulo: 'FROM', texto: 'A parte que diz de qual tabela os dados vêm.', exemplo: 'FROM Clientes' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT * FROM Clientes;'
        },
        { tipo: 'nota', tom: 'info', texto: 'O ponto e vírgula (`;`) indica o fim do comando. O banco executa tudo até ele.' },
        { tipo: 'nota', tom: 'info', texto: 'O `*` (asterisco) é um atalho para "todas as colunas". Você vai entender melhor na próxima tela.' },
        {
          tipo: 'tabela',
          titulo: 'Resultado',
          colunas: ['Id', 'Nome', 'Email', 'Cidade', 'Ativo'],
          linhas: [
            [1, 'Ana Souza', 'ana@email.com', 'Curitiba', 1],
            [2, 'Bruno Lima', 'bruno@email.com', 'Recife', 1],
            [3, 'Carla Dias', 'carla@email.com', 'São Paulo', 0]
          ]
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql02-a1',
        tipo: 'multiple-choice',
        enunciado: 'No comando `SELECT * FROM Clientes;`, o que o `*` significa?',
        opcoes: [
          'Todas as colunas da tabela',
          'Multiplicação dos valores',
          'Apenas a chave primária',
          'Que a consulta está inválida'
        ],
        correta: 0,
        dicas: [
          'O resultado mostrou Id, Nome, Email, Cidade e Ativo. Quantas colunas foram pedidas?',
          'O asterisco representa "tudo".'
        ],
        explicacao: 'O `*` é um atalho para "todas as colunas". Ele é ótimo para explorar, mas em código profissional preferimos listar as colunas necessárias.',
        conceitos: ['sql.select']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Escolhendo as colunas',
      introduz: ['sql.colunas'],
      blocos: [
        { tipo: 'texto', texto: 'Em vez de tudo, você pode pedir apenas o que precisa. Basta listar as colunas separadas por vírgula:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Nome, Email\nFROM Clientes;'
        },
        {
          tipo: 'tabela',
          titulo: 'Resultado',
          colunas: ['Nome', 'Email'],
          linhas: [
            ['Ana Souza', 'ana@email.com'],
            ['Bruno Lima', 'bruno@email.com'],
            ['Carla Dias', 'carla@email.com']
          ]
        },
        { tipo: 'nota', tom: 'info', texto: 'A ordem das colunas no resultado segue a ordem em que você as escreveu. Se pedir `Email, Nome`, o e-mail vem primeiro.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql02-a2',
        tipo: 'fill-code',
        enunciado: 'Complete a consulta para retornar o nome e o preço de todos os produtos.',
        codigo: '{{1}} Nome, Preco\nFROM Produtos;',
        lacunas: [['select']],
        dicas: [
          'É o comando que consulta dados.',
          'Começa com "S" e tem 6 letras.'
        ],
        explicacao: '`SELECT` é sempre o primeiro passo de uma consulta. Depois vêm as colunas e o `FROM` indicando a tabela.',
        conceitos: ['sql.select', 'sql.from']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql02-a3',
        tipo: 'interpret-code',
        enunciado: 'Por que o resultado abaixo tem apenas duas colunas?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Nome, Email\nFROM Clientes;' },
          {
            tipo: 'tabela',
            colunas: ['Nome', 'Email'],
            linhas: [
              ['Ana Souza', 'ana@email.com'],
              ['Bruno Lima', 'bruno@email.com'],
              ['Carla Dias', 'carla@email.com']
            ]
          }
        ],
        opcoes: [
          'Porque a consulta pediu somente as colunas Nome e Email',
          'Porque a tabela Clientes só tem duas colunas',
          'Porque o banco removeu colunas vazias',
          'Porque SELECT sempre retorna no máximo duas colunas'
        ],
        correta: 0,
        dicas: [
          'Compare a lista depois do SELECT com as colunas do resultado.',
          'Você recebe exatamente o que pede.'
        ],
        explicacao: 'A consulta define o formato da resposta. Pediu Nome e Email, recebeu Nome e Email — mesmo que a tabela tenha outras colunas.',
        conceitos: ['sql.colunas']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'SELECT * ou colunas específicas?',
      blocos: [
        { tipo: 'lista', itens: [
          'Durante o aprendizado e a exploração, `SELECT *` é prático.',
          'Em código profissional, liste apenas as colunas que a aplicação vai usar.',
          'Motivos: menos dados trafegando, menos memória, menos risco de quebrar quando alguém adicionar uma coluna.'
        ] },
        { tipo: 'destaque', texto: 'Regra prática: se a tela só precisa de Nome e Email, a consulta pede só Nome e Email.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql02-a4',
        tipo: 'order-blocks',
        enunciado: 'Ordene os blocos para montar uma consulta que retorna o nome e o preço dos produtos.',
        blocos: [
          'SELECT',
          'Nome, Preco',
          'FROM',
          'Produtos;'
        ],
        dicas: [
          'A consulta sempre começa com o verbo: o que você quer fazer?',
          'Depois do verbo vêm as colunas; a tabela entra depois do FROM.'
        ],
        explicacao: 'Estrutura básica: `SELECT` colunas `FROM` tabela. Essa ordem é sempre a mesma — muda apenas o que você pede e de onde.',
        conceitos: ['sql.select', 'sql.from']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql02-a5',
        tipo: 'predict-output',
        enunciado: 'O que a consulta abaixo retorna?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Produtos',
            colunas: ['Id', 'Nome', 'Preco', 'Estoque'],
            linhas: [
              [1, 'Mouse', 100.0, 25],
              [2, 'Teclado', 200.0, 10],
              [3, 'Monitor', 900.0, 4],
              [4, 'Webcam', 150.0, 0]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Nome\nFROM Produtos;' }
        ],
        opcoes: [
          'Mouse, Teclado, Monitor, Webcam',
          'Apenas Mouse',
          'Apenas a coluna Nome com os nomes das colunas',
          'Todos os dados de todos os produtos'
        ],
        correta: 0,
        dicas: [
          'A consulta pede a coluna Nome, sem nenhuma condição.',
          'Sem uma condição, todos os registros entram no resultado.'
        ],
        explicacao: 'Sem uma condição, o SELECT devolve todas as linhas — e apenas a coluna pedida. Na próxima lição você vai aprender a escolher quais linhas aparecem.',
        conceitos: ['sql.select', 'sql.colunas']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Nem só de consulta vive um banco',
      introduz: ['sql.comandos-sql'],
      blocos: [
        { tipo: 'texto', texto: 'Você vai usar SELECT o tempo todo, mas o SQL tem outros comandos essenciais para manipular dados. Juntos, eles formam o **CRUD**: Create (criar), Read (ler), Update (atualizar) e Delete (excluir).' },
        {
          tipo: 'tabela',
          titulo: 'Os quatro comandos principais',
          colunas: ['Comando', 'Ação'],
          linhas: [
            ['SELECT', 'Consulta dados'],
            ['INSERT', 'Insere novos registros'],
            ['UPDATE', 'Altera registros existentes'],
            ['DELETE', 'Exclui registros']
          ]
        },
        { tipo: 'nota', tom: 'atencao', texto: 'UPDATE e DELETE sem condição alteram a tabela inteira. É o erro clássico de quem está começando — e também de quem está com pressa.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql02-a6',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada comando à sua ação.',
        pares: [
          ['SELECT', 'Consultar'],
          ['INSERT', 'Inserir'],
          ['UPDATE', 'Alterar'],
          ['DELETE', 'Excluir']
        ],
        dicas: [
          'SELECT vem de "selecionar/consultar".',
          'INSERT lembra "inserir"; UPDATE vem de "atualizar".'
        ],
        explicacao: 'Esse quarteto é a base do CRUD — Create, Read, Update, Delete — que você vai reencontrar quando criar serviços web mais adiante.',
        conceitos: ['sql.comandos-sql']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner',
      blocos: [
        { tipo: 'ingles', frase: 'Retrieve all customers.', traducao: 'Recupere/retorne todos os clientes.' },
        {
          tipo: 'vocab',
          titulo: 'Work vocabulary',
          pares: [
            ['retrieve', 'recuperar / retornar'],
            ['customer', 'cliente'],
            ['all', 'todos'],
            ['name', 'nome'],
            ['email', 'e-mail'],
            ['order', 'pedido'],
            ['of', 'de (dentro da frase)'],
            ['from', 'de / do']
          ]
        },
        { tipo: 'texto', texto: 'Nas próximas etapas, o inglês aparece em pedidos curtos — as dicas ajudam com as palavras novas.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql02-a7',
        tipo: 'write-code',
        enunciado: 'Escreva uma consulta que retorne o **Nome** e o **Preco** de todos os produtos.',
        esqueleto: 'SELECT ___\nFROM ___;',
        respostasAceitas: ['select nome, preco from produtos'],
        dicas: [
          'Comece com SELECT, liste as colunas e use FROM Produtos.',
          'Estrutura: SELECT colunas FROM tabela;'
        ],
        explicacao: 'Consulta completa: `SELECT Nome, Preco FROM Produtos;`. Sem uma condição, ela retorna todos os produtos.',
        conceitos: ['sql.select', 'sql.from']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql02-a8',
        tipo: 'write-code',
        enunciado: 'Retrieve the **name** and **email** of all customers.',
        placeholder: 'SELECT ...',
        respostasAceitas: ['select nome, email from clientes'],
        dicas: [
          'customer = cliente. name = nome; email = e-mail.',
          'A tabela em português é Clientes. Colunas: Nome e Email.'
        ],
        explicacao: 'Traduzindo o pedido: "retrieve the name and email of all customers" = retorne o nome e o e-mail de todos os clientes. Consulta: `SELECT Nome, Email FROM Clientes;`.',
        conceitos: ['sql.select', 'sql.ingles'],
        desafio: true
      }
    }
  ]
});
