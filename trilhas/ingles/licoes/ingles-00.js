Plataforma.registrarLicao({
  id: 'ingles-00',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Vocabulário essencial: request, response, database',
  subtitulo: 'English · Etapa 0',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Reconhecer as palavras técnicas mais frequentes',
    'Associar cada palavra ao significado em português',
    'Montar e entender frases curtas do trabalho'
  ],
  conceitos: ['ingles.vocabulario', 'ingles.frases'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'As palavras que aparecem todo dia (1)',
      introduz: ['ingles.vocabulario'],
      blocos: [
        { tipo: 'texto', texto: 'Você não precisa ser fluente para trabalhar. Precisa reconhecer o vocabulário que se repete em documentação, mensagens de erro, tickets e reuniões. Vamos em grupos de três palavras.' },
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['request', 'requisição / pedido'],
          ['response', 'resposta'],
          ['database', 'banco de dados']
        ] },
        { tipo: 'ingles', frase: 'The request and the response.', traducao: 'A requisição e a resposta.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en00-p1',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada palavra em inglês ao significado.',
        pares: [
          ['request', 'requisição / pedido'],
          ['response', 'resposta'],
          ['database', 'banco de dados']
        ],
        dicas: ['É o que o cliente envia para o servidor.', 'A resposta tem outro nome em inglês.'],
        explicacao: 'request/response é a dupla da comunicação entre cliente e servidor; database é o banco de dados.',
        conceitos: ['ingles.vocabulario']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'As palavras que aparecem todo dia (2)',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['error', 'erro'],
          ['build', 'compilação / construir'],
          ['deploy', 'implantação / publicar']
        ] },
        { tipo: 'ingles', frase: 'The deploy has an error.', traducao: 'A implantação tem um erro.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en00-p2',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'Qual é o significado de **deploy**?',
        opcoes: ['implantação / publicar', 'requisição', 'ramificação', 'erro'],
        correta: 0,
        feedbackErro: {
          1: 'Requisição é request.',
          2: 'Ramificação é branch.',
          3: 'Erro é error.'
        },
        dicas: ['É o que se faz quando a aplicação vai para o servidor.', 'Pense em publicar uma nova versão.'],
        explicacao: 'Deploy = implantação: colocar a aplicação no ambiente onde ela vai rodar.',
        conceitos: ['ingles.vocabulario']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'As palavras que aparecem todo dia (3)',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['issue', 'problema / tarefa registrada'],
          ['branch', 'ramificação (Git)']
        ] },
        { tipo: 'ingles', frase: 'The issue is here.', traducao: 'O problema está aqui.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en00-p3',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada palavra ao significado.',
        pares: [
          ['issue', 'problema / tarefa registrada'],
          ['branch', 'ramificação (Git)']
        ],
        dicas: ['Issue aparece em qualquer repositório.', 'Branch é uma linha de trabalho no Git.'],
        explicacao: 'issue = problema registrado; branch = ramificação de código.',
        conceitos: ['ingles.vocabulario']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'A frase que você mais vai ler',
      introduz: ['ingles.frases'],
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['failed', 'falhou'],
          ['unavailable', 'indisponível'],
          ['because', 'porque']
        ] },
        { tipo: 'ingles', frase: 'The request failed because the database is unavailable.', traducao: 'A requisição falhou porque o banco de dados está indisponível.' },
        { tipo: 'nota', tom: 'info', texto: 'A estrutura da mensagem é sempre a mesma: **o que falhou + because + por quê**.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en00-p4',
        tipo: 'order-blocks',
        dimensao: 'ordenacao',
        enunciado: 'Ordene as palavras para formar a frase: "A requisição falhou."',
        blocos: ['The', 'request', 'failed.'],
        dicas: ['Sujeito primeiro, depois o verbo.', 'The = o/a; request = requisição; failed = falhou.'],
        explicacao: 'The request failed. — a frase mais comum de todo log de sistema.',
        conceitos: ['ingles.frases']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Verbos de mensagens (1)',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['works', 'funciona'],
          ['review', 'revisar'],
          ['merge', 'mesclar / juntar alterações']
        ] },
        { tipo: 'ingles', frase: 'The build works.', traducao: 'A compilação funciona.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en00-p5',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete a frase com o verbo correto.',
        codigo: 'The build {{1}}.',
        lacunas: [['works']],
        dicas: ['A compilação está funcionando.', 'O verbo é works.'],
        explicacao: 'The build works. — frase comum em avisos de pipeline.',
        conceitos: ['ingles.frases']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Verbos de mensagens (2)',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['fix', 'corrigir'],
          ['retry', 'tentar novamente'],
          ['down', 'fora do ar / caído']
        ] },
        { tipo: 'ingles', frase: 'Please fix the build.', traducao: 'Por favor, corrija a compilação.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en00-p6',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **retry**?',
        opcoes: ['Tentar novamente', 'Corrigir', 'Revisar', 'Publicar'],
        correta: 0,
        feedbackErro: {
          1: 'Corrigir é fix.',
          2: 'Revisar é review.',
          3: 'Publicar é deploy.'
        },
        dicas: ['Retry significa tentar de novo.', 'Aparece em mensagens de erro e botões.'],
        explicacao: 'retry = tentar novamente. Junto com fix (corrigir) e review (revisar), cobre os pedidos do time.',
        conceitos: ['ingles.vocabulario']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Mudanças e conexão',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['change', 'mudança / alteração'],
          ['connection', 'conexão'],
          ['wrong', 'errado / errada']
        ] },
        { tipo: 'ingles', frase: 'The connection is wrong.', traducao: 'A conexão está errada.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en00-p7',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada palavra ao significado.',
        pares: [
          ['change', 'mudança / alteração'],
          ['connection', 'conexão'],
          ['wrong', 'errado / errada']
        ],
        dicas: ['Change aparece em pedidos de alteração.', 'Wrong é o contrário de certo.'],
        explicacao: 'change, connection e wrong: palavras que aparecem em qualquer investigação de bug.',
        conceitos: ['ingles.vocabulario']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Palavras da conversa do time',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['config (configuration)', 'configuração'],
          ['Hey', 'Oi (informal)'],
          ['chat', 'bate-papo / conversa online']
        ] },
        { tipo: 'ingles', frase: 'Hey, the database connection is wrong.', traducao: 'Oi, a conexão com o banco está errada.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en00-p8',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **config**?',
        opcoes: ['Configuração', 'Conexão', 'Compilação', 'Conversa'],
        correta: 0,
        feedbackErro: {
          1: 'Conexão é connection.',
          2: 'Compilação é build.',
          3: 'Conversa é chat.'
        },
        dicas: ['É a forma curta de configuration.', 'Aparece em arquivos e pedidos do time.'],
        explicacao: 'config = configuration = configuração. Uma das palavras mais usadas no dia a dia.',
        conceitos: ['ingles.vocabulario']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Montando frases do trabalho',
      introduz: ['ingles.leitura'],
      blocos: [
        { tipo: 'texto', texto: 'O inglês técnico usa frases curtas e diretas. A estrutura básica é: **sujeito + verbo + complemento**.' },
        { tipo: 'codigo', linguagem: 'texto', codigo: 'The request failed.\nThe database is down.\nPlease review this change.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Em inglês, o adjetivo costuma vir antes do substantivo: **database error** = erro de banco; **pull request** = pedido de integração. Ler na ordem literal ajuda no começo.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en00-a1',
        tipo: 'translate',
        dimensao: 'associacao',
        enunciado: 'Qual é o significado de **request**?',
        termo: 'request',
        direcao: 'en-pt',
        opcoes: ['requisição / pedido', 'resposta', 'erro', 'compilação'],
        correta: 0,
        feedbackErro: {
          1: 'Resposta é **response**. A dupla request/response é a base da comunicação entre cliente e servidor.',
          2: 'Erro é **error**.',
          3: 'Compilação é **build**.'
        },
        dicas: ['É o que o cliente envia para o servidor.', 'A resposta tem outro nome em inglês.'],
        explicacao: 'Request = requisição. É o pedido que o cliente faz; a resposta é a response.',
        conceitos: ['ingles.vocabulario']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en00-a2',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada palavra em inglês ao significado em português.',
        pares: [
          ['response', 'Resposta'],
          ['database', 'Banco de dados'],
          ['error', 'Erro'],
          ['build', 'Compilação'],
          ['deploy', 'Implantação']
        ],
        dicas: ['Database aparece em toda documentação de banco de dados.', 'Deploy é o ato de publicar a aplicação.'],
        explicacao: 'Esse é o vocabulário mínimo para ler qualquer issue ou mensagem de erro.',
        conceitos: ['ingles.vocabulario']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en00-a3',
        tipo: 'translate',
        dimensao: 'associacao',
        enunciado: 'Qual é o significado de **deploy**?',
        termo: 'deploy',
        direcao: 'en-pt',
        opcoes: ['implantação / publicar', 'requisição', 'ramificação', 'erro'],
        correta: 0,
        feedbackErro: {
          1: 'Requisição é request.',
          2: 'Ramificação é branch.',
          3: 'Erro é error.'
        },
        dicas: ['É o que se faz quando a aplicação vai para o servidor.', 'Pense em publicar uma nova versão.'],
        explicacao: 'Deploy = implantação: colocar a aplicação no ambiente onde ela vai rodar.',
        conceitos: ['ingles.vocabulario']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en00-a5',
        tipo: 'reading',
        dimensao: 'reconhecimento',
        titulo: 'Mensagem do time',
        enunciado: 'Leia a mensagem e responda.',
        texto: 'Hey, the deploy failed because the database connection is wrong. Can you review the config?',
        pergunta: 'O que o colega está pedindo?',
        opcoes: [
          'Que você revise a configuração, pois o deploy falhou por causa da conexão com o banco',
          'Que você faça um novo deploy imediatamente',
          'Que você crie um banco de dados novo',
          'Que você ignore o problema'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O colega quer entender a causa antes de tentar de novo.',
          2: 'O banco existe; a conexão é que está errada.',
          3: 'Ninguém pediu para ignorar.'
        },
        dicas: ['"Review the config" = revise a configuração.', '"Because" introduz a causa do problema.'],
        explicacao: 'Você acabou de entender uma mensagem real de trabalho usando o vocabulário da lição.',
        conceitos: ['ingles.leitura', 'ingles.vocabulario']
      }
    }
  ]
});
