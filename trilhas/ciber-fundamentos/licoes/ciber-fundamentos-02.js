Plataforma.registrarLicao({
  id: 'ciber-fundamentos-02',
  trilha: 'ciber-fundamentos',
  tipo: 'licao',
  titulo: 'Criptografia, senhas e controle de acesso',
  duracaoMin: 30,
  xp: 30,
  objetivos: [
    'Diferenciar criptografia reversível, hash e derivação de chave para senhas',
    'Distinguir autenticação (quem é) de autorização (o que pode fazer) e explicar o que um token assinado garante',
    'Testar com duas contas que um usuário autenticado não lê o pedido de outra pessoa'
  ],
  conceitos: ['ciber-fundamentos.token', 'ciber-fundamentos.criptografia'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O que é um token',
      blocos: [
        { tipo: 'conceito', id: 'ciber-fundamentos.token', titulo: 'Token de acesso', texto: 'Um token é uma credencial que o cliente envia a cada requisição depois de fazer login. Ele traz declarações (por exemplo, o id do usuário) e uma assinatura que o servidor valida para ter certeza de que o conteúdo não foi alterado. A assinatura garante integridade; o conteúdo, em geral, é apenas codificado e pode ser lido por quem tiver o token.', exemplo: 'Um JWT (formato comum de token) com o id da conta A: o servidor sabe que é a conta A, mas ainda precisa decidir o que a conta A pode ver.' },
        { tipo: 'glossario', titulo: 'Termos desta etapa', itens: [
          ['hash', 'resumo calculado', 'Transformação de dados em um resumo que não volta ao original; para senhas, usa-se uma derivação específica com salt e custo, e não um hash rápido genérico.'],
          ['salt', 'valor aleatório', 'Dado aleatório misturado à senha antes do hash, para que senhas iguais gerem resumos diferentes.'],
          ['autenticação', 'quem é você', 'Confirmar a identidade de quem faz a requisição.'],
          ['autorização', 'o que você pode', 'Decidir se uma identidade já confirmada pode executar aquela ação naquele recurso.']
        ] }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ciber-fundamentos-02-bases',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Associe cada termo ao que ele faz numa API de pedidos com login.',
        pares: [
          ['Autenticação', 'Confirmar que a requisição vem da conta A'],
          ['Autorização', 'Decidir se a conta A pode ler o pedido de número 7'],
          ['Assinatura do token', 'Permitir ao servidor detectar se o conteúdo foi alterado'],
          ['Hash com salt para senhas', 'Guardar a senha de forma que ela não possa ser lida de volta']
        ],
        conceitos: ['ciber-fundamentos.token'],
        dicas: ['Autenticar responde "quem?", autorizar responde "pode?".', 'Assinatura protege contra alteração, não esconde o conteúdo.'],
        explicacao: 'Identidade, permissão, integridade do token e armazenamento de senhas são quatro mecanismos diferentes; um não substitui o outro.'
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Criptografia, senhas e controle de acesso',
      blocos: [
        { tipo: 'conceito', id: 'ciber-fundamentos.criptografia', titulo: 'Criptografia e controle de acesso', texto: 'Criptografia reversível protege a confidencialidade com uma chave. Hash produz um resumo; para senhas, use uma função de derivação própria, com salt e custo adequados, por meio de uma biblioteca confiável. Autenticação identifica; autorização decide o acesso.', exemplo: 'Um usuário autenticado continua sem permissão para ler o pedido de outra pessoa.' },
        { tipo: 'texto', texto: '**Quando usar:** para senhas e identidade, use mecanismos mantidos pela plataforma, como o ASP.NET Core Identity, e bibliotecas de token que validam assinatura, emissor, destinatário e validade.' },
        { tipo: 'texto', texto: '**Quando evitar:** não invente criptografia e não guarde segredos dentro de um token apenas codificado. TLS protege o transporte, mas não substitui a verificação de acesso ao recurso.' },
        { tipo: 'trabalho', texto: 'Laboratório de revisão com duas contas fictícias e dois pedidos: a API valida o token e devolve o pedido pelo id da URL. O teste deve confirmar que a conta A não lê o pedido de B, mesmo com token válido.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ciber-fundamentos-02-decisao',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Na API de teste, a conta A envia um token válido e consegue ler GET /pedidos/7, que pertence à conta B.',
        enunciado: 'Qual correção trata a causa?',
        opcoes: [
          'Verificar, no servidor, se o pedido solicitado pertence à conta do token antes de devolvê-lo',
          'Esconder o link do pedido 7 na interface para que a conta A não o encontre',
          'Trocar a URL de HTTP para HTTPS, que também impede o acesso entre contas',
          'Reemitir o token com uma assinatura mais longa, para que não possa ser reutilizado'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Esconder o link não impede quem digita a URL ou chama a API diretamente.',
          2: 'HTTPS protege o trajeto dos dados, mas não decide quem é dono do pedido.',
          3: 'O token está válido e a identidade está correta; o defeito é a falta de autorização sobre o recurso.'
        },
        dicas: ['A identidade da conta A está correta; o que falta checar?', 'Pergunte-se: o servidor compara o dono do pedido com quem está pedindo?'],
        explicacao: 'O teste deve negar o pedido alheio e permitir o próprio; negar tudo também falharia no requisito.',
        conceitos: ['ciber-fundamentos.criptografia']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Orientar e revisar a IA',
      blocos: [
        { tipo: 'texto', texto: '**Como pedir:** revise a autorização de acesso a pedidos nesta API de teste; diferencie token válido de permissão sobre o recurso; proponha um teste com duas contas fictícias e confirme que nenhum segredo ou senha aparece na resposta ou no log.' },
        { tipo: 'texto', texto: '**Como validar:** procure a verificação do recurso no servidor e teste o caso negado. Apenas decodificar um token não valida a assinatura. Nunca cole tokens reais em ferramentas públicas.' },
        { tipo: 'vida-real', emoji: '🧾', titulo: 'Um cliente vê o pedido de outra pessoa', texto: 'Um cliente reclama que, ao trocar o número na URL, abriu o pedido de outra pessoa. O token estava válido, então a autenticação funcionou, mas faltou a autorização: o teste com duas contas passa a exigir que a conta A receba negado ao pedir o pedido da conta B.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ciber-fundamentos-02-revisao',
        tipo: 'explain',
        dimensao: 'construcao',
        enunciado: 'A IA corrigiu a API de pedidos e afirmou que agora cada conta só lê os próprios pedidos.',
        pergunta: 'Como você comprovaria isso, e que tipo de erro procuraria?',
        criterios: [
          'Usar duas contas e dois pedidos, um de cada dono.',
          'Esperar que a conta A leia o pedido A e seja negada ao pedir o pedido B.',
          'Procurar o erro oposto: a correção bloquear também o acesso legítimo.'
        ],
        palavrasChave: [
          ['duas contas', 'conta A', 'conta B', 'dois usuários'],
          ['negad', 'recus', 'proibid', '403', '404'],
          ['próprio', 'própria', 'legítimo', 'permitid', 'dono']
        ],
        minimoChaves: 3,
        exemplo: 'Criaria duas contas de teste, cada uma com um pedido. A conta A deve conseguir abrir o seu pedido, e ao pedir o da conta B a resposta tem de ser de acesso negado. Também verificaria que a correção não passou a bloquear o dono do pedido.',
        explicacao: 'Dois casos opostos com duas contas mostram que a autorização funciona: nega o alheio e continua permitindo o próprio.',
        dicas: ['Um único teste não basta: são necessários um caso permitido e um proibido.', 'Lembre-se de que uma correção também pode errar para o outro lado.'],
        conceitos: ['ciber-fundamentos.criptografia']
      }
    }
  ]
});
