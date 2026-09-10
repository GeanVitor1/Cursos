Plataforma.registrarLicao({
  id: 'linq-02',
  trilha: 'linq',
  tipo: 'licao',
  titulo: 'Select: transformando dados',
  subtitulo: 'LINQ · Etapa 2',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Diferenciar Where (linhas) de Select (formato)',
    'Projetar apenas as colunas necessárias',
    'Transformar cada item em um valor simples'
  ],
  conceitos: ['linq.select', 'linq.where', 'sql.colunas'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Where escolhe linhas. Select escolhe o formato',
      introduz: ['linq.select'],
      blocos: [
        { tipo: 'texto', texto: 'Essa dupla confunde muita gente no começo. A diferença é simples:' },
        { tipo: 'tabela', titulo: 'Contraste', colunas: ['Operação', 'Pergunta que responde'], linhas: [
          ['Where', 'Quais itens entram no resultado? (linhas)'],
          ['Select', 'Como cada item aparece no resultado? (formato)']
        ], legenda: 'É o mesmo contraste do SQL: SELECT escolhe colunas, WHERE escolhe linhas.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: '// Apenas os nomes\nList<string> nomes = produtos\n    .Select(p => p.Nome)\n    .ToList();' },
        { tipo: 'diagrama', arte: 'Produto (antes)              string (depois)\n┌────────────────────┐        ┌───────────┐\n│ Id, Nome, Preco... │  ───►  │ "Mouse"   │\n└────────────────────┘        └───────────┘\nSelect transforma cada item em outra coisa.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq02-a1',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada operação ao seu efeito.',
        pares: [
          ['Where', 'Escolhe quais itens permanecem'],
          ['Select', 'Define o formato de cada item'],
          ['Select(p => p.Nome)', 'Transforma cada produto em texto'],
          ['Where(p => p.Ativo)', 'Mantém apenas ativos']
        ],
        dicas: ['Where = filtro de linhas.', 'Select = projeção/formato.'],
        explicacao: 'Entender essa separação evita o erro comum de tentar filtrar com Select ou formatar com Where.',
        conceitos: ['linq.select', 'linq.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq02-a2',
        tipo: 'predict-output',
        dimensao: 'reconhecimento',
        enunciado: 'O que a consulta devolve?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'var nomes = produtos\n    .Where(p => p.Ativo)\n    .Select(p => p.Nome)\n    .ToList();' },
          { tipo: 'tabela', titulo: 'Produtos', colunas: ['Nome', 'Ativo'], linhas: [['Mouse', 'true'], ['Monitor', 'false'], ['Teclado', 'true']] }
        ],
        opcoes: ['Mouse e Teclado', 'Mouse, Monitor e Teclado', 'Apenas Monitor', 'Os três produtos completos'],
        correta: 0,
        feedbackErro: {
          1: 'O Where remove Monitor antes do Select.',
          2: 'Monitor está inativo.',
          3: 'O Select transforma em uma lista de textos, não de produtos.'
        },
        dicas: ['Primeiro roda o Where, depois o Select.', 'O resultado é uma lista de textos.'],
        explicacao: 'Where mantém Mouse e Teclado; Select transforma cada um em seu nome. Ordem importa: filtro antes da projeção.',
        conceitos: ['linq.select', 'linq.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq02-a3',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete para obter apenas os nomes dos produtos.',
        codigo: 'List<string> nomes = produtos\n    .{{1}}(p {{2}} p.Nome)\n    .ToList();',
        lacunas: [['select', 'Select'], ['=>']],
        dicas: ['O método que transforma tem o mesmo nome do comando SQL.', 'A seta da lambda.'],
        explicacao: '`Select(p => p.Nome)` transforma cada produto em seu nome. Uma lista de produtos vira uma lista de textos.',
        conceitos: ['linq.select', 'linq.lambda']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lq02-a4',
        tipo: 'write-code',
        dimensao: 'construcao',
        enunciado: 'Escreva uma consulta que devolva apenas os nomes dos produtos ativos, em uma lista de strings.',
        esqueleto: 'List<string> nomes = produtos\n    // seu código aqui\n    .ToList();',
        validar: function (valor) {
          const t = P.dom.normalizarCodigo(valor).replace(/ /g, '');
          return t.indexOf('.where(') !== -1 && t.indexOf('ativo') !== -1 && t.indexOf('.select(') !== -1 && t.indexOf('.nome') !== -1;
        },
        respostasAceitas: ['produtos.Where(p => p.Ativo).Select(p => p.Nome).ToList()'],
        dicas: ['Filtre com Where e projete com Select.', 'A ordem é filtro primeiro, formato depois.'],
        explicacao: 'Where + Select + ToList: uma das combinações mais frequentes de LINQ, e que vira uma consulta SQL eficiente quando usada com ferramentas de banco.',
        conceitos: ['linq.select', 'linq.where'],
        desafio: true
      }
    }
  ]
});
