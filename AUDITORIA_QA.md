# Auditoria funcional e de performance — 05–06/10/2026

## Resultado e escopo

Foram corrigidos problemas do motor de exercícios, navegação, progressão, XP, persistência local, sincronização e carregamento. As alterações estão no repositório local. A publicação existente na Vercel foi medida e inspecionada, mas não foi substituída durante a auditoria.

**Validação local encerrada em 06/10: 107 testes de navegador e 17 testes unitários aprovados, sem testes ignorados, falhas ou retries.** A tabela registra 26 problemas e suas causas. A ativação da sincronização atômica e a proteção do perfil no banco continuam pendências de produção descritas ao final.

Inventário: 20 trilhas, 367 registros de lições, **130 lições publicadas**, **237 etapas de roadmap sem conteúdo**, **885 atividades** em 18 tipos efetivamente usados. O banco recebe um documento de progresso por perfil; não há backend de execução das aulas nem banco consultado por cada exercício.

O código existente usa um perfil único `usuario_principal`. Foi mantida a compatibilidade com esse perfil enquanto a finalidade pessoal/multiusuário aguarda confirmação. Isso não fornece isolamento entre alunos.

## Performance medida

| Condição | Antes | Depois |
| --- | ---: | ---: |
| Local, contexto novo, Supabase simulado | 5.849 ms | 376 ms |
| Local, 40 ms adicionais por script | 23.263 ms | 544 ms |
| Requisições até a home | 429 | 63 |
| Transferência inicial local sem compressão | 1.964.580 bytes | 637.327 bytes |
| Downloads de arquivos em `/licoes/` antes da home | 364 | 0 |

Na publicação antiga, a home apareceu em **22.491 ms**, com Supabase simulado para separar o custo dos arquivos do custo do banco. O primeiro conjunto de medições tinha o limite padrão de 250 entradas de Resource Timing; a comparação local posterior aumentou o buffer para 2.000 e capturou todas as requisições. Os arquivos de checkpoints em outras pastas também faziam parte do carregamento antigo.

São amostras medidas, não percentis nem garantia de latência de produção. A tabela mostra a medição final de 06/10, realizada depois da suíte funcional, sem testes concorrentes. A comparação anterior de 05/10 está preservada em `performance-2026-10-05.json`. A melhoria demonstra a remoção do caminho sequencial: o motor antes aguardava todos os arquivos das lições, um por vez. A nuvem também era aguardada antes da montagem da interface. Não houve evidência que justificasse trocar o banco ou criar outro backend. Não existem funções serverless de aulas neste projeto; cold start de uma API própria não explica esses downloads estáticos.

O catálogo gerado permite calcular progresso e mostrar o glossário sem carregar exercícios. Scripts compartilhados e metadados são baixados em paralelo; cada lição é carregada sob demanda, com deduplicação da Promise, loading, erro e nova tentativa. Uma resposta lenta de uma rota anterior não substitui a página atual.

## Problema → causa → correção

| Gravidade | Problema | Causa | Correção e evidência |
| --- | --- | --- | --- |
| Crítica | Exercício não abre | `caixaSocratica` e `caixaDica` usadas sem declaração | Elementos criados por atividade. O erro foi reproduzido localmente e na Vercel; execução das lições verifica ausência de exceções. |
| Alta | Um clique duplo avança ou verifica e continua | Botão consultava uma ação global mutável; segundo evento podia executar a ação nova | Eventos de clique repetido e tecla mantida são rejeitados. Ações respeitam o estado atual e o modal. Testes exigem avanço de exatamente uma etapa. |
| Alta | Atividade anterior habilita a próxima | Callback/timer de diálogo e foco sobreviviam à troca de etapa | Callback vinculado à sessão/índice, destruição da instância e cancelamento do timer/áudio. |
| Alta | Progresso é recriado ao fechar após concluir | Runner continuava ativo para `pagehide` e `visibilitychange` | Finalização única, descarte das ações e salvamento apenas de runner ativo da mesma versão do progresso. |
| Alta | Bônus de conclusão repetido | Cada chamada adicionava 10/25 XP em replay | Conclusão idempotente, sem novo bônus ou sessão duplicada. Replay e reload verificados. |
| Alta | XP e prêmio ficavam em salvamentos diferentes | Incremento, conceito e marcação da etapa eram gravados separadamente | Transação local e prêmio com chave determinística. A união entre abas deduplica o mesmo prêmio. |
| Alta | Revelar permitia receber XP novamente | Esforço não marcava a etapa como já contabilizada | Revelação registra o prêmio e a etapa juntos. |
| Alta | Resultado após retomar mostrava aproveitamento incorreto | Acertos existiam apenas na memória do runner | Resultado da primeira resposta persistido por etapa; aproveitamento reconstruído na conclusão. Dicas não perdem o desconto de XP ao recarregar. |
| Alta | Etapas bloqueadas podiam ser concluídas | Checkbox aceitava conclusão manual em etapas bloqueadas; atalho de conclusão pulava a aula | Atalhos removidos. Etapas concluídas continuam acessíveis para revisão; as bloqueadas e planejadas não oferecem conclusão. |
| Alta | Curso travava em lições vazias | Roadmap vazio era contado como conteúdo disponível | 237 registros marcados explicitamente como planejados; excluídos de percentuais, próximo passo e desbloqueios. |
| Alta | Home tentava iniciar a lição seguinte a uma incompleta | Seleção usava o último registro, mesmo não concluído | Seleção prioriza andamento disponível e depois a primeira etapa disponível não concluída. |
| Alta | Abas/dispositivos perdiam XP e práticas distintos | Mescla usava máximo de XP e substituía mapas de conceitos | Ledger de prêmios e eventos de prática; mescla preserva eventos distintos, deduplica os iguais e persiste a união em colisões de storage. |
| Alta | Reset ressuscitava progresso da nuvem | Mescla aditiva não tinha marcador de substituição | Reset/importação explícitos criam uma época; ela prevalece sobre estados anteriores. Runner antigo não grava sobre essa época. |
| Alta | Envios antigos sobrescreviam novos | Debounce capturava objeto antigo e vários POSTs rodavam simultaneamente | Fila única, leitura do estado no envio, mescla após resposta e Web Locks entre abas. A atomicidade entre computadores exige o SQL descrito abaixo. |
| Alta | Código incorreto era aceito | Normalização apagava espaços/acentos/case de literais; alguns validadores buscavam apenas substrings | Comparação de tokens mantém literais e case do C#. Soluções de programação usam variantes cadastradas; comentários isolados não contam como solução. Testes negativos e gabaritos completos. |
| Média | Erro de nuvem mostrava sucesso | Função devolvia `{erro}` e botão sempre exibiu toast de sucesso | Status e mensagem refletem o resultado; HTTP 503 preserva o local e mostra erro. |
| Média | Loading infinito em falha de rede | Fetch não tinha prazo e bloqueava o início | Sincronização em segundo plano e prazo real de 8 s por requisição, com AbortController. O prazo limita a rede; não mascara concorrência. |
| Média | Atividade quebrada era pulada | Erro de render/correção liberava Continuar/Ver resposta | Falha bloqueia o avanço e oferece recuperação de carregamento. Nenhuma conclusão fictícia por erro. |
| Média | Importação inválida danificava estado | Validação aceitava qualquer objeto | Validação antes da substituição, incluindo XP, arrays, lições, práticas e histórico; arquivo ilegível informa erro. |
| Média | Listening de um caractere nunca habilitava | Exigia comprimento maior que um | Entrada não vazia habilita; resposta fica somente leitura após verificar. |
| Média | URLs inválidas quebravam navegação | `decodeURIComponent` sem tratamento | Estado de página inexistente com botão de retorno. Redirecionamento da raiz conserva hash e query. |
| Média | Modais duplicados/atalhos atrás do modal | Aberturas sem guarda e Enter global | Uma abertura ativa, Escape, foco restaurado e navegação de teclado no modal de confirmação. |
| Alta | Menu mobile fecha logo depois do primeiro clique | `hashchange` pendente e atualizações de progresso renderizavam a página novamente; marcar a rota ativa também fechava o menu | Navegação interna atualiza o histórico e renderiza na mesma ação; eventos de hash já processados são ignorados. O menu fecha por navegação e escolha explícita, permanecendo aberto durante atualização de dados. Regressão cobre XP chegando com o menu aberto e histórico do navegador. |
| Média | Corpo de resposta da nuvem podia aguardar indefinidamente | O prazo era cancelado assim que chegavam os cabeçalhos, antes de `response.json()` | A leitura do JSON fica dentro do prazo e recebe o cancelamento. Regressão simula cabeçalhos recebidos e corpo travado; verifica saída do loading e preservação do XP. |
| Baixa | Sigla do Terminal quebra em duas linhas no menu desktop | Quebra de palavras também aplicada às siglas curtas de navegação | Siglas usam `white-space: nowrap`; captura e nova verificação dos layouts. |
| Média | Sincronização sem novidade recria a página e desfaz escolhas locais | Importação da própria versão notificava a interface e alterava a data de salvamento | Mescla idêntica é idempotente: não regrava nem notifica. Alterações reais continuam notificando; importação explícita de backup continua criando uma época. Testes verificam os três comportamentos e a escolha de duração da sessão. |

## Verificação

- `npm run build`: gera catálogo para publicação estática.
- `npm run validate`: estrutura, catálogo, ordem pedagógica, vocabulário e símbolos. Todos passaram. A dimensão inválida do checkpoint A2 foi corrigida; o linter de inglês não interpreta URLs como vocabulário.
- `npm test`: 17 regressões de persistência, XP, tokens, conflitos de versão, mescla sem mudanças e corpo de resposta travado passaram em 06/10.
- `npm run test:e2e -- --workers=2`: **107/107 aprovados**, em 9,3 minutos, sem retries, testes ignorados ou erros gerais do runner. Resultado: `.gstack/qa-reports/runs/1791282894396/results.json`.
- Curso SQL: **46 lições em sequência**, reload com 100% de conclusão e replay sem XP adicional. **84 lições das demais trilhas** concluídas individualmente por cliques únicos, com seus pré-requisitos preparados pelo teste.
- Teste estrutural/interativo percorreu **885 atividades**, suas respostas modelo, todas as alternativas dos tipos de escolha e entradas inválidas. Diálogo e visualizador foram exercitados durante as aulas completas.
- Desktop e mobile: páginas e 20 trilhas em 1280/375/320 px; aulas completas nas duas larguras móveis, menu preservado durante atualização de progresso, histórico do navegador, backup exportado/importado, tema, modais, dicas, revelação, sessão e nivelamento.
- Nova medição de performance: quatro cenários sem erros JavaScript, registrados em `.gstack/qa-reports/performance.json`.

Supabase foi simulado em todos os testes que poderiam gravar. A consulta pública real de 06/10 foi somente leitura, com `select=id&limit=1`, e respondeu HTTP 200 com um registro. Não foram alterados registros reais, credenciais ou permissões do banco.

Evidências locais: `.gstack/qa-reports/baseline.json`, `performance.json`, `screenshots/` e `runs/<id>/results.json`. O navegador integrado não estava disponível; os testes foram executados em Chromium real pelo Playwright, em contextos isolados.

A execução de 05/10 terminou com 100 de 102 testes de navegador passando. O desligamento interrompeu o trabalho antes da resolução das duas falhas: menu mobile (bug real de navegação) e nivelamento (teste presumindo que todas as etapas eram questões de múltipla escolha). Na retomada, os testes curtos passaram, mas a rodada completa expôs o fechamento do menu também por atualização da nuvem. A causa adicional foi corrigida e ganhou uma regressão específica. O resultado final deste relatório se refere à nova rodada após essa correção.

## Pendências de produção

1. **Publicar e medir a nova versão na Vercel.** Os tempos novos são locais. A configuração `vercel.json` gera o catálogo no build; arquivos de testes/evidências não entram no upload.
2. **Aplicar e verificar `ferramentas/supabase-progresso.sql`.** A migração adiciona versão e uma RPC com compare-and-swap. O cliente já possui retry de conflito com nova mescla; habilitar `P.conf.sincronizacaoAtomica` somente depois da migração. Sem isso, a fila protege as abas do mesmo navegador, mas o GET + POST legado pode sofrer corrida entre computadores. Os testes da RPC usam respostas simuladas, não um Postgres real.
3. **Confirmar finalidade e proteger o perfil na nuvem.** O perfil é único e a API de leitura é pública. Uso por vários alunos exige autenticação, RLS e perfil por usuário. Mesmo em uso pessoal, controle de acesso precisa ser definido para evitar alterações por terceiros. Não foi feita uma migração silenciosa que abandonasse o progresso existente.
4. **Produzir o conteúdo planejado.** As 237 etapas vazias continuam roadmap. Não foram inventadas aulas para converter ausência de conteúdo em aprovação de QA.

O motor foi verificado por seus critérios publicados. Isso não significa compilação de C#, execução universal de SQL, avaliação semântica de qualquer texto livre ou certificação pedagógica independente de cada alternativa. As variantes aceitas precisam estar cadastradas; novos critérios devem ter testes positivos e negativos.

## Referências técnicas

- [Playwright CLI](https://playwright.dev/docs/test-cli)
- [Vercel: configuração estática](https://vercel.com/docs/project-configuration/vercel-json)
- [Supabase: Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
