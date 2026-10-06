# Verificação da plataforma

Use Node.js 22 ou superior. A aplicação continua sendo HTML/CSS/JavaScript estático; as dependências npm são ferramentas de desenvolvimento.

```powershell
npm ci
npx playwright install chromium
npm run build
npm run validate
npm test
npm run test:e2e -- --workers=2
```

`npm test` verifica persistência, migração do XP legado, mescla entre abas/dispositivos, idempotência, comparação de código e conflitos de versão na sincronização atômica. Os testes estão em `tests/*.test.cjs` e usam o runner nativo do Node.

`npm run test:e2e` inicia um servidor local automaticamente e usa Chromium pelo Playwright 1.58.2. Percorre todas as páginas, as 130 lições publicadas, suas 885 atividades, o curso SQL em sequência real, erros e novas tentativas, retomada, repetição, menu, backup, nivelamento e tamanhos de tela de 320/375/1280 pixels. As lições das demais trilhas recebem pré-requisitos de teste para serem verificadas isoladamente. Testes de bloqueio verificam separadamente a progressão de um aluno novo.

As chamadas ao Supabase são simuladas nos testes. Nenhum progresso real é alterado. Os cenários incluem respostas atrasadas, corpo de resposta travado, HTTP 503, fila de salvamento, reset, conflitos de versão e falha no download de lição. O SQL de sincronização atômica precisa de validação no banco antes de ser habilitado em produção.

`complementares.spec.cjs` verifica a importação do backup realmente baixado pela interface, rejeição de arquivo inválido, revisão com lições carregadas sob demanda, controles de sessão, dicas, modal de explicação e revelação sem XP duplicado depois de recarregar.

`auditoria.spec.cjs` cobre foco e nomes acessíveis dos modais, menu por teclado, larguras intermediárias, tema entre abas e backups, navegação durante sincronização, contagem de conteúdo publicado, flags de comandos, rotas com nomes de protótipos e revisão na data local de São Paulo. Os testes unitários adicionais verificam domínio ponderado pela confiança, recuperação após erros, migração de dimensões, agenda concorrente e rejeição de dados internos inválidos. `servidor.test.cjs` verifica arquivos públicos, métodos HTTP, caminhos inválidos e acesso a arquivos privados por links/junções.

Resultados JSON, screenshots e traces de falhas ficam em `.gstack/qa-reports/runs/<id>/`. Evidências visuais e métricas ficam em `.gstack/qa-reports/`. Os artefatos são ignorados pelo Git e pela Vercel.

Para desenvolver, use `npm start` e abra `http://127.0.0.1:8080/app/`. Feche esse servidor antes de rodar a suíte: os testes iniciam seu próprio servidor na porta 8080. Não execute duas suítes simultaneamente nessa porta.

Depois de editar uma lição, execute `npm run catalogo`. O catálogo guarda os metadados, as definições do glossário e a assinatura de conteúdo, enquanto o texto e os exercícios de cada aula só são carregados quando necessários. `npm run validate` falha se o catálogo estiver desatualizado.

Para reproduzir a comparação de performance, extraia o commit anterior em `.gstack/qa-reports/original` e execute `node ferramentas/medir-carregamento.cjs`. A medição usa contextos novos, Supabase simulado e duas condições: sem latência adicional e 40 ms adicionais por script. Os valores variam com a máquina e a rede; não substituem uma medição da nova publicação na Vercel.

As respostas modelo verificam o comportamento do motor e os critérios publicados. Exercícios de código são comparados com as variantes cadastradas; não são compilados ou executados pelo navegador. Adicione uma variante em `respostasAceitas` ao aceitar outra solução equivalente. Um compilador seguro em servidor seria uma funcionalidade adicional.
