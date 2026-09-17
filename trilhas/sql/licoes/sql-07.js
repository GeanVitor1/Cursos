Plataforma.registrarLicao({
  id: 'sql-07',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Removendo duplicados com DISTINCT',
  subtitulo: 'Iniciante · Etapa 2',
  duracaoMin: 30,
  xp: 30,
  objetivos: [
    'Remover linhas repetidas do resultado com DISTINCT',
    'Entender que o DISTINCT vale para a combinação de colunas',
    'Combinar DISTINCT com WHERE'
  ],
  conceitos: ['sql.distinct', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'A mesma resposta várias vezes',
      introduz: ['sql.distinct'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.colunas', texto: 'Você escolhe as colunas do resultado. Quando escolhe só uma, como Cidade, o mesmo valor pode aparecer muitas vezes.' },
        { tipo: 'texto', texto: 'Para mostrar cada valor **uma única vez**, use `DISTINCT` (distinto) logo depois do `SELECT`:' },
        { tipo: 'conceito', id: 'sql.distinct', titulo: 'DISTINCT', texto: 'Remove linhas repetidas do resultado, mostrando cada combinação de valores uma única vez.', exemplo: 'SELECT DISTINCT Cidade FROM Clientes;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT DISTINCT Cidade\nFROM Clientes;'
        },
        {
          tipo: 'tabela',
          titulo: 'Resultado',
          colunas: ['Cidade'],
          linhas: [['Curitiba'], ['Recife']],
          legenda: 'Curitiba aparece em três clientes, mas só uma vez no resultado.'
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql07-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que o `DISTINCT` faz no resultado de uma consulta?',
        opcoes: [
          'Remove as linhas repetidas',
          'Ordena as linhas',
          'Filtra as linhas por uma condição',
          'Conta quantas linhas existem'
        ],
        correta: 0,
        dicas: [
          'Ele não ordena nem filtra.',
          'Distinct = distinto, diferente.'
        ],
        explicacao: '`DISTINCT` elimina repetições do resultado. Ordenar é `ORDER BY`; filtrar é `WHERE`.',
        conceitos: ['sql.distinct']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Vale para a combinação de colunas',
      blocos: [
        { tipo: 'texto', texto: 'Com duas colunas, o `DISTINCT` compara o **par** de valores. Duas cidades iguais com status diferentes continuam sendo pares diferentes:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT DISTINCT Cidade, Ativo\nFROM Clientes;'
        },
        {
          tipo: 'tabela',
          titulo: 'Resultado',
          colunas: ['Cidade', 'Ativo'],
          linhas: [
            ['Curitiba', 1],
            ['Curitiba', 0],
            ['Recife', 1]
          ],
          legenda: 'Curitiba aparece duas vezes: uma com Ativo = 1 e outra com Ativo = 0.'
        },
        { tipo: 'nota', tom: 'info', texto: 'Pense no `DISTINCT` como uma lista sem repetições: ele olha para a linha inteira do resultado, não para uma coluna isolada.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql07-a2',
        tipo: 'predict-output',
        enunciado: 'Quantas linhas esta consulta retorna?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Pedidos',
            colunas: ['Id', 'Status'],
            linhas: [
              [101, 'Pago'],
              [102, 'Pago'],
              [103, 'Pendente'],
              [104, 'Pago']
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT DISTINCT Status\nFROM Pedidos;' }
        ],
        opcoes: [
          '2 linhas: Pago e Pendente',
          '4 linhas: uma para cada pedido',
          '1 linha: apenas Pago',
          '3 linhas: Pago, Pago e Pendente'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O DISTINCT remove as repetições: os três pedidos Pago viram uma única linha.',
          2: 'Pendente também aparece no resultado.',
          3: 'Valores iguais não se repetem no resultado.'
        },
        dicas: [
          'Conte os valores diferentes, não os registros.',
          'Pago aparece três vezes na tabela.'
        ],
        explicacao: 'Existem dois valores diferentes de Status: Pago e Pendente. O `DISTINCT` devolve uma linha para cada valor.',
        conceitos: ['sql.distinct']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'DISTINCT com filtro',
      blocos: [
        { tipo: 'texto', texto: 'O `DISTINCT` pode ser combinado com o `WHERE`. O filtro age primeiro e o resultado só então é deduplicado:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT DISTINCT Cidade\nFROM Clientes\nWHERE Ativo = 1;'
        },
        { tipo: 'trabalho', texto: 'Antes de montar um filtro de cidades no painel do sistema, o time pergunta: "quais cidades realmente têm clientes ativos?". Um `DISTINCT` responde isso sem trazer nome nem e-mail de ninguém.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql07-a3',
        tipo: 'fill-code',
        enunciado: 'Complete para listar cada cidade **uma única vez**, considerando só clientes ativos.',
        codigo: 'SELECT {{1}} Cidade\nFROM Clientes\nWHERE Ativo = 1;',
        lacunas: [['distinct']],
        dicas: [
          'A palavra vem logo depois do SELECT.',
          'É uma palavra que significa "distinto".'
        ],
        explicacao: '`SELECT DISTINCT Cidade ... WHERE Ativo = 1` traz cada cidade com cliente ativo uma única vez.',
        conceitos: ['sql.distinct', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql07-a4',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre o DISTINCT.',
        afirmacoes: [
          { texto: 'SELECT DISTINCT Cidade FROM Clientes; devolve cada cidade uma vez.', correta: true, explicacao: 'É exatamente o papel do DISTINCT.' },
          { texto: 'DISTINCT ordena o resultado automaticamente.', correta: false, explicacao: 'Quem ordena é o ORDER BY; o DISTINCT só remove repetições.' },
          { texto: 'Com duas colunas, valores iguais só são removidos quando o par inteiro se repete.', correta: true, explicacao: 'O DISTINCT compara a combinação de colunas da linha.' }
        ],
        dicas: [
          'DISTINCT não promete ordem.',
          'Ele olha para a linha inteira do resultado.'
        ],
        explicacao: '`DISTINCT` remove repetições da linha do resultado e não ordena. Com mais de uma coluna, o par precisa ser idêntico para ser removido.',
        conceitos: ['sql.distinct', 'sql.order-by']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql07-a5',
        tipo: 'write-code',
        enunciado: 'Escreva uma consulta que retorne as **cidades distintas** dos clientes ativos.',
        respostasAceitas: [
          'select distinct cidade from clientes where ativo = 1',
          'select distinct cidade from clientes where ativo = 1;'
        ],
        dicas: [
          'O DISTINCT vem logo depois do SELECT.',
          'O filtro de ativos é WHERE Ativo = 1.'
        ],
        explicacao: '`SELECT DISTINCT Cidade FROM Clientes WHERE Ativo = 1;` — filtra primeiro, remove repetições depois.',
        conceitos: ['sql.distinct', 'sql.where']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Different',
      blocos: [
        { tipo: 'texto', texto: 'Para falar de coisas diferentes em inglês: **different** (diferente) e **only** (somente).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['only', 'somente / apenas'],
            ['different', 'diferente']
          ]
        },
        { tipo: 'ingles', frase: 'Retrieve only different names.', traducao: 'Recupere somente nomes diferentes.' },
        { tipo: 'nota', tom: 'info', texto: '**only different** = "somente diferentes". É a ideia do `DISTINCT`: cada valor uma única vez.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql07-a6',
        tipo: 'scenario',
        enunciado: 'O relatório de cidades está repetindo a mesma cidade em várias linhas. Qual consulta resolve **sem** trazer colunas extras?',
        cena: 'A tabela Clientes tem as colunas Id, Nome, Cidade e Ativo. O relatório precisa apenas da lista de cidades.',
        opcoes: [
          'SELECT DISTINCT Cidade FROM Clientes;',
          'SELECT Cidade FROM Clientes;',
          'SELECT * FROM Clientes;',
          'SELECT Cidade FROM Clientes ORDER BY Cidade;'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Sem o DISTINCT, as cidades repetem uma vez por cliente.',
          2: 'SELECT * traz todas as colunas e todas as linhas.',
          3: 'O ORDER BY organiza, mas não remove as repetições.'
        },
        dicas: [
          'Repetição no resultado pede deduplicação.',
          'É uma palavra que vem depois do SELECT.'
        ],
        explicacao: '`SELECT DISTINCT Cidade FROM Clientes;` devolve cada cidade uma vez. Ordenar não remove repetição.',
        conceitos: ['sql.distinct', 'sql.order-by'],
        desafio: true
      }
    }
  ]
});
