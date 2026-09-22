Plataforma.registrarLicao({
  id: 'sql-34',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Execution plans e desempenho',
  subtitulo: 'Avançado · Etapa 40',
  duracaoMin: 60,
  xp: 30,
  objetivos: [
    'Ler um execution plan e achar a operação mais cara',
    'Reconhecer varredura total (scan) contra busca por índice (seek)',
    'Aplicar o ciclo: medir, criar índice, medir de novo'
  ],
  conceitos: ['sql.execution-plan', 'sql.indices', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Ver o banco pensando',
      introduz: ['sql.execution-plan'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.indices', texto: 'Você cria índices para acelerar buscas. Mas como **confirmar** que o banco está usando o seu índice?' },
        { tipo: 'texto', texto: 'O **execution plan** (plano de execução) mostra o passo a passo que o banco escolheu: que tabelas varreu, que índices usou e onde gastou mais:' },
        { tipo: 'conceito', id: 'sql.execution-plan', titulo: 'Execution plan', texto: 'O plano de execução mostra como o banco resolve a consulta e qual operação custa mais.', exemplo: 'Index Seek (rápido) vs Table Scan (varredura total).' },
        { tipo: 'nota', tom: 'info', texto: 'Na ferramenta do banco, o plano aparece como árvore com porcentagens. Leia do passo mais caro para o mais barato.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql34-a1',
        tipo: 'multiple-choice',
        enunciado: 'O plano mostra Table Scan de 95% numa consulta com WHERE por Cidade. O que isso sugere?',
        opcoes: [
          'Falta um índice em Cidade: o banco varreu tudo',
          'A consulta está ótima e não precisa de nada',
          'O problema é o ORDER BY',
          'É preciso apagar a tabela e recriar'
        ],
        correta: 0,
        dicas: [
          'Scan = varredura total.',
          '95% do custo num passo só.'
        ],
        explicacao: 'Varredura total com filtro por Cidade pede `CREATE INDEX ... ON ... (Cidade)`.',
        conceitos: ['sql.execution-plan', 'sql.indices']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Seek contra Scan',
      blocos: [
        { tipo: 'texto', texto: 'Os dois vilões e mocinhos do plano:' },
        {
          tipo: 'lista',
          itens: [
            '**Table Scan**: varreu a tabela inteira. Aceitável em tabela minúscula; suspeito em tabela grande.',
            '**Index Seek**: foi direto às linhas pelo índice. É o que você quer ver nos filtros.'
          ]
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Cuidado com a armadilha: scan em tabela de 100 linhas é irrelevante. O plano importa quando há volume.' },
        { tipo: 'trabalho', texto: 'O ciclo profissional de otimização: rode a consulta lenta, leia o plano, crie o índice sugerido, rode de novo e compare os tempos.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql34-a2',
        tipo: 'multiple-choice',
        enunciado: 'Depois de criar o índice, o plano mudou de Table Scan para Index Seek e o tempo caiu. Conclusão?',
        opcoes: [
          'O índice resolveu: medir antes e depois confirma',
          'Foi coincidência; índice não muda plano',
          'É preciso criar mais cinco índices',
          'O plano antigo estava certo'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Seek no lugar de Scan é exatamente o efeito do índice.',
          2: 'Um índice certo basta; excesso custa escrita.',
          3: 'O plano novo mostra o ganho.'
        },
        dicas: [
          'Compare antes e depois.',
          'Seek é o objetivo.'
        ],
        explicacao: 'Medir, mudar, medir de novo: o ciclo que prova a otimização.',
        conceitos: ['sql.execution-plan', 'sql.indices']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql34-a3',
        tipo: 'true-false',
        enunciado: 'Avalie as afirmações sobre planos de execução.',
        afirmacoes: [
          { texto: 'Table Scan em tabela gigante com filtro costuma pedir um índice.', correta: true, explicacao: 'Varredura total é o sintoma clássico.' },
          { texto: 'Index Seek significa que o banco foi direto às linhas pelo índice.', correta: true, explicacao: 'É o comportamento desejado nos filtros.' },
          { texto: 'Todo Table Scan é um problema, mesmo em tabelas minúsculas.', correta: false, explicacao: 'Sem volume, varrer 100 linhas é instantâneo.' }
        ],
        dicas: [
          'Volume muda tudo.',
          'Seek é o mocinho.'
        ],
        explicacao: 'Scan gigante pede índice; Seek confirma o uso; tabela pequena dispensa preocupação.',
        conceitos: ['sql.execution-plan'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Plan',
      blocos: [
        { tipo: 'texto', texto: 'Três palavras para investigar lentidão: **plan** (plano), **slow** (lento) e **explain** (explicar).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (3)',
          pares: [
            ['plan', 'plano'],
            ['slow', 'lento'],
            ['explain', 'explicar']
          ]
        },
        { tipo: 'ingles', frase: 'Plans explain slow queries.', traducao: 'Planos explicam consultas lentas.' },
        { tipo: 'nota', tom: 'info', texto: '**explain slow queries** = "explicar consultas lentas": o trabalho do plano.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql34-a4',
        tipo: 'multiple-choice',
        enunciado: 'Plans explain slow queries. O que a frase diz?',
        opcoes: [
          'Planos explicam consultas lentas',
          'Consultas lentas explicam planos',
          'Planos aceleram consultas lentas',
          'Consultas explicam planos lentos'
        ],
        correta: 0,
        dicas: [
          'plans = planos; slow queries = consultas lentas.',
          'explain = explicar.'
        ],
        explicacao: 'Sujeito, verbo, objeto: planos explicam consultas lentas.',
        conceitos: ['sql.execution-plan', 'sql.ingles']
      }
    }
  ]
});
