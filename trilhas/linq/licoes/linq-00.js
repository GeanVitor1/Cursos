Plataforma.registrarLicao({
  id: 'linq-00',
  trilha: 'linq',
  tipo: 'licao',
  titulo: 'O que é LINQ e por que ele existe',
  subtitulo: 'LINQ · Etapa 0',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Reconhecer o padrão manual de percorrer e filtrar listas',
    'Entender que LINQ dá nomes a esse padrão',
    'Ler a forma básica de uma consulta LINQ'
  ],
  conceitos: ['linq.intro', 'linq.lambda', 'csharp.list'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Você já escreveu LINQ sem saber',
      introduz: ['linq.intro'],
      blocos: [
        { tipo: 'texto', texto: 'Na trilha de C# você construiu um método que percorre a lista e aplica uma regra:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'public List<Produto> Filtrar(List<Produto> produtos, Func<Produto, bool> regra)\n{\n    List<Produto> resultado = new List<Produto>();\n\n    foreach (Produto produto in produtos)\n    {\n        if (regra(produto))\n            resultado.Add(produto);\n    }\n\n    return resultado;\n}' },
        { tipo: 'texto', texto: 'Esse padrão — percorrer uma coleção, testar cada item e montar um novo resultado — aparece o tempo todo. O **LINQ** (Language Integrated Query — consulta integrada à linguagem) é o recurso do C# que já traz esse padrão pronto, com nomes claros.' },
        { tipo: 'destaque', texto: 'Em vez de laços manuais espalhados pelo código, você escreve consultas na própria linguagem C#.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Where: o filtro ganha um nome',
      introduz: ['linq.where', 'linq.lambda'],
      blocos: [
        { tipo: 'texto', texto: 'Em vez de escrever o `foreach` à mão, o LINQ oferece um método pronto para filtrar: `Where`.' },
        { tipo: 'conceito', id: 'linq.where', titulo: 'Where', texto: 'O método do LINQ que filtra: mantém apenas os itens que satisfazem a regra.', exemplo: 'produtos.Where(p => p.Preco > 100)' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'var ativos = produtos.Where(p => p.Ativo);' },
        { tipo: 'lista', itens: [
          '`Where` filtra (as regras que você já conhece do SQL: WHERE!).',
          'A lambda `p => p.Ativo` é a mesma ideia que você aprendeu em C#.',
          'O resultado ainda é uma consulta; na próxima tela você o transforma em lista.'
        ] },
        { tipo: 'conceito', id: 'linq.lambda', titulo: 'Lambda em consultas', texto: 'A regra curta `item => condição` passada para o Where.', exemplo: 'p => p.Ativo' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'ToList: o resultado vira lista',
      introduz: ['linq.tolist'],
      blocos: [
        { tipo: 'texto', texto: 'A consulta montada com `Where` ainda não é uma lista comum. Para transformá-la em uma `List<Produto>`, use `ToList()`:' },
        { tipo: 'conceito', id: 'linq.tolist', titulo: 'ToList', texto: 'Transforma o resultado de uma consulta em uma lista de verdade.', exemplo: 'produtos.Where(p => p.Ativo).ToList()' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'List<Produto> ativos = produtos.Where(p => p.Ativo).ToList();' },
        { tipo: 'diagrama', arte: 'produtos.Where(p => p.Ativo).ToList()\n   │          │              └─ transforma em lista\n   │          └─ mantém apenas os que passam na regra\n   └─ coleção original (não é alterada)' },
        { tipo: 'trabalho', texto: 'LINQ aparece em praticamente todo código .NET: filtrar produtos, ordenar pedidos, somar valores, projetar relatórios. E é a mesma linguagem usada nas consultas de banco com ferramentas de acesso a banco.', fonte: '💼 Em uma vaga .NET' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq00-a1',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'Qual problema o LINQ resolve?',
        opcoes: [
          'Escrever consultas em C# de forma padronizada, no lugar de laços manuais repetidos',
          'Substituir o banco de dados',
          'Melhorar a aparência do código sem mudar o comportamento',
          'Executar código de outra linguagem dentro do C#'
        ],
        correta: 0,
        feedbackErro: {
          1: 'LINQ não substitui o banco: ele consulta coleções e, com ferramentas de acesso a banco, gera SQL.',
          2: 'A padronização melhora manutenção e reduz erros, não apenas aparência.',
          3: 'LINQ é C# consultando coleções; não executa código de outra linguagem.'
        },
        dicas: ['Pense no método Filtrar que você escreveu à mão.', 'O LINQ dá nome a esse padrão.'],
        explicacao: 'LINQ padroniza consultas sobre coleções e, com ferramentas de acesso a banco, é traduzido para SQL.',
        conceitos: ['linq.intro']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq00-a2',
        tipo: 'interpret-code',
        dimensao: 'reconhecimento',
        enunciado: 'O que esta consulta produz?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'List<Produto> caros = produtos.Where(p => p.Preco > 500).ToList();' }
        ],
        opcoes: [
          'Uma lista com os produtos que custam mais de 500',
          'Uma lista com todos os produtos',
          'A soma dos preços acima de 500',
          'Uma lista com os produtos que custam menos de 500'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O Where descarta os que não passam na regra.',
          2: 'Where filtra; somar seria outra operação de cálculo.',
          3: 'O operador é `>`, não `<`.'
        },
        dicas: ['Where = filtro.', 'Leia a lambda `p => p.Preco > 500`.'],
        explicacao: '`Where` mantém apenas os itens que satisfazem a condição. É o mesmo papel do WHERE no SQL.',
        conceitos: ['linq.intro', 'linq.where', 'linq.lambda']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq00-a3',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada parte da consulta `produtos.Where(p => p.Ativo).ToList()` ao seu papel.',
        pares: [
          ['produtos', 'Coleção original'],
          ['Where', 'Filtra os itens'],
          ['p => p.Ativo', 'Regra aplicada a cada item'],
          ['ToList()', 'Transforma o resultado em uma lista']
        ],
        dicas: ['A coleção vem antes do ponto.', 'ToList transforma o resultado em uma lista.'],
        explicacao: 'Origem → filtro → resultado. Essa leitura vai se repetir em toda consulta LINQ.',
        conceitos: ['linq.intro', 'linq.where', 'linq.tolist']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq00-a4',
        tipo: 'predict-output',
        dimensao: 'reconhecimento',
        enunciado: 'O que a consulta retorna?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'List<Produto> resultado = produtos\n    .Where(p => p.Estoque == 0)\n    .ToList();' },
          { tipo: 'tabela', titulo: 'Produtos', colunas: ['Nome', 'Estoque'], linhas: [['Mouse', 25], ['Teclado', 0], ['Monitor', 4], ['Webcam', 0]] }
        ],
        opcoes: ['Teclado e Webcam', 'Mouse e Monitor', 'Apenas Teclado', 'Todos os produtos'],
        correta: 0,
        feedbackErro: {
          1: 'Mouse (25) e Monitor (4) têm estoque maior que zero.',
          2: 'Webcam também está com estoque 0.',
          3: 'O filtro descarta os que têm estoque.'
        },
        dicas: ['O critério é `Estoque == 0`.', 'Dois produtos têm estoque zero.'],
        explicacao: 'Teclado e Webcam têm estoque 0 e entram no resultado. É o mesmo raciocínio visual que você aplicará em consultas reais.',
        conceitos: ['linq.where']
      }
    }
  ]
});
