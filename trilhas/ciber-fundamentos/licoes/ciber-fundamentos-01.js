Plataforma.registrarLicao({
  "id": "ciber-fundamentos-01",
  "trilha": "ciber-fundamentos",
  "tipo": "licao",
  "titulo": "Sistemas operacionais, Linux e menor privilégio",
  "duracaoMin": 20,
  "xp": 30,
  "objetivos": [
    "Explicar o problema e os limites da solução.",
    "Justificar uma decisão e validar o resultado da IA."
  ],
  "conceitos": [
    "ciber-fundamentos.linux"
  ],
  "etapas": [
    {
      "tipo": "conteudo",
      "titulo": "Sistemas operacionais, Linux e menor privilégio",
      "blocos": [
        {
          "tipo": "conceito",
          "id": "ciber-fundamentos.linux",
          "titulo": "O que é",
          "texto": "Um processo é um programa em execução. O sistema operacional controla arquivos, memória e permissões. No Linux, identidade do usuário e grupos participam da decisão de acesso."
        },
        {
          "tipo": "texto",
          "texto": "**Por que existe:** Se uma aplicação comprometida executa com poderes administrativos, o impacto pode atingir arquivos e serviços fora de sua função."
        }
      ]
    },
    {
      "tipo": "conteudo",
      "titulo": "Aplicar com critério",
      "blocos": [
        {
          "tipo": "texto",
          "texto": "**Quando usar e quando evitar:** Use contas de serviço com permissões limitadas e ambientes isolados para laboratórios. Elevar todos os privilégios ou liberar acesso geral para resolver um erro amplia o impacto e esconde a causa."
        },
        {
          "tipo": "texto",
          "texto": "**Como funciona:** Antes de alterar acesso, identifique qual processo, usuário, arquivo e operação falham. O princípio do menor privilégio concede somente o acesso necessário e permite verificar que outras operações continuam negadas."
        },
        {
          "tipo": "trabalho",
          "texto": "Laboratório em uma máquina virtual local descartável: crie um arquivo sem dados reais e examine proprietário e permissões pelo gerenciador de arquivos. Compare leitura com escrita. Registre o acesso necessário antes de alterá-lo; não altere pastas do sistema."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "ciber-fundamentos-01-decisao",
        "tipo": "scenario",
        "dimensao": "aplicacao",
        "enunciado": "Um serviço precisa gravar apenas numa pasta de uploads. Que ajuste você escolhe?",
        "opcoes": [
          "Permitir escrita somente na pasta necessária para a conta do serviço",
          "Executar todo o serviço como administrador",
          "Dar acesso geral a todo o disco"
        ],
        "correta": 0,
        "justificativa": {
          "opcoes": [
            "Limitar o alcance das permissões reduz o impacto de uma falha do processo",
            "Acesso administrativo corrige toda vulnerabilidade",
            "Permissões amplas são necessárias em qualquer aplicação web"
          ],
          "correta": 0,
          "explicacao": "A correção deve demonstrar que o serviço funciona e que continua impedido de escrever fora de sua responsabilidade."
        },
        "explicacao": "A correção deve demonstrar que o serviço funciona e que continua impedido de escrever fora de sua responsabilidade.",
        "dicas": [
          "Compare o problema observado com a medida proposta.",
          "Escolha a causa e o teste que comprova a correção."
        ],
        "conceitos": [
          "ciber-fundamentos.linux"
        ]
      }
    },
    {
      "tipo": "conteudo",
      "titulo": "Orientar e revisar a IA",
      "blocos": [
        {
          "tipo": "texto",
          "texto": "**Como solicitar à IA:** Investigue permissão negada numa máquina virtual de teste. Peça identidade do processo, caminho e operação. Sugira a menor mudança necessária e um teste de leitura e escrita; não recomende executar tudo como administrador."
        },
        {
          "tipo": "texto",
          "texto": "**Como validar:** Confirme que a solução limita a conta e o diretório corretos. Teste o acesso permitido e um proibido. Verifique se logs registram a falha sem revelar conteúdo sensível."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "ciber-fundamentos-01-revisao",
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
        "exemplo": "Confirme que a solução limita a conta e o diretório corretos. Teste o acesso permitido e um proibido. Verifique se logs registram a falha sem revelar conteúdo sensível. Teste o caso correto e um caso de falha para verificar o comportamento.",
        "explicacao": "A correção deve demonstrar que o serviço funciona e que continua impedido de escrever fora de sua responsabilidade.",
        "dicas": [
          "Diga o que observar antes e depois."
        ],
        "conceitos": [
          "ciber-fundamentos.linux"
        ]
      }
    }
  ]
});
