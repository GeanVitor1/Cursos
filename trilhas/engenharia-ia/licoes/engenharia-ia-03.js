Plataforma.registrarLicao({
  "id": "engenharia-ia-03",
  "trilha": "engenharia-ia",
  "tipo": "licao",
  "titulo": "Revisar, testar e depurar código gerado",
  "duracaoMin": 20,
  "xp": 30,
  "objetivos": [
    "Explicar o problema e os limites da solução.",
    "Justificar uma decisão e validar o resultado da IA."
  ],
  "conceitos": [
    "engenharia-ia.validacao"
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
              "mock",
              "substituto controlado em teste",
              "Simula uma dependência para testar uma regra isolada; não comprova o funcionamento do banco real."
            ]
          ]
        }
      ]
    },
    {
      "tipo": "conteudo",
      "titulo": "Revisar, testar e depurar código gerado",
      "blocos": [
        {
          "tipo": "conceito",
          "id": "engenharia-ia.validacao",
          "titulo": "O que é",
          "texto": "Um teste compara comportamento observado com um resultado esperado. Testes unitários isolam regras; testes de integração verificam colaboração com componentes reais, como o banco de teste."
        },
        {
          "tipo": "texto",
          "texto": "**Por que existe:** Código gerado pode reproduzir hipóteses erradas. Se a IA produz implementação e testes com a mesma hipótese, ambos podem concordar com um erro."
        }
      ]
    },
    {
      "tipo": "conteudo",
      "titulo": "Aplicar com critério",
      "blocos": [
        {
          "tipo": "texto",
          "texto": "**Quando usar e quando evitar:** Use teste unitário para regras com entradas e saídas claras; integração para persistência, consultas e transações; fluxo de navegador para a jornada. Não use banco de produção para testes destrutivos nem avalie qualidade só por cobertura."
        },
        {
          "tipo": "texto",
          "texto": "**Como funciona:** Depurar: reproduzir falha mínima → observar estado e logs → formular hipótese → alterar uma causa → repetir o caso e um caso vizinho. Revise o diff, dependências e erros tratados antes de aceitar."
        },
        {
          "tipo": "trabalho",
          "texto": "Um teste de cancelamento apenas procura a palavra “sucesso” na resposta. Ele precisa também verificar o estado persistido e provar que usuário sem permissão não altera o pedido."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "engenharia-ia-03-decisao",
        "tipo": "scenario",
        "dimensao": "aplicacao",
        "enunciado": "Os testes passam, mas apenas verificam que a resposta tem status 200. O que falta?",
        "opcoes": [
          "Verificar estado persistido, regras negadas e falhas relevantes",
          "Adicionar mais verificações do mesmo status",
          "Remover os testes de integração"
        ],
        "correta": 0,
        "justificativa": {
          "opcoes": [
            "A evidência deve detectar a falha de negócio, inclusive quando a resposta parece correta",
            "Todo status 200 comprova integridade do banco",
            "Mocks garantem que o SQL executa no banco real"
          ],
          "correta": 0,
          "explicacao": "Uma boa asserção separa uma implementação correta de uma implementação que apenas retorna sucesso."
        },
        "explicacao": "Uma boa asserção separa uma implementação correta de uma implementação que apenas retorna sucesso.",
        "dicas": [
          "Compare o problema observado com a medida proposta.",
          "Escolha a causa e o teste que comprova a correção."
        ],
        "conceitos": [
          "engenharia-ia.validacao"
        ]
      }
    },
    {
      "tipo": "conteudo",
      "titulo": "Orientar e revisar a IA",
      "blocos": [
        {
          "tipo": "texto",
          "texto": "**Como solicitar à IA:** A partir destas regras, escreva testes de comportamento independentes da implementação. Cubra sucesso, usuário sem permissão, pedido enviado e falha de persistência. Explique o que é mock e o que é real. Não consulte dados de produção."
        },
        {
          "tipo": "texto",
          "texto": "**Como validar:** Leia as asserções: elas falhariam se a implementação não salvasse nada? Execute o teste antes da correção para confirmar a falha e depois para confirmar o reparo. Revise se erros e logs expõem tokens ou dados pessoais."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "engenharia-ia-03-revisao",
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
        "exemplo": "Leia as asserções: elas falhariam se a implementação não salvasse nada? Execute o teste antes da correção para confirmar a falha e depois para confirmar o reparo. Revise se erros e logs expõem tokens ou dados pessoais. Teste o caso correto e um caso de falha para verificar o comportamento.",
        "explicacao": "Uma boa asserção separa uma implementação correta de uma implementação que apenas retorna sucesso.",
        "dicas": [
          "Diga o que observar antes e depois."
        ],
        "conceitos": [
          "engenharia-ia.validacao"
        ]
      }
    }
  ]
});
