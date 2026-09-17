Plataforma.registrarLicao({
  id: 'redis-00',
  trilha: 'redis',
  tipo: 'licao',
  titulo: 'Por que cache existe (com números)',
  subtitulo: 'Fundamentos · Etapa 1',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Entender por que repetir a consulta ao banco custa caro',
    'Explicar o que é cache e o que ele guarda',
    'Comparar o tempo de resposta com e sem cache',
    'Perceber quando o cache compensa'
  ],
  conceitos: ['redis.cache', 'ingles.vocabulario'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Toda requisição vai até o banco',
      introduz: ['redis.cache'],
      blocos: [
        { tipo: 'retoma', conceito: 'aspnet.api', texto: 'Sua API já responde a vários endereços: `GET /produtos` devolve a lista e `GET /produtos/10` devolve um item. Hoje, cada uma dessas chamadas faz o trabalho completo, do começo ao fim.' },
        { tipo: 'texto', texto: 'Esse trabalho tem um custo. O banco interpreta o SQL, busca as linhas no disco e devolve o resultado — e isso leva **dezenas de milissegundos**. Quando milhares de pessoas pedem a mesma lista, o mesmo esforço se repete milhares de vezes.' },
        { tipo: 'diagrama', arte: 'cliente --> API --> banco de dados\n                  <-- 120 ms\n\nA cada requisicao, o caminho inteiro se repete.', legenda: 'Sem cache, o banco participa de todas as chamadas.' },
        { tipo: 'tabela', titulo: 'Onde o tempo é gasto em um GET /produtos', colunas: ['Etapa', 'Tempo médio'], linhas: [
          ['API recebe e valida a requisição', '1 ms'],
          ['Consulta ao banco de dados', '120 ms'],
          ['Montagem do JSON de resposta', '4 ms'],
          ['Total', '125 ms']
        ], legenda: 'Quase todo o tempo está na consulta ao banco.' },
        { tipo: 'conceito', id: 'redis.cache', titulo: 'Cache', texto: 'Guardar o resultado de uma consulta cara em um lugar rápido, para reutilizar na próxima vez em vez de repetir o trabalho.', exemplo: 'A mesma lista de produtos pronta para a próxima chamada.' },
        { tipo: 'nota', tom: 'info', texto: 'Cache é uma **cópia temporária**: a verdade continua no banco. Ele existe para evitar trabalho repetido, não para substituir o banco.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis00-a1',
        tipo: 'multiple-choice',
        enunciado: 'Na tabela, a consulta ao banco leva 120 ms e a resposta completa leva 125 ms. Qual problema o cache resolve?',
        opcoes: [
          'Evitar repetir a consulta cara a cada requisição parecida',
          'Compactar o JSON para ele ficar menor',
          'Corrigir erros de SQL escritos no banco',
          'Eliminar a necessidade de banco de dados'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Reduzir o tamanho do JSON economiza bytes, mas o tempo continua gasto no banco.',
          2: 'Cache não corrige consulta errada; ele evita repetir a consulta que já funciona.',
          3: 'O cache guarda uma cópia; o banco continua sendo a fonte dos dados.'
        },
        dicas: ['Olhe onde está a maior parte dos 125 ms.', 'A palavra-chave é repetição.'],
        explicacao: 'O cache guarda o resultado da consulta e devolve em poucos milissegundos nas próximas chamadas, poupando o banco.',
        conceitos: ['redis.cache']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Guardar a resposta pronta',
      blocos: [
        { tipo: 'texto', texto: 'Quando a resposta é sempre a mesma para a mesma pergunta, ela pode ficar guardada pronta. A segunda chamada não precisa perguntar de novo ao banco.' },
        { tipo: 'lista', itens: [
          'A lista de produtos da página inicial',
          'Os detalhes do produto 10',
          'A lista de categorias do catálogo'
        ] },
        { tipo: 'tabela', titulo: 'A mesma chamada, dois caminhos', colunas: ['Chamada', 'Caminho', 'Tempo'], linhas: [
          ['1ª (cache vazio)', 'API -> banco -> cache', '125 ms'],
          ['2ª', 'API -> cache', '2 ms'],
          ['3ª', 'API -> cache', '2 ms']
        ], legenda: 'Só a primeira chamada paga o preço inteiro.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Se a cópia envelhecer, o usuário vê dado velho — por isso todo cache sério tem **prazo de validade**. Você vai ver esse assunto em detalhe ainda nesta trilha.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis00-a2',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre cache.',
        afirmacoes: [
          { texto: 'O cache guarda o resultado de uma consulta para reutilizar em chamadas parecidas.', correta: true, explicacao: 'Esse é o trabalho dele: poupar a repetição.' },
          { texto: 'Com cache, o banco deixa de ser a fonte da verdade dos dados.', correta: false, explicacao: 'A fonte continua sendo o banco; o cache é uma cópia temporária.' },
          { texto: 'A primeira chamada, com o cache vazio, ainda paga o custo do banco.', correta: true, explicacao: 'Alguém precisa buscar o dado uma primeira vez para guardá-lo.' }
        ],
        dicas: ['A cópia não substitui a origem.', 'Pense na primeira chamada, quando ainda não há nada guardado.'],
        explicacao: 'O cache acelera as chamadas seguintes, mas não muda quem é a fonte dos dados nem elimina a primeira busca.',
        conceitos: ['redis.cache']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Os números que decidem',
      blocos: [
        { tipo: 'texto', texto: 'Suponha um catálogo com **1.000 acessos por hora**. Sem cache, são 1.000 consultas ao banco, de 120 ms cada.' },
        { tipo: 'tabela', titulo: 'Uma hora de catálogo', colunas: ['Medida', 'Sem cache', 'Com cache (99% de acertos)'], linhas: [
          ['Consultas ao banco por hora', '1.000', '10'],
          ['Tempo somado dentro do banco', '120 s', '1,2 s'],
          ['Resposta típica ao usuário', '125 ms', '2 ms']
        ], legenda: 'O banco passa a atender 100 vezes menos consultas.' },
        { tipo: 'destaque', texto: 'O ganho não é só ficar rápido: é o banco atender 100 vezes menos consultas e sobrar capacidade para o resto do sistema.' },
        { tipo: 'trabalho', texto: 'Em um e-commerce, a página inicial é a mais acessada do site. O time percebeu que o banco ficava no limite nos horários de pico — e que quase todas as chamadas pediam exatamente a mesma lista de produtos. Guardar essa lista em memória na frente do banco derrubou a carga sem mudar uma linha do SQL.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis00-a3',
        tipo: 'predict-output',
        enunciado: 'Usando os números da tabela: em 1.000 acessos por hora, quantas consultas ao banco acontecem se o cache acerta 99% das chamadas?',
        opcoes: [
          '10 consultas',
          '990 consultas',
          '1.000 consultas',
          'Nenhuma consulta'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O cache acerta 99%; o banco atende os 1% restantes, ou seja, 10 chamadas.',
          2: '1.000 é o cenário sem cache nenhum.',
          3: 'A primeira chamada e as expirações continuam indo ao banco.'
        },
        dicas: ['Quanto é 1% de 1.000?', 'O cache resolve 99% das chamadas.'],
        explicacao: '99% de 1.000 acertam no cache; sobram 10 chamadas que chegam ao banco. É a diferença entre 1.000 e 10 consultas por hora.',
        conceitos: ['redis.cache']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis00-a4',
        tipo: 'order-blocks',
        enunciado: 'Ordene as etapas de uma leitura que aproveita o resultado guardado.',
        blocos: [
          'A API recebe a requisição',
          'O código procura o resultado no cache',
          'Se não encontrar, o código consulta o banco',
          'O resultado é guardado no cache para a próxima vez',
          'A resposta é devolvida ao cliente'
        ],
        dicas: ['Primeiro procura na cópia rápida.', 'Guardar só faz sentido depois de buscar na fonte.'],
        explicacao: 'Procurar no cache, buscar no banco quando faltar, guardar o resultado e responder. Esse fluxo vai reaparecer com nome próprio nas próximas lições.',
        conceitos: ['redis.cache']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Quando o cache compensa (e quando não)',
      blocos: [
        { tipo: 'texto', texto: 'Cache não é para todo dado. O bom candidato tem três características:' },
        { tipo: 'lista', itens: [
          'É **lido muitas vezes**: página inicial, catálogo, lista de categorias.',
          '**Muda pouco**: a lista muda de vez em quando, não a cada segundo.',
          '**Custa caro buscar**: consulta pesada, com soma e agrupamento.'
        ] },
        { tipo: 'tabela', titulo: 'Bons e maus candidatos', colunas: ['Bom candidato', 'Mau candidato'], linhas: [
          ['Lista de categorias', 'Saldo do cliente em tempo real'],
          ['Detalhes de um produto', 'Posição da entrega minuto a minuto'],
          ['Resultado de relatório pesado', 'Estoque exato durante uma liquidação']
        ], legenda: 'Dado que muda a cada segundo vira cópia velha rapidamente.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Guardar o que muda o tempo todo só cria cópias velhas — e o usuário vê informação errada. O prazo de validade e a remoção da cópia controlam esse risco.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis00-a5',
        tipo: 'scenario',
        cena: 'Um painel mostra os 10 produtos mais vendidos do dia. O número muda a cada minuto, mas o painel é aberto centenas de vezes por hora pela equipe de loja.',
        enunciado: 'Qual decisão faz mais sentido?',
        opcoes: [
          'Usar cache com prazo curto, aceitando mostrar um número de até um minuto atrás',
          'Guardar o painel no cache para sempre, sem prazo',
          'Nunca usar cache, porque o dado muda',
          'Colocar o cache dentro do banco de dados'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Sem prazo, o painel ficaria congelado no primeiro valor do dia.',
          2: 'Sem cache, centenas de pessoas por hora repetem a mesma consulta cara.',
          3: 'O cache fica ao lado do banco, como cópia rápida — não dentro dele.'
        },
        dicas: ['O dado muda, mas a pergunta se repete.', 'Prazo curto limita o quanto o número pode envelhecer.'],
        explicacao: 'A pergunta se repete centenas de vezes e o dado tolera ficar um minuto desatualizado: cache com prazo curto dá velocidade sem enganar a equipe.',
        conceitos: ['redis.cache'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Cache',
      blocos: [
        { tipo: 'texto', texto: 'A palavra que você vai ouvir todos os dias é a mesma do português: **cache**. Também vale conhecer **fast** (rápido).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['cache', 'cache (reserva temporária)'],
            ['fast', 'rápido / rápida']
          ]
        },
        { tipo: 'ingles', frase: 'The cache is fast.', traducao: 'O cache é rápido.' },
        { tipo: 'nota', tom: 'info', texto: 'Em times de tecnologia, **cache** aparece em expressões como **cache hit** (acerto) e **cache miss** (falta) — você vai aprender as duas mais adiante.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis00-a6',
        tipo: 'multiple-choice',
        enunciado: 'The cache is fast. O que a frase diz?',
        opcoes: [
          'O cache é rápido.',
          'O cache está cheio.',
          'O banco é rápido.',
          'O cache é novo.'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A palavra fast significa rápido.',
          2: 'A frase fala do cache, não do banco.',
          3: 'A frase não fala de novidade.'
        },
        dicas: ['cache é a mesma palavra.', 'fast lembra velocidade.'],
        explicacao: 'The cache is fast = o cache é rápido. Palavras como the e is funcionam como ligação.',
        conceitos: ['redis.cache', 'ingles.vocabulario']
      }
    }
  ]
});
