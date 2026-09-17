Plataforma.registrarLicao({
  id: 'redis-02',
  trilha: 'redis',
  tipo: 'licao',
  titulo: 'TTL: tudo expira',
  subtitulo: 'Fundamentos · Etapa 3',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Explicar o que é TTL e por que ele é necessário',
    'Usar EXPIRE e SET com EX',
    'Interpretar as respostas do comando TTL',
    'Escolher um prazo adequado para cada dado'
  ],
  conceitos: ['redis.cache', 'redis.servidor', 'redis.ttl', 'ingles.vocabulario'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Nada vive para sempre',
      introduz: ['redis.ttl'],
      blocos: [
        { tipo: 'retoma', conceito: 'redis.servidor', texto: 'Você já grava e lê valores por chave com `SET` e `GET`. Falta decidir **por quanto tempo** esse valor pode ficar guardado.' },
        { tipo: 'texto', texto: 'A cópia não pode viver para sempre. Se a lista de produtos ficar guardada indefinidamente, o usuário vê preço e estoque velhos. A solução é dar um **prazo de validade** a cada chave: o **TTL** (time to live, tempo de vida).' },
        { tipo: 'conceito', id: 'redis.ttl', titulo: 'TTL', texto: 'O tempo de vida de uma chave. Quando ele termina, a chave some sozinha e a próxima leitura recarrega o dado do banco.', exemplo: 'SET produto:10 "Mouse" EX 60' },
        { tipo: 'diagrama', arte: 'SET ... EX 60\n0 s ........ 60 s  --> chave removida --> proxima leitura vai ao banco', legenda: 'O TTL é um cronômetro que roda dentro do Redis.' },
        { tipo: 'codigo', linguagem: 'bash', codigo: 'SET produto:10 "Mouse" EX 60' },
        { tipo: 'nota', tom: 'atencao', texto: 'Sem prazo, a chave fica para sempre e o cache vira uma cópia velha do banco. Todo cache profissional tem algum limite de tempo.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis02-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que acontece quando o tempo de vida de uma chave termina?',
        opcoes: [
          'A chave é removida e a próxima leitura recarrega o dado do banco',
          'A chave fica guardada, mas marcada como velha',
          'O Redis devolve um erro até alguém apagar a chave',
          'O valor é atualizado sozinho com o dado do banco'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Não existe marca de velho: a chave simplesmente deixa de existir.',
          2: 'O Redis não devolve erro; a chave ausente é tratada como cache vazio.',
          3: 'O Redis não conhece o banco: quem recarrega é a aplicação, na próxima leitura.'
        },
        dicas: ['A chave some sozinha.', 'Quem busca o dado de novo é a aplicação.'],
        explicacao: 'Ao expirar, a chave é removida automaticamente. A próxima leitura não encontra nada e segue o caminho que você já conhece: banco e depois cache.',
        conceitos: ['redis.ttl']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Comandos de expiração',
      blocos: [
        { tipo: 'texto', texto: 'O `EXPIRE` define o prazo de uma chave que já existe. O `TTL` mostra quantos segundos ainda restam.' },
        { tipo: 'codigo', linguagem: 'bash', codigo: 'SET produto:10 "Mouse"\nEXPIRE produto:10 60\nTTL produto:10' },
        { tipo: 'tabela', titulo: 'Respostas do comando TTL', colunas: ['Resposta', 'Significado'], linhas: [
          ['Número de segundos', 'Ainda faltam tantos segundos para expirar'],
          ['-1', 'A chave existe, mas não tem prazo definido'],
          ['-2', 'A chave não existe (ou já expirou)']
        ], legenda: 'A resposta é sempre em segundos.' },
        { tipo: 'glossario', titulo: 'Três comandos para memorizar', itens: [
          ['EXPIRE', 'definir prazo', 'Dá um prazo em segundos para uma chave que já existe.'],
          ['TTL', 'tempo restante', 'Mostra quantos segundos faltam para a chave expirar.'],
          ['EX', 'forma curta', 'Abreviação usada no próprio SET para já criar a chave com prazo.']
        ] },
        { tipo: 'nota', tom: 'info', texto: 'Na forma `SET produto:10 "Mouse" EX 60`, o prazo já nasce junto com o valor — é o jeito mais usado no dia a dia.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis02-a2',
        tipo: 'predict-output',
        enunciado: 'Qual é a resposta do último comando?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'SET produto:10 "Mouse"\nTTL produto:10' }
        ],
        opcoes: [
          '-1, porque a chave existe sem prazo definido',
          '60, porque todo valor dura 60 segundos por padrão',
          '-2, porque a chave ainda não foi lida',
          '0, porque nenhum prazo foi informado'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Não existe prazo padrão: sem EX nem EXPIRE, a chave não expira.',
          2: 'A chave existe, então a resposta não pode ser -2.',
          3: 'O SET não define prazo; por isso a resposta é -1.'
        },
        dicas: ['O SET não definiu prazo.', 'A tabela mostra o significado de cada resposta.'],
        explicacao: 'Sem prazo definido, a chave existe para sempre e o `TTL` responde -1. Se a chave não existisse, a resposta seria -2.',
        conceitos: ['redis.ttl']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis02-a3',
        tipo: 'fill-code',
        enunciado: 'Complete para dar 60 segundos de vida à chave `produto:10`.',
        codigo: 'EXPIRE produto:10 {{1}}',
        lacunas: [['60']],
        dicas: ['O tempo do comando é em segundos.', 'São os mesmos 60 segundos do exemplo com EX.'],
        explicacao: '`EXPIRE produto:10 60` define que a chave será removida depois de 60 segundos.',
        conceitos: ['redis.ttl']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Escolhendo o prazo certo',
      blocos: [
        { tipo: 'texto', texto: 'Não existe um número mágico: o prazo certo depende de **quanto o dado muda** e de **quanto erro o usuário tolera**.' },
        { tipo: 'tabela', titulo: 'Exemplos de prazo', colunas: ['Dado', 'Prazo sugerido', 'Por quê'], linhas: [
          ['Lista de categorias', '1 hora', 'muda raramente'],
          ['Detalhes de produto', '5 minutos', 'preço e estoque mudam'],
          ['Ranking de mais vendidos', '2 minutos', 'muda ao longo do dia']
        ] },
        { tipo: 'destaque', texto: 'Regra prática: quanto mais volátil o dado, menor o prazo.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Prazo curto demais perde o ganho; longo demais serve dado velho. O meio-termo é uma decisão de produto, não de código.' },
        { tipo: 'trabalho', texto: 'Em um plantão, um gerente mudou o preço de um produto e a vitrine continuou mostrando o valor antigo por horas: o prazo do cache era de 24 horas. O time reduziu o prazo para 5 minutos e combinou remover a chave no momento da alteração.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis02-a4',
        tipo: 'scenario',
        cena: 'A lista de categorias do catálogo muda uma ou duas vezes por mês, mas é pedida milhares de vezes por dia.',
        enunciado: 'Qual prazo faz mais sentido para essa lista?',
        opcoes: [
          '1 hora',
          '1 segundo',
          'Nunca expirar',
          '1 minuto com verificação a cada acesso'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Prazo de 1 segundo perde quase todo o ganho: o banco volta a ser chamado o tempo todo.',
          2: 'Sem prazo, uma mudança de categoria pode demorar semanas para aparecer.',
          3: 'Verificar a cada acesso é o mesmo que não confiar no cache; o ganho se perde.'
        },
        dicas: ['Dado estável aceita prazo maior.', 'O dado muda uma ou duas vezes por mês.'],
        explicacao: 'Quanto mais estável o dado, maior pode ser o prazo. Uma hora de validade serve para a lista de categorias sem risco prático.',
        conceitos: ['redis.ttl']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis02-a5',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre TTL.',
        afirmacoes: [
          { texto: 'TTL é o tempo de vida de uma chave; ao terminar, ela é removida sozinha.', correta: true, explicacao: 'É um cronômetro que roda dentro do Redis.' },
          { texto: 'Uma chave sem TTL nunca é removida pelo Redis.', correta: true, explicacao: 'Ela permanece até alguém removê-la — o risco é servir dado velho para sempre.' },
          { texto: 'Prazo muito curto aumenta o número de consultas ao banco.', correta: true, explicacao: 'Se a chave expira o tempo todo, a aplicação volta ao banco com frequência.' }
        ],
        dicas: ['Pense no cronômetro.', 'TTL é um equilíbrio entre dado velho e consulta repetida.'],
        explicacao: 'O TTL protege contra dado velho, mas prazo curto demais devolve trabalho ao banco. O ajuste é sempre um equilíbrio.',
        conceitos: ['redis.ttl']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Expire',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras novas para falar de prazo: **expire** (expirar) e **second** (segundo).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['expire', 'expirar'],
            ['second', 'segundo']
          ]
        },
        { tipo: 'ingles', frase: 'The key expires in sixty seconds.', traducao: 'A chave expira em sessenta segundos.' },
        { tipo: 'nota', tom: 'info', texto: '**in** marca o tempo até acontecer: **in sixty seconds** = em sessenta segundos.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis02-a6',
        tipo: 'multiple-choice',
        enunciado: 'The key expires in sixty seconds. O que a frase diz?',
        opcoes: [
          'A chave expira em sessenta segundos.',
          'A chave foi criada há sessenta segundos.',
          'A chave dura sessenta minutos.',
          'A chave não expira.'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A frase fala do prazo até expirar, não de quando a chave foi criada.',
          2: 'Segundos são seconds; sessenta minutos seria outra palavra.',
          3: 'A frase diz exatamente o contrário: a chave expira.'
        },
        dicas: ['expire lembra expirar; second lembra segundo.', 'in sixty seconds indica o tempo até o fim.'],
        explicacao: 'The key expires in sixty seconds = a chave expira em sessenta segundos. É o TTL contado em inglês.',
        conceitos: ['redis.ttl', 'ingles.vocabulario']
      }
    }
  ]
});
