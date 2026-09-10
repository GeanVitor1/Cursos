Plataforma.registrarLicao({
  id: 'logica-00',
  trilha: 'logica',
  tipo: 'licao',
  titulo: 'Total, validação, duplicados e agrupamento',
  subtitulo: 'Lógica · Etapa 0',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Transformar uma regra de negócio em passos',
    'Somar valores de uma lista',
    'Impedir estados inválidos (estoque negativo)',
    'Encontrar duplicados e agrupar dados'
  ],
  conceitos: ['logica.total', 'logica.validacao', 'logica.duplicados', 'logica.agrupamento'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Programar é traduzir regras',
      blocos: [
        { tipo: 'texto', texto: 'Lógica de programação não é matemática avançada. É a capacidade de pegar uma regra escrita em português e transformar em passos que o computador executa **sem ambiguidade**.' },
        { tipo: 'trabalho', texto: 'No dia a dia, um ticket chega assim: "o total do pedido está errado quando o cliente usa cupom". Seu trabalho é decompor a regra, não decorar fórmulas.', fonte: '💼 Em uma vaga de desenvolvedor' },
        { tipo: 'diagrama', arte: 'Regra em português\n   "Some os itens do pedido"\n          │\n          ▼\nPassos sem ambiguidade\n   1. Comece o total em 0\n   2. Para cada item, multiplique preço × quantidade\n   3. Some ao total\n   4. Devolva o total' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Os quatro raciocínios deste treino',
      introduz: ['logica.total', 'logica.validacao', 'logica.duplicados', 'logica.agrupamento'],
      blocos: [
        { tipo: 'texto', texto: 'Antes de praticar, conheça os quatro raciocínios que vão aparecer. Eles voltam em quase todo sistema de verdade.' },
        { tipo: 'conceito', id: 'logica.total', titulo: 'Total', texto: 'Somar o valor de cada item para chegar ao total de um pedido: preço × quantidade, item por item.', exemplo: '2 × 100 + 1 × 200 = 400' },
        { tipo: 'conceito', id: 'logica.validacao', titulo: 'Validação de regra', texto: 'Verificar uma regra antes de alterar os dados, impedindo estados inválidos.', exemplo: 'Não permitir que o estoque fique negativo.' },
        { tipo: 'conceito', id: 'logica.duplicados', titulo: 'Duplicados', texto: 'Encontrar itens repetidos em uma lista, guardando o que já foi visto.', exemplo: 'Dois clientes com o mesmo e-mail.' },
        { tipo: 'conceito', id: 'logica.agrupamento', titulo: 'Agrupamento', texto: 'Separar os itens em grupos e contar quantos há em cada grupo.', exemplo: 'Quantos pedidos cada cliente fez.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lg00-a1',
        tipo: 'predict-output',
        dimensao: 'reconhecimento',
        enunciado: 'Um pedido tem os itens abaixo. Qual é o total?',
        contexto: [
          { tipo: 'tabela', titulo: 'Itens do pedido', colunas: ['Produto', 'Preço', 'Quantidade'], linhas: [['Mouse', 100.0, 2], ['Teclado', 200.0, 1], ['Cabo', 25.0, 4]] }
        ],
        opcoes: ['R$ 500,00', 'R$ 325,00', 'R$ 400,00', 'R$ 550,00'],
        correta: 0,
        feedbackErro: {
          1: 'Você somou os preços sem multiplicar pelas quantidades?',
          2: 'Confira o cabo: 25 × 4 = 100.',
          3: 'Confira o mouse: 100 × 2 = 200, não 100.'
        },
        dicas: ['Total = preço × quantidade, item por item.', 'Some: mouse (200) + teclado (200) + cabo (100).'],
        explicacao: 'Total do pedido = soma de (preço × quantidade) de cada item. 200 + 200 + 100 = 500.',
        conceitos: ['logica.total']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lg00-a2',
        tipo: 'order-blocks',
        dimensao: 'ordenacao',
        enunciado: 'Ordene os passos do algoritmo — a sequência de passos para resolver um problema — que calcula o total de um pedido.',
        blocos: [
          'total = 0',
          'para cada item do pedido:',
          'total = total + (item.preco * item.quantidade)',
          'devolva total'
        ],
        dicas: ['Antes de somar, o total precisa começar em zero.', 'A soma acontece dentro do "para cada".'],
        explicacao: 'Iniciar → percorrer → acumular → devolver. Esse padrão de acumulador volta em praticamente toda soma que você fizer.',
        conceitos: ['logica.total']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lg00-a3',
        tipo: 'find-error',
        dimensao: 'reconhecimento',
        enunciado: 'A regra é: o estoque nunca pode ficar negativo. O código está errado. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'public void DarBaixa(int estoqueAtual, int quantidade)\n{\n    int novoEstoque = estoqueAtual - quantidade;\n    produto.Estoque = novoEstoque;\n}' }
        ],
        opcoes: [
          'Falta validar se a quantidade é maior que o estoque antes de gravar; assim o estoque pode ficar negativo',
          'A validação deveria vir depois de gravar',
          'Falta um Console.WriteLine',
          'O tipo int não aceita subtração'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Gravar primeiro é o que permite o estoque negativo; a validação precisa vir antes.',
          2: 'Escrever na tela não valida a regra.',
          3: 'int aceita subtração; o problema é a falta de verificação.'
        },
        dicas: ['A regra diz "nunca negativo". O código impede isso?', 'O que acontece se quantidade for maior que estoqueAtual?'],
        explicacao: 'Validar antes de alterar: se `quantidade > estoqueAtual`, lance erro ou recuse. Regras de negócio precisam de guardas explícitas.',
        conceitos: ['logica.validacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lg00-a4',
        tipo: 'order-blocks',
        dimensao: 'ordenacao',
        enunciado: 'Ordene a validação de baixa de estoque.',
        blocos: [
          'se quantidade > estoqueAtual:',
          'recusar a operação com erro',
          'senão:',
          'estoqueAtual = estoqueAtual - quantidade',
          'gravar o novo estoque'
        ],
        dicas: ['A verificação vem antes de qualquer alteração.', 'O caminho do "senão" é o que grava.'],
        explicacao: 'Primeiro decide, depois altera. Essa ordem evita corromper dados mesmo em caso de erro.',
        conceitos: ['logica.validacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lg00-a5',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'O time descobriu que dois cadastros do mesmo cliente foram criados com o mesmo e-mail: ana@email.com. Você precisa encontrar duplicados em uma lista grande.',
        enunciado: 'Qual abordagem encontra os e-mails duplicados?',
        opcoes: [
          'Percorrer a lista guardando os e-mails já vistos; se um e-mail se repetir, marcá-lo como duplicado',
          'Somar todos os e-mails',
          'Ordenar por nome e pegar o primeiro',
          'Contar quantos clientes existem'
        ],
        correta: 0,
        feedbackErro: {
          1: 'E-mail é texto: não faz sentido somar.',
          2: 'Ordenar por nome não revela e-mails repetidos.',
          3: 'A contagem total não identifica quem se repete.'
        },
        dicas: ['Você precisa comparar cada item com os anteriores.', 'Guardar "já vistos" evita comparar todos contra todos.'],
        explicacao: 'Esse padrão se chama "conjunto de vistos": percorre uma vez, guarda o que já apareceu e sinaliza repetições. É a base dos relatórios e das consultas de agrupamento que você verá mais adiante.',
        conceitos: ['logica.duplicados']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lg00-a6',
        tipo: 'multiple-choice',
        dimensao: 'aplicacao',
        enunciado: 'O relatório precisa mostrar quantos pedidos cada cliente fez. Qual é o raciocínio correto?',
        opcoes: [
          'Agrupar os pedidos por cliente e contar quantos pedidos há em cada grupo',
          'Somar os ids dos pedidos de cada cliente',
          'Listar todos os pedidos em ordem alfabética',
          'Dividir o total de pedidos pelo número de clientes'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Somar ids não diz nada sobre quantidade de pedidos.',
          2: 'Ordenar não agrupa nem conta.',
          3: 'A média não mostra quantos por cliente.'
        },
        dicas: ['"Quantos por cliente" = agrupar por cliente e contar.', 'É o mesmo raciocínio de agrupar e contar linhas em uma tabela.'],
        explicacao: 'Agrupar e contar é um dos raciocínios mais usados em relatórios — em um banco de dados, isso vira uma contagem por grupo (você verá mais adiante na trilha de SQL).',
        conceitos: ['logica.agrupamento']
      }
    }
  ]
});
