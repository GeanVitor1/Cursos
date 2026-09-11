# Auditoria Sequencial — Trilha .NET

> Relatório gerado por `ferramentas/linter-pedagogico.js`. Ele percorre as trilhas na ordem real do aluno e verifica se cada conceito é ensinado antes de ser praticado ou cobrado.

- Trilhas analisadas: **20**
- Lições publicadas: **45**
- Etapas percorridas: **367**
- Atividades percorridas: **344**
- Conceitos registrados: **161**
- Conceitos com introdução marcada: **83**
- Erros: **0** · Avisos: **0**

## Evidência por conceito (introdução → prática → avaliação)

| Conceito | Introdução | Primeira prática | Primeira avaliação | Estado no conteúdo | Pré-requisitos |
| --- | --- | --- | --- | --- | --- |
| Banco de dados (`sql.banco`) | etapa 1 · sql-00 | sql-00 etapa 6 | sql-00 etapa 15 | PRONTO_PARA_AVALIACAO | — |
| Servidor (`sql.servidor`) | etapa 2 · sql-00 | sql-00 etapa 6 | sql-00 etapa 15 | PRONTO_PARA_AVALIACAO | — |
| Tabelas, linhas e colunas (`sql.tabela`) | etapa 3 · sql-00 | sql-00 etapa 5 | sql-checkpoint-fundamentos etapa 2 | PRONTO_PARA_AVALIACAO | sql.banco |
| Coluna (`sql.coluna`) | etapa 4 · sql-00 | sql-00 etapa 5 | — | PRATICADO | sql.tabela |
| Registros (`sql.registro`) | etapa 4 · sql-00 | sql-00 etapa 6 | — | PRONTO_PARA_AVALIACAO | sql.tabela |
| Chave primária (`sql.chave-primaria`) | etapa 8 · sql-00 | sql-00 etapa 9 | sql-checkpoint-fundamentos etapa 3 | PRONTO_PARA_AVALIACAO | sql.tabela |
| Inglês técnico (`sql.ingles`) | etapa 12 · sql-00 | sql-00 etapa 14 | sql-02 etapa 14 | PRONTO_PARA_AVALIACAO | — |
| Tipos de dados (`sql.tipos-dados`) | etapa 2 · sql-01 | sql-01 etapa 3 | — | PRATICADO | sql.coluna |
| Chave estrangeira (`sql.chave-estrangeira`) | etapa 4 · sql-01 | sql-01 etapa 5 | sql-01 etapa 9 | PRONTO_PARA_AVALIACAO | sql.chave-primaria |
| Relacionamentos (`sql.relacionamento`) | etapa 4 · sql-01 | sql-01 etapa 5 | sql-01 etapa 9 | PRATICADO | sql.chave-estrangeira |
| SELECT (`sql.select`) | etapa 1 · sql-02 | sql-02 etapa 2 | sql-02 etapa 14 | PRONTO_PARA_AVALIACAO | sql.tabela |
| FROM (`sql.from`) | etapa 1 · sql-02 | sql-02 etapa 4 | sql-checkpoint-fundamentos etapa 5 | PRONTO_PARA_AVALIACAO | sql.select |
| Seleção de colunas (`sql.colunas`) | etapa 3 · sql-02 | sql-02 etapa 5 | — | PRATICADO | sql.select |
| Comandos SQL (`sql.comandos-sql`) | etapa 9 · sql-02 | sql-02 etapa 10 | sql-checkpoint-fundamentos etapa 4 | PRATICADO | sql.select |
| WHERE (`sql.where`) | etapa 1 · sql-03 | sql-03 etapa 2 | sql-03 etapa 14 | PRONTO_PARA_AVALIACAO | sql.select |
| Operadores de comparação (`sql.operadores`) | etapa 3 · sql-03 | sql-03 etapa 4 | sql-checkpoint-fundamentos etapa 6 | PRONTO_PARA_AVALIACAO | sql.where |
| Textos e aspas (`sql.texto-aspas`) | etapa 6 · sql-03 | sql-03 etapa 7 | sql-checkpoint-fundamentos etapa 10 | PRONTO_PARA_AVALIACAO | sql.where |
| AND e OR (`sql.and-or`) | etapa 1 · sql-04 | sql-04 etapa 2 | sql-04 etapa 10 | PRONTO_PARA_AVALIACAO | sql.where |
| Parênteses em filtros (`sql.parenteses`) | etapa 6 · sql-04 | sql-04 etapa 7 | sql-04 etapa 10 | PRONTO_PARA_AVALIACAO | sql.and-or |
| IN (`sql.in`) | etapa 1 · sql-05 | sql-05 etapa 2 | sql-05 etapa 9 | PRONTO_PARA_AVALIACAO | sql.where |
| BETWEEN (`sql.between`) | etapa 3 · sql-05 | sql-05 etapa 4 | sql-05 etapa 11 | PRONTO_PARA_AVALIACAO | sql.where |
| NOT (`sql.not`) | etapa 5 · sql-05 | sql-05 etapa 6 | sql-05 etapa 9 | PRONTO_PARA_AVALIACAO | sql.where |
| Classes (`csharp.classes`) | etapa 2 · csharp-00 | csharp-00 etapa 3 | csharp-00 etapa 21 | PRONTO_PARA_AVALIACAO | — |
| Propriedades (`csharp.propriedades`) | etapa 4 · csharp-00 | csharp-00 etapa 5 | — | PRONTO_PARA_AVALIACAO | csharp.classes |
| Valores (`csharp.valor`) | etapa 6 · csharp-00 | csharp-00 etapa 7 | — | PRATICADO | csharp.propriedades |
| Objetos (`csharp.objetos`) | etapa 8 · csharp-00 | csharp-00 etapa 9 | csharp-00 etapa 21 | PRONTO_PARA_AVALIACAO | csharp.classes |
| Tipos de dados em C# (`csharp.tipos`) | etapa 15 · csharp-00 | csharp-00 etapa 16 | csharp-01 etapa 9 | PRONTO_PARA_AVALIACAO | — |
| Variáveis (`csharp.variaveis`) | etapa 1 · csharp-01 | csharp-01 etapa 2 | csharp-01 etapa 9 | PRONTO_PARA_AVALIACAO | — |
| Condições (`csharp.condicoes`) | etapa 5 · csharp-01 | csharp-01 etapa 6 | — | PRONTO_PARA_AVALIACAO | csharp.variaveis |
| Métodos (`csharp.metodos`) | etapa 2 · csharp-02 | csharp-02 etapa 5 | — | PRONTO_PARA_AVALIACAO | csharp.variaveis |
| List e coleções (`csharp.list`) | etapa 2 · csharp-03 | csharp-03 etapa 4 | csharp-03 etapa 12 | PRONTO_PARA_AVALIACAO | csharp.objetos |
| Generics básicos (`csharp.generics`) | etapa 8 · csharp-03 | csharp-03 etapa 10 | — | PRONTO_PARA_AVALIACAO | csharp.list |
| Null e NullReferenceException (`csharp.null`) | etapa 1 · csharp-04 | csharp-04 etapa 3 | csharp-04 etapa 7 | PRONTO_PARA_AVALIACAO | csharp.objetos |
| Interfaces (`csharp.interfaces`) | etapa 2 · csharp-05 | csharp-05 etapa 4 | csharp-05 etapa 7 | PRONTO_PARA_AVALIACAO | csharp.classes, csharp.metodos |
| Construtores (`csharp.construtor`) | etapa 2 · csharp-06 | csharp-06 etapa 4 | — | PRONTO_PARA_AVALIACAO | csharp.classes |
| Injeção de dependência (`csharp.di`) | etapa 3 · csharp-06 | csharp-06 etapa 4 | csharp-06 etapa 6 | PRONTO_PARA_AVALIACAO | csharp.interfaces, csharp.construtor |
| Lambdas (`csharp.lambda`) | etapa 5 · csharp-07 | csharp-07 etapa 6 | csharp-07 etapa 10 | PRONTO_PARA_AVALIACAO | csharp.metodos |
| Exceções (`csharp.excecoes`) | etapa 1 · csharp-08 | csharp-08 etapa 4 | csharp-08 etapa 6 | PRONTO_PARA_AVALIACAO | csharp.metodos |
| async e await (`csharp.async`) | etapa 1 · csharp-09 | csharp-09 etapa 3 | csharp-09 etapa 6 | PRONTO_PARA_AVALIACAO | csharp.metodos, csharp.generics |
| Total de pedido (`logica.total`) | etapa 2 · logica-00 | logica-00 etapa 3 | — | PRONTO_PARA_AVALIACAO | — |
| Validação de regra (`logica.validacao`) | etapa 5 · logica-00 | logica-00 etapa 6 | — | PRONTO_PARA_AVALIACAO | logica.total |
| Encontrar duplicados (`logica.duplicados`) | etapa 8 · logica-00 | logica-00 etapa 9 | — | PRATICADO | — |
| Agrupar dados (`logica.agrupamento`) | etapa 10 · logica-00 | logica-00 etapa 11 | — | PRATICADO | — |
| Comandos de navegação (`terminal.comandos`) | etapa 2 · terminal-00 | terminal-00 etapa 3 | — | PRATICADO | — |
| Comandos dotnet (`terminal.dotnet`) | etapa 4 · terminal-00 | terminal-00 etapa 5 | terminal-00 etapa 9 | PRONTO_PARA_AVALIACAO | terminal.comandos |
| Comandos git (`terminal.git`) | etapa 6 · terminal-00 | — | — | INTRODUZIDO | terminal.comandos |
| Comandos docker (`terminal.docker`) | etapa 7 · terminal-00 | — | — | INTRODUZIDO | terminal.comandos |
| Comandos npm (`terminal.npm`) | etapa 8 · terminal-00 | — | — | INTRODUZIDO | terminal.comandos |
| Saudações e apresentações (`en.saudacoes`) | etapa 1 · en-a1-00 | en-a1-00 etapa 2 | en-a1-00 etapa 16 | PRONTO_PARA_AVALIACAO | — |
| Números, idade e preços (`en.numeros`) | etapa 1 · en-a1-01 | en-a1-01 etapa 2 | en-a1-checkpoint etapa 4 | PRONTO_PARA_AVALIACAO | — |
| Família e pessoas (`en.familia`) | etapa 1 · en-a1-02 | en-a1-02 etapa 2 | en-a1-02 etapa 18 | PRONTO_PARA_AVALIACAO | en.saudacoes |
| Rotina e present simple (`en.rotina`) | etapa 1 · en-a1-03 | en-a1-03 etapa 2 | en-a1-03 etapa 16 | PRONTO_PARA_AVALIACAO | — |
| Horas, dias e datas (`en.horarios`) | etapa 1 · en-a1-04 | en-a1-04 etapa 2 | en-a1-checkpoint etapa 6 | PRONTO_PARA_AVALIACAO | en.numeros |
| Comida e restaurante (`en.comida`) | etapa 1 · en-a1-05 | en-a1-05 etapa 2 | en-a1-05 etapa 17 | PRONTO_PARA_AVALIACAO | — |
| Compras e supermercado (`en.compras`) | etapa 1 · en-a1-06 | en-a1-06 etapa 2 | en-a1-06 etapa 16 | PRONTO_PARA_AVALIACAO | en.numeros |
| Lugares, direções e transporte (`en.lugares`) | etapa 1 · en-a1-07 | en-a1-07 etapa 2 | en-a1-07 etapa 15 | PRONTO_PARA_AVALIACAO | — |
| Perguntas básicas e conversa (`en.perguntas`) | etapa 1 · en-a1-08 | en-a1-08 etapa 2 | en-a1-08 etapa 16 | PRONTO_PARA_AVALIACAO | en.saudacoes |
| Passado simples (`en.passado`) | etapa 1 · en-a2-00 | en-a2-00 etapa 2 | en-a2-00 etapa 22 | PRONTO_PARA_AVALIACAO | en.rotina |
| Planos e futuro (`en.futuro`) | etapa 1 · en-a2-01 | en-a2-01 etapa 2 | en-a2-01 etapa 12 | PRONTO_PARA_AVALIACAO | en.rotina |
| Viagem: aeroporto e hotel (`en.viagem`) | etapa 1 · en-a2-02 | en-a2-02 etapa 2 | en-a2-02 etapa 17 | PRONTO_PARA_AVALIACAO | en.lugares |
| Vocabulário técnico (`ingles.vocabulario`) | etapa 1 · ingles-00 | ingles-00 etapa 2 | — | PRONTO_PARA_AVALIACAO | — |
| Frases de trabalho (`ingles.frases`) | etapa 7 · ingles-00 | ingles-00 etapa 8 | — | PRONTO_PARA_AVALIACAO | ingles.vocabulario |
| Leitura técnica em inglês (`ingles.leitura`) | etapa 17 · ingles-00 | ingles-00 etapa 21 | ingles-01 etapa 25 | PRONTO_PARA_AVALIACAO | ingles.vocabulario |
| Mensagens de erro em inglês (`ingles.erros`) | etapa 1 · ingles-01 | ingles-01 etapa 2 | ingles-01 etapa 27 | PRONTO_PARA_AVALIACAO | ingles.vocabulario |
| O que é LINQ (`linq.intro`) | etapa 1 · linq-00 | linq-00 etapa 4 | — | PRONTO_PARA_AVALIACAO | csharp.lambda, csharp.list |
| Where (`linq.where`) | etapa 2 · linq-00 | linq-00 etapa 5 | linq-01 etapa 6 | PRONTO_PARA_AVALIACAO | linq.intro |
| Lambda em consultas (`linq.lambda`) | etapa 2 · linq-00 | linq-00 etapa 5 | — | PRONTO_PARA_AVALIACAO | csharp.lambda |
| ToList (`linq.tolist`) | etapa 3 · linq-00 | linq-00 etapa 6 | — | PRATICADO | linq.intro |
| Select (`linq.select`) | etapa 1 · linq-02 | linq-02 etapa 2 | linq-02 etapa 5 | PRONTO_PARA_AVALIACAO | linq.intro |
| First, FirstOrDefault e Single (`linq.first`) | etapa 1 · linq-03 | linq-03 etapa 2 | linq-03 etapa 4 | PRONTO_PARA_AVALIACAO | linq.where, csharp.null |
| ORM (`ef.orm`) | etapa 2 · ef-00 | ef-00 etapa 4 | ef-00 etapa 7 | PRONTO_PARA_AVALIACAO | sql.tabela, csharp.classes |
| Entidades (`ef.entidade`) | etapa 3 · ef-00 | ef-00 etapa 4 | — | PRONTO_PARA_AVALIACAO | ef.orm |
| DbContext (`ef.dbcontext`) | etapa 1 · ef-01 | ef-01 etapa 3 | — | PRONTO_PARA_AVALIACAO | ef.orm, csharp.construtor, csharp.di |
| DbSet (`ef.dbset`) | etapa 2 · ef-01 | ef-01 etapa 3 | — | PRONTO_PARA_AVALIACAO | ef.dbcontext |
| SaveChanges (`ef.savechanges`) | etapa 3 · ef-02 | ef-02 etapa 4 | ef-02 etapa 8 | PRONTO_PARA_AVALIACAO | ef.dbset, csharp.async |
| Consultas com EF (`ef.consultas`) | etapa 1 · ef-03 | ef-03 etapa 3 | ef-03 etapa 6 | PRONTO_PARA_AVALIACAO | ef.dbset, linq.where, csharp.async, linq.first |
| HTTP (`aspnet.http`) | etapa 1 · aspnet-00 | aspnet-00 etapa 6 | — | PRONTO_PARA_AVALIACAO | — |
| API e endpoints (`aspnet.api`) | etapa 1 · aspnet-00 | aspnet-00 etapa 4 | — | PRONTO_PARA_AVALIACAO | aspnet.http |
| Request (requisição) (`aspnet.requisicao`) | etapa 2 · aspnet-00 | aspnet-00 etapa 3 | — | PRATICADO | aspnet.http |
| Response (resposta) (`aspnet.resposta`) | etapa 2 · aspnet-00 | aspnet-00 etapa 3 | — | PRATICADO | aspnet.http |
| Status codes (`aspnet.status`) | etapa 7 · aspnet-00 | aspnet-00 etapa 8 | — | PRONTO_PARA_AVALIACAO | aspnet.http |
| JSON (`aspnet.json`) | etapa 1 · aspnet-01 | aspnet-01 etapa 2 | — | PRONTO_PARA_AVALIACAO | — |
| Rotas (`aspnet.rotas`) | etapa 1 · aspnet-02 | aspnet-02 etapa 8 | — | PRATICADO | aspnet.api |

<!-- MANUAL -->
## O erro que originou esta auditoria

Na lição `sql-00` (primeira trilha, primeira aula), a atividade `sql00-a1` de conexões cobrava o
termo **Registro** antes de ele ter sido explicado. A plataforma ensinava servidor, banco e
tabela e, em seguida, pedia para conectar "Registro → uma linha completa dentro de uma tabela".

**Antes**

```
etapa 2  conteúdo: Servidor, banco e tabela
etapa 3  atividade: conecte Servidor, Banco, Tabela e REGISTRO   ← erro
etapa 4  conteúdo: linhas e colunas (só aqui registro apareceria)
```

**Depois (corrigido)**

```
etapa 1  conteúdo: por que guardar dados + conceito de banco
etapa 2  conteúdo: conceito de servidor
etapa 3  conteúdo: conceito de tabela
etapa 4  conteúdo: conceito de COLUNA + conceito de REGISTRO (com diagrama)
etapa 5  atividade: reconhecer o que é uma coluna
etapa 6  atividade: conectar servidor, banco, tabela e registro   ← agora válido
etapa 7  atividade: reconhecer um registro
etapa 8  conteúdo: conceito de chave primária
...
```

## Método da auditoria

O `ferramentas/linter-pedagogico.js` percorre a plataforma **na ordem real do aluno**
(manifesto → fase → trilha → nível → etapa → bloco), mantendo o conjunto de conceitos já
introduzidos e verificando:

1. conceito **avaliado** (atividade/prova/desafio) antes de ser **introduzido**;
2. conceito **mencionado** em conteúdo antes de ser introduzido;
3. **desafio** combinando conceito ainda não **praticado**;
4. **prova** cobrando conceito ainda não praticado;
5. **pré-requisito conceitual** não introduzido antes (ex.: tipos de dados sem coluna);
6. termos e siglas (`ORM`, `API`, `HTTP`, `JSON`, `LINQ`, `DbContext`, `=>`, `ToListAsync`…)
   usados antes da introdução;
7. retomadas (`retoma`) apontando para conceito inexistente ou não ensinado.

A introdução de um conceito é um marco explícito no conteúdo: bloco `{ tipo: 'conceito' }` ou
`introduz: [...]` na etapa. Mencionar a palavra não conta como ensinar.

## Números da auditoria

| Métrica | Resultado |
| --- | --- |
| Trilhas percorridas | 20 |
| Lições publicadas | 32 |
| Etapas percorridas | 347 |
| Atividades verificadas | 171 |
| Conceitos registrados | 147 (`data/conceitos.js` + `data/conceitos-registry.js`) |
| Conceitos com introdução marcada | 69 (todos os publicados) |
| Erros após correção | **0** |
| Avisos após correção | **0** |

Antes das correções o linter acusava **754 erros e 331 avisos** — a maior parte porque as
introduções ainda não estavam marcadas; após marcar e corrigir, chegou a zero.

## Amostras de verificação (exigidas no critério final)

| Conceito | Onde é ensinado | Primeira prática | Status |
| --- | --- | --- | --- |
| Registro (`sql.registro`) | sql-00, etapa 4 | sql-00, etapa 6 | OK |
| Coluna (`sql.coluna`) | sql-00, etapa 4 | sql-00, etapa 5 | OK |
| SELECT / FROM | sql-02, etapa 1 | sql-02, etapa 2 | OK |
| Classe / Objeto | csharp-00, etapas 2 e 4 | csharp-00, etapa 5 | OK |
| Lista / Generic | csharp-03, etapa 2 | csharp-03, etapa 3 | OK |
| Lambda (`x => x.Ativo`) | csharp-07, etapa 4 | csharp-07, etapa 5 | OK |
| Injeção de dependência | csharp-06, etapa 2 | csharp-06, etapa 3 | OK |
| async/await | csharp-09, etapa 2 | csharp-09, etapa 3 | OK |
| LINQ | linq-00, etapa 1 | linq-00, etapa 3 | OK |
| Where | linq-00, etapa 2 | linq-01, etapa 2 | OK |
| DbContext | ef-01, etapa 1 | ef-01, etapa 3 | OK |
| DbSet | ef-01, etapa 2 | ef-01, etapa 3 | OK |
| SaveChanges | ef-02, etapa 3 | ef-02, etapa 4 | OK |
| HTTP / API | aspnet-00, etapa 1 | aspnet-00, etapa 3 | OK |
| JSON | aspnet-01, etapa 1 | aspnet-01, etapa 2 | OK |
| Rotas | aspnet-02, etapa 1 | aspnet-02, etapa 4 | OK |

## Correções aplicadas além do linter (auditoria humana)

O linter não pega tudo. Uma varredura manual por termos profissionais encontrou e corrigiu:

| Onde | Problema | Correção |
| --- | --- | --- |
| `sql-00` | "registro" e "coluna" cobrados antes de ensinados | nova progressão com conceitos e prática guiada |
| `sql-02` | `FROM` usado sem explicação; destaque citava "endpoint" | conceito de FROM adicionado; "endpoint" removido |
| `sql-02` | feedback citava `WHERE` que só viria depois | trocado por "na próxima lição você vai aprender a filtrar" |
| `sql-03` | "Em C# você já conhece" (C# podia nem ter sido feito) | texto tornado condicional |
| `csharp-00` | "valor" e o acesso por ponto apareciam sem explicação | glossário de valor + explicação do `.` |
| `csharp-01` | `Console.WriteLine` sem contexto; `{ }` e `( )` não explicados | nota + glossário de símbolos |
| `csharp-04` | `.ToUpper()` mágico e distrator com "estático" | trocado por `.Length` explicado; distrator reescrito |
| `csharp-05` | termo "injeção de dependência" e "pull request" antes da hora | feedback reescrito; rótulo do tipo de atividade virou "Revisão de código" |
| `csharp-06` | `AddScoped` sem aviso; "onipresente"; "estático/acoplamento" | nota de boilerplate; feedback reescrito |
| `csharp-09` | usava `context.Produtos.ToListAsync()` do EF antes de EF existir | lição reescrita com `Task.Delay`; menção ao EF virou bloco `futuro` |
| `ef-00` | código `SqlCommand` sem aviso | nota "você não precisa entender cada linha agora" |
| `ef-01` | `connection string`, `DbContextOptions`, "requisição" e `ToListAsync` precoces | linguagem ajustada; menção futura; atividade sem `ToListAsync` |
| `ef-03` | `TOP 1` sem explicação; "endpoint" antes do ASP.NET | nota sobre TOP/LIMIT; texto ajustado |
| `aspnet-00` | HTTP, API e URL sem expansão; response citava status/JSON antes | siglas expandidas; conceitos de API/status criados no lugar certo |
| `aspnet-01` | opção citava DTO; "serializa" sem explicação | opção sem DTO; "converte (serializa)" |
| `aspnet-02` | `Results.Ok/NotFound/Created`, lambda vazia e `builder` sem explicação | tela "Escolhendo a resposta" + glossário do código |
| `ingles-00` | dicas citavam EF e CI/CD; "pull request" como exemplo | reescritas e exemplo trocado |
| `terminal-00` | SDK/LTS, CI e pull request sem explicação | siglas explicadas e texto ajustado |
| `logica-00` | quatro raciocínios cobrados sem definição; citava GROUP BY/HAVING | etapa com os quatro conceitos; SQL removido do feedback |
| `linq-03` | `InvalidOperationException` no feedback | trocado por "um erro (uma exceção)" |
| Todos | desafios que eram a *primeira* prática de um conceito | deixaram de ser desafio (ex.: agrupamento, leitura em inglês, API em JSON) |

## Melhorias de UX pedagógica adicionadas

- **"O que é isso?"**: os chips de conceito em cada atividade viraram botões que abrem a
  definição do conceito (com exemplo e lição onde foi ensinado).
- **Glossário** (`#/glossario`): definições dos conceitos estudados, com os não estudados
  guardados sob "trilhas futuras" para não estragar a descoberta.
- **"Você já aprendeu" (`retoma`)**: pontes explícitas entre trilhas (ex.: em EF, retomando
  tabela; em ASP.NET, retomando DbSet).
- **"Isso será importante depois" (`futuro`)**: partes de código que aparecem antes de serem
  ensinadas ficam marcadas (ex.: `context.Produtos` em async, `DbSet` em generics).

## O que ainda falta (transparência)

- As trilhas planejadas (Git, Segurança, Autenticação, Arquitetura, Testes, Frontend, Docker,
  Redis, Mensageria, CI/CD, Azure, Microsserviços) ainda não têm lições: o linter cobre apenas o
  conteúdo publicado.
- Termos e siglas previstos nelas (`DTO`, `JWT`, `IQueryable`, `CORS`, `migration`, `tracking`,
  `container`, `hook`, `state`…) ainda não têm momento de introdução porque o conteúdo não existe.
  Quando forem publicados, o linter os bloqueará automaticamente se aparecerem antes da hora.
- Missões de trabalho ("Seu primeiro dia", simulação de empresa) continuam no roadmap.
- Avaliação semântica de respostas livres (`explain`) ainda usa palavras-chave e critérios.

## Como rodar a validação

```powershell
node ferramentas/validar-dados.js        # estrutura, referências e registro do validador
node ferramentas/linter-pedagogico.js    # ordem de ensino (falha se houver erro)
```

O linter regrava o topo deste arquivo e o `ferramentas/relatorio-pedagogico.json` a cada
execução, preservando esta seção manual.