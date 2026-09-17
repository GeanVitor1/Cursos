Plataforma.registrarLicao({
  id: 'redis-05',
  trilha: 'redis',
  tipo: 'licao',
  titulo: 'Invalidação: o problema difícil',
  subtitulo: 'Na prática · Etapa 7',
  duracaoMin: 50,
  xp: 30,
  objetivos: [
    'Explicar por que invalidar cache é difícil',
    'Remover a chave do cache depois de alterar o dado',
    'Comparar remover e atualizar a cópia guardada',
    'Combinar TTL e remoção como defesas'
  ],
  conceitos: ['redis.cache', 'redis.ttl', 'redis.cache-aside', 'redis.invalidacao', 'ingles.vocabulario'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O dado mudou, a cópia não',
      introduz: ['redis.invalidacao'],
      blocos: [
        { tipo: 'retoma', conceito: 'redis.cache-aside', texto: 'Você já sabe gravar, ler e serializar valores no cache. Falta o caso em que o dado muda **depois** de já estar guardado.' },
        { tipo: 'texto', texto: 'Quando alguém altera o preço no banco, a cópia guardada não é avisada. A próxima leitura acerta o cache e mostra o valor antigo — sem nenhum erro aparente.' },
        { tipo: 'diagrama', arte: 'banco:  Preco = 120\ncache:  Preco = 100   <-- o usuario ve isto', legenda: 'O cache continua servindo a foto antiga.' },
        { tipo: 'conceito', id: 'redis.invalidacao', titulo: 'Invalidação de cache', texto: 'Remover ou atualizar a cópia guardada quando o dado muda na fonte, para não servir informação velha.', exemplo: 'RemoveAsync("produto:10") depois do Update.' },
        { tipo: 'nota', tom: 'atencao', texto: 'O TTL limita o tempo do dado velho, mas durante o prazo ele continua aparecendo. TTL não substitui a invalidação.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis05-a1',
        tipo: 'scenario',
        enunciado: 'Qual é a melhor correção para a vitrine que mostra o preço antigo?',
        cena: 'O gerente mudou o preço do produto 10 de 100 para 120 no painel. A vitrine continua mostrando 100 porque a chave guardada não foi alterada. O prazo do cache é de 30 minutos.',
        opcoes: [
          'Remover a chave do cache logo depois de gravar a alteração no banco',
          'Baixar o prazo para 29 minutos',
          'Desligar o cache de preço para sempre',
          'Pedir para o gerente aguardar o prazo terminar'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Mexer no prazo só encurta o erro; ele continua acontecendo.',
          2: 'Sem cache, o banco volta a receber todas as leituras — o problema de carga volta.',
          3: 'O dado já mudou; esperar o prazo é aceitar 30 minutos de informação errada.'
        },
        dicas: ['O dado mudou na fonte; a cópia precisa sair.', 'Pense na próxima leitura depois da alteração.'],
        explicacao: 'Toda alteração no banco precisa vir acompanhada da remoção da cópia. A próxima leitura encontra a falta e recarrega o valor novo.',
        conceitos: ['redis.invalidacao', 'redis.cache-aside']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Remover depois de gravar',
      blocos: [
        { tipo: 'passos', itens: [
          'Altere o dado no banco.',
          'Confirme a gravação com SaveChanges.',
          'Remova a chave do cache.',
          'A próxima leitura encontra a falta e recarrega o valor novo.'
        ] },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'produto.Preco = 120;\nawait context.SaveChangesAsync();\nawait cache.RemoveAsync("produto:10");' },
        { tipo: 'glossario', titulo: 'O passo novo', itens: [
          ['RemoveAsync', 'remover do cache', 'Apaga a chave do cache depois da gravação no banco.']
        ] },
        { tipo: 'nota', tom: 'info', texto: 'Remover é mais seguro que atualizar a cópia: a próxima leitura traz o valor exato do banco, sem risco de gravar um valor calculado fora de ordem.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis05-a2',
        tipo: 'order-blocks',
        enunciado: 'Ordene a sequência que evita servir preço velho.',
        blocos: [
          'Alterar o preço no objeto',
          'Salvar a alteração no banco',
          'Remover a chave do cache',
          'A próxima leitura recarrega o valor novo'
        ],
        dicas: ['A cópia só pode ser removida depois que a fonte está atualizada.', 'A releitura vem por último.'],
        explicacao: 'Gravar no banco primeiro e remover do cache em seguida. Se a remoção viesse antes, uma leitura no meio do caminho gravaria o valor antigo de volta.',
        conceitos: ['redis.invalidacao', 'redis.cache-aside']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis05-a3',
        tipo: 'find-error',
        enunciado: 'O código abaixo esqueceu um passo importante. Qual?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'produto.Preco = 120;\nawait context.SaveChangesAsync();\nreturn Results.Ok(produto);' }
        ],
        opcoes: [
          'Remover a chave do cache depois de salvar',
          'Serializar o produto antes de salvar',
          'Chamar SaveChanges duas vezes',
          'Trocar Ok por Created'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O EF serializa internamente; isso não é um passo manual.',
          2: 'Uma chamada de SaveChanges já grava a alteração.',
          3: 'O status da resposta não tem relação com o cache.'
        },
        dicas: ['O banco foi atualizado; e a cópia guardada?', 'A vitrine lê do cache, não do objeto devolvido na resposta.'],
        explicacao: 'Sem remover a chave, a próxima leitura acerta o cache e continua mostrando o preço antigo. O passo esquecido é a invalidação.',
        conceitos: ['redis.invalidacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis05-a4',
        tipo: 'fill-code',
        enunciado: 'Complete o passo que limpa a cópia depois da gravação.',
        codigo: 'produto.Preco = 120;\nawait context.SaveChangesAsync();\nawait cache.{{1}}("produto:10");',
        lacunas: [['removeasync']],
        dicas: ['O método começa com Remove.', 'O nome apareceu no glossário acima.'],
        explicacao: '`RemoveAsync` apaga a chave; a próxima leitura encontra a falta e recarrega o valor novo do banco.',
        conceitos: ['redis.invalidacao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'As armas contra o dado velho',
      blocos: [
        { tipo: 'texto', texto: 'Invalidar não é um comando único: é uma combinação de estratégias.' },
        { tipo: 'tabela', titulo: 'Estratégias e custos', colunas: ['Estratégia', 'Quando ajuda', 'Custo'], linhas: [
          ['TTL curto', 'dado volátil com atraso tolerável', 'mais idas ao banco'],
          ['Remover ao gravar', 'dado que muda com frequência', 'lembrar em todo ponto de escrita'],
          ['As duas juntas', 'dado importante e volátil', 'mais código, menos sustos']
        ], legenda: 'A remoção protege o agora; o TTL é a rede de segurança.' },
        { tipo: 'lista', itens: [
          'Pontos de escrita que costumam esquecer o cache: service de produtos, painel administrativo, rotina noturna de recálculo e outros sistemas gravando direto no banco.'
        ] },
        { tipo: 'trabalho', texto: 'O preço de um produto mudou no painel e a vitrine ficou 30 minutos com o valor antigo. O time adicionou a remoção da chave no service de escrita e só depois lembrou de uma rotina noturna que alterava preços por outro caminho. O TTL curto salvou o que a remoção esquecia.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis05-a5',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada estratégia à proteção que ela oferece.',
        pares: [
          ['TTL curto', 'limita o tempo máximo de dado velho'],
          ['Remover ao gravar', 'elimina a cópia no instante da mudança'],
          ['TTL e remoção juntos', 'cobrem o que a remoção esquecer'],
          ['Nenhuma das duas', 'permite dado velho para sempre']
        ],
        dicas: ['TTL é rede de segurança.', 'Remover resolve o caso conhecido e imediato.'],
        explicacao: 'Remover cobre a mudança conhecida; o TTL cobre os caminhos de escrita que ninguém lembrou de tratar. Juntas, cobrem os dois riscos.',
        conceitos: ['redis.invalidacao', 'redis.ttl']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis05-a6',
        tipo: 'multiple-choice',
        enunciado: 'Por que remover a chave é considerado mais seguro do que gravar o valor novo no cache?',
        opcoes: [
          'Porque duas gravações concorrentes podem deixar um valor fora de ordem, enquanto remover força a releitura do banco',
          'Porque o Redis proíbe atualizar uma chave existente',
          'Porque o valor novo ocupa mais memória',
          'Porque remover é sempre mais rápido que gravar'
        ],
        correta: 0,
        feedbackErro: {
          1: 'SET em chave existente é permitido; o problema é a ordem das operações.',
          2: 'O tamanho do valor não é o critério.',
          3: 'A diferença de tempo entre remover e gravar é irrelevante perto do risco de dado errado.'
        },
        dicas: ['Pense em duas pessoas alterando o mesmo produto quase ao mesmo tempo.', 'A releitura do banco traz o estado mais recente.'],
        explicacao: 'Remover evita decidir qual gravação venceu: a próxima leitura busca o estado atual no banco e grava a partir dele. É menos código e menos risco.',
        conceitos: ['redis.invalidacao'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Stale',
      blocos: [
        { tipo: 'texto', texto: 'A palavra que dá nome a este problema: **stale** (desatualizado, velho).' },
        {
          tipo: 'vocab',
          titulo: 'Palavra nova (1)',
          pares: [
            ['stale', 'desatualizado / velho']
          ]
        },
        { tipo: 'ingles', frase: 'Remove the stale value from the cache.', traducao: 'Remova o valor desatualizado do cache.' },
        { tipo: 'nota', tom: 'info', texto: '**stale** aparece junto de cache o tempo todo: **stale cache** é a cópia que já não corresponde ao banco.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis05-a7',
        tipo: 'multiple-choice',
        enunciado: 'Remove the stale value from the cache. O que a frase pede?',
        opcoes: [
          'Remover o valor desatualizado do cache.',
          'Guardar o valor novo no cache.',
          'Ler o valor atual do banco.',
          'Comparar dois valores no cache.'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A frase pede remoção, não gravação.',
          2: 'Ler do banco seria outra ação; a frase fala de remover do cache.',
          3: 'Não há comparação na frase.'
        },
        dicas: ['stale é o valor velho.', 'remove é remover.'],
        explicacao: 'A frase pede remover o valor desatualizado do cache. É a invalidação contada em inglês.',
        conceitos: ['redis.invalidacao', 'ingles.vocabulario']
      }
    }
  ]
});
