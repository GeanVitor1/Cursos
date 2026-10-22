Plataforma.registrarLicao({
  "id": "engenharia-ia-01",
  "trilha": "engenharia-ia",
  "tipo": "licao",
  "titulo": "Escolher .NET e separar responsabilidades",
  "duracaoMin": 20,
  "xp": 30,
  "objetivos": [
    "Explicar o problema e os limites da solução.",
    "Justificar uma decisão e validar o resultado da IA."
  ],
  "conceitos": [
    "engenharia-ia.dotnet"
  ],
  "etapas": [
    {
      "tipo": "conteudo",
      "titulo": "Antes do cenário",
      "blocos": [
        {
          "tipo": "texto",
          "texto": "O contexto de dados do Entity Framework Core organiza consultas e mudanças nos objetos persistidos. O transporte HTTP tem uma responsabilidade diferente: receber mensagens e devolver respostas."
        },
        {
          "tipo": "glossario",
          "titulo": "Termos desta etapa",
          "itens": [
            [
              "controller",
              "entrada da aplicação",
              "Traduz a requisição HTTP e encaminha o trabalho para a regra da aplicação."
            ]
          ]
        }
      ]
    },
    {
      "tipo": "conteudo",
      "titulo": "Escolher .NET e separar responsabilidades",
      "blocos": [
        {
          "tipo": "conceito",
          "id": "engenharia-ia.dotnet",
          "titulo": "O que é",
          "texto": ".NET fornece runtime e bibliotecas; C# é uma linguagem que o utiliza. ASP.NET Core oferece componentes para aplicações web e APIs, como roteamento, configuração e processamento de requisições."
        },
        {
          "tipo": "texto",
          "texto": "**Por que existe:** Uma API recebe requisições HTTP e devolve dados. Misturar transporte, regras de negócio e acesso ao banco torna mudanças e testes mais difíceis."
        }
      ]
    },
    {
      "tipo": "conteudo",
      "titulo": "Aplicar com critério",
      "blocos": [
        {
          "tipo": "texto",
          "texto": "**Quando usar e quando evitar:** ASP.NET Core serve para endpoints web; uma rotina local de conversão de arquivos pode usar um programa de console. Separar camadas ajuda quando há regras e mudanças independentes; interfaces sem necessidade aumentam trabalho."
        },
        {
          "tipo": "texto",
          "texto": "**Como funciona:** Controller traduz a requisição; service aplica a regra; contexto de dados do Entity Framework Core organiza acesso ao banco. Middleware participa do fluxo HTTP. Injeção de dependência fornece objetos de fora em vez de criá-los dentro da regra. Um repository adicional é opcional: o contexto de dados já oferece abstrações de persistência."
        },
        {
          "tipo": "trabalho",
          "texto": "No cancelamento, o controller identifica a entrada; o service verifica envio e permissão; a persistência registra a alteração. O cliente nunca define sozinho se a operação está autorizada."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "engenharia-ia-01-decisao",
        "tipo": "scenario",
        "dimensao": "aplicacao",
        "enunciado": "A IA exige repository e cinco camadas para um serviço simples. O que você decide?",
        "opcoes": [
          "Comparar necessidade, complexidade e testes antes de adotar cada abstração",
          "Aceitar todas as camadas porque arquitetura depende de quantidade",
          "Colocar todas as regras na interface do usuário"
        ],
        "correta": 0,
        "justificativa": {
          "opcoes": [
            "Uma separação deve reduzir um problema concreto e ter custo justificável",
            "Mais arquivos sempre tornam o sistema seguro",
            "Injeção de dependência elimina regras de negócio"
          ],
          "correta": 0,
          "explicacao": "Você deve conseguir localizar transporte, regra e persistência sem exigir uma arquitetura única para todo projeto."
        },
        "explicacao": "Você deve conseguir localizar transporte, regra e persistência sem exigir uma arquitetura única para todo projeto.",
        "dicas": [
          "Compare o problema observado com a medida proposta.",
          "Escolha a causa e o teste que comprova a correção."
        ],
        "conceitos": [
          "engenharia-ia.dotnet"
        ]
      }
    },
    {
      "tipo": "conteudo",
      "titulo": "Orientar e revisar a IA",
      "blocos": [
        {
          "tipo": "texto",
          "texto": "**Como solicitar à IA:** Proponha uma API ASP.NET Core para pedidos. Separe transporte e regra de cancelamento, forneça dependências por construtor e compare usar contexto de dados diretamente com adicionar repository. Justifique o custo e os testes de cada escolha."
        },
        {
          "tipo": "texto",
          "texto": "**Como validar:** Leia o fluxo completo de uma requisição. Verifique onde ocorre a regra e como a dependência pode ser substituída em teste. Não aceite interfaces geradas apenas para duplicar métodos, nem regras de autorização somente no navegador."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "engenharia-ia-01-revisao",
        "tipo": "explain",
        "dimensao": "construcao",
        "enunciado": "Explique como validar sua decisão no cenário anterior. Compare sua resposta com os critérios.",
        "pergunta": "Que evidência comprova a solução e que erro você procuraria?",
        "criterios": [
          "Relacionar a medida à causa observada.",
          "Descrever um teste permitido e um caso que deve falhar.",
          "Reconhecer uma limitação da solução."
        ],
        "palavrasChave": [
          [
            "teste",
            "testar",
            "verificar",
            "confirme"
          ],
          [
            "falha",
            "erro",
            "negado",
            "proibido",
            "risco"
          ]
        ],
        "minimoChaves": 2,
        "exemplo": "Leia o fluxo completo de uma requisição. Verifique onde ocorre a regra e como a dependência pode ser substituída em teste. Não aceite interfaces geradas apenas para duplicar métodos, nem regras de autorização somente no navegador. Teste o caso correto e um caso de falha para verificar o comportamento.",
        "explicacao": "Você deve conseguir localizar transporte, regra e persistência sem exigir uma arquitetura única para todo projeto.",
        "dicas": [
          "Diga o que observar antes e depois."
        ],
        "conceitos": [
          "engenharia-ia.dotnet"
        ]
      }
    }
  ]
});
