# Auditoria e correções — 06/10/2026

Revisão do motor HTML/CSS/JavaScript, carregamento e roteamento, persistência, integração Supabase, atividades, telas, responsividade, catálogo, ferramentas e testes. O conteúdo foi verificado pelos validadores estruturais e pedagógicos e pelos testes das respostas e das lições publicadas.

## Correções aplicadas

| Área | Falha encontrada | Correção |
| --- | --- | --- |
| Exercícios de código | Flags como `--soft` e `--hard` eram descartadas como comentários SQL; comandos incompletos podiam ser aceitos. | Comentários e sensibilidade a maiúsculas respeitam o contexto SQL, código e terminal; tokenização compartilhada. |
| Domínio | Três acertos por chute podiam representar 100% de domínio; qualquer erro histórico impedia alcançar domínio depois. | Pontos ponderados divididos pelo total de tentativas; recuperação permitida quando a evidência atinge os critérios de domínio. |
| Revisão | Chutes não recebiam a revisão prometida; conceitos dominados eram excluídos mesmo com revisão vencida. | Agendamento de chutes e manutenção dos conceitos vencidos na fila. |
| Datas | Revisão imediata comparava o dia UTC do erro com o dia local. | Comparação por data local, com teste após meia-noite UTC no fuso de São Paulo. |
| Dados legados | Mescla modificava objetos recebidos, perdia dimensões e podia produzir contadores inválidos quando faltavam campos antigos. | Cópias independentes, união das dimensões e normalização dos contadores de conceitos e habilidades. |
| Concorrência | Uma configuração recente de uma aba antiga podia substituir uma agenda mais nova; o mesmo prêmio recebido com valores diferentes podia perder XP dependendo da ordem da mescla. | Agenda selecionada pela data da alteração do próprio conceito; prêmio deduplicado conservando o maior valor conquistado em ambas as ordens. |
| Importação | Validação superficial aceitava estruturas internas inválidas e chaves que alteram protótipos. | Validação antes da substituição ou mescla; dados atuais preservados ao rejeitar o arquivo. |
| Desempenho | Cada salvamento reconstruía o histórico mesmo sem alteração externa do armazenamento. | Cache do último conteúdo persistido; mescla continua ocorrendo quando outra aba escreve. Revisões carregam somente os oito conceitos usados na sessão. |
| Navegação | Finalizar sincronização ou leitura de backup podia renderizar Meu progresso após o usuário sair da tela. | Renderização condicionada à versão da rota. Erros síncronos de handlers também são tratados. |
| Catálogo | Nomes herdados, como `toString`, eram aceitos nos mapas; títulos de níveis contavam registros planejados como liberados. | Mapas sem protótipo e contagem de lições efetivamente publicadas. |
| UX e acessibilidade | Foco escapava do modal de explicação; menu fechado continuava disponível ao teclado; faltavam nomes em campos e informações de navegação. | Ciclo de foco nos modais e menu, Escape e restauração do foco, visibilidade do menu, nomes de campos, estado expandido, página atual e anúncios de feedback. |
| Tema e layout | Tema importado ou recebido de outra aba não era aplicado; breakpoints conflitavam entre 961 e 980 px; descrições e metadados usavam texto com pouco contraste. | Aplicação do tema ao atualizar os dados, alinhamento do breakpoint responsivo e contraste maior dos textos secundários nos dois temas. |
| Manutenção | Permaneciam um atalho sem uso de conclusão manual e textos que prometiam desmarcar etapas; timers podiam disputar o foco. | Remoção do atalho, texto de revisão corrigido e controle do foco e timers pelo ciclo de vida do runner. |
| Servidor local | Arquivos internos, como `.git/config`, eram servidos; consultas ao disco bloqueavam o processo e arquivos eram lidos integralmente. | Bloqueio de arquivos internos e caminhos inválidos, verificação do caminho real inclusive em links/junções, métodos GET/HEAD, acesso assíncrono e streaming. |

## Verificação

- Build do catálogo e quatro validadores: passaram; 20 trilhas, 367 registros, 130 lições publicadas e 885 atividades.
- Testes unitários: 27 cenários, incluindo dez novos casos de regressão.
- Primeira execução de navegador: 107 cenários passaram. Na validação final, os 115 cenários passaram em 7,8 minutos, com o servidor atualizado e as novas regressões; o ajuste final de foco na página ativa foi verificado separadamente.
- Testes do navegador simulam o Supabase; nenhum progresso real ou configuração do banco foi alterado.
- `npm audit`: nenhuma vulnerabilidade reportada nas dependências instaladas.
- Revisão visual e verificação de overflow em desktop/mobile; testes adicionais em 961, 980 e 1024 px.
- Verificação de sintaxe: 452 arquivos JavaScript passaram; `git diff --check` sem erros de whitespace.
- Alterações de datas dos relatórios gerados pelos validadores foram descartadas para evitar diffs sem mudanças de conteúdo.

## Medição de salvamento

Em um cenário local de 100 salvamentos com 1.000 eventos de prática, o código do commit inicial levou **1.466 ms** e o código corrigido levou **59 ms**, conservando 100 XP e 1.000 práticas nos dois casos. A medição isola persistência em memória e reconstrução de histórico; não representa latência do Supabase nem um percentil de desempenho em produção. Evidência local: `.gstack/qa-reports/salvamento-2026-10-06.json`.

## Limites da arquitetura preservada

A nuvem existente usa `usuario_principal`, compartilhado por quem acessa o site, sem login ou isolamento por aluno. A tela Meu progresso agora explicita esse comportamento. Uso com múltiplos alunos requer identidade individual e políticas de acesso no backend; acrescentar autenticação mudaria o fluxo atual e exige configuração externa.

O modo de sincronização atômica permanece desabilitado até que a migração SQL existente seja aplicada e validada no banco. Os testes cobrem conflitos simulados, mas não certificam as políticas ou a migração de um banco em produção.

Exercícios de código são comparados com as respostas cadastradas e com equivalências específicas da linguagem. O navegador não compila nem executa código do aluno; outras soluções equivalentes precisam estar entre as variantes aceitas.

## Revisão complementar dos gabaritos — 06/10/2026

A primeira revisão deixou escapar uma falha real: testar a primeira resposta cadastrada não verificava se ela correspondia à grafia exigida pelo enunciado e pela explicação. Em SQL-12, o gabarito armazenava `'teclado'`, embora ambos pedissem `'Teclado'`, e a comparação não aceitava `Preço` como variante didática de `Preco`. A resposta enviada pelo aluno foi reproduzida e incluída nos testes de regressão.

| Área | Correções e critérios |
| --- | --- |
| SQL | Identificadores aceitam caixa, cedilhas e acentos, inclusive Unicode decomposto. Espaços, comentários, terminador opcional, identificadores delimitados, JOIN/INNER JOIN, LEFT OUTER JOIN, AS opcional em aliases e ASC padrão são tratados sem alterar valores entre aspas. |
| Gabaritos SQL | Grafia de nomes, cidades, status e textos corrigida conforme enunciado/explicação; três consultas de agrupamento mostradas nas explicações agora são aceitas também sem alias. Retirada a variante SELECT * de uma pergunta que exige nome e preço. BEGIN TRANSACTION aceito na transferência. |
| C#, LINQ, EF e ASP.NET | Métodos, tipos e propriedades corrigidos nos gabaritos, especialmente nas lacunas de Redis com código C#. Aceitas variações previstas de var, retorno com variável local, método com expressão, nomes locais e parênteses de lambdas e ordem de propriedades automáticas. Mantida a grafia necessária das APIs. |
| Docker | Variável ASPNETCORE_ENVIRONMENT=Development corrigida, incluindo Compose e checkpoint. Opções equivalentes e ordem de flags aceitas; imagem, valores e portas continuam sendo diferenciados. |
| Git | Comandos múltiplos corrigidos para linhas separadas; aceitos ponto e vírgula e &&. Mensagens não vazias podem variar quando o exercício não determina o texto. Corrigida a branch errada e retirada a flag inválida - -soft. |
| Redis | SET/GET/EX aceitam caixa; aspas equivalentes são aceitas no valor Mouse. Chaves e valores não são convertidos indiscriminadamente para minúsculas. |
| Inglês | Lacunas aceitam caixa e espaços. Escrita livre trata apóstrofos tipográficos, contrações e espaços mantendo quebras de frase. Corrigidos What is the price, my name’s e dois planos na mesma frase. Transcrições numéricas mantêm dígitos e formato de horário, permitindo 06:45. |
| Identificação | O motor recebe a trilha da lição, inclusive nos checkpoints cujos IDs começam com cp-. Isso evita interpretar comandos como código C# ou lacunas de Inglês como código sensível a maiúsculas. |

Verificação desta revisão: build e quatro validadores sem erros, **39 testes unitários passando** e **117 cenários de navegador passando em 8,5 minutos**. A suíte percorreu as 130 lições/885 atividades, verificou todas as alternativas de múltipla escolha e testou **1.281 entradas** nos campos de escrita, preenchimento, explicação e transcrição, incluindo todas as respostas cadastradas e variações válidas e inválidas. O teste unitário dos modelos percorreu 788 variantes, complementadas pelos casos específicos de SQL/C#/comandos/Inglês. Também passaram a verificação de sintaxe dos 435 arquivos JavaScript rastreados e `git diff --check`. Datas dos relatórios gerados foram descartadas após confirmar que nenhum conteúdo havia mudado.

A resposta exata do aluno foi aceita no navegador, na etapa 4/11 de SQL-12, com +10 XP; a evidência está em `.gstack/qa-reports/sql-12-resposta-aluno-correta.png`. Nenhum progresso de produção foi modificado pelos testes.

A cobertura foi ampliada para impedir a repetição dos casos identificados. Ela não certifica toda solução possível nem substitui um compilador SQL/C# ou uma análise gramatical completa de Inglês.
