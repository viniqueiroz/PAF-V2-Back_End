var bookshelf = require('../bookshelf');


var Status = bookshelf.Model.extend({
  tableName: 'statusUsuario'
});

module.exports = Status;
