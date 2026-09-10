Plataforma.registrarLicao({
  id: 'ef-02',
  trilha: 'entity-framework',
  tipo: 'licao',
  titulo: 'Add e SaveChanges: do objeto ao INSERT',
  subtitulo: 'EF Core · Etapa 2',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Entender o ciclo de vida: objeto → Add → SaveChanges → SQL',
    'Reconhecer o SQL INSERT gerado pelo EF',
    'Saber por que o Id aparece só depois do SaveChanges'
  ],
  conceitos: ['ef.savechanges', 'ef.dbcontext', 'ef.entidade', 'sql.comandos-sql'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O objeto não vai para o banco sozinho',
      blocos: [
        { tipo: 'texto', texto: 'Criar um objeto Produto com `new` só ocupa a memória. Nada foi para o banco ainda. O EF precisa saber que aquele objeto deve ser gravado.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'Produto produto = new Produto\n{\n    Nome = "Mouse",\n    Preco = 100.00m,\n    Estoque = 25\n};\n\n// Aqui nada foi para o banco.' },
        { tipo: 'diagrama', arte: 'Memória (aplicação)                 Banco\n\n┌───────────────┐\n│ Produto        │\n│ Nome = "Mouse" │       (nada ainda)\n│ Id = 0         │\n└───────────────┘' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Add: o contexto começa a acompanhar',
      blocos: [
        { tipo: 'texto', texto: 'O `Add` avisa ao contexto: "acompanhe este objeto, ele é novo". A partir daí o objeto fica na memória **na fila de gravação**.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'context.Produtos.Add(produto);' },
        { tipo: 'diagrama', arte: 'DbContext acompanha:\n\nProduto "Mouse"   → estado: Added (novo, aguardando gravação)\n\nBanco continua sem o registro. O Add NÃO grava.' },
        { tipo: 'nota', tom: 'info', texto: '`Added` significa "adicionado": o objeto está na fila do contexto, mas ainda não foi gravado no banco.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Erro comum: chamar `Add` e achar que já salvou. O banco só muda quando você manda salvar — e a próxima tela mostra como.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'SaveChanges: agora sim, o INSERT',
      introduz: ['ef.savechanges'],
      blocos: [
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'await context.SaveChangesAsync();' },
        { tipo: 'conceito', id: 'ef.savechanges', titulo: 'SaveChanges', texto: 'O método que envia ao banco tudo o que o contexto acompanha, gerando o SQL necessário.', exemplo: 'await context.SaveChangesAsync();' },
        { tipo: 'texto', texto: 'O `SaveChangesAsync` percorre tudo que o contexto acompanha, descobre o que precisa ser gravado e **executa o SQL correspondente**.' },
        { tipo: 'nota', tom: 'info', texto: '`SaveChanges` é a versão que espera de forma bloqueante. `SaveChangesAsync` é a versão assíncrona: espera sem travar a aplicação — você estudou isso em C# com `async` e `await`.' },
        { tipo: 'diagrama', arte: 'context.Produtos.Add(produto)\n        │\n        ▼\nawait context.SaveChangesAsync()\n        │\n        ▼  EF gera e executa:\nINSERT INTO Produtos (Nome, Preco, Estoque)\nVALUES (\'Mouse\', 100.00, 25);\n        │\n        ▼\nBanco grava e devolve o Id gerado' },
        { tipo: 'codigo', linguagem: 'sql', codigo: '-- SQL executado pelo EF (aproximadamente)\nINSERT INTO Produtos (Nome, Preco, Estoque)\nVALUES (\'Mouse\', 100.00, 25);' },
        { tipo: 'nota', tom: 'info', texto: 'Leia a forma do comando: `INSERT INTO Produtos (Nome, Preco, Estoque)` = "insira dentro de Produtos, nas colunas Nome, Preco e Estoque"; `VALUES (\'Mouse\', 100.00, 25)` = "os valores". É essa ordem que você vai reconhecer na atividade.' },
        { tipo: 'texto', texto: 'Depois da gravação, o EF atualiza o objeto em memória com o Id que o banco gerou:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'Console.WriteLine(produto.Id); // ex.: 1' },
        { tipo: 'trabalho', texto: 'Entender esse ciclo permite investigar bugs reais: "salvei mas não aparece no banco" quase sempre é SaveChanges esquecido ou falha silenciosa.', fonte: '💼 Em produção' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef02-a1',
        tipo: 'order-blocks',
        dimensao: 'ordenacao',
        enunciado: 'Ordene o ciclo completo de gravação de um produto.',
        blocos: [
          'Produto produto = new Produto { Nome = "Mouse" };',
          'context.Produtos.Add(produto);',
          'await context.SaveChangesAsync();',
          'EF executa INSERT INTO Produtos (...)',
          'Banco devolve o Id e o objeto é atualizado'
        ],
        dicas: ['Criar → avisar o contexto → salvar → SQL → Id.', 'O Add não grava; o SaveChanges é que envia o SQL.'],
        explicacao: 'Esse é o caminho C# → EF → SQL → Banco que você precisa conseguir desenhar de cabeça.',
        conceitos: ['ef.savechanges']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef02-a2',
        tipo: 'predict-output',
        dimensao: 'reconhecimento',
        enunciado: 'O que o banco contém depois de executar apenas este código?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'Produto produto = new Produto { Nome = "Teclado", Preco = 200.00m };\ncontext.Produtos.Add(produto);\nConsole.WriteLine(produto.Id);' }
        ],
        opcoes: [
          'Nada foi gravado e o Id ainda é 0, porque falta o SaveChanges',
          'O produto foi gravado com Id 1',
          'O produto foi gravado, mas sem Id',
          'O Add lança exceção sem SaveChanges'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O Add só marca o objeto como novo; nada foi enviado ao banco.',
          2: 'O banco gera o Id durante a gravação; sem gravação, não há Id.',
          3: 'O Add é uma operação em memória e não lança exceção.'
        },
        dicas: ['Procure a chamada que envia o SQL.', 'Só o SaveChanges toca o banco.'],
        explicacao: 'Sem SaveChanges, o banco permanece intacto e o Id continua 0. O contexto está apenas acompanhando o objeto.',
        conceitos: ['ef.savechanges', 'ef.dbset']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef02-a3',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete para gravar o produto no banco.',
        codigo: 'context.Produtos.{{1}}(produto);\nawait context.{{2}}();',
        lacunas: [['add', 'Add'], ['savechangesasync', 'SaveChangesAsync']],
        dicas: ['O método que adiciona ao acompanhamento.', 'O método assíncrono que envia o SQL ao banco.'],
        explicacao: '`Add` + `SaveChangesAsync` é o par que grava um novo registro e devolve o Id gerado.',
        conceitos: ['ef.savechanges']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef02-a4',
        tipo: 'write-code',
        dimensao: 'construcao',
        enunciado: 'Escreva o código que adiciona um novo produto e salva no banco de forma assíncrona. O objeto `produto` já existe.',
        esqueleto: '// adicione e salve',
        validar: function (valor) {
          const t = P.dom.normalizarCodigo(valor).replace(/ /g, '');
          return t.indexOf('context.produtos.add(produto)') !== -1 && t.indexOf('savechangesasync()') !== -1 && t.indexOf('await') !== -1;
        },
        respostasAceitas: ['context.Produtos.Add(produto); await context.SaveChangesAsync();'],
        dicas: ['Use a gaveta `context.Produtos`.', 'O método de salvar é assíncrono: use await.'],
        explicacao: 'Essas duas linhas, acompanhadas do `await`, aparecem em todo service que insere dados.',
        conceitos: ['ef.savechanges', 'csharp.async']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef02-a5',
        tipo: 'code-review',
        dimensao: 'aplicacao',
        enunciado: 'O ticket diz que o cadastro "dá sucesso" mas o produto não aparece na listagem. Encontre a causa na revisão.',
        ticket: { numero: '#5501', titulo: 'Produto não aparece após cadastro', corpo: 'A tela informa sucesso, porém o produto não está na listagem. Reiniciar a aplicação não resolve.' },
        autor: 'colega de time',
        diff: [
          ' public async Task<Produto> CriarAsync(Produto produto)',
          ' {',
          '     context.Produtos.Add(produto);',
          '-',
          '+    return produto;',
          ' }'
        ],
        opcoes: [
          'Falta `await context.SaveChangesAsync()` antes de retornar; o Add não grava no banco',
          'Falta usar `new Produto()`',
          'O retorno deveria ser void',
          'O método deveria ser público'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O produto já chegou criado por parâmetro; criar de novo seria erro.',
          2: 'Métodos de criação normalmente devolvem o objeto criado para montar a resposta de criação.',
          3: 'O método já é público.'
        },
        dicas: ['Em que momento o SQL INSERT seria executado?', 'Qual chamada está ausente no método?'],
        explicacao: 'Esse é um bug clássico: `Add` marca, mas sem `SaveChanges` nada vai ao banco. "Deu sucesso" porque nada falhou — simplesmente nada aconteceu.',
        conceitos: ['ef.savechanges'],
        desafio: true
      }
    }
  ]
});
