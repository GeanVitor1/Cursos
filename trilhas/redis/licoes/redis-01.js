Plataforma.registrarLicao({
  id: 'redis-01',
  trilha: 'redis',
  tipo: 'licao',
  titulo: 'Redis: o que é e onde encaixa',
  subtitulo: 'Fundamentos · Etapa 2',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Explicar o que é o Redis e o modelo chave-valor',
    'Reconhecer os comandos SET, GET e DEL',
    'Entender por que a memória responde mais rápido que o disco',
    'Saber onde o Redis entra na arquitetura da aplicação'
  ],
  conceitos: ['redis.cache', 'redis.servidor', 'ingles.vocabulario'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Um banco de dados em memória',
      introduz: ['redis.servidor'],
      blocos: [
        { tipo: 'retoma', conceito: 'redis.cache', texto: 'Você já sabe o que é cache, quando ele compensa e que ele é uma cópia da verdade. Agora falta conhecer a ferramenta que guarda essa cópia.' },
        { tipo: 'texto', texto: 'O **Redis** é um **banco de dados em memória**: ele mantém os dados na memória RAM e responde em pouquíssimos milissegundos. Ele não é um banco relacional — não tem tabelas, colunas nem SQL.' },
        { tipo: 'conceito', id: 'redis.servidor', titulo: 'O servidor Redis', texto: 'Um processo separado, como o banco de dados, que guarda pares de chave e valor em memória e responde por comandos simples.', exemplo: 'SET produto:10 "Mouse"' },
        { tipo: 'diagrama', arte: 'API --> Redis        (memoria, ~1 ms)\nAPI --> SQL Server   (disco, ~120 ms)', legenda: 'Os dois podem coexistir: o Redis acelera, o banco garante.' },
        { tipo: 'tabela', titulo: 'Banco relacional x Redis', colunas: ['Banco relacional (SQL Server)', 'Redis'], linhas: [
          ['Guarda tabelas, linhas e colunas', 'Guarda pares de chave e valor'],
          ['Lê do disco', 'Lê da memória'],
          ['Consulta com SQL', 'Comandos simples por chave'],
          ['Fonte da verdade', 'Cópia rápida']
        ] },
        { tipo: 'nota', tom: 'info', texto: 'O Redis é um servidor próprio, com processo e porta. Um mesmo Redis pode servir várias aplicações ao mesmo tempo.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis01-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que é o Redis?',
        opcoes: [
          'Um servidor chave-valor que guarda dados em memória',
          'Um banco relacional que substitui o SQL Server',
          'Uma linguagem de consulta parecida com SQL',
          'Um tipo de tabela dentro do banco de dados'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O Redis não tem tabelas nem SQL; ele não substitui o banco relacional.',
          2: 'Redis não é uma linguagem: é um servidor com comandos próprios.',
          3: 'Tabela é conceito de banco relacional; no Redis existem chaves e valores.'
        },
        dicas: ['Pense em memória e em pares de chave e valor.', 'Ele fica ao lado do banco, não no lugar dele.'],
        explicacao: 'O Redis é um servidor que guarda pares de chave e valor em memória — rápido para cópias e estruturas simples, mas não é a fonte da verdade.',
        conceitos: ['redis.servidor']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Chave e valor: o modelo mais simples',
      blocos: [
        { tipo: 'texto', texto: 'No Redis, cada dado tem um **nome** (a chave) e um **conteúdo** (o valor). Não existe tabela: você pede pelo nome.' },
        { tipo: 'tabela', titulo: 'Como as chaves ficam organizadas', colunas: ['Chave', 'Valor'], linhas: [
          ['produto:10', 'Mouse'],
          ['produtos:destaque', 'Mouse, Teclado, Monitor'],
          ['categorias', 'Periféricos, Monitores']
        ], legenda: 'Os dois-pontos separam assunto e identificador: é uma convenção do time.' },
        { tipo: 'codigo', linguagem: 'bash', codigo: 'SET produto:10 "Mouse"\nGET produto:10\nDEL produto:10' },
        { tipo: 'glossario', titulo: 'Comandos básicos', itens: [
          ['SET', 'guardar', 'Grava um valor em uma chave, criando ou substituindo o valor anterior.'],
          ['GET', 'ler', 'Devolve o valor guardado na chave.'],
          ['DEL', 'remover', 'Apaga a chave e o valor dela.']
        ] },
        { tipo: 'nota', tom: 'info', texto: 'O nome `produto:10` é só uma convenção para organizar as chaves. O Redis não liga para o formato — quem liga é o time.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis01-a2',
        tipo: 'fill-code',
        enunciado: 'Complete os comandos que gravam e leem o valor da chave `produto:10`.',
        codigo: '{{1}} produto:10 "Mouse"\n{{2}} produto:10',
        lacunas: [['set'], ['get']],
        dicas: ['Guardar um valor é o comando SET.', 'Ler um valor é o comando GET.'],
        explicacao: '`SET` grava o valor na chave e `GET` devolve o valor guardado. São os dois comandos mais usados do Redis.',
        conceitos: ['redis.servidor']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis01-a3',
        tipo: 'interpret-code',
        enunciado: 'O que acontece com a chave `produto:10` depois destes comandos?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'SET produto:10 "Mouse"\nSET produto:10 "Teclado"\nGET produto:10' }
        ],
        opcoes: [
          'A chave passa a valer Teclado; o valor antigo é substituído',
          'As duas respostas ficam guardadas na mesma chave',
          'O GET devolve a lista com Mouse e Teclado',
          'O segundo SET dá erro porque a chave já existe'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Cada chave guarda um valor; o segundo SET sobrescreve o primeiro.',
          2: 'O Redis não transforma valor em lista sozinho.',
          3: 'SET na mesma chave é permitido: ele apenas atualiza o valor.'
        },
        dicas: ['Uma chave, um valor.', 'Repare que o segundo SET usa exatamente a mesma chave.'],
        explicacao: 'SET na mesma chave substitui o valor. Para guardar listas, o Redis tem outros comandos que ficam para depois.',
        conceitos: ['redis.servidor']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Onde o Redis encaixa',
      blocos: [
        { tipo: 'texto', texto: 'O Redis fica **ao lado** da aplicação, entre a API e o banco. Ele não substitui o banco relacional: guarda cópias e estruturas rápidas que podem ser recalculadas.' },
        { tipo: 'diagrama', arte: 'cliente --> API --> Redis      (rapido, recalculavel)\n                     \\--> SQL Server (fonte da verdade)' },
        { tipo: 'lista', itens: [
          'Vai para o Redis: resultado de consulta que se repete, listas de destaque, contadores.',
          'Fica no banco: dados que exigem garantia, relatórios e histórico.'
        ] },
        { tipo: 'futuro', titulo: 'Isso será importante depois', conceitos: ['redis.integracao'], texto: 'Mais adiante você vai registrar o Redis dentro de um projeto ASP.NET Core e usar o cache de dentro de um service.' },
        { tipo: 'trabalho', texto: 'Um time rodava a mesma consulta de categorias em três telas diferentes. Em vez de otimizar cada tela, colocou um Redis ao lado da API: as três passaram a ler a mesma cópia rápida, e o banco só é chamado quando a cópia vence.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis01-a4',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada comando do Redis à sua ação.',
        pares: [
          ['SET', 'guarda um valor'],
          ['GET', 'lê um valor'],
          ['DEL', 'remove uma chave']
        ],
        dicas: ['SET lembra definir.', 'DEL lembra delete.'],
        explicacao: 'Os três comandos formam o básico do Redis: gravar, ler e remover. Tudo começa por uma chave com nome único.',
        conceitos: ['redis.servidor']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis01-a5',
        tipo: 'scenario',
        cena: 'A API do catálogo está lenta e o banco já trabalha no limite. O time estuda onde colocar uma cópia rápida das respostas que se repetem.',
        enunciado: 'Onde o Redis deveria entrar?',
        opcoes: [
          'Entre a API e o banco, guardando as respostas que se repetem',
          'Dentro do banco, no lugar da tabela de produtos',
          'No aplicativo do cliente, guardando os dados para sempre',
          'Somente no relatório mensal, que roda uma vez por dia'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O Redis não entra no banco: ele é um servidor separado, ao lado.',
          2: 'Guardar no cliente não ajuda as outras pessoas e ainda arrisca dado velho.',
          3: 'O relatório mensal não é o gargalo; as chamadas repetidas é que pesam.'
        },
        dicas: ['A cópia precisa servir a todos os clientes.', 'Ela fica no caminho entre a API e o banco.'],
        explicacao: 'O Redis entra entre a API e o banco, servindo a mesma cópia para todos os clientes. O banco continua sendo a fonte da verdade.',
        conceitos: ['redis.servidor', 'redis.cache']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Key and value',
      blocos: [
        { tipo: 'texto', texto: 'Três palavras que aparecem em toda conversa sobre Redis: **key** (chave), **value** (valor) e **store** (guardar).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (3)',
          pares: [
            ['key', 'chave'],
            ['value', 'valor'],
            ['store', 'guardar']
          ]
        },
        { tipo: 'ingles', frase: 'Get the value by key.', traducao: 'Pegue o valor pela chave.' },
        { tipo: 'nota', tom: 'info', texto: '**by** significa "por"; no Redis, você sempre busca o dado **pela chave**.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis01-a6',
        tipo: 'multiple-choice',
        enunciado: 'Store the value in the cache. O que a frase pede?',
        opcoes: [
          'Guardar o valor no cache.',
          'Ler o valor do cache.',
          'Apagar o valor do cache.',
          'Comparar o valor com o cache.'
        ],
        correta: 0,
        feedbackErro: {
          1: 'store é guardar; ler seria o verbo get.',
          2: 'A frase não pede remoção.',
          3: 'A frase não fala de comparação.'
        },
        dicas: ['store lembra armazenar.', 'value é o valor.'],
        explicacao: 'A frase pede guardar o valor no cache. É o SET escrito em inglês.',
        conceitos: ['redis.servidor', 'ingles.vocabulario']
      }
    }
  ]
});
