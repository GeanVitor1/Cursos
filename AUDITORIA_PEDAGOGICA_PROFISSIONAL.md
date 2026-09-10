# Auditoria Pedagógica e Profissional — Trilha .NET

Data: setembro de 2026
Escopo: todo o conteúdo e o motor da plataforma na pasta `Cursos/`.

Este documento é o resultado de uma auditoria profunda com dois critérios obrigatórios:

1. **Formação profissional** — a plataforma prepara para vagas reais de Desenvolvedor .NET
   Júnior/Full Stack .NET?
2. **Didática para iniciante absoluto** — cada conceito é construído do zero, sem pressupor
   conhecimento não ensinado?

---

## 1. O que já estava correto

- **Motor sólido e preservado**: registro, roteamento, armazenamento local, progressão, sessões,
  XP, streak, checkpoints e o runner de etapas.
- **13 tipos de atividade** com dicas progressivas, feedback e tentativa/revelação.
- **SQL — Fundamentos** era conteúdo de alta qualidade: gradual, visual, com banco fictício
  (Mercado Aurora), inglês contextual, análise de erro e cenários reais.
- **Roadmap de trilhas com pré-requisitos** declarados e validados, fases de formação coerentes.
- **Validador de dados** (`ferramentas/validar-dados.js`) garantindo consistência do conteúdo.
- Telas de **Certificações**, **Projetos**, **Entrevistas**, **Meu progresso** e **Revisão**.
- Uso consistente de problemas de trabalho (clientes, produtos, pedidos) em vez de exemplos
  genéricos (nada de `Cachorro`, `Foo` ou Fibonacci).

---

## 2. Problemas encontrados

### 2.1 Lacunas estruturais (críticas)

| # | Problema | Impacto |
| --- | --- | --- |
| 1 | **Trilha de C# não existia** | LINQ, EF e ASP.NET usavam classes, propriedades, lambda, DI e async sem nunca ensinar |
| 2 | **Entity Framework vinha antes de LINQ** | As lições de EF usam `Where`, `FirstOrDefault` e lambda desde a primeira linha |
| 3 | **`sql-03` afirmava "Em C# você já conhece…"** | Pressupunha C# que a plataforma não ensinava |
| 4 | **16 das 17 trilhas tinham zero lições** | A plataforma era quase só roadmap |
| 5 | **`sql-04` concentrava 5 conceitos em 50 min** | AND/OR + parênteses + IN + BETWEEN + NOT na mesma lição |
| 6 | **Git ficava na Fase 6** | Ferramenta usada desde o primeiro dia era ensinada no fim |
| 7 | **Sem trilha de segurança** | JWT, senhas e OWASP apareciam sem base de SQL Injection, XSS e CSRF |

### 2.2 Problemas de didática e avaliação

| # | Problema | Impacto |
| --- | --- | --- |
| 8 | Domínio binário (3 acertos = dominado) | Não distinguia reconhecer de construir |
| 9 | Conclusão da lição dizia "Você agora sabe" | Confundia **concluir** com **dominar** |
| 10 | Feedback de erro genérico ("Não exatamente") | Não explicava **por que** a alternativa estava errada |
| 11 | "Revisão espaçada" sem intervalos reais | Conceitos errados podiam nunca voltar com data definida |
| 12 | Sem sistema de confiança | Acerto por chute contava igual a acerto com segurança |
| 13 | Sem interleaving deliberado | Revisão podia repetir o mesmo conceito em sequência |
| 14 | Sem modo socrático | A única ajuda era dica pronta |
| 15 | Sem checkpoints de prontidão | Trilhas avançadas começavam sem verificar a base |
| 16 | Sessões 20/40/60 min | Não cobria o pedido de 5/15/30/60 |
| 17 | Sem atividades de code review, refatoração e explicação livre | Faltavam competências centrais do trabalho |
| 18 | Sem "💼 No trabalho" | O aluno não via a relevância de cada assunto |
| 19 | Sem glossário de siglas | Termos como ORM, DTO, JWT apareciam sem decodificação |
| 20 | Sem áudio em inglês | Pronúncia impossível de treinar |

### 2.3 Cobertura profissional ausente no currículo

- **C# aplicado ao backend** (variável, tipos, null, condição, métodos, classes, objetos,
  propriedades, construtores, coleções, List, interfaces, exceptions, generics, delegates/lambdas,
  async/await): ausente.
- **Lógica de programação aplicada** (total de pedido, estoque, duplicados, agrupamento): ausente.
- **Terminal** e **Inglês prático**: apenas roadmap.
- **Segurança**: sem trilha.
- **Frontend, testes, Docker, Redis, mensageria, CI/CD, Azure**: apenas roadmap (aceitável nesta
  fase, mas registrado como lacuna).

---

## 3. Correções realizadas

### 3.1 Nova ordem do grafo de dependências

Antes (incorreta):

```
SQL → Entity Framework → LINQ → ASP.NET
```

Depois (correta, implementada e validada):

```
Lógica ─► C# ─┐
              ├─► LINQ ─► Entity Framework ─► ASP.NET ─► Segurança ─► Autenticação
SQL ──────────┘                                │
Terminal ─► Git                                ├─► Arquitetura
Inglês (transversal)                           └─► Testes
```

- `linq` agora depende de **C# 100% + SQL 100%**.
- `entity-framework` depende de **SQL + C# + LINQ 100%**.
- `aspnet` depende de **C# + SQL + LINQ + EF 100%**.
- `git` subiu para a **Fase 2**, dependente de Terminal.
- `autenticacao` passou a depender de **Segurança**.
- Criada a trilha **Segurança de Aplicações** (roadmap completo na Fase 4).

### 3.2 Trilhas e fases reorganizadas

- 17 → **20 trilhas** (novas: C# para Backend, Lógica Aplicada, Terminal, Segurança).
- Fases passaram a refletir a ordem pedagógica real:
  1. Fundamentos (SQL, C#, Lógica, Terminal, English)
  2. Dados com C# (LINQ, EF Core, Git)
  3. Backend (ASP.NET Core)
  4. Segurança e engenharia (Segurança, Autenticação, Arquitetura, Testes)
  5. Frontend
  6. Operação (Docker)
  7. Sistemas distribuídos (Redis, Mensageria)
  8. Cloud e entrega (CI/CD, Azure)
  9. Escala (Microsserviços)

### 3.3 Redução de carga cognitiva

- `sql-04` foi **dividida em duas lições**:
  - `sql-04` — AND, OR e parênteses.
  - `sql-05` — IN, BETWEEN e NOT.
- A lição sobrecarregada de EF ("C# e SQL: como os dois conversam?" + ORM + DbContext + DbSet +
  connection string) foi dividida em **4 lições graduais**: ORM → DbContext/DbSet → Add/SaveChanges
  → leitura de dados.
- Novas lições respeitam o limite de **um conceito principal por lição** (eventualmente dois
  fortemente ligados).

### 3.4 Correções de pressupostos

- `sql-03` deixou de afirmar que o aluno "já conhece C#"; agora referencia a trilha de C# como
  opcional.
- `sql-02` e `provas` ajustados para não prometer conceitos futuros como se já estivessem vistos.
- Toda menção a `async/await`, lambda, LINQ, DbContext e DbSet aparece **depois** das trilhas que
  os ensinam.

---

## 4. Conhecimentos adicionados

### 4.1 Nova trilha: C# para Backend .NET (10 lições)

Sempre com Produto/Cliente/Pedido — nunca exemplos genéricos:

1. Classe e objeto: o molde dos dados
2. Variáveis, tipos e decisões
3. Métodos: ações com entrada e saída
4. Listas: `List<T>` e `foreach`
5. Null e NullReferenceException
6. Interfaces: o problema antes do contrato
7. Injeção de dependência: o problema antes da solução
8. Generics e lambdas: lendo `x => x.Ativo`
9. Exceções: quando algo dá errado
10. `async`/`await`: sem travar a aplicação

### 4.2 Nova trilha: Lógica Aplicada (1 lição de desafios reais)

- Total de pedido, validação de estoque, encontrar duplicados, agrupar pedidos por cliente.
- Sem Fibonacci, sem torre de Hanoi, sem matemática descontextualizada.

### 4.3 Nova trilha: Terminal (1 lição)

- Navegação (`cd`, `ls`/`dir`, `mkdir`), `dotnet build/run/test`, `git status/add/commit/push`,
  e preview contextual de `docker compose up` e `npm install`.

### 4.4 Nova trilha: Segurança (roadmap)

- OWASP básico, SQL Injection, XSS, CSRF/CORS, segredos, hash de senha, checklist de PR.

### 4.5 Inglés prático (2 lições)

- Vocabulário essencial com **áudio** (`🔊 Ouvir` via SpeechSynthesis).
- Mensagens de erro reais e leitura de GitHub issue.
- Associação, tradução, ordenação de frase e leitura com compreensão.

### 4.6 LINQ antes do EF (4 lições)

- Por que LINQ existe (reaproveitando o método `Filtrar` construído em C#).
- `Where` com **visualizador interativo**.
- `Select` (contraste explícito linhas × formato).
- `First`, `FirstOrDefault`, `Single` (ensino por contraste e tratamento de ausência).

### 4.7 Entity Framework extremamente didático (4 lições)

Cada operação mostra o caminho completo **C# → EF → SQL → Banco**:

- `ef-00`: o sofrimento do acesso manual e o que é ORM/entidade.
- `ef-01`: DbContext ("porta") e DbSet ("gavetas").
- `ef-02`: `Add` não grava; `SaveChanges` gera `INSERT`; Id só aparece depois.
- `ef-03`: LINQ vira SQL (`Where` → `WHERE`, `FirstOrDefaultAsync` → `TOP 1`), `Find` × `ToList`.

### 4.8 ASP.NET Core inicial (3 lições)

- HTTP com request/response, métodos e status codes (404 ≠ 500).
- JSON: o formato de troca, tipos e relação com classes C#.
- Primeira Minimal API: rota, endpoint, resposta JSON, `Results.Created`/`NotFound`.
- Controllers, DTOs, services e DI profunda ficam para as próximas lições do roadmap.

---

## 5. Melhorias didáticas no motor

### 5.1 Domínio multidimensional ("sistema de rodinhas")

Cada conceito agora é medido em seis formas de conhecimento:

```
1. Reconhecimento      múltipla escolha, verdadeiro/falso, encontrar erro
2. Associação          conectar termos e significados
3. Ordenação           arrastar/ordenar blocos
4. Preenchimento       completar lacunas
5. Construção          escrever a solução (assistida → livre)
6. Aplicação real      cenário/ticket sem pistas
```

- `dominado` exige acertos consistentes **e** prática em mais de uma dimensão.
- A tela de conclusão mostra uma barra por dimensão e avisa explicitamente que
  **"etapa concluída ≠ conceito dominado"**.

### 5.2 Sistema de confiança

- Após responder, o aluno pode marcar **"Tenho certeza / Acho que sei / Estou chutando"**.
- Acerto com certeza pesa 1,0; "acho" 0,75; "chute" 0,35. Acerto por chute entra na revisão
  mesmo estando correto.

### 5.3 Repetição espaçada real

- Erro agenda revisão em **1 dia**; acertos em revisão avançam para **3 → 7 → 14 → 30 dias**.
- Novo erro reinicia o ciclo.
- Sessões de revisão aplicam **interleaving**: no máximo 2 atividades por conceito, alternando
  conceitos diferentes.
- Reforço no mesmo dia disponível para os erros recém-cometidos ("Praticar os pontos fracos agora").

### 5.4 Feedback de erro educativo

- Novo campo `feedbackErro`: cada alternativa errada explica o erro provável
  (ex.: confundir `First` com `FirstOrDefault`, usar `>` em vez de `>=`).
- Em verdadeiro/falso, cada afirmação pode ter explicação própria.
- Após erros repetidos, a plataforma oferece a resposta sem punir o avanço.

### 5.5 Modo socrático e ajuda progressiva

- Campo `socratico`: perguntas que conduzem à resposta ("Você quer modificar ou apenas consultar?").
- As dicas continuam progressivas (dica → dica específica → resposta) e passaram a **retirar pistas**
  conforme o aluno demonstra domínio (as atividades de construção livre não têm esqueleto).

### 5.6 Checkpoint de prontidão

- Antes de começar uma trilha, a página mostra os conhecimentos prévios com ✅/🟡 e uma
  recomendação ("revise LINQ antes"), com botões **"Estou pronto"** e **"Revisar antes"**.

### 5.7 Blocos novos

- **💼 No trabalho**: mostra onde o assunto aparece profissionalmente.
- **Glossário**: siglas e termos decodificados (`ORM`, `DI`, `JWT`, `TTL`…).
- **Inglês com áudio**: botão de pronúncia em blocos e no vocabulário.

### 5.8 Sessões de tempo

- **⚡ 5 min** revisão relâmpago · **☕ 15 min** exercícios · **📚 30 min** microaula ·
  **🧠 60 min** aula + prática + desafio.

### 5.9 Novos tipos de atividade e visualizações

- **code-review**: diff de pull request + escolha do problema (com explicação).
- **explain**: explicação com palavras próprias, com critérios e resposta modelo.
- **visualizer**: execução animada de filtro LINQ item a item e estrutura preparada para join
  (`INNER JOIN` × `LEFT JOIN`), além de mapas mentais.

---

## 6. Mapa de competências e carreira

- Criado `data/skills-map.json` (fonte canônica) com 20 competências, dependências, habilidades e
  conceitos-chave, espelhado em `data/habilidades.js` para funcionar sem servidor.
- Nova tela **Mapa de carreira** (`#/mapa`): visão por categoria (Fundamentos, Dados, Backend,
  Engenharia, Frontend, Operação, Sistemas) com status ✅ / 🟡 / ▶ / 🔒 por competência,
  percentual de trilha e domínio.
- Entrevistas agora cobrem também **C#** e **Segurança** (7 áreas).
- Projetos foram atualizados com as novas dependências (C# e LINQ no projeto 1, segurança no
  projeto 2).

---

## 7. Conteúdo: de 6 para 32 lições interativas

| Trilha | Antes | Depois |
| --- | --- | --- |
| SQL | 6 | 7 |
| C# | 0 | 10 |
| Lógica | 0 | 1 |
| Terminal | 0 | 1 |
| Inglês | 0 | 2 |
| LINQ | 0 | 4 |
| EF Core | 0 | 4 |
| ASP.NET Core | 0 | 3 |
| **Total** | **6** | **32** |

Todas as lições novas usam problemas de loja (Mercado Aurora), trabalho em equipe, tickets e
code review — preparando para o ambiente profissional.

---

## 8. Simulação final da plataforma (teste de percurso)

Uma pessoa que nunca estudou banco, C# ou LINQ entra na plataforma:

| Pergunta | Resposta |
| --- | --- |
| Sabe exatamente o que fazer? | Sim: a home aponta a próxima etapa e o mapa mostra o caminho. |
| Alguma palavra aparece sem explicação? | Não: termos novos têm glossário e as trilhas têm pré-requisitos. |
| Algum código parece mágico? | Não: lambda, async, DbContext e `SaveChanges` são construídos antes de usar. |
| Aprende só seguindo as etapas? | Sim para o trecho publicado (SQL + C# → LINQ → EF → API inicial). |
| A dificuldade cresce gradualmente? | Sim: reconhecer → associar → ordenar → preencher → construir → aplicar. |
| Há prática suficiente? | Sim: 2–6 atividades por lição, de tipos variados, com revisão espaçada. |
| Entende o porquê de cada assunto? | Sim: bloco 💼 em todas as lições novas. |
| Após meses, estaria preparada para uma vaga? | **Parcialmente** — ver lacunas abaixo. |

---

## 9. Lacunas que ainda existem

Estas lacunas são reais e conscientes. A plataforma ainda **não** leva um iniciante até uma vaga
completa porque o roadmap é maior do que o conteúdo publicado:

1. **SQL**: faltam ORDER BY, agregação (GROUP BY/HAVING), joins, subqueries, índices e transações.
   Sem joins publicados, EF `Include` e relatórios ainda não podem ser ensinados.
2. **C#**: faltam construtores em profundidade, herança/polimorfismo, records, `IEnumerable`,
   tratamento de erros em APIs e leitura de código em escala.
3. **LINQ**: faltam OrderBy, GroupBy, Join em LINQ, IQueryable × IEnumerable e execução adiada.
4. **EF Core**: faltam migrations, relacionamentos, tracking, paginação, DTOs e performance (N+1).
5. **ASP.NET Core**: faltam controllers, DTOs, services, validação, tratamento de erros, logging,
   Swagger, paginação, filtros, versionamento e idempotência.
6. **Segurança** e **Autenticação**: apenas roadmap (hash, JWT, refresh token, roles, 401/403).
7. **Testes, Arquitetura, Frontend, Docker, Redis, Mensageria, CI/CD, Azure e Microsserviços**:
   roadmap completo, conteúdo ainda não produzido.
8. **Missões de trabalho e simulação de empresa**: o modelo existe no roadmap, mas as primeiras
   missões formais ainda não foram publicadas (as atividades `scenario` e `code-review` são a base).
9. **Inglês intermediário/avançado** (documentação, vagas, entrevistas): roadmap, sem lições.
10. **Validação automática de respostas livres**: hoje o tipo `explain` usa palavras-chave e
    critérios. Avaliação semântica por IA é uma evolução desejada, não implementada.

---

## 10. Próximas etapas recomendadas (ordem de prioridade)

1. **SQL Iniciante/Joins/Aggregação** — desbloqueia EF relacionamentos e a maior parte das vagas.
2. **EF Iniciante** (migrations + relacionamentos + Include) — fecha o caminho até APIs "de verdade".
3. **ASP.NET organização** (controllers, DTOs, services, DI, validação, erros, logs).
4. **Segurança + Autenticação** (JWT, hash, 401/403) — hoje é a maior lacuna profissional.
5. **Testes (xUnit)** e **Arquitetura (SOLID/refatoração)** — próxima faixa salarial.
6. **Frontend (HTML/CSS/TS/React)** e **Docker** — fecha o perfil Full Stack.
7. **Missões de trabalho**: "Seu primeiro dia", ticket #4821 (pedidos duplicados), simulação de
   empresa com Redis/RabbitMQ/Docker/Azure.
8. **Inglês**: escalar para documentação, vagas e entrevista.
9. **Avaliação semântica de `explain`** por IA, quando houver integração disponível.
10. **Dashboard de domínio por dimensão** para orientar revisões por habilidade, não só por conceito.

---

## 11. Arquivos-chave alterados/criados

```
data/skills-map.json                     (novo — grafo de competências)
data/habilidades.js                      (novo — espelho executável)
data/manifest.js                         (20 trilhas, ordem nova)
data/conceitos.js                        (146 conceitos)
app/js/nucleo/armazenamento.js           (domínio multidimensional, confiança, agenda)
app/js/nucleo/progresso.js               (revisão espaçada, interleaving, prontidão)
app/js/ui/runner.js                      (confiança, feedback educativo, socrático)
app/js/atividades/analise.js             (code-review, explain, visualizer)
app/js/ui/mapa.js                        (novo — mapa de carreira)
trilhas/csharp/                          (nova trilha — 10 lições)
trilhas/logica/                          (nova trilha — 1 lição)
trilhas/terminal/                        (nova trilha — 1 lição)
trilhas/seguranca/                       (nova trilha — roadmap)
trilhas/linq/licoes/                     (4 lições novas)
trilhas/entity-framework/licoes/         (4 lições novas)
trilhas/aspnet/licoes/                   (3 lições novas)
trilhas/ingles/licoes/                   (2 lições novas)
trilhas/sql/licoes/sql-04.js             (dividida)
trilhas/sql/licoes/sql-05.js             (nova)
ferramentas/validar-dados.js             (novos tipos, dimensões, mapa)
```

---

## 12. Como validar o resultado

```powershell
node ferramentas/validar-dados.js
```

O validador confirma: 20 trilhas, 32 lições, conceitos registrados, dependências sem ciclos,
atividades com dimensões válidas, blocos conhecidos, mapa de habilidades consistente e lições
com duração dentro do limite pedagógico.

**Conclusão da auditoria:** a plataforma passou de um esqueleto com um único curso para um sistema
com progressão correta, domínio multidimensional e o caminho crítico de um iniciante absoluto até
a primeira API .NET funcionando. Ela ainda não cobre toda a formação até o nível profissional —
e as lacunas restantes estão mapeadas e priorizadas acima.
