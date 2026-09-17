Plataforma.registrarLicao({
  id: 'sql-09',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Valores nulos (NULL) e COALESCE',
  subtitulo: 'Iniciante · Etapa 4',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Reconhecer NULL como ausência de valor',
    'Encontrar e excluir nulos com IS NULL e IS NOT NULL',
    'Substituir nulos na exibição com COALESCE'
  ],
  conceitos: ['sql.null', 'sql.where', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Quando não existe valor',
      introduz: ['sql.null'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.where', texto: 'Você filtra linhas com `WHERE` comparando valores. Mas existe um valor especial que **não pode ser comparado** com `=`.' },
        { tipo: 'texto', texto: '`NULL` significa **ausência de valor**: o cliente existe, mas o telefone nunca foi informado. Não é zero, não é texto vazio — é "não sei".' },
        {
          tipo: 'tabela',
          titulo: 'Clientes',
          colunas: ['Id', 'Nome', 'Telefone'],
          linhas: [
            [1, 'Ana Souza', '41 99999-0001'],
            [2, 'Bruno Lima', null],
            [3, 'Carla Dias', null]
          ],
          legenda: 'Bruno e Carla têm telefone nulo.'
        },
        { tipo: 'texto', texto: 'Para encontrar os nulos, use `IS NULL`; para excluí-los, `IS NOT NULL`:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Nome, Telefone\nFROM Clientes\nWHERE Telefone IS NULL;'
        },
        { tipo: 'conceito', id: 'sql.null', titulo: 'NULL', texto: 'Representa a ausência de valor. Comparações com = não funcionam; use IS NULL e IS NOT NULL.', exemplo: 'WHERE Telefone IS NULL' },
        { tipo: 'nota', tom: 'atencao', texto: '`Telefone = NULL` **nunca** encontra nada. Igualdade não sabe comparar com o "não sei"; por isso existe o `IS NULL`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql09-a1',
        tipo: 'multiple-choice',
        enunciado: 'Qual consulta encontra os clientes **sem telefone** cadastrado?',
        opcoes: [
          'SELECT * FROM Clientes WHERE Telefone IS NULL;',
          'SELECT * FROM Clientes WHERE Telefone = NULL;',
          'SELECT * FROM Clientes WHERE Telefone = \'\';',
          'SELECT * FROM Clientes WHERE Telefone <> NULL;'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Igualdade com NULL nunca é verdadeira: nenhuma linha seria retornada.',
          2: 'Texto vazio e NULL são coisas diferentes: aqui a coluna nem foi preenchida.',
          3: 'Diferente de NULL também não funciona.'
        },
        dicas: [
          'NULL não se compara com = nem com <>.',
          'Existe uma palavra específica para identificar nulos.'
        ],
        explicacao: '`IS NULL` é a única forma correta de verificar ausência de valor. `= NULL` e `<> NULL` não retornam linhas.',
        conceitos: ['sql.null']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql09-a2',
        tipo: 'predict-output',
        enunciado: 'Quais clientes esta consulta retorna?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Clientes',
            colunas: ['Nome', 'Cidade', 'Telefone'],
            linhas: [
              ['Ana Souza', 'Curitiba', '41 99999-0001'],
              ['Bruno Lima', 'Recife', null],
              ['Carla Dias', 'Recife', null]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Nome\nFROM Clientes\nWHERE Telefone IS NOT NULL;' }
        ],
        opcoes: [
          'Apenas Ana Souza',
          'Bruno Lima e Carla Dias',
          'Todos os clientes',
          'Nenhum cliente'
        ],
        correta: 0,
        feedbackErro: {
          1: 'IS NOT NULL faz o contrário: deixa de fora quem tem telefone nulo.',
          2: 'Bruno e Carla não passam no filtro.',
          3: 'Ana tem telefone preenchido e atende à condição.'
        },
        dicas: [
          'IS NOT NULL mantém as linhas com valor preenchido.',
          'Quem tem telefone nulo fica de fora.'
        ],
        explicacao: 'Só Ana tem telefone preenchido. `IS NOT NULL` mantém apenas as linhas com valor na coluna.',
        conceitos: ['sql.null']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'COALESCE: um valor no lugar do vazio',
      blocos: [
        { tipo: 'texto', texto: 'Na hora de exibir, mostrar "null" para o usuário é ruim. O `COALESCE` substitui o vazio por outro valor:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: "SELECT Nome, COALESCE(Telefone, 'Sem telefone') AS Telefone\nFROM Clientes;"
        },
        {
          tipo: 'tabela',
          titulo: 'Resultado',
          colunas: ['Nome', 'Telefone'],
          linhas: [
            ['Ana Souza', '41 99999-0001'],
            ['Bruno Lima', 'Sem telefone'],
            ['Carla Dias', 'Sem telefone']
          ]
        },
        { tipo: 'nota', tom: 'info', texto: '`COALESCE(a, b)` devolve **a** quando ele existe; se **a** for nulo, devolve **b**. Aceita mais de dois valores, na ordem.' },
        { tipo: 'trabalho', texto: 'Toda tela que exibe dados de cliente precisa decidir o que mostrar quando o telefone não existe. A regra costuma ficar no SQL, no `COALESCE`, para o aplicativo não precisar tratar isso em cada tela.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql09-a3',
        tipo: 'fill-code',
        enunciado: 'Complete para listar apenas os clientes **com** telefone preenchido.',
        codigo: 'SELECT Nome, Telefone\nFROM Clientes\nWHERE Telefone {{1}};',
        lacunas: [['is not null']],
        dicas: [
          'Você quer o contrário de "sem telefone".',
          'A forma é IS NOT NULL.'
        ],
        explicacao: '`WHERE Telefone IS NOT NULL` mantém somente as linhas com valor na coluna.',
        conceitos: ['sql.null']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql09-a4',
        tipo: 'write-code',
        enunciado: 'Escreva uma consulta que retorne **nome e telefone**; quando o telefone for nulo, mostre **Sem telefone**.',
        respostasAceitas: [
          "select nome, coalesce(telefone, 'sem telefone') from clientes",
          "select nome, coalesce(telefone, 'sem telefone') as telefone from clientes"
        ],
        dicas: [
          'COALESCE recebe a coluna e o valor substituto.',
          'O texto substituto vai entre aspas simples.'
        ],
        explicacao: '`SELECT Nome, COALESCE(Telefone, \'Sem telefone\') FROM Clientes;` — o nulo é trocado na exibição, sem alterar o dado guardado.',
        conceitos: ['sql.null', 'sql.texto-aspas']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql09-a5',
        tipo: 'scenario',
        enunciado: 'O painel mostra "null" para clientes sem telefone e o suporte reclamou. Qual é a melhor correção?',
        cena: 'A consulta do painel é SELECT Nome, Telefone FROM Clientes;. O telefone é opcional e pode estar nulo.',
        opcoes: [
          'Usar COALESCE(Telefone, \'Sem telefone\') para exibir um texto no lugar do nulo.',
          'Trocar os nulos por 0 na tabela.',
          'Filtrar com WHERE Telefone IS NOT NULL e esconder esses clientes.',
          'Remover a coluna Telefone do resultado.'
        ],
        correta: 0,
        feedbackErro: {
          1: '0 não é telefone; isso polui o dado e confunde quem lê.',
          2: 'Esconder o cliente inteiro por falta de telefone é pior: o suporte perde o registro.',
          3: 'A informação de contato deixa de aparecer no painel.'
        },
        dicas: [
          'O dado guardado pode continuar nulo.',
          'A correção é na forma de exibir.'
        ],
        explicacao: '`COALESCE` resolve na exibição, sem mexer no dado nem esconder clientes. Dado ausente continua ausente no banco.',
        conceitos: ['sql.null'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Empty',
      blocos: [
        { tipo: 'texto', texto: 'Para falar de algo vazio em inglês: **empty** (vazio) e **phone** (telefone).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['phone', 'telefone'],
            ['empty', 'vazio / vazia']
          ]
        },
        { tipo: 'ingles', frase: 'The phone is empty.', traducao: 'O telefone está vazio.' },
        { tipo: 'nota', tom: 'info', texto: '**empty** é o "não sei" dos dados: é a ideia de `NULL` contada em inglês.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql09-a6',
        tipo: 'write-code',
        enunciado: 'Retrieve all customers where Phone is empty.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select * from clientes where telefone is null'
        ],
        dicas: [
          'customers = clientes; phone = telefone; empty = vazio.',
          'Vazio aqui é NULL: use IS NULL.'
        ],
        explicacao: 'Traduzindo: "retrieve all customers where Phone is empty" = recupere todos os clientes em que o telefone está vazio. `SELECT * FROM Clientes WHERE Telefone IS NULL;`.',
        conceitos: ['sql.null', 'sql.ingles']
      }
    }
  ]
});
