Plataforma.registrarLicao({
  id: 'sql-31',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Stored procedures e functions',
  subtitulo: 'Avançado · Etapa 37',
  duracaoMin: 60,
  xp: 30,
  objetivos: [
    'Guardar rotinas reutilizáveis com PROCEDURE',
    'Criar funções que devolvem valores com FUNCTION',
    'Decidir o que mora no banco e o que mora na aplicação'
  ],
  conceitos: ['sql.procedures', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Rotinas com nome',
      introduz: ['sql.procedures'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.views', texto: 'Views guardam consultas. Mas e uma rotina com passos, entradas e lógica? Para isso existem procedures e functions.' },
        { tipo: 'texto', texto: 'Uma **stored procedure** (procedimento guardado) é um bloco de comandos com nome, que recebe valores de entrada e é chamado quando precisa:' },
        { tipo: 'conceito', id: 'sql.procedures', titulo: 'Stored procedures e functions', texto: 'Rotinas guardadas no banco: procedures executam passos e functions devolvem valores.', exemplo: 'CREATE PROCEDURE ...' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'CREATE PROCEDURE BuscarPorCidade @Cidade VARCHAR(60)\nAS\nSELECT * FROM Clientes WHERE Cidade = @Cidade;'
        },
        { tipo: 'nota', tom: 'info', texto: 'O `@Cidade` é a entrada: quem chama informa o valor. A procedure roda a consulta com aquele filtro.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql31-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que uma stored procedure guarda no banco?',
        opcoes: [
          'Uma rotina nomeada com comandos e entradas',
          'Os dados resultantes de uma consulta',
          'Uma cópia das tabelas usadas',
          'Apenas a ordenação padrão das consultas'
        ],
        correta: 0,
        dicas: [
          'É código guardado, não dado.',
          'Pense numa receita com ingredientes (entradas).'
        ],
        explicacao: 'Procedure guarda a rotina; os dados continuam nas tabelas e são lidos a cada chamada.',
        conceitos: ['sql.procedures']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Functions devolvem valores',
      blocos: [
        { tipo: 'texto', texto: 'Enquanto a procedure executa passos, uma **function** (função) calcula e **devolve um valor**, podendo ser usada dentro de consultas:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'CREATE FUNCTION dbo.TotalDoPedido (@PedidoId INT)\nRETURNS DECIMAL(10,2)\nAS\nBEGIN\n  RETURN (SELECT SUM(Quantidade * PrecoUnitario)\n          FROM ItensPedido\n          WHERE PedidoId = @PedidoId);\nEND;\n\n-- Usando a função (note o prefixo dbo.):\nSELECT Id, dbo.TotalDoPedido(Id) AS Total\nFROM Pedidos;'
        },
        { tipo: 'nota', tom: 'info', texto: 'A função declara o tipo do valor calculado. Functions puras (só cálculo) são as mais seguras de usar.' },
        { tipo: 'trabalho', texto: 'Regras de cálculo repetidas em vários relatórios (desconto, imposto, conversão) costumam virar functions: um lugar só para corrigir quando a regra muda.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql31-a2',
        tipo: 'multiple-choice',
        enunciado: 'Qual é a diferença prática entre procedure e function?',
        opcoes: [
          'Function devolve um valor usável em consultas; procedure executa passos',
          'A procedure é sempre mais rápida do que qualquer function',
          'A function não consegue receber nenhum valor de entrada',
          'Não há diferença prática entre as duas no dia a dia'
        ],
        correta: 0,
        dicas: [
          'Pense no RETURNS.',
          'Uma calcula, a outra executa.'
        ],
        explicacao: 'Function = cálculo reutilizável dentro de consultas; procedure = rotina executada por chamada.',
        conceitos: ['sql.procedures']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql31-a3',
        tipo: 'fill-code',
        enunciado: 'Complete para criar a procedure de busca por cidade.',
        codigo: 'CREATE {{1}} BuscarPorCidade @Cidade VARCHAR(60)\nAS\nSELECT * FROM Clientes WHERE Cidade = @Cidade;',
        lacunas: [['procedure']],
        dicas: [
          'A palavra que nomeia a rotina.',
          'Nove letras.'
        ],
        explicacao: '`CREATE PROCEDURE nome ... AS ...`: rotina guardada com entrada.',
        conceitos: ['sql.procedures']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql31-a6',
        tipo: 'fill-code',
        enunciado: 'Complete a function que devolve o dobro de um valor.',
        codigo: 'CREATE {{1}} dbo.Dobro (@Valor INT)\n{{2}} INT\nAS\nBEGIN\n  RETURN @Valor * 2;\nEND;',
        lacunas: [
          ['function'],
          ['returns']
        ],
        dicas: [
          'A primeira lacuna é o tipo de objeto criado: uma rotina que devolve valor.',
          'A segunda lacuna declara o tipo do valor devolvido; a palavra termina em S.'
        ],
        explicacao: '`CREATE FUNCTION nome (@entradas) RETURNS tipo AS BEGIN ... RETURN valor; END;` — a function declara o tipo que devolve e usa RETURN.',
        conceitos: ['sql.procedures']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql31-a4',
        tipo: 'true-false',
        enunciado: 'Avalie as afirmações sobre rotinas no banco.',
        afirmacoes: [
          { texto: 'Procedures recebem valores informados por quem chama.', correta: true, explicacao: 'O @Cidade é preenchido na chamada.' },
          { texto: 'Functions podem ser usadas dentro de consultas por devolverem valores.', correta: true, explicacao: 'O RETURNS permite embutir o cálculo no SELECT.' },
          { texto: 'Toda regra de negócio deve morar em procedures.', correta: false, explicacao: 'Excesso de lógica no banco dificulta versionar e conferir; equilíbrio com a aplicação.' }
        ],
        dicas: [
          'As entradas chegam na chamada.',
          'Nem tudo pertence ao banco.'
        ],
        explicacao: 'Rotinas com entrada, funções com retorno — e bom senso sobre onde mora cada regra.',
        conceitos: ['sql.procedures'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Procedure',
      blocos: [
        { tipo: 'texto', texto: 'Três palavras para rotinas que economizam repetição: **procedure** (procedimento), **save** (salvar) e **time** (tempo).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (3)',
          pares: [
            ['procedure', 'procedimento'],
            ['save', 'salvar'],
            ['time', 'tempo']
          ]
        },
        { tipo: 'ingles', frase: 'Procedures save time.', traducao: 'Procedimentos economizam tempo.' },
        { tipo: 'nota', tom: 'info', texto: '**save time** = "economizar tempo": o motivo de guardar rotinas.' },
        { tipo: 'vida-real', emoji: '🌙', titulo: 'O fechamento do dia roda três comandos na mesma ordem toda noite', texto: 'Você guarda os três comandos em uma stored procedure chamada `FecharDia`. A operadora chama pelo nome e o banco executa tudo na ordem certa. Ninguém precisa copiar e colar os comandos, e ninguém esquece um deles.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql31-a5',
        tipo: 'write-code',
        enunciado: 'Procedures save time: crie a procedure **BuscarPorCidade**, com a entrada **@Cidade VARCHAR(60)**, que devolve os clientes da cidade informada.',
        placeholder: 'CREATE ...',
        respostasAceitas: [
          'CREATE PROCEDURE BuscarPorCidade @Cidade VARCHAR(60) AS SELECT * FROM Clientes WHERE Cidade = @Cidade;',
          'CREATE PROC BuscarPorCidade @Cidade VARCHAR(60) AS SELECT * FROM Clientes WHERE Cidade = @Cidade;',
          'CREATE PROCEDURE BuscarPorCidade @Cidade VARCHAR(60) AS BEGIN SELECT * FROM Clientes WHERE Cidade = @Cidade; END;',
          'CREATE PROCEDURE dbo.BuscarPorCidade @Cidade VARCHAR(60) AS SELECT * FROM Clientes WHERE Cidade = @Cidade;'
        ],
        dicas: [
          'CREATE PROCEDURE nome ... AS ...',
          'A entrada filtra a Cidade.'
        ],
        explicacao: 'Rotina nomeada com entrada, pronta para ser chamada.',
        conceitos: ['sql.procedures', 'sql.ingles']
      }
    }
  ]
});
