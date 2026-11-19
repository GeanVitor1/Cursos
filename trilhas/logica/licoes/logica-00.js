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
    'Usar variável, condição e laço (repetição) para escrever esses passos',
    'Somar valores de uma lista',
    'Impedir estados inválidos (estoque negativo)',
    'Encontrar duplicados e agrupar dados'
  ],
  conceitos: ['logica.variavel', 'logica.condicao', 'logica.laco', 'logica.total', 'logica.validacao', 'logica.duplicados', 'logica.agrupamento'],
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
      titulo: 'Duas ferramentas de todo algoritmo',
      introduz: ['logica.variavel', 'logica.condicao'],
      blocos: [
        { tipo: 'texto', texto: 'Quase todo algoritmo é feito de três peças. Você vai usá-las nos quatro raciocínios abaixo, então vale conhecê-las agora.' },
        { tipo: 'conceito', id: 'logica.variavel', titulo: 'Variável', texto: 'Uma variável é um nome que guarda um valor na memória e pode mudar ao longo dos passos.', exemplo: 'total = 0 cria a variável total com o valor 0; depois total = total + 50 passa a valer 50.' },
        { tipo: 'conceito', id: 'logica.condicao', titulo: 'Condição', texto: 'Uma condição é uma pergunta de sim ou não que decide qual caminho seguir: se for verdadeira, executa um bloco; senão, executa outro.', exemplo: 'se idade >= 18: permitir; senão: recusar.' },
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'A terceira ferramenta: o laço',
      introduz: ['logica.laco'],
      blocos: [
        { tipo: 'conceito', id: 'logica.laco', titulo: 'Laço (repetição)', texto: 'Um laço repete um bloco de passos para cada item de uma lista ou enquanto uma condição valer.', exemplo: 'para cada nome na lista: mostrar o nome.' },
        { tipo: 'codigo', linguagem: 'texto', codigo: 'total = 0                      # variável\npara cada item do pedido:      # laço\n    se item.quantidade > 0:    # condição\n        total = total + item.preco' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lg00-a0',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Associe cada linha de pseudocódigo à ferramenta que ela usa.',
        pares: [
          ['contador = 0', 'Variável: guarda um valor que pode mudar'],
          ['se saldo < 0:', 'Condição: escolhe o caminho a seguir'],
          ['para cada cliente da lista:', 'Laço: repete o bloco para cada item']
        ],
        dicas: ['Uma linha guarda, outra pergunta, outra repete.', 'A palavra "se" abre uma pergunta; "para cada" abre uma repetição.'],
        explicacao: 'Variável guarda, condição decide e laço repete. Os raciocínios a seguir combinam essas três peças.',
        conceitos: ['logica.variavel', 'logica.condicao', 'logica.laco']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Raciocínio 1: total',
      introduz: ['logica.total'],
      blocos: [
        { tipo: 'texto', texto: 'O primeiro raciocínio é **somar valores**: pegar o preço de cada item, multiplicar pela quantidade e somar tudo.' },
        { tipo: 'conceito', id: 'logica.total', titulo: 'Total', texto: 'Somar o valor de cada item para chegar ao total de um pedido: preço × quantidade, item por item.', exemplo: '2 × 100 + 1 × 200 = 400' }
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
        opcoes: ['R$ 500,00', 'R$ 325,00', 'R$ 400,00', 'R$ 425,00'],
        correta: 0,
        feedbackErro: {
          1: 'Você somou os preços (100 + 200 + 25) sem multiplicar pelas quantidades?',
          2: 'Esse valor deixa o cabo de fora; todo item do pedido entra na soma.',
          3: 'Confira o cabo: ele aparece 4 vezes, então vale 25 × 4, não só 25.'
        },
        dicas: ['Cada linha da tabela contribui com preço × quantidade.', 'Calcule linha por linha e só então some os três resultados.'],
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
        dicas: ['Uma variável precisa de um valor inicial antes de acumular.', 'O que se repete para cada item deve ficar dentro do laço.'],
        explicacao: 'Iniciar → percorrer → acumular → devolver. Esse padrão de acumulador volta em praticamente toda soma que você fizer.',
        conceitos: ['logica.total']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Raciocínio 2: validação',
      introduz: ['logica.validacao'],
      blocos: [
        { tipo: 'texto', texto: 'O segundo raciocínio é **validar**: verificar uma regra **antes** de alterar os dados, para impedir estados inválidos.' },
        { tipo: 'conceito', id: 'logica.validacao', titulo: 'Validação de regra', texto: 'Verificar uma regra antes de alterar os dados, impedindo estados inválidos.', exemplo: 'Não permitir que o estoque fique negativo.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'lg00-a3',
        tipo: 'find-error',
        dimensao: 'reconhecimento',
        enunciado: 'A regra é: o estoque nunca pode ficar negativo. O código está errado. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'public void DarBaixa(Produto produto, int quantidade)\n{\n    int novoEstoque = produto.Estoque - quantidade;\n    produto.Estoque = novoEstoque;\n}' }
        ],
        opcoes: [
          'Falta validar se a quantidade é maior que o estoque antes de gravar; assim o estoque pode ficar negativo',
          'A validação deveria vir depois de gravar, para conferir o valor já salvo',
          'Falta escrever o novo estoque na tela com Console.WriteLine',
          'O tipo int não permite subtração entre dois números'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Gravar primeiro é o que permite o estoque negativo; a validação precisa vir antes.',
          2: 'Escrever na tela não valida a regra.',
          3: 'int aceita subtração; o problema é a falta de verificação.'
        },
        dicas: ['A regra diz "nunca negativo". O código impede isso?', 'Imagine um produto com estoque 2 e uma baixa de 5: o que o código grava?'],
        explicacao: 'Validar antes de alterar: se `quantidade > produto.Estoque`, lance erro ou recuse. Regras de negócio precisam de guardas explícitas.',
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
      tipo: 'conteudo',
      titulo: 'Raciocínio 3: duplicados',
      introduz: ['logica.duplicados'],
      blocos: [
        { tipo: 'texto', texto: 'O terceiro raciocínio é **encontrar repetidos**: percorrer uma lista guardando o que já foi visto e sinalizar o que se repete.' },
        { tipo: 'diagrama', arte: 'vistos = {}                       (começa vazio)\npara cada email da lista:\n    se email já está em vistos:   -> duplicado!\n    senão: guardar email em vistos' },
        { tipo: 'texto', texto: 'Esse conjunto de "vistos" é uma coleção que só guarda cada valor uma vez e responde rápido se um valor já está nela.' },
        { tipo: 'conceito', id: 'logica.duplicados', titulo: 'Duplicados', texto: 'Encontrar itens repetidos em uma lista, guardando o que já foi visto.', exemplo: 'Dois clientes com o mesmo e-mail.' }
      ]
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
          'Somar o tamanho de todos os e-mails e comparar com o número de clientes',
          'Ordenar os clientes por nome e olhar apenas o primeiro registro da lista',
          'Contar quantos clientes existem e comparar com o total do mês anterior'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O tamanho dos e-mails não indica se algum se repete.',
          2: 'Ordenar por nome não revela e-mails repetidos, e olhar um só registro não basta.',
          3: 'A contagem total não identifica quem se repete.'
        },
        dicas: ['Você precisa comparar cada item com os anteriores.', 'Guardar "já vistos" evita comparar todos contra todos.'],
        explicacao: 'Esse padrão se chama "conjunto de vistos": percorre uma vez, guarda o que já apareceu e sinaliza repetições. É a base dos relatórios e das consultas de agrupamento que você verá mais adiante.',
        conceitos: ['logica.duplicados']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Raciocínio 4: agrupamento',
      introduz: ['logica.agrupamento'],
      blocos: [
        { tipo: 'texto', texto: 'O quarto raciocínio é **agrupar e contar**: separar os itens em grupos e contar quantos há em cada grupo.' },
        { tipo: 'conceito', id: 'logica.agrupamento', titulo: 'Agrupamento', texto: 'Separar os itens em grupos e contar quantos há em cada um.', exemplo: 'Quantos pedidos cada cliente fez.' },
        { tipo: 'vida-real', emoji: '🧾', titulo: 'A dona da padaria quer saber quantas vendas foram em dinheiro, cartão e pix', texto: 'O caixa entrega a lista do dia com 200 vendas, cada uma com a forma de pagamento. Você separa as vendas em três grupos, um por forma de pagamento, e conta quantas há em cada grupo. Esse é o agrupamento, e o raciocínio é o mesmo se os dados estiverem numa planilha ou num banco.' }
      ]
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
          'Somar os ids dos pedidos de cada cliente e mostrar o resultado',
          'Listar todos os pedidos em ordem alfabética pelo nome do cliente',
          'Dividir o total de pedidos pelo número de clientes e mostrar a média'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Somar ids não diz nada sobre quantidade de pedidos.',
          2: 'Ordenar não agrupa nem conta.',
          3: 'A média não mostra quantos por cliente.'
        },
        dicas: ['Cada cliente precisa do seu próprio número, não de um número só.', 'Separe os pedidos em grupos e depois conte cada grupo.'],
        explicacao: 'Agrupar e contar é um dos raciocínios mais usados em relatórios — em um banco de dados, isso vira uma contagem por grupo (você verá mais adiante na trilha de SQL).',
        conceitos: ['logica.agrupamento']
      }
    }
  ]
});
