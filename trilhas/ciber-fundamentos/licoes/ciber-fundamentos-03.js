Plataforma.registrarLicao({
  id: 'ciber-fundamentos-03',
  trilha: 'ciber-fundamentos',
  tipo: 'licao',
  titulo: 'Modelar ameaças e investigar com evidências',
  duracaoMin: 30,
  xp: 30,
  objetivos: [
    'Identificar ativos, fronteiras de confiança e possíveis abusos num fluxo navegador, API e banco',
    'Registrar logs úteis sem gravar senhas, tokens ou dados pessoais desnecessários',
    'Tratar um token vazado num log: remover, controlar acesso e avaliar a revogação'
  ],
  conceitos: ['ciber-fundamentos.logs', 'ciber-fundamentos.ameacas'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Ativos, fronteiras e logs',
      blocos: [
        { tipo: 'conceito', id: 'ciber-fundamentos.logs', titulo: 'Ativo, fronteira de confiança e log', texto: 'Ativo é o que precisa de proteção (dados de pedidos, contas, chaves). Fronteira de confiança é o ponto onde os dados passam de um ambiente menos confiável para um mais confiável, como do navegador para a API. Log é o registro de eventos usado para diagnosticar e detectar problemas; ele também é um dado sensível, com acesso e retenção controlados.', exemplo: 'O navegador é controlado pelo usuário, então tudo que ele envia à API precisa ser validado no servidor.' },
        { tipo: 'glossario', titulo: 'Termos desta etapa', itens: [
          ['abuso', 'uso malicioso previsto', 'Uma forma de usar o sistema contra o que se espera, como pedir o pedido de outra pessoa.'],
          ['evidência', 'prova reproduzível', 'Resultado de um teste ou registro que permite repetir e confirmar a conclusão.']
        ] }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ciber-fundamentos-03-bases',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Associe cada termo ao exemplo correspondente numa loja online.',
        pares: [
          ['Ativo', 'Os dados dos pedidos e das contas dos clientes'],
          ['Fronteira de confiança', 'O ponto em que a requisição sai do navegador e chega à API'],
          ['Abuso', 'Um usuário trocar o número na URL para ver pedido alheio'],
          ['Log com cuidado', 'Registro da tentativa negada com um id de correlação, sem o token']
        ],
        conceitos: ['ciber-fundamentos.logs'],
        dicas: ['Pense em o que se protege, onde a confiança muda e como alguém poderia abusar.', 'Um bom log ajuda a investigar sem criar nova fonte de credenciais.'],
        explicacao: 'A modelagem de ameaças parte do que proteger (ativos), onde a confiança muda (fronteiras) e de como o sistema pode ser abusado.'
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Modelar ameaças e investigar com evidências',
      blocos: [
        { tipo: 'conceito', id: 'ciber-fundamentos.ameacas', titulo: 'Modelagem de ameaças', texto: 'Modelagem de ameaças identifica ativos, caminhos de dados, fronteiras de confiança e possíveis abusos, e relaciona cada abuso a um impacto, um controle e um teste.', exemplo: 'Abuso: ler pedido de outro cliente. Impacto: vazamento. Controle: checar o dono no servidor. Teste: duas contas fictícias.' },
        { tipo: 'texto', texto: '**Por que existe:** sem definir o que proteger e como observar falhas, a equipe testa os detalhes fáceis e ignora acesso indevido, vazamento e falha de recuperação.' },
        { tipo: 'texto', texto: '**Como fazer:** desenhe navegador, API e banco; marque onde a confiança muda; pergunte quem pode alterar cada entrada. Em infraestrutura e nuvem, revise identidades, configuração, segredos, backup e dependências.' },
        { tipo: 'texto', texto: '**Limites:** a lista OWASP Top 10:2025 aponta riscos frequentes, mas não é uma lista completa de testes nem garantia de segurança. Um scanner sem achados não prova ausência de falhas.' },
        { tipo: 'trabalho', texto: 'Laboratório local autorizado: modele um pedido acessado por duas contas fictícias; registre a tentativa negada com id de correlação e resultado, sem token; verifique se uma falha do banco evita sucesso falso. Registre o escopo e descarte os dados de teste ao final.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ciber-fundamentos-03-decisao',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Ao investigar um erro, você nota que o log de produção guarda o token completo de cada usuário. Os logs são acessíveis a toda a equipe de suporte.',
        enunciado: 'Qual ação é a mais adequada?',
        opcoes: [
          'Parar de gravar o token, restringir o acesso aos logs e avaliar exposição e revogação dos tokens já gravados',
          'Manter o token no log, porque ele ajuda muito a depurar e a equipe de suporte é confiável',
          'Publicar o trecho do log num fórum público para pedir ajuda na investigação',
          'Apagar todo o histórico de logs e deixar de registrar qualquer evento da aplicação'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Quem lê o log poderia reutilizar o token; ele deve ser tratado como credencial exposta.',
          2: 'Publicar credenciais, mesmo parciais, amplia a exposição.',
          3: 'Sem logs a equipe perde evidências para investigar; o correto é registrar sem segredos.'
        },
        dicas: ['Um token no log funciona como uma senha em texto aberto.', 'Corrigir o futuro e tratar o que já vazou são duas partes da resposta.'],
        explicacao: 'A investigação deve manter evidências suficientes sem criar uma nova fonte de credenciais expostas.',
        conceitos: ['ciber-fundamentos.ameacas']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Orientar e revisar a IA',
      blocos: [
        { tipo: 'texto', texto: '**Como pedir:** faça um modelo de ameaças deste fluxo local; para cada ativo e fronteira, proponha abuso, controle e teste com dados fictícios; inclua logs sem segredos, falha de dependência e recuperação, restringindo qualquer teste ao laboratório autorizado.' },
        { tipo: 'texto', texto: '**Como validar:** confira se cada risco tem evidência reproduzível e uma medida concreta. Revise também o acesso dos operadores, a exposição dos logs e a restauração de backups em ambiente isolado.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ciber-fundamentos-03-revisao',
        tipo: 'explain',
        dimensao: 'construcao',
        enunciado: 'A IA entregou uma tabela de ameaças para o fluxo navegador, API e banco, com uma linha por risco.',
        pergunta: 'O que você conferiria em cada linha antes de aceitar a tabela?',
        criterios: [
          'Verificar se o risco tem um impacto descrito.',
          'Verificar se há um controle concreto (o que será feito).',
          'Verificar se existe um teste ou evidência que se possa repetir.'
        ],
        palavrasChave: [
          ['impacto', 'consequência', 'prejuízo'],
          ['controle', 'medida', 'mitigação'],
          ['teste', 'evidência', 'reproduz', 'reprodut']
        ],
        minimoChaves: 3,
        exemplo: 'Para cada linha eu olharia se diz o que acontece de ruim caso o abuso ocorra, qual medida vai impedir ou reduzir isso e como alguém poderia repetir um teste para provar que a medida funciona, usando dados fictícios.',
        explicacao: 'Um risco útil tem impacto, controle e uma forma repetível de verificar; sem isso, a tabela é só uma lista de preocupações.',
        dicas: ['Cada linha deve responder: o que pode dar errado, o que fazemos e como provamos?', 'Desconfie de uma linha que só cita o nome do risco.'],
        conceitos: ['ciber-fundamentos.ameacas']
      }
    }
  ]
});
