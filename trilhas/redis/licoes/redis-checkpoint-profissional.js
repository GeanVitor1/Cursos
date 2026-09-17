Plataforma.registrarLicao({
  id: 'redis-checkpoint-profissional',
  trilha: 'redis',
  tipo: 'prova',
  titulo: 'Checkpoint final — Redis',
  subtitulo: 'Na prática · Etapa 9',
  duracaoMin: 45,
  xp: 100,
  objetivos: [
    'Aplicar cache aside no fluxo de leitura',
    'Serializar e desserializar objetos no cache',
    'Invalidar o cache nos pontos de escrita',
    'Integrar o Redis ao ASP.NET Core de forma configurável'
  ],
  conceitos: ['redis.cache', 'redis.servidor', 'redis.ttl', 'redis.cache-aside', 'redis.serializacao', 'redis.invalidacao', 'redis.integracao', 'ingles.vocabulario'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova de nível: Redis na prática',
      blocos: [
        { tipo: 'texto', texto: 'São **10 atividades** cobrindo cache aside, serialização, invalidação e a integração com o ASP.NET Core. Não há nota de bloqueio: o resultado mostra o que já está dominado e o que deve voltar na revisão.' },
        { tipo: 'lista', itens: [
          'Os cenários misturam os conceitos, como no dia a dia.',
          'Pode usar dicas — o resultado continua contando.',
          'Ao final, você verá seu domínio conceito por conceito.'
        ] }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-p1',
        tipo: 'multiple-choice',
        enunciado: 'Em um service com cache aside, qual é a ordem correta de uma leitura?',
        opcoes: [
          'Procurar no cache; na falta, buscar no banco e guardar o resultado',
          'Buscar no banco; depois copiar para o cache sempre',
          'Procurar no banco; se falhar, procurar no cache',
          'Guardar no cache; depois procurar no banco para confirmar'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Copiar sempre desperdiça o cache: toda chamada paga o banco.',
          2: 'A ordem é o contrário: cache primeiro, banco na falta.',
          3: 'Gravar antes de pedir encheria o cache de dados que ninguém usa.'
        },
        dicas: ['Pense no fluxo em cinco passos da lição.', 'O banco só entra quando o cache não tem o valor.'],
        explicacao: 'Cache aside: cache primeiro, banco na falta, gravação com prazo e resposta. É o padrão que combina velocidade e simplicidade.',
        conceitos: ['redis.cache-aside']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-p2',
        tipo: 'fill-code',
        enunciado: 'Complete o caminho da falta, incluindo a serialização.',
        codigo: 'var guardado = await cache.GetStringAsync(chave);\nif (guardado == {{1}})\n{\n    var produto = await context.Produtos.FindAsync(id);\n    var texto = JsonSerializer.{{2}}(produto);\n    await cache.SetStringAsync(chave, texto);\n}',
        lacunas: [['null'], ['serialize']],
        dicas: ['A falta é detectada com a ausência de valor.', 'O objeto vira texto antes de ser gravado.'],
        explicacao: '`null` detecta a falta; `Serialize` converte o objeto em texto. Só depois o valor vai para o cache.',
        conceitos: ['redis.cache-aside', 'redis.serializacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-p3',
        tipo: 'predict-output',
        enunciado: 'Qual é a resposta do último comando?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'SET produto:10 "Mouse" EX 120\nEXPIRE produto:10 45\nTTL produto:10' }
        ],
        opcoes: [
          '45',
          '120',
          '165',
          '-1'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O EXPIRE substitui o prazo anterior.',
          2: 'Os prazos não se somam.',
          3: '-1 seria para uma chave sem prazo definido.'
        },
        dicas: ['O segundo prazo manda.', 'O comando redefine, não acumula.'],
        explicacao: 'O EXPIRE redefine o prazo da chave para 45 segundos. O TTL devolve o tempo restante.',
        conceitos: ['redis.ttl']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-p4',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada comando à sua ação.',
        pares: [
          ['SET', 'grava um valor'],
          ['EXPIRE', 'define o prazo de uma chave'],
          ['GET', 'lê um valor'],
          ['DEL', 'remove a chave'],
          ['TTL', 'mostra o tempo restante']
        ],
        dicas: ['Os comandos de prazo são EXPIRE e TTL.', 'DEL não mostra nada: ele apaga.'],
        explicacao: 'O vocabulário completo do cache: gravar, ler, remover, dar prazo e conferir prazo.',
        conceitos: ['redis.servidor', 'redis.ttl']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-p5',
        tipo: 'interpret-code',
        enunciado: 'O que esse trecho faz?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'var texto = JsonSerializer.Serialize(produto);\nawait cache.SetStringAsync("produto:10", texto);\n// ...\nvar jsonLido = await cache.GetStringAsync("produto:10");\nvar produtoLido = JsonSerializer.Deserialize<Produto>(jsonLido);' }
        ],
        opcoes: [
          'Grava o produto como texto JSON e reconstrói o objeto na leitura',
          'Grava o objeto e lê o objeto, sem conversão',
          'Grava apenas o preço do produto no cache',
          'Compara o produto do cache com o do banco'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O cache não guarda objetos: há conversão nos dois sentidos.',
          2: 'O texto gravado contém o objeto inteiro, não só um campo.',
          3: 'Não há comparação: são gravação e leitura.'
        },
        dicas: ['Repare no Serialize na ida e no Deserialize na volta.', 'O cache guarda texto.'],
        explicacao: 'Serializar para gravar, desserializar para ler: o ciclo completo de um objeto no cache.',
        conceitos: ['redis.serializacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-p6',
        tipo: 'find-error',
        enunciado: 'O produto mudou e a chave `produto:10` foi removida, mas a vitrine continua com o preço antigo. Por quê?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'produto.Preco = 120;\nawait context.SaveChangesAsync();\nawait cache.RemoveAsync("produto:10");' }
        ],
        opcoes: [
          'A vitrine lê a chave da lista de produtos, que também precisa ser removida',
          'A chave produto:10 não existia no cache',
          'RemoveAsync não funciona depois do SaveChangesAsync',
          'Faltou serializar antes de remover'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A remoção não dá erro quando a chave não existe.',
          2: 'A ordem está correta: banco primeiro, cache depois.',
          3: 'Remover não exige serializar: a chave é só um nome.'
        },
        dicas: ['Um mesmo dado pode estar guardado em mais de uma chave.', 'A lista também contém o preço antigo.'],
        explicacao: 'A lista de produtos também guardava o preço antigo. Invalidação significa remover todas as chaves afetadas pela mudança.',
        conceitos: ['redis.invalidacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-p7',
        tipo: 'order-blocks',
        enunciado: 'Ordene a alteração completa que não deixa dado velho no cache.',
        blocos: [
          'Alterar o preço no objeto',
          'Salvar no banco com SaveChanges',
          'Remover as chaves afetadas do cache',
          'A próxima leitura recarrega o valor atualizado'
        ],
        dicas: ['O banco precisa estar atualizado antes da remoção.', 'A releitura é a consequência final.'],
        explicacao: 'Alterar, salvar, remover e deixar a próxima leitura recarregar. Remover antes de salvar poderia regravar o valor antigo.',
        conceitos: ['redis.invalidacao', 'redis.cache-aside']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-p8',
        tipo: 'fill-code',
        enunciado: 'Complete o registro do Redis no programa.',
        codigo: 'builder.Services.{{1}}(opcoes =>\n{\n    opcoes.{{2}} = "localhost:6379";\n});',
        lacunas: [['addstackexchangerediscache'], ['configuration']],
        dicas: ['O método de registro começa com Add.', 'A propriedade guarda o endereço do servidor.'],
        explicacao: '`AddStackExchangeRedisCache` registra o provedor e `Configuration` aponta para o servidor Redis.',
        conceitos: ['redis.integracao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-p9',
        tipo: 'scenario',
        enunciado: 'Qual conjunto de decisões atende aos três pedidos?',
        cena: 'A API de catálogo vai ganhar cache. O time quer leitura rápida da lista de produtos, preço correto logo depois de uma alteração e o mesmo código rodando local e em produção.',
        opcoes: [
          'Cache aside no service com prazo curto, remoção das chaves ao gravar e endereço do Redis vindo de configuração',
          'Cache aside no endpoint com prazo de 24 horas e endereço fixo no código',
          'Guardar tudo no cache sem prazo e limpar o cache inteiro a cada alteração',
          'Consultar banco e cache sempre, usando o banco para conferir'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Prazo longo e endereço fixo quebram o preço correto e a portabilidade.',
          2: 'Sem prazo, sobra dado velho; limpar tudo joga fora o ganho.',
          3: 'Conferir sempre no banco anula o cache: o banco volta a ser chamado em toda leitura.'
        },
        dicas: ['Cada pedido tem uma técnica correspondente.', 'Preço correto pede invalidação; ambientes diferentes pedem configuração.'],
        explicacao: 'Prazo curto, remoção ao gravar e configuração por ambiente: cache aside no service cobre velocidade, consistência e portabilidade.',
        conceitos: ['redis.integracao', 'redis.invalidacao', 'redis.cache-aside', 'redis.ttl'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-redis-p10',
        tipo: 'multiple-choice',
        enunciado: 'The cache is stale. O que a frase diz?',
        opcoes: [
          'O cache está desatualizado.',
          'O cache está vazio.',
          'O cache é rápido.',
          'O cache foi removido.'
        ],
        correta: 0,
        feedbackErro: {
          1: 'stale é desatualizado; vazio seria outra palavra.',
          2: 'A frase fala de idade do dado, não de velocidade.',
          3: 'A frase não diz que a chave foi removida.'
        },
        dicas: ['stale lembra velho.', 'A frase fala do estado do dado guardado.'],
        explicacao: 'The cache is stale = o cache está desatualizado. É exatamente o problema que a invalidação resolve.',
        conceitos: ['redis.invalidacao', 'ingles.vocabulario']
      }
    }
  ]
});
