Plataforma.registrarLicao({
  id: 'ingles-01',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Mensagens de erro e leitura técnica',
  subtitulo: 'English · Etapa 1',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Entender mensagens de erro comuns em inglês',
    'Ler um ticket/issue curto e identificar o problema',
    'Reconhecer palavras de ação em pedidos de correção'
  ],
  conceitos: ['ingles.erros', 'ingles.leitura', 'ingles.frases'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Mensagens de erro que você vai ver',
      introduz: ['ingles.erros'],
      blocos: [
        { tipo: 'texto', texto: 'Mensagens de erro em inglês parecem assustadoras, mas quase sempre seguem o mesmo padrão: **o que falhou + onde + por quê**.' },
        { tipo: 'codigo', linguagem: 'texto', codigo: 'Cannot connect to the database.\nObject reference not set to an instance of an object.\n404 Not Found: the resource does not exist.\nTimeout expired while waiting for the server.' },
        { tipo: 'glossario', titulo: 'Traduzindo as mensagens', itens: [
          ['Cannot connect to the database', 'não é possível conectar', 'A conexão (endereço, rede, servidor) está errada ou o banco está fora.'],
          ['Object reference not set...', 'referência nula', 'É o erro de referência nula (NullReferenceException): algo que não existe foi acessado.'],
          ['404 Not Found', 'recurso não encontrado', 'O endereço pedido não existe ou o dado não foi encontrado.'],
          ['Timeout expired', 'tempo esgotado', 'A operação demorou demais e foi interrompida.']
        ] },
        { tipo: 'vocab', titulo: 'Palavras das mensagens de erro', pares: [
          ['connect / connection', 'conectar / conexão'],
          ['cannot', 'não consegue'],
          ['object', 'objeto'],
          ['instance', 'instância'],
          ['reference', 'referência'],
          ['set', 'definido'],
          ['resource', 'recurso'],
          ['does not exist', 'não existe'],
          ['while', 'enquanto'],
          ['waiting / wait', 'esperando / esperar'],
          ['server', 'servidor'],
          ['a / an', 'um / uma'],
          ['for', 'por / para'],
          ['timeout', 'tempo esgotado'],
          ['expired', 'expirou'],
          ['file / path', 'arquivo / caminho']
        ] },
        { tipo: 'ingles', frase: 'Cannot connect to the database.', traducao: 'Não é possível conectar ao banco de dados.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en01-a1',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada mensagem em inglês ao seu significado.',
        pares: [
          ['Cannot connect to the database', 'Não é possível conectar ao banco'],
          ['Object reference not set', 'Uma referência está nula'],
          ['Not Found', 'Não encontrado'],
          ['Timeout expired', 'O tempo esgotou']
        ],
        dicas: ['Cannot = não consegue.', 'Timeout = tempo limite.'],
        explicacao: 'Reconhecer essas quatro mensagens cobre boa parte dos erros do dia a dia em .NET.',
        conceitos: ['ingles.erros']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en01-a2',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'A mensagem é `Object reference not set to an instance of an object`. O que ela indica?',
        opcoes: [
          'Que algo que não existe (uma referência nula) foi acessado',
          'Que o banco de dados não existe',
          'Que a internet caiu',
          'Que o arquivo não foi encontrado'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Erro de banco teria "database" na mensagem.',
          2: 'Rede teria "connection" ou "timeout".',
          3: 'Arquivo teria "file" ou "path".'
        },
        dicas: ['"Reference not set" = referência não definida.', 'Lembre do vocabulário "database", "connection" e "file" da lição anterior para descartar as outras opções.'],
        explicacao: 'É a mensagem clássica de referência nula. Agora, em inglês, você sabe o que procurar: algo que deveria existir foi acessado sem estar definido.',
        conceitos: ['ingles.erros', 'ingles.vocabulario']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Lendo um ticket de trabalho',
      blocos: [
        { tipo: 'texto', texto: 'Issues e tickets costumam ter título curto, descrição e passos para reproduzir. Leia este exemplo:' },
        { tipo: 'codigo', linguagem: 'texto', codigo: 'Title: Orders are processed twice after retrying the request\n\nSteps to reproduce:\n1. Create an order\n2. Retry the request\n\nExpected: one order\nActual: duplicated orders' },
        { tipo: 'glossario', titulo: 'Vocabulário do ticket', itens: [
          ['orders', 'pedidos', 'Order = pedido; orders = pedidos.'],
          ['processed twice', 'processados duas vezes', 'Twice = duas vezes.'],
          ['retrying', 'tentando novamente', 'Retry = tentar de novo.'],
          ['Expected / Actual', 'esperado / real', 'O que deveria acontecer e o que acontece de fato.']
        ] },
        { tipo: 'vocab', titulo: 'Palavras de um ticket', pares: [
          ['Title', 'título'],
          ['Steps to reproduce', 'passos para reproduzir'],
          ['Create an order', 'criar um pedido'],
          ['after', 'depois de'],
          ['duplicated', 'duplicado'],
          ['application', 'aplicação'],
          ['returns', 'retorna'],
          ['client', 'cliente'],
          ['calling / to call', 'chamando / chamar'],
          ['wrong address', 'endereço errado'],
          ['bug', 'defeito / erro no sistema']
        ] },
        { tipo: 'nota', tom: 'info', texto: '"Steps to reproduce" são os passos para reproduzir o bug. Sem eles, a investigação fica muito mais difícil — e aprender a lê-los é metade do trabalho.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en01-a3',
        tipo: 'reading',
        dimensao: 'reconhecimento',
        titulo: 'GitHub issue #812',
        enunciado: 'Leia o ticket e responda.',
        texto: 'Title: The application returns duplicated orders after retrying the request.\n\nSteps to reproduce:\n1. Create an order\n2. Retry the request\n\nExpected: one order\nActual: two orders',
        pergunta: 'Qual é o problema relatado?',
        opcoes: [
          'Pedidos duplicados quando a requisição é repetida',
          'A aplicação não cria pedidos',
          'O banco de dados está fora do ar',
          'Os pedidos chegam com atraso'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O ticket diz "duplicated orders": os pedidos são criados em dobro.',
          2: 'Há dois pedidos, não zero.',
          3: 'O ticket não menciona indisponibilidade.'
        },
        dicas: ['"Duplicated" = duplicados.', '"After retrying" = depois de tentar novamente.'],
        explicacao: 'Esse é o tipo de bug real que aparece quando a mesma requisição é processada duas vezes — tema que você investigará em missões futuras da plataforma.',
        conceitos: ['ingles.leitura'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en01-a4',
        tipo: 'order-blocks',
        dimensao: 'ordenacao',
        enunciado: 'Ordene para formar: "O banco de dados está indisponível."',
        blocos: ['The', 'database', 'is', 'unavailable.'],
        dicas: ['"The database" é o sujeito.', 'O verbo "is" vem depois do sujeito.'],
        explicacao: 'The database is unavailable. — frase comum em alertas de produção.',
        conceitos: ['ingles.frases']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en01-a5',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Um colega estrangeiro escreveu no chat: "The request failed with 404. The client is calling the wrong address. Can you fix it?"',
        enunciado: 'O que ele está pedindo?',
        opcoes: [
          'Que você corrija o endereço, porque o cliente está chamando o lugar errado e recebendo 404',
          'Que você reinicie o banco de dados',
          'Que você crie um sistema novo do zero',
          'Que você ignore o erro 404'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O problema não é o banco, e sim o endereço que o cliente chama.',
          2: 'É uma correção pequena, não um sistema novo.',
          3: 'Há um problema claro a resolver.'
        },
        dicas: ['"Wrong address" = endereço errado.', '"Fix it" = corrija isso.'],
        explicacao: 'Você interpretou um pedido real de correção combinando o número 404 com as palavras request, client, wrong address e fix.',
        conceitos: ['ingles.leitura', 'ingles.erros'],
        desafio: true
      }
    }
  ]
});
