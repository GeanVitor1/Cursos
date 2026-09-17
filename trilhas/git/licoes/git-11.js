Plataforma.registrarLicao({
  id: 'git-11',
  trilha: 'git',
  tipo: 'licao',
  titulo: 'Commits que contam história',
  subtitulo: 'Fluxo profissional · Etapa 2',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Escrever mensagens de commit com contexto',
    'Usar o imperativo e a primeira linha curta',
    'Dividir o trabalho em commits que fazem sentido sozinhos'
  ],
  conceitos: ['git.commits', 'git.repositorio'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'A mensagem é para quem vai ler depois',
      introduz: ['git.commits'],
      blocos: [
        { tipo: 'retoma', conceito: 'git.repositorio', texto: 'Você já grava pontos na história com `git commit -m`. O que separa um histórico útil de um histórico inútil é a qualidade da mensagem.' },
        { tipo: 'texto', texto: 'A mensagem de commit explica **por que** a mudança aconteceu. Quem lê meses depois precisa entender o problema resolvido sem abrir cada arquivo.' },
        { tipo: 'conceito', id: 'git.commits', titulo: 'Mensagem de commit', texto: 'A mensagem que explica o porquê da mudança, no imperativo e com contexto.', exemplo: 'Corrige cálculo de desconto em pedidos com cupom' },
        {
          tipo: 'tabela',
          titulo: 'Comparando mensagens',
          colunas: ['Mensagem', 'O que ela diz'],
          linhas: [
            ['ajustes', 'Nada: nem o que mudou, nem por quê'],
            ['mexi no total', 'Vago: qual total, qual problema?'],
            ['Corrige cálculo de desconto em pedidos com cupom', 'O problema e o contexto']
          ],
          legenda: 'A terceira mensagem responde o que a mudança resolve.'
        },
        { tipo: 'nota', tom: 'info', texto: 'A mensagem descreve a intenção, não a lista de arquivos. O Git já mostra os arquivos; o que ele não sabe é o motivo.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git11-a1',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'Qual mensagem de commit ajuda mais quem vai ler o histórico em três meses?',
        opcoes: [
          'Corrige cálculo de desconto em pedidos com cupom',
          'ajustes',
          'mudanças no código',
          'commit do dia'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Mensagem genérica obriga a abrir o commit para descobrir o que aconteceu.',
          2: 'A frase não diz o que mudou nem por quê.',
          3: 'Datas não explicam a intenção da mudança.'
        },
        dicas: [
          'Uma boa mensagem responde o que a mudança resolve.',
          'Evite palavras genéricas como ajustes.'
        ],
        explicacao: 'A mensagem específica conta o problema resolvido e o contexto, sem precisar abrir os arquivos.',
        conceitos: ['git.commits']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O padrão que o mercado usa',
      blocos: [
        { tipo: 'texto', texto: 'A convenção mais comum vem do próprio projeto do Git: a primeira linha diz o que a mudança faz, no **imperativo** — como se você estivesse dando uma ordem ao código.' },
        { tipo: 'lista', itens: [
          'Primeira linha curta, com até cerca de 50 caracteres.',
          'Verbo no imperativo: corrige, adiciona, remove, ajusta.',
          'Sem ponto final e sem palavras genéricas.',
          'Se precisar de contexto, deixe uma linha em branco e escreva um corpo curto explicando o motivo.'
        ] },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'Mensagem com contexto',
          codigo: 'git commit -m "Corrige cálculo de desconto em pedidos com cupom"\n\n# ou, com corpo:\n# git commit -m "Corrige cálculo de desconto" -m "Cupom fixo não era somado ao total do pedido."'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Escrever "corrige" e não "corrigido": o padrão do histórico é sempre descrever a ação que o commit executa na história.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git11-a2',
        tipo: 'find-error',
        dimensao: 'aplicacao',
        enunciado: 'Uma revisão recusou o commit abaixo pedindo uma mensagem melhor. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git commit -m "ajustes"' }
        ],
        opcoes: [
          'A mensagem não diz o que mudou nem por quê',
          'Faltou o ponto final na mensagem',
          'A mensagem deveria estar em inglês',
          'Faltou usar letras maiúsculas'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Ponto final não é o problema; a falta de informação é.',
          2: 'O time escreve as mensagens no idioma combinado; o problema é o conteúdo.',
          3: 'Maiúsculas ajudam, mas não substituem o contexto.'
        },
        dicas: [
          'A mensagem precisa fazer sentido sozinha.',
          'Pense no que a mudança resolve.'
        ],
        explicacao: 'Uma mensagem genérica esconde a intenção da mudança e obriga quem lê a abrir o commit para entender o que foi feito.',
        conceitos: ['git.commits']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git11-a3',
        tipo: 'true-false',
        dimensao: 'reconhecimento',
        enunciado: 'Marque verdadeiro ou falso sobre mensagens de commit.',
        afirmacoes: [
          { texto: 'O verbo no imperativo descreve a ação que o commit executa.', correta: true, explicacao: 'É o padrão do histórico do Git: corrige, adiciona, remove.' },
          { texto: 'Quanto mais longa a primeira linha, melhor.', correta: false, explicacao: 'A primeira linha deve ser curta para ser lida rapidamente.' },
          { texto: 'O corpo da mensagem serve para explicar o motivo da mudança.', correta: true, explicacao: 'Com uma linha em branco, o corpo traz o contexto que a primeira linha não cabe.' }
        ],
        dicas: [
          'A primeira linha é um resumo.',
          'O motivo da mudança é o que mais falta no histórico.'
        ],
        explicacao: 'Primeira linha curta no imperativo e corpo explicando o motivo: esse é o padrão que o mercado usa.',
        conceitos: ['git.commits']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Commits atômicos',
      blocos: [
        { tipo: 'texto', texto: 'Um commit **atômico** contém uma única mudança que faz sentido sozinha: dá para descrever em uma frase e, se precisar, desfazer sem levar outras coisas junto.' },
        { tipo: 'lista', itens: [
          'Um commit por assunto: correção, funcionalidade ou documentação, cada um no seu ponto.',
          'Se a mensagem precisar de um "e" para caber, provavelmente são dois commits.',
          'Commits pequenos facilitam o review e a busca no histórico.',
          'Commitar de pouco em pouco evita perder trabalho e diminui os conflitos.'
        ] },
        { tipo: 'destaque', texto: 'Histórico bom é aquele em que cada ponto pode ser lido, entendido e desfeito isoladamente. É isso que um commit atômico entrega.' },
        { tipo: 'trabalho', texto: 'Quando um defeito aparece, a primeira coisa que o time procura é o commit que o introduziu. Commits atômicos e bem descritos transformam essa busca em minutos.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git11-a4',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Você corrigiu um defeito, atualizou o manual e ajustou a formatação de outro arquivo. Tudo está pronto para gravar.',
        enunciado: 'Qual é a divisão mais adequada em commits?',
        opcoes: [
          'Três commits: correção, documentação e formatação',
          'Um único commit com tudo, para não perder tempo',
          'Dois commits: um com a correção e outro com o resto junto',
          'Nenhum commit agora: deixar acumular a semana inteira'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Juntar assuntos diferentes dificulta desfazer apenas um deles depois.',
          2: 'Ainda mistura assuntos: documentação e formatação não têm relação direta.',
          3: 'Acumular uma semana aumenta o risco de perda e de conflitos.'
        },
        dicas: [
          'Cada assunto merece o seu ponto na história.',
          'Se a mensagem precisa de "e", separe.'
        ],
        explicacao: 'Assuntos diferentes pedem commits diferentes. Assim cada mudança pode ser revisada, entendida e desfeita isoladamente.',
        conceitos: ['git.commits']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Message',
      blocos: [
        { tipo: 'texto', texto: 'Três palavras para falar da mensagem do commit:' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (3)',
          pares: [
            ['message', 'mensagem'],
            ['write', 'escrever'],
            ['explain', 'explicar']
          ]
        },
        { tipo: 'ingles', frase: 'Write a message to explain the change.', traducao: 'Escreva uma mensagem para explicar a mudança.' },
        { tipo: 'nota', tom: 'info', texto: '**message** é a mesma palavra que aparece no `-m` do commit: ele abrevia *message*.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git11-a5',
        tipo: 'interpret-code',
        dimensao: 'aplicacao',
        enunciado: 'Write a message to explain the change.',
        opcoes: [
          'Escreva uma mensagem para explicar a mudança',
          'Apague a mensagem que explica a mudança',
          'Envie a mensagem sem explicar a mudança',
          'Leia a mensagem da mudança anterior'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A frase pede para escrever, não para apagar.',
          2: 'A ideia é justamente explicar a mudança na mensagem.',
          3: 'A frase fala do que escrever agora, não do passado.'
        },
        dicas: [
          'write quer dizer escrever; explain quer dizer explicar.',
          'change é a mudança do projeto.'
        ],
        explicacao: 'A frase pede uma mensagem que explique a mudança feita no código.',
        conceitos: ['git.commits']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git11-a6',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Um colega recebeu o chamado de investigar quando um comportamento estranho começou. Ele abriu o histórico e encontrou dez commits seguidos com a mensagem ajustes, todos com muitos arquivos.',
        enunciado: 'Qual conclusão ele pode tirar desse histórico?',
        opcoes: [
          'Será difícil identificar qual mudança causou o problema: as mensagens não dizem nada',
          'O problema começou no primeiro commit da lista, com certeza',
          'O time não usa Git corretamente',
          'Basta olhar os arquivos alterados para saber o motivo'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Sem mensagens, não há como saber qual commit introduziu o comportamento.',
          2: 'O Git está sendo usado; o que faltou foi qualidade nas mensagens.',
          3: 'Os arquivos mostram o que mudou, não o motivo nem o contexto.'
        },
        dicas: [
          'O histórico é a principal ferramenta de investigação.',
          'Mensagens genéricas escondem a intenção.'
        ],
        explicacao: 'Mensagens genéricas em commits grandes escondem o motivo das mudanças e tornam a investigação caríssima. É por isso que contexto e commits atômicos importam.',
        conceitos: ['git.commits'],
        desafio: true
      }
    }
  ]
});
