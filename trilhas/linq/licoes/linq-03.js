Plataforma.registrarLicao({
  id: 'linq-03',
  trilha: 'linq',
  tipo: 'licao',
  titulo: 'First, FirstOrDefault e Single',
  subtitulo: 'LINQ · Etapa 3',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Buscar um único item com segurança',
    'Diferenciar First, FirstOrDefault e Single',
    'Escolher o método certo para cada situação'
  ],
  conceitos: ['linq.first', 'linq.where', 'csharp.null'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Buscando um produto específico',
      introduz: ['linq.first'],
      blocos: [
        { tipo: 'conceito', id: 'linq.first', titulo: 'Primeiro item', texto: 'Métodos para buscar um único item: First lança erro se não achar; FirstOrDefault devolve null (default = predefinido/ausente); Single exige exatamente um (single = único).', exemplo: 'produtos.FirstOrDefault(p => p.Id == 10)' },
        { tipo: 'texto', texto: 'Muitas operações querem **um** item: o produto de Id 10, o cliente com aquele e-mail. Além do filtro, é preciso dizer o que fazer quando nada é encontrado — e essa escolha muda o comportamento da aplicação.' },
        { tipo: 'tabela', titulo: 'Os métodos e o que fazem quando não encontram', colunas: ['Método', 'Não encontrou', 'Mais de um'], linhas: [
          ['First', 'lança exceção', 'pega o primeiro'],
          ['FirstOrDefault', 'devolve null', 'pega o primeiro'],
          ['Single', 'lança exceção', 'lança exceção'],
          ['SingleOrDefault', 'devolve null', 'lança exceção']
        ], legenda: 'Regra de ouro: buscas por Id usam FirstOrDefault; quando o dado é único por contrato, Single.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'Produto? produto = produtos\n    .FirstOrDefault(p => p.Id == 10);\n\nif (produto == null)\n{\n    return null;\n}' },
        { tipo: 'nota', tom: 'atencao', texto: 'O `Produto?` (com interrogação) avisa que a variável pode ser null — exatamente o conceito da etapa de C# sobre null.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq03-a1',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada método ao seu comportamento quando nada é encontrado.',
        pares: [
          ['First', 'Lança exceção'],
          ['FirstOrDefault', 'Devolve null'],
          ['Single', 'Lança exceção e recusa mais de um resultado'],
          ['SingleOrDefault', 'Devolve null e recusa mais de um resultado']
        ],
        dicas: ['"OrDefault" (default = predefinido/ausente) indica uma alternativa ao erro.', 'Single exige exatamente um item.'],
        explicacao: 'Esse quadro aparece em entrevistas e em revisões de código. Escolher o método errado derruba a aplicação em produção.',
        conceitos: ['linq.first']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq03-a2',
        tipo: 'predict-output',
        dimensao: 'reconhecimento',
        enunciado: 'A lista não possui nenhum produto com Id 99. O que acontece com este código?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'Produto produto = produtos\n    .First(p => p.Id == 99);\n\nConsole.WriteLine(produto.Nome);' }
        ],
        opcoes: [
          'O First lança uma exceção porque nenhum item satisfaz o filtro',
          'O código escreve null',
          'O código escreve uma linha vazia',
          'O código pega o primeiro produto da lista'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Escrever null seria o comportamento de FirstOrDefault, não de First.',
          2: 'Sem produto, não há Nome para escrever.',
          3: 'First sem condição pegaria o primeiro; com condição, exige que algum item passe.'
        },
        dicas: ['First não tem "OrDefault" no nome.', 'Se ninguém passa no filtro, o que sobra?'],
        explicacao: 'First lança um erro (uma exceção) quando a sequência está vazia. Em uma aplicação, isso vira um erro não tratado (uma exceção).',
        conceitos: ['linq.first']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq03-a3',
        tipo: 'find-error',
        dimensao: 'reconhecimento',
        enunciado: 'A aplicação começou a retornar um erro não tratado quando alguém consulta um Id que não existe. Qual é a correção adequada?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'Produto produto = produtos.First(p => p.Id == id);\nreturn produto;' }
        ],
        opcoes: [
          'Usar FirstOrDefault e tratar o null antes de responder (ex.: responder que não encontrou)',
          'Trocar para Single',
          'Envolver tudo em try/catch vazio',
          'Remover o filtro para nunca ficar vazio'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Single lança exceção nos dois casos: vazio e duplicado. Pioraria.',
          2: 'Catch vazio esconde o problema e o usuário continua sem resposta correta.',
          3: 'Sem filtro, a busca retorna o produto errado.'
        },
        dicas: ['A busca pode não encontrar nada — isso é normal.', 'Existe um método que devolve null em vez de explodir.'],
        explicacao: '`FirstOrDefault` devolve null; o código verifica e responde de forma clara que não encontrou. Tratar ausência faz parte da regra, não é exceção.',
        conceitos: ['linq.first', 'csharp.null'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq03-a4',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete a busca por Id que devolve null quando não encontrado.',
        codigo: 'Cliente? cliente = clientes\n    .First{{1}}(c => c.Id == id);',
        lacunas: [['OrDefault', 'ordefault']],
        dicas: ['O sufixo que evita a exceção.', 'Começa com maiúscula, no meio do método.'],
        explicacao: '`FirstOrDefault` é a escolha segura para buscas por Id. Depois, verifique o null.',
        conceitos: ['linq.first']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq03-a5',
        tipo: 'explain',
        dimensao: 'construcao',
        enunciado: 'Explique com suas palavras.',
        pergunta: 'Por que uma aplicação prefere FirstOrDefault em vez de First para buscar um produto por Id?',
        criterios: [
          'First lança exceção quando não encontra',
          'FirstOrDefault devolve null',
          'Com o null, a aplicação trata o caso e responde algo claro (ex.: mensagem de não encontrado)'
        ],
        palavrasChave: ['exce', 'lança', 'lanca', 'erro', 'null', 'trat', 'verific', 'encontra', 'vazio'],
        exemplo: 'Porque First lança exceção quando o Id não existe, o que viraria um erro não tratado. Com FirstOrDefault o resultado é null, e a aplicação verifica esse null e responde de forma clara que não encontrou, que é o comportamento correto.',
        dicas: ['Compare o que cada método faz quando não encontra.', 'Pense na resposta que o cliente da aplicação recebe.'],
        explicacao: 'Escolher entre First e FirstOrDefault é uma decisão de tratamento de ausência — e isso é regra de negócio.',
        conceitos: ['linq.first'],
        desafio: true
      }
    }
  ]
});
