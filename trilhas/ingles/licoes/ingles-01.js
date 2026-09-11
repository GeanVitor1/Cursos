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
      titulo: 'Conectando ao banco',
      introduz: ['ingles.erros'],
      blocos: [
        { tipo: 'texto', texto: 'Mensagens de erro em inglês parecem assustadoras, mas quase sempre seguem o mesmo padrão: **o que falhou + onde + por quê**. Vamos destrinchar as mais comuns.' },
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['connect / connection', 'conectar / conexão'],
          ['cannot', 'não consegue']
        ] },
        { tipo: 'ingles', frase: 'Cannot connect to the database.', traducao: 'Não é possível conectar ao banco de dados.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en01-p1',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete a mensagem de erro.',
        codigo: 'Cannot {{1}} to the database.',
        lacunas: [['connect']],
        dicas: ['Connect é conectar.', 'A mensagem começa com Cannot.'],
        explicacao: 'Cannot connect to the database. — a mensagem de erro de conexão mais comum.',
        conceitos: ['ingles.erros']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Objeto e referência',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['object', 'objeto'],
          ['instance', 'instância'],
          ['reference', 'referência']
        ] },
        { tipo: 'ingles', frase: 'This is the object.', traducao: 'Este é o objeto.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en01-p2',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada palavra ao significado.',
        pares: [
          ['object', 'objeto'],
          ['instance', 'instância'],
          ['reference', 'referência']
        ],
        dicas: ['Instance vem de instanciar.', 'Reference é a referência a um objeto.'],
        explicacao: 'object, instance e reference: as palavras da mensagem de referência nula do .NET.',
        conceitos: ['ingles.erros']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Recurso e existência',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['set', 'definido'],
          ['resource', 'recurso'],
          ['does not exist', 'não existe']
        ] },
        { tipo: 'ingles', frase: 'The resource does not exist.', traducao: 'O recurso não existe.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en01-p3',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **resource**?',
        opcoes: ['Recurso', 'Objeto', 'Instância', 'Referência'],
        correta: 0,
        feedbackErro: {
          1: 'Objeto é object.',
          2: 'Instância é instance.',
          3: 'Referência é reference.'
        },
        dicas: ['É o que o servidor responde quando não encontra algo.', 'É a resposta que indica que algo não foi encontrado.'],
        explicacao: 'resource = recurso. Uma mensagem 404 diz que o recurso não existe.',
        conceitos: ['ingles.erros']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Tempo esgotado',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['timeout', 'tempo esgotado'],
          ['expired', 'expirou'],
          ['while', 'enquanto']
        ] },
        { tipo: 'ingles', frase: 'The connection expired.', traducao: 'A conexão expirou.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en01-p4',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **timeout**?',
        opcoes: ['Tempo esgotado', 'Conexão recusada', 'Recurso não encontrado', 'Objeto nulo'],
        correta: 0,
        feedbackErro: {
          1: 'Conexão recusada seria outra mensagem.',
          2: 'Recurso não encontrado é a resposta 404.',
          3: 'Objeto nulo é o erro de reference.'
        },
        dicas: ['Time + out = o tempo acabou.', 'É o que acontece quando a operação demora demais.'],
        explicacao: 'timeout = tempo esgotado. É o limite de tempo que a operação tinha para terminar.',
        conceitos: ['ingles.erros']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Servidor e espera',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['waiting / wait', 'esperando / esperar'],
          ['server', 'servidor'],
          ['for', 'por / para']
        ] },
        { tipo: 'ingles', frase: 'The server is waiting.', traducao: 'O servidor está esperando.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en01-p5',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete a frase.',
        codigo: 'The {{1}} is down.',
        lacunas: [['server']],
        dicas: ['É onde a aplicação roda.', 'Você viu essa palavra no inglês técnico.'],
        explicacao: 'The server is down. — frase comum em alertas de produção.',
        conceitos: ['ingles.erros']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Arquivo e caminho',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['file / path', 'arquivo / caminho'],
          ['found', 'encontrado'],
          ['of', 'de (posse / parte de)']
        ] },
        { tipo: 'ingles', frase: 'The file does not exist.', traducao: 'O arquivo não existe.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en01-p6',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada palavra ao significado.',
        pares: [
          ['file', 'arquivo'],
          ['path', 'caminho'],
          ['found', 'encontrado']
        ],
        dicas: ['File é o arquivo.', 'Path é o endereço do arquivo.'],
        explicacao: 'file, path e found: palavras de mensagens sobre arquivos e endereços.',
        conceitos: ['ingles.erros']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Mensagens de erro que você vai ver',
      blocos: [
        { tipo: 'codigo', linguagem: 'texto', codigo: 'Cannot connect to the database.\nObject reference not set to an instance of an object.\n404 Not Found: the resource does not exist.\nTimeout expired while waiting for the server.' },
        { tipo: 'glossario', titulo: 'Traduzindo as mensagens', itens: [
          ['Cannot connect to the database', 'não é possível conectar', 'A conexão (endereço, rede, servidor) está errada ou o banco está fora.'],
          ['Object reference not set...', 'referência nula', 'É o erro de referência nula: algo que não existe foi acessado.'],
          ['404 Not Found', 'recurso não encontrado', 'O endereço pedido não existe ou o dado não foi encontrado.'],
          ['Timeout expired', 'tempo esgotado', 'A operação demorou demais e foi interrompida.']
        ] }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Ticket: título e passos',
      blocos: [
        { tipo: 'texto', texto: 'Issues e tickets costumam ter título curto, descrição e passos para reproduzir. Vamos pelas palavras, três de cada vez.' },
        { tipo: 'vocab', titulo: 'Palavras novas (5)', pares: [
          ['Title', 'título'],
          ['Steps to reproduce', 'passos para reproduzir'],
          ['Create an order', 'criar um pedido']
        ] },
        { tipo: 'ingles', frase: 'Create an order.', traducao: 'Crie um pedido.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en01-p8',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **Title** em um ticket?',
        opcoes: ['Título', 'Descrição', 'Passos', 'Prioridade'],
        correta: 0,
        feedbackErro: {
          1: 'Descrição seria description.',
          2: 'Passos seria steps.',
          3: 'Prioridade seria priority.'
        },
        dicas: ['É a primeira linha do ticket.', 'Resume o problema em poucas palavras.'],
        explicacao: 'Title = título. É o resumo curto que aparece no topo da issue.',
        conceitos: ['ingles.leitura']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Ticket: o que aconteceu',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['after', 'depois de'],
          ['duplicated', 'duplicado'],
          ['application', 'aplicação']
        ] },
        { tipo: 'ingles', frase: 'The application is down.', traducao: 'A aplicação está fora do ar.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en01-p9',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete a frase.',
        codigo: 'The order is {{1}}.',
        lacunas: [['duplicated']],
        dicas: ['O pedido apareceu duas vezes.', 'Duplicated vem de duplicate.'],
        explicacao: 'The order is duplicated. — o efeito do bug que você vai investigar.',
        conceitos: ['ingles.leitura']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Ticket: quem chama',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['returns', 'retorna'],
          ['client', 'cliente'],
          ['calling / to call', 'chamando / chamar']
        ] },
        { tipo: 'ingles', frase: 'The application returns duplicated orders.', traducao: 'A aplicação retorna pedidos duplicados.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en01-p10',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada palavra ao significado.',
        pares: [
          ['returns', 'retorna'],
          ['client', 'cliente'],
          ['calling', 'chamando']
        ],
        dicas: ['Client é quem chama a aplicação.', 'Returns vem de return.'],
        explicacao: 'returns, client e calling: termos que descrevem como o cliente chama a aplicação.',
        conceitos: ['ingles.leitura']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Ticket: endereço e bug',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['wrong address', 'endereço errado'],
          ['bug', 'defeito / erro no sistema'],
          ['retrying', 'tentando novamente']
        ] },
        { tipo: 'ingles', frase: 'The client is calling the wrong address.', traducao: 'O cliente está chamando o endereço errado.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en01-p11',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'O que é um **bug**?',
        opcoes: ['Um defeito no sistema', 'Uma nova funcionalidade', 'Um servidor', 'Um arquivo de configuração'],
        correta: 0,
        feedbackErro: {
          1: 'Nova funcionalidade é feature.',
          2: 'Servidor é server.',
          3: 'Arquivo de configuração é config file.'
        },
        dicas: ['É o que o time investiga.', 'Aparece no título de qualquer issue.'],
        explicacao: 'bug = defeito no sistema. É o problema que o ticket descreve.',
        conceitos: ['ingles.leitura']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Lendo um ticket de trabalho',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['processed / twice', 'processado / duas vezes'],
          ['Expected / Actual', 'esperado / real']
        ] },
        { tipo: 'ingles', frase: 'The orders are processed twice.', traducao: 'Os pedidos são processados duas vezes.' },
        { tipo: 'codigo', linguagem: 'texto', codigo: 'Title: Orders are processed twice after retrying the request\n\nSteps to reproduce:\n1. Create an order\n2. Retry the request\n\nExpected: one order\nActual: duplicated orders' },
        { tipo: 'glossario', titulo: 'Vocabulário do ticket', itens: [
          ['orders', 'pedidos', 'Order = pedido; orders = pedidos.'],
          ['processed twice', 'processados duas vezes', 'Twice = duas vezes.'],
          ['retrying', 'tentando novamente', 'Retry = tentar de novo.'],
          ['Expected / Actual', 'esperado / real', 'O que deveria acontecer e o que acontece de fato.']
        ] },
        { tipo: 'nota', tom: 'info', texto: '"Steps to reproduce" são os passos para reproduzir o bug. Sem eles, a investigação fica muito mais difícil — e aprender a lê-los é metade do trabalho.' }
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
