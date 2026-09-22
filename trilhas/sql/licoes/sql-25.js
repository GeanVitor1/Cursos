Plataforma.registrarLicao({
  id: 'sql-25',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'UNION e UNION ALL',
  subtitulo: 'Intermediário · Etapa 30',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Empilhar resultados com UNION e UNION ALL',
    'Entender quando duplicados são removidos',
    'Garantir colunas compatíveis nas duas consultas'
  ],
  conceitos: ['sql.union', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Empilhando resultados',
      introduz: ['sql.union'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.join', texto: 'O `JOIN` combina tabelas lado a lado. O `UNION` (união) empilha resultados **um embaixo do outro**.' },
        { tipo: 'texto', texto: 'Duas consultas com as **mesmas colunas** viram uma lista só. O `UNION` remove duplicados; o `UNION ALL` mantém tudo:' },
        { tipo: 'conceito', id: 'sql.union', titulo: 'UNION', texto: 'Empilha os resultados de duas consultas com colunas compatíveis. UNION remove repetidos; UNION ALL mantém.', exemplo: 'SELECT Nome FROM Clientes UNION SELECT Nome FROM Fornecedores;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: "SELECT Nome FROM Clientes\nUNION\nSELECT Nome FROM Produtos;"
        },
        { tipo: 'nota', tom: 'info', texto: 'As colunas precisam combinar em quantidade e tipo. Os nomes que valem são os da primeira consulta.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql25-a1',
        tipo: 'multiple-choice',
        enunciado: 'Qual é a diferença entre UNION e UNION ALL?',
        opcoes: [
          'UNION remove linhas repetidas; UNION ALL mantém todas',
          'UNION ALL ordena; UNION não ordena',
          'UNION junta tabelas; UNION ALL junta colunas',
          'Não há diferença prática'
        ],
        correta: 0,
        dicas: [
          'Pense no que o ALL adiciona.',
          'Um deles deduplica.'
        ],
        explicacao: '`UNION` deduplica (custa processamento); `UNION ALL` só empilha, mais rápido.',
        conceitos: ['sql.union']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Quando usar cada um',
      blocos: [
        { tipo: 'texto', texto: 'Use `UNION ALL` quando souber que não há repetidos — ou quando eles não importam. É mais rápido porque pula a verificação:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: "SELECT Cidade FROM Clientes\nUNION ALL\nSELECT Cidade FROM Pedidos;"
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Colunas incompatíveis quebram a consulta: não dá para empilhar Nome (texto) com Preco (número) na mesma posição.' },
        { tipo: 'trabalho', texto: 'Relatórios que somam "tudo que entrou e tudo que saiu" costumam nascer de um UNION ALL entre duas consultas — uma de entradas, outra de saídas.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql25-a2',
        tipo: 'predict-output',
        enunciado: 'Quantas linhas o resultado tem?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: "SELECT Nome FROM Clientes\nUNION\nSELECT Nome FROM Clientes;" }
        ],
        opcoes: [
          'O número de nomes diferentes',
          'O dobro do número de clientes',
          'Sempre 1 linha',
          'Zero linhas'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O UNION remove os repetidos da segunda consulta.',
          2: 'Cada nome distinto aparece uma vez.',
          3: 'A tabela não está vazia.'
        },
        dicas: [
          'As duas consultas devolvem o mesmo conjunto.',
          'UNION deduplica.'
        ],
        explicacao: 'Empilhar a tabela com ela mesma e deduplicar devolve cada nome uma única vez.',
        conceitos: ['sql.union']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql25-a3',
        tipo: 'find-error',
        enunciado: 'Esta consulta com UNION foi recusada. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Nome FROM Clientes\nUNION\nSELECT Nome, Cidade FROM Clientes;' }
        ],
        opcoes: [
          'As consultas têm quantidades diferentes de colunas',
          'Falta o ALL',
          'UNION não aceita a mesma tabela',
          'Nada — a consulta está correta'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O ALL é opcional e não corrige colunas.',
          2: 'A mesma tabela é permitida.',
          3: 'Uma coluna contra duas: incompatível.'
        },
        dicas: [
          'Compare as listas de colunas.',
          'Empilhar exige o mesmo formato.'
        ],
        explicacao: 'Para empilhar, as duas consultas precisam devolver o mesmo número de colunas compatíveis.',
        conceitos: ['sql.union']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql25-a4',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que lista **todos os nomes** de clientes e produtos, sem remover repetidos.',
        respostasAceitas: [
          'select nome from clientes union all select nome from produtos'
        ],
        dicas: [
          'Sem remover repetidos = ALL.',
          'Empilhe as duas listas.'
        ],
        explicacao: '`UNION ALL` empilha tudo, mais rápido que o `UNION` deduplicado.',
        conceitos: ['sql.union'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Union',
      blocos: [
        { tipo: 'texto', texto: 'Uma palavra nova para empilhar listas: **union** (união).' },
        {
          tipo: 'vocab',
          titulo: 'Palavra nova (1)',
          pares: [
            ['union', 'união']
          ]
        },
        { tipo: 'ingles', frase: 'Union all rows.', traducao: 'Una todas as linhas.' },
        { tipo: 'nota', tom: 'info', texto: '**union all** = "una tudo": a ideia do `UNION ALL`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql25-a5',
        tipo: 'write-code',
        enunciado: 'Union all rows: nomes de clientes e produtos.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select nome from clientes union all select nome from produtos'
        ],
        dicas: [
          'Duas consultas empilhadas.',
          'UNION ALL mantém tudo.'
        ],
        explicacao: 'Empilha as duas listas de nomes sem deduplicar.',
        conceitos: ['sql.union', 'sql.ingles']
      }
    }
  ]
});
