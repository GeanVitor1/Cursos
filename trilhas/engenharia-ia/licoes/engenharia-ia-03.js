Plataforma.registrarLicao({
  id: 'engenharia-ia-03',
  trilha: 'engenharia-ia',
  tipo: 'licao',
  titulo: 'Revisar, testar e depurar código gerado',
  duracaoMin: 25,
  xp: 30,
  objetivos: [
    'Diferenciar teste unitário, teste de integração e mock',
    'Perceber quando um teste só verifica o status 200 e não prova a regra de negócio',
    'Depurar em ciclo: reproduzir, observar, levantar hipótese, mudar uma causa e repetir o teste'
  ],
  conceitos: ['engenharia-ia.mock', 'engenharia-ia.validacao'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O que é um mock',
      blocos: [
        { tipo: 'conceito', id: 'engenharia-ia.mock', titulo: 'Mock', texto: 'Um mock é um substituto controlado de uma dependência, usado em teste para isolar a regra que se quer verificar. Ele simula, por exemplo, o banco, mas não comprova que o banco real funciona.', exemplo: 'No teste do cancelamento, um repositório falso devolve um pedido "enviado" sem abrir conexão com o banco.' },
        { tipo: 'glossario', titulo: 'Termos desta etapa', itens: [
          ['asserção', 'comparação do teste', 'A linha do teste que compara o resultado obtido com o esperado e falha se forem diferentes.'],
          ['teste unitário', 'regra isolada', 'Testa uma regra com entradas e saídas claras, normalmente usando mocks.'],
          ['teste de integração', 'componentes reais juntos', 'Testa a colaboração com peças reais, como o banco de testes.']
        ] }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'engenharia-ia-03-bases',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Associe cada recurso de teste ao que ele permite verificar no cancelamento de pedidos.',
        pares: [
          ['Teste unitário', 'A regra "pedido enviado não cancela" com entradas e saídas conhecidas'],
          ['Teste de integração', 'Que o status gravado no banco de testes mudou de fato após cancelar'],
          ['Mock', 'Simular o repositório para o teste não depender do banco real'],
          ['Asserção', 'Comparar o status obtido com o esperado e falhar se forem diferentes']
        ],
        conceitos: ['engenharia-ia.mock'],
        dicas: ['O que cada recurso isola, e o que ele prova de verdade?', 'Um mock simula; só o teste de integração usa a peça real.'],
        explicacao: 'Unitário isola a regra, integração usa componentes reais, mock substitui uma dependência e a asserção é onde o teste decide passar ou falhar.'
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Revisar, testar e depurar código gerado',
      blocos: [
        { tipo: 'conceito', id: 'engenharia-ia.validacao', titulo: 'Teste como evidência', texto: 'Um teste compara o comportamento observado com um resultado esperado. Testes unitários isolam regras; testes de integração verificam a colaboração com componentes reais, como o banco de testes.', exemplo: 'Cancelar o pedido 7 e conferir no banco de testes que o status virou "cancelado".' },
        { tipo: 'texto', texto: '**Risco:** se a IA escreve a implementação e os testes com a mesma hipótese errada, os dois concordam com o erro e tudo fica verde.' },
        { tipo: 'texto', texto: '**Quando usar cada um:** teste unitário para regras claras; integração para persistência, consultas e transações; fluxo de navegador para a jornada. Não use banco de produção para testes destrutivos e não meça qualidade só por cobertura.' },
        { tipo: 'texto', texto: '**Depurar:** reproduza a falha no menor caso, observe estado e logs, formule uma hipótese, altere uma causa de cada vez e repita o caso e um caso vizinho. Revise o diff, as dependências e os erros tratados antes de aceitar.' },
        { tipo: 'trabalho', texto: 'Um teste de cancelamento que só procura a palavra "sucesso" na resposta deixa passar um serviço que não salva nada. Ele precisa verificar o estado persistido e provar que um usuário sem permissão não altera o pedido.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'engenharia-ia-03-decisao',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'A IA gerou o código de cancelamento e os testes. Todos passam, mas cada um só confere que a resposta tem status 200.',
        enunciado: 'O que falta nesses testes?',
        opcoes: [
          'Verificar o estado gravado, a recusa de casos proibidos e as falhas relevantes',
          'Repetir a verificação do status 200 em mais endpoints para aumentar a cobertura',
          'Trocar os testes por mocks que sempre devolvem sucesso, para não falharem',
          'Remover os testes de integração, porque dependem do banco e podem falhar'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Mais verificações do mesmo status aumentam a cobertura, mas continuam sem provar a regra.',
          2: 'Um mock que sempre devolve sucesso nunca detecta o defeito; ele só esconde o problema.',
          3: 'Os testes de integração são justamente os que mostram se o dado foi gravado; podem falhar porque revelam defeitos.'
        },
        dicas: ['Um serviço que não gravasse nada faria esses testes falharem?', 'Pense no que mudaria no banco depois de um cancelamento correto.'],
        explicacao: 'Uma boa asserção separa uma implementação correta de uma que só retorna sucesso: confira o estado persistido e os casos recusados.',
        conceitos: ['engenharia-ia.validacao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Orientar e revisar a IA',
      blocos: [
        { tipo: 'texto', texto: '**Como pedir:** a partir destas regras, escreva testes de comportamento independentes da implementação, cobrindo sucesso, usuário sem permissão, pedido enviado e falha de persistência. Explique o que é mock e o que é real, e não consulte dados de produção.' },
        { tipo: 'texto', texto: '**Como validar:** leia as asserções e pergunte se falhariam caso a implementação não salvasse nada. Rode o teste antes da correção (deve falhar) e depois (deve passar). Revise se erros e logs expõem tokens ou dados pessoais.' },
        { tipo: 'vida-real', emoji: '🚚', titulo: 'Testar o cálculo de frete sem chamar o serviço externo', texto: 'O frete depende de um serviço externo, que você não quer chamar a cada teste. Com um mock no lugar dele, o teste de unidade confere o cálculo e, quando algo falha, você depura em ciclo: reproduzir, observar, levantar uma hipótese, mudar uma causa e repetir o teste.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'engenharia-ia-03-revisao',
        tipo: 'explain',
        dimensao: 'construcao',
        enunciado: 'A IA entregou o teste de cancelamento e a correção de um defeito. Você vai revisar antes de aceitar.',
        pergunta: 'O que você conferiria no teste e na ordem de execução para ter evidência de que o defeito foi corrigido?',
        criterios: [
          'Rodar o teste antes da correção e ver que ele falha.',
          'Rodar de novo depois da correção e ver que ele passa.',
          'Verificar se a asserção falharia caso nada fosse salvo, conferindo o estado gravado.'
        ],
        palavrasChave: [
          ['antes', 'falha', 'falhar', 'falhou', 'vermelho'],
          ['depois', 'passa', 'passar', 'passou', 'verde'],
          ['asserção', 'asserções', 'estado', 'gravado', 'salvo', 'persistido']
        ],
        minimoChaves: 3,
        exemplo: 'Executaria o teste com o código antigo, para ter certeza de que ele realmente quebra. Depois da correção, rodaria de novo e esperaria que ele passasse. E leria a asserção para saber se ela olha o que ficou salvo, em vez de só o texto da resposta.',
        explicacao: 'Ver o teste falhar antes e passar depois mostra que ele detecta o defeito; olhar o estado salvo mostra que ele mede a regra, não só a resposta.',
        dicas: ['Um teste que nunca falhou não prova nada: quando ele deve ficar vermelho e quando verde?', 'Olhe para dentro da asserção: o que ela compara?'],
        conceitos: ['engenharia-ia.validacao']
      }
    }
  ]
});
