Plataforma.registrarLicao({
  id: 'aspnet-01',
  trilha: 'aspnet',
  tipo: 'licao',
  titulo: 'JSON: o idioma que as APIs falam',
  subtitulo: 'ASP.NET · Etapa 1',
  duracaoMin: 30,
  xp: 30,
  objetivos: [
    'Entender o que é JSON e para que serve',
    'Ler objetos, listas e valores em JSON',
    'Relacionar JSON com a classe C# correspondente'
  ],
  conceitos: ['aspnet.json', 'aspnet.resposta', 'csharp.classes'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Um formato que todo mundo entende',
      introduz: ['aspnet.json'],
      blocos: [
        { tipo: 'texto', texto: 'O frontend é JavaScript, a API é C#, o app é Java. Como eles conversam? Com um formato de texto simples e universal: **JSON** (JavaScript Object Notation — notação de objetos JavaScript).' },
        { tipo: 'conceito', id: 'aspnet.json', titulo: 'JSON', texto: 'Formato de texto para troca de dados, com pares "chave": valor. Textos usam aspas duplas; números e true/false não.', exemplo: '{ "id": 1, "nome": "Mouse" }' },
        { tipo: 'codigo', linguagem: 'json', codigo: '{\n  "id": 1,\n  "nome": "Mouse",\n  "preco": 100.00,\n  "ativo": true\n}' },
        { tipo: 'lista', itens: [
          'Os dados ficam entre `{ }` no formato `"chave": valor`.',
          'Textos usam aspas duplas. Números e `true/false` vão sem aspas.',
          'Listas usam `[ ]`.'
        ] },
        { tipo: 'codigo', linguagem: 'json', codigo: '[\n  { "id": 1, "nome": "Mouse", "preco": 100.00 },\n  { "id": 2, "nome": "Teclado", "preco": 200.00 }\n]' },
        { tipo: 'nota', tom: 'info', texto: 'JSON é um formato de **dados**, não de programação. Ele apenas descreve valores — quem decide o significado é a aplicação.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'api01-a1',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada trecho JSON ao tipo que representa.',
        pares: [
          ['"Mouse"', 'Texto (string)'],
          ['100.00', 'Número decimal'],
          ['true', 'Verdadeiro/falso (bool)'],
          ['[ { ... }, { ... } ]', 'Lista de objetos'],
          ['{ "id": 1 }', 'Objeto com chaves e valores']
        ],
        dicas: ['Aspas indicam texto.', 'Colchetes indicam lista.'],
        explicacao: 'Os tipos do JSON correspondem diretamente aos tipos que você conhece: string, decimal, bool, lista e objeto.',
        conceitos: ['aspnet.json']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'api01-a2',
        tipo: 'interpret-code',
        dimensao: 'reconhecimento',
        enunciado: 'Este é o JSON devolvido por `GET /api/produtos/1`. O que ele representa?',
        contexto: [
          { tipo: 'codigo', linguagem: 'json', codigo: '{\n  "id": 1,\n  "nome": "Mouse",\n  "preco": 100.00,\n  "estoque": 25,\n  "ativo": true\n}' }
        ],
        opcoes: [
          'Um único produto com cinco propriedades',
          'Uma lista de cinco produtos',
          'Cinco valores soltos sem relação',
          'Um erro da API'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Uma lista usaria `[ ]`. Aqui há um objeto entre `{ }`.',
          2: 'As propriedades descrevem o mesmo produto.',
          3: 'Não há campo de erro; é a representação de um produto.'
        },
        dicas: ['Comece e termine com `{ }`: é um objeto.', 'As chaves são as propriedades do produto.'],
        explicacao: 'Um objeto JSON com as propriedades do Produto. A API devolve o recurso consultado nesse formato.',
        conceitos: ['aspnet.json']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'api01-a3',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete o JSON de um cliente com id 7 e nome "Ana".',
        codigo: '{\n  "id": {{1}},\n  "nome": "{{2}}"\n}',
        lacunas: [['7'], ['ana', 'Ana']],
        dicas: ['Números vão sem aspas.', 'Textos vão entre aspas duplas.'],
        explicacao: 'Número sem aspas, texto com aspas duplas. Essa regra evita a maioria dos erros de JSON inválido.',
        conceitos: ['aspnet.json']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'api01-a4',
        tipo: 'multiple-choice',
        dimensao: 'aplicacao',
        enunciado: 'Em uma API ASP.NET, o JSON que aparece na resposta normalmente é produzido a partir de quê?',
        opcoes: [
          'De um objeto C# que o ASP.NET converte automaticamente em JSON',
          'De um arquivo de texto escrito manualmente a cada pedido',
          'Do HTML da página',
          'Do próprio banco de dados, sem passar pelo C#'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Escrever JSON manualmente seria repetitivo e sujeito a erro de sintaxe.',
          2: 'HTML é formato de página; a API devolve dados.',
          3: 'O banco devolve linhas; o C# monta o objeto e a API converte.'
        },
        dicas: ['Você cria classes como Produto justamente para representar esses dados.', 'O ASP.NET converte o objeto para JSON automaticamente.'],
        explicacao: 'O ASP.NET converte (serializa) objetos C# em JSON na resposta e faz o caminho inverso no que chega. Isso conecta tudo o que você aprendeu.',
        conceitos: ['aspnet.json', 'csharp.classes']
      }
    }
  ]
});
