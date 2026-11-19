Plataforma.registrarLicao({
  id: 'ciber-fundamentos-01',
  trilha: 'ciber-fundamentos',
  tipo: 'licao',
  titulo: 'Sistemas operacionais, Linux e menor privilégio',
  duracaoMin: 25,
  xp: 30,
  objetivos: [
    'Descrever processo, usuário, grupo e permissão de leitura/escrita/execução',
    'Aplicar o menor privilégio: dar a uma conta de serviço apenas o acesso a uma pasta',
    'Conferir que o acesso necessário funciona e que o proibido continua negado'
  ],
  conceitos: ['ciber-fundamentos.permissoes', 'ciber-fundamentos.linux'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Usuários, grupos e permissões',
      blocos: [
        { tipo: 'conceito', id: 'ciber-fundamentos.permissoes', titulo: 'Permissões de arquivo', texto: 'Todo arquivo tem um dono, um grupo e permissões de leitura (r), escrita (w) e execução (x), definidas separadamente para o dono, o grupo e os demais. Um processo roda com a identidade de um usuário e só consegue o que as permissões dessa identidade permitem.', exemplo: '-rw-r----- usuario equipe relatorio.txt: o dono lê e grava; o grupo "equipe" só lê; os demais não acessam.' },
        { tipo: 'glossario', titulo: 'Termos desta etapa', itens: [
          ['processo', 'programa em execução', 'Uma instância de um programa rodando, com a identidade de um usuário.'],
          ['conta de serviço', 'usuário de um programa', 'Conta usada por uma aplicação, e não por uma pessoa, com poucos poderes.'],
          ['root / administrador', 'conta com poderes totais', 'No Linux, a conta que ignora as permissões; um processo comprometido com essa identidade controla o sistema.']
        ] }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ciber-fundamentos-01-bases',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Associe cada termo ao seu significado.',
        pares: [
          ['Processo', 'Programa em execução, com a identidade de um usuário'],
          ['Permissão w', 'Autoriza gravar ou alterar o arquivo'],
          ['Conta de serviço', 'Usuário criado para um programa, com acesso restrito'],
          ['root', 'Conta administrativa que ignora as permissões comuns']
        ],
        conceitos: ['ciber-fundamentos.permissoes'],
        dicas: ['Pense em quem executa o quê, e com quais poderes.', 'r lê, w grava, x executa.'],
        explicacao: 'O processo age com a identidade de um usuário; as permissões do arquivo e o tipo de conta definem o que ele alcança.'
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Sistemas operacionais, Linux e menor privilégio',
      blocos: [
        { tipo: 'conceito', id: 'ciber-fundamentos.linux', titulo: 'Menor privilégio', texto: 'O sistema operacional controla arquivos, memória e permissões. O princípio do menor privilégio concede a cada processo somente o acesso de que precisa, e nada além. Se esse processo for comprometido, o estrago fica limitado.', exemplo: 'O serviço de upload só grava em /var/uploads; ele não lê /etc nem apaga arquivos de outros serviços.' },
        { tipo: 'texto', texto: '**Por que existe:** se uma aplicação comprometida roda com poderes administrativos, o impacto atinge arquivos e serviços fora da função dela.' },
        { tipo: 'texto', texto: '**Como aplicar:** antes de mudar um acesso, identifique qual processo, usuário, arquivo e operação estão falhando. Conceda só o necessário e confira que o restante continua negado.' },
        { tipo: 'texto', texto: '**Quando evitar:** liberar acesso geral ou elevar todos os privilégios para "resolver o erro" amplia o impacto e esconde a causa.' },
        { tipo: 'trabalho', texto: 'Em uma máquina virtual descartável, crie um arquivo sem dados reais, veja dono e permissões e compare leitura com escrita. Anote o acesso necessário antes de alterá-lo e não mexa em pastas do sistema.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ciber-fundamentos-01-decisao',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'O serviço de envio de arquivos falha com erro de permissão ao gravar em /var/uploads. Ele roda com a conta de serviço dedicada.',
        enunciado: 'Que ajuste você escolhe?',
        opcoes: [
          'Dar escrita à conta "upload" somente na pasta /var/uploads e testar o acesso permitido e um proibido',
          'Executar o serviço inteiro como root, que dispensa qualquer ajuste de permissão',
          'Liberar leitura e escrita para todos os usuários em todo o disco, só durante os testes',
          'Mudar o dono da pasta raiz do sistema para a conta "upload", assim ela sempre consegue gravar'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Rodar como root resolve o erro, mas e concede acesso total ao serviço.',
          2: 'Permissão geral, mesmo temporária, expõe tudo e esconde a causa do erro.',
          3: 'Dar a posse da raiz do sistema a uma conta de serviço amplia muito mais o acesso que o necessário.'
        },
        dicas: ['Qual é a menor área que o serviço realmente precisa alterar?', 'Depois do ajuste, o que mais ele continua sem poder fazer?'],
        explicacao: 'A correção deve mostrar que o serviço funciona na pasta de uploads e continua impedido de escrever fora de sua responsabilidade.',
        conceitos: ['ciber-fundamentos.linux']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Orientar e revisar a IA',
      blocos: [
        { tipo: 'texto', texto: '**Como pedir:** investigue uma permissão negada numa máquina virtual de teste; peça a identidade do processo, o caminho e a operação; sugira a menor mudança e um teste de leitura e escrita; não recomende executar tudo como administrador.' },
        { tipo: 'texto', texto: '**Como validar:** confirme que a solução limita a conta e o diretório corretos, teste um acesso permitido e um proibido e verifique se os logs registram a falha sem expor conteúdo sensível.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ciber-fundamentos-01-revisao',
        tipo: 'explain',
        dimensao: 'construcao',
        enunciado: 'A IA sugeriu o comando para dar permissão de escrita à conta do serviço numa pasta.',
        pergunta: 'Como você testaria se o ajuste respeita o menor privilégio?',
        criterios: [
          'Testar que a conta consegue gravar na pasta necessária.',
          'Testar que a mesma conta não consegue gravar em outra pasta.',
          'Verificar o dono e as permissões depois da mudança.'
        ],
        palavrasChave: [
          ['grav', 'escrev', 'escrita'],
          ['outra pasta', 'fora', 'negad', 'proibid', 'bloquead'],
          ['dono', 'permissões', 'permissão', 'proprietário']
        ],
        minimoChaves: 3,
        exemplo: 'Com a conta do serviço, tentaria criar um arquivo na pasta de uploads e esperaria sucesso. Depois tentaria criar outro em uma pasta diferente, que deve dar erro. Por fim olharia o dono e as permissões para ver que só o necessário foi liberado.',
        explicacao: 'O teste duplo (permitido funciona, proibido falha) mais a conferência de dono e permissões demonstra que o acesso não foi alargado.',
        dicas: ['Faça dois testes opostos com a mesma conta.', 'Depois, confirme o que ficou configurado no arquivo ou na pasta.'],
        conceitos: ['ciber-fundamentos.linux']
      }
    }
  ]
});
