var bookshelf = require('../bookshelf');


var UnidadeMedida = bookshelf.Model.extend({
  tableName: 'unidademed'
});

module.exports = UnidadeMedida;
