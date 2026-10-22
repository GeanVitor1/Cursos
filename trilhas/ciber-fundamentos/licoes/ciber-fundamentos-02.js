Plataforma.registrarLicao({
  "id": "ciber-fundamentos-02",
  "trilha": "ciber-fundamentos",
  "tipo": "licao",
  "titulo": "Criptografia, senhas e controle de acesso",
  "duracaoMin": 20,
  "xp": 30,
  "objetivos": [
    "Explicar o problema e os limites da solução.",
    "Justificar uma decisão e validar o resultado da IA."
  ],
  "conceitos": [
    "ciber-fundamentos.criptografia"
  ],
  "etapas": [
    {
      "tipo": "conteudo",
      "titulo": "Antes do cenário",
      "blocos": [
        {
          "tipo": "glossario",
          "titulo": "Termos desta etapa",
          "itens": [
            [
              "hash",
              "resumo calculado",
              "Transformação de dados em resumo; para senhas use derivação específica com salt e custo, não um hash rápido genérico."
            ],
            [
              "token",
              "credencial apresentada ao servidor",
              "Uma credencial com declarações. A assinatura comprova integridade quando validada; o conteúdo não é necessariamente secreto."
            ]
          ]
        }
      ]
    },
    {
      "tipo": "conteudo",
      "titulo": "Criptografia, senhas e controle de acesso",
      "blocos": [
        {
          "tipo": "conceito",
          "id": "ciber-fundamentos.criptografia",
          "titulo": "O que é",
          "texto": "Criptografia reversível protege confidencialidade com uma chave. Hash produz um resumo; para senhas, use uma função de derivação própria com salt e custo adequados, por meio de biblioteca confiável. Autenticação identifica; autorização decide acesso."
        },
        {
          "tipo": "texto",
          "texto": "**Por que existe:** Um token assinado pode comprovar integridade das declarações, mas isso não torna seu conteúdo secreto nem concede acesso a qualquer objeto."
        }
      ]
    },
    {
      "tipo": "conteudo",
      "titulo": "Aplicar com critério",
      "blocos": [
        {
          "tipo": "texto",
          "texto": "**Quando usar e quando evitar:** Use mecanismos de identidade mantidos, como ASP.NET Core Identity, para senhas. Use bibliotecas de tokens e valide assinatura, emissor, destinatário e validade. Não invente criptografia nem armazene segredos dentro de um token apenas codificado."
        },
        {
          "tipo": "texto",
          "texto": "**Como funciona:** Após validar a identidade, o servidor verifica a ação e o recurso solicitado. Um usuário autenticado pode continuar sem permissão para ler um pedido de outra pessoa. TLS protege transporte, não substitui essa verificação."
        },
        {
          "tipo": "trabalho",
          "texto": "Laboratório de revisão: a API valida o token e retorna o pedido pelo identificador da URL. Há duas contas fictícias e dois pedidos. O teste deve confirmar que a conta A não lê o pedido de B, mesmo com token válido."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "ciber-fundamentos-02-decisao",
        "tipo": "scenario",
        "dimensao": "aplicacao",
        "enunciado": "Um token válido da conta A permite ler um pedido da conta B. Qual correção trata a causa?",
        "opcoes": [
          "Verificar no servidor a permissão sobre o pedido solicitado",
          "Apenas esconder o botão na interface",
          "Apenas trocar HTTP por HTTPS"
        ],
        "correta": 0,
        "justificativa": {
          "opcoes": [
            "A identidade está válida, mas falta autorização sobre o recurso",
            "Assinatura de token torna todos os recursos públicos",
            "TLS define quem é dono de um pedido"
          ],
          "correta": 0,
          "explicacao": "O teste deve negar o pedido alheio e permitir o próprio; negar tudo também falha no requisito."
        },
        "explicacao": "O teste deve negar o pedido alheio e permitir o próprio; negar tudo também falha no requisito.",
        "dicas": [
          "Compare o problema observado com a medida proposta.",
          "Escolha a causa e o teste que comprova a correção."
        ],
        "conceitos": [
          "ciber-fundamentos.criptografia"
        ]
      }
    },
    {
      "tipo": "conteudo",
      "titulo": "Orientar e revisar a IA",
      "blocos": [
        {
          "tipo": "texto",
          "texto": "**Como solicitar à IA:** Revise a autorização de acesso a pedidos nesta API de teste. Diferencie token válido de permissão sobre o recurso. Proponha teste com duas contas fictícias e confirme que nenhum segredo ou senha aparece no retorno ou log."
        },
        {
          "tipo": "texto",
          "texto": "**Como validar:** Procure verificação do recurso no servidor e teste o caso negado. Decodificar token não valida assinatura. Confira expiração e revogação quando a aplicação exigir; nunca cole tokens reais em ferramentas públicas."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "ciber-fundamentos-02-revisao",
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
        "exemplo": "Procure verificação do recurso no servidor e teste o caso negado. Decodificar token não valida assinatura. Confira expiração e revogação quando a aplicação exigir; nunca cole tokens reais em ferramentas públicas. Teste o caso correto e um caso de falha para verificar o comportamento.",
        "explicacao": "O teste deve negar o pedido alheio e permitir o próprio; negar tudo também falha no requisito.",
        "dicas": [
          "Diga o que observar antes e depois."
        ],
        "conceitos": [
          "ciber-fundamentos.criptografia"
        ]
      }
    }
  ]
});
