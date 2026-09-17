Plataforma.registrarLicao({
  id: 'redis-06',
  trilha: 'redis',
  tipo: 'licao',
  titulo: 'ASP.NET Core + Redis',
  subtitulo: 'Na prática · Etapa 8',
  duracaoMin: 55,
  xp: 30,
  objetivos: [
    'Registrar o Redis no container de injeção do ASP.NET Core',
    'Injetar IDistributedCache em um service',
    'Usar cache aside, serialização e invalidação dentro do service',
    'Manter a configuração de conexão fora do código'
  ],
  conceitos: ['redis.cache-aside', 'redis.serializacao', 'redis.invalidacao', 'redis.integracao', 'csharp.di', 'ingles.vocabulario'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Registrar o Redis no builder',
      introduz: ['redis.integracao'],
      blocos: [
        { tipo: 'retoma', conceito: 'csharp.di', texto: 'Você já viu injeção de dependência: a classe recebe o que precisa pelo construtor. O cache segue exatamente a mesma ideia.' },
        { tipo: 'texto', texto: 'O ASP.NET Core tem uma abstração pronta para cache distribuído: a interface `IDistributedCache`. O Redis entra como o **provedor** registrado no builder.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'var builder = WebApplication.CreateBuilder(args);\n\nbuilder.Services.AddStackExchangeRedisCache(opcoes =>\n{\n    opcoes.Configuration = "localhost:6379";\n});' },
        { tipo: 'glossario', titulo: 'Entendendo o registro', itens: [
          ['AddStackExchangeRedisCache', 'registrar o Redis', 'Liga o servidor Redis à abstração de cache da aplicação.'],
          ['opcoes.Configuration', 'endereço do servidor', 'String de conexão do Redis, com host e porta.'],
          ['localhost:6379', 'endereço padrão', 'localhost é a própria máquina; 6379 é a porta padrão do Redis.']
        ] },
        { tipo: 'conceito', id: 'redis.integracao', titulo: 'Redis no ASP.NET Core', texto: 'Registrar o provedor do Redis no container e usar o cache dentro de um service, sem criar conexões à mão.', exemplo: 'builder.Services.AddStackExchangeRedisCache(...)' },
        { tipo: 'nota', tom: 'info', texto: 'Registrar é uma linha no início do programa. Depois disso, qualquer service pode pedir a interface do cache pelo construtor.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis06-a1',
        tipo: 'fill-code',
        enunciado: 'Complete o registro do Redis no builder.',
        codigo: 'builder.Services.{{1}}(opcoes =>\n{\n    opcoes.Configuration = "localhost:6379";\n});',
        lacunas: [['addstackexchangerediscache']],
        dicas: ['O nome começa com Add.', 'O método foi apresentado no glossário acima.'],
        explicacao: '`AddStackExchangeRedisCache` registra o provedor do Redis. A configuração vem em uma lambda com o endereço do servidor.',
        conceitos: ['redis.integracao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis06-a2',
        tipo: 'multiple-choice',
        enunciado: 'Para que serve o endereço `localhost:6379` no registro?',
        opcoes: [
          'Informar onde o servidor Redis está ouvindo',
          'Definir o prazo padrão das chaves',
          'Escolher quais tabelas vão para o cache',
          'Criar o banco de dados relacional'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Prazo é definido por chave, no momento da gravação.',
          2: 'O Redis não conhece tabelas; ele guarda chaves.',
          3: 'O banco relacional tem a configuração dele, separada desta.'
        },
        dicas: ['localhost é a própria máquina; 6379 é a porta do Redis.', 'Sem endereço, a aplicação não sabe com quem falar.'],
        explicacao: 'A configuração diz onde está o servidor Redis. Em outro ambiente, esse endereço muda — e o código não.',
        conceitos: ['redis.integracao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Injetar no service',
      blocos: [
        { tipo: 'texto', texto: 'Quem precisa do cache recebe `IDistributedCache` pelo construtor — exatamente como você já faz com o DbContext.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'public class ProdutoService\n{\n    private readonly IDistributedCache cache;\n    private readonly MercadoAuroraContext context;\n\n    public ProdutoService(IDistributedCache cache, MercadoAuroraContext context)\n    {\n        this.cache = cache;\n        this.context = context;\n    }\n}' },
        { tipo: 'glossario', titulo: 'Entendendo os campos', itens: [
          ['IDistributedCache', 'interface do cache', 'Abstração do ASP.NET Core para cache distribuído; o Redis é o provedor registrado.'],
          ['private readonly', 'campo somente leitura', 'O campo é preenchido no construtor e não muda depois.']
        ] },
        { tipo: 'nota', tom: 'info', texto: 'Injetar a interface em vez de criar a conexão à mão mantém o service testável e deixa a configuração em um lugar só.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis06-a3',
        tipo: 'interpret-code',
        enunciado: 'O que este construtor garante?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'public ProdutoService(IDistributedCache cache, MercadoAuroraContext context)\n{\n    this.cache = cache;\n    this.context = context;\n}' }
        ],
        opcoes: [
          'O service recebe o cache e o banco prontos, pelo mecanismo de injeção de dependência',
          'O service cria a conexão do Redis sozinho',
          'O construtor executa uma consulta ao banco',
          'O cache e o banco são opcionais e podem chegar nulos'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Nada é criado dentro do construtor: os objetos chegam de fora.',
          2: 'O construtor apenas guarda as referências; consulta é no método.',
          3: 'As dependências vêm do container, que já as tem registradas.'
        },
        dicas: ['Você já viu esse padrão no C#.', 'Quem monta as dependências é o container do ASP.NET Core.'],
        explicacao: 'O container entrega as dependências registradas. O service apenas declara o que precisa — e fica fácil de testar e trocar.',
        conceitos: ['redis.integracao', 'csharp.di']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis06-a4',
        tipo: 'fill-code',
        enunciado: 'Complete o campo que recebe o cache.',
        codigo: 'public class ProdutoService\n{\n    private readonly {{1}} cache;\n}',
        lacunas: [['idistributedcache']],
        dicas: ['É a interface de cache distribuído do ASP.NET Core.', 'O nome da interface começa com a letra I.'],
        explicacao: 'O campo guarda a interface; o provedor do Redis foi escolhido lá no registro do programa.',
        conceitos: ['redis.integracao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O fluxo completo dentro do service',
      blocos: [
        { tipo: 'texto', texto: 'Dentro do service, o cache aside e a serialização aparecem juntos: procurar texto no cache, buscar no banco na falta, serializar e gravar.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'public async Task<Produto> BuscarProdutoAsync(int id)\n{\n    var chave = "produto:" + id;\n    var guardado = await cache.GetStringAsync(chave);\n\n    if (guardado == null)\n    {\n        var produto = await context.Produtos.FindAsync(id);\n        await cache.SetStringAsync(chave, JsonSerializer.Serialize(produto));\n        return produto;\n    }\n\n    return JsonSerializer.Deserialize<Produto>(guardado);\n}' },
        { tipo: 'diagrama', arte: 'endpoint --> service --> cache (acerto)\n                       \\--> banco (falta) --> cache', legenda: 'O endpoint não conhece o cache; quem decide é o service.' },
        { tipo: 'trabalho', texto: 'Em produção, o endereço do Redis não fica no código: vem de configuração e variável de ambiente, igual à string de conexão do banco. O mesmo service roda no computador do time apontando para um Redis local e no servidor apontando para o Redis de produção.', fonte: '💼 No trabalho' },
        { tipo: 'nota', tom: 'atencao', texto: 'Deixar cache espalhado pelos endpoints torna chave, prazo e invalidação difíceis de manter. A regra fica no service, em um lugar só.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis06-a5',
        tipo: 'find-error',
        enunciado: 'O programador esqueceu o registro do cache no builder. O que acontece?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'var builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();\n\napp.MapGet("/produtos", (ProdutoService service) => service.Listar());\n\napp.Run();' }
        ],
        opcoes: [
          'A aplicação falha ao montar o ProdutoService, porque IDistributedCache não foi registrado',
          'O cache passa a usar um servidor padrão na nuvem automaticamente',
          'O endpoint compila e funciona sem cache, apenas mais devagar',
          'O Redis é iniciado junto com a aplicação'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Não existe servidor padrão: sem registro, não há provedor.',
          2: 'O parâmetro do construtor precisa ser resolvido; não há cache implícito.',
          3: 'O Redis é um processo separado; a aplicação não o inicia sozinha.'
        },
        dicas: ['O container precisa saber como construir as dependências.', 'Sem registro, não há provedor de cache para injetar.'],
        explicacao: 'Sem `AddStackExchangeRedisCache`, o container não sabe criar o IDistributedCache e a montagem do service falha na inicialização.',
        conceitos: ['redis.integracao', 'csharp.di']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis06-a6',
        tipo: 'order-blocks',
        enunciado: 'Ordene o método de busca que usa cache, banco e serialização.',
        blocos: [
          'Montar a chave com o id do produto',
          'Ler o texto guardado no cache',
          'Se não houver nada, buscar o produto no banco',
          'Serializar e gravar o resultado no cache',
          'Devolver o produto'
        ],
        dicas: ['A chave é montada antes de qualquer leitura.', 'Gravar no cache acontece no caminho da falta.'],
        explicacao: 'Chave, leitura do cache, busca no banco na falta, gravação serializada e retorno. É a integração completa em um método.',
        conceitos: ['redis.integracao', 'redis.cache-aside', 'redis.serializacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis06-a7',
        tipo: 'scenario',
        enunciado: 'Qual escolha se sustenta melhor?',
        cena: 'A equipe discute onde colocar o código do cache: no endpoint, que já recebe o id, ou no service, que conhece o banco.',
        opcoes: [
          'No service: qualquer chamada, de qualquer endpoint, aproveita a mesma regra de cache',
          'No endpoint: cada endpoint decide o formato e o prazo que quiser',
          'Nos dois lugares, para dobrar a velocidade',
          'Em nenhum: o cache deve ficar apenas no banco'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Regras duplicadas por endpoint acabam divergindo em chave e prazo.',
          2: 'Duplicar não acelera: só aumenta a chance de dado inconsistente.',
          3: 'O banco não tem cache; ele é um servidor separado.'
        },
        dicas: ['Pense em quantos endpoints leem o mesmo produto.', 'Uma regra, um lugar.'],
        explicacao: 'O service é o ponto por onde toda leitura passa: colocar a regra lá garante chave, serialização e invalidação consistentes para todos os endpoints.',
        conceitos: ['redis.integracao', 'redis.cache-aside'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Local environment',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras do ambiente de execução: **local** (local) e **environment** (ambiente).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['local', 'local'],
            ['environment', 'ambiente']
          ]
        },
        { tipo: 'ingles', frase: 'Connect the API to the local cache server.', traducao: 'Conecte a API ao servidor de cache local.' },
        { tipo: 'nota', tom: 'info', texto: '**local** indica a própria máquina; **environment** é o que separa desenvolvimento de produção.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis06-a8',
        tipo: 'multiple-choice',
        enunciado: 'Connect the API to the local cache server. O que a frase pede?',
        opcoes: [
          'Conectar a API ao servidor de cache local.',
          'Desligar o servidor de cache.',
          'Conectar a API ao banco de dados.',
          'Trocar o cache por um servidor remoto.'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A frase pede conexão, não desligamento.',
          2: 'A frase fala do cache, não do banco.',
          3: 'local significa local, não remoto.'
        },
        dicas: ['local indica a própria máquina.', 'server é o servidor; cache é o cache.'],
        explicacao: 'Connect the API to the local cache server = conecte a API ao servidor de cache local.',
        conceitos: ['redis.integracao', 'ingles.vocabulario']
      }
    }
  ]
});
