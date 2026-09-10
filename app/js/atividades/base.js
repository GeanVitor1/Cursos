window.Plataforma = window.Plataforma || {};

(function (P) {
  P.atividades = P.atividades || { tipos: {} };

  P.atividades.registrar = function (tipo, def) {
    def.tipo = tipo;
    P.atividades.tipos[tipo] = def;
  };

  P.atividades.encontrar = function (tipo) {
    return P.atividades.tipos[tipo] || null;
  };

  P.atividades.rotulo = function (tipo) {
    const def = P.atividades.tipos[tipo];
    return def ? def.rotulo : tipo;
  };

  const dimensaoPadrao = {
    'multiple-choice': 'reconhecimento',
    'true-false': 'reconhecimento',
    'find-error': 'reconhecimento',
    'interpret-code': 'reconhecimento',
    'predict-output': 'reconhecimento',
    'reading': 'reconhecimento',
    'debug': 'reconhecimento',
    'translate': 'associacao',
    'match-pairs': 'associacao',
    'order-blocks': 'ordenacao',
    'fill-code': 'preenchimento',
    'write-code': 'construcao',
    'explain': 'construcao',
    'code-review': 'aplicacao',
    'scenario': 'aplicacao',
    'listening': 'reconhecimento',
    'choose-image': 'reconhecimento',
    'dialogue': 'aplicacao'
  };

  P.atividades.dimensao = function (atv) {
    if (atv && atv.dimensao && P.dimensoes[atv.dimensao]) return atv.dimensao;
    if (atv && atv.desafio) return 'aplicacao';
    const tipo = atv && atv.tipo;
    return dimensaoPadrao[tipo] || 'reconhecimento';
  };
})(window.Plataforma);
