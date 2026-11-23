Plataforma.registrarLicao({
  id: 'engenharia-ia-00',
  trilha: 'engenharia-ia',
  tipo: 'licao',
  titulo: 'Da necessidade à decisão técnica',
  duracaoMin: 25,
  xp: 30,
  objetivos: [
    'Diferenciar HTTP (mensagens) de API (contrato de operações) numa solução de pedidos',
    'Transformar um pedido vago em regras, falhas e critérios de aceitação verificáveis',
    'Pedir à IA uma solução com testes e conferir se o teste reproduz a regra violada'
  ],
  conceitos: ['engenharia-ia.http', 'engenharia-ia.api', 'engenharia-ia.decisoes'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Dois termos antes do cenário',
      blocos: [
        { tipo: 'futuro', conceitos: ['aspnet.http','aspnet.api'], titulo: 'Onde aprofundar', texto: 'Aqui basta a ideia geral de HTTP e API. A trilha de ASP.NET mostra como construir e testar uma API completa.' },
        { tipo: 'conceito', id: 'engenharia-ia.http', titulo: 'HTTP', texto: 'HTTP é o conjunto de regras para trocar mensagens entre um cliente (como o navegador) e um servidor. O cliente envia uma requisição com um método (GET para ler, POST para criar) e o servidor devolve uma resposta com um código de status, como 200 (deu certo) ou 404 (não encontrado).', exemplo: 'GET /pedidos/7 → 200 e os dados do pedido 7.' },
        { tipo: 'conceito', id: 'engenharia-ia.api', titulo: 'API', texto: 'Uma API é a lista de operações que um programa oferece a outros programas, com o formato do que se envia e do que se recebe. Uma API web usa HTTP para isso e aplica regras antes de gravar ou devolver dados.', exemplo: 'A API de pedidos oferece "criar pedido", "consultar pedido" e "cancelar pedido".' }
      ]
    },
    {
      introduz: ['aspnet.http', 'aspnet.api'],
      tipo: 'atividade',
      atividade: {
        id: 'engenharia-ia-00-bases',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Associe cada termo ao que ele descreve numa loja que vende pelo navegador.',
        pares: [
          ['Status 404', 'Resposta HTTP informando que o pedido consultado não existe'],
          ['Método POST', 'Parte da requisição HTTP que indica criar um novo pedido'],
          ['"Cancelar pedido"', 'Uma das operações que a API de pedidos oferece'],
          ['Regra "só cancela antes do envio"', 'Condição que a API verifica antes de alterar o pedido']
        ],
        conceitos: ['engenharia-ia.http', 'engenharia-ia.api'],
        dicas: ['Separe o que é mensagem HTTP (método, status) do que é operação ou regra da API.', 'O status é sempre parte da resposta; o método, parte da requisição.'],
        explicacao: 'HTTP cuida do formato das mensagens; a API define quais operações existem; a regra de negócio decide se uma operação pode acontecer.'
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Da necessidade à decisão técnica',
      blocos: [
        { tipo: 'conceito', id: 'engenharia-ia.decisoes', titulo: 'Decisão técnica', texto: 'Uma decisão técnica liga um requisito observável a uma solução e registra seus custos. Um critério de aceitação descreve como verificar o resultado.', exemplo: 'Requisito: "pedido enviado não pode ser cancelado". Critério: cancelar um pedido enviado devolve erro e o estado continua "enviado".' },
        { tipo: 'texto', texto: '**Por que existe:** a equipe recebe o pedido "crie um sistema de pedidos". Começar escolhendo bibliotecas deixa sem resposta quem pode cancelar, quando o estoque muda e o que acontece se o pagamento falhar.' },
        { tipo: 'texto', texto: '**Fluxo:** identificar usuário e regra, descrever entradas e falhas, definir a evidência de sucesso, escolher a solução mais simples que atende e registrar a alternativa descartada com o custo.' },
        { tipo: 'texto', texto: '**Quando evitar:** para uma página estática de apresentação, API e banco seriam custo sem benefício. Para pedidos compartilhados e persistentes, são responsabilidades reais.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'engenharia-ia-00-decisao',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'A IA gerou uma API de pedidos que compila e responde 200 ao cancelar. Na demonstração, um pedido já enviado aparece como cancelado.',
        enunciado: 'Qual é o próximo passo mais adequado?',
        opcoes: [
          'Escrever a regra e um teste que tenta cancelar um pedido enviado, para só então corrigir',
          'Considerar a entrega pronta, pois o projeto compila e o status HTTP é 200',
          'Pedir à IA mais camadas e arquivos para deixar a estrutura mais organizada',
          'Esconder o botão de cancelar na tela para pedidos com status enviado'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Compilar prova sintaxe válida, não que a regra de negócio é respeitada.',
          2: 'Mais camadas não definem o que deve acontecer com um pedido enviado.',
          3: 'Esconder o botão ajuda o usuário, mas qualquer cliente HTTP ainda pode chamar a API; a regra precisa existir no servidor.'
        },
        dicas: ['O defeito é uma regra de negócio violada, não um erro de compilação.', 'Antes de corrigir, como você provaria que o defeito existe e que sumiu depois?'],
        explicacao: 'Primeiro registre a regra e um teste que falha; depois corrija. Teste também um pedido que pode ser cancelado, para não proibir tudo.',
        conceitos: ['engenharia-ia.decisoes']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Orientar e revisar a IA',
      blocos: [
        { tipo: 'texto', texto: '**Como pedir:** descreva o serviço de pedidos com cancelamento antes do envio; liste as regras, os estados inválidos, os dados sensíveis, as alternativas e os testes de aceitação; peça as hipóteses antes do código e não deixe a IA inventar requisitos.' },
        { tipo: 'texto', texto: '**Como validar:** confira autorização, persistência e concorrência. Rode o caso de sucesso e cada caso proibido, comparando o estado salvo antes e depois. Uma mensagem de sucesso, sozinha, não é evidência.' },
        { tipo: 'vida-real', emoji: '📝', titulo: '"Quero cancelar pedido fácil", disse o gerente', texto: 'O gerente pede cancelamento de pedido "fácil", e isso ainda não é uma regra. Você transforma o pedido em regras (só antes do envio), falhas (pedido já enviado) e critérios de aceitação, pede o código com testes à IA e confere que o teste falha quando a regra é violada.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'engenharia-ia-00-revisao',
        tipo: 'explain',
        dimensao: 'construcao',
        enunciado: 'No cenário do cancelamento, explique como você confirmaria que a correção funciona.',
        pergunta: 'Que testes você rodaria e o que compararia para saber se o pedido enviado continua protegido?',
        criterios: [
          'Citar um teste que tenta cancelar um pedido já enviado e deve ser recusado.',
          'Citar um teste de cancelamento permitido, para não bloquear tudo.',
          'Dizer que compara o estado salvo (status do pedido) antes e depois.'
        ],
        palavrasChave: [
          ['enviado', 'enviada', 'já enviou'],
          ['status', 'estado', 'persistido', 'salvo', 'banco'],
          ['recus', 'negad', 'bloquei', 'impedi']
        ],
        minimoChaves: 3,
        exemplo: 'Eu criaria dois pedidos: um ainda não enviado e outro já enviado. Cancelar o primeiro deve funcionar e mudar o status; cancelar o segundo deve ser recusado e o status gravado no banco precisa continuar igual ao de antes da tentativa.',
        explicacao: 'A evidência é a comparação do estado antes e depois, nos dois casos: o permitido muda, o proibido não.',
        dicas: ['Pense em dois pedidos diferentes, um para cada resultado esperado.', 'O que mudou (ou não mudou) no pedido depois da tentativa?'],
        conceitos: ['engenharia-ia.decisoes']
      }
    }
  ]
});
