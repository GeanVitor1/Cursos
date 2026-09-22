Plataforma.registrarLicao({
  id: 'sql-17',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Aliases e legibilidade',
  subtitulo: 'Relacionamentos · Etapa 20',
  duracaoMin: 30,
  xp: 30,
  objetivos: [
    'Apelidar tabelas e colunas com AS',
    'Encurtar consultas com muitos JOINs',
    'Escolher aliases que ajudam quem vai ler'
  ],
  conceitos: ['sql.aliases', 'sql.join', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Apelidos para tabelas',
      introduz: ['sql.aliases'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.join-multiplo', texto: 'Consultas com vários `JOINs` ficam compridas: `Pedidos.ClienteId`, `ItensPedido.ProdutoId`... É hora de encurtar.' },
        { tipo: 'texto', texto: 'Um **alias** (apelido) dá um nome curto temporário para tabela ou coluna, usando `AS` (como). Ele vale só durante a consulta:' },
        { tipo: 'conceito', id: 'sql.aliases', titulo: 'Alias', texto: 'Nome curto temporário para tabela ou coluna, criado com AS e válido só na consulta.', exemplo: 'SELECT c.Nome FROM Clientes AS c;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT c.Nome, p.ValorTotal\nFROM Clientes AS c\nJOIN Pedidos AS p ON p.ClienteId = c.Id;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Depois do alias, use **só ele**: `c.Nome`, nunca mais `Clientes.Nome` na mesma consulta.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql17-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que o `AS` faz em `FROM Clientes AS c`?',
        opcoes: [
          'Cria um apelido temporário c para a tabela Clientes',
          'Cria uma tabela nova chamada c no banco',
          'Filtra os clientes cujo nome é c',
          'Ordena o resultado pela coluna c'
        ],
        correta: 0,
        dicas: [
          'AS vem de "como".',
          'Nada muda no banco; muda só a escrita.'
        ],
        explicacao: 'Alias é apelido de consulta: encurta a escrita sem criar nem alterar nada no banco.',
        conceitos: ['sql.aliases']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Aliases em colunas',
      blocos: [
        { tipo: 'texto', texto: 'Colunas também ganham apelido — útil para dar nome legível ao que aparece no relatório:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Nome AS Cliente, ValorTotal AS Total\nFROM Pedidos;'
        },
        { tipo: 'nota', tom: 'info', texto: 'O resultado mostra as colunas como Cliente e Total. O dado não muda; só o rótulo.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql17-a2',
        tipo: 'fill-code',
        enunciado: 'Complete para apelidar a tabela Clientes de c.',
        codigo: 'SELECT c.Nome\nFROM Clientes {{1}} c;',
        lacunas: [['as']],
        dicas: [
          'AS significa "como".',
          'Duas letras.'
        ],
        explicacao: '`FROM Clientes AS c` — daqui em diante, a tabela se chama c nesta consulta.',
        conceitos: ['sql.aliases']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql17-a3',
        tipo: 'find-error',
        enunciado: 'Esta consulta com alias foi recusada. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Clientes.Nome\nFROM Clientes AS c;' }
        ],
        opcoes: [
          'Depois do alias, a tabela deve ser chamada de c, não Clientes',
          'Falta o JOIN',
          'Alias precisa de aspas: AS "c"',
          'Nada — a consulta está correta'
        ],
        correta: 0,
        feedbackErro: {
          1: 'JOIN não é obrigatório para usar alias.',
          2: 'Alias não usa aspas.',
          3: 'Clientes.Nome depois de AS c é ambíguo para o banco.'
        },
        dicas: [
          'O alias substitui o nome original.',
          'Os dois nomes juntos confundem o banco.'
        ],
        explicacao: 'Criou o alias `c` e continuou usando `Clientes`: escolha um. O correto seria `SELECT c.Nome FROM Clientes AS c;`.',
        conceitos: ['sql.aliases']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql17-a4',
        tipo: 'write-code',
        enunciado: 'Reescreva com aliases: nome do cliente (c) e valor do pedido (p) com JOIN.',
        respostasAceitas: [
          'select c.nome, p.valortotal from clientes as c join pedidos as p on p.clienteid = c.id'
        ],
        dicas: [
          'Apelide as duas tabelas no FROM e no JOIN.',
          'Use os aliases no SELECT e no ON.'
        ],
        explicacao: '`SELECT c.Nome, p.ValorTotal FROM Clientes AS c JOIN Pedidos AS p ON p.ClienteId = c.Id;`.',
        conceitos: ['sql.aliases', 'sql.join']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Aliases bons e ruins',
      blocos: [
        { tipo: 'texto', texto: 'Alias bom economiza digitação **sem esconder o sentido**: `c` para Clientes, `p` para Pedidos. Alias ruim obriga o leitor a adivinhar:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT x.Nome, y.ValorTotal\nFROM Clientes AS x\nJOIN Pedidos AS y ON y.ClienteId = x.Id;'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Funciona, mas `x` e `y` não dizem nada. Em código compartilhado, prefira a inicial da tabela.' },
        { tipo: 'trabalho', texto: 'Em consultas com 4 ou 5 JOINs, aliases consistentes (primeira letra da tabela) são o que separa uma consulta legível de um quebra-cabeça. Times costumam cobrar isso em revisão.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql17-a5',
        tipo: 'multiple-choice',
        enunciado: 'Qual par de aliases é mais legível para Clientes e Pedidos?',
        opcoes: [
          'c e p (iniciais das tabelas)',
          'x e y (letras quaisquer)',
          'tabela1 e tabela2 (genéricos)',
          'cli e ped (três letras)'
        ],
        correta: 0,
        feedbackErro: {
          1: 'x e y não carregam sentido.',
          2: 'Genéricos não dizem qual tabela é qual.',
          3: 'Funciona, mas a inicial é mais curta e padrão.'
        },
        dicas: [
          'Pense em quem vai ler depois.',
          'A inicial da tabela é o padrão mais comum.'
        ],
        explicacao: 'A inicial da tabela é curta e óbvia: `c` é Clientes, `p` é Pedidos, sem adivinhação.',
        conceitos: ['sql.aliases']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Alias',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras para falar de apelidos curtos: **short** (curto) e **alias** (apelido).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['short', 'curto'],
            ['alias', 'apelido']
          ]
        },
        { tipo: 'ingles', frase: 'Use short alias names.', traducao: 'Use nomes de apelido curtos.' },
        { tipo: 'nota', tom: 'info', texto: '**short alias** = "apelido curto". É o resumo desta lição em duas palavras.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql17-a6',
        tipo: 'write-code',
        enunciado: 'Use short alias names: c para Clientes no SELECT de Nome.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select c.nome from clientes as c'
        ],
        dicas: [
          'Apelide Clientes de c com AS.',
          'Liste c.Nome.'
        ],
        explicacao: '`SELECT c.Nome FROM Clientes AS c;` — apelido curto e legível.',
        conceitos: ['sql.aliases', 'sql.ingles'],
        desafio: true
      }
    }
  ]
});
