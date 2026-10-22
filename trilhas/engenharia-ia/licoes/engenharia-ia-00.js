Plataforma.registrarLicao({
  "id": "engenharia-ia-00",
  "trilha": "engenharia-ia",
  "tipo": "licao",
  "titulo": "Da necessidade à decisão técnica",
  "duracaoMin": 20,
  "xp": 30,
  "objetivos": [
    "Explicar o problema e os limites da solução.",
    "Justificar uma decisão e validar o resultado da IA."
  ],
  "conceitos": [
    "engenharia-ia.decisoes",
    "aspnet.http",
    "aspnet.api"
  ],
  "etapas": [
    {
      "tipo": "conteudo",
      "titulo": "Antes do cenário",
      "blocos": [
        {
          "tipo": "conceito",
          "id": "aspnet.http",
          "titulo": "Base para esta decisão",
          "texto": "HTTP define mensagens de requisição e resposta entre cliente e servidor. Status e conteúdo informam o resultado da operação."
        },
        {
          "tipo": "conceito",
          "id": "aspnet.api",
          "titulo": "Base para esta decisão",
          "texto": "Uma API é uma interface pela qual programas trocam solicitações e respostas. Um servidor pode usá-la para receber pedidos e aplicar regras antes de armazená-los."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "engenharia-ia-00-bases",
        "tipo": "match-pairs",
        "dimensao": "associacao",
        "enunciado": "Associe os elementos ao seu papel nesta solução.",
        "pares": [
          [
            "HTTP",
            "Regras para mensagens de requisição e resposta"
          ],
          [
            "API",
            "Contrato de operações oferecido a outro programa"
          ]
        ],
        "conceitos": [
          "aspnet.http",
          "aspnet.api"
        ],
        "dicas": [
          "Compare o papel de cada elemento, sem decorar sua posição."
        ],
        "explicacao": "Esses papéis delimitam responsabilidades diferentes da solução."
      }
    },
    {
      "tipo": "conteudo",
      "titulo": "Da necessidade à decisão técnica",
      "blocos": [
        {
          "tipo": "conceito",
          "id": "engenharia-ia.decisoes",
          "titulo": "O que é",
          "texto": "Uma decisão técnica liga um requisito observável a uma solução e registra seus custos. Um critério de aceitação descreve como verificar o resultado."
        },
        {
          "tipo": "texto",
          "texto": "**Por que existe:** Uma equipe recebe o pedido “crie um sistema de pedidos”. Começar escolhendo bibliotecas deixa sem resposta quem pode cancelar, quando o estoque muda e o que ocorre se o pagamento falhar."
        }
      ]
    },
    {
      "tipo": "conteudo",
      "titulo": "Aplicar com critério",
      "blocos": [
        {
          "tipo": "texto",
          "texto": "**Quando usar e quando evitar:** Use critérios antes de gerar código ou escolher arquitetura. Para uma página estática de apresentação, uma API e um banco podem ser custos desnecessários. Para pedidos compartilhados e persistentes, são responsabilidades reais."
        },
        {
          "tipo": "texto",
          "texto": "**Como funciona:** Fluxo: identificar usuário e regra → descrever entradas e falhas → definir evidência de sucesso → escolher a solução mais simples que atende → registrar alternativa e custo."
        },
        {
          "tipo": "trabalho",
          "texto": "Uma loja permite cancelar apenas pedidos ainda não enviados. A interface orienta o cliente; o servidor verifica a regra novamente e persiste a mudança. Um teste deve tentar cancelar após o envio e comprovar que o estado não mudou."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "engenharia-ia-00-decisao",
        "tipo": "scenario",
        "dimensao": "aplicacao",
        "enunciado": "A IA entregou uma API compilável que permite cancelar pedidos já enviados. Qual o próximo passo?",
        "opcoes": [
          "Especificar a regra e um teste que reproduza o cancelamento inválido antes de corrigir",
          "Aceitar porque compilou",
          "Aumentar a quantidade de arquivos sem verificar a regra"
        ],
        "correta": 0,
        "justificativa": {
          "opcoes": [
            "Compilação verifica parte da estrutura do código; não comprova regras de negócio",
            "Uma API compilável garante que o domínio está correto",
            "Mais camadas substituem critérios de aceitação"
          ],
          "correta": 0,
          "explicacao": "O teste precisa observar que um pedido enviado mantém seu estado. Depois da correção, testar também um pedido que pode ser cancelado evita proibir tudo."
        },
        "explicacao": "O teste precisa observar que um pedido enviado mantém seu estado. Depois da correção, testar também um pedido que pode ser cancelado evita proibir tudo.",
        "dicas": [
          "Compare o problema observado com a medida proposta.",
          "Escolha a causa e o teste que comprova a correção."
        ],
        "conceitos": [
          "engenharia-ia.decisoes"
        ]
      }
    },
    {
      "tipo": "conteudo",
      "titulo": "Orientar e revisar a IA",
      "blocos": [
        {
          "tipo": "texto",
          "texto": "**Como solicitar à IA:** Descreva um serviço de pedidos com cancelamento antes do envio. Liste regras, estados inválidos, dados sensíveis, alternativas e testes de aceitação. Explique hipóteses antes de implementar. Não invente requisitos."
        },
        {
          "tipo": "texto",
          "texto": "**Como validar:** Confira se a solução cobre autorização, persistência e concorrência. Rode o caso de sucesso e cada caso proibido. Compare o estado armazenado antes e depois; uma mensagem de sucesso sozinha não é evidência."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "engenharia-ia-00-revisao",
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
        "exemplo": "Confira se a solução cobre autorização, persistência e concorrência. Rode o caso de sucesso e cada caso proibido. Compare o estado armazenado antes e depois; uma mensagem de sucesso sozinha não é evidência. Teste o caso correto e um caso de falha para verificar o comportamento.",
        "explicacao": "O teste precisa observar que um pedido enviado mantém seu estado. Depois da correção, testar também um pedido que pode ser cancelado evita proibir tudo.",
        "dicas": [
          "Diga o que observar antes e depois."
        ],
        "conceitos": [
          "engenharia-ia.decisoes"
        ]
      }
    }
  ]
});
