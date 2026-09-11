Plataforma.registrarLicao({
  id: 'csharp-09',
  trilha: 'csharp',
  tipo: 'licao',
  titulo: 'async e await: sem travar a aplicação',
  subtitulo: 'C# · Etapa 9',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Entender por que operações demoradas não podem travar a aplicação',
    'Ler async, await e Task<T>',
    'Reconhecer a forma de um método assíncrono'
  ],
  conceitos: ['csharp.async', 'csharp.metodos'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O problema: esperar parado',
      introduz: ['csharp.async'],
      blocos: [
        { tipo: 'texto', texto: 'Salvar no banco, chamar outro serviço ou ler um arquivo são operações **demoradas**. Se o código esperar parado até terminar, a aplicação fica travada para todo mundo.' },
        { tipo: 'diagrama', arte: 'SEM async (síncrono)\nUsuário A ──► [espera banco 2s] ──► resposta\nUsuário B ────────► (travado esperando)' },
        { tipo: 'texto', texto: 'A solução do .NET é o modelo **assíncrono**: a operação demorada começa, e o código **aguarda sem bloquear** — podendo atender outras requisições enquanto isso.' },
        { tipo: 'diagrama', arte: 'COM async (assíncrono)\nUsuário A ──► inicia banco ──┐\nUsuário B ──► atende ────────┤ (enquanto A espera)\nUsuário A ◄── banco concluiu ┘' },
        { tipo: 'nota', tom: 'info', texto: 'Pense em um garçom: ele anota o pedido, entrega na cozinha e atende outras mesas enquanto o prato fica pronto. Ele não fica parado olhando a panela.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'As três peças: async, Task e await',
      blocos: [
        { tipo: 'texto', texto: 'Vamos começar com uma operação demorada simples: `Task.Delay`, que apenas espera um tempo antes de continuar (`Delay` = atraso/espera).' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'public async Task<string> ObterConfirmacaoAsync()\n{\n    await Task.Delay(1000); // espera 1 segundo, sem travar\n    return "Pedido confirmado";\n}' },
        { tipo: 'diagrama', arte: 'public async Task<string> ObterConfirmacaoAsync()\n   │       │               │\n   │       │               └─ nome termina em Async (convenção)\n   │       └─ Task<string> = "operação que devolverá um texto no futuro"\n   └─ async avisa: este método pode aguardar operações demoradas' },
        { tipo: 'lista', itens: [
          '`async` marca o método como assíncrono.',
          '`Task` representa a operação em andamento. Quando ela termina, entregue um resultado.',
          '`Task<string>` é uma operação que, ao terminar, entrega um `string`.',
          '`await` espera o resultado **sem bloquear** a aplicação.'
        ] },
        { tipo: 'nota', tom: 'atencao', texto: 'Métodos assíncronos sem resultado usam só `Task`; métodos com resultado usam `Task<string>`, `Task<Produto>` etc.' },
        { tipo: 'nota', tom: 'atencao', texto: '`await` só pode ser usado dentro de um método marcado com `async`.' },
        { tipo: 'futuro', conceitos: ['ef.dbcontext', 'ef.dbset', 'ef.consultas'], texto: 'Guardou a ideia de `async` e `await`? Na trilha de Entity Framework você vai ver `await context.Produtos.ToListAsync()`: é exatamente este mesmo mecanismo aplicado a consultas no banco. Lá explicaremos `context`, `DbSet` e `ToListAsync` com calma.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs09-a1',
        tipo: 'interpret-code',
        dimensao: 'reconhecimento',
        enunciado: 'O que este método promete?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'public async Task<string> ObterMensagemAsync()\n{\n    await Task.Delay(1000);\n    return "Olá";\n}' }
        ],
        opcoes: [
          'Uma operação assíncrona que, ao terminar, devolve um texto',
          'Uma operação que devolve uma lista de textos',
          'Uma operação síncrona que trava a aplicação',
          'Uma operação que não devolve nada'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Lista seria `Task<List<string>>`; aqui o retorno é `Task<string>`.',
          2: 'O `async`/`await` indicam espera sem bloqueio.',
          3: 'Há um retorno `Task<string>` com um `return`.'
        },
        dicas: ['Leia o tipo de retorno `Task<string>`.', 'O `return` devolve um texto.'],
        explicacao: '`async` + `await` + `Task<string>`: a operação demora (1 segundo), não trava a aplicação e ao final entrega "Olá".',
        conceitos: ['csharp.async']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs09-a2',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete para declarar o método como assíncrono e aguardar a operação demorada.',
        codigo: 'public {{1}} Task EnviarAsync(string email)\n{\n    Console.WriteLine("Enviando...");\n    {{2}} Task.Delay(2000);\n    Console.WriteLine("Enviado");\n}',
        lacunas: [['async'], ['await']],
        dicas: ['A palavra que marca o método como assíncrono.', 'A palavra que aguarda sem bloquear.'],
        explicacao: '`async Task` para métodos sem retorno; `await` aguarda a conclusão. Esse par aparece em todo código que espera banco, arquivo ou rede.',
        conceitos: ['csharp.async']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs09-a3',
        tipo: 'predict-output',
        dimensao: 'reconhecimento',
        enunciado: 'Qual é a ordem das mensagens exibidas?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'Console.WriteLine("A");\nawait Task.Delay(1000);\nConsole.WriteLine("B");' }
        ],
        opcoes: [
          'A, depois B — B só aparece quando a espera termina',
          'B, depois A',
          'A e B ao mesmo tempo',
          'Apenas A'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O await pausa este método até a operação terminar; A já foi impresso antes.',
          2: 'O código é sequencial dentro do método.',
          3: 'B é impresso após a espera concluir.'
        },
        dicas: ['O await espera a operação terminar antes de continuar.', 'Qual WriteLine vem primeiro no código?'],
        explicacao: '`await` pausa a continuação do método até a operação terminar. A ordem lógica A → espera → B é mantida, mas sem bloquear o restante da aplicação.',
        conceitos: ['csharp.async']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs09-a4',
        tipo: 'explain',
        dimensao: 'construcao',
        enunciado: 'Explique com suas palavras.',
        pergunta: 'Por que operações demoradas (como acessar o banco) são escritas com async/await em uma aplicação em vez de esperar parado?',
        criterios: [
          'Operações de banco demoram',
          'Sem async, a aplicação ficaria travada/esperando parada',
          'Com async/await, a aplicação atende outros acessos enquanto espera'
        ],
        palavrasChave: ['demor', 'esper', 'trav', 'bloque', 'atend', 'outras', 'outros', 'aces', 'livre', 'liber', 'concorr'],
        exemplo: 'Porque acessar o banco demora. Se o código esperasse parado, a aplicação ficaria travada e deixaria de atender outros acessos. Com async/await, ela continua livre para atender em concorrência e libera o processamento enquanto espera o resultado.',
        dicas: ['Pense em várias pessoas usando a aplicação ao mesmo tempo.', 'Quem espera parado não atende ninguém.'],
        explicacao: 'Assincronismo é o que permite uma aplicação web atender muitos usuários com o mesmo servidor enquanto operações demoradas acontecem.',
        conceitos: ['csharp.async'],
        desafio: true
      }
    }
  ]
});
