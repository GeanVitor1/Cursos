# Modernização — diagnóstico e execução

## Diagnóstico inicial (22/10/2026)

Inspeção: motor, armazenamento, sincronização, navegação, atividades, catálogo, trilhas e testes existentes. A aplicação é estática (JavaScript sem framework), com localStorage e um perfil Supabase legado compartilhado. Não existe um backend autenticado por aluno no repositório.

| Impacto | Problema observado no código | Decisão |
| --- | --- | --- |
| Alto | Dias dependem de XP; revisão já premiada não registra estudo | Registrar atividade independentemente de recompensa |
| Alto | Streak não expira e mescla une datas sem recalcular sequência | Derivar sequência do calendário, inclusive após sincronização |
| Alto | Tempo usa duração editorial das aulas e não atividade | Medir apenas estudo visível, com interação recente; preservar estimativas antigas separadas |
| Alto | Reparação transforma aulas não feitas em concluídas | Preservar acesso sem fabricar conclusões |
| Alto | Checkpoint aprova qualquer aproveitamento | Exigir 70% de acertos independentes, oferecer nova tentativa e revisão |
| Alto | Perfil remoto público compartilhado, sem Auth/RLS por aluno | Documentar limite; não executar migração em banco real sem acesso administrativo |
| Médio | Domínio da trilha ignora conceitos sem prática; mapa confunde conclusão e domínio | Usar denominador completo e evidências de domínio |
| Médio | Acertos confiantes nunca entram em revisão se não houve erro | Agendar recuperação futura para todo conceito praticado |
| Médio | Catálogo versionado desatualizado | Regenerar e verificar antes da entrega |
| Médio | 237 registros são placeholders sem aulas | Exibir como planejados; publicar conteúdos prioritários com exercícios, sem simular cursos completos |
| Médio | Explicação livre é avaliada por palavras-chave | Informar limite da correção automática; usar decisões com justificativas verificáveis |

Baseline: 41 testes unitários passaram. `npm run validate` falhou por catálogo desatualizado. Validação direta encontrou 20 trilhas, 367 registros e 885 atividades; ausência de erros estruturais não comprova qualidade pedagógica dos conteúdos.

## Plano

1. Corrigir contabilidade, persistência, avaliações e domínio com regressões automatizadas.
2. Exibir calendário, metas e tempo medido no dashboard e em Meu progresso.
3. Complementar formação de engenharia assistida por IA e fundamentos de cibersegurança, preservando IDs e conteúdo existente.
4. Executar validações e fluxos de navegador; registrar resultados e limitações reais neste arquivo.

## Mudanças implementadas

- **Atividade independente de XP:** responder exercícios, inclusive errando ou revisitando atividades já premiadas, registra estudo. Visitar a home e receber XP isolado não contam. Leitura exige 120 segundos de atividade para validar o dia.
- **Tempo medido:** pulso de 5 segundos somente com aula visível, janela em foco e interação recente (até 60 segundos). Pausas longas e intervalos suspensos são descartados. Os segundos ocupados são unidos por máscara de bits, sem somar tempo sobreposto entre abas ou dispositivos.
- **Calendário e sequência:** fuso persistido no perfil, inicialmente America/Sao_Paulo; sequência e recorde derivados das datas; expiração após interrupção; mescla de dias complementares; mesma regra para revisão após a meia-noite UTC.
- **Persistência compatível:** versão aditiva 3 no JSON, mantendo a mesma chave local e os campos antigos. XP, conclusões, sessões estimadas e dias legados são preservados. Não há migração destrutiva nem alteração no banco remoto. Backups validam fuso, eventos, intervalos e meta. A ordem das propriedades não provoca ping-pong entre abas.
- **Progresso verdadeiro:** desativada a reparação que fabricava conclusão de aulas anteriores. A fronteira de acesso continua preservando avanços existentes. Não se tenta desfazer conclusões antigas cuja origem já não pode ser comprovada.
- **Avaliações:** checkpoints ainda não aprovados exigem 70% de acertos na primeira tentativa, sem dicas. Reprovação não dá bônus de conclusão nem libera a etapa seguinte; há revisão e nova tentativa. Reabertura reinicia checkpoint pendente; aulas comuns continuam com retomada. Aprovações antigas permanecem válidas.
- **Domínio:** conceitos sem prática entram no denominador da trilha. O mapa exige evidências para declarar domínio e sua barra não utiliza percentual de conclusão como substituto. Explicações livres têm peso reduzido e informam a limitação da correção por referências.
- **Revisão:** todo conceito praticado recebe agenda futura, mesmo com acerto inicial. Cenários, revisão de código e diagnóstico têm prioridade; material de etapas bloqueadas e nunca visitadas não é antecipado na revisão.
- **Dashboard:** próximo passo, evidências de aprendizagem, dificuldades, calendário de 35 dias, meta diária persistida, tempo hoje e nos últimos sete dias, aulas concluídas recentemente e marcos calculados do progresso. Catálogo e roadmap ficam expansíveis para reduzir a extensão inicial, especialmente no celular.
- **Percursos:** Engenharia de Software e Cibersegurança conectam trilhas existentes. A escolha de percurso é persistida e orienta a recomendação de próxima aula, respeitando bloqueios. Não se duplicam cursos técnicos para criar os percursos.
- **Conteúdo:** duas trilhas complementares, oito aulas e 19 atividades novas. Decisões exigem solução **e justificativa** corretas, com embaralhamento independente. Cada aula inclui definição, motivo, limites, mecanismo, exemplo, instrução à IA, validação, decisão e revisão. Há roteiros de laboratório local, sem simular um sandbox hospedado.
- **Ferramentas:** catálogo regenerado; inventário reproduzível em `ferramentas/inventario-curricular.json`; linter pedagógico distingue 138 aulas publicadas, 375 registros curriculares e 1.434 etapas de conteúdo/atividade. O relatório antigo chamava todos os registros, incluindo placeholders, de aulas publicadas.

## Testes e evidências

| Verificação | Resultado final |
| --- | --- |
| `npm test` | 56 testes aprovados (41 existentes e 15 novos), incluindo gravação conjunta de conclusão, atividade, XP e histórico |
| `npm run validate` | Estrutura, catálogo, pedagogia, inglês e símbolos aprovados; zero erros e zero avisos pedagógicos |
| Navegador — arquivos da suíte | 133 cenários com aprovação final em execuções por lotes e reexecuções direcionadas |
| Todas as aulas publicadas | 138 percorridas por cliques, incluindo as 46 aulas SQL em sequência, recarga e repetição sem duplicar XP |
| Atividades | Gabaritos, alternativas embaralhadas e entradas inválidas verificados nas 904 atividades; visualizador e diálogos também pelos fluxos completos |
| Variantes por campos reais | 540 casos de preenchimento, 702 de escrita, 48 de explicação e 15 de listening |
| Mobile e navegação | Fluxos em 320 e 375 px; dashboard e calendário em 320, 768 e 1440 px; páginas e trilhas em desktop/mobile; foco de modal, teclado, temas e menu |
| Falhas e retomada | Arquivo indisponível, importação inválida, rota inválida, resposta atrasada, concorrência de abas, HTTP 503 e persistência após recarga |
| Checkpoints e metodologia | Reprovação sem conclusão, nova tentativa aprovada, justificativa incorreta rejeitada, conclusão das duas novas trilhas e preferência de percurso persistida |
| `git diff --check` | Sem erros de whitespace |

As primeiras execuções detectaram auxiliares de teste incompatíveis com a justificativa obrigatória e com a etapa de associação que precede o cenário; os auxiliares foram corrigidos e os casos reexecutados com sucesso. Um teste antigo de auditoria ainda exigia rejeitar `GIT` em maiúsculas, contrariando o comportamento já estabelecido no commit inicial e nos testes de respostas. Sua expectativa foi alinhada à política existente, mantendo rejeição de flags e comandos semanticamente diferentes. Uma execução adicional perdeu o servidor ao término do lote que o havia iniciado; foi descartada e refeita com servidor próprio gerenciado pelo Playwright.

Capturas e traces estão em `.gstack/qa-reports/` (artefatos locais ignorados pelo Git). Inspeção visual da home a 320 px levou ao reposicionamento do calendário e à redução das seções expandidas.

Medição pontual local: home em aproximadamente 669 ms, 67 requisições, 691 KB transferidos e **zero requisições de aulas na entrada**. Com latência artificial de 40 ms nos scripts: aproximadamente 1.073 ms. São amostras do ambiente local, sem orçamento de desempenho de produção; o comparativo histórico da ferramenta não representa o início desta refatoração.

## Inspeção do Supabase real — somente leitura

Foi consultado apenas o identificador da tabela, sem baixar ou imprimir o progresso pessoal: HTTP 200. Consultar `versao` retornou HTTP 400, código PostgreSQL `42703` (coluna inexistente). O endpoint de schema retornou HTTP 401; isso não impediu a leitura da tabela.

Portanto, a migração existente em `ferramentas/supabase-progresso.sql` **não está aplicada nesse banco**. `sincronizacaoAtomica` permanece desabilitada. Nenhum teste escreveu no banco real. Os testes de sincronização simulam respostas, conflitos e falhas; não comprovam isolamento ou durabilidade em produção.

## Pendências reais e limites da entrega

1. **Concorrência remota:** aplicar a migração SQL com acesso administrativo, revisar a função no ambiente real e habilitar sincronização atômica. O cliente público disponível não permite executar DDL. O fallback legado ainda pode perder uma gravação entre dispositivos simultâneos; não é possível declarar toda a contabilidade remota confiável enquanto isso permanecer.
2. **Identidade e autorização:** o perfil `usuario_principal` continua compartilhado. Uso por vários alunos exige autenticação e políticas de isolamento por usuário no banco. A chave pública não é credencial administrativa. Não foi comprovada a configuração de RLS a partir do acesso público disponível.
3. **Currículo completo:** permanecem **237 registros planejados**. Segurança de Aplicações, Autenticação, Arquitetura, Testes, Frontend, Mensageria, CI/CD, Azure e Microsserviços ainda não têm aulas publicadas em suas trilhas originais. As introduções novas não substituem esses cursos. Consulte o inventário por trilha para quantidades e pré-requisitos.
4. **Revisão editorial:** os fluxos e gabaritos das aulas anteriores foram verificados automaticamente. Isso não equivale à reescrita e revisão humana de cada uma das 130 aulas anteriores pelos dez critérios metodológicos. A aplicação integral da metodologia permanece pendente.
5. **Avaliação semântica e adaptação:** explicações livres continuam baseadas em referências, sem compreensão semântica garantida. A revisão prioriza desempenho e agenda; não existe estimador validado de dificuldade individual nem garantia de domínio profissional.
6. **Tempo e dados históricos:** tempo medido é aproximação de atividade de interface; não comprova atenção cognitiva. Não se reconstrói tempo real ou dias ausentes do histórico anterior. Datas dependem do relógio dos dispositivos; validação temporal autoritativa exige backend. Armazenamento local tem quota; histórico de longo prazo precisa de compactação/arquivamento com protocolo de sincronização antes de descarte de eventos.
7. **Laboratórios e produção:** há roteiros locais autorizados, sem infraestrutura de laboratório executável hospedada. Não houve publicação, push, testes de carga ou validação de infraestrutura em produção.

A plataforma recebeu correções verificadas e conteúdo adicional, mas o escopo de **modernização completa** solicitado ainda não está concluído. As pendências acima são parte do trabalho restante, especialmente banco e currículo avançado.

Metodologia e fontes técnicas: [METODOLOGIA.md](METODOLOGIA.md). Inventário: [ferramentas/inventario-curricular.json](ferramentas/inventario-curricular.json).
