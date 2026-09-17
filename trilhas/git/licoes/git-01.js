Plataforma.registrarLicao({
  id: 'git-01',
  trilha: 'git',
  tipo: 'licao',
  titulo: 'push, pull e o fluxo diário',
  subtitulo: 'Fundamentos · Etapa 2',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Enviar commits locais para o servidor com git push',
    'Trazer o trabalho dos colegas com git pull',
    'Rodar o fluxo diário completo sem deixar o repositório para trás'
  ],
  conceitos: ['git.sincronizacao', 'git.repositorio'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Duas cópias do mesmo projeto',
      introduz: ['git.sincronizacao'],
      blocos: [
        { tipo: 'retoma', conceito: 'git.repositorio', texto: 'Você já clona o projeto, prepara mudanças com `git add` e grava pontos na história com `git commit`. Tudo isso acontece **na sua máquina**.' },
        { tipo: 'texto', texto: 'O time trabalha em cópias diferentes do mesmo repositório. Para o trabalho de todos se encontrar, existem dois comandos: `git push`, que envia os seus commits, e `git pull`, que traz os commits dos colegas.' },
        {
          tipo: 'diagrama',
          arte: 'sua máquina                       servidor (origin)\n┌───────────────┐                 ┌───────────────┐\n│ commits locais│  ── git push ─► │ commits do    │\n│               │  ◄─ git pull ── │ time          │\n└───────────────┘                 └───────────────┘',
          legenda: 'O servidor é o ponto de encontro: push envia, pull traz.'
        },
        { tipo: 'conceito', id: 'git.sincronizacao', titulo: 'Sincronização', texto: 'push envia seus commits para o repositório remoto; pull traz os commits dos outros.', exemplo: 'git push origin main' },
        { tipo: 'nota', tom: 'info', texto: 'O servidor do clone recebe o apelido de `origin`, e `main` é o nome da linha principal de desenvolvimento. É por isso que o comando completo é `git push origin main`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git01-a1',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'Qual é a diferença entre `git push` e `git pull`?',
        opcoes: [
          'push envia os commits locais; pull traz os commits que estão no servidor',
          'push traz os commits do servidor; pull envia os commits locais',
          'push grava o commit local; pull prepara as mudanças',
          'Os dois enviam commits, apenas em momentos diferentes'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Está invertido: quem envia é o push e quem traz é o pull.',
          2: 'Gravar o commit local é papel do git commit; preparar é papel do git add.',
          3: 'São direções opostas: um envia para o servidor, o outro traz de lá.'
        },
        dicas: [
          '**push** lembra empurrar para o servidor.',
          '**pull** lembra puxar do servidor.'
        ],
        explicacao: '`git push` envia os seus commits para o servidor; `git pull` traz para a sua máquina os commits que os colegas enviaram.',
        conceitos: ['git.sincronizacao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'push: enviando o seu trabalho',
      blocos: [
        { tipo: 'texto', texto: 'O `git push` pega os commits que existem na sua cópia local e ainda não estão no servidor, e os envia. Enquanto o commit é local, só você o vê; depois do push, o time inteiro pode puxá-lo.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'Enviando para a linha principal',
          codigo: 'git push origin main\n\n# origin = servidor de onde o projeto foi clonado\n# main   = linha principal de desenvolvimento'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'O push envia **commits**, não arquivos soltos. Se você mudou algo e não commitou, o push não tem nada para enviar.' },
        { tipo: 'trabalho', texto: 'Enviar o trabalho no fim do dia é o que permite o colega continuar de onde você parou. Um push esquecido é um dia de trabalho invisível para o time.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git01-a2',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete o comando que envia os commits locais para a linha principal do servidor.',
        codigo: 'git push {{1}} {{2}}',
        lacunas: [['origin'], ['main']],
        dicas: [
          'O servidor de onde o projeto foi clonado tem um apelido.',
          'A linha principal se chama main.'
        ],
        explicacao: '`git push origin main` envia os commits locais para a linha `main` do servidor `origin`.',
        conceitos: ['git.sincronizacao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'pull: trazendo o trabalho dos colegas',
      blocos: [
        { tipo: 'texto', texto: 'O `git pull` faz o caminho contrário: busca no servidor os commits que ainda não estão na sua cópia e os junta ao seu trabalho local.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'Trazendo o que o time enviou',
          codigo: 'git pull origin main'
        },
        { tipo: 'texto', texto: 'O hábito profissional é simples: **puxe antes de começar**. Assim você trabalha sobre a versão mais recente do projeto, em vez de descobrir diferenças no fim do dia.' },
        { tipo: 'nota', tom: 'info', texto: 'Se o servidor tiver mudanças que você ainda não tem, o Git pede um pull antes de aceitar o seu push. É proteção, não castigo.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git01-a3',
        tipo: 'predict-output',
        dimensao: 'aplicacao',
        enunciado: 'O que acontece com o commit recém-criado na sua máquina?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git add .\ngit commit -m "Ajusta cálculo de frete"' },
          {
            tipo: 'tabela',
            titulo: 'Estado do projeto',
            colunas: ['Onde', 'Tem o commit?'],
            linhas: [
              ['Sua máquina', 'Sim'],
              ['Servidor (origin)', 'Não']
            ]
          }
        ],
        opcoes: [
          'O commit existe apenas localmente até você rodar git push',
          'O commit já foi para o servidor junto com o commit',
          'O commit vai para o servidor no próximo git status',
          'O commit some se você fechar o terminal'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Commit e push são passos separados: o commit é local.',
          2: 'O status só informa; ele não envia nada.',
          3: 'O commit fica gravado no repositório local até ser enviado.'
        },
        dicas: [
          'Gravar localmente e enviar são passos diferentes.',
          'Existe um comando específico para enviar.'
        ],
        explicacao: 'O `git commit` grava apenas na sua cópia. O commit só chega ao servidor com `git push`.',
        conceitos: ['git.sincronizacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git01-a4',
        tipo: 'order-blocks',
        dimensao: 'ordenacao',
        enunciado: 'Ordene o fluxo diário completo: do que mudou no projeto até o envio para o servidor.',
        blocos: ['git status', 'git add .', 'git commit -m "Valida estoque negativo"', 'git pull origin main', 'git push origin main'],
        dicas: [
          'Primeiro você confere, depois prepara e grava.',
          'Antes de enviar, traga o que o time tem.'
        ],
        explicacao: 'Conferir, preparar, gravar, puxar e enviar: esse é o ciclo que se repete todos os dias. O pull antes do push evita que o seu envio seja recusado.',
        conceitos: ['git.sincronizacao', 'git.repositorio']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git01-a5',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Você gravou dois commits e tentou enviar. O servidor recusou o push porque um colega havia enviado mudanças depois do seu último pull.',
        enunciado: 'Qual é a sequência correta para resolver?',
        opcoes: [
          'Rodar git pull para trazer os commits do colega e, em seguida, git push',
          'Apagar os seus commits e começar de novo',
          'Rodar git commit novamente e tentar o push',
          'Pedir para o colega apagar o trabalho dele'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Apagar o seu trabalho não é necessário: o pull resolve a ordem.',
          2: 'Não há nada novo para commitar: o problema é que falta a versão do servidor.',
          3: 'O trabalho do colega é legítimo; basta sincronizar antes de enviar.'
        },
        dicas: [
          'Falta trazer o que o servidor tem.',
          'A ordem é trazer primeiro, enviar depois.'
        ],
        explicacao: 'Quando o servidor tem commits que você não tem, o Git recusa o push. O `git pull` traz esses commits e, depois, o `git push` funciona.',
        conceitos: ['git.sincronizacao'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Remote',
      blocos: [
        { tipo: 'texto', texto: 'Três palavras que aparecem em toda conversa sobre compartilhar código:' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (3)',
          pares: [
            ['remote', 'remoto'],
            ['pull', 'puxar / trazer'],
            ['push', 'empurrar / enviar']
          ]
        },
        { tipo: 'ingles', frase: 'Push the changes to the remote repository.', traducao: 'Envie as mudanças para o repositório remoto.' },
        { tipo: 'nota', tom: 'info', texto: 'Repare que os próprios comandos vêm dessas palavras: `pull` (puxar) traz, `push` (empurrar) envia. O **remote** é o servidor compartilhado.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git01-a6',
        tipo: 'write-code',
        dimensao: 'construcao',
        enunciado: 'Push the changes to the remote repository.',
        placeholder: 'git ...',
        respostasAceitas: [
          'git push origin main',
          'git push'
        ],
        dicas: [
          'remote quer dizer remoto; changes quer dizer mudanças.',
          'Enviar commits para a linha principal usa push origin main.'
        ],
        explicacao: 'Traduzindo: "push the changes to the remote repository" = envie as mudanças para o repositório remoto. `git push origin main` é o comando do dia a dia.',
        conceitos: ['git.sincronizacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git01-a7',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada comando ao resultado que ele produz.',
        pares: [
          ['git clone', 'Traz o projeto e o histórico para a máquina'],
          ['git commit', 'Grava um ponto na história local'],
          ['git push', 'Envia os commits locais para o servidor'],
          ['git pull', 'Traz para a máquina os commits que estão no servidor']
        ],
        dicas: [
          'clone acontece uma vez por projeto.',
          'push e pull são direções opostas.'
        ],
        explicacao: 'Cada comando cuida de uma parte do ciclo: clonar, gravar, enviar e trazer. Juntos, formam o fluxo diário do time.',
        conceitos: ['git.sincronizacao', 'git.repositorio']
      }
    }
  ]
});
