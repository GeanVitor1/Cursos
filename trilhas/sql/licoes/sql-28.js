Plataforma.registrarLicao({
  id: 'sql-28',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Funções de string',
  subtitulo: 'Intermediário · Etapa 33',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Padronizar textos com UPPER, LOWER e TRIM',
    'Medir e recortar com LEN e SUBSTRING',
    'Juntar e trocar trechos com CONCAT, REPLACE e CAST'
  ],
  conceitos: ['sql.strings', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Texto também se calcula',
      introduz: ['sql.strings'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.datas', texto: 'Datas têm funções próprias. Textos também: padronizar, medir, recortar e juntar.' },
        { tipo: 'texto', texto: '`UPPER` (maiúsculas) e `LOWER` (minúsculas) padronizam a caixa do texto — útil para comparar sem depender de digitação:' },
        { tipo: 'conceito', id: 'sql.strings', titulo: 'Funções de string', texto: 'UPPER e LOWER mudam a caixa; LEN mede o tamanho; SUBSTRING recorta; CONCAT junta; REPLACE troca trechos; TRIM remove espaços das bordas; CAST converte tipos.', exemplo: "SELECT UPPER(Nome) FROM Clientes;" },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT UPPER(Nome) AS NomePadrao\nFROM Clientes;'
        },
        { tipo: 'nota', tom: 'info', texto: 'Comparar `UPPER(Email)` dos dois lados evita que "Ana@Email.com" e "ana@email.com" pareçam diferentes.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql28-a1',
        tipo: 'multiple-choice',
        enunciado: 'Para que serve `LOWER(Email)` numa comparação?',
        opcoes: [
          'Padronizar a caixa, comparando sem depender da digitação',
          'Apagar o e-mail da tabela depois da comparação',
          'Ordenar os e-mails em ordem alfabética crescente',
          'Remover os espaços do começo e do fim do e-mail'
        ],
        correta: 0,
        dicas: [
          'LOWER devolve minúsculas.',
          'Espaços são trabalho do TRIM.'
        ],
        explicacao: 'Comparar tudo em minúsculas elimina diferenças só de caixa alta.',
        conceitos: ['sql.strings']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Medir e recortar',
      blocos: [
        { tipo: 'texto', texto: '`LEN` (tamanho) mede quantos caracteres há; `SUBSTRING` (subtexto) recorta um pedaço:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Nome, LEN(Nome) AS Tamanho\nFROM Clientes\nWHERE LEN(Nome) > 10;'
        },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: "SELECT SUBSTRING(Nome, 1, 3) AS Iniciais\nFROM Clientes;"
        },
        { tipo: 'nota', tom: 'info', texto: '`SUBSTRING(Nome, 1, 3)` pega da posição 1 (a primeira letra) os 3 caracteres seguintes.' },
        { tipo: 'nota', tom: 'atencao', texto: '**Dialeto T-SQL:** `LEN` e `SUBSTRING` são do SQL Server (`TRIM` exige SQL Server 2017+). Em PostgreSQL e MySQL, o tamanho é `LENGTH` ou `CHAR_LENGTH`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql28-a2',
        tipo: 'fill-code',
        enunciado: 'Complete para trazer nomes em minúsculas.',
        codigo: 'SELECT {{1}}(Nome) AS NomePadrao\nFROM Clientes;',
        lacunas: [['lower']],
        dicas: [
          'Minúsculas em inglês.',
          'Cinco letras.'
        ],
        explicacao: '`LOWER(Nome)` padroniza tudo em minúsculas.',
        conceitos: ['sql.strings']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Juntar, trocar e converter',
      blocos: [
        { tipo: 'texto', texto: '`CONCAT` (concatenar) junta textos; `REPLACE` troca trechos; `TRIM` limpa espaços das bordas; `CAST` converte tipos:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: "SELECT CONCAT(Cidade, ' - ', Nome) AS Rotulo\nFROM Clientes;"
        },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: "SELECT REPLACE(Email, '@', ' [at] ') AS EmailLegivel,\n       CAST(Id AS VARCHAR(10)) AS IdTexto\nFROM Clientes;"
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Função dentro de `WHERE` impede o uso de índice naquela coluna (assunto da Etapa 35). Em tabelas grandes, prefira calcular no `SELECT`.' },
        { tipo: 'trabalho', texto: 'Padronizar e-mail e telefone com UPPER/TRIM/REPLACE antes de comparar evita duplicados fantasmas no cadastro — um clássico de base suja.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql28-a3',
        tipo: 'predict-output',
        enunciado: 'O que `SELECT CONCAT(Cidade, \' - \', Nome)` devolve para Curitiba / Ana Souza?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: "SELECT CONCAT(Cidade, ' - ', Nome) AS Rotulo\nFROM Clientes;" }
        ],
        opcoes: [
          'Curitiba - Ana Souza',
          'Ana Souza - Curitiba',
          'CuritibaAna Souza',
          'Erro: CONCAT não existe'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A ordem dos argumentos manda: Cidade primeiro.',
          2: 'O separador \' - \' está entre os dois valores.',
          3: 'CONCAT junta na ordem recebida.'
        },
        dicas: [
          'Siga a ordem dos argumentos.',
          'O separador entra no meio.'
        ],
        explicacao: 'CONCAT emenda Cidade + separador + Nome, nessa ordem.',
        conceitos: ['sql.strings'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql28-a4',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna os **nomes em maiúsculas** dos clientes.',
        respostasAceitas: [
          'select upper(nome) as nome from clientes',
          'select upper(nome) from clientes'
        ],
        dicas: [
          'UPPER recebe o texto.',
          'Apelide a coluna.'
        ],
        explicacao: '`SELECT UPPER(Nome) FROM Clientes;` — tudo em caixa alta.',
        conceitos: ['sql.strings']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql28-a6',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que retorna o **Nome dos clientes sem espaços nas pontas** (não precisa apelidar a coluna).',
        respostasAceitas: [
          'SELECT TRIM(Nome) FROM Clientes;',
          'SELECT LTRIM(RTRIM(Nome)) FROM Clientes;'
        ],
        dicas: [
          'A função que remove espaços do começo e do fim do texto vem de "trim" (aparar).',
          'Ela recebe a coluna entre parênteses.'
        ],
        explicacao: '`TRIM(Nome)` remove espaços das bordas. Antes do SQL Server 2017, combinava-se `LTRIM(RTRIM(...))`.',
        conceitos: ['sql.strings']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql28-a7',
        tipo: 'predict-output',
        enunciado: 'O que `SELECT SUBSTRING(\'Curitiba\', 1, 4)` devolve, e quanto vale `LEN(\'Recife\')`?',
        opcoes: [
          'Curi e 6',
          'Curit e 6',
          'Curi e 5',
          'uriti e 7'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Com tamanho 4 saem quatro caracteres, e não cinco.',
          2: '"Recife" tem 6 caracteres e LEN conta todos.',
          3: 'A posição inicial é 1 (a primeira letra), não 2, e "Recife" não tem sete letras.'
        },
        dicas: [
          'SUBSTRING(texto, posição inicial, quantidade): começa na posição 1 e leva 4 caracteres.',
          'LEN conta todas as letras do texto.'
        ],
        explicacao: '`SUBSTRING` com tamanho 4 pega 4 caracteres a partir da primeira letra. `LEN(\'Recife\')` conta 6 caracteres.',
        conceitos: ['sql.strings']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql28-a8',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que mostra o **Telefone** dos clientes trocando cada `-` por nada (texto vazio), sem apelido.',
        respostasAceitas: [
          'SELECT REPLACE(Telefone, \'-\', \'\') FROM Clientes;'
        ],
        dicas: [
          'REPLACE recebe o texto, o trecho a trocar e o trecho novo.',
          'O trecho novo é um texto vazio, escrito com duas aspas simples coladas.'
        ],
        explicacao: '`REPLACE(Telefone, \'-\', \'\')` remove todos os hífens do telefone.',
        conceitos: ['sql.strings']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql28-a9',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que mostra o **Id** dos clientes convertido para texto com `VARCHAR(10)`, sem apelido.',
        respostasAceitas: [
          'SELECT CAST(Id AS VARCHAR(10)) FROM Clientes;'
        ],
        dicas: [
          'CAST recebe o valor, a palavra AS e o tipo de destino.',
          'O tipo de destino é VARCHAR com o tamanho entre parênteses.'
        ],
        explicacao: '`CAST(Id AS VARCHAR(10))` converte o número em texto de até 10 caracteres.',
        conceitos: ['sql.strings']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Upper e lower',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras para a caixa do texto: **upper** (superior, maiúsculas) e **lower** (inferior, minúsculas).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['upper', 'superior (maiúsculas)'],
            ['lower', 'inferior (minúsculas)']
          ]
        },
        { tipo: 'ingles', frase: 'Upper and lower names.', traducao: 'Nomes em maiúsculas e minúsculas.' },
        { tipo: 'nota', tom: 'info', texto: 'As mesmas palavras das funções `UPPER` e `LOWER`.' },
        { tipo: 'vida-real', emoji: '🏷️', titulo: 'A etiqueta de entrega precisa do nome do cliente em maiúsculas', texto: 'A impressora só aceita letras maiúsculas e os nomes foram cadastrados de qualquer jeito. `SELECT UPPER(Nome) FROM Clientes;` já devolve tudo no formato da etiqueta, sem alterar os dados gravados.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql28-a5',
        tipo: 'write-code',
        enunciado: 'Upper and lower names: mostre as duas versões do nome, apelidadas de **Maiusculas** e **Minusculas**.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select upper(nome) as maiusculas, lower(nome) as minusculas from clientes',
          'select upper(nome), lower(nome) from clientes'
        ],
        dicas: [
          'UPPER e LOWER lado a lado.',
          'Apelide as colunas.'
        ],
        explicacao: 'As duas padronizações do mesmo nome, uma em cada coluna.',
        conceitos: ['sql.strings', 'sql.ingles']
      }
    }
  ]
});
