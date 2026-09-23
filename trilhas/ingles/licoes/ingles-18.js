Plataforma.registrarLicao({
  id: 'ingles-18',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'GitHub: issue, pull request, merge, release',
  subtitulo: 'English for Developers · Etapa 36',
  duracaoMin: 40,
  xp: 35,
  objetivos: [
    'Compreender termos de colaboração no GitHub',
    'Pedir e entender pedidos de code review em inglês',
    'Identificar conflitos e status de merge'
  ],
  conceitos: ['ingles.github'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Colaboração no GitHub: Pull Request',
      introduz: ['ingles.github'],
      blocos: [
        { tipo: 'texto', texto: 'No dia a dia do desenvolvimento, quando você termina uma funcionalidade em uma branch, você abre um **pull request** para a equipe revisar o código.' },
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['pull request', 'pedido de integração'],
          ['open', 'abrir / aberto'],
          ['close', 'fechar / fechado']
        ] },
        { tipo: 'ingles', frase: 'Please open a pull request.', traducao: 'Por favor abra um pull request.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en18-p1',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada termo ao significado no GitHub.',
        pares: [
          ['pull request', 'pedido de integração'],
          ['open', 'aberto / abrir'],
          ['close', 'fechado / fechar']
        ],
        dicas: ['Pull request é a proposta de juntar código.', 'Open e close indicam o status.'],
        explicacao: 'pull request, open e close: o ciclo de vida básico de uma contribuição no GitHub.',
        conceitos: ['ingles.github']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Pedindo e recebendo Code Review',
      blocos: [
        { tipo: 'texto', texto: 'Antes de juntar as alterações na branch principal, pedimos que um colega revise o código com **Please review my pull request**.' },
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['approved', 'aprovado'],
          ['changes', 'alterações / mudanças']
        ] },
        { tipo: 'ingles', frase: 'The pull request is approved.', traducao: 'O pull request está aprovado.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en18-p2',
        tipo: 'order-blocks',
        dimensao: 'ordenacao',
        enunciado: 'Ordene o pedido de revisão.',
        blocos: ['Please', 'review', 'my pull request.'],
        dicas: ['Comece com Please.', 'Review significa revisar.'],
        explicacao: 'Please review my pull request. — a mensagem mais enviada em canais de equipe.',
        conceitos: ['ingles.github']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Comentários e Alterações no PR',
      blocos: [
        { tipo: 'texto', texto: 'Quando alguém analisa seu código, pode solicitar alterações ou deixar comentários antes de integrar.' },
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['comment', 'comentário'],
          ['need', 'precisar / necessidade']
        ] },
        { tipo: 'ingles', frase: 'We need some changes before merge.', traducao: 'Precisamos de algumas alterações antes de integrar.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en18-p3',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete o pedido de alterações no GitHub.',
        codigo: 'We need some {{1}} before merge.',
        lacunas: [['changes']],
        dicas: ['Palavra que significa alterações ou mudanças.', 'Plural de change.'],
        explicacao: 'We need some changes before merge = precisamos de algumas alterações antes de integrar.',
        conceitos: ['ingles.github']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Publicando uma nova versão (Release)',
      blocos: [
        { tipo: 'texto', texto: 'Depois de juntar todos os PRs aprovados na branch principal, a equipe cria uma **release** (versão de publicação).' },
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['release', 'versão publicada / lançamento'],
          ['ready', 'pronto']
        ] },
        { tipo: 'ingles', frase: 'The new release is ready.', traducao: 'A nova versão está pronta.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en18-p4',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        audio: 'Your pull request is approved. You can merge to main.',
        enunciado: 'Ouça o áudio da aprovação e escolha o significado.',
        opcoes: [
          'Seu pull request foi aprovado. Você pode integrar na main.',
          'Seu pull request tem erros e o banco está fora do ar.',
          'Por favor delete a branch antes de publicar.'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A frase diz que o PR foi aprovado.',
          2: 'A frase autoriza o merge, não pede para deletar.'
        },
        dicas: ['Approved é aprovado.', 'Merge to main é integrar na branch principal.'],
        explicacao: 'Your pull request is approved. You can merge to main. — o sinal verde para integrar sua entrega.',
        conceitos: ['ingles.github']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en18-p5',
        tipo: 'scenario',
        habilidade: 'reading',
        dimensao: 'aplicacao',
        cena: 'No chat, um desenvolvedor escreveu: "Hey, I have a pull request for the new service. Can you review it? All tests pass."',
        enunciado: 'O que o desenvolvedor está comunicando?',
        opcoes: [
          'Que tem um pull request para o novo serviço, pede revisão e informa que os testes passaram',
          'Que o serviço quebrou em produção e o servidor caiu',
          'Que a branch principal foi deletada por engano'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O desenvolvedor está pedindo revisão de código novo, não relatando queda de servidor.',
          2: 'Não há menção a exclusão de branch.'
        },
        dicas: ['Pull request é a proposta de código.', 'Review é revisar.', 'All tests pass = todos os testes passaram.'],
        explicacao: 'Comunicação diária comum em equipes ágeis com desenvolvedores de outros países.',
        conceitos: ['ingles.github'],
        desafio: true
      }
    }
  ]
});
