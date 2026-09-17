Plataforma.registrarLicao({
  id: 'git-06',
  trilha: 'git',
  tipo: 'licao',
  titulo: 'revert: desfazendo com segurança',
  subtitulo: 'Corrigindo erros · Etapa 1',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Entender por que desfazer história compartilhada exige cuidado',
    'Desfazer um commit com git revert',
    'Reconhecer quando o revert é a escolha certa'
  ],
  conceitos: ['git.revert', 'git.repositorio'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Errar depois de enviar',
      introduz: ['git.revert'],
      blocos: [
        { tipo: 'retoma', conceito: 'git.repositorio', texto: 'Você já grava pontos na história com `git commit` e os envia com `git push`. Agora o commit foi enviado e continha um erro — o que fazer?' },
        { tipo: 'texto', texto: 'Apagar um commit do histórico é perigoso quando outras pessoas já puxaram esse commit: os históricos ficam diferentes e a confusão é grande. A saída segura é o **revert**: em vez de apagar, você grava um **novo commit que desfaz** exatamente o que o commit errado fez.' },
        {
          tipo: 'diagrama',
          arte: 'main   ●───●───●───●         o commit errado continua na história\n                     \\\n                      ●   revert: desfaz o que ele fez',
          legenda: 'O revert acrescenta um ponto novo; a história do erro fica registrada, mas sem efeito.'
        },
        { tipo: 'conceito', id: 'git.revert', titulo: 'revert', texto: 'Cria um novo commit que desfaz um commit anterior, preservando a história.', exemplo: 'git revert a1b2c3d' },
        { tipo: 'nota', tom: 'info', texto: 'Revert é a operação educada com quem já puxou o commit: ninguém precisa fazer nada na própria máquina, basta puxar o novo commit.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git06-a1',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'O que o `git revert` faz com o commit que contém o erro?',
        opcoes: [
          'Cria um commit novo que desfaz as mudanças dele',
          'Apaga o commit do histórico para sempre',
          'Corrige o commit antigo no lugar',
          'Envia o commit errado de volta para a máquina'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Apagar história é justamente o que o revert evita em branches compartilhadas.',
          2: 'Editar o passado deixaria o histórico do time diferente para cada pessoa.',
          3: 'Quem envia commits é o push; o revert é um commit novo.'
        },
        dicas: [
          'O revert não apaga nada: ele acrescenta.',
          'O novo commit anula o efeito do anterior.'
        ],
        explicacao: 'O `git revert` grava um commit novo que desfaz o commit anterior. A história continua completa e o time não precisa reescrever nada.',
        conceitos: ['git.revert']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'revert na prática',
      blocos: [
        { tipo: 'texto', texto: 'O `git revert` precisa saber **qual** commit desfazer. Use o `git log` para localizar o identificador do commit — aquele código curto que aparece ao lado da mensagem.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'Localizando e desfazendo',
          codigo: 'git log --oneline\n\n# 8b7d4e1 Ajusta arredondamento de preço\n# 3f2a1c9 Corrige total do pedido\n\ngit revert 8b7d4e1'
        },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'O que o Git faz',
          codigo: '[main 9c4f0a2] Revert "Ajusta arredondamento de preço"\n 1 file changed, 3 insertions(+), 3 deletions(-)'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'O revert não olha para a sua pasta de trabalho: ele desfaz o que o commit fez na época. Se o código já mudou depois, o Git avisa que não conseguiu aplicar.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git06-a2',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete o comando que desfaz o commit `8b7d4e1` e grava o novo ponto na história.',
        codigo: 'git {{1}} 8b7d4e1',
        lacunas: [['revert']],
        dicas: [
          'A palavra em inglês está no nome do conceito.',
          'É o comando que cria um commit que desfaz outro.'
        ],
        explicacao: 'O comando cria um commit novo que anula as mudanças do commit indicado, sem apagar o histórico.',
        conceitos: ['git.revert']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O que o histórico mostra depois',
      blocos: [
        { tipo: 'texto', texto: 'Depois do revert, o commit errado continua visível no histórico, seguido do commit que o desfez. Quem lê entende a sequência: houve um ajuste, ele causou problema e foi revertido.' },
        {
          tipo: 'tabela',
          titulo: 'Histórico depois do revert',
          colunas: ['Commit', 'Mensagem'],
          linhas: [
            ['9c4f0a2', 'Revert "Ajusta arredondamento de preço"'],
            ['8b7d4e1', 'Ajusta arredondamento de preço'],
            ['3f2a1c9', 'Corrige total do pedido']
          ],
          legenda: 'A história registra o erro e a correção — exatamente o que o time precisa saber.'
        },
        { tipo: 'nota', tom: 'sucesso', texto: 'Como o revert é apenas um commit novo, ele passa pelo mesmo fluxo do dia a dia: `git push` para enviar e pull request quando o time trabalha com revisão.' },
        { tipo: 'trabalho', texto: 'Reverter um defeito que chegou ao ambiente compartilhado é rotina em times maduros. O importante é agir rápido e registrar o motivo na mensagem do revert.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git06-a3',
        tipo: 'predict-output',
        dimensao: 'aplicacao',
        enunciado: 'Depois deste comando, qual é o estado do projeto?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git revert 8b7d4e1' },
          {
            tipo: 'tabela',
            titulo: 'Commit 8b7d4e1',
            colunas: ['O que ele fez'],
            linhas: [
              ['Alterou o cálculo de arredondamento de preço']
            ]
          }
        ],
        opcoes: [
          'O cálculo voltou ao comportamento anterior e um commit novo foi criado',
          'O commit 8b7d4e1 desapareceu do histórico',
          'A pasta de trabalho foi apagada e recriada',
          'O commit foi enviado para o servidor automaticamente'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O revert preserva o commit antigo; um novo commit é acrescentado.',
          2: 'O revert não mexe na pasta fora do que o commit desfaz.',
          3: 'O envio continua sendo um passo separado, com push.'
        },
        dicas: [
          'Desfazer o efeito sem apagar o commit.',
          'Um commit novo entra no fim da história.'
        ],
        explicacao: 'O revert anula as mudanças do commit indicado e registra essa anulação como um commit novo.',
        conceitos: ['git.revert']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Quando o revert é a escolha certa',
      blocos: [
        { tipo: 'lista', itens: [
          'O commit já foi enviado e outras pessoas podem tê-lo puxado.',
          'O commit está na linha principal, onde a história é compartilhada.',
          'Você precisa registrar que houve um problema e que ele foi desfeito.',
          'O erro é pontual: dá para desfazer apenas aquele commit, sem mexer no resto.'
        ] },
        { tipo: 'destaque', texto: 'Regra prática: se o commit saiu da sua máquina, prefira **revert**. História local ainda não compartilhada tem outras ferramentas, que você verá na próxima lição.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Antes de reverter, verifique se o problema não está em um commit mais recente. Reverter o commit errado só aumenta a bagunça.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git06-a4',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Uma correção de frete foi enviada para a main e, horas depois, o time percebeu que ela quebrou o cálculo para pedidos internacionais. Vários colegas já puxaram o commit.',
        enunciado: 'Qual é a ação mais segura?',
        opcoes: [
          'Rodar git revert no commit problemático e enviar o novo commit',
          'Reescrever o histórico para apagar o commit da main',
          'Pedir para cada colega apagar o commit na própria máquina',
          'Deixar como está e corrigir em um commit futuro, sem avisar'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Reescrever história compartilhada faz cada máquina ter uma versão diferente.',
          2: 'Pedir ação manual para o time inteiro é lento e sujeito a erro.',
          3: 'O cálculo quebrado continua valendo até alguém agir; avisar e reverter é o caminho.'
        },
        dicas: [
          'O commit já está na mão de outras pessoas.',
          'A solução precisa preservar o histórico que o time tem.'
        ],
        explicacao: 'O revert desfaz o efeito do commit no histórico compartilhado, sem exigir ação de ninguém além de um novo push.',
        conceitos: ['git.revert'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Undo',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras para falar de desfazer:' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['revert', 'desfazer / reverter'],
            ['undo', 'desfazer']
          ]
        },
        { tipo: 'ingles', frase: 'Revert the commit to undo the change.', traducao: 'Reverta o commit para desfazer a mudança.' },
        { tipo: 'nota', tom: 'info', texto: 'A mensagem que o Git escreve começa com **Revert**, seguida da mensagem original do commit. Assim o histórico explica sozinho o que aconteceu.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git06-a5',
        tipo: 'interpret-code',
        dimensao: 'aplicacao',
        enunciado: 'Revert the commit to undo the change.',
        opcoes: [
          'Reverta o commit para desfazer a mudança',
          'Apague o commit para desfazer o histórico',
          'Envie o commit para desfazer a mudança',
          'Crie um commit para guardar a mudança'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Revert não apaga: ele cria um commit que desfaz.',
          2: 'Enviar é push; a frase fala de desfazer o efeito.',
          3: 'Criar um commit para guardar é o oposto de desfazer.'
        },
        dicas: [
          'revert quer dizer reverter; undo quer dizer desfazer.',
          'A frase tem duas ações com o mesmo objetivo.'
        ],
        explicacao: 'A frase pede para reverter o commit e, assim, desfazer a mudança.',
        conceitos: ['git.revert']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git06-a6',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'Qual mensagem de commit o Git cria automaticamente em um revert?',
        opcoes: [
          'Revert seguido da mensagem original do commit desfeito',
          'Apenas a palavra ajustes',
          'O identificador do commit, sem explicação',
          'A data e a hora do revert, sem texto'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Uma mensagem genérica esconde o motivo da mudança no histórico.',
          2: 'O identificador sozinho não conta o que aconteceu.',
          3: 'Data e hora não explicam o que foi desfeito.'
        },
        dicas: [
          'A mensagem reaproveita o texto do commit original.',
          'Quem lê o histórico entende o que foi revertido.'
        ],
        explicacao: 'O Git copia a mensagem original para o commit novo, com a palavra Revert na frente. Assim o histórico explica sozinho o que foi desfeito.',
        conceitos: ['git.revert']
      }
    }
  ]
});
