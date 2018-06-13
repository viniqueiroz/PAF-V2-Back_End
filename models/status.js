var bookshelf = require('../bookshelf');


var Status = bookshelf.Model.extend({
  tableName: 'statususuario'
});

module.exports = Status;
