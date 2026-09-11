Plataforma.registrarLicao({
  id: 'aspnet-02',
  trilha: 'aspnet',
  tipo: 'licao',
  titulo: 'Sua primeira API: rota, endpoint e resposta',
  subtitulo: 'ASP.NET · Etapa 2',
  duracaoMin: 50,
  xp: 30,
  objetivos: [
    'Entender o que é um endpoint',
    'Ler a estrutura de uma Minimal API',
    'Devolver dados em JSON e o status correto'
  ],
  conceitos: ['aspnet.api', 'aspnet.rotas', 'aspnet.status', 'aspnet.json', 'csharp.metodos'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O que é um endpoint',
      introduz: ['aspnet.rotas'],
      blocos: [
        { tipo: 'retoma', conceito: 'aspnet.http', texto: 'Você já viu que uma requisição tem método (GET, POST…) e endereço. Agora vai ver como a API decide quem responde a cada endereço.' },
        { tipo: 'texto', texto: 'A API precisa responder a endereços específicos. Um **endpoint** é a combinação de um método HTTP com uma **rota**: "quando alguém fizer GET em /produtos, execute este código".' },
        { tipo: 'tabela', titulo: 'Endpoints do primeiro projeto', colunas: ['Método + rota', 'O que faz'], linhas: [
          ['GET /produtos', 'Devolve a lista de produtos'],
          ['GET /produtos/{id}', 'Devolve um produto específico'],
          ['POST /produtos', 'Cria um produto']
        ] },
        { tipo: 'nota', tom: 'info', texto: '`{id}` na rota é um parâmetro: o trecho da URL vira uma variável para o código, como o `10` em `/produtos/10`.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Uma Minimal API inteira',
      blocos: [
        { tipo: 'texto', texto: 'Existe uma forma enxuta de criar APIs no ASP.NET, ideal para aprender: a **Minimal API**. Vamos montá-la por partes, começando pelo início do programa:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'var builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();' },
        { tipo: 'glossario', titulo: 'A preparação da aplicação', itens: [
          ['builder / CreateBuilder', 'preparação da aplicação', 'O objeto que reúne as configurações antes de a aplicação iniciar. É preparação padrão: você não precisa decorar agora.'],
          ['Build()', 'montar a aplicação', 'Monta a aplicação com tudo o que foi configurado no builder.'],
          ['args', 'argumentos de inicialização', 'Argumentos passados ao executar a aplicação. Não precisa entender agora.']
        ] }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'A lista de produtos',
      blocos: [
        { tipo: 'texto', texto: 'Para focar na API, o exemplo guarda os produtos em uma lista na memória. Repare que é a mesma `List<Produto>` que você já conhece:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'var produtos = new List<Produto>\n{\n    new Produto { Id = 1, Nome = "Mouse", Preco = 100.00m },\n    new Produto { Id = 2, Nome = "Teclado", Preco = 200.00m }\n};' },
        { tipo: 'nota', tom: 'atencao', texto: 'Na versão profissional, a lista viria do `context.Produtos` do Entity Framework — exatamente o que você aprendeu na trilha anterior.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Mapeando o GET',
      blocos: [
        { tipo: 'texto', texto: 'Agora ligamos a rota `GET /produtos` ao código que responde:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'app.MapGet("/produtos", () => produtos);' },
        { tipo: 'diagrama', arte: 'app.MapGet("/produtos", () => produtos)\n     │         │            │\n     │         │            └─ o que devolver (vira JSON na resposta)\n     │         └─ rota (endereço)\n     └─ método HTTP que este endereço atende' },
        { tipo: 'glossario', titulo: 'Entendendo a linha', itens: [
          ['MapGet', 'mapear um GET', 'Liga o método GET + rota ao código que responde.'],
          ['() => produtos', 'lambda sem parâmetros', 'Os parênteses vazios significam que esta função não recebe nada; ela apenas devolve a lista.'],
          ['(int id) => ...', 'lambda com parâmetro', 'Significa "para o id informado, faça...". O valor vem do parâmetro da rota, como o `{id}` visto acima.']
        ] }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'A resposta vira JSON',
      blocos: [
        { tipo: 'texto', texto: 'Quando o cliente chama `GET /produtos`, o ASP.NET executa a lambda `() => produtos`, recebe a lista C# e a **serializa em JSON** automaticamente, com status **200 OK**:' },
        { tipo: 'codigo', linguagem: 'json', codigo: '// Resposta ao cliente\n[\n  { "id": 1, "nome": "Mouse", "preco": 100.00 },\n  { "id": 2, "nome": "Teclado", "preco": 200.00 }\n]' },
        { tipo: 'nota', tom: 'info', texto: 'Você não escreve o JSON à mão: o ASP.NET converte os objetos automaticamente.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Mapeando o POST e iniciando',
      blocos: [
        { tipo: 'texto', texto: 'O POST segue a mesma ideia: ligamos o método POST + rota ao código que **cria** um produto.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'app.MapPost("/produtos", (Produto produto) =>\n{\n    produtos.Add(produto);\n});\n\napp.Run();' },
        { tipo: 'glossario', titulo: 'Entendendo a linha', itens: [
          ['MapPost', 'mapear um POST', 'Liga o método POST + rota ao código que cria um recurso.'],
          ['app.Run()', 'iniciar', 'Coloca a API no ar para receber requisições.']
        ] }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Escolhendo a resposta: Ok, NotFound e Created',
      blocos: [
        { tipo: 'texto', texto: 'Cada situação pede um status diferente. O ASP.NET oferece atalhos para montar a resposta:' },
        { tipo: 'tabela', titulo: 'Atalhos de resposta', colunas: ['Código', 'Quando usar'], linhas: [
          ['Results.Ok(dados)', 'Deu certo e há dados para devolver (200)'],
          ['Results.NotFound()', 'O recurso pedido não existe (404)'],
          ['Results.Created(endereco, dados)', 'Um novo recurso foi criado (201)'],
          ['Results.BadRequest(erro)', 'O cliente enviou dados inválidos (400)']
        ], legenda: 'Use o status certo: ele é um contrato com quem consome a API.' },
        { tipo: 'nota', tom: 'info', texto: 'Nos próximos exemplos: `produto is null` verifica se o produto não existe; e `condição ? A : B` devolve A quando a condição é verdadeira e B quando é falsa (operador condicional). Leia como "se não existe, NotFound; senão, Ok".' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'api02-a1',
        tipo: 'interpret-code',
        dimensao: 'reconhecimento',
        enunciado: 'O que este endpoint faz?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'app.MapGet("/produtos/{id}", (int id) =>\n{\n    var produto = produtos.FirstOrDefault(p => p.Id == id);\n    return produto is null ? Results.NotFound() : Results.Ok(produto);\n});' }
        ],
        opcoes: [
          'Busca um produto pelo Id; devolve 404 se não existir e 200 com o produto se existir',
          'Devolve sempre a lista completa de produtos',
          'Cria um produto novo com o id recebido',
          'Apaga o produto com o id recebido'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A rota tem `{id}` e o método busca por esse valor.',
          2: 'POST é que cria recursos; aqui o método é GET.',
          3: 'DELETE é que exclui; GET apenas consulta.'
        },
        dicas: ['Observe a rota `/produtos/{id}`.', 'Leia o retorno: NotFound ou Ok.'],
        explicacao: 'Rota com parâmetro + FirstOrDefault (que você aprendeu no LINQ) + escolha do status. Essa é a anatomia de um endpoint GET por Id.',
        conceitos: ['aspnet.api', 'aspnet.rotas', 'linq.first']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'api02-a2',
        tipo: 'order-blocks',
        dimensao: 'ordenacao',
        enunciado: 'Ordene para criar uma API mínima com um endpoint que devolve a lista de produtos.',
        blocos: [
          'var builder = WebApplication.CreateBuilder(args);',
          'var app = builder.Build();',
          'app.MapGet("/produtos", () => produtos);',
          'app.Run();'
        ],
        dicas: ['Primeiro criar o builder, depois construir a aplicação.', 'A configuração dos endpoints vem antes de `app.Run()`.'],
        explicacao: 'Criar → construir → mapear endpoints → rodar. É a estrutura de toda Minimal API.',
        conceitos: ['aspnet.api']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'api02-a3',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete o endpoint que devolve a lista de produtos.',
        codigo: 'app.{{1}}("/produtos", () {{2}} produtos);',
        lacunas: [['MapGet', 'mapget'], ['=>']],
        dicas: ['Mapear um GET chama-se MapGet.', 'A função que devolve a lista é uma lambda.'],
        explicacao: '`MapGet("/produtos", () => produtos)` — rota e resposta. O ASP.NET converte a lista em JSON automaticamente.',
        conceitos: ['aspnet.api', 'aspnet.json']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'api02-a4',
        tipo: 'write-code',
        dimensao: 'construcao',
        enunciado: 'Escreva o endpoint POST que cria um produto. Considere que a lista `produtos` existe e que o produto chega como parâmetro `produto`.',
        esqueleto: 'app.MapPost("/produtos", (Produto produto) =>\n{\n    // seu código aqui\n});',
        validar: function (valor) {
          const t = P.dom.normalizarCodigo(valor).replace(/ /g, '');
          return t.indexOf('produtos.add(produto)') !== -1 &&
            (t.indexOf('results.created') !== -1 || t.indexOf('created(') !== -1);
        },
        respostasAceitas: ['app.MapPost("/produtos", (Produto produto) => { produtos.Add(produto); return Results.Created("/produtos", produto); });'],
        dicas: ['Adicione o produto na lista com `produtos.Add(produto)`.', 'O status correto para criação é 201, via `Results.Created`. O primeiro argumento é o endereço do recurso criado.'],
        explicacao: 'POST cria o recurso e responde 201 Created, normalmente com a localização do novo recurso. É a tradução exata do INSERT.',
        conceitos: ['aspnet.api', 'aspnet.status']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'api02-a5',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'O aplicativo cliente chama `GET /produtos/10` e recebe 200 com corpo vazio. O banco não tem o produto 10. O time discute se o correto seria 404.',
        enunciado: 'Qual análise está correta?',
        opcoes: [
          'Devolver 200 com corpo vazio é enganoso; o correto é 404, pois o recurso não existe',
          'O correto é 500, porque a consulta não trouxe resultado',
          'O correto é 200 vazio, porque a API respondeu sem erro',
          'O correto é 201, indicando que o produto pode ser criado'
        ],
        correta: 0,
        feedbackErro: {
          1: '500 indica falha inesperada da API; não houve falha, o recurso é que não existe.',
          2: '200 com corpo vazio obriga o cliente a adivinhar o que aconteceu — contrato ruim.',
          3: '201 é resposta de criação, não de consulta.'
        },
        dicas: ['O status deve comunicar o que aconteceu.', 'Existe um código específico para recurso inexistente.'],
        explicacao: 'Status code é contrato com o cliente. 404 comunica "não existe" sem ambiguidade — foi exatamente o que você viu no endpoint com FirstOrDefault.',
        conceitos: ['aspnet.status', 'aspnet.api']
      }
    }
  ]
});
