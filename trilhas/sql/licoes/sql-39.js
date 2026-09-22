Plataforma.registrarLicao({
  id: 'sql-39',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Otimização de consultas lentas',
  subtitulo: 'Profissional · Etapa 45',
  duracaoMin: 60,
  xp: 30,
  objetivos: [
    'Aplicar o ciclo completo de otimização num caso real',
    'Trocar SELECT * por colunas e funções no WHERE por alternativas',
    'Decidir entre índice novo, reescrita ou paginação'
  ],
  conceitos: ['sql.otimizacao', 'sql.execution-plan', 'sql.indices', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O caso da consulta lenta',
      introduz: ['sql.otimizacao'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.execution-plan', texto: 'Você lê planos e cria índices. Agora vai aplicar o ciclo inteiro num chamado real.' },
        { tipo: 'texto', texto: '**Otimizar** é tirar uma consulta do vermelho com método: medir, achar o gargalo, agir, medir de novo:' },
        { tipo: 'conceito', id: 'sql.otimizacao', titulo: 'Otimização', texto: 'O ciclo de melhorar consultas lentas: plano, índice ou reescrita, e nova medição.', exemplo: 'SELECT Nome em vez de SELECT *; índice na coluna do WHERE.' },
        { tipo: 'texto', texto: 'O chamado: "a busca de clientes por cidade demora 8 segundos". O plano mostra Table Scan em Clientes com 2 milhões de linhas.' },
        { tipo: 'nota', tom: 'info', texto: 'Primeiro passo de todo caso: reproduzir e medir. Sem número inicial, não há como provar melhora.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql39-a1',
        tipo: 'scenario',
        enunciado: 'A busca por cidade demora 8 segundos com Table Scan. Qual é a primeira ação?',
        cena: 'Clientes tem 2 milhões de linhas e nenhum índice em Cidade. A consulta filtra WHERE Cidade = ...',
        opcoes: [
          'Criar índice em Cidade e medir de novo',
          'Apagar metade dos clientes',
          'Trocar o banco de servidor',
          'Pedir para os usuários esperarem'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Apagar dados não é otimização.',
          2: 'Hardware antes de índice é pular etapas.',
          3: 'Lentidão tem causa tratável.'
        },
        dicas: [
          'Scan com filtro pede índice.',
          'Aja no gargalo do plano.'
        ],
        explicacao: 'Índice na coluna do filtro + nova medição: o ciclo funcionando.',
        conceitos: ['sql.otimizacao', 'sql.indices']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'SELECT * e funções no WHERE',
      blocos: [
        { tipo: 'texto', texto: 'Dois vilões clássicos que o plano não perdoa:' },
        {
          tipo: 'lista',
          itens: [
            '`SELECT *` traz colunas inúteis e impede o banco de responder só pelo índice. Liste as colunas.',
            'Função na coluna do `WHERE` (como `UPPER(Cidade) = ...`) desliga o índice. Prefira comparar direto ou guardar padronizado.'
          ]
        },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Nome, Email\nFROM Clientes\nWHERE Cidade = \'Curitiba\';'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Reescrever a consulta costuma render mais que hardware novo — e custa zero.' },
        { tipo: 'trabalho', texto: 'Em revisão, SELECT * em consulta no banco de verdade e função no WHERE são os dois comentários mais comuns de quem cuida do banco.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql39-a2',
        tipo: 'find-error',
        enunciado: 'Esta consulta lenta foi marcada na revisão. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT *\nFROM Pedidos\nWHERE YEAR(DataPedido) = 2026;' }
        ],
        opcoes: [
          'SELECT * traz tudo e a função no WHERE desliga o índice da data',
          'Falta o GROUP BY',
          'YEAR não existe em SQL',
          'Nada — a consulta está ótima'
        ],
        correta: 0,
        feedbackErro: {
          1: 'GROUP BY não tem a ver com a lentidão.',
          2: 'YEAR existe e funciona.',
          3: 'Dois vilões juntos: asterisco e função no filtro.'
        },
        dicas: [
          'Liste o que a consulta puxa a mais.',
          'Função na coluna filtrada mata o índice.'
        ],
        explicacao: 'Colunas listadas + comparação direta de data: a reescrita que o plano aprovaria.',
        conceitos: ['sql.otimizacao', 'sql.datas'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Sem palavra nova',
      blocos: [
        { tipo: 'texto', texto: 'Fechando o ciclo com palavras que você já domina.' },
        { tipo: 'ingles', frase: 'Explain slow queries.', traducao: 'Explique consultas lentas.' },
        { tipo: 'nota', tom: 'info', texto: 'Explicar a lentidão (plano) antes de corrigir: a ordem profissional.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql39-a3',
        tipo: 'multiple-choice',
        enunciado: 'Explain slow queries. O que a frase pede?',
        opcoes: [
          'Explique consultas lentas',
          'Acelere consultas lentas',
          'Apague consultas lentas',
          'Ignore consultas lentas'
        ],
        correta: 0,
        dicas: [
          'explain = explicar.',
          'slow queries = consultas lentas.'
        ],
        explicacao: 'Medir e explicar antes de agir: o ciclo da otimização.',
        conceitos: ['sql.otimizacao', 'sql.ingles']
      }
    }
  ]
});
