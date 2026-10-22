Plataforma.registrarLicao({
  "id": "ciber-fundamentos-03",
  "trilha": "ciber-fundamentos",
  "tipo": "licao",
  "titulo": "Modelar ameaças e investigar com evidências",
  "duracaoMin": 20,
  "xp": 30,
  "objetivos": [
    "Explicar o problema e os limites da solução.",
    "Justificar uma decisão e validar o resultado da IA."
  ],
  "conceitos": [
    "ciber-fundamentos.ameacas"
  ],
  "etapas": [
    {
      "tipo": "conteudo",
      "titulo": "Modelar ameaças e investigar com evidências",
      "blocos": [
        {
          "tipo": "conceito",
          "id": "ciber-fundamentos.ameacas",
          "titulo": "O que é",
          "texto": "Modelagem de ameaças identifica ativos, caminhos de dados, fronteiras de confiança e possíveis abusos. Logs registram eventos relevantes para diagnóstico e detecção, com acesso e retenção controlados."
        },
        {
          "tipo": "texto",
          "texto": "**Por que existe:** Sem definir o que proteger e como observar falhas, a equipe pode concentrar testes em detalhes fáceis e ignorar acesso indevido, vazamento e falhas de recuperação."
        }
      ]
    },
    {
      "tipo": "conteudo",
      "titulo": "Aplicar com critério",
      "blocos": [
        {
          "tipo": "texto",
          "texto": "**Quando usar e quando evitar:** Use modelagem ao criar ou mudar um fluxo. Use logs para evidências, evitando senhas, tokens e dados pessoais desnecessários. A lista OWASP Top 10:2025 orienta riscos frequentes; não é uma lista completa de testes ou uma garantia de segurança."
        },
        {
          "tipo": "texto",
          "texto": "**Como funciona:** Desenhe navegador → API → banco, identifique onde a confiança muda e pergunte quem pode alterar cada entrada. Relacione abuso, impacto, controle e teste. Na infraestrutura e nuvem, revise identidades, configuração, segredos, backup e dependências."
        },
        {
          "tipo": "trabalho",
          "texto": "Laboratório local autorizado: modele um pedido acessado por duas contas fictícias. Registre tentativa negada com identificador de correlação e resultado, sem token. Verifique se uma falha do banco evita sucesso falso e preserva estado consistente. Registre escopo e descarte dados de teste ao terminar."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "ciber-fundamentos-03-decisao",
        "tipo": "scenario",
        "dimensao": "aplicacao",
        "enunciado": "O log de uma falha inclui o token completo do usuário. Qual ação é adequada?",
        "opcoes": [
          "Remover o segredo do log, controlar acesso e avaliar exposição e revogação",
          "Manter o token porque é útil para depurar",
          "Publicar o log para obter ajuda"
        ],
        "correta": 0,
        "justificativa": {
          "opcoes": [
            "Logs também são dados sensíveis e podem permitir reutilizar credenciais expostas",
            "Qualquer dado num log deixa de precisar de proteção",
            "A criptografia de transporte protege automaticamente arquivos de log"
          ],
          "correta": 0,
          "explicacao": "A investigação deve manter evidências suficientes sem criar uma nova fonte de credenciais expostas."
        },
        "explicacao": "A investigação deve manter evidências suficientes sem criar uma nova fonte de credenciais expostas.",
        "dicas": [
          "Compare o problema observado com a medida proposta.",
          "Escolha a causa e o teste que comprova a correção."
        ],
        "conceitos": [
          "ciber-fundamentos.ameacas"
        ]
      }
    },
    {
      "tipo": "conteudo",
      "titulo": "Orientar e revisar a IA",
      "blocos": [
        {
          "tipo": "texto",
          "texto": "**Como solicitar à IA:** Faça um modelo de ameaças deste fluxo local. Para cada ativo e fronteira, proponha abuso, controle e teste com dados fictícios. Inclua logs sem segredos, falha de dependência e recuperação. Restrinja qualquer teste ao laboratório autorizado."
        },
        {
          "tipo": "texto",
          "texto": "**Como validar:** Confira se cada risco tem evidência reproduzível e medida concreta. Um scanner sem achados não comprova ausência de falhas. Revise também acesso dos operadores, exposição de logs e restauração de backups em ambiente isolado."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "ciber-fundamentos-03-revisao",
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
        "exemplo": "Confira se cada risco tem evidência reproduzível e medida concreta. Um scanner sem achados não comprova ausência de falhas. Revise também acesso dos operadores, exposição de logs e restauração de backups em ambiente isolado. Teste o caso correto e um caso de falha para verificar o comportamento.",
        "explicacao": "A investigação deve manter evidências suficientes sem criar uma nova fonte de credenciais expostas.",
        "dicas": [
          "Diga o que observar antes e depois."
        ],
        "conceitos": [
          "ciber-fundamentos.ameacas"
        ]
      }
    }
  ]
});
