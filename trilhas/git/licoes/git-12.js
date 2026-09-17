Plataforma.registrarLicao({
  id: 'git-12',
  trilha: 'git',
  tipo: 'licao',
  titulo: 'Tags, releases e versionamento',
  subtitulo: 'Fluxo profissional · Etapa 3',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Marcar pontos importantes da história com git tag',
    'Nomear versões com o padrão MAJOR.MINOR.PATCH',
    'Relacionar tags, releases e entregas do projeto'
  ],
  conceitos: ['git.tags', 'git.repositorio'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Marcos nomeados na história',
      introduz: ['git.tags'],
      blocos: [
        { tipo: 'retoma', conceito: 'git.repositorio', texto: 'Os commits formam uma sequência de pontos na história. Mas quando o projeto entrega uma versão, o time precisa de um marco com nome — não de um identificador difícil de lembrar.' },
        { tipo: 'texto', texto: 'Uma **tag** é um marco nomeado em um ponto da história, como `v1.2.0`. Ela não anda: aponta para sempre para o commit daquela entrega. É esse nome que aparece no release e nas dependências.' },
        {
          tipo: 'diagrama',
          arte: 'main   ●───●───●───●───●───●\n             │           │\n           v1.0.0      v1.1.0\n\nas tags ficam presas ao commit da entrega',
          legenda: 'A tag não é uma branch: ela é uma etiqueta fixa em um ponto da história.'
        },
        { tipo: 'conceito', id: 'git.tags', titulo: 'Tag', texto: 'Marcos nomeados na história, usados para releases e versionamento semântico.', exemplo: 'git tag v1.2.0' },
        { tipo: 'nota', tom: 'info', texto: 'Etiquetar a entrega é o que permite responder rápido: qual versão está no ambiente e exatamente qual código ela contém.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git12-a1',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'Qual é a diferença entre uma tag e uma branch?',
        opcoes: [
          'A tag é um marco fixo; a branch continua recebendo commits',
          'A tag recebe commits novos; a branch fica parada',
          'As duas se movem juntas com os commits',
          'A tag só existe no servidor'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A tag nunca recebe commits: ela marca um ponto.',
          2: 'A branch avança conforme o trabalho; a tag fica presa ao commit marcado.',
          3: 'A tag é criada localmente e enviada como qualquer outra referência.'
        },
        dicas: [
          'Pense na etiqueta de uma entrega.',
          'O que continua crescendo é a linha de trabalho.'
        ],
        explicacao: 'A tag é uma etiqueta fixa em um commit; a branch é uma linha de trabalho que avança com novos commits.',
        conceitos: ['git.tags']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Criando e enviando tags',
      blocos: [
        { tipo: 'texto', texto: 'A forma simples marca o commit atual. A forma anotada guarda autor, data e uma mensagem — é a mais usada para entregas.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'Marcando a entrega',
          codigo: 'git tag v1.0.0\n\ngit tag -a v1.0.0 -m "Primeira versão estável"\n\ngit tag            # lista as tags\ngit push origin v1.0.0   # envia a tag para o servidor'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'O `git push` comum não envia tags. Elas precisam ser enviadas pelo nome, como `git push origin v1.0.0`, ou todas de uma vez.' },
        { tipo: 'trabalho', texto: 'Publicar uma versão é criar a tag no commit certo — geralmente aquele que passou por toda a conferência. Depois, a tag vira o release que o time anuncia.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git12-a2',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete para criar uma tag anotada na versão 1.0.0 e depois enviá-la ao servidor.',
        codigo: 'git {{1}} -a v1.0.0 -m "Primeira versão estável"\n\ngit push origin v1.0.0',
        lacunas: [['tag']],
        dicas: [
          'O comando tem três letras.',
          'Ele marca um ponto fixo na história.'
        ],
        explicacao: '`git tag -a` cria a tag anotada, com mensagem; o push pelo nome envia a tag para o servidor.',
        conceitos: ['git.tags']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git12-a3',
        tipo: 'order-blocks',
        dimensao: 'ordenacao',
        enunciado: 'Ordene os passos de uma entrega, do código conferido até a tag publicada.',
        blocos: ['git switch main', 'git pull origin main', 'git tag -a v1.1.0 -m "Entrega de outubro"', 'git push origin v1.1.0'],
        dicas: [
          'A tag marca um commit que você já tem localmente.',
          'Antes de marcar, garanta que está sobre a versão mais recente.'
        ],
        explicacao: 'Atualizar a linha principal, conferir que está nela, marcar a tag e enviá-la ao servidor: essa é a sequência da entrega.',
        conceitos: ['git.tags', 'git.repositorio']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Versionamento semântico',
      blocos: [
        { tipo: 'texto', texto: 'O padrão mais usado no mercado é o **versionamento semântico**: três números separados por pontos, cada um com um significado claro.' },
        {
          tipo: 'tabela',
          titulo: 'MAJOR.MINOR.PATCH',
          colunas: ['Parte', 'Muda quando...', 'Exemplo'],
          linhas: [
            ['MAJOR', 'Algo incompatível quebra quem já usa', 'v1.4.2 → v2.0.0'],
            ['MINOR', 'Uma funcionalidade nova é adicionada', 'v1.4.2 → v1.5.0'],
            ['PATCH', 'Um defeito é corrigido sem mudar a interface', 'v1.4.2 → v1.4.3']
          ],
          legenda: 'Cada parte comunica o tamanho do impacto para quem depende do projeto.'
        },
        { tipo: 'nota', tom: 'info', texto: 'A primeira versão estável costuma ser `v1.0.0`. Antes dela, o projeto está em desenvolvimento e usa a série `v0.x.y`.' },
        { tipo: 'destaque', texto: 'O número da versão é uma promessa: quem atualiza precisa saber se algo vai quebrar. Escolher a parte certa é comunicação, não burocracia.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git12-a4',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada mudança à parte da versão que ela altera.',
        pares: [
          ['Uma correção de defeito sem mudar contrato', 'PATCH: v1.4.2 para v1.4.3'],
          ['Uma funcionalidade nova compatível', 'MINOR: v1.4.2 para v1.5.0'],
          ['Uma mudança que quebra quem já usa', 'MAJOR: v1.4.2 para v2.0.0'],
          ['Primeira publicação estável do projeto', 'v1.0.0']
        ],
        dicas: [
          'Correção é o número final.',
          'Quebra de compatibilidade é o número do começo.'
        ],
        explicacao: 'PATCH para correções, MINOR para funcionalidades compatíveis, MAJOR para quebras e v1.0.0 para a primeira versão estável.',
        conceitos: ['git.tags']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git12-a5',
        tipo: 'predict-output',
        dimensao: 'aplicacao',
        enunciado: 'A versão atual é v1.4.2. Uma correção de defeito foi publicada. Qual deve ser a próxima tag?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Histórico de versões',
            colunas: ['Versão', 'O que trouxe'],
            linhas: [
              ['v1.3.0', 'Funcionalidade de relatórios'],
              ['v1.4.0', 'Funcionalidade de cupons'],
              ['v1.4.1', 'Correção no total'],
              ['v1.4.2', 'Correção no frete']
            ]
          }
        ],
        opcoes: [
          'v1.4.3, porque é uma correção compatível',
          'v1.5.0, porque houve mudanças no código',
          'v2.0.0, porque toda entrega merece um marco maior',
          'v1.4.2.1, porque a quarta parte indica correção'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O número do meio sobe quando há funcionalidade nova, não correção.',
          2: 'Nada quebrou a compatibilidade: o número principal não muda.',
          3: 'O padrão tem três números; a correção sobe o último.'
        },
        dicas: [
          'Correção compatível mexe no último número.',
          'Releia a tabela: as correções anteriores subiram qual parte?'
        ],
        explicacao: 'Correções sem mudança de contrato sobem o PATCH: de v1.4.2 para v1.4.3.',
        conceitos: ['git.tags']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git12-a6',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'O time vai publicar a versão 2.0.0. O último commit da main ainda não recebeu a tag, e um colega perguntou qual código exatamente está em produção.',
        enunciado: 'Qual é a resposta correta?',
        opcoes: [
          'Ainda não dá para afirmar: é preciso criar a tag no commit da entrega e publicá-la',
          'É o commit mais recente da main, sempre',
          'É o commit com a data mais antiga do mês',
          'Não é possível saber depois de tantos commits'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O commit mais recente pode já ter recebido mudanças depois da entrega.',
          2: 'Datas não identificam a entrega: a tag é o marco.',
          3: 'Com a tag publicada, essa pergunta tem resposta exata.'
        },
        dicas: [
          'O marco precisa ser criado no ponto certo.',
          'A tag responde qual código está naquela versão.'
        ],
        explicacao: 'Com a tag criada e enviada, o time sabe exatamente qual commit corresponde à versão publicada.',
        conceitos: ['git.tags']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Release',
      blocos: [
        { tipo: 'texto', texto: 'Três palavras do mundo das entregas:' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (3)',
          pares: [
            ['tag', 'etiqueta'],
            ['release', 'lançamento / versão publicada'],
            ['version', 'versão']
          ]
        },
        { tipo: 'ingles', frase: 'Add a tag to the release version.', traducao: 'Adicione uma tag à versão do lançamento.' },
        { tipo: 'nota', tom: 'info', texto: 'No GitHub, cada tag pode virar um **release** com notas da versão — o anúncio oficial da entrega.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git12-a7',
        tipo: 'interpret-code',
        dimensao: 'aplicacao',
        enunciado: 'Add a tag to the release version.',
        opcoes: [
          'Adicione uma tag à versão do lançamento',
          'Apague a tag da versão antiga',
          'Envie o lançamento sem tag',
          'Renomeie a branch do lançamento'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A frase pede para adicionar, não para apagar.',
          2: 'A frase fala justamente de marcar a versão com uma tag.',
          3: 'A frase não fala de branches; fala de tag e version.'
        },
        dicas: [
          'add quer dizer adicionar.',
          'tag e release são as palavras-chave da frase.'
        ],
        explicacao: 'A frase pede para marcar a versão publicada com uma tag.',
        conceitos: ['git.tags']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git12-a8',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Um projeto publicado como v2.0.0 precisa receber uma funcionalidade nova compatível e, depois, uma correção urgente de um defeito. Nenhuma das duas mudanças quebra quem já usa o projeto.',
        enunciado: 'Quais devem ser as próximas duas versões?',
        opcoes: [
          'v2.1.0 para a funcionalidade e v2.1.1 para a correção',
          'v3.0.0 para a funcionalidade e v3.0.1 para a correção',
          'v2.0.1 para a funcionalidade e v2.0.2 para a correção',
          'v2.1.0 para as duas, sem diferenciar'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Nada quebrou a compatibilidade, então MAJOR continua em 2.',
          2: 'Funcionalidade nova sobe o número do meio, não apenas o último.',
          3: 'Correção e funcionalidade sobem partes diferentes; marcar igual esconde o impacto.'
        },
        dicas: [
          'Funcionalidade nova sobe o número do meio.',
          'Correção depois sobe o último número.'
        ],
        explicacao: 'Funcionalidade compatível sobe o MINOR (v2.1.0) e a correção seguinte sobe o PATCH (v2.1.1).',
        conceitos: ['git.tags'],
        desafio: true
      }
    }
  ]
});
