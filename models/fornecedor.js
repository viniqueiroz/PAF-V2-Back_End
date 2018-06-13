var bookshelf = require('../bookshelf');


var Fornecedor = bookshelf.Model.extend({
  tableName: 'fornecedor'
});

module.exports = Fornecedor;
