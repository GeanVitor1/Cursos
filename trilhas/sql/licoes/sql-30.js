Plataforma.registrarLicao({
  id: 'sql-30',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Views',
  subtitulo: 'Avançado · Etapa 36',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Criar consultas guardadas com CREATE VIEW',
    'Consultar uma view como se fosse tabela',
    'Decidir quando uma view simplifica o acesso'
  ],
  conceitos: ['sql.views', 'sql.select', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Consultas com nome',
      introduz: ['sql.views'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.cte', texto: 'A CTE nomeia um resultado **dentro** de uma consulta. A view nomeia para **todo mundo**, de forma permanente.' },
        { tipo: 'texto', texto: 'Uma **view** (visão) é uma consulta guardada com nome. Depois de criada, você a lê como se fosse tabela:' },
        { tipo: 'conceito', id: 'sql.views', titulo: 'VIEW', texto: 'Consulta armazenada com nome, lida como tabela. Não guarda dados: roda a consulta a cada uso.', exemplo: 'CREATE VIEW Ativos AS SELECT * FROM Clientes WHERE Ativo = 1;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'CREATE VIEW Ativos AS\nSELECT * FROM Clientes WHERE Ativo = 1;'
        },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Nome FROM Ativos;'
        },
        { tipo: 'nota', tom: 'info', texto: 'A view não copia dados: cada `SELECT` nela roda a consulta guardada. Mudou a tabela, mudou o resultado.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql30-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que acontece com os dados quando você cria uma view?',
        opcoes: [
          'Nada é copiado: a consulta guardada roda a cada uso',
          'Os dados são copiados para uma tabela nova',
          'A tabela original é apagada',
          'Os dados ficam congelados no momento da criação'
        ],
        correta: 0,
        dicas: [
          'View guarda consulta, não linhas.',
          'Pense na CTE permanente.'
        ],
        explicacao: 'View é receita guardada: o banco cozinha na hora de servir, sempre com dados atuais.',
        conceitos: ['sql.views']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Para que servem',
      blocos: [
        { tipo: 'texto', texto: 'Views escondem complexidade e protegem acesso: o relatório lê a view simples sem ver os JOINs; a aplicação vê só as colunas liberadas:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'CREATE VIEW VendasPorCidade AS\nSELECT Cidade, SUM(ValorTotal) AS Total\nFROM Clientes\nJOIN Pedidos ON Pedidos.ClienteId = Clientes.Id\nGROUP BY Cidade;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Depois disso, `SELECT * FROM VendasPorCidade;` entrega o relatório pronto. A junção e o agrupamento ficam invisíveis para quem consome.' },
        { tipo: 'trabalho', texto: 'Times criam views por assunto (vendas, estoque, clientes ativos) e liberam acesso a elas em vez das tabelas cruas. É organização e segurança ao mesmo tempo.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql30-a2',
        tipo: 'fill-code',
        enunciado: 'Complete para guardar a consulta de clientes ativos numa view.',
        codigo: '{{1}} VIEW Ativos AS\nSELECT * FROM Clientes WHERE Ativo = 1;',
        lacunas: [['create']],
        dicas: [
          'O verbo que cria objetos.',
          'O mesmo do índice.'
        ],
        explicacao: '`CREATE VIEW nome AS consulta` guarda a consulta com nome.',
        conceitos: ['sql.views']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql30-a3',
        tipo: 'write-code',
        enunciado: 'Escreva a view **Ativos** com todos os clientes ativos.',
        respostasAceitas: [
          'create view ativos as select * from clientes where ativo = 1'
        ],
        dicas: [
          'CREATE VIEW nome AS ...',
          'Filtre Ativo = 1.'
        ],
        explicacao: 'A consulta de ativos agora tem nome e pode ser reutilizada.',
        conceitos: ['sql.views', 'sql.where'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · View',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras para consultas guardadas: **view** (visão) e **saved** (salvo).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['view', 'visão'],
            ['saved', 'salvo']
          ]
        },
        { tipo: 'ingles', frase: 'Views are saved queries.', traducao: 'Views são consultas salvas.' },
        { tipo: 'nota', tom: 'info', texto: '**saved queries** = "consultas salvas": exatamente o que uma view é.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql30-a4',
        tipo: 'write-code',
        enunciado: 'Views are saved queries: crie a view Ativos.',
        placeholder: 'CREATE ...',
        respostasAceitas: [
          'create view ativos as select * from clientes where ativo = 1'
        ],
        dicas: [
          'CREATE VIEW Ativos AS ...',
          'A consulta filtra os ativos.'
        ],
        explicacao: 'Nome, consulta guardada, reutilização: o ciclo da view.',
        conceitos: ['sql.views', 'sql.ingles']
      }
    }
  ]
});
