# Dados da plataforma

- `manifest.js` — registro das 20 trilhas, fases de formação e arquivos de conteúdo.
- `conceitos.js` — nomes legíveis dos conceitos usados no domínio e na revisão.
- `conceitos-registry.js` — metadados pedagógicos: pré-requisitos conceituais, termos/símbolos e
  definição curta de cada conceito (usada pelo glossário e pelo linter).
- `habilidades.js` — cópia executável do mapa de competências (carregada sem servidor).
- `nivelamento-ingles.js` — teste de nivelamento A1–C1 (10 questões progressivas, sem XP).
- `skills-map.json` — **fonte canônica** do mapa de competências: dependências entre trilhas, habilidades e conceitos-chave de cada competência.
- `progresso.json`, `desempenho.json`, `revisoes.json`, `configuracao.json` — sementes e formato de backup.

## Modelo de domínio

Cada conceito é medido em **seis formas de conhecimento** (dimensões):

```
reconhecimento → associação → ordenação → preenchimento → construção → aplicação real
```

O estado `dominado` exige acertos consistentes e prática em mais de uma dimensão — concluir a
lição não é o mesmo que dominar o conceito.

A **confiança declarada** na resposta ("tenho certeza", "acho que sei", "estou chutando") entra
como peso no domínio. Acerto marcado como chute não conta como evidência forte.

## Revisão espaçada

Cada erro agenda o conceito para revisão em **1 dia**. Acertos em revisão avançam para
**3 → 7 → 14 → 30 dias**. Um novo erro reinicia o ciclo. As sessões de revisão intercalam
conceitos diferentes (interleaving), no máximo 2 atividades por conceito.

O progresso **em uso** fica no `localStorage` do navegador (chave `trilha-net.estado.v1`).
Para versionar sua evolução no repositório:

1. Abra **Meu progresso** na plataforma e clique em **Exportar progresso**.
2. Salve o arquivo gerado como `data/progresso.json` (substituindo a semente).
3. Para restaurar em outro navegador, use **Importar progresso** e selecione esse arquivo.

Depois de alterar `skills-map.json`, mantenha `habilidades.js` em sincronia (mesmo conteúdo,
formato JavaScript) e rode `node ferramentas/validar-dados.js`.
