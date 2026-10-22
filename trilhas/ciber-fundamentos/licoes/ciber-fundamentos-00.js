Plataforma.registrarLicao({
  "id": "ciber-fundamentos-00",
  "trilha": "ciber-fundamentos",
  "tipo": "licao",
  "titulo": "Da rede ao HTTPS: localizar uma falha",
  "duracaoMin": 20,
  "xp": 30,
  "objetivos": [
    "Explicar o problema e os limites da solução.",
    "Justificar uma decisão e validar o resultado da IA."
  ],
  "conceitos": [
    "ciber-fundamentos.redes",
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
          "texto": "HTTP define as mensagens de requisição e resposta entre cliente e servidor. Um método descreve a operação e um status informa o resultado. Uma API expõe operações para outros programas usando um contrato."
        },
        {
          "tipo": "conceito",
          "id": "aspnet.api",
          "titulo": "Base para esta decisão",
          "texto": "API é um contrato de comunicação entre programas. Uma API web recebe requisições, aplica regras e responde ao cliente."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "ciber-fundamentos-00-bases",
        "tipo": "match-pairs",
        "dimensao": "associacao",
        "enunciado": "Associe os elementos ao seu papel nesta solução.",
        "pares": [
          [
            "HTTP",
            "Formato de requisições e respostas"
          ],
          [
            "API",
            "Contrato para comunicação entre programas"
          ],
          [
            "DNS",
            "Resolução do nome para endereço"
          ],
          [
            "TLS",
            "Proteção da comunicação e validação de certificado"
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
      "titulo": "Da rede ao HTTPS: localizar uma falha",
      "blocos": [
        {
          "tipo": "conceito",
          "id": "ciber-fundamentos.redes",
          "titulo": "O que é",
          "texto": "IP identifica um destino na rede; TCP fornece transporte confiável entre portas. DNS traduz nomes em endereços. HTTP define mensagens de aplicação; HTTPS protege a comunicação HTTP com TLS."
        },
        {
          "tipo": "texto",
          "texto": "**Por que existe:** Uma página que não abre pode falhar na resolução de nomes, no transporte, na validação do certificado ou na própria aplicação. Alterar código sem localizar a camada pode não resolver."
        }
      ]
    },
    {
      "tipo": "conteudo",
      "titulo": "Aplicar com critério",
      "blocos": [
        {
          "tipo": "texto",
          "texto": "**Quando usar e quando evitar:** Use HTTPS ao transportar dados sensíveis. TLS não verifica se um usuário pode acessar um pedido e não corrige uma vulnerabilidade de aplicação. DNS não é o protocolo que entrega o conteúdo da página."
        },
        {
          "tipo": "texto",
          "texto": "**Como funciona:** O cliente resolve o nome, estabelece conexão, valida o certificado e negocia proteção TLS antes de enviar HTTP. Uma resposta HTTP 403 mostra que houve resposta da aplicação, embora o acesso tenha sido negado."
        },
        {
          "tipo": "trabalho",
          "texto": "Laboratório local: abra as ferramentas de rede do navegador na plataforma. Observe método, status e duração de um arquivo. Interrompa a rede pelo próprio navegador, recarregue e compare erro de transporte com uma resposta HTTP. Não teste sistemas de terceiros."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "ciber-fundamentos-00-decisao",
        "tipo": "scenario",
        "dimensao": "aplicacao",
        "enunciado": "O navegador recebeu HTTP 403. O que você investiga primeiro?",
        "opcoes": [
          "Permissão e política de acesso da aplicação",
          "Uma falha total de DNS que impediu qualquer resposta",
          "Trocar TCP por um banco de dados"
        ],
        "correta": 0,
        "justificativa": {
          "opcoes": [
            "Uma resposta HTTP confirma que o servidor respondeu; negar acesso é diferente de não alcançar o servidor",
            "HTTPS concede permissão a qualquer usuário",
            "DNS decide quais pedidos o usuário pode ler"
          ],
          "correta": 0,
          "explicacao": "Identificar a camada reduz tentativas aleatórias. Uma negação de acesso pode ser comportamento correto, e deve ser confrontada com a política esperada."
        },
        "explicacao": "Identificar a camada reduz tentativas aleatórias. Uma negação de acesso pode ser comportamento correto, e deve ser confrontada com a política esperada.",
        "dicas": [
          "Compare o problema observado com a medida proposta.",
          "Escolha a causa e o teste que comprova a correção."
        ],
        "conceitos": [
          "ciber-fundamentos.redes"
        ]
      }
    },
    {
      "tipo": "conteudo",
      "titulo": "Orientar e revisar a IA",
      "blocos": [
        {
          "tipo": "texto",
          "texto": "**Como solicitar à IA:** Ajude a investigar uma falha de acesso num ambiente local. Organize hipóteses por DNS, transporte, certificado e HTTP. Peça evidências de cada camada e não sugira desabilitar validação de certificado como correção."
        },
        {
          "tipo": "texto",
          "texto": "**Como validar:** Verifique se a proposta distingue falha de conexão de resposta HTTP. Não publique tokens capturados e não aceite ignorar certificados como solução permanente."
        }
      ]
    },
    {
      "tipo": "atividade",
      "atividade": {
        "id": "ciber-fundamentos-00-revisao",
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
        "exemplo": "Verifique se a proposta distingue falha de conexão de resposta HTTP. Não publique tokens capturados e não aceite ignorar certificados como solução permanente. Teste o caso correto e um caso de falha para verificar o comportamento.",
        "explicacao": "Identificar a camada reduz tentativas aleatórias. Uma negação de acesso pode ser comportamento correto, e deve ser confrontada com a política esperada.",
        "dicas": [
          "Diga o que observar antes e depois."
        ],
        "conceitos": [
          "ciber-fundamentos.redes"
        ]
      }
    }
  ]
});
