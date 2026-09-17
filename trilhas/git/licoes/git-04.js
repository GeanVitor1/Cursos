Plataforma.registrarLicao({
  id: 'git-04',
  trilha: 'git',
  tipo: 'licao',
  titulo: 'Pull request e code review',
  subtitulo: 'Colaboração · Etapa 3',
  duracaoMin: 50,
  xp: 30,
  objetivos: [
    'Abrir um pull request explicando o que a branch resolve',
    'Revisar o código de outra pessoa com comentários úteis',
    'Acompanhar o ciclo de aprovação até o merge'
  ],
  conceitos: ['git.pr', 'git.review', 'git.branch', 'git.merge'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'A proposta de juntar o trabalho',
      introduz: ['git.pr'],
      blocos: [
        { tipo: 'retoma', conceito: 'git.branch', texto: 'A branch isola o trabalho e o merge traz os commits para a `main`. Falta combinar **quando** e **como** esse encontro acontece em um time.' },
        { tipo: 'texto', texto: 'Em vez de cada pessoa rodar o merge na própria máquina, o time usa o **pull request** (PR): você publica a branch e propõe a união. Outra pessoa lê o código, comenta e aprova antes de o trabalho entrar na `main`.' },
        { tipo: 'conceito', id: 'git.pr', titulo: 'Pull request', texto: 'A proposta de juntar uma branch: o time revisa, comenta e aprova antes do merge.', exemplo: 'Abrir pull request de feature/preco para main.' },
        { tipo: 'lista', itens: [
          'Você envia a branch para o servidor com `git push`.',
          'Abre o pull request dizendo o que a mudança resolve.',
          'O time revisa e comenta; você ajusta o que for preciso.',
          'Com a aprovação, o PR é unido à `main`.'
        ] },
        { tipo: 'nota', tom: 'info', texto: 'O nome vem da ideia de pedir que alguém **puxe** o seu trabalho para a linha principal. O PR é uma conversa, não um botão de enviar.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git04-a1',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'Qual é o papel do pull request no fluxo do time?',
        opcoes: [
          'Propor a união de uma branch e permitir revisão antes do merge',
          'Enviar os commits da branch direto para a main sem revisão',
          'Criar uma cópia do repositório para cada pessoa',
          'Apagar a branch automaticamente depois dos commits'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O PR existe justamente para que a revisão aconteça antes de o código entrar na linha principal.',
          2: 'O repositório continua sendo um só; o PR é uma proposta dentro dele.',
          3: 'Apagar a branch é um passo separado, feito depois do merge.'
        },
        dicas: [
          'Pense em uma proposta que passa por aprovação.',
          'Outra pessoa lê o código antes de ele entrar na main.'
        ],
        explicacao: 'O pull request é a proposta de união: ele abre espaço para revisão, comentários e ajustes antes do merge.',
        conceitos: ['git.pr', 'git.branch']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Anatomia de um pull request',
      blocos: [
        { tipo: 'texto', texto: 'Um PR bem escrito economiza o tempo de quem revisa. Ele responde três perguntas antes mesmo de o código ser aberto.' },
        { tipo: 'passos', itens: [
          '**Título**: o que a mudança faz, em uma linha. Exemplo: "Adiciona desconto por cupom".',
          '**Contexto**: qual problema ou tarefa o PR resolve e por que a solução foi escolhida.',
          '**Como conferir**: os passos para testar a mudança, incluindo casos de borda.',
          '**Tamanho**: PRs menores são revisados mais rápido e com mais cuidado.'
        ] },
        { tipo: 'nota', tom: 'atencao', texto: 'Um PR gigante com 40 arquivos costuma voltar cheio de perguntas. Divida o trabalho em partes que fazem sentido sozinhas.' },
        { tipo: 'trabalho', texto: 'Em muitos times, o PR é o documento mais lido sobre a mudança. Meses depois, é lá que se entende por que o código ficou daquele jeito.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git04-a2',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Você terminou a branch feature/preco e vai abrir o pull request. O código altera o cálculo de preços e mexe em três arquivos.',
        enunciado: 'Qual descrição ajuda mais quem vai revisar?',
        opcoes: [
          'O que mudou, por que mudou e como conferir o novo cálculo',
          'Uma linha dizendo que o código está pronto para revisão',
          'A lista de todos os comandos git que você rodou',
          'O pedido para aprovar rápido porque o prazo está curto'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A frase genérica não dá contexto para revisar com segurança.',
          2: 'Os comandos não contam o motivo nem como conferir o resultado.',
          3: 'Pressa não substitui contexto: o review fica mais lento sem informação.'
        },
        dicas: [
          'Quem revisa precisa entender o problema antes do código.',
          'Descreva também como conferir a mudança.'
        ],
        explicacao: 'Contexto e passos de conferência transformam o review em uma conversa produtiva sobre a mudança.',
        conceitos: ['git.pr']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Code review: o olhar de outra pessoa',
      introduz: ['git.review'],
      blocos: [
        { tipo: 'retoma', conceito: 'git.pr', texto: 'O pull request abre a proposta. O passo seguinte é a leitura crítica do código por outra pessoa: o code review.' },
        { tipo: 'texto', texto: 'O **code review** é a revisão do código por alguém do time, com comentários e sugestões, antes da aprovação. Ele pega desde um erro de lógica até um nome confuso que vai atrapalhar daqui a seis meses.' },
        { tipo: 'conceito', id: 'git.review', titulo: 'Code review', texto: 'A leitura crítica do código por outra pessoa, com comentários e sugestões antes de aprovar.', exemplo: 'Comentário: reduza o aninhamento deste if.' },
        { tipo: 'texto', texto: 'Revisar não é procurar culpados. É uma segunda opinião técnica sobre um trabalho que ainda dá tempo de melhorar barato.' },
        { tipo: 'nota', tom: 'sucesso', texto: 'Review não é auditoria de fim de projeto: ele acontece em cada mudança pequena, enquanto o contexto ainda está fresco.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git04-a3',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'O que caracteriza um bom code review?',
        opcoes: [
          'Comentários específicos sobre o código, com sugestões e perguntas',
          'Aprovar sem ler para não atrasar o colega',
          'Reescrever o código inteiro por conta própria',
          'Apontar apenas o estilo de formatação'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Aprovar sem ler transfere o problema para depois, quando o custo é maior.',
          2: 'Reescrever o trabalho do colega sem combinado gera retrabalho e desgaste no time.',
          3: 'Formatação importa menos que lógica, clareza e casos de borda.'
        },
        dicas: [
          'Um bom review conversa sobre o que o código faz.',
          'Especificidade ajuda mais que opinião geral.'
        ],
        explicacao: 'Comentários específicos, com contexto e sugestões, é o que torna o review útil para quem escreveu o código.',
        conceitos: ['git.review', 'git.pr']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Como dar um review útil',
      blocos: [
        { tipo: 'lista', itens: [
          'Comente o **porquê**, não apenas o "está errado": explique o cenário que quebra.',
          'Separe bloqueios de sugestões: nem todo comentário precisa ser resolvido agora.',
          'Pergunte quando não entender: muitas vezes a dúvida revela um nome ruim.',
          'Reconheça o que ficou bom — review também é troca técnica.'
        ] },
        { tipo: 'nota', tom: 'atencao', texto: 'Comente no código, não na pessoa. "Este trecho pode ser mais claro" abre conversa; "você escreveu errado" fecha.' },
        { tipo: 'trabalho', texto: 'Times que revisam bem têm menos defeitos em produção e menos retrabalho. O review é uma das poucas alavancas que melhoram qualidade sem desacelerar o time.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git04-a4',
        tipo: 'code-review',
        dimensao: 'aplicacao',
        autor: 'Ana',
        ticket: {
          numero: 'PR #142',
          titulo: 'Adiciona desconto por cupom',
          corpo: 'Calcula o desconto quando o pedido tem cupom. Conferi com um pedido de teste.'
        },
        diff: [
          '@@ public decimal CalcularTotal() @@',
          '     decimal total = 0;',
          '+    if (pedido.Cupom > 0)',
          '+    {',
          '+        total = total - (total * pedido.Cupom / 100);',
          '+    }',
          '     return total;'
        ],
        enunciado: 'Qual comentário de review é o mais útil para este PR?',
        opcoes: [
          'Perguntar o que o valor do cupom representa e sugerir um nome como percentualDesconto',
          'Aprovar sem comentários: o cálculo funciona no exemplo',
          'Pedir para trocar todo o código por uma biblioteca externa',
          'Comentar apenas que o código está confuso'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O exemplo funcionar não garante que o nome comunique a intenção para quem vier depois.',
          2: 'Trocar por biblioteca é uma decisão grande, que não cabe como primeiro comentário.',
          3: 'Dizer que está confuso não mostra o que melhorar.'
        },
        dicas: [
          'O nome diz o que o número é?',
          'Um comentário bom aponta o problema e sugere um caminho.'
        ],
        explicacao: 'O valor usado é um percentual, mas o nome sugere o cupom inteiro. Um comentário específico evita a confusão antes que ela chegue à `main`.',
        conceitos: ['git.review', 'git.pr']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git04-a5',
        tipo: 'find-error',
        dimensao: 'aplicacao',
        enunciado: 'Um dev abriu um pull request e, no mesmo dia, uniu a própria branch à main. Qual é o problema desta atitude?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git push origin fix/cep\ngit switch main\ngit merge fix/cep' }
        ],
        opcoes: [
          'O merge foi feito localmente, sem passar pela revisão do pull request',
          'Faltou rodar git status antes do merge',
          'A branch não podia ter sido enviada antes',
          'O merge precisa ser feito na branch fix/cep'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O status não substitui a revisão do time.',
          2: 'Enviar a branch é exatamente o primeiro passo para abrir o PR.',
          3: 'O merge é feito na branch que recebe, mas o problema é não ter esperado a revisão.'
        },
        dicas: [
          'O PR existe para uma etapa específica antes do merge.',
          'Unir por conta própria pula essa etapa.'
        ],
        explicacao: 'O pull request só cumpre o papel se a revisão acontecer antes do merge. Unir localmente elimina a revisão e o histórico da conversa.',
        conceitos: ['git.pr', 'git.review', 'git.merge']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O ciclo do PR até o merge',
      blocos: [
        { tipo: 'passos', itens: [
          'Você envia a branch com `git push`.',
          'Abre o pull request com título e contexto.',
          'O time revisa: comentários, perguntas e sugestões.',
          'Você responde e ajusta o código com novos commits na mesma branch.',
          'Com a aprovação, o PR é unido e a branch é apagada.'
        ] },
        { tipo: 'nota', tom: 'info', texto: 'Os ajustes do review entram como commits novos na branch; o PR se atualiza sozinho. Não é preciso abrir outro PR.' },
        { tipo: 'destaque', texto: 'Um PR pequeno com contexto claro costuma ser aprovado no mesmo dia. O gargalo quase nunca é a revisão: é o tamanho e a descrição da proposta.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Review',
      blocos: [
        { tipo: 'texto', texto: 'Três palavras que aparecem em todo fluxo de pull request:' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (3)',
          pares: [
            ['team', 'equipe'],
            ['code', 'código'],
            ['approve', 'aprovar']
          ]
        },
        { tipo: 'ingles', frase: 'The team will review the code and approve the changes.', traducao: 'A equipe vai revisar o código e aprovar as mudanças.' },
        { tipo: 'nota', tom: 'info', texto: '**approve** é a ação de aprovar; no GitHub o botão de aprovação aparece como *Approve*. **team** (equipe) e **code** (código) completam o vocabulário do fluxo.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git04-a6',
        tipo: 'interpret-code',
        dimensao: 'aplicacao',
        enunciado: 'The team will review the code and approve the changes.',
        opcoes: [
          'A equipe vai revisar o código e aprovar as mudanças',
          'A equipe vai enviar o código para o servidor',
          'A equipe vai desfazer as mudanças já aprovadas',
          'A equipe vai criar uma branch para cada mudança'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Enviar código é push; a frase fala de revisar e aprovar.',
          2: 'A frase não fala de desfazer nada.',
          3: 'Criar branch é outra etapa: a frase começa na revisão.'
        },
        dicas: [
          'review quer dizer revisar; approve quer dizer aprovar.',
          'changes quer dizer mudanças; code quer dizer código.'
        ],
        explicacao: 'Traduzindo: "the team will review the code and approve the changes" = a equipe vai revisar o código e aprovar as mudanças.',
        conceitos: ['git.review', 'git.pr']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git04-a7',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Durante um review, um colega comentou que o seu trecho com um if dentro de outro poderia ser invertido para reduzir o aninhamento. Você discorda: acha que a versão atual está mais clara.',
        enunciado: 'O que um dev profissional faz?',
        opcoes: [
          'Responde no PR explicando o seu ponto e ouve a opinião do colega antes de decidir',
          'Ignora o comentário e aprova o próprio código',
          'Aceita tudo sem discutir para não desagradar o colega',
          'Fecha o PR e recomeça o trabalho do zero'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Aprovar o próprio código elimina o valor da revisão.',
          2: 'Concordar sem entender também não melhora o código.',
          3: 'Recomeçar do zero joga fora o trabalho sem resolver a dúvida.'
        },
        dicas: [
          'O review é uma conversa técnica.',
          'Discordar com argumentos faz parte do processo.'
        ],
        explicacao: 'O PR é um espaço de conversa: responder com o seu ponto transforma a discordância em decisão técnica compartilhada.',
        conceitos: ['git.review', 'git.pr'],
        desafio: true
      }
    }
  ]
});
