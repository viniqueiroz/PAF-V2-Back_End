var bookshelf = require('../bookshelf');


var Status = bookshelf.Model.extend({
  tableName: 'status_usuario'
});

module.exports = Status;
