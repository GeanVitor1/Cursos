# Auditoria Pedagógica Global

Data: setembro de 2026
Escopo: todo o conteúdo publicado da plataforma (20 trilhas, 45 lições, 367 etapas, 250 atividades).

Este documento é o resultado da auditoria completa pedida: percorrer cada trilha na ordem real do
aluno (aula → tela → atividade → resposta → feedback → próxima tela), identificar todo conteúdo
exibido que dependa de conhecimento ainda não ensinado e corrigir o problema **no projeto inteiro**,
com validação automática para impedir que ele volte.

---

## 1. O problema central e o caso que o revelou

A plataforma já tinha um linter de **conceitos** (`ferramentas/linter-pedagogico.js`), mas ele
trabalhava no nível macro: `en.saudacoes`, `csharp.lambda`, `ef.dbset`. Uma atividade de inglês
declarava `conceitos: ['en.saudacoes']` e passava — mesmo usando palavras e estruturas que o aluno
nunca tinha visto.

O caso concreto, na primeira aula de inglês (`en-a1-00`, etapa 5):

```
Antes (errado)
  Alex: Hi! How are you?
    A. I'm fine, thanks. And you?
    B. At seven o'clock.
    C. My name is table.

O aluno só tinha aprendido:
  Hello / Hi · Good morning · Good afternoon · Good evening
  My name is... · I am... · Nice to meet you. · What is your name? · my · your

Nenhuma das três alternativas podia ser compreendida: how, are, fine, thanks,
and, at, seven, o'clock e table nunca tinham sido ensinados. A resposta certa só
era identificável para quem já sabia inglês — exatamente o que o curso não pode exigir.
```

Isso não era um problema isolado do inglês. A mesma estrutura de erro apareceu em SQL
(`ORDER BY` em alternativa errada antes da trilha correspondente), C# (`foreach`, `=>`,
`.Length` e `else` cobrados antes de ensinados), LINQ/EF (`FindAsync`, `TOP 1`, `COUNT(*)` e
`context.Database` antes de explicados), ASP.NET (`REST`, `MapPost`, `is null` e ternário) e
Terminal (Git/Docker/npm cobrados sem explicação). A auditoria encontrou **mais de 50 violações
diretas** e dezenas de avisos, além de **254 ocorrências de vocabulário inglês** usado antes do
ensino — todas corrigidas ou classificadas.

---

## 2. Método da auditoria

Para cada lição, na ordem do `data/manifest.js` (fases → trilhas → níveis → etapas), foi mantido o
conjunto de conhecimentos já ensinados e verificado tudo o que o aluno enxerga:

1. enunciado e cenário;
2. texto da aula, exemplos, diagramas e código;
3. resposta correta;
4. alternativas erradas (distratores);
5. palavras usadas nas alternativas, no áudio e nas leituras;
6. dicas, feedback de erro e de acerto;
7. traduções;
8. labels e títulos de atividade;
9. pré-requisitos entre trilhas.

A auditoria foi feita em três camadas complementares:

- **programática**: scripts que percorrem o conteúdo e acumulam o léxico/símbolos (novos linters);
- **semântica, por trilha**: leitura integral de todas as 45 lições, com relatórios por arquivo e linha;
- **simulação do "aluno zero"**: em cada tela, a pergunta "a plataforma já ensinou cada parte
  necessária para compreender e responder isto?".

---

## 3. Resultado quantitativo

| Métrica | Antes | Depois |
| --- | --- | --- |
| Linter de conceitos — erros | 0 | **0** |
| Linter de conceitos — avisos | 0 | **0** |
| Linter de inglês — problemas de vocabulário | **254** | **0** |
| Linter de símbolos — uso de código antes do ensino | **4** | **0** |
| Termos portugueses antes do ensino (nova checagem) | **10** | **0** |
| Validador de estrutura | 0 erros | **0 erros** |
| Trilhas analisadas | — | 20 |
| Lições analisadas | — | 45 |
| Etapas percorridas | — | 367 |
| Atividades verificadas | — | 250 |
| Palavras de inglês no léxico acumulado | — | 430 |
| Símbolos de código registrados | — | 105 |
| Termos portugueses registrados | — | 44 |
| Conceitos com introdução marcada | 81 | 83 (+`linq.tolist`, `csharp.valor`) |

Estados de conteúdo dos 83 conceitos publicados (matriz em `ferramentas/matriz-pedagogica.json`):

| Estado | Significado | Quantidade |
| --- | --- | --- |
| `NAO_ENSINADO` | conceito registrado mas nunca ensinado no conteúdo publicado | 0 |
| `INTRODUZIDO` | ensinado, ainda sem atividade de prática própria | 3 (ver seção 8) |
| `PRATICADO` | praticado em uma dimensão | 14 |
| `PRONTO_PARA_AVALIACAO` | praticado em 2+ dimensões ou 3+ atividades | 66 |

---

## 4. Correções realizadas — exemplos concretos

### 4.1 Inglês (a maior correção)

- **`en-a1-00`**: "How are you? / I'm fine, thanks. / And you? / I'm fine too." passaram a ser
  ensinados em um bloco `vocab` **antes** do diálogo, com frase de demonstração. O diálogo foi
  reescrito usando apenas o que a lição ensina:

  ```
  Depois (correto)
    Alex: Hi! How are you?
      A. I'm fine, thanks. And you?     ← ensinado na etapa 1
      B. My name is Ana.                ← ensinado, mas não responde à pergunta
      C. Good morning, Ana.             ← ensinado, mas não responde à pergunta
  ```

  O distrator "Good night... See you tomorrow" (good night, see, tomorrow não ensinados) foi
  removido; o distrator "My name is table" foi eliminado.
- **`en-a1-01`**: o vocabulário passou a cobrir 0–10, teens, dezenas e hundred (antes só "one,
  two, three / eleven… / twenty…"). "seven", "nine", "six" e "eight" eram usados nas lições
  seguintes sem terem sido ensinados. Foram ensinados também `to be`, `years old`, `phone number`,
  "oh" e "double 5".
- **`en-a1-02`**: "photo", "cute", "only", "ten", "dollars", "costs" apareciam no diálogo sem
  ensino (alguns são conteúdo da lição 6). O diálogo foi reescrito com `Who is this?`, `How old is
  she?`, `I have two brothers too.` — todos ensinados na própria lição.
- **`en-a1-05`**: as falas do garçom ("Are you ready to order?", "Anything to drink?", "Anything
  else?", "No, that's all.", "Enjoy!", "Here is your food.") passaram a ser ensinadas em bloco
  próprio antes do diálogo. "table" e "apple", que apareciam como distratores, agora são
  vocabulário ensinado (a regra: **nunca usar palavra desconhecida nem como piada**).
- **`en-a1-06`**: "from" no distrator "I am from Brazil" (que só seria ensinado na lição 8) foi
  trocado; "sale", "jeans", "hat", "accept", "jacket", "fitting room", "try it on" passaram a ser
  vocabulário; o símbolo `$` foi explicado.
- **`en-a1-07`**: "Where is...?", "Is it far?", "minute", "walk", "It costs..." ensinados antes do
  diálogo. A opção "thank you very much" foi simplificada para "thank you".
- **`en-a1-08`**: a nota que citava "What are you doing?" (estrutura com `doing` nunca ensinada) foi
  reescrita; "here", "week", "month", "now", "developer" ensinados; a dica "warehouse" foi trocada.
- **`en-a2-00`**: "take → took" era cobrado na atividade e só aparecia na dica — agora está no
  vocabulário, junto com beach, photos, parents, together, watched, movie, rained, stayed, then.
- **`en-a2-01` / `en-a2-02`**: "gonna" removido; "visit", "city", "Let's", "also", "send", "gate",
  "seat", "Welcome", "under the name", "Could I...?" e "What time is breakfast?" ensinados.
- **English for Developers**: leituras usavam "Hey", "connection", "wrong", "config", "application",
  "steps to reproduce", "duplicated", "instance", "resource" etc. sem ensino. Cada lição ganhou um
  vocabulário técnico com tradução, e as atividades usam apenas o inglês ensinado.
- **Checkpoint A1**: "Perfect", "food", "shopping list", "total" e "What time is it?" foram
  ensinados nas lições correspondentes antes de aparecerem na prova.

### 4.2 SQL

- `;` era usado desde a primeira consulta e nunca explicado: ganhou nota na `sql-02`
  ("o ponto e vírgula indica o fim do comando"). `--` (comentário) foi explicado na `sql-04`.
- A atividade que ligava colunas de **Produtos** a tipos exigia uma tabela que o aluno nunca
  tinha visto: a estrutura de Produtos (e de ItensPedido) passou a ser apresentada antes.
- A frase de inglês "The customers table has three columns" contradizia a tabela Clientes (5
  colunas): corrigida para as 5 colunas reais.
- "PK"/"FK" apareciam sem expansão: agora vêm com "primary key"/"foreign key" explicados.
- Distrator "cláusula ORDER BY" (conteúdo futuro) trocado; `!=` (não ensinado) removido; `NULL`
  virou bloco de futuro explícito.
- A prova: alternativas com `DELETE FROM`/`UPDATE ... SET` (sintaxe nunca ensinada) trocadas por
  SELECT; "Ticket #183"/"app" → "Chamado 183"/"aplicativo"; a lista de conceitos da prova foi
  corrigida (faltavam 5, sobrava `sql.not`).

### 4.3 C#

- **Símbolos básicos** (`;`, `{ }`, `=`, `" "`, `( )`, `//`) ganharam glossário na `csharp-00`;
  `bool` também passou a ser explicado ali (era usado em `Ativo` antes da `csharp-01`).
- **`foreach` e inicializador de objeto** (`new Produto { ... }`) eram a primeira prática de uma
  atividade: agora têm exemplo e nota antes.
- Respostas inválidas aceitas como corretas foram corrigidas: `produto.preco` minúsculo,
  `produtos.add(...)`, `!==` (não existe em C#) e `['ativo']` duplicando `['Ativo']`.
- Distratores que introduziam conteúdo nunca ensinado foram trocados: "método estático",
  "anti-padrão", "else", "compilador" como justificativa.
- `.Length`, `*`, `+`, `return`, `void`, `throw`, `finally`, `Exception` e "logs" passaram a ser
  ensinados/explicados antes do primeiro uso.
- O cenário da `csharp-00` que cobrava "função/parâmetros" (só ensinados na `csharp-02`) foi
  reescrito para usar apenas classes/objetos.

### 4.4 LINQ e Entity Framework Core

- A atividade `ef03-a1` usava `FindAsync`, `FirstOrDefaultAsync` e `SELECT TOP 1` **antes** do
  bloco que os explicava: a explicação foi movida para antes da atividade.
- Distratores com `COUNT(*)` (SQL futuro), `context.Database` (EF futuro), `Sum` (LINQ futuro) e
  `HTML` (Frontend) foram substituídos por conteúdo conhecido.
- `NotFound()`/`Ok()`/`erro 500` (ASP.NET, ainda não ensinado) viraram `return null` e "erro não
  tratado (uma exceção)".
- `ToList` ganhou conceito próprio (`linq.tolist`), `Entity Framework`/`EF Core` foram removidos
  das explicações de LINQ (a trilha de EF vem depois), e o código ADO.NET da `ef-00` virou
  pseudo-código em português.
- `AddScoped`, `services`, `controllers`, `materializa` e `/produtos/10` foram retirados ou
  generalizados.

### 4.5 ASP.NET Core, Terminal e Lógica

- `frontend`, `REST`, `HTML`, `JavaScript`, `Java`, `app` e "produção" foram removidos ou
  explicados; a descrição da trilha deixou de citar controllers/DTOs/logging.
- `body` ("corpo") ganhou etapa própria; `MapPost`, `Build()`, `args`, lambda com parâmetro,
  `is null` e o operador `? :` ganharam glossário **antes** das atividades que os usam.
- Atividades marcadas como `desafio` que eram a primeira prática de um conceito perderam o selo
  (`api00-a4`, `api02-a4`, `api02-a5`, `ef01-a4`, `ef01-a5`).
- Terminal: cada comando Git ganhou explicação (`status`, `add .`, `commit -m`, `push`), `webapi`
  e `-n` foram explicados, `bash` virou `texto` (o aluno usa PowerShell) e "clonar" deixou de ser
  pressuposto.
- Lógica: "algoritmo" foi definido; o distrator "método estático" (não ensinado) foi trocado.

---

## 5. Validações automáticas adicionadas

| Arquivo | O que faz |
| --- | --- |
| `ferramentas/linter-pedagogico.js` | além de ordem e pré-requisitos, controla a **densidade didática**: no máximo **2 conceitos novos por etapa de conteúdo**, no máximo **5 termos por glossário** nas trilhas de programação e **prática na mesma lição** para todo conceito introduzido (prévias com `preview: true` são isentas). |
| `ferramentas/linter-ingles.js` | percorre **todas as 45 lições** e verifica **palavra a palavra** todo texto em inglês exibido (enunciado, alternativas erradas incluídas, áudio, diálogos, leituras, dicas citadas, feedback). Sai com erro se uma palavra não foi ensinada antes. Nas trilhas não-inglesas usa o English corner/local, exige **no máximo 3 termos novos por etapa** e garante que toda frase use apenas palavras já explicadas (fora palavras de ligação). |
| `data/ingles-lexico.js` | nomes próprios, contrações (I'm, it's, don't...), identificadores de código e vocabulário português usados na separação EN/PT. |
| `ferramentas/linter-simbolos.js` | percorre todas as 45 lições e verifica 105 símbolos/keywords/APIs de código (`;`, `foreach`, `=>`, `await`, `Where`, `SaveChanges`, `Results.Ok`, `TOP`...) **em código, enunciados, dicas, explicações e feedback**. Sai com erro se um símbolo aparece antes da lição que o explica. |
| `data/simbolos-codigo.js` | registro `grupo:símbolo → lição de introdução + nome legível`. |
| `data/termos-portugues.js` | léxico de 44 termos técnicos em português (compilador, consulta, filtro, parâmetro, testável, service, produção, entidade, endpoint, frontend, container, deploy, code review...) com a lição que os introduz; 16 deles só podem aparecer quando uma lição própria explicar (jargão de trilhas futuras). O `linter-pedagogico.js` varre conteúdo, dicas, feedback e explicações com esse léxico. |
| `ferramentas/matriz-pedagogica.json` | matriz real: por conceito (introdução, primeira prática, primeira avaliação, estado, pré-requisitos), por etapa de ensino (`ensina`) e por atividade (`exige`). |
| `ferramentas/matriz-ingles.json` | por palavra: lição que ensinou e primeiro uso em atividade — agora cobrindo todas as trilhas. |
| `ferramentas/validar-tudo.js` | roda os quatro validadores em sequência. |

Comandos:

```powershell
node ferramentas/validar-dados.js
node ferramentas/linter-pedagogico.js
node ferramentas/linter-ingles.js
node ferramentas/linter-simbolos.js
node ferramentas/validar-tudo.js
```

O resultado de cada linter fica em `ferramentas/relatorio-*.json` e no topo de
`AUDITORIA_SEQUENCIAL.md`.

---

## 6. Teste do "aluno zero"

A garantia implementada é mecânica: para uma atividade ser válida, **cada palavra em inglês**
(inclusive nas alternativas erradas) precisa existir no léxico acumulado até aquela etapa, e
**cada símbolo de código** precisa ter lição de introdução anterior. O aluno que sabe somente o
que a plataforma ensinou consegue:

1. entender o enunciado, o cenário, o áudio e as opções;
2. descartar distratores por serem respostas erradas **dentro do conteúdo que conhece**, e não por
   serem incompreensíveis;
3. usar a dica e o feedback, que são escritos no mesmo nível do conteúdo;
4. responder usando apenas conhecimento anterior.

O linter de conceitos complementa: desafio/prova que cobra conceito não praticado falha, e
conceitos com pré-requisitos fora de ordem falham.

---

## 7. Pré-requisitos globais verificados

A ordem global foi validada pelo linter de conceitos e pelo de símbolos:

```
SQL ──┐
C#  ──┼─► LINQ ─► Entity Framework Core ─► ASP.NET Core
Lógica┘
Terminal (transversal)
Inglês (transversal)
```

- `linq.tolist`, `Where`, `Select`, `First/FirstOrDefault/Single` precedem EF;
- `DbContext`, `DbSet`, `Add/SaveChanges`, `ToListAsync/FindAsync/FirstOrDefaultAsync` na ordem
  certa dentro de EF;
- `DbContext` completo só depois de C# (construtor/DI) e SQL;
- ASP.NET depois de C#, SQL, LINQ e EF; `Results.*`, `MapGet/MapPost` e `is null` só depois de
  ensinados;
- inglês transversal: cada palavra entra no léxico na lição que a ensina; A2 e English for
  Developers reutilizam apenas o que A1/A2 já ensinou.

---

## 8. Problemas restantes (transparência)

1. **Nivelamento**: o teste de nivelamento usa vocabulário progressivo por definição (é um teste
   diagnóstico). Ele é a única parte isenta do linter de inglês e está documentado no README.
2. **Trilhas sem lições** (Git, Segurança, Autenticação, Arquitetura, Testes, Frontend, Docker,
   Redis, Mensageria, CI/CD, Azure, Microsserviços): continuam roadmap. Quando forem publicadas,
   os linters já bloquearão termos fora de ordem. Títulos de etapas futuras aparecem marcados
   como "(em breve)".
3. **Terminal — Git/Docker/npm**: aparecem como *preview* explicado na lição e por isso ficam no
   estado `INTRODUZIDO` (sem atividade própria de prática). O aviso de preview está no texto.
4. **`aspnet.requisicao`/`aspnet.resposta`** e **`linq.tolist`** ficam em `INTRODUZIDO`: são
   ensinados e usados nas atividades, mas a atividade principal declara o conceito guarda-chuva
   (`aspnet.http`, `linq.intro`). Sem impacto para o aluno.
5. **`MASTERED`** não existe no conteúdo estático: é calculado em tempo real pelo motor, com
   confiança do aluno, múltiplas dimensões e revisão espaçada. O conteúdo garante
   `PRONTO_PARA_AVALIACAO`; o domínio é medido em uso.
6. **Respostas livres (`explain`)**: a avaliação ainda é por palavras-chave/critérios, não
   semântica.
7. **Cobertura de inglês e termos em português (atualizada)**: o linter de inglês agora percorre
   todas as 45 lições, e o linter pedagógico checa 44 termos técnicos em português (dicas,
   feedback, explicações e conteúdo). O que continua fora do alcance automático:
   - **correção semântica** (se a alternativa "correta" está de fato correta; se a tradução é
     natural) — depende de revisão humana;
   - **estruturas gramaticais** montadas apenas com palavras já ensinadas — cobertas por palavras
     e conceitos, não por gramática formal;
   - **palavras portuguesas comuns** que não estejam na lista de 44 termos (a checagem é por
     léxico curado, não por dicionário);
   - palavras ambíguas (`no`, `a`, `as`) tratadas como portuguesas quando sozinhas; por serem
     funcionais e ensinadas nas primeiras lições, não geraram falso negativo no conteúdo atual.
8. **Inglês nas trilhas de código**: o English corner do SQL é distribuído em etapas curtas
   (sql-00: `database`/`server`/`table` e depois `row`/`column`/`primary key`; sql-02:
   `retrieve`/`customer`/`all` e depois `name`/`email`/`of`; sql-03: `from`; sql-04:
   `order`/`where`; sql-05: `between`), sempre com o `vocab` antes da frase e nenhuma etapa
   passando de 3 termos. Os comandos do Terminal são ensinados na própria trilha. O linter falha
   se uma etapa de programação introduzir mais de 3 termos de uma vez, se uma frase usar palavra
   ainda não explicada ou se um exercício marcado com conceito `*.ingles` cobrar palavra não
   ensinada; jargão de trilhas sem lição (DTO, migration, tracking, logging, controller,
   refatorar, hash, token, cache) está registrado como "nunca antes de ensinar" e bloqueia
   regressões.

---

## 9. Como reproduzir a auditoria

```powershell
node ferramentas/validar-tudo.js
```

Saída esperada (resumo):

```
Linter pedagógico ....... Erros: 0 | Avisos: 0 · 83 conceitos · 44 termos PT
Linter de inglês ........ Problemas: 0 · 430 palavras no léxico · 45 lições
Linter de símbolos ...... Problemas: 0 · 105 símbolos registrados
Validador de estrutura .. Validação concluída sem erros
```

Artefatos gerados:

- `AUDITORIA_SEQUENCIAL.md` — tabela conceito → introdução → prática → avaliação → estado;
- `ferramentas/matriz-pedagogica.json` — matriz com `ensina`/`exige`;
- `ferramentas/matriz-ingles.json` — matriz palavra → lição → primeiro uso;
- `ferramentas/relatorio-pedagogico.json`, `relatorio-ingles.json`, `relatorio-simbolos.json`.

A regra final da plataforma passa a ser verificável automaticamente:

> "Se estou te perguntando isso, é porque eu já te ensinei o necessário para responder."
