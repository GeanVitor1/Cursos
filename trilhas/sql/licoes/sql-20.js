Plataforma.registrarLicao({
  id: 'sql-20',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'HAVING',
  subtitulo: 'Agregação · Etapa 24',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Filtrar grupos com HAVING',
    'Diferenciar WHERE de HAVING',
    'Montar a ordem completa: WHERE, GROUP BY, HAVING'
  ],
  conceitos: ['sql.having', 'sql.group-by', 'sql.where', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Filtrando depois de agrupar',
      introduz: ['sql.having'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.group-by', texto: 'O `GROUP BY` resume por grupos. Mas e se você quiser só os grupos grandes — "cidades com mais de 10 pedidos"?' },
        { tipo: 'texto', texto: 'O `WHERE` filtra **linhas**, antes de agrupar. O `HAVING` (tendo) filtra **grupos**, depois de agrupar:' },
        { tipo: 'conceito', id: 'sql.having', titulo: 'HAVING', texto: 'Filtra grupos depois do GROUP BY, usando condições sobre funções de agregação.', exemplo: 'SELECT Cidade, COUNT(*) AS Total FROM Clientes GROUP BY Cidade HAVING COUNT(*) > 10;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Cidade, COUNT(*) AS Total\nFROM Clientes\nGROUP BY Cidade\nHAVING COUNT(*) > 10;'
        },
        { tipo: 'nota', tom: 'atencao', texto: '`WHERE` não enxerga `COUNT(*)`: ele roda antes do agrupamento. Condição sobre função agregada é sempre `HAVING`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql20-a1',
        tipo: 'multiple-choice',
        enunciado: 'Qual é a diferença entre WHERE e HAVING?',
        opcoes: [
          'WHERE filtra linhas antes de agrupar; HAVING filtra grupos depois',
          'WHERE filtra grupos; HAVING filtra linhas',
          'São apelidos da mesma cláusula',
          'HAVING substitui o GROUP BY'
        ],
        correta: 0,
        dicas: [
          'Pense na ordem: filtro, grupo, filtro de grupo.',
          'Um age nas linhas, o outro no resumo.'
        ],
        explicacao: '`WHERE` escolhe quais linhas entram no agrupamento; `HAVING` escolhe quais grupos saem no resultado.',
        conceitos: ['sql.having', 'sql.where']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'A ordem completa',
      blocos: [
        { tipo: 'texto', texto: 'Com tudo junto, a consulta segue esta ordem fixa:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Cidade, COUNT(*) AS Total\nFROM Clientes\nWHERE Ativo = 1\nGROUP BY Cidade\nHAVING COUNT(*) > 10;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Leia na ordem: filtra ativos (`WHERE`), agrupa por cidade (`GROUP BY`), fica com as grandes (`HAVING`).' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql20-a2',
        tipo: 'order-blocks',
        enunciado: 'Ordene os blocos: cidades com mais de 5 pedidos.',
        blocos: [
          'SELECT Cidade, COUNT(*) AS Total',
          'FROM Clientes',
          'GROUP BY Cidade',
          'HAVING COUNT(*) > 5;'
        ],
        dicas: [
          'GROUP BY vem antes do HAVING.',
          'O filtro de grupo fecha a consulta.'
        ],
        explicacao: 'SELECT, FROM, GROUP BY, HAVING — a ordem é fixa e cada cláusula tem seu papel.',
        conceitos: ['sql.having', 'sql.group-by']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql20-a3',
        tipo: 'find-error',
        enunciado: 'Esta consulta foi recusada. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Cidade, COUNT(*) AS Total\nFROM Clientes\nWHERE COUNT(*) > 5\nGROUP BY Cidade;' }
        ],
        opcoes: [
          'WHERE não pode usar função agregada; o filtro de grupo é HAVING',
          'Falta o ORDER BY',
          'COUNT precisa de DISTINCT',
          'Nada — a consulta está correta'
        ],
        correta: 0,
        feedbackErro: {
          1: 'ORDER BY é opcional aqui.',
          2: 'DISTINCT não tem a ver com o erro.',
          3: 'O WHERE roda antes do agrupamento e não enxerga o COUNT.'
        },
        dicas: [
          'Onde o COUNT pode aparecer num filtro?',
          'WHERE age antes; HAVING, depois.'
        ],
        explicacao: 'Condição sobre agregação só no `HAVING`, depois do `GROUP BY`. No `WHERE`, o `COUNT` ainda não existe.',
        conceitos: ['sql.having', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql20-a4',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna as **cidades com mais de 2 pedidos** e suas quantidades.',
        respostasAceitas: [
          'select cidade, count(*) as total from clientes join pedidos on pedidos.clienteid = clientes.id group by cidade having count(*) > 2'
        ],
        dicas: [
          'Junte, agrupe por Cidade e filtre o grupo.',
          'O filtro de grupo usa HAVING.'
        ],
        explicacao: 'JOIN monta, GROUP BY resume por cidade, HAVING filtra os grupos com mais de 2.',
        conceitos: ['sql.having', 'sql.group-by', 'sql.join'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Having',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras para o filtro de grupos: **having** (tendo) e **filter** (filtrar).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['having', 'tendo'],
            ['filter', 'filtrar']
          ]
        },
        { tipo: 'ingles', frase: 'Having filters rows.', traducao: 'Tendo filtra linhas.' },
        { tipo: 'nota', tom: 'info', texto: 'Na prática leia como "o HAVING filtra os grupos".' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql20-a5',
        tipo: 'write-code',
        enunciado: 'Having filters rows: cidades com mais de 3 clientes.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select cidade, count(*) as total from clientes group by cidade having count(*) > 3'
        ],
        dicas: [
          'Agrupe por Cidade.',
          'Filtre o grupo com HAVING.'
        ],
        explicacao: '`SELECT Cidade, COUNT(*) FROM Clientes GROUP BY Cidade HAVING COUNT(*) > 3;`.',
        conceitos: ['sql.having', 'sql.ingles']
      }
    }
  ]
});
