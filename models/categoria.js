var bookshelf = require('../bookshelf');


var Categoria = bookshelf.Model.extend({
  tableName: 'categoria'
});

module.exports = Categoria;
