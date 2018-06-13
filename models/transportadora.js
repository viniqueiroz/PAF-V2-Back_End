var bookshelf = require('../bookshelf');


var Transportadora = bookshelf.Model.extend({
  tableName: 'transportadora'
});

module.exports = Transportadora;
