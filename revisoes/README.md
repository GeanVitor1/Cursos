# Revisão espaçada

Todo erro e acerto alimentam o registro de domínio por conceito (`data/desempenho.json` no backup):

- 🟢 **Dominado** — 3+ acertos sem erro
- 🟡 **Precisa revisar** — erros recentes
- 🔴 **Dificuldade** — mais erros que acertos

A tela **Revisão** monta sessões curtas (~10 min) priorizando os conceitos com maior peso de erro.
Ao concluir, os conceitos são reavaliados — e os que ficarem dominados saem da fila.

A lógica está em `app/js/nucleo/progresso.js` (`conceitosParaRevisar` e `atividadesDeRevisao`).
