Plataforma.registrarLicao({
  id: 'redis-04',
  trilha: 'redis',
  tipo: 'licao',
  titulo: 'Serialização de objetos',
  subtitulo: 'Na prática · Etapa 6',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Entender que o Redis guarda texto, não objetos C#',
    'Serializar objetos em JSON antes de gravar',
    'Desserializar o texto na leitura',
    'Reconhecer os cuidados com formatação e versão do objeto'
  ],
  conceitos: ['redis.cache-aside', 'redis.serializacao', 'aspnet.json', 'ingles.vocabulario'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O Redis não conhece o seu objeto',
      introduz: ['redis.serializacao'],
      blocos: [
        { tipo: 'retoma', conceito: 'redis.cache-aside', texto: 'No cache aside, a aplicação guarda o resultado no Redis. Falta combinar **em que formato** esse resultado viaja.' },
        { tipo: 'texto', texto: 'O Redis guarda **texto e bytes**, não objetos C#. Um objeto `Produto` com Id, Nome e Preco precisa ser convertido antes de entrar, e reconstruído na saída. Essa conversão tem nome: **serializar** e **desserializar**.' },
        { tipo: 'conceito', id: 'redis.serializacao', titulo: 'Serialização de objetos', texto: 'Converter o objeto para texto antes de gravar no cache e reconstruir o objeto a partir do texto na leitura.', exemplo: 'JsonSerializer.Serialize(produto)' },
        { tipo: 'tabela', titulo: 'O mesmo dado em dois mundos', colunas: ['No C#', 'No Redis'], linhas: [
          ['Objeto Produto com Id, Nome e Preco', 'Texto com os mesmos campos'],
          ['decimal, DateTime e bool', 'Valores representados em texto'],
          ['Objeto pronto para usar', 'Texto que precisa ser lido de volta']
        ] },
        { tipo: 'nota', tom: 'atencao', texto: 'Guardar o objeto direto sem converter dá erro ou lixo: os métodos de cache trabalham com texto.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis04-a1',
        tipo: 'multiple-choice',
        enunciado: 'Por que um objeto precisa ser serializado antes de ir para o cache?',
        opcoes: [
          'Porque o cache guarda texto e bytes, não objetos C#',
          'Porque o Redis só aceita valores numéricos',
          'Porque o objeto precisa ser compactado para caber na memória',
          'Porque o banco exige o formato JSON'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Texto também é aceito; o problema é que objeto não é texto.',
          2: 'Compactar é outro assunto: a conversão é sobre formato.',
          3: 'O banco não participa desse caminho; quem lê e grava é a aplicação.'
        },
        dicas: ['Pense no que o Redis guarda de verdade.', 'Serializar é converter para um formato que o cache entende.'],
        explicacao: 'Serialização é a conversão do objeto para texto. Sem ela, o cache não tem como gravar o valor.',
        conceitos: ['redis.serializacao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'JSON: o formato que todo mundo lê',
      blocos: [
        { tipo: 'retoma', conceito: 'aspnet.json', texto: 'Sua API já devolve JSON nas respostas. Esse mesmo formato é o mais usado para guardar objetos no cache.' },
        { tipo: 'texto', texto: 'O JSON é legível, simples de depurar e suportado por praticamente todas as linguagens. O texto guardado é uma **foto** do objeto no momento da gravação.' },
        { tipo: 'codigo', linguagem: 'json', codigo: '{\n  "id": 10,\n  "nome": "Mouse",\n  "preco": 99.90\n}' },
        { tipo: 'lista', itens: [
          'Mudar o objeto original **não** altera a cópia guardada.',
          'O JSON ocupa mais bytes que um formato binário, mas é fácil de ler e investigar.',
          'No Redis, o valor é só texto: quem dá significado ao JSON é a aplicação.'
        ] },
        { tipo: 'nota', tom: 'info', texto: 'Nomear as chaves no mesmo padrão da API (`id`, `nome`, `preco`) ajuda a comparar o que está no cache com o que a API devolve.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis04-a2',
        tipo: 'predict-output',
        enunciado: 'O que o GET devolve?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: "SET produto:10 '{\"id\":10,\"nome\":\"Mouse\",\"preco\":99.90}'\nGET produto:10" }
        ],
        opcoes: [
          'O texto JSON completo, exatamente como foi gravado',
          'Um objeto C# pronto para usar',
          'Apenas o campo id',
          'Um erro, porque o valor tem chaves e números misturados'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O Redis não monta objetos: ele devolve o texto que guardou.',
          2: 'A chave toda é devolvida, não um campo isolado.',
          3: 'Texto com chaves e números é um valor válido para o Redis.'
        },
        dicas: ['O Redis guarda texto.', 'Só a aplicação reconstrói o objeto.'],
        explicacao: 'O GET devolve exatamente o texto gravado. Quem transforma esse texto de volta em objeto é o código da aplicação, com a desserialização.',
        conceitos: ['redis.serializacao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Serializar e desserializar na prática',
      blocos: [
        { tipo: 'texto', texto: 'Serializar é transformar o objeto em texto; desserializar é o caminho de volta. O código fica simétrico: grava texto, lê texto.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'var texto = JsonSerializer.Serialize(produto);\nawait cache.SetStringAsync("produto:10", texto);\n\nvar guardado = await cache.GetStringAsync("produto:10");\nvar produtoLido = JsonSerializer.Deserialize<Produto>(guardado);' },
        { tipo: 'glossario', titulo: 'Os dois lados da conversão', itens: [
          ['Serialize', 'serializar', 'Transforma o objeto em texto para gravar.'],
          ['Deserialize', 'desserializar', 'Reconstrói o objeto a partir do texto lido.'],
          ['SetStringAsync / GetStringAsync', 'gravar e ler texto', 'Métodos do cache para valores em formato de texto.']
        ] },
        { tipo: 'nota', tom: 'atencao', texto: 'Se o objeto ganhar um campo novo, o texto antigo continua sem esse campo até o prazo terminar. Prazo curto reduz essa janela de convivência entre versões.' },
        { tipo: 'trabalho', texto: 'Quando o campo Desconto entrou no produto, o time descobriu que metade do cache tinha o JSON antigo. A solução combinada foi simples: desserialização tolerante a campos ausentes e prazo curto enquanto a mudança se espalhava pelo servidor.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis04-a3',
        tipo: 'fill-code',
        enunciado: 'Complete o código que serializa antes de gravar e desserializa depois de ler.',
        codigo: 'var texto = JsonSerializer.{{1}}(produto);\nawait cache.SetStringAsync("produto:10", texto);\n\nvar guardado = await cache.GetStringAsync("produto:10");\nvar produto = JsonSerializer.{{2}}<Produto>(guardado);',
        lacunas: [['serialize'], ['deserialize']],
        dicas: ['A ida é serialize.', 'A volta é deserialize.'],
        explicacao: '`Serialize` monta o texto para gravar; `Deserialize` reconstrói o objeto na leitura. É o vai e volta completo do cache.',
        conceitos: ['redis.serializacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis04-a4',
        tipo: 'order-blocks',
        enunciado: 'Ordene o caminho completo de ida e volta de um objeto no cache.',
        blocos: [
          'Serializar o objeto para JSON',
          'Gravar o texto no Redis',
          'Ler o texto do Redis',
          'Desserializar o texto para o objeto'
        ],
        dicas: ['Primeiro o objeto vira texto.', 'A leitura acontece antes de reconstruir o objeto.'],
        explicacao: 'Serializar, gravar, ler e desserializar: esse é o ciclo de vida de um objeto dentro do cache.',
        conceitos: ['redis.serializacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis04-a5',
        tipo: 'find-error',
        enunciado: 'Por que este trecho não está correto?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'await cache.SetStringAsync("produto:10", produto);' }
        ],
        opcoes: [
          'O método espera texto, mas recebeu o objeto: falta serializar antes',
          'O nome da chave deveria estar sem aspas',
          'SetStringAsync não existe no cache',
          'Falta o return antes do await'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A chave entre aspas está correta; o problema é o segundo argumento.',
          2: 'O método existe e é justamente o par do GetStringAsync.',
          3: 'await está no lugar; o problema é o formato do valor gravado.'
        },
        dicas: ['Compare com o exemplo que usa Serialize.', 'O segundo argumento precisa ser texto.'],
        explicacao: 'O método grava texto, mas recebeu um objeto: use o Serialize antes de gravar.',
        conceitos: ['redis.serializacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis04-a6',
        tipo: 'scenario',
        enunciado: 'O que acontece na leitura enquanto o cache ainda tem o JSON antigo?',
        cena: 'A API grava a lista de produtos no cache como JSON. Uma versão nova do sistema adiciona o campo Desconto ao produto, mas parte do cache ainda guarda o JSON antigo, sem o campo.',
        opcoes: [
          'O campo novo fica ausente até a cópia antiga expirar, a menos que o código trate o valor padrão',
          'O Redis adiciona o campo novo sozinho',
          'A leitura passa a falhar para sempre',
          'O campo antigo é apagado do banco'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O Redis não conhece a nova versão da classe; ele só guarda texto.',
          2: 'A leitura não falha: o desserializador usa o valor padrão do tipo.',
          3: 'O banco não participa: o texto antigo está no cache, não na origem.'
        },
        dicas: ['O texto guardado é uma foto do objeto antigo.', 'O cache não sabe que a classe mudou.'],
        explicacao: 'Enquanto houver JSON antigo, quem lê recebe os campos antigos. Prazo curto e mudanças compatíveis reduzem o problema.',
        conceitos: ['redis.serializacao'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Serialize',
      blocos: [
        { tipo: 'texto', texto: 'Três palavras do ciclo de vida do objeto: **serialize** (serializar), **deserialize** (desserializar) e **save** (salvar).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (3)',
          pares: [
            ['serialize', 'serializar'],
            ['deserialize', 'desserializar'],
            ['save', 'salvar']
          ]
        },
        { tipo: 'ingles', frase: 'Serialize and save the value as JSON.', traducao: 'Serialize e salve o valor como JSON.' },
        { tipo: 'nota', tom: 'info', texto: '**as JSON** = como JSON. **and** junta as duas ações: serializar e salvar.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'redis04-a7',
        tipo: 'multiple-choice',
        enunciado: 'Serialize and save the value as JSON. O que a frase pede?',
        opcoes: [
          'Transformar o valor em JSON e guardar.',
          'Ler o valor em JSON e apagar.',
          'Comparar o valor com JSON.',
          'Traduzir o JSON para português.'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A frase não pede remoção.',
          2: 'São duas ações em sequência, não uma comparação.',
          3: 'JSON não é idioma; é formato de dados.'
        },
        dicas: ['serialize é transformar em formato.', 'save é guardar.'],
        explicacao: 'Serialize and save the value as JSON = serialize e salve o valor como JSON. É o caminho de ida para o cache.',
        conceitos: ['redis.serializacao', 'ingles.vocabulario']
      }
    }
  ]
});
