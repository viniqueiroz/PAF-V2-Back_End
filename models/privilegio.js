var bookshelf = require('../bookshelf');


var Privilegio = bookshelf.Model.extend({
  tableName: 'privilegio'
});

module.exports = Privilegio;
