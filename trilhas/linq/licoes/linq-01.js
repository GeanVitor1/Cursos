Plataforma.registrarLicao({
  id: 'linq-01',
  trilha: 'linq',
  tipo: 'licao',
  titulo: 'Where: filtrando com lambda',
  subtitulo: 'LINQ · Etapa 1',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Ler Where passo a passo, item por item',
    'Escrever filtros com lambda',
    'Comparar Where do LINQ com WHERE do SQL'
  ],
  conceitos: ['linq.where', 'linq.lambda', 'sql.where'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Where testa cada item',
      blocos: [
        { tipo: 'texto', texto: 'O `Where` percorre a coleção e faz uma pergunta para cada item: **a regra é verdadeira?** Se for, o item permanece; se não, ele é descartado do resultado.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'List<Produto> ativos = produtos\n    .Where(p => p.Ativo)\n    .ToList();' },
        { tipo: 'nota', tom: 'info', texto: 'No SQL você escrevia `WHERE Ativo = 1`. No LINQ, a ideia é a mesma — muda a sintaxe e o fato de a regra ser um trecho de código C#.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq01-viz',
        tipo: 'visualizer',
        dimensao: 'reconhecimento',
        enunciado: 'Execute o filtro passo a passo e observe cada item.',
        variacao: 'filtro',
        codigo: 'produtos.Where(p => p.Ativo)',
        itens: [
          { rotulo: 'Mouse', detalhe: 'Ativo = true', passa: true },
          { rotulo: 'Teclado', detalhe: 'Ativo = true', passa: true },
          { rotulo: 'Monitor', detalhe: 'Ativo = false', passa: false },
          { rotulo: 'Cabo', detalhe: 'Ativo = true', passa: true }
        ],
        resultado: ['Mouse', 'Teclado', 'Cabo'],
        resultadoLegenda: 'A coleção original não é alterada: um novo resultado é produzido.',
        dicas: ['Clique em "Executar passo a passo" e acompanhe cada linha.', 'Repare que o Monitor é removido.'],
        explicacao: 'O Where testa a regra em cada item: true mantém, false remove. O resultado é sempre uma nova coleção.',
        conceitos: ['linq.where', 'linq.lambda']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq01-a1',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete o filtro para manter apenas os produtos com preço maior que 100.',
        codigo: 'List<Produto> resultado = produtos\n    .{{1}}(p => p.Preco {{2}} 100)\n    .ToList();',
        lacunas: [['where', 'Where'], ['>']],
        dicas: ['O método de filtro do LINQ tem o mesmo nome do comando SQL.', 'Mais caro que 100 usa um caractere.'],
        explicacao: '`Where` filtra e `>` compara. A lambda `p => p.Preco > 100` é avaliada para cada produto.',
        conceitos: ['linq.where', 'linq.lambda']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq01-a2',
        tipo: 'predict-output',
        dimensao: 'reconhecimento',
        enunciado: 'O que a consulta devolve?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'var resultado = produtos\n    .Where(p => p.Categoria == "Periféricos")\n    .ToList();' },
          { tipo: 'tabela', titulo: 'Produtos', colunas: ['Nome', 'Categoria'], linhas: [['Mouse', 'Periféricos'], ['Monitor', 'Monitores'], ['Teclado', 'Periféricos'], ['Cabo', 'Acessórios']] }
        ],
        opcoes: ['Mouse e Teclado', 'Monitor', 'Mouse, Teclado e Cabo', 'Nenhum produto'],
        correta: 0,
        feedbackErro: {
          1: 'Apenas um item tem essa categoria? Confira a tabela.',
          2: 'Cabo pertence a Acessórios.',
          3: 'Dois itens são de Periféricos.'
        },
        dicas: ['Filtre mentalmente pela coluna Categoria.', 'Procure "Periféricos" na tabela.'],
        explicacao: 'Mouse e Teclado atendem à condição; Monitor (Monitores) e Cabo (Acessórios) ficam de fora.',
        conceitos: ['linq.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq01-a3',
        tipo: 'write-code',
        dimensao: 'construcao',
        enunciado: 'Escreva uma consulta LINQ que mantenha apenas os produtos com estoque menor que 10 em uma lista chamada `resultado`.',
        esqueleto: 'List<Produto> resultado = produtos\n    // seu código aqui\n    .ToList();',
        validar: function (valor) {
          const t = P.dom.normalizarCodigo(valor).replace(/ /g, '');
          return t.indexOf('.where(') !== -1 && t.indexOf('=>') !== -1 && t.indexOf('estoque<10') !== -1 && t.indexOf('.tolist()') !== -1;
        },
        respostasAceitas: ['List<Produto> resultado = produtos.Where(p => p.Estoque < 10).ToList();'],
        dicas: ['Where + lambda + ToList.', 'Use `p => p.Estoque < 10`.'],
        explicacao: '`produtos.Where(p => p.Estoque < 10).ToList()` — a estrutura que você vai repetir centenas de vezes no trabalho.',
        conceitos: ['linq.where', 'linq.lambda']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq01-a4',
        tipo: 'explain',
        dimensao: 'construcao',
        enunciado: 'Explique com suas palavras.',
        pergunta: 'O que o Where faz, passo a passo, com a lista de produtos?',
        criterios: [
          'Percorre cada item da coleção',
          'Avalia a lambda (regra) para o item',
          'Mantém os itens em que a regra é verdadeira e descarta os demais',
          'Produz um novo resultado, sem alterar a coleção original'
        ],
        palavrasChave: ['percorre', 'cada', 'item', 'regra', 'lambda', 'verdade', 'true', 'false', 'mantém', 'mantem', 'descarta', 'remove', 'novo', 'original'],
        exemplo: 'O Where percorre a lista item por item. Para cada produto, executa a regra (por exemplo p => p.Ativo). Se a regra devolver true, o item entra no resultado; se devolver false, fica de fora. A lista original permanece intacta.',
        dicas: ['Cite o teste feito em cada item.', 'Diga o que acontece com o resultado.'],
        explicacao: 'Explicar o Where por dentro é o que permite prever o resultado de qualquer filtro, inclusive os que o Entity Framework gera em SQL.',
        conceitos: ['linq.where'],
        desafio: true
      }
    }
  ]
});
