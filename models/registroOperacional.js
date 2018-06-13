var bookshelf = require('../bookshelf');
var planejamento = require('./planejamento');
var usuario = require('./usuario');


var Operacional = bookshelf.Model.extend({
  tableName: 'registro_operacional',
  planejamento: function(){
    return this.belongsTo(planejamento,'idPlanejamento');
  },
  usuarioOpInicio: function(){
    return this.belongsTo(usuario,'idUserOpInicio');
  },
  usuarioOpFinal: function(){
    return this.belongsTo(usuario,'idUserOpFinal');
  }
});

module.exports = Operacional;
