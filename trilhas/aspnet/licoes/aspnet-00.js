Plataforma.registrarLicao({
  id: 'aspnet-00',
  trilha: 'aspnet',
  tipo: 'licao',
  titulo: 'Como a web funciona: request e response',
  subtitulo: 'ASP.NET · Etapa 0',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Entender o modelo cliente-servidor',
    'Reconhecer request, response, método HTTP e URL',
    'Saber o que cada status code comunica'
  ],
  conceitos: ['aspnet.http', 'aspnet.requisicao', 'aspnet.resposta', 'aspnet.status'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Duas partes conversando',
      introduz: ['aspnet.http', 'aspnet.requisicao', 'aspnet.resposta', 'aspnet.api'],
      blocos: [
        { tipo: 'retoma', conceito: 'ef.dbset', texto: 'Você já sabe ler e gravar no banco pela sua aplicação. Agora a aplicação vai **responder a outros programas** — é aí que entra a web.' },
        { tipo: 'texto', texto: 'Toda aplicação web funciona como uma conversa: o **cliente** (navegador, app, outro sistema) faz um pedido, e o **servidor** responde. A conversa segue um protocolo chamado **HTTP** (HyperText Transfer Protocol — o protocolo de comunicação da web).' },
        { tipo: 'conceito', id: 'aspnet.http', titulo: 'HTTP', texto: 'O protocolo de comunicação da web: o cliente pede (requisição) e o servidor responde (resposta).', exemplo: 'GET /api/produtos/10' },
        { tipo: 'conceito', id: 'aspnet.requisicao', titulo: 'Requisição (request)', texto: 'O pedido que o cliente envia ao servidor.', exemplo: 'GET /api/produtos/10' },
        { tipo: 'conceito', id: 'aspnet.resposta', titulo: 'Resposta (response)', texto: 'O que o servidor devolve ao cliente: os dados + um código que resume o resultado.', exemplo: '200 OK com os dados do produto.' },
        { tipo: 'texto', texto: 'O servidor que expõe esses endereços é a sua **API** (Application Programming Interface — interface de programação de aplicações): um conjunto de endereços que outros programas chamam para obter ou enviar dados.' },
        { tipo: 'conceito', id: 'aspnet.api', titulo: 'API', texto: 'Um conjunto de endereços que outros programas chamam para obter ou enviar dados.', exemplo: 'A API de produtos responde em /api/produtos.' },
        { tipo: 'diagrama', arte: 'CLIENTE                              SERVIDOR (sua API)\n   │                                      │\n   │  GET /api/produtos/10   ──────────►  │\n   │                                      │ consulta o banco\n   │  ◄──────────  200 OK + dados         │\n   │                                      │' },
        { tipo: 'trabalho', texto: 'Quando a interface do usuário (a tela) "não carrega os dados", o problema pode estar no cliente, na API ou no banco. Entender requisição e resposta é o primeiro passo para investigar.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Toda requisição tem um método e um endereço',
      blocos: [
        { tipo: 'texto', texto: 'O **método HTTP** diz qual ação o cliente quer executar. Ele se conecta direto com o CRUD que você aprendeu no SQL:' },
        { tipo: 'tabela', titulo: 'Métodos HTTP × CRUD × SQL', colunas: ['HTTP', 'Ação', 'SQL equivalente'], linhas: [
          ['GET', 'Consultar', 'SELECT'],
          ['POST', 'Criar', 'INSERT'],
          ['PUT / PATCH', 'Atualizar', 'UPDATE'],
          ['DELETE', 'Excluir', 'DELETE']
        ] },
        { tipo: 'texto', texto: 'O **endereço** (URL — Uniform Resource Locator, o endereço de um recurso na web) aponta para o recurso. Em `/api/produtos/10`, a parte `/api/produtos` identifica a coleção e `10` identifica um produto.' },
        { tipo: 'codigo', linguagem: 'http', codigo: 'GET /api/produtos/10 HTTP/1.1\nHost: minhaloja.com' },
        { tipo: 'nota', tom: 'info', texto: 'A primeira linha e os cabeçalhos (como `Host:`) fazem parte da requisição. Você não precisa decorá-los agora — basta reconhecer o método e o endereço.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'api00-a1',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada método HTTP à ação que ele representa.',
        pares: [
          ['GET', 'Consultar dados'],
          ['POST', 'Criar um registro'],
          ['PUT', 'Atualizar um registro'],
          ['DELETE', 'Excluir um registro']
        ],
        dicas: ['GET é o mesmo "pegar" do inglês.', 'POST cria; DELETE exclui.'],
        explicacao: 'Você já conhecia essa correspondência pelo CRUD do SQL. Agora ela tem os nomes que aparecem nas APIs.',
        conceitos: ['aspnet.http']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'A resposta conta o que aconteceu',
      introduz: ['aspnet.status'],
      blocos: [
        { tipo: 'texto', texto: 'Junto com os dados, o servidor devolve um **status code** (código de status): um número que resume o resultado. Os mais comuns:' },
        { tipo: 'tabela', titulo: 'Status codes do dia a dia', colunas: ['Código', 'Significado', 'Quando aparece'], linhas: [
          ['200', 'OK', 'Consulta ou atualização bem-sucedida'],
          ['201', 'Created', 'Um novo recurso foi criado (POST)'],
          ['204', 'No Content', 'Deu certo e não há conteúdo para devolver (DELETE)'],
          ['400', 'Bad Request', 'O cliente enviou dados inválidos'],
          ['404', 'Not Found', 'O recurso pedido não existe'],
          ['500', 'Internal Server Error', 'A API quebrou (erro não tratado)']
        ] },
        { tipo: 'nota', tom: 'atencao', texto: '404 não é erro da API: é uma resposta correta para "não existe". Já o 500 normalmente indica que algo deveria ser tratado e não foi.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'api00-a2',
        tipo: 'predict-output',
        dimensao: 'reconhecimento',
        enunciado: 'O cliente pediu `GET /api/produtos/99`, mas não existe produto com Id 99. Qual status é o correto?',
        opcoes: ['404 Not Found', '200 OK', '500 Internal Server Error', '201 Created'],
        correta: 0,
        feedbackErro: {
          1: '200 significa sucesso com conteúdo; não há produto para devolver.',
          2: '500 é falha inesperada da API. Aqui o sistema funcionou: o recurso é que não existe.',
          3: '201 é para criação, não para consulta.'
        },
        dicas: ['O recurso não existe.', 'Existe um código específico para "não encontrado".'],
        explicacao: 'A resposta correta é 404: a requisição foi válida, mas o recurso não existe. Isso orienta o cliente do jeito certo.',
        conceitos: ['aspnet.status']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O corpo da requisição',
      blocos: [
        { tipo: 'texto', texto: 'Nas requisições GET, o cliente só pede dados. Para **criar** ou **atualizar**, ele também envia informações — e essas informações viajam no **corpo** da requisição. É o caso do POST: o endereço é `/api/produtos` e o corpo leva os dados do novo produto.' },
        { tipo: 'futuro', conceitos: ['aspnet.json'], titulo: 'Prévia: o formato do corpo', texto: 'No exemplo abaixo, o corpo está em **JSON** — um texto com pares "chave": valor. Você vai estudá-lo na próxima lição; por enquanto, basta saber que o corpo leva os dados enviados, como no POST.' },
        { tipo: 'codigo', linguagem: 'http', codigo: 'POST /api/produtos\nCorpo:\n{\n  "nome": "Mouse",\n  "preco": 100.00\n}' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'api00-a3',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete a requisição para criar um novo produto.',
        codigo: '{{1}} /api/produtos\nCorpo: um corpo com nome e preço do produto',
        lacunas: [['post', 'POST']],
        dicas: ['Criar registro usa o método de inserção.', 'São quatro letras maiúsculas.'],
        explicacao: 'POST é o método que envia dados no corpo da requisição para criar um recurso.',
        conceitos: ['aspnet.http']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'api00-a4',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'O aplicativo cliente envia um cadastro com preço negativo. A API recebe o POST e grava o produto mesmo assim. O cliente reclama que o catálogo exibe dados impossíveis.',
        enunciado: 'Qual é o problema e como a API deveria responder?',
        opcoes: [
          'A API deveria validar os dados e responder 400, informando qual campo é inválido',
          'Deveria responder 500, porque houve erro',
          'Deveria ignorar a requisição sem responder nada',
          'Deveria gravar mesmo assim e corrigir depois'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Não foi falha inesperada: os dados são inválidos. O status certo é 400.',
          2: 'Toda requisição precisa de resposta; silêncio deixa o cliente travado.',
          3: 'Corrigir depois significa dado inválido no ambiente real.'
        },
        dicas: ['O cliente enviou algo inválido.', 'Existe status para requisição inválida.'],
        explicacao: 'Validar na entrada e responder 400 é mais barato e mais seguro do que consertar dados corrompidos depois. Você vai implementar isso na trilha.',
        conceitos: ['aspnet.status', 'aspnet.http']
      }
    }
  ]
});
