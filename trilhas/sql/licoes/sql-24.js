Plataforma.registrarLicao({
  id: 'sql-24',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'CASE WHEN',
  subtitulo: 'Intermediário · Etapa 29',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Criar colunas condicionais com CASE WHEN',
    'Classificar linhas em categorias',
    'Fechar cada CASE com END e apelidar o resultado'
  ],
  conceitos: ['sql.case', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O "se" dentro do SELECT',
      introduz: ['sql.case'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.where', texto: 'O `WHERE` escolhe **quais linhas** entram. Mas e para decidir **o que mostrar** em cada linha?' },
        { tipo: 'texto', texto: 'O `CASE` (caso) cria uma coluna calculada por condição: quando (`WHEN`) algo for verdade, mostra um valor; senão (`ELSE`), outro. Fecha com `END` (fim):' },
        { tipo: 'conceito', id: 'sql.case', titulo: 'CASE WHEN', texto: 'Coluna condicional: avalia WHEN em ordem e devolve o valor do primeiro verdadeiro, ou do ELSE.', exemplo: "CASE WHEN Preco > 500 THEN 'Caro' ELSE 'Barato' END" },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: "SELECT Nome,\n       CASE WHEN Preco > 500 THEN 'Caro' ELSE 'Barato' END AS Faixa\nFROM Produtos;"
        },
        { tipo: 'nota', tom: 'info', texto: 'O `END AS Faixa` fecha o cálculo e nomeia a coluna. Sem alias, o relatório mostra um cabeçalho estranho.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql24-a1',
        tipo: 'predict-output',
        enunciado: 'O que aparece na coluna Faixa para o Teclado (200)?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: "SELECT Nome,\n       CASE WHEN Preco > 500 THEN 'Caro' ELSE 'Barato' END AS Faixa\nFROM Produtos;" }
        ],
        opcoes: [
          'Barato',
          'Caro',
          '200',
          'Vazio'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Caro exige Preco > 500.',
          2: 'A coluna mostra o texto do THEN ou do ELSE.',
          3: 'O ELSE cobre quem não passou no WHEN.'
        },
        dicas: [
          '200 é maior que 500?',
          'Quem falha no WHEN cai no ELSE.'
        ],
        explicacao: '200 não passa de 500, então cai no `ELSE`: Barato.',
        conceitos: ['sql.case']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Vários WHENs em ordem',
      blocos: [
        { tipo: 'texto', texto: 'O `CASE` avalia os `WHENs` **em ordem** e para no primeiro verdadeiro. A ordem define as faixas:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: "SELECT Nome,\n       CASE WHEN Preco > 500 THEN 'Caro'\n            WHEN Preco > 100 THEN 'Médio'\n            ELSE 'Barato' END AS Faixa\nFROM Produtos;"
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Um produto de 900 para no primeiro `WHEN`. Se a ordem fosse invertida, tudo acima de 100 viraria "Médio" — inclusive 900.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql24-a2',
        tipo: 'fill-code',
        enunciado: 'Complete para classificar pedidos acima de 1000 como Grandes.',
        codigo: "SELECT Id,\n       CASE {{1}} ValorTotal > 1000 THEN 'Grande' ELSE 'Normal' END AS Porte\nFROM Pedidos;",
        lacunas: [['when']],
        dicas: [
          'A palavra que testa a condição.',
          'Quatro letras.'
        ],
        explicacao: '`CASE WHEN ... THEN ... ELSE ... END`: condição, valor verdadeiro, valor padrão.',
        conceitos: ['sql.case']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql24-a3',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna **nome e faixa** (Caro acima de 500, senão Barato) dos produtos.',
        respostasAceitas: [
          "select nome, case when preco > 500 then 'caro' else 'barato' end as faixa from produtos"
        ],
        dicas: [
          'CASE WHEN condição THEN valor ELSE valor END.',
          'Apelide de Faixa.'
        ],
        explicacao: 'A coluna Faixa nasce do CASE; o alias a nomeia no relatório.',
        conceitos: ['sql.case', 'sql.texto-aspas'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Paid e pending',
      blocos: [
        { tipo: 'texto', texto: 'Três palavras para classificar pedidos: **case** (caso), **paid** (pago) e **pending** (pendente).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (3)',
          pares: [
            ['case', 'caso'],
            ['paid', 'pago'],
            ['pending', 'pendente']
          ]
        },
        { tipo: 'ingles', frase: 'Paid and pending orders.', traducao: 'Pedidos pagos e pendentes.' },
        { tipo: 'nota', tom: 'info', texto: 'As duas categorias que um `CASE` sobre Status separaria.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql24-a4',
        tipo: 'write-code',
        enunciado: 'Paid and pending orders: classifique o Status em Pago/Outros.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          "select status, case when status = 'pago' then 'pago' else 'outros' end as classe from pedidos"
        ],
        dicas: [
          'WHEN Status = ... THEN ... ELSE ... END.',
          'Apelide a coluna.'
        ],
        explicacao: 'O CASE separa Pago de todo o resto numa coluna nova.',
        conceitos: ['sql.case', 'sql.ingles']
      }
    }
  ]
});
