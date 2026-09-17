Plataforma.registrarLicao({
  id: 'sql-11',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Alterando dados com UPDATE',
  subtitulo: 'Iniciante · Etapa 6',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Alterar valores existentes com UPDATE e SET',
    'Usar WHERE para atingir apenas as linhas certas',
    'Reconhecer o perigo de um UPDATE sem condição'
  ],
  conceitos: ['sql.update', 'sql.where', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Saindo da leitura',
      introduz: ['sql.update'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.comandos-sql', texto: 'Até agora tudo que você escreveu foi leitura: `SELECT` com `WHERE`, `ORDER BY`, `DISTINCT`, `TOP`. Agora o SQL vai **alterar** dados.' },
        { tipo: 'texto', texto: 'O `UPDATE` (atualize) muda valores de linhas que já existem. Ele precisa de duas partes: o `SET` com os novos valores e o `WHERE` dizendo quem será alterado:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'UPDATE Produtos\nSET Preco = 120\nWHERE Id = 1;',
          legenda: 'O produto de Id 1 passa a custar 120.'
        },
        { tipo: 'conceito', id: 'sql.update', titulo: 'UPDATE', texto: 'Altera valores de linhas existentes. SET define os novos valores; WHERE escolhe as linhas.', exemplo: 'UPDATE Produtos SET Preco = 120 WHERE Id = 1;' },
        { tipo: 'nota', tom: 'atencao', texto: 'Sem `WHERE`, o `UPDATE` percorre a **tabela inteira** e altera todas as linhas. É o erro mais caro de quem está começando.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql11-a1',
        tipo: 'multiple-choice',
        enunciado: 'Qual consulta altera **somente** o produto de Id 7?',
        opcoes: [
          'UPDATE Produtos SET Preco = 99 WHERE Id = 7;',
          'UPDATE Produtos SET Preco = 99;',
          'SELECT Preco WHERE Id = 7;',
          'UPDATE Id = 7 SET Preco = 99;'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Sem WHERE, todos os produtos teriam o preço alterado.',
          2: 'SELECT apenas lê; não altera nada.',
          3: 'O UPDATE recebe a tabela, não o Id.'
        },
        dicas: [
          'Quem escolhe a linha é o WHERE.',
          'A ordem é UPDATE tabela SET coluna = valor WHERE condição.'
        ],
        explicacao: '`UPDATE Produtos SET Preco = 99 WHERE Id = 7;` altera uma única linha, identificada pela chave primária.',
        conceitos: ['sql.update', 'sql.where']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Mais de uma coluna',
      blocos: [
        { tipo: 'texto', texto: 'O `SET` aceita várias colunas, separadas por vírgula, cada uma com seu novo valor:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'UPDATE Produtos\nSET Preco = 99.9, Estoque = 0\nWHERE Id = 7;',
          legenda: 'Duas colunas alteradas na mesma linha.'
        },
        { tipo: 'nota', tom: 'info', texto: 'Sempre que possível, filtre o `UPDATE` pela **chave primária**. Ela identifica exatamente uma linha, sem risco de atingir outras.' },
        { tipo: 'trabalho', texto: 'Alterar dados de verdade no banco é operação sensível: o caminho profissional é rodar um `SELECT` com o mesmo `WHERE` primeiro, conferir as linhas que aparecem e só então trocar por `UPDATE`.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql11-a2',
        tipo: 'fill-code',
        enunciado: 'Complete para zerar o estoque do produto de **Id 7**.',
        codigo: 'UPDATE Produtos\nSET Estoque = 0\nWHERE Id = {{1}};',
        lacunas: [['7']],
        dicas: [
          'O WHERE escolhe a linha pela chave primária.',
          'É o número do produto.'
        ],
        explicacao: '`WHERE Id = 7` atinge exatamente a linha do produto 7. Sem esse filtro, o estoque de todos os produtos seria zerado.',
        conceitos: ['sql.update', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql11-a3',
        tipo: 'find-error',
        enunciado: 'Esta consulta passou pela revisão e foi **recusada**. Por quê?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'UPDATE Produtos\nSET Estoque = 0;' }
        ],
        opcoes: [
          'Falta o WHERE: a consulta zeraria o estoque de todos os produtos',
          'O SET deveria vir antes do UPDATE',
          'Estoque = 0 precisa de aspas',
          'Nada — a consulta está correta'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A ordem correta é UPDATE ... SET ... WHERE; o SET já está no lugar certo.',
          2: 'Estoque é número: zero entra sem aspas mesmo.',
          3: 'Sem WHERE não existe "só um produto": a tabela inteira seria alterada.'
        },
        dicas: [
          'Compare com o UPDATE seguro da etapa anterior.',
          'O que acontece quando não existe condição?'
        ],
        explicacao: 'Sem `WHERE`, o `UPDATE` altera todas as linhas da tabela. Em revisão de código, esse erro é bloqueio imediato.',
        conceitos: ['sql.update', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql11-a4',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que atualiza o preço do produto de **Id 3** para **250**.',
        respostasAceitas: [
          'update produtos set preco = 250 where id = 3'
        ],
        dicas: [
          'UPDATE tabela SET coluna = valor WHERE condição.',
          'Filtre pela chave primária Id.'
        ],
        explicacao: '`UPDATE Produtos SET Preco = 250 WHERE Id = 3;` — uma coluna, uma linha, sem risco para o resto da tabela.',
        conceitos: ['sql.update', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql11-a5',
        tipo: 'scenario',
        enunciado: 'O suporte pediu para marcar o pedido 183 como "Pago". Qual é a sequência mais segura?',
        cena: 'A tabela Pedidos tem Id, Status e ValorTotal. O pedido 183 existe e o pagamento acabou de ser confirmado.',
        opcoes: [
          'Rodar SELECT * FROM Pedidos WHERE Id = 183; conferir e depois UPDATE Pedidos SET Status = \'Pago\' WHERE Id = 183;',
          'Rodar UPDATE Pedidos SET Status = \'Pago\'; e conferir depois.',
          'Apagar o pedido 183 do banco e cadastrá-lo de novo com Status Pago.',
          'Alterar direto no banco sem consulta alguma, porque o Id é conhecido.'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Sem WHERE, todos os pedidos viram Pago: um estrago grande para uma tarefa pequena.',
          2: 'Apagar e reinserir perde histórico e pode quebrar vínculos com outras tabelas.',
          3: 'Conferir antes é o que separa operação segura de incidente.'
        },
        dicas: [
          'Confira antes de alterar.',
          'O mesmo WHERE serve para consultar e para alterar.'
        ],
        explicacao: 'O fluxo profissional é consultar com o mesmo filtro, conferir as linhas e só então alterar. O `WHERE Id = 183` garante uma única linha.',
        conceitos: ['sql.update', 'sql.where'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Change the price',
      blocos: [
        { tipo: 'texto', texto: 'Três palavras úteis para pedir alterações: **change** (mudar), **price** (preço) e **to** (para).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (3)',
          pares: [
            ['change', 'mudar / alterar'],
            ['price', 'preço'],
            ['to', 'para']
          ]
        },
        { tipo: 'ingles', frase: 'Change the price to 250.', traducao: 'Altere o preço para 250.' },
        { tipo: 'nota', tom: 'info', texto: '**change the price to 250** = "altere o preço para 250" — o verbo que o `UPDATE` executa em inglês.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql11-a6',
        tipo: 'write-code',
        enunciado: 'Change the price to 250 where Id = 7.',
        placeholder: 'UPDATE ...',
        respostasAceitas: [
          'update produtos set preco = 250 where id = 7'
        ],
        dicas: [
          'change the price = altere o preço.',
          'where Id = 7 = no produto de Id 7.'
        ],
        explicacao: 'Traduzindo: "change the price to 250 where Id = 7" = altere o preço para 250 no produto de Id 7. `UPDATE Produtos SET Preco = 250 WHERE Id = 7;`.',
        conceitos: ['sql.update', 'sql.where', 'sql.ingles']
      }
    }
  ]
});
