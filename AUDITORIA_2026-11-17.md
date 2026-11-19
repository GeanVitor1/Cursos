# Auditoria — 17/11/2026 (após commits c7ed227 e 4f43ac0)

Estado: 56/56 testes passam; validar-tudo sem erros; `npm run validate` falha com "Catálogo desatualizado".

## Progressão (crítico/alto)
1. **Stubs inflam o progresso** — `app/js/nucleo/progresso.js:16-45`: % calculado só sobre lições publicadas; linq 4/19 = 100% libera EF → aspnet → docker/redis/frontend. Publicar lições novas faz o % cair e rebloqueia dependentes. Corrigir: pré-requisito sobre total planejado ou flag `conteudoCompleto`; exigir checkpoints.
2. **Checkpoint refeito não credita** — `app/js/ui/runner.js:41` limpa só `resultadosEtapas`; `etapasPremiadas` fica → sem XP/conceito e mensagem "já contabilizada" na prova.
3. **Checkpoint já aprovado refeito mostra "aprovado" com nota baixa** — `armazenamento.js:719` + `runner.js:746` (`aprovado !== false`); a tela reaproveita resultados antigos.
4. **engenharia-ia cedo demais** — `data/manifest.js:606-625` coloca após SQL, sem pré-requisitos; as lições cobram EF Core, Redis, DI e testes.
5. **Percurso Cibersegurança quebrado** — inclui aspnet sem csharp/sql/linq/EF; `proximaEtapa` (`progresso.js:160`) cai em SQL; azure exige cicd (fora do percurso).
6. **ciber-fundamentos-00..02** pressupõe ASP.NET, Linux, JWT; quiz cobra DNS/TLS antes de ensinar.
7. **`explain` das 8 lições novas aprova quase tudo** — mesmas palavras-chave genéricas, `minimoChaves:2`, casamento por substring ("terror" casa "erro"); feedback lista as palavras faltantes (`app/js/atividades/analise.js:210-253`).
8. **"Dominada"/prontidão inalcançáveis** — `data/habilidades.js` referencia conceitos sem lição (`aspnet.dto`, `aspnet.di`, `sql.ingles`…).

## Didática (médio/baixo)
9. Dependências das competências ≠ pré-requisitos das trilhas (csharp→logica, cicd→testes, microsservicos→azure); sem percurso, recomenda sql-00 antes de lógica.
10. `dominioTrilha` agora conta conceitos não praticados como 0; mapa mostra "Domínio 0%" (`progresso.js:259-272`, `ui/mapa.js:29`).
11. Tela de reprovação com ícone ✓ e "objetivos trabalhados" (`ui/conclusao.js:79-80`).
12. 31 dicas entregam a resposta: `sql-03.js:238`, `sql-09.js:136`, `terminal-00.js:135`, `logica-00.js:38`, cs00-a3, cs02-a2, docker04-a3, redis01-a2, cp-docker-pr2.
13. Enunciados SQL subespecificados: `sql-35.js:124` (id/alias não pedidos), `sql-29.js:149` (nome do índice), `sql-checkpoint-relacionamentos.js:229` (WHERE anula LEFT JOIN, contradiz a dica).
14. Validador SQL sem equivalência (`ui/dom.js:85-120`): `ON a=b` vs `b=a` rejeitado; 78/79 write-code com ≤2 respostas.
15. `sql-35` promete `SUM() OVER` e não ensina.
16. 15 IDs de atividade duplicados (`cp-i1..10` em dois checkpoints; `en-a2-02-p1..5`) — revisão descarta silenciosamente.
17. Tempo de estudo antigo zerado na Home (`progresso.js:358`).
18. Correta é a opção mais longa em ~60–70% das múltiplas escolhas; distratores caricatos nas lições novas.
19. Após o 1º erro a correta fica destacada (`escolha.js:37-43`), 2ª tentativa trivial.
20. Lições novas com objetivos/dicas em template idêntico; `engenharia-ia-02-bases` cobra termos não definidos.
21. `logica-00` única lição cobra laço/condição sem ensinar; `lg00-a3` usa `produto` não declarado.
22. `term00-a3` enunciado vago.
23. Escrita em inglês aceita "Yesterday I go to work" (`en-a2-00.js:~371`).
24. Comandos git/docker aceitos com qualquer caixa (sem aviso didático).
25. `atividadesDeRevisao` O(conceitos × lições²) — memoizar.
26. Supabase com chave pública e linha fixa `usuario_principal` (`nuvem.js:3-7`): qualquer um lê/sobrescreve progresso.

## Visual
Sem overflow de página, erros de console ou 404 (desktop/mobile, claro/escuro).
- **Médio** — contraste do botão primário 4,02:1 (claro) / 3,65:1 (escuro) (`app/css/ios.css:23,54`).
- **Médio** — azul sobre azul claro 3,1–3,76:1 em `.btn-suave`, `.chip-primaria`, `.percurso-status`, `.trilha-sigla`, `.nav-sigla` (`estilos.css:162-170,315,362`); chips do mapa 3,1–3,55:1.
- Baixo — "‹ Anterior" 30×36px no mobile (`estilos.css:1553`); "Alternar tema", chip "Sincronizado" e "🔊 Ouvir" < 32px de altura.
- Baixo — `.tabela-dados` com `nowrap` cortada sem indicação de rolagem (`estilos.css:701-707`, terminal-00).
- Baixo — emoji 📘 do Glossário desalinha a sidebar (`.nav-icone`).
- Baixo — cards de estatística empilhados no mobile (usar grid 2×2 ≤480px).
- Baixo — toast "Conclua a etapa anterior…" cobre o botão Continuar.
- A verificar manualmente: en-a1-00 etapa 16 (dialogue) — "Verificar" não habilitou no script.

---
# Rodada 2 — 18/11/2026 (revisão atividade por atividade)

## Inglês
- **Crítico** — `validarAudio` (`app/js/atividades/idiomas.js:41-43`) aceita qualquer substring do áudio: "seven" passa para 17, "eight" para 80, "forty" para 42 (inclusive na prova `en-a1-cp3`). Exigir igualdade; "seven oh five" e "6.45" não convertem.
- en-a1-00 etapa 16 (dialogue): **não é bug** — Verificar habilita 550/900 ms após o último turno; falta indicação visual e `aria-live`.
- Validadores de escrita aceitam frases erradas: en-a1-00-a5 (nome = qualquer palavra), en-a1-03-a5 ("I am a banana"), en-a1-05-a5 (não exige comida), en-a1-08-a6 (sem "?"/sem interrogativo), en-a2-00-a5 ("hundred"/"red" contam como passado), en-a2-01-a5 ("going to the beach"), en-a2-02-a5 (palavras soltas).
- Variantes válidas rejeitadas: en-a1-00-p6 (good/great), en-a1-01-a5 e prova cp9 ("I'm 25" sem "years old"), en-a1-06-a5 ("pay with my card"), en-a1-06-p7 (bill/price), en-a2-00-a5 (woke, drove, began…), en-a2-01 ("'ll"), "next weekend", "on the bus".
- Erros de conteúdo: en-a1-01:82 "todos terminam com o mesmo som" (falso p/ 11-13); en-a1-05:168/289 "A water, please" (incontável); ingles-00:256 chama substantivos compostos de adjetivos; en-a1-02:69 dica falsa; "This is Ana. Her name is Ana."; diálogos incoerentes (en-a1-02-a4, en-a1-00:268, ingles-02:172, ingles-03:162).
- Conceito antes de ensinar: "at seven" (en-a1-03), "Where is…?" (en-a1-06), "Do you…?"/do-support nunca ensinado, 21-99 sem prática, T-shirt/train station/write.
- **Alto** — ingles-02 não explica o present perfect (have/has + particípio); nível B1 em A2.
- en-a1-04 promete datas e não ensina; objetivos não cobertos em ingles-03, ingles-04, ingles-18 (conflitos de merge).
- 33 atividades sem `habilidade` (ingles-00/01/17/18) → radar de habilidades vazio; en-a1-04-p2 marcada listening sem áudio.
- English for Developers (ingles-00/01, vocabulário A1) vem depois de C1 na ordem da trilha.
- Gaps de gramática: present continuous, can/can't, there is/are, passado negativo/interrogativo.
- Checkpoint A2: 4 questões copiadas literalmente das lições; sem writing.
- Contagens nos títulos de vocabulário ("(6)" com 2 pares) erradas em quase todas as lições.
- TTS não seleciona voz en-US disponível; dialogue sem "ouvir de novo".

## SQL / LINQ / EF / ASP.NET (gabaritos executados em SQLite)
- **Crítico** — `sql-22.js:69` sql22-a2: gabarito "Teclado e Monitor" está errado (média 200, `>` estrito ⇒ só Monitor); o próprio feedback contradiz.
- **Alto** — `sql-04.js:152` precedência AND/OR explicada ao contrário (exemplo com OR entre parênteses).
- **Alto** — exemplos que não rodam: `sql-17.js:61` (Pedidos.Nome), `sql-25.js:61` (Pedidos.Cidade; tabela Fornecedores inexistente), `sql-28.js:100` (Preco em Clientes), `sql-31.js:61` (função nunca criada, sem `dbo.`, objetivo CREATE FUNCTION não cumprido).
- **Alto** — `sql-36.js:64` `DECIMAL` sem precisão perde centavos (contradiz o texto).
- **Alto** — `provas/sql-iniciante.js:222` cp-i9: "INSERT INTO Clientes VALUES ('Ana') funciona" marcado verdadeiro (falso).
- **Alto** — `sql-08.js:100` e cp-i3: lacuna aceita `limit` gerando `SELECT limit 5` inválido.
- **Alto** — `validar` tolerante vira código morto quando há `respostasAceitas` (`codigo.js:36-37`): api02-a4 rejeita `Created($"/produtos/{produto.Id}")`; lq01-a3, lq02-a4, ef03-a4 com esqueleto incompatível com o gabarito; ef02-a4 rejeita `AddAsync`/`context.Add`.
- **Alto** — enunciados sem colunas/alias/nome que o gabarito exige: sql13-a5, sql16-a5, sql24-a4 (alias `classe`), sql31-a5 (procedure), cp-g6/cp-g8/sql38-a2 (`ticket`/`total`), sql19-a4/sql20-a4/sql21-a4 (`as total`), sql37-a3.
- Conteúdo incorreto: sql-20 diz "pedidos" mas conta clientes; "Having filters rows" (sql20-a5); sql-21:57 alias utilizável no HAVING (falso); sql-38 int/int = 0 na taxa; sql-37 INNER JOIN não acha produto sem venda; sql-32 `BEGIN;` inválido em T-SQL e ROLLBACK "automático"; sql-33 deadlock incompleto; sql-09:209 "empty" = NULL; `sql-checkpoint-intermediario.js:186` "toda CTE precisa ser usada" (falso); cp-i10 omite COUNT; sql37-a4 "Orders" em vez de "Products"; sql-16 diz que ItensPedido aponta para Clientes; sql16-a4 item sem pedido viola FK; sql11-a3 "passou… e foi recusada".
- `feedbackErro` desalinhado: sql10-a2, cp-g2, lq01-a2.
- **Médio** — nunca se ensina `CREATE TABLE`, mas sql-01 promete e ef-00 diz "você já sabe criar tabelas".
- T-SQL sem aviso de dialeto (GETDATE, DATEADD, LEN); `TOP (5)`, `BEGIN TRAN`, `START TRANSACTION`, `Pedidos INNER JOIN Clientes`, `Pedidos.ClienteId IS NULL` rejeitados.
- Objetivos sem atividade: sql-06 (ORDER BY múltiplo), sql-10 (`_`, NOT LIKE), sql-11, sql-15 (RIGHT JOIN), sql-16 (só 1 JOIN em "Múltiplos JOINs"), sql-26, sql-28 (TRIM/REPLACE/CAST), sql-32 (ROLLBACK), sql-36, sql-38 (período/mês), sql-39 (paginação, reescrita de YEAR()), sql-03 ("nulos").
- Atividades duplicadas com gabarito idêntico: sql23-a4/a5, sql25-a4/a5, sql26-a3/a4, sql30-a3/a4; sql-12/cp-a* repetem sql-02/03.
- Dados inconsistentes: sql01-a5 dica "clientes 1 e 2" (existe 3); sql01-a4 coluna endereço inexistente; preço do Mouse 99/100; sql-07 sem tabela de origem; cp-p3 totais empatados.
- EF/ASP.NET: código sem `using`/`UseSqlServer` não compila sozinho; api02-a2 order-blocks omite `var produtos`; diagrama DbSet (ef-01) desalinhado; Single vs FirstOrDefault discutível em PK.
- Baixo: "legal"→"válida" (sql-08); sql-05 "os três" com cinco pares; sql-29 nome do índice fora da convenção; MCs que só traduzem frases (sql33/34/36/39-a*); estatística inventada em sql-21.

## Docker / Git / C# / Redis / Lógica / Terminal / novas
### Docker
- **Alto** — toda a trilha usa `aspnet:8.0` com `-p 8080:80`/`EXPOSE 80`; desde o .NET 8 a imagem escuta na **8080** → a API ensinada não responde (docker-02/03/09/10, checkpoints).
- **Alto** — `docker-10.js:87` e cp-docker-pr6: `condition: service_healthy` sem `healthcheck:` → compose não sobe; cp-pr6 diz "arquivo correto" mas falta ACCEPT_EULA/MSSQL_SA_PASSWORD.
- **Alto** — cp-docker-pr4: diz que mudar `environment:` exige `--build` (falso; contradiz docker-05).
- **Alto (verificar)** — `docker-08.js:137` healthcheck usa `/opt/mssql-tools/bin/sqlcmd`; na 2022 é `mssql-tools18` com `-C`.
- Postgres sem `POSTGRES_PASSWORD` e sem tag (docker-04/06/07, cp-pratica) → container sai.
- .NET 8 fora de suporte (fim 10/11/2026): migrar para 10.0 LTS; tags flutuantes (redis:7-alpine, mssql 2022-latest).
- docker01-a4: `docker run nginx` sem `-d`/`--name` prende o terminal e quebra `docker stop nginx`; docker04-a4 idem.
- docker09-a2 lacuna da porta externa; docker09-a5 "API continua se Redis cair" sem tratamento ensinado; `--env`, `compose.yaml`, sintaxe de mapa e `TrustServerCertificate` não tratados; volume sem bloco `volumes:`.
### Git
- **Alto** — git01-a4 cobra `status→add→commit→pull→push`, checkpoints cp-git-f5/p1 cobram `pull→status→add→commit→push`: uma reprova a outra.
- cp-git-c3 faz merge local sem PR (git04 diz que é erro); git08-a4/cp-git-p7 mandam corrigir na main.
- git02-a4 saída de `git branch` mostra `* feature/frete` antes do switch; git04-a4 e cp-git-p4 com diffs que têm bug óbvio (total zerado / cupom somado) ignorado pelo gabarito.
- git03-a5 apaga só a branch local quando a cena pede remota; git-03:28 merge "cria novo ponto" contradiz fast-forward; git02-a7 texto confuso.
- Dicas falsas: "add aceita um arquivo por vez" (git00-a6), "commit fica vazio" (git00-a5). Rejeitados: `git add -A`, `switch --create`, `--amend`.
### C#
- cs02-a4: `public` em função top-level não compila (CS0106); avisos de Nullable (CS8618/CS8600) nunca explicados.
- order-blocks com linhas independentes aceitam uma só ordem (cs00-a4, cs03-a4; motor `manipulacao.js:147`).
- cs05-a1 match ambíguo; cs05-a4 diff inconsistente; explain fáceis em cs02-a5, cs05-a5, cs06-a4, cs07-a6, cs09-a4.
- Objetivos sem atividade: var, foreach, AddScoped, void/parâmetros; trilha C# sem checkpoint.
- Rejeitados: `*= 0.9m`, `quantidade * preco`; exemplos inconsistentes (csharp-03 glossário), "objeto nasce vazio".
### Redis
- redis04-a3 não compila (`produto` usado antes e redeclarado); redis06-a5 gabarito incompleto (ProdutoService não registrado).
- redis-06 grava sem TTL contradizendo redis-02; redis03-a3 usa API `cache.Get/Set` inexistente; JSON camelCase vs PascalCase sem options.
- cp-redis-p6 depende de dado ausente; ordens/sintaxes válidas rejeitadas (SETEX, PX); "sem TTL nunca é removida" ignora eviction; diagramas sem acentos.
### Lógica / Terminal / novas
- lg00-a1 feedbacks trocados; "conjunto de vistos" não ensinado; `pwd` de exemplo é Git Bash, não PowerShell; feedback diz que commit envia código.
- Lições novas: engenharia-ia-00-bases só 2 pares; várias sem atividade de base; ressalva de proxy/WAF no 403; conceitos `aspnet.*` duplicados.

## Módulos do app, acessibilidade e visual (Playwright 1366/768/375, claro/escuro)
- **Médio-alto** — localStorage corrompido ou com 1 campo inválido descarta TODO o progresso e desliga a persistência na sessão (`armazenamento.js:78-150,196-206`); `/dados` diz "navegador bloqueou" e exporta vazio; `versao` nunca migrada; falha de quota desliga para sempre (`:229-238`).
- **Médio** — deep link para lição bloqueada usa `pushState` no redirecionamento → botão Voltar fica preso (`licao.js:41`, `roteador.js:51`); usar `replaceState`.
- **Médio** — dicas sem estilo: JS cria `.caixa-dica`/`.caixa-socratica`, CSS só tem `.dica-caixa` → aparece "DicaO cabeçalho…" colado (`runner.js:~232`, `estilos.css:927`). Sem CSS também: `.socratica-fim`, `.etapa-meta`, `.english-painel`, `.retoma-icone`, `.futuro-icone`.
- **Médio** — markdown literal na tela: `**não**` na conclusão (`conclusao.js:55`) e `**A2**` no nivelamento (`nivelamento.js:90`).
- **Médio** — acessibilidade: feedback sem `aria-live`; foco cai no BODY após "Tentar novamente"/"Continuar"/troca de rota; `document.title` fixo; opções sem `aria-pressed` e estado só por cor; botões ✕/×/☰ sem `aria-label`; sem skip link; toasts 3,2 s.
- **Médio** — alternar tema/meta/sync re-renderiza e volta o scroll ao topo (`layout.js:148-156,210`).
- **Médio** — Glossário (61.000 px no mobile) e Meu progresso (19.000 px) sem busca/filtro/paginação.
- Baixo — order-blocks sem limpar/reordenar/arrastar/teclado; "Tentar novamente" mantém montagem errada.
- Baixo — dialogue substitui a resposta errada do aluno pela certa e só avisa no fim; TTS automático sem controle.
- Baixo — visualizer dá +10 XP só por clicar; match-pairs sempre "Boa!" mesmo com erros; explain sem palavrasChave aprova qualquer texto ≥20 caracteres; Ctrl+Enter sem indicação.
- Baixo — sair do nivelamento pelo Voltar do navegador descarta respostas sem confirmar; "Etapa sem conteúdo ainda" sem botão de saída.
- Baixo — `concluirLicao` sem `try/finally` em `emTransacao`; importar aceita xp 1e21; reimportar o mesmo arquivo pode não disparar.
- Baixo — Entrevistas mostra perguntas bloqueadas; `projetos.js` devolve 100% com lista vazia.
- Baixo — botões de confiança parecem texto (`ios.css:419`); nivelamento com botões colados; em zoom 200% "Continuar" sai da tela (rodapé não sticky); tema/stats no fim da sidebar rolável; cabeçalho ".NET" nas trilhas de ciber.
- Verificado OK: sem overflow/erros de console; rotas inválidas tratadas; foco visível funciona.
- Screenshots: `C:\Users\geand\AppData\Local\Temp\claude\5b9e39c6efbb7356\4a6f14f3-690d-4cb3-8e03-0b8d19ec96f6\scratchpad\pw\shots\`
