var bookshelf = require('../bookshelf');


var Produto = bookshelf.Model.extend({
  tableName: 'produto'
});

module.exports = Produto;
