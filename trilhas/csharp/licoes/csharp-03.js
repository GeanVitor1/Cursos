Plataforma.registrarLicao({
  id: 'csharp-03',
  trilha: 'csharp',
  tipo: 'licao',
  titulo: 'Listas: vários itens na mesma variável',
  subtitulo: 'C# · Etapa 3',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Criar uma List<T> e adicionar itens com Add',
    'Percorrer uma lista com foreach',
    'Entender o básico de generics: List<Produto>'
  ],
  conceitos: ['csharp.list', 'csharp.generics', 'csharp.classes'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O problema: e quando são mil produtos?',
      blocos: [
        { tipo: 'texto', texto: 'Uma variável `Produto` guarda **um** produto. Mas o catálogo tem centenas. Criar `produto1`, `produto2`, `produto3` não escala — e percorrer tudo vira impossível.' },
        { tipo: 'texto', texto: 'Uma **lista** (também chamada de coleção) guarda vários itens em sequência, na mesma variável, mantendo a ordem em que foram adicionados.' },
        { tipo: 'diagrama', arte: 'Lista de produtos\n┌─────────┬─────────────┐\n│ índice  │ objeto      │\n├─────────┼─────────────┤\n│    0    │ Mouse       │\n│    1    │ Teclado     │\n│    2    │ Monitor     │\n└─────────┴─────────────┘' },
        { tipo: 'nota', tom: 'info', texto: 'O índice começa em **0**. É um padrão de programação que aparece em C#, JavaScript e em várias outras linguagens.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Declarando, adicionando e percorrendo',
      introduz: ['csharp.list', 'csharp.generics'],
      blocos: [
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'List<Produto> produtos = new List<Produto>();\n\nprodutos.Add(new Produto { Nome = "Mouse", Preco = 100.00m });\nprodutos.Add(new Produto { Nome = "Teclado", Preco = 200.00m });\n\nConsole.WriteLine(produtos.Count); // 2' },
        { tipo: 'nota', tom: 'info', texto: 'O trecho `new Produto { Nome = "Mouse", Preco = 100.00m }` é um **inicializador de objeto**: cria o objeto e já preenche as propriedades de uma vez.' },
        { tipo: 'texto', texto: 'O `<Produto>` entre `<` e `>` diz que **tipo** de item a lista aceita. Isso é um **generic**: o mesmo `List` funciona para qualquer tipo, mas cada lista fica restrita a um. `List<int>` aceita inteiros; `List<Produto>` aceita produtos; `List<int>` não aceita produto.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'foreach (Produto produto in produtos)\n{\n    Console.WriteLine(produto.Nome);\n}' },
        { tipo: 'nota', tom: 'info', texto: '`foreach (Produto produto in produtos)` lê-se "para cada Produto `produto` na lista `produtos`": o bloco repete uma vez para cada item.' },
        { tipo: 'glossario', titulo: 'Criar e percorrer', itens: [
          ['new Produto { Nome = "Mouse", Preco = 100.00m }', 'inicializador de objeto', 'Cria o objeto e já preenche as propriedades de uma vez.'],
          ['foreach (Produto produto in produtos)', 'para cada item', 'Percorre a lista, repetindo o bloco para cada item.']
        ] },
        { tipo: 'glossario', titulo: 'Métodos e propriedades da List', itens: [
          ['Add(item)', 'adiciona', 'Coloca um item no fim da lista.'],
          ['Count', 'contagem', 'Quantidade de itens na lista.'],
          ['Remove(item)', 'remove', 'Remove um item específico.'],
          ['Clear()', 'esvazia', 'Remove todos os itens.']
        ] },
        { tipo: 'trabalho', texto: 'Listas estão por toda parte no backend: itens de um pedido, produtos retornados de uma consulta, tarefas agendadas. Quando você consultar o banco mais adiante, o resultado será uma lista.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs03-a1',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada recurso da lista ao que ele faz.',
        pares: [
          ['Add', 'Adiciona um item ao final'],
          ['Count', 'Informa quantos itens existem'],
          ['Remove', 'Retira um item específico'],
          ['foreach', 'Percorre todos os itens']
        ],
        dicas: ['Add vem de "adicionar".', 'Count conta; foreach percorre.'],
        explicacao: 'Esse quarteto cobre a maior parte do dia a dia com listas.',
        conceitos: ['csharp.list']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs03-a2',
        tipo: 'predict-output',
        dimensao: 'reconhecimento',
        enunciado: 'O que este código exibe?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'List<string> nomes = new List<string>();\nnomes.Add("Ana");\nnomes.Add("Bruno");\nnomes.Add("Carla");\n\nConsole.WriteLine(nomes.Count);' }
        ],
        opcoes: ['3', '2', 'Ana', '0'],
        correta: 0,
        feedbackErro: {
          1: 'Foram adicionados três nomes, não dois.',
          2: 'Count devolve a quantidade, não o conteúdo.',
          3: 'A lista começou vazia, mas itens foram adicionados.'
        },
        dicas: ['Conte quantas chamadas Add existem.', 'Count nunca mostra o texto dos itens.'],
        explicacao: '`Count` devolve 3, porque três itens foram adicionados.',
        conceitos: ['csharp.list']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs03-a3',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete para criar uma lista de produtos e adicionar um item.',
        codigo: 'List<{{1}}> produtos = new List<Produto>();\nprodutos.{{2}}(new Produto { Nome = "Webcam" });',
        lacunas: [['Produto'], ['Add']],
        dicas: ['O tipo entre < > é o mesmo da variável declarada.', 'O método de adicionar começa com A maiúsculo.'],
        explicacao: 'A lista precisa saber que tipo guarda: `List<Produto>`. E `Add` insere o item.',
        conceitos: ['csharp.list', 'csharp.generics']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs03-a4',
        tipo: 'order-blocks',
        dimensao: 'ordenacao',
        enunciado: 'Ordene os blocos para criar a lista, adicionar dois produtos e mostrar a quantidade.',
        blocos: [
          'List<Produto> produtos = new List<Produto>();',
          'produtos.Add(new Produto { Nome = "Mouse" });',
          'produtos.Add(new Produto { Nome = "Teclado" });',
          'Console.WriteLine(produtos.Count);'
        ],
        dicas: ['Não dá para adicionar em uma lista que ainda não foi criada.', 'A contagem vem depois das inserções.'],
        explicacao: 'Criar → adicionar → usar. Essa sequência é a mesma em qualquer coleção.',
        conceitos: ['csharp.list']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs03-a5',
        tipo: 'write-code',
        dimensao: 'construcao',
        enunciado: 'Escreva uma lista chamada `produtos` do tipo `List<Produto>` e adicione um produto com Nome "Monitor".',
        esqueleto: '// seu código aqui',
        validar: function (valor) {
          const t = P.dom.normalizarCodigo(valor);
          return t.indexOf('list<produto>produtos=newlist<produto>()') !== -1 &&
            t.indexOf('.add(') !== -1 &&
            t.indexOf('monitor') !== -1;
        },
        respostasAceitas: ['List<Produto> produtos = new List<Produto>(); produtos.Add(new Produto { Nome = "Monitor" });'],
        dicas: ['Declare com `List<Produto> produtos = new List<Produto>();`.', 'Adicione com `produtos.Add(...)`.'],
        explicacao: 'Você acabou de reproduzir o padrão que vai aparecer em outras partes do sistema: preparar uma coleção e inserir itens nela.',
        conceitos: ['csharp.list', 'csharp.generics']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs03-a6',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'A aplicação de produtos precisa devolver o catálogo completo na resposta. A aplicação consulta o banco e recebe vários produtos.',
        enunciado: 'Qual estrutura a aplicação deve devolver para representar o catálogo?',
        opcoes: [
          'Uma List<Produto>, porque abriga vários produtos mantendo a ordem',
          'Uma string com todos os nomes separados por vírgula',
          'Várias variáveis produto1, produto2, produto3',
          'Um único objeto Produto com todos os itens dentro'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Texto separado por vírgula funciona para exibir, mas não para trabalhar com os dados (filtrar, contar, ordenar).',
          2: 'Isso não escala e obriga a saber quantos produtos existem em tempo de código.',
          3: 'Um Produto representa um item. Vários itens pedem uma coleção.'
        },
        dicas: ['Você precisa representar "vários" de forma organizada.', 'É a estrutura que você acabou de aprender.'],
        explicacao: 'List<Produto> representa o catálogo e é o formato natural de retorno de consultas. Mais à frente, as consultas ao banco devolvem exatamente isso.',
        conceitos: ['csharp.list', 'csharp.classes'],
        desafio: true
      }
    }
  ]
});
