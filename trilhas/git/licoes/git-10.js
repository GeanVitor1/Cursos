Plataforma.registrarLicao({
  id: 'git-10',
  trilha: 'git',
  tipo: 'licao',
  titulo: 'Git Flow, trunk-based e o que o mercado usa',
  subtitulo: 'Fluxo profissional · Etapa 1',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Explicar o que é um fluxo de trabalho com branches',
    'Comparar Git Flow e trunk-based',
    'Reconhecer o fluxo que os times usam hoje'
  ],
  conceitos: ['git.fluxo', 'git.branch', 'git.merge', 'git.pr'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Acordos do time, não regras do Git',
      introduz: ['git.fluxo'],
      blocos: [
        { tipo: 'retoma', conceito: 'git.branch', texto: 'Você já sabe criar branches, unir com merge e propor mudanças com pull request. Falta combinar **quando** cada uma dessas etapas acontece.' },
        { tipo: 'texto', texto: 'Um **fluxo de trabalho** é o acordo de como o time usa branches: quem nasce de onde, quando o trabalho entra na linha principal e o que acontece nas entregas. O Git é a ferramenta; o fluxo é a organização.' },
        { tipo: 'conceito', id: 'git.fluxo', titulo: 'Fluxo de trabalho', texto: 'Os acordos de como o time usa branches: Git Flow, trunk-based e variações.', exemplo: 'Features curtas saindo da main e voltando por pull request.' },
        { tipo: 'texto', texto: 'Não existe fluxo perfeito: existe o fluxo que combina com o tamanho do time, a frequência de entrega e a maturidade das práticas. Os dois modelos mais conhecidos vêm a seguir.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git10-a1',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'O que um fluxo de trabalho define em um time?',
        opcoes: [
          'Como as branches são criadas, unidas e entregues ao longo do tempo',
          'Quais comandos do Git cada pessoa pode digitar',
          'O idioma das mensagens de commit',
          'A versão do Git instalada nas máquinas'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O Git não restringe comandos por pessoa; o fluxo é um acordo, não uma trava.',
          2: 'O idioma das mensagens pode até ser combinado, mas isso é detalhe, não o fluxo.',
          3: 'A versão da ferramenta não define a organização do trabalho.'
        },
        dicas: [
          'Pense no caminho que uma tarefa percorre até a linha principal.',
          'É um acordo de time, não uma regra da ferramenta.'
        ],
        explicacao: 'O fluxo organiza o caminho das mudanças: onde nascem as branches, como são unidas e quando chegam à linha principal.',
        conceitos: ['git.fluxo', 'git.branch']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Git Flow: várias linhas com papéis fixos',
      blocos: [
        { tipo: 'texto', texto: 'O Git Flow define branches permanentes e temporárias, cada uma com um papel. É um modelo mais estruturado, pensado para entregas planejadas.' },
        {
          tipo: 'tabela',
          titulo: 'As branches do Git Flow',
          colunas: ['Branch', 'Papel'],
          linhas: [
            ['main', 'Guarda apenas o que está entregue e estável'],
            ['develop', 'Linha de integração do trabalho em andamento'],
            ['feature/*', 'Cada funcionalidade nova, saindo da develop'],
            ['release/*', 'Preparação da próxima entrega'],
            ['hotfix/*', 'Correção urgente, saindo da main']
          ],
          legenda: 'Quanto mais camadas, mais passos até uma mudança chegar à main.'
        },
        {
          tipo: 'diagrama',
          arte: 'main        ●───────────────●──────●   entregas\n             \\             /      /\n              \\    hotfix /      /\n               \\         /      /\n develop        ●───●───●───●───●        integração\n                  \\     /\n                   ●───●   feature/preco',
          legenda: 'As features passam pela develop; os hotfixes vão direto para a main.'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'O Git Flow funciona bem em projetos com entregas espaçadas, mas cria cerimônia demais para times que publicam várias vezes por dia.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git10-a2',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada branch do Git Flow ao seu papel.',
        pares: [
          ['develop', 'Integra o trabalho em andamento do time'],
          ['feature/preco', 'Desenvolve uma funcionalidade isolada'],
          ['release/v1.2.0', 'Prepara a próxima entrega'],
          ['hotfix/total', 'Corrige um problema urgente na versão entregue']
        ],
        dicas: [
          'A feature nasce da develop.',
          'O hotfix nasce da main e é urgente.'
        ],
        explicacao: 'No Git Flow, cada branch tem papel fixo: integração, funcionalidade, preparação de entrega e correção urgente.',
        conceitos: ['git.fluxo', 'git.branch']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Trunk-based: branches curtas e a linha principal sempre entregável',
      blocos: [
        { tipo: 'texto', texto: 'No trunk-based, a linha principal (o *trunk*, o tronco) é a única linha permanente. Cada pessoa trabalha em branches curtíssimas, de horas a poucos dias, e o trabalho volta para a principal com frequência.' },
        { tipo: 'lista', itens: [
          'Branches duram pouco: quanto maior o tempo, maior o risco de diferenças acumuladas.',
          'A linha principal precisa estar sempre pronta para entrega.',
          'O time integra o trabalho várias vezes ao dia.',
          'Mudanças grandes ficam escondidas atrás de recursos desligados até estarem seguras.'
        ] },
        {
          tipo: 'tabela',
          titulo: 'Comparando os dois',
          colunas: ['Aspecto', 'Git Flow', 'Trunk-based'],
          linhas: [
            ['Branches permanentes', 'main e develop', 'main (trunk)'],
            ['Duração das branches', 'Dias ou semanas', 'Horas ou poucos dias'],
            ['Entrega', 'Planejada', 'Contínua'],
            ['Frequência de merge', 'No fim da feature', 'Todos os dias']
          ],
          legenda: 'O trunk-based troca estrutura por integração frequente.'
        },
        { tipo: 'nota', tom: 'sucesso', texto: 'A maioria dos times de produto hoje usa trunk-based ou uma variação enxuta: branches curtas saindo da main e voltando por pull request pequeno.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git10-a3',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Um time pequeno entrega correções várias vezes por dia e mantém uma única linha principal. Um novo integrante sugere adotar o modelo com duas linhas permanentes e branches de preparação de entrega.',
        enunciado: 'Qual é a avaliação mais adequada?',
        opcoes: [
          'O modelo sugerido adiciona cerimônia que não combina com a frequência de entrega do time',
          'A sugestão é sempre melhor, porque tem mais branches',
          'O time atual não tem fluxo de trabalho',
          'Mais branches permanentes deixam a entrega mais rápida'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Mais branches não significam mais qualidade: dependem do contexto do time.',
          2: 'Uma linha principal com pull requests pequenos também é um fluxo.',
          3: 'Camadas extras tendem a atrasar quem entrega várias vezes por dia.'
        },
        dicas: [
          'Compare com o tamanho e o ritmo do time.',
          'Cerimônia demais atrasa quem entrega todo dia.'
        ],
        explicacao: 'O fluxo deve acompanhar o ritmo do time. Para entregas diárias, branches curtas na linha principal costumam ser mais eficientes.',
        conceitos: ['git.fluxo', 'git.branch']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O que o mercado realmente usa',
      blocos: [
        { tipo: 'texto', texto: 'Em entrevistas e no trabalho, você vai encontrar principalmente três arranjos: trunk-based com pull requests pequenos, uma adaptação leve com branches de release e, em projetos mais antigos ou com entrega planejada, o Git Flow completo.' },
        { tipo: 'lista', itens: [
          'Pergunte ao time: qual é a branch de integração? Quem une e como?',
          'Observe a idade das branches: branches antigas indicam fluxo pesado ou trabalho acumulado.',
          'Verifique como as entregas são marcadas: geralmente com tags e releases.',
          'Siga o fluxo do time, mesmo que você prefira outro: consistência vale mais que preferência pessoal.'
        ] },
        { tipo: 'trabalho', texto: 'A primeira semana em um projeto novo costuma ser descobrir o fluxo: qual branch recebe o quê, quem aprova, como se publica. Quem entende o fluxo contribui desde o primeiro dia.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git10-a4',
        tipo: 'true-false',
        dimensao: 'reconhecimento',
        enunciado: 'Marque verdadeiro ou falso sobre fluxos de trabalho.',
        afirmacoes: [
          { texto: 'No trunk-based, as branches costumam durar poucos dias.', correta: true, explicacao: 'Branches curtas reduzem o acúmulo de diferenças.' },
          { texto: 'O Git Flow é obrigatório em todos os projetos profissionais.', correta: false, explicacao: 'Cada time escolhe o fluxo que combina com o seu ritmo.' },
          { texto: 'Na dúvida, o novo integrante deve seguir o fluxo já combinado pelo time.', correta: true, explicacao: 'Consistência do time vale mais que preferência pessoal.' }
        ],
        dicas: [
          'Não existe fluxo universal.',
          'Branches longas acumulam diferenças.'
        ],
        explicacao: 'O fluxo é um acordo de time: o trunk-based encurta branches, o Git Flow estrutura entregas e a escolha depende do contexto.',
        conceitos: ['git.fluxo']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Workflow',
      blocos: [
        { tipo: 'texto', texto: 'A palavra que resume a organização do time:' },
        {
          tipo: 'vocab',
          titulo: 'Palavra nova (1)',
          pares: [
            ['workflow', 'fluxo de trabalho']
          ]
        },
        { tipo: 'ingles', frase: 'A simple workflow is good for the team.', traducao: 'Um fluxo de trabalho simples é bom para a equipe.' },
        { tipo: 'nota', tom: 'info', texto: '**workflow** aparece em toda documentação de projeto: é literalmente a palavra *work* (trabalho) com *flow* (fluxo).' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git10-a5',
        tipo: 'interpret-code',
        dimensao: 'aplicacao',
        enunciado: 'A simple workflow is good for the team.',
        opcoes: [
          'Um fluxo de trabalho simples é bom para a equipe',
          'Um fluxo de trabalho complexo é melhor para o time',
          'A equipe deve evitar fluxos de trabalho',
          'O time precisa de mais branches para trabalhar'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A frase diz o contrário: simple quer dizer simples.',
          2: 'A frase afirma que um fluxo bom para a equipe, não que se deve evitá-lo.',
          3: 'A frase não fala de quantidade de branches.'
        },
        dicas: [
          'simple quer dizer simples; good quer dizer bom.',
          'workflow é o fluxo de trabalho.'
        ],
        explicacao: 'A frase diz que um fluxo de trabalho simples funciona bem para a equipe.',
        conceitos: ['git.fluxo']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git10-a6',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Em uma entrevista, o entrevistador pergunta como o time organiza o trabalho. O projeto entrega toda semana, tem uma linha principal e usa pull requests pequenos com revisão obrigatória.',
        enunciado: 'Qual descrição demonstra que você entendeu o fluxo do time?',
        opcoes: [
          'Um fluxo enxuto: branches curtas saindo da linha principal e voltando por pull request revisado',
          'Um Git Flow completo com duas linhas permanentes e várias branches de preparação',
          'Cada pessoa trabalha direto na linha principal sem revisão',
          'As branches ficam abertas até o fim do mês para juntar tudo de uma vez'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O projeto descrito não usa duas linhas permanentes.',
          2: 'Há revisão obrigatória e trabalho em branches curtas.',
          3: 'Branches de um mês contrariam o ritmo semanal de entrega.'
        },
        dicas: [
          'Releia o cenário: entrega semanal, PR pequeno, revisão.',
          'Descreva exatamente o que o time faz.'
        ],
        explicacao: 'Entender o fluxo é descrevê-lo com precisão: branches curtas, linha principal e revisão por pull request.',
        conceitos: ['git.fluxo', 'git.pr', 'git.merge'],
        desafio: true
      }
    }
  ]
});
