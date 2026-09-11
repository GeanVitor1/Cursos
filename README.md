# Trilha .NET — Plataforma Interativa de Estudos

Plataforma de aprendizagem por microetapas para formação **Full Stack .NET**, inspirada na
progressão de apps como o Duolingo, mas com foco no trabalho real: SQL, C# aplicado, lógica,
LINQ, Entity Framework Core, ASP.NET Core, segurança, testes, arquitetura, Docker, CI/CD,
Azure, React/TypeScript e inglês para desenvolvedores.

O princípio central: **nunca usar um conceito que ainda não foi ensinado**.

## Como abrir

1. Abra `app/index.html` no navegador (Chrome, Edge ou Firefox). O `index.html` da raiz redireciona para lá.
2. Se o navegador bloquear o progresso no `file://`, sirva a pasta com um servidor local:

```powershell
npx serve .
# ou
python -m http.server 8080
```

O progresso é salvo no `localStorage`. Exporte/importe em **Meu progresso** para backup.

## O que já está implementado

- Motor da plataforma: trilhas, fases, níveis, etapas, progressão, XP, streak, checkpoints.
- **16 tipos de atividade**: múltipla escolha, verdadeiro/falso, conexões, ordenar blocos,
  completar código, escrever código, encontrar erro, prever resultado, interpretar código,
  vocabulário, leitura, debug, cenário profissional, **code review**, **explique com suas
  palavras** e **visualizador interativo** (filtro LINQ/join).
- **Domínio multidimensional**: cada conceito é medido em reconhecimento, associação, ordenação,
  preenchimento, construção e aplicação real.
- **Sistema de confiança**: "tenho certeza / acho que sei / estou chutando" pesa no domínio.
- **Revisão espaçada real**: 1 → 3 → 7 → 14 → 30 dias, com interleaving de conceitos.
- **Feedback educativo por alternativa**, dicas progressivas e **modo socrático** ("Me guie").
- Sessões de **5 / 15 / 30 / 60 minutos** com destinos diferentes.
- **Checkpoint de prontidão** antes de trilhas que reutilizam conhecimentos anteriores.
- **Mapa de carreira** com competências ✅ dominadas / 🟡 em estudo / 🔒 bloqueadas.
- **Glossário** de conceitos e botão "O que é isso?" em cada atividade.
- Blocos didáticos de **💼 No trabalho**, **glossário de termos/siglas**, **"Você já aprendeu"**
  (pontes entre trilhas) e **"Isso será importante depois"** (código explicitamente adiado).
- **Linter pedagógico automático** que impede cobrar um conceito antes de ensiná-lo.
- **Salvamento automático** a cada clique em Continuar (e ao fechar/ocultar o navegador), com
  indicador "✓ Progresso salvo" — ao voltar, a lição retoma exatamente na etapa em que parou.
- **Navegação entre etapas**: botão **‹ Anterior** para revisar a etapa anterior sem sair da
  lição (o antigo botão de sair virou ✕).
- Áudio de pronúncia em inglês (quando o navegador suporta).
- Telas **Entrevistas**, **Certificações** e roadmap de **Projetos**.

## Conteúdo publicado (lições interativas)

| Trilha | Lições | Tema central |
| --- | --- | --- |
| SQL | 6 (5 lições + checkpoint) | bancos, tabelas, SELECT, WHERE, AND/OR, IN/BETWEEN/NOT |
| C# para Backend | 10 | classes, tipos, métodos, listas, null, interfaces, DI, lambdas, exceções, async/await |
| Lógica Aplicada | 1 | total de pedido, validação, duplicados, agrupamento |
| Terminal | 1 | cd/ls, dotnet, git, docker e npm no contexto |
| **English A1** | **10 (9 lições + checkpoint)** | apresentações, números, família, rotina, horas, comida, compras, lugares, perguntas |
| **English A2** | **3** | passado simples, planos/futuro, viagem (aeroporto e hotel) |
| English for Developers | 2 | vocabulário técnico, mensagens de erro e leitura de issues |
| LINQ | 4 | por que existe, Where, Select, First/FirstOrDefault/Single |
| Entity Framework Core | 4 | ORM, DbContext/DbSet, Add+SaveChanges com SQL gerado, leitura de dados |
| ASP.NET Core | 3 | HTTP, JSON, primeira API |

As demais trilhas têm roadmap completo e entram em produção nas próximas fases.

## Inglês (A1 → C1)

- **General English** dividido em níveis CEFR A1, A2, B1, B2 e C1, com unidades curtas de 15–45 min.
- **English for Developers** conectado ao nível geral: nada de documentação B2 para quem está no A1.
- **Teste de nivelamento** opcional (10 questões progressivas) em `#/nivelamento`, que recomenda o
  nível de partida — sem bloquear quem preferir começar do A1.
- **Habilidades medidas separadamente**: Vocabulário, Gramática, Listening, Reading, Writing e
  Compreensão (Speaking marcado como "em breve").
- **Listening com Text-to-Speech** (`🔊 Ouvir` e `🐢 Devagar`), com fallback de texto quando o
  navegador não tem voz em inglês.
- Atividades variadas: ouvir e selecionar/escrever, escolher a imagem, diálogos simulados,
  conectar, completar, ordenar, traduzir, ler e escrever.
- Vocabulário e estruturas com erro voltam pela **revisão espaçada** com atividades diferentes.

## Mobile First (referência 430x932)

- **Navegação inferior fixa** (Início, Inglês, Revisão, Progresso e Menu) + **menu lateral
  recolhível**; a sidebar de desktop continua igual em telas largas.
- **Modo foco na aula**: durante a lição, o cabeçalho e a navegação inferior somem e o botão
  **Continuar** fica fixo na parte de baixo.
- Atividades com **áreas de toque ≥ 44–50px**, sem depender de hover e sem arrastar: ordenar
  blocos e conectar funcionam por toque (tocar → encaixar).
- Código, diagramas e tabelas rolam **dentro do próprio bloco**, evitando scroll horizontal da
  página.
- Modais limitados à tela (`max-height: 86vh`, largura `calc(100% - 28px)`).
- Layout de coluna única para cards, estatísticas, mapa, glossário e conexões em telas pequenas.

## Ordem de estudo e pré-requisitos

A ordem respeita o grafo real de dependências (também disponível em `data/skills-map.json`):

```
SQL ─┐
     ├─► LINQ ─► Entity Framework ─► ASP.NET Core ─► Segurança ─► Autenticação
C#  ─┘        └────────────────────────────────────► Arquitetura / Testes
Lógica ─► C#          Terminal ─► Git ─► CI/CD
Inglês (transversal)
```

| Trilha | Requer |
| --- | --- |
| SQL, C#, Lógica, Terminal, English | — |
| Git | Terminal 100% |
| LINQ | C# 100% + SQL 100% |
| Entity Framework Core | SQL 100% + C# 100% + LINQ 100% |
| ASP.NET Core | C# + SQL + LINQ + EF Core 100% |
| Segurança, Arquitetura, Testes | ASP.NET 100% |
| Autenticação | ASP.NET 100% + Segurança 100% |
| Frontend | ASP.NET 100% + Terminal 100% |
| Docker | ASP.NET 100% + Terminal 100% |
| Redis, Mensageria | ASP.NET 100% |
| CI/CD | Git 100% + Docker 100% + Testes (via grafo) |
| Azure | Docker 100% + CI/CD 50% |
| Microsserviços | ASP.NET + Arquitetura + Mensageria + Docker 100% |

- Dentro de uma trilha, as etapas liberam em sequência.
- Entre trilhas, a trilha só sai de **Bloqueada** quando os pré-requisitos atingem o mínimo.
- Trilhas `transversal: true` (English e Git) podem rodar em paralelo.
- O botão **Continuar** da home sempre aponta para a próxima etapa do caminho principal.

## Estrutura

```
app/             motor da plataforma (HTML, CSS e JavaScript)
data/            manifesto, conceitos, habilidades (skills map) e sementes de progresso
trilhas/         uma pasta por trilha; lições em trilhas/<trilha>/licoes
provas/          checkpoints (prova de nível)
certificacoes/   mapa de certificações externas x trilhas internas
projetos/        roadmap dos 5 projetos progressivos
entrevistas/     áreas e perguntas de entrevista por trilha
desafios/        como funcionam os desafios (+50 XP)
revisoes/        como funciona a revisão espaçada
assets/          diagramas e ilustrações
ferramentas/     validador de dados (Node.js)
```

## Como adicionar uma nova lição

1. Crie o arquivo em `trilhas/<trilha>/licoes/<id>.js` no formato:

```js
Plataforma.registrarLicao({
  id: 'sql-06',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Ordenando com ORDER BY',
  duracaoMin: 40,
  xp: 30,
  objetivos: ['Ordenar resultados'],
  conceitos: ['sql.order-by'],
  etapas: [
    { tipo: 'conteudo', blocos: [{ tipo: 'texto', texto: 'Sua explicação curta.' }] },
    { tipo: 'atividade', atividade: { /* veja os modelos existentes */ } }
  ]
});
```

2. Registre o arquivo em `data/manifest.js` (lista `licoes` da trilha).
3. Adicione a etapa na trilha (`trilhas/<trilha>/trilha.js`) com `licao: 'sql-06'`.
4. Registre os novos conceitos em `data/conceitos.js` e, se a trilha mudar de dependências,
   ajuste `data/skills-map.json` e `data/habilidades.js`.
5. Valide: `node ferramentas/validar-dados.js`.

Nomes de conceitos usam o formato `trilha.conceito` (ex.: `sql.where`).

## Boas práticas de didática adotadas

- **Um conceito principal por lição** (no máximo dois fortemente ligados).
- Camadas: intuição → analogia curta → visualização → exemplo mínimo → interação → aplicação.
- Toda lição tem `objetivos`, `trabalho` ("💼 no trabalho") em algum ponto e atividades de
  dimensões diferentes.
- Feedback de erro explica **por que** a alternativa está errada (`feedbackErro`).
- Exercícios usam problemas de trabalho (pedidos, estoque, clientes), nunca exemplos aleatórios.
- Duração-alvo: 20 a 60 minutos por lição.

## Tipos de bloco de conteúdo

`texto`, `destaque`, `nota` (tom: info | atencao | sucesso), `lista`, `passos`, `codigo`,
`diagrama`, `tabela`, `vocab`, `trabalho` (💼), `glossario` e `ingles`.

## Validação

```powershell
node ferramentas/validar-dados.js        # estrutura, referências e registro
node ferramentas/linter-pedagogico.js    # ordem de ensino dos conceitos (falha se houver erro)
node ferramentas/linter-ingles.js        # vocabulário de inglês palavra a palavra (inclui distratores)
node ferramentas/linter-simbolos.js      # símbolos/APIs de código antes da explicação
node ferramentas/validar-tudo.js         # roda os quatro validadores em sequência
```

O **linter pedagógico** percorre as trilhas na ordem real do aluno e impede que um conceito seja
praticado, cobrado ou mencionado antes de ser ensinado. Ele usa os marcos explícitos do conteúdo
(`{ tipo: 'conceito' }` e `introduz: [...]`), os pré-requisitos de `data/conceitos-registry.js` e o
léxico de termos em português (`data/termos-portugues.js`), que cobre jargão como "compilador",
"consulta", "filtro", "service", "produção", "endpoint", "performance" e termos de trilhas futuras.
O resultado completo fica em `AUDITORIA_SEQUENCIAL.md`, com a tabela de evidências
(introdução → primeira prática → primeira avaliação) e o estado de cada conceito
(`INTRODUZIDO`, `PRATICADO`, `PRONTO_PARA_AVALIACAO`). A matriz completa, com `ensina` de cada
etapa e `exige` de cada atividade, fica em `ferramentas/matriz-pedagogica.json`.

O **linter de inglês** constrói o léxico em ordem (blocos `vocab`, `ingles`, `glossario` e
`introduzVocab`) e verifica TODA string em inglês exibida ao aluno — enunciado, alternativas
erradas, áudio, diálogos, leituras, dicas citadas e feedback — **nas 45 lições, não só na trilha
de inglês**. Ele usa `data/ingles-lexico.js` (nomes próprios, contrações, identificadores de
código e palavras portuguesas) e grava `ferramentas/matriz-ingles.json`
(palavra → lição que ensinou → primeiro uso em atividade).

Nas trilhas de programação, o inglês segue a mesma progressão do resto do curso: cada etapa
ensina no máximo **3 termos novos** (blocos `vocab`/`introduzVocab`) e toda frase em inglês só
pode usar palavras já explicadas antes — fora as palavras de ligação básicas (`the`, `is`, `and`,
`from`...). Assim, `retrieve`/`customer`/`all` são ensinados em uma etapa, `name`/`email`/`of` na
seguinte, e `order`, `where` e `between` só aparecem quando o conteúdo da trilha realmente precisa
deles. O relatório lista as introduções por etapa em `introducoesDeVocabulario`.

O **linter de símbolos** usa `data/simbolos-codigo.js` (105 símbolos, palavras-chave e APIs com
a lição em que são explicados) e garante que `foreach`, `=>`, `await`, `Where`, `SaveChanges`,
`Results.Ok`, `TOP` etc. não apareçam em blocos de código antes da explicação.

Regras aplicadas pelos linters:

- atividade/prova/desafio usando conceito não introduzido → **erro**;
- conteúdo mencionando conceito não introduzido → **aviso**;
- desafio ou prova cobrando conceito não praticado → **erro**;
- pré-requisito conceitual não introduzido antes → **erro**;
- `retoma` apontando para conceito ainda não ensinado → **erro**;
- palavra de inglês usada antes de ensinada (inclusive em alternativa errada) → **erro**;
- etapa de programação introduzindo mais de 3 termos novos de inglês de uma vez → **erro**;
- frase do English corner usando palavra ainda não explicada (fora palavras de ligação) → **erro**;
- exercício de inglês de trilha de programação cobrando palavra não ensinada → **erro**;
- símbolo/keyword de código usado antes de explicado → **erro**;
- siglas e símbolos (`ORM`, `API`, `HTTP`, `DbSet`, `=>`, `ToListAsync`…) fora de ordem → erro.

O teste de nivelamento (`data/nivelamento-ingles.js`) é a única exceção: como ele existe para
descobrir o nível do aluno, usa conteúdo progressivo por definição e não passa pelo linter de
inglês.
