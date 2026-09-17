Plataforma.registrarLicao({
  id: 'git-05',
  trilha: 'git',
  tipo: 'licao',
  titulo: 'Conflito: você e outro dev na mesma linha',
  subtitulo: 'Colaboração · Etapa 4',
  duracaoMin: 55,
  xp: 30,
  objetivos: [
    'Reconhecer quando um conflito acontece',
    'Ler e resolver os marcadores deixados pelo Git',
    'Concluir o merge depois de resolver o conflito'
  ],
  conceitos: ['git.conflito', 'git.merge', 'git.branch'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Quando o Git não decide sozinho',
      introduz: ['git.conflito'],
      blocos: [
        { tipo: 'retoma', conceito: 'git.merge', texto: 'No merge normal, o Git junta as mudanças das duas linhas automaticamente. Mas existe um caso em que ele para e pede ajuda.' },
        { tipo: 'texto', texto: 'Um **conflito** acontece quando as duas linhas alteram **a mesma linha do mesmo arquivo** de formas diferentes. O Git não sabe qual versão é a correta e precisa que uma pessoa decida.' },
        {
          tipo: 'diagrama',
          arte: 'main      ●───●───●──────────●\n               \\            /\n                ●───●───●    feature/desconto\n                     ▲\n            os dois lados mexeram\n            na mesma linha do total',
          legenda: 'O conflito não é erro do Git: é uma decisão que só o time pode tomar.'
        },
        { tipo: 'conceito', id: 'git.conflito', titulo: 'Conflito', texto: 'Quando duas mudanças tocam a mesma linha e o Git não consegue decidir sozinho; alguém precisa resolver.', exemplo: '<<<<<<< HEAD' },
        { tipo: 'nota', tom: 'info', texto: 'Conflito não quer dizer que algo quebrou. O merge fica **pausado** esperando a sua decisão; nada foi perdido.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git05-a1',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'Em que situação o Git pede que alguém resolva um conflito?',
        opcoes: [
          'Quando as duas linhas alteram a mesma linha do mesmo arquivo de formas diferentes',
          'Quando um arquivo novo é criado na branch',
          'Quando um commit tem uma mensagem longa demais',
          'Quando o servidor está sem conexão'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Arquivo novo não gera conflito: só um lado tem essa linha.',
          2: 'O tamanho da mensagem não interfere no merge.',
          3: 'Sem conexão o push falha; o conflito é outro assunto.'
        },
        dicas: [
          'O conflito é sobre a mesma linha, não sobre arquivos diferentes.',
          'Os dois lados precisam ter mexido no mesmo trecho.'
        ],
        explicacao: 'O conflito aparece quando as duas versões da mesma linha são diferentes: o Git não escolhe sozinho e pausa o merge.',
        conceitos: ['git.conflito', 'git.merge']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Como o Git marca o conflito',
      blocos: [
        { tipo: 'texto', texto: 'Quando o conflito acontece, o Git escreve os dois lados dentro do arquivo, separados por marcadores. O seu papel é editar o arquivo e deixar apenas o resultado final correto.' },
        {
          tipo: 'codigo',
          linguagem: 'git',
          titulo: 'Trecho do arquivo em conflito',
          codigo: '<<<<<<< HEAD\n    total = total - desconto;\n=======\n    total = total * 0.90;\n>>>>>>> feature/desconto'
        },
        {
          tipo: 'tabela',
          titulo: 'Lendo os marcadores',
          colunas: ['Marcador', 'Significado'],
          linhas: [
            ['<<<<<<< HEAD', 'Começa a versão da branch em que você está'],
            ['=======', 'Separador entre as duas versões'],
            ['>>>>>>> feature/desconto', 'Termina a versão da branch que chegou']
          ],
          legenda: 'Os marcadores são temporários: eles somem quando você decide o resultado.'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Nunca deixe os marcadores no arquivo final. O Git aceita o commit, mas o código nunca mais compila ou funciona direito.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git05-a2',
        tipo: 'interpret-code',
        dimensao: 'aplicacao',
        enunciado: 'O trecho abaixo veio de um arquivo em conflito. O que o marcador `<<<<<<< HEAD` indica?',
        contexto: [
          { tipo: 'codigo', linguagem: 'git', codigo: '<<<<<<< HEAD\n    total = total - desconto;\n=======\n    total = total * 0.90;\n>>>>>>> feature/desconto' }
        ],
        opcoes: [
          'Que a linha seguinte pertence à branch em que o merge foi executado',
          'Que a linha seguinte é a versão mais nova do servidor',
          'Que o Git já escolheu a versão correta',
          'Que o arquivo precisa ser apagado do projeto'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A versão que chegou aparece depois do separador, no lado da outra branch.',
          2: 'O Git não escolhe: ele mostra os dois lados para a pessoa decidir.',
          3: 'Apagar o arquivo perderia o trabalho dos dois lados.'
        },
        dicas: [
          'HEAD aponta para a branch atual.',
          'O separador ======= divide os dois lados.'
        ],
        explicacao: 'O trecho entre `<<<<<<< HEAD` e `=======` é a versão da branch atual; o outro lado é a versão que chegou.',
        conceitos: ['git.conflito']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Resolvendo passo a passo',
      blocos: [
        { tipo: 'texto', texto: 'O Git avisa quais arquivos estão em conflito no `git status`. A resolução é sempre a mesma sequência:' },
        { tipo: 'passos', itens: [
          'Rodar `git status` e ver a lista de arquivos em conflito.',
          'Abrir cada arquivo e decidir o resultado final, reunindo os dois lados ou escolhendo um deles.',
          'Apagar as linhas de marcadores (`<<<<<<<`, `=======`, `>>>>>>>`).',
          'Preparar os arquivos resolvidos com `git add`.',
          'Concluir o merge com `git commit`.'
        ] },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'Concluindo o merge',
          codigo: 'git status        # lista os arquivos em conflito\ngit add src/Total.cs\ngit commit        # finaliza o merge'
        },
        { tipo: 'nota', tom: 'sucesso', texto: 'Depois do `git add` no arquivo resolvido, ele sai da lista de conflitos. Quando a lista esvazia, o commit fecha o merge.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git05-a3',
        tipo: 'order-blocks',
        dimensao: 'ordenacao',
        enunciado: 'Ordene os passos para resolver um conflito e concluir o merge.',
        blocos: ['git status', 'editar o arquivo e apagar os marcadores', 'git add src/Total.cs', 'git commit'],
        dicas: [
          'O status mostra onde está o problema.',
          'O add marca o arquivo como resolvido.'
        ],
        explicacao: 'Ver os arquivos, editar, marcar como resolvido com add e concluir com commit: essa é a sequência de qualquer conflito.',
        conceitos: ['git.conflito']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git05-a4',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete para marcar o arquivo como resolvido e concluir o merge.',
        codigo: 'git add src/Total.cs\ngit {{1}}',
        lacunas: [['commit']],
        dicas: [
          'Depois de resolver, falta fechar o merge.',
          'O comando que grava a união é o mesmo do dia a dia.'
        ],
        explicacao: 'Com os arquivos preparados, o `git commit` fecha o merge que estava pausado.',
        conceitos: ['git.conflito', 'git.merge']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Quando é melhor desistir do merge',
      blocos: [
        { tipo: 'texto', texto: 'Às vezes a melhor decisão é parar: o conflito mostra que o seu trabalho e o do colega resolveram o mesmo problema de formas incompatíveis. Nesse caso, é possível desfazer o merge e conversar antes de continuar.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'Voltando ao estado anterior',
          codigo: 'git merge --abort'
        },
        { tipo: 'nota', tom: 'info', texto: 'O `--abort` cancela o merge em andamento e devolve o projeto ao estado de antes. Nenhum commit é perdido.' },
        { tipo: 'trabalho', texto: 'Conflito resolvido no grito vira defeito em produção. Em time maduro, conflito é motivo para uma conversa rápida antes de escolher a versão final.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git05-a5',
        tipo: 'predict-output',
        dimensao: 'aplicacao',
        enunciado: 'O que o `git status` mostra durante um conflito?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git merge feature/desconto' },
          {
            tipo: 'codigo',
            linguagem: 'bash',
            titulo: 'Saída do git status',
            codigo: 'On branch main\nYou have unmerged paths.\n  (fix conflicts and run "git commit")\n\nUnmerged paths:\n        both modified:   src/Total.cs'
          }
        ],
        opcoes: [
          'Que o arquivo src/Total.cs foi alterado nas duas linhas e precisa de decisão',
          'Que o merge terminou com sucesso',
          'Que o arquivo src/Total.cs foi apagado do projeto',
          'Que falta rodar git pull'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A mensagem pede para corrigir os conflitos e depois commitar.',
          2: 'O arquivo continua no projeto; o que mudou é que ele tem duas versões.',
          3: 'Sincronizar com o servidor é outro assunto: o merge está pausado.'
        },
        dicas: [
          'both modified = modificado nos dois lados.',
          'A mensagem final diz o que fazer depois.'
        ],
        explicacao: 'A saída lista o arquivo como modificado nos dois lados e orienta: corrigir os conflitos e concluir com commit.',
        conceitos: ['git.conflito', 'git.merge']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git05-a6',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Você e um colega alteraram a mesma validação de estoque de formas diferentes. O conflito está aberto e você não sabe qual regra o time combinou.',
        enunciado: 'Qual é a melhor atitude?',
        opcoes: [
          'Falar com o colega para entender as duas regras antes de escolher o resultado final',
          'Escolher a sua versão, porque você conhece o seu código',
          'Escolher a versão do colega, para não gerar discussão',
          'Apagar o arquivo e escrever de novo do zero'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Escolher sozinho pode descartar uma regra válida do colega.',
          2: 'Ceder sem entender também pode descartar a sua regra.',
          3: 'Reescrever do zero joga fora o contexto das duas mudanças.'
        },
        dicas: [
          'O conflito mostra duas intenções diferentes.',
          'A decisão é do time, não de um lado só.'
        ],
        explicacao: 'Conflito é uma decisão de time: entender as duas intenções evita decidir no escuro e perder uma regra importante.',
        conceitos: ['git.conflito']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Conflict',
      blocos: [
        { tipo: 'texto', texto: 'Vocabulário para quando as duas versões se encontram:' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (3)',
          pares: [
            ['conflict', 'conflito'],
            ['resolve', 'resolver'],
            ['before', 'antes']
          ]
        },
        { tipo: 'ingles', frase: 'Resolve the conflict before the merge.', traducao: 'Resolva o conflito antes do merge.' },
        { tipo: 'nota', tom: 'info', texto: 'A mensagem **You have unmerged paths** avisa que existem caminhos não unidos esperando a sua decisão.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git05-a7',
        tipo: 'interpret-code',
        dimensao: 'aplicacao',
        enunciado: 'Resolve the conflict before the merge.',
        opcoes: [
          'Resolva o conflito antes do merge',
          'Faça o merge antes de resolver o conflito',
          'Envie o conflito para o servidor antes do merge',
          'Apague o conflito depois do merge'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A frase diz o contrário: o conflito vem primeiro.',
          2: 'Enviar não resolve nada enquanto o merge está pausado.',
          3: 'O conflito não é um arquivo para apagar: ele é uma decisão.'
        },
        dicas: [
          'before = antes; resolve = resolver.',
          'A ordem da frase é a ordem das ações.'
        ],
        explicacao: 'A frase pede para resolver o conflito antes do merge.',
        conceitos: ['git.conflito']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git05-a8',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Você abriu um pull request pequeno, mas deu conflito na main porque o colega mexeu no mesmo arquivo minutos antes. É a terceira vez na semana que isso acontece com o time.',
        enunciado: 'Além de resolver o conflito agora, o que o time deveria mudar?',
        opcoes: [
          'Combinar tarefas menores e puxar a main com mais frequência, para as linhas se encontrarem antes',
          'Proibir merges e deixar uma pessoa unir tudo no fim do mês',
          'Trabalhar todos na main para não existir conflito',
          'Esperar o projeto ficar grande para decidir um fluxo'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Unir tudo de uma vez junta os conflitos em um só dia.',
          2: 'Trabalhar na main piora: as mudanças pela metade vão direto para o caminho de todos.',
          3: 'O fluxo de trabalho se organiza desde o começo, não quando o problema cresce.'
        },
        dicas: [
          'Conflitos frequentes são sintoma de branches longas e desatualizadas.',
          'Sincronizar mais vezes aproxima as linhas.'
        ],
        explicacao: 'Branches curtas e `git pull` frequente fazem as linhas se encontrarem antes de divergir. Conflito continua possível, mas raro e pequeno.',
        conceitos: ['git.conflito', 'git.merge'],
        desafio: true
      }
    }
  ]
});
