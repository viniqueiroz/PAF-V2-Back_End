var bookshelf = require('../bookshelf');


var Movimentacao = bookshelf.Model.extend({
  tableName: 'movimentacao'
});

module.exports = Movimentacao;
