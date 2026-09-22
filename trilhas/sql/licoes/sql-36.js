Plataforma.registrarLicao({
  id: 'sql-36',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Modelagem de e-commerce',
  subtitulo: 'Profissional · Etapa 42',
  duracaoMin: 60,
  xp: 30,
  objetivos: [
    'Desenhar tabelas de um e-commerce com chaves e vínculos',
    'Escolher tipos de dados adequados por coluna',
    'Evitar duplicação separando assuntos em tabelas'
  ],
  conceitos: ['sql.modelagem', 'sql.chave-primaria', 'sql.chave-estrangeira', 'sql.tipos-dados', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Antes da primeira consulta',
      introduz: ['sql.modelagem'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.tabela', texto: 'Você consulta tabelas há 41 etapas. Agora vai decidir **quais tabelas existem**.' },
        { tipo: 'texto', texto: '**Modelagem** é desenhar as tabelas antes de guardar qualquer dado: que assuntos viram tabela, quais colunas cada uma tem e como se ligam:' },
        { tipo: 'conceito', id: 'sql.modelagem', titulo: 'Modelagem', texto: 'O desenho das tabelas, colunas, chaves e vínculos que sustentam o sistema.', exemplo: 'Clientes, Produtos, Pedidos e ItensPedido com chaves ligando tudo.' },
        {
          tipo: 'lista',
          itens: [
            'Um assunto por tabela: clientes, produtos, pedidos.',
            'Toda tabela com chave primária (Id).',
            'Vínculos por chave estrangeira (ClienteId, PedidoId, ProdutoId).'
          ]
        },
        { tipo: 'nota', tom: 'info', texto: 'A pergunta de ouro: "se mudar, muda em um lugar só?" Se a resposta for não, falta tabela.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql36-a1',
        tipo: 'multiple-choice',
        enunciado: 'Onde deve ficar o nome do cliente de cada pedido?',
        opcoes: [
          'Na tabela Clientes, ligada por ClienteId',
          'Repetido em cada linha de Pedidos',
          'No nome da tabela Pedidos',
          'Num comentário da consulta'
        ],
        correta: 0,
        dicas: [
          'Dado que se repete pede tabela própria.',
          'O vínculo carrega a ligação.'
        ],
        explicacao: 'Nome mora em Clientes; Pedidos guarda só o ClienteId. Mudou o nome, muda num lugar só.',
        conceitos: ['sql.modelagem', 'sql.chave-estrangeira']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Tipos que protegem',
      blocos: [
        { tipo: 'texto', texto: 'O tipo da coluna é uma trava silenciosa: dinheiro em `DECIMAL` não perde centavos; texto curto em `VARCHAR(60)` não aceita romance:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'Id INT, Nome VARCHAR(60), Preco DECIMAL, Ativo BIT'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Preço em tipo aproximado (FLOAT) arredonda centavos no caixa. Dinheiro sempre em tipo exato.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql36-a2',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada coluna ao tipo adequado.',
        pares: [
          ['Preco', 'DECIMAL'],
          ['Nome', 'VARCHAR'],
          ['Ativo', 'BIT'],
          ['DataPedido', 'DATETIME']
        ],
        dicas: [
          'Dinheiro pede exatidão.',
          'Verdadeiro/falso é BIT.'
        ],
        explicacao: 'Tipo certo protege o dado antes de qualquer consulta existir.',
        conceitos: ['sql.modelagem', 'sql.tipos-dados']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql36-a3',
        tipo: 'scenario',
        enunciado: 'O dono quer guardar "endereço de entrega" do pedido. Onde modelar?',
        cena: 'Clientes tem endereço fixo, mas cada pedido pode ir para um lugar diferente (casa, trabalho, presente).',
        opcoes: [
          'Numa coluna de Pedidos, pois varia por pedido',
          'Na tabela Clientes, sobrescrevendo a cada pedido',
          'No nome do cliente, entre parênteses',
          'Não guardar: o entregador adivinha'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Sobrescrever perde o histórico de entregas.',
          2: 'Nome não é lugar de endereço.',
          3: 'Dado usado precisa estar guardado.'
        },
        dicas: [
          'Varia por pedido, não por cliente.',
          'O dado mora onde varia.'
        ],
        explicacao: 'Endereço de entrega varia por pedido: coluna de Pedidos. O fixo continua em Clientes.',
        conceitos: ['sql.modelagem'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Design',
      blocos: [
        { tipo: 'texto', texto: 'Uma palavra nova para o desenho do banco: **design** (projeto, desenho).' },
        {
          tipo: 'vocab',
          titulo: 'Palavra nova (1)',
          pares: [
            ['design', 'projeto / desenho']
          ]
        },
        { tipo: 'ingles', frase: 'Design tables first.', traducao: 'Projete as tabelas primeiro.' },
        { tipo: 'trabalho', texto: 'Modelagem vem antes do código em todo projeto sério: errar tabela no início custa migração dolorosa depois.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql36-a4',
        tipo: 'multiple-choice',
        enunciado: 'Design tables first. O que a frase recomenda?',
        opcoes: [
          'Projetar as tabelas antes de começar',
          'Criar as tabelas por último',
          'Projetar só depois de pronto',
          'Evitar tabelas no projeto'
        ],
        correta: 0,
        dicas: [
          'first = primeiro.',
          'design = projetar.'
        ],
        explicacao: 'Modelo antes, código depois: a ordem que evita retrabalho.',
        conceitos: ['sql.modelagem', 'sql.ingles']
      }
    }
  ]
});
