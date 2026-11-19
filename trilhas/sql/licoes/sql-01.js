Plataforma.registrarLicao({
  id: 'sql-01',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Tabelas, linhas e colunas',
  subtitulo: 'Fundamentos · Etapa 1',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Ler a estrutura de uma tabela e seus tipos de dados',
    'Entender chave primária e chave estrangeira na prática',
    'Reconhecer o relacionamento um-para-muitos',
    'Criar uma tabela simples com CREATE TABLE'
  ],
  conceitos: ['sql.tabela', 'sql.tipos-dados', 'sql.chave-primaria', 'sql.chave-estrangeira', 'sql.relacionamento'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Anatomia de uma tabela',
      blocos: [
        { tipo: 'retoma', conceito: 'sql.tabela', texto: 'Na etapa anterior você viu que uma tabela guarda um tipo de informação e que cada linha é um registro. Agora vamos olhar para **como** uma tabela é definida: cada coluna tem um nome e um tipo.' },
        {
          tipo: 'tabela',
          titulo: 'Clientes',
          colunas: ['Id', 'Nome', 'Email', 'Cidade', 'Ativo', 'CriadoEm'],
          linhas: [
            [1, 'Ana Souza', 'ana@email.com', 'Curitiba', 1, '2026-01-10'],
            [2, 'Bruno Lima', 'bruno@email.com', 'Recife', 1, '2026-02-02'],
            [3, 'Carla Dias', 'carla@email.com', 'São Paulo', 0, '2026-02-15']
          ],
          legenda: 'A primeira linha (cabeçalho) define as colunas. As demais são registros.'
        },
        { tipo: 'nota', tom: 'info', texto: 'Toda consulta que você escrever daqui pra frente vai usar os **nomes dessas colunas**. É como um contrato: se você errar o nome, o banco reclama.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Tipos de dados: cada coluna tem um papel',
      introduz: ['sql.tipos-dados'],
      blocos: [
        { tipo: 'texto', texto: 'O tipo define que espécie de valor a coluna aceita. Os mais comuns no trabalho:' },
        {
          tipo: 'tabela',
          titulo: 'Tipos mais usados',
          colunas: ['Tipo', 'Guarda', 'Exemplo'],
          linhas: [
            ['INT', 'números inteiros', '1, 42, 1830'],
            ['VARCHAR', 'textos de tamanho variável', 'Ana Souza'],
            ['DECIMAL', 'números com casas decimais (dinheiro)', '199.90'],
            ['DATE / DATETIME', 'datas e horários', '2026-02-15'],
            ['BIT / BOOLEAN', 'verdadeiro ou falso', '1 ou 0']
          ],
          legenda: 'Cada banco tem pequenas variações de nome, mas a ideia é sempre essa.'
        },
        { tipo: 'nota', tom: 'info', texto: 'Nos bancos, datas usam ano-mês-dia (2026-02-15) e decimais usam ponto (199.90 = R$ 199,90).' },
        { tipo: 'destaque', texto: 'Valores de dinheiro usam `DECIMAL`, nunca `FLOAT` (ponto flutuante, perde precisão). Esse tipo acumula erro de arredondamento — e ninguém quer isso no valor de um pedido.' },
        { tipo: 'texto', texto: 'Veja como esses tipos aparecem na tabela **Produtos** do Mercado Aurora:' },
        {
          tipo: 'tabela',
          titulo: 'Estrutura da tabela Produtos',
          colunas: ['Coluna', 'Tipo', 'O que guarda'],
          linhas: [
            ['Id', 'INT', 'identificador único de cada produto'],
            ['Nome', 'VARCHAR', 'nome do produto'],
            ['Preco', 'DECIMAL', 'preço com centavos'],
            ['Estoque', 'INT', 'quantidade disponível'],
            ['CriadoEm', 'DATETIME', 'data e hora do cadastro'],
            ['Ativo', 'BIT', '1 = ativo, 0 = inativo']
          ],
          legenda: 'A atividade a seguir conecta exatamente estas colunas aos tipos.'
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql01-a1',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada coluna da tabela Produtos ao tipo mais adequado.',
        pares: [
          ['Nome', 'VARCHAR'],
          ['Preco', 'DECIMAL'],
          ['Estoque', 'INT'],
          ['CriadoEm', 'DATETIME'],
          ['Ativo', 'BIT']
        ],
        dicas: [
          'Preco tem casas decimais. Estoque é contagem inteira.',
          'Ativo só precisa responder sim ou não.'
        ],
        explicacao: 'Escolher o tipo certo evita dados inválidos e economiza espaço. Preco como DECIMAL garante centavos exatos.',
        conceitos: ['sql.tipos-dados']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Chave estrangeira: ligando tabelas',
      introduz: ['sql.chave-estrangeira', 'sql.relacionamento'],
      blocos: [
        { tipo: 'texto', texto: 'Um pedido pertence a um cliente. Como representar isso no banco? Você não copia todos os dados do cliente para a tabela Pedidos — você **referencia** o Id dele.' },
        {
          tipo: 'tabela',
          titulo: 'Pedidos',
          colunas: ['Id', 'ClienteId', 'ValorTotal', 'Status', 'DataPedido'],
          linhas: [
            [101, 1, 250.00, 'Pago', '2026-02-01'],
            [102, 1, 89.90, 'Pendente', '2026-02-03'],
            [103, 2, 430.50, 'Pago', '2026-02-04']
          ],
          legenda: 'ClienteId 1 é a Ana Souza. Os dois primeiros pedidos são dela.'
        },
        { tipo: 'destaque', texto: 'A coluna `ClienteId` em Pedidos é uma **chave estrangeira**: ela aponta para a chave primária (`Id`) da tabela Clientes. Isso é o que chamamos de **relacionamento** entre tabelas.' },
        {
          tipo: 'diagrama',
          arte: 'Clientes                    Pedidos\n┌──────────┐              ┌──────────────┐\n│ Id (PK)  │◄─────────────│ ClienteId(FK)│\n│ Nome     │   1 : N      │ Id (PK)      │\n│ Email    │              │ ValorTotal   │\n└──────────┘              └──────────────┘',
          legenda: 'Um cliente pode ter vários pedidos. No diagrama, PK = chave primária e FK = chave estrangeira; ClienteId (FK) aponta para o Id (PK) de Clientes. É o relacionamento um-para-muitos (1:N).'
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql01-a2',
        tipo: 'multiple-choice',
        enunciado: 'Por que a tabela Pedidos não guarda o nome e o e-mail do cliente diretamente?',
        opcoes: [
          'Porque ClienteId aponta para a tabela Clientes, sem repetir dados',
          'Porque o banco não aceita colunas de texto em duas tabelas ao mesmo tempo',
          'Porque isso deixaria a estrutura do banco visualmente mais bonita',
          'Porque o e-mail é secreto e nenhuma tabela pode gravá-lo'
        ],
        correta: 0,
        dicas: [
          'Se o cliente mudar de e-mail, quantos lugares precisariam ser atualizados?',
          'ClienteId é uma referência. Referência a quê?'
        ],
        explicacao: 'Guardar o dado em um só lugar (tabela Clientes) evita duplicação e garante consistência. O vínculo é feito pela chave estrangeira.',
        conceitos: ['sql.chave-estrangeira', 'sql.relacionamento']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Um-para-muitos na prática',
      blocos: [
        { tipo: 'texto', texto: 'O relacionamento 1:N aparece em praticamente todo sistema:' },
        {
          tipo: 'lista',
          itens: [
            'Um **cliente** tem vários **pedidos**',
            'Um **pedido** tem vários **itens**',
            'Um **produto** aparece em vários **itens de pedido**'
          ]
        },
        { tipo: 'texto', texto: 'O lado "1" tem a chave primária. O lado "N" tem a chave estrangeira que aponta para ele.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql01-a3',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso.',
        afirmacoes: [
          { texto: 'Vários pedidos podem ter o mesmo ClienteId.', correta: true },
          { texto: 'A chave primária de Pedidos se repete para indicar que são do mesmo cliente.', correta: false },
          { texto: 'A chave estrangeira aponta para a chave primária de outra tabela.', correta: true }
        ],
        dicas: [
          'Pense no relacionamento 1:N: o N fica onde?',
          'Quem identifica cada pedido individualmente é o Id do pedido.'
        ],
        explicacao: 'No lado N, a chave estrangeira pode repetir (Ana tem vários pedidos). A chave primária nunca repete.',
        conceitos: ['sql.chave-estrangeira', 'sql.chave-primaria']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Criando uma tabela: CREATE TABLE',
      blocos: [
        {
          tipo: 'texto',
          texto: 'Até aqui você leu tabelas prontas. Quem as cria é o comando `CREATE TABLE`: você dá o nome da tabela e, entre parênteses, lista cada coluna com o seu tipo.'
        },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'CREATE TABLE Categorias (\n  Id INT PRIMARY KEY,\n  Nome VARCHAR(50)\n)',
          legenda: 'Cria a tabela Categorias com duas colunas: Id (chave primária) e Nome (texto de até 50 caracteres).'
        },
        {
          tipo: 'lista',
          itens: [
            '`PRIMARY KEY` marca a chave primária: o valor não repete e não fica vazio.',
            '`VARCHAR(50)` define o tamanho máximo do texto.',
            'As colunas são separadas por vírgula; a última não leva vírgula.'
          ]
        },
        {
          tipo: 'nota',
          tom: 'info',
          texto: 'Neste curso usamos a sintaxe do SQL Server (T-SQL). Em outros bancos, nomes de tipos e detalhes de `CREATE TABLE` mudam um pouco, mas a estrutura é a mesma.'
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql01-a6',
        tipo: 'fill-code',
        enunciado: 'Complete o comando para criar a tabela **Categorias**, com `Id` como chave primária.',
        codigo: 'CREATE {{1}} Categorias (\n  Id INT {{2}},\n  Nome VARCHAR(50)\n)',
        lacunas: [
          ['table'],
          ['primary key']
        ],
        dicas: [
          'A primeira lacuna é o tipo de objeto que está sendo criado: uma estrutura de linhas e colunas.',
          'A segunda lacuna é a restrição que marca a coluna Id como identificador único, formada por duas palavras.'
        ],
        explicacao: '`CREATE TABLE nome (coluna tipo, ...)` cria a tabela. `Id INT PRIMARY KEY` declara a coluna Id como chave primária.',
        conceitos: ['sql.tipos-dados', 'sql.chave-primaria']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O banco da loja: Mercado Aurora',
      blocos: [
        { tipo: 'texto', texto: 'Você vai trabalhar com este esquema pelas próximas etapas. Vale memorizar:' },
        {
          tipo: 'tabela',
          titulo: 'Tabelas do Mercado Aurora',
          colunas: ['Tabela', 'Guarda', 'Relação'],
          linhas: [
            ['Clientes', 'quem compra', ''],
            ['Produtos', 'o que é vendido', ''],
            ['Pedidos', 'compras realizadas', 'ClienteId → Clientes'],
            ['ItensPedido', 'produtos de cada pedido', 'PedidoId → Pedidos, ProdutoId → Produtos']
          ]
        },
        {
          tipo: 'tabela',
          titulo: 'Colunas de ItensPedido',
          colunas: ['Coluna', 'Tipo', 'O que guarda'],
          linhas: [
            ['Id', 'INT', 'identificador de cada item'],
            ['PedidoId', 'INT', 'pedido ao qual o item pertence'],
            ['ProdutoId', 'INT', 'produto vendido'],
            ['Quantidade', 'INT', 'quantidade comprada'],
            ['PrecoUnitario', 'DECIMAL', 'preço de uma unidade']
          ],
          legenda: 'PedidoId e ProdutoId são chaves estrangeiras: ligam o item ao pedido e ao produto.'
        },
        { tipo: 'nota', tom: 'sucesso', texto: 'Na próxima etapa você escreve sua **primeira consulta SQL** nesse banco. Antes disso, você cria uma tabela e resolve dois desafios de modelagem.' },
        { tipo: 'vida-real', emoji: '📋', titulo: 'A planilha única do dono vira tabelas separadas', texto: 'Na planilha dele, o nome do cliente se repete em cada compra e basta um erro de digitação para o mesmo cliente aparecer de dois jeitos. Você separa em Clientes e Pedidos e liga as duas por uma chave estrangeira: o nome fica em um lugar só e cada pedido aponta para o cliente pelo Id.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql01-a4',
        tipo: 'scenario',
        cena: 'O time de produto pediu uma novidade: cada cliente poderá cadastrar vários endereços de entrega (casa, trabalho, endereço dos pais). Hoje a tabela Clientes guarda só a cidade, sem endereço completo.',
        enunciado: 'Como modelar isso corretamente no banco?',
        opcoes: [
          'Criar uma tabela Enderecos com ClienteId como chave estrangeira',
          'Criar as colunas Endereco1, Endereco2 e Endereco3 dentro de Clientes',
          'Guardar todos os endereços numa única coluna de texto, separados por vírgula',
          'Duplicar o cadastro inteiro do cliente para cada novo endereço'
        ],
        correta: 0,
        dicas: [
          'Vários endereços para um cliente é um relacionamento 1:N.',
          'O lado N guarda a chave estrangeira. Qual tabela é o lado N?'
        ],
        explicacao: 'Nova tabela, nova chave estrangeira. Colunas numeradas (Endereco1, Endereco2...) limitam a quantidade e virariam uma bagunça. Lista em texto único impede consultas e validação.',
        conceitos: ['sql.relacionamento', 'sql.chave-estrangeira'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql01-a5',
        tipo: 'find-error',
        enunciado: 'A tabela Pedidos abaixo tem um registro inválido. O que está errado?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Pedidos',
            colunas: ['Id', 'ClienteId', 'ValorTotal'],
            linhas: [
              [101, 1, 250.0],
              [102, 1, 89.9],
              [103, 99, 430.5]
            ]
          }
        ],
        opcoes: [
          'O pedido 103 aponta para o ClienteId 99, que não existe em Clientes',
          'O valor 89.9 deveria ser escrito com duas casas decimais',
          'A tabela Pedidos deveria ter apenas dois registros no máximo',
          'O Id de cada pedido deveria ser igual ao ClienteId dele'
        ],
        correta: 0,
        dicas: [
          'Observe os clientes existentes: Ana (1), Bruno (2) e Carla (3).',
          'Uma chave estrangeira precisa apontar para uma chave primária que realmente existe.'
        ],
        explicacao: 'A chave estrangeira impede que um pedido aponte para um cliente que não existe: o banco rejeita referências inválidas. Sem isso, sobrariam pedidos órfãos.',
        conceitos: ['sql.chave-estrangeira']
      }
    }
  ]
});
