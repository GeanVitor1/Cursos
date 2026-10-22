Plataforma.registrarLicao({
  "id": "engenharia-ia-02",
  "trilha": "engenharia-ia",
  "tipo": "licao",
  "titulo": "Investigar consultas antes de usar cache",
  "duracaoMin": 20,
  "xp": 30,
  "objetivos": [
    "Explicar o problema e os limites da solução.",
    "Justificar uma decisão e validar o resultado da IA."
  ],
  "conceitos": [
    "engenharia-ia.performance",
    "redis.cache"
  ],
  "etapas": [
    {
      "tipo": "conteudo",
      "titulo": "Antes do cenário",
      "blocos": [
        {
          "tipo": "conceito",
          "id": "redis.cache",
          "titulo": "Base para esta decisão",
          "texto": "Cache mantém uma cópia de dados para reutilizar numa leitura futura, economizando trabalho. A cópia pode ficar antiga."
        },
        {
          "tipo": "glossario",
          "titulo": "Termos desta etapa",
          "itens": [
            [
              "cache",
              "cópia reutilizável",
              "Evita refazer uma leitura quando dados antigos são aceitáveis."
            ],
            [
              "performance",
              "desempenho",
              "Relação entre tempo, volume de trabalho e recursos consumidos."
            ]
          ]
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "engenharia-ia-02-bases",
        "tipo": "match-pairs",
        "dimensao": "associacao",
        "enunciado": "Associe os elementos ao seu papel nesta solução.",
        "pares": [
          [
            "Cache",
            "Cópia reutilizada em outra leitura"
          ],
          [
            "Fonte original",
            "Dados que determinam a informação correta"
          ],
          [
            "Expiração",
            "Limite de tempo para reutilizar uma cópia"
          ]
        ],
        "conceitos": [
          "redis.cache"
        ],
        "dicas": [
          "Compare o papel de cada elemento, sem decorar sua posição."
        ],
        "explicacao": "Esses papéis delimitam responsabilidades diferentes da solução."
      }
    },
    {
      "tipo": "conteudo",
      "titulo": "Investigar consultas antes de usar cache",
      "blocos": [
        {
          "tipo": "conceito",
          "id": "engenharia-ia.performance",
          "titulo": "O que é",
          "texto": "Diagnóstico de performance usa medições para localizar custo. Cache mantém resultados para reutilizar; exige uma política de expiração e remoção da cópia antiga."
        },
        {
          "tipo": "texto",
          "texto": "**Por que existe:** Uma tela lista pedidos e busca o cliente de cada item separadamente. O total de consultas pode crescer com a quantidade de pedidos, padrão conhecido como N+1."
        }
      ]
    },
    {
      "tipo": "conteudo",
      "titulo": "Aplicar com critério",
      "blocos": [
        {
          "tipo": "texto",
          "texto": "**Quando usar e quando evitar:** Use cache para leituras repetidas quando a tolerância a dados antigos e o isolamento entre usuários estiverem definidos. Não use cache como primeira resposta a consultas ruins ou em permissões que precisam refletir revogação imediatamente."
        },
        {
          "tipo": "texto",
          "texto": "**Como funciona:** Conte consultas por requisição, examine tempo e volume, restrinja campos retornados e aplique paginação. Em Entity Framework Core, uma projeção pode obter os campos necessários na consulta. Compare antes e depois com o mesmo volume."
        },
        {
          "tipo": "trabalho",
          "texto": "Uma listagem de 100 pedidos faz 101 consultas. Antes de instalar Redis, investigue a consulta repetida, a projeção e a paginação. Depois avalie se ainda há custo repetitivo que justifique cache e como invalidá-lo."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "engenharia-ia-02-decisao",
        "tipo": "scenario",
        "dimensao": "aplicacao",
        "enunciado": "A listagem faz uma consulta inicial e uma para cada pedido. Qual investigação vem primeiro?",
        "opcoes": [
          "Medir e reduzir as consultas repetidas antes de decidir sobre cache",
          "Guardar todas as respostas numa chave global",
          "Aumentar a expiração sem medir"
        ],
        "correta": 0,
        "justificativa": {
          "opcoes": [
            "Cache pode esconder custo e introduzir dados antigos ou vazamento se a chave ignorar usuário",
            "Um cache elimina a necessidade de autorização",
            "Mais memória garante consultas eficientes"
          ],
          "correta": 0,
          "explicacao": "Diagnosticar antes de alterar permite comprovar a melhora e evita trocar um problema de consultas por um problema de consistência."
        },
        "explicacao": "Diagnosticar antes de alterar permite comprovar a melhora e evita trocar um problema de consultas por um problema de consistência.",
        "dicas": [
          "Compare o problema observado com a medida proposta.",
          "Escolha a causa e o teste que comprova a correção."
        ],
        "conceitos": [
          "engenharia-ia.performance"
        ]
      }
    },
    {
      "tipo": "conteudo",
      "titulo": "Orientar e revisar a IA",
      "blocos": [
        {
          "tipo": "texto",
          "texto": "**Como solicitar à IA:** Analise esta listagem sem adicionar cache de início. Proponha como medir quantidade de consultas, volume e latência. Compare projeção e carregamento relacionado. Se sugerir cache, descreva chave por usuário, expiração, remoção da cópia antiga e comportamento quando estiver indisponível."
        },
        {
          "tipo": "texto",
          "texto": "**Como validar:** Confira SQL gerado, plano quando necessário e contagem de consultas. Teste dois usuários com permissões diferentes. Verifique atualização de dados após uma escrita e compare medições em condições equivalentes."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "engenharia-ia-02-revisao",
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
        "exemplo": "Confira SQL gerado, plano quando necessário e contagem de consultas. Teste dois usuários com permissões diferentes. Verifique atualização de dados após uma escrita e compare medições em condições equivalentes. Teste o caso correto e um caso de falha para verificar o comportamento.",
        "explicacao": "Diagnosticar antes de alterar permite comprovar a melhora e evita trocar um problema de consultas por um problema de consistência.",
        "dicas": [
          "Diga o que observar antes e depois."
        ],
        "conceitos": [
          "engenharia-ia.performance"
        ]
      }
    }
  ]
});
