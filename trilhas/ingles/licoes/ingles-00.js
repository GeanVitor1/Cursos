Plataforma.registrarLicao({
  id: 'ingles-00',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Vocabulário essencial: request, response, database',
  subtitulo: 'English · Etapa 0',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Reconhecer as palavras técnicas mais frequentes',
    'Associar cada palavra ao significado em português',
    'Montar e entender frases curtas do trabalho'
  ],
  conceitos: ['ingles.vocabulario', 'ingles.frases'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'As palavras que aparecem todo dia',
      introduz: ['ingles.vocabulario'],
      blocos: [
        { tipo: 'texto', texto: 'Você não precisa ser fluente para trabalhar. Precisa reconhecer o vocabulário que se repete em documentação, mensagens de erro, tickets e reuniões. Comece pelas palavras desta lista:' },
        { tipo: 'vocab', titulo: 'Essential vocabulary', pares: [
          ['request', 'requisição / pedido'],
          ['response', 'resposta'],
          ['database', 'banco de dados'],
          ['error', 'erro'],
          ['build', 'compilação / construir'],
          ['deploy', 'implantação / publicar'],
          ['issue', 'problema / tarefa registrada'],
          ['branch', 'ramificação (Git)']
        ] },
        { tipo: 'ingles', frase: 'The request failed because the database is unavailable.', traducao: 'A requisição falhou porque o banco de dados está indisponível.' },
        { tipo: 'nota', tom: 'info', texto: 'Clique em **🔊 Ouvir** para escutar a pronúncia. Repetir em voz alta acelera a memorização — não é enfeite.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en00-a1',
        tipo: 'translate',
        dimensao: 'associacao',
        enunciado: 'Qual é o significado de **request**?',
        termo: 'request',
        direcao: 'en-pt',
        opcoes: ['requisição / pedido', 'resposta', 'erro', 'compilação'],
        correta: 0,
        feedbackErro: {
          1: 'Resposta é **response**. A dupla request/response é a base da comunicação entre cliente e servidor.',
          2: 'Erro é **error**.',
          3: 'Compilação é **build**.'
        },
        dicas: ['É o que o cliente envia para o servidor.', 'A resposta tem outro nome em inglês.'],
        explicacao: 'Request = requisição. É o pedido que o cliente faz; a resposta é a response.',
        conceitos: ['ingles.vocabulario']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en00-a2',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada palavra em inglês ao significado em português.',
        pares: [
          ['response', 'Resposta'],
          ['database', 'Banco de dados'],
          ['error', 'Erro'],
          ['build', 'Compilação'],
          ['deploy', 'Implantação']
        ],
        dicas: ['Database aparece em toda documentação de banco de dados.', 'Deploy é o ato de publicar a aplicação.'],
        explicacao: 'Esse é o vocabulário mínimo para ler qualquer issue ou mensagem de erro.',
        conceitos: ['ingles.vocabulario']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en00-a3',
        tipo: 'translate',
        dimensao: 'associacao',
        enunciado: 'Qual é o significado de **deploy**?',
        termo: 'deploy',
        direcao: 'en-pt',
        opcoes: ['implantação / publicar', 'requisição', 'ramificação', 'erro'],
        correta: 0,
        feedbackErro: {
          1: 'Requisição é request.',
          2: 'Ramificação é branch.',
          3: 'Erro é error.'
        },
        dicas: ['É o que se faz quando a aplicação vai para o servidor.', 'Pense em publicar uma nova versão.'],
        explicacao: 'Deploy = implantação: colocar a aplicação no ambiente onde ela vai rodar.',
        conceitos: ['ingles.vocabulario']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Montando frases do trabalho',
      introduz: ['ingles.frases', 'ingles.leitura'],
      blocos: [
        { tipo: 'texto', texto: 'O inglês técnico usa frases curtas e diretas. A estrutura básica é: **sujeito + verbo + complemento**. Depois de montar frases, você vai praticar a **leitura** de mensagens curtas do time.' },
        { tipo: 'codigo', linguagem: 'texto', codigo: 'The request failed.\nThe database is down.\nPlease review this change.' },
        { tipo: 'vocab', titulo: 'Verbos frequentes em mensagens', pares: [
          ['failed', 'falhou'],
          ['works', 'funciona'],
          ['review', 'revisar'],
          ['merge', 'mesclar / juntar alterações'],
          ['fix', 'corrigir'],
          ['retry', 'tentar novamente'],
          ['down', 'fora do ar / caído'],
          ['change', 'mudança / alteração']
        ] },
        { tipo: 'vocab', titulo: 'Palavras das mensagens do time', pares: [
          ['Hey', 'Oi (informal)'],
          ['chat', 'bate-papo / conversa online'],
          ['connection', 'conexão'],
          ['wrong', 'errado / errada'],
          ['config (configuration)', 'configuração'],
          ['please', 'por favor'],
          ['can you...?', 'você pode...?']
        ] },
        { tipo: 'nota', tom: 'atencao', texto: 'Em inglês, o adjetivo costuma vir antes do substantivo: **database error** = erro de banco; **pull request** = pedido de integração. Ler na ordem literal ajuda no começo.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en00-a4',
        tipo: 'order-blocks',
        dimensao: 'ordenacao',
        enunciado: 'Ordene as palavras para formar a frase: "A requisição falhou."',
        blocos: ['The', 'request', 'failed.'],
        dicas: ['Sujeito primeiro, depois o verbo.', 'The = o/a; request = requisição; failed = falhou.'],
        explicacao: 'The request failed. — a frase mais comum de todo log de sistema.',
        conceitos: ['ingles.frases']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en00-a5',
        tipo: 'reading',
        dimensao: 'reconhecimento',
        titulo: 'Mensagem do time',
        enunciado: 'Leia a mensagem e responda.',
        texto: 'Hey, the deploy failed because the database connection is wrong. Can you review the config?',
        pergunta: 'O que o colega está pedindo?',
        opcoes: [
          'Que você revise a configuração, pois o deploy falhou por causa da conexão com o banco',
          'Que você faça um novo deploy imediatamente',
          'Que você crie um banco de dados novo',
          'Que você ignore o problema'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O colega quer entender a causa antes de tentar de novo.',
          2: 'O banco existe; a conexão é que está errada.',
          3: 'Ninguém pediu para ignorar.'
        },
        dicas: ['"Review the config" = revise a configuração.', '"Because" introduz a causa do problema.'],
        explicacao: 'Você acabou de entender uma mensagem real de trabalho usando o vocabulário da lição.',
        conceitos: ['ingles.leitura', 'ingles.vocabulario']
      }
    }
  ]
});
