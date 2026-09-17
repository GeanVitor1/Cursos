Plataforma.registrarLicao({
  id: 'redis-checkpoint-fundamentos',
  trilha: 'redis',
  tipo: 'prova',
  titulo: 'Checkpoint — Fundamentos',
  subtitulo: 'Fundamentos · Etapa 4',
  duracaoMin: 30,
  xp: 100,
  objetivos: [
    'Justificar por que o cache existe e quando ele compensa',
    'Usar o modelo chave-valor do Redis com SET, GET e DEL',
    'Aplicar TTL e interpretar as respostas do comando',
    'Escolher prazos de validade coerentes com cada dado'
  ],
  conceitos: ['redis.cache', 'redis.servidor', 'redis.ttl', 'ingles.vocabulario'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova de nível: Fundamentos do Redis',
      blocos: [
        { tipo: 'texto', texto: 'São **9 atividades** cobrindo por que o cache existe, o modelo chave-valor do Redis e o TTL. Não há nota de bloqueio: o resultado mostra o que já está dominado e o que deve voltar na revisão.' },
        { tipo: 'lista', itens: [
          'Leia cada cenário como se fosse um chamado real.',
          'Pode usar dicas — o resultado continua contando.',
          'Ao final, você verá seu domínio conceito por conceito.'
        ] }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-f1',
        tipo: 'multiple-choice',
        enunciado: 'O catálogo recebe 800 acessos por hora e quase todos pedem a mesma lista. Qual é o efeito esperado do cache nesse cenário?',
        opcoes: [
          'O banco passa a atender bem menos consultas e a resposta fica mais rápida',
          'O banco deixa de ser consultado em qualquer situação',
          'O banco fica mais rápido para todas as outras consultas do sistema',
          'A lista passa a ser atualizada automaticamente a cada mudança'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A primeira chamada e as expirações continuam indo ao banco.',
          2: 'O cache não acelera por mágica o banco; ele evita chamadas repetidas.',
          3: 'Atualizar sozinho não é papel do cache: a cópia é recarregada sob demanda.'
        },
        dicas: ['Pense no número de consultas que chegam ao banco.', 'O cache não muda o banco; ele evita chamá-lo.'],
        explicacao: 'O cache devolve a lista pronta e poupa o banco de centenas de consultas iguais. A fonte da verdade não muda.',
        conceitos: ['redis.cache']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-f2',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre cache e Redis.',
        afirmacoes: [
          { texto: 'O cache guarda uma cópia do resultado; a fonte da verdade continua no banco.', correta: true, explicacao: 'A cópia pode ser descartada e recarregada a qualquer momento.' },
          { texto: 'O Redis guarda os dados em memória e responde por chave.', correta: true, explicacao: 'Ele não tem tabelas nem SQL: trabalha com pares de chave e valor.' },
          { texto: 'O Redis substitui o banco relacional em um sistema de vendas.', correta: false, explicacao: 'Ele acelera leituras; dados que exigem garantia continuam no banco relacional.' }
        ],
        dicas: ['Cópia e fonte da verdade são papéis diferentes.', 'O Redis é rápido, mas não é onde a verdade mora.'],
        explicacao: 'Redis é um servidor de chave-valor em memória, usado como cópia rápida. O banco relacional continua sendo a fonte da verdade.',
        conceitos: ['redis.cache', 'redis.servidor']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-f3',
        tipo: 'fill-code',
        enunciado: 'Complete para guardar o valor e já definir 60 segundos de prazo.',
        codigo: 'SET produto:10 "Mouse" {{1}} 60\nGET produto:10',
        lacunas: [['ex']],
        dicas: ['A forma curta de expiração vem depois do valor.', 'São duas letras.'],
        explicacao: '`SET produto:10 "Mouse" EX 60` grava e define o prazo de uma vez — o jeito mais usado no dia a dia.',
        conceitos: ['redis.servidor', 'redis.ttl']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-f4',
        tipo: 'predict-output',
        enunciado: 'Qual é a resposta do último comando?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'SET produto:10 "Mouse" EX 60\nEXPIRE produto:10 30\nTTL produto:10' }
        ],
        opcoes: [
          '30',
          '60',
          '90',
          '-1'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O segundo prazo substitui o primeiro: o TTL virou 30.',
          2: 'Os prazos não se somam; o último EXPIRE manda.',
          3: '-1 seria para uma chave sem prazo definido.'
        },
        dicas: ['O EXPIRE redefine o prazo da chave.', 'Ele vale mais que o EX do SET original.'],
        explicacao: 'O EXPIRE substitui o prazo anterior: a chave passa a ter 30 segundos. O TTL responde 30.',
        conceitos: ['redis.ttl']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-f5',
        tipo: 'order-blocks',
        enunciado: 'Ordene a sequência que grava uma chave, define o prazo, confere o tempo restante e lê o valor.',
        blocos: [
          'SET produto:10 "Mouse"',
          'EXPIRE produto:10 60',
          'TTL produto:10',
          'GET produto:10'
        ],
        dicas: ['Não se define prazo de uma chave que ainda não existe.', 'A leitura vem por último.'],
        explicacao: 'Gravar com SET, definir prazo com EXPIRE, conferir com TTL e só então ler com GET. A ordem importa quando o prazo depende da chave existir.',
        conceitos: ['redis.servidor', 'redis.ttl']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-f6',
        tipo: 'scenario',
        cena: 'A lista de mais vendidos muda ao longo do dia e o time aceita mostrar um resultado com até 5 minutos de atraso.',
        enunciado: 'Qual configuração atende melhor?',
        opcoes: [
          'Cache com prazo de 5 minutos',
          'Cache sem prazo',
          'Cache com prazo de 24 horas',
          'Sem cache, consultando o banco a cada acesso'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Sem prazo, a lista pode ficar desatualizada por dias.',
          2: '24 horas de prazo é muito para um dado que muda ao longo do dia.',
          3: 'Sem cache, todos os acessos pagam o custo do banco sem necessidade.'
        },
        dicas: ['O time definiu o atraso aceitável.', 'O prazo deve refletir esse atraso.'],
        explicacao: 'O prazo é uma decisão de produto: se 5 minutos de atraso são aceitáveis, 5 minutos de TTL entregam velocidade com risco controlado.',
        conceitos: ['redis.ttl'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-f7',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada comando à sua ação.',
        pares: [
          ['SET', 'guarda um valor'],
          ['GET', 'lê um valor'],
          ['DEL', 'remove uma chave'],
          ['EXPIRE', 'define o prazo de uma chave'],
          ['TTL', 'mostra quantos segundos restam']
        ],
        dicas: ['SET e GET são os mais usados.', 'EXPIRE cria o prazo; TTL apenas informa.'],
        explicacao: 'Os cinco comandos formam o vocabulário básico de cache no Redis: gravar, ler, remover, definir prazo e conferir prazo.',
        conceitos: ['redis.servidor', 'redis.ttl']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-f8',
        tipo: 'write-code',
        enunciado: 'Escreva o comando que guarda a chave `produto:10` com o valor Mouse e prazo de 60 segundos.',
        respostasAceitas: [
          'set produto:10 "mouse" ex 60',
          'set produto:10 mouse ex 60',
          "set produto:10 'mouse' ex 60"
        ],
        dicas: ['Use a forma curta de expiração depois do valor.', 'A ordem é SET, chave, valor, EX e o tempo.'],
        explicacao: '`SET produto:10 "Mouse" EX 60` grava o valor e define o prazo em um único comando.',
        conceitos: ['redis.servidor', 'redis.ttl']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-f9',
        tipo: 'multiple-choice',
        enunciado: 'The value is in the cache. O que a frase diz?',
        opcoes: [
          'O valor está no cache.',
          'O cache está vazio.',
          'O valor expirou.',
          'O banco tem o valor.'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A frase afirma que o valor está lá, não que falta.',
          2: 'Expirar seria outra palavra; a frase apenas localiza o valor.',
          3: 'A frase fala do cache, não do banco.'
        },
        dicas: ['value é o valor; cache é o cache.', 'in marca onde o valor está.'],
        explicacao: 'The value is in the cache = o valor está no cache. Essa é a situação de acerto na leitura.',
        conceitos: ['redis.cache', 'ingles.vocabulario']
      }
    }
  ]
});
