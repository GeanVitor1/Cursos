Plataforma.registrarLicao({
  id: 'redis-03',
  trilha: 'redis',
  tipo: 'licao',
  titulo: 'Cache aside',
  subtitulo: 'Na prática · Etapa 5',
  duracaoMin: 50,
  xp: 30,
  objetivos: [
    'Aplicar o padrão cache aside',
    'Diferenciar acerto e falta no cache',
    'Explicar por que o cache é preenchido sob demanda',
    'Reconhecer as vantagens e as contrapartidas do padrão'
  ],
  conceitos: ['redis.cache', 'redis.servidor', 'redis.ttl', 'redis.cache-aside', 'ingles.vocabulario'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O padrão mais comum',
      introduz: ['redis.cache-aside'],
      blocos: [
        { tipo: 'retoma', conceito: 'redis.cache', texto: 'Você já viu que o cache guarda uma cópia para evitar trabalho repetido. Agora esse fluxo ganha nome e regras.' },
        { tipo: 'texto', texto: 'O **cache aside** é o padrão mais usado: o próprio código decide quando consultar o cache, quando ir ao banco e quando guardar o resultado.' },
        { tipo: 'passos', itens: [
          'Procure o valor no cache.',
          'Se encontrar, devolva na hora (acerto).',
          'Se não encontrar, busque na fonte (banco).',
          'Guarde o resultado no cache com um prazo.',
          'Devolva o resultado ao cliente.'
        ] },
        { tipo: 'conceito', id: 'redis.cache-aside', titulo: 'Cache aside', texto: 'O padrão em que a aplicação procura primeiro no cache, busca na fonte quando falta e guarda o resultado para as próximas leituras.', exemplo: 'if (cache.Get(chave) == null) { buscarNoBanco(); cache.Set(chave, valor); }' },
        { tipo: 'diagrama', arte: 'requisicao --> cache? --acerto--> resposta\n                   |\n                 falta\n                   |\n                 banco --> cache --> resposta', legenda: 'O cache fica ao lado do fluxo; quem coordena é o código.' },
        { tipo: 'nota', tom: 'info', texto: '**aside** significa "ao lado": o cache não intercepta a requisição sozinho, ele é consultado pelo código da aplicação.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis03-a1',
        tipo: 'scenario',
        enunciado: 'Qual mudança implementa cache aside para a lista de produtos?',
        cena: 'A lista de produtos é lida em quase toda navegação. A primeira versão do código consulta o banco em todas as chamadas.',
        opcoes: [
          'Procurar primeiro no cache; na falta, buscar no banco e guardar o resultado com prazo',
          'Guardar a lista no cache e nunca mais consultar o banco',
          'Consultar banco e cache ao mesmo tempo e usar o mais rápido',
          'Deixar o banco decidir quando usar o cache'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Sem nunca consultar o banco, o dado novo jamais apareceria.',
          2: 'Consultar os dois ao mesmo tempo joga fora o ganho: o banco continua sendo chamado sempre.',
          3: 'O banco não conhece o cache; quem coordena é a aplicação.'
        },
        dicas: ['O fluxo é: cache, depois banco, depois cache.', 'O prazo evita dado velho.'],
        explicacao: 'Cache aside é exatamente esse caminho: procurar no cache, cair para o banco na falta e guardar o resultado com prazo.',
        conceitos: ['redis.cache-aside']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Acerto e falta',
      blocos: [
        { tipo: 'texto', texto: 'Quando o valor está no cache, houve um **acerto** (cache hit). Quando não está, houve uma **falta** (cache miss) — e o caminho completo acontece, incluindo a gravação.' },
        { tipo: 'tabela', titulo: 'Os dois caminhos', colunas: ['Situação', 'Caminho', 'Tempo típico'], linhas: [
          ['Acerto', 'API -> cache', '2 ms'],
          ['Falta', 'API -> banco -> cache', '125 ms']
        ] },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'var valor = cache.Get("produto:10");\nif (valor == null)\n{\n    valor = BuscarNoBanco(10);\n    cache.Set("produto:10", valor, TimeSpan.FromMinutes(5));\n}\nreturn valor;' },
        { tipo: 'nota', tom: 'atencao', texto: 'O cache só é preenchido quando alguém pede: a primeira chamada é sempre uma falta. Quem chega depois aproveita o resultado.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis03-a2',
        tipo: 'interpret-code',
        enunciado: 'O que acontece quando a chave ainda não existe no cache?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'var valor = cache.Get("produto:10");\nif (valor == null)\n{\n    valor = BuscarNoBanco(10);\n    cache.Set("produto:10", valor, TimeSpan.FromMinutes(5));\n}\nreturn valor;' }
        ],
        opcoes: [
          'O código busca no banco e guarda o resultado no cache por 5 minutos',
          'O código devolve null e espera a próxima chamada',
          'O código cria uma chave vazia no cache',
          'O código apaga a chave e reinicia o Redis'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O valor é buscado e devolvido; o null serve apenas para detectar a falta.',
          2: 'Nenhuma chave vazia é criada: o cache recebe o resultado real.',
          3: 'Nada é apagado; a falta é só um caminho alternativo.'
        },
        dicas: ['Leia o if: quando o valor é null, qual é o próximo passo?', 'O cache é preenchido no caminho da falta.'],
        explicacao: 'Na falta, o código busca a fonte e grava o resultado com prazo de 5 minutos. A próxima leitura vira acerto.',
        conceitos: ['redis.cache-aside', 'redis.ttl']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis03-a3',
        tipo: 'fill-code',
        enunciado: 'Complete o trecho que detecta a falta e guarda o valor no cache.',
        codigo: 'var valor = cache.Get("produto:10");\nif (valor == {{1}})\n{\n    valor = BuscarNoBanco(10);\n    cache.{{2}}("produto:10", valor);\n}\nreturn valor;',
        lacunas: [['null'], ['set']],
        dicas: ['A ausência de valor se verifica com uma palavra que você já conhece do C#.', 'O método que grava no cache é o mesmo SET do Redis, em forma de método.'],
        explicacao: '`null` detecta a falta; `Set` grava o resultado para as próximas chamadas. É o cache aside em quatro linhas.',
        conceitos: ['redis.cache-aside']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Por que cache aside é o padrão',
      blocos: [
        { tipo: 'lista', itens: [
          'É simples: um `if` e duas chamadas.',
          'Só guarda o que é realmente pedido.',
          'Aguenta o cache ser reiniciado: a próxima leitura recarrega.',
          'Não exige mudanças na estrutura do banco.'
        ] },
        { tipo: 'texto', texto: 'A contrapartida: a primeira chamada é sempre lenta; a lógica de cache aparece em vários pontos de leitura; e quem grava precisa lidar com a cópia guardada.' },
        { tipo: 'futuro', titulo: 'Isso será importante depois', conceitos: ['redis.invalidacao'], texto: 'Guardar é a metade fácil. Na lição de invalidação você vai ver o que fazer quando o dado muda depois de já estar no cache.' },
        { tipo: 'trabalho', texto: 'Um time padronizou as leituras de catálogo com cache aside: todo service de leitura consulta o cache antes do banco. O código ficou repetitivo, mas previsível — e o banco parou de receber consultas iguais em sequência.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis03-a4',
        tipo: 'scenario',
        enunciado: 'O que explica a diferença entre a primeira e as demais chamadas?',
        cena: 'Em um teste de carga, a primeira chamada ao service de produtos demorou 130 ms e as seguintes, 3 ms.',
        opcoes: [
          'A primeira foi uma falta e pagou o banco; as seguintes acertaram o cache',
          'O Redis reiniciava a cada chamada',
          'O banco ficou mais rápido depois da primeira consulta',
          'O cache guarda apenas a primeira resposta'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Se o Redis reiniciasse, todas as chamadas seriam lentas.',
          2: 'O banco não muda de velocidade entre chamadas iguais.',
          3: 'O cache guarda o resultado até o prazo terminar; é isso que acelera as seguintes.'
        },
        dicas: ['Compare com a tabela de acerto e falta.', 'O primeiro acesso não encontra nada guardado.'],
        explicacao: 'A primeira chamada é uma falta: busca no banco e gravação. As seguintes são acertos e respondem em poucos milissegundos.',
        conceitos: ['redis.cache-aside']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis03-a5',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre o padrão cache aside.',
        afirmacoes: [
          { texto: 'O cache é preenchido quando alguém pede um dado que não está guardado.', correta: true, explicacao: 'A gravação acontece no caminho da falta.' },
          { texto: 'Toda leitura vai primeiro ao banco e depois ao cache.', correta: false, explicacao: 'A ordem é o contrário: cache primeiro; o banco só entra na falta.' },
          { texto: 'Se o Redis reiniciar, as próximas leituras recarregam os dados sob demanda.', correta: true, explicacao: 'As chaves somem, mas cada leitura na falta repõe a cópia.' }
        ],
        dicas: ['Pense na ordem das consultas.', 'O cache não precisa começar cheio.'],
        explicacao: 'No cache aside, o cache começa vazio e cresce conforme os dados são pedidos. O banco só é chamado na falta.',
        conceitos: ['redis.cache-aside']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Hit and miss',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras que o time usa o tempo todo: **hit** (acerto) e **miss** (falta).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['hit', 'acerto no cache'],
            ['miss', 'falta no cache']
          ]
        },
        { tipo: 'ingles', frase: 'On a cache miss, get the value from the database.', traducao: 'Em uma falta no cache, pegue o valor do banco de dados.' },
        { tipo: 'nota', tom: 'info', texto: 'As duas palavras também aparecem juntas com cache: **cache hit** e **cache miss**.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis03-a6',
        tipo: 'multiple-choice',
        enunciado: 'On a cache hit, the value is in the cache. O que a frase diz?',
        opcoes: [
          'Em um acerto, o valor está no cache.',
          'Em uma falta, o valor está no cache.',
          'O cache está sempre vazio.',
          'O banco devolve o valor do cache.'
        ],
        correta: 0,
        feedbackErro: {
          1: 'hit é acerto; falta seria miss.',
          2: 'A frase afirma que o valor está lá.',
          3: 'A frase fala do cache, não do banco.'
        },
        dicas: ['hit é o acerto.', 'value é o valor; from the database seria do banco.'],
        explicacao: 'On a cache hit, the value is in the cache = em um acerto, o valor está no cache. É a leitura rápida, sem tocar no banco.',
        conceitos: ['redis.cache-aside', 'ingles.vocabulario']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis03-a7',
        tipo: 'scenario',
        enunciado: 'Qual é o primeiro passo correto para aplicar cache aside nessa leitura?',
        cena: 'A leitura mais pesada da API é a lista de produtos em promoção: ela agrupa dados de três tabelas e é pedida milhares de vezes por dia.',
        opcoes: [
          'Medir a consulta e escolher uma chave e um prazo para o resultado dela',
          'Guardar todas as tabelas do banco no Redis',
          'Colocar cache apenas na escrita, para gravar mais rápido',
          'Remover o cache assim que a lentidão aparecer'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Cache aside guarda resultados de consulta, não as tabelas do banco.',
          2: 'Escrita não é o gargalo aqui; a leitura repetida é.',
          3: 'Remover o cache devolve o problema; o ajuste é de chave e prazo.'
        },
        dicas: ['Cache aside precisa de uma chave e de um prazo.', 'A leitura cara e repetida é a candidata.'],
        explicacao: 'Antes de guardar, é preciso saber qual é a chave (o que identifica o resultado) e qual prazo é aceitável. Sem isso, o cache não ajuda.',
        conceitos: ['redis.cache-aside'],
        desafio: true
      }
    }
  ]
});
