var bookshelf = require('../bookshelf');
var status = require('./status');
var privilegio = require('./privilegio');


var Usuario = bookshelf.Model.extend({
  tableName: 'usuario',
  status: function(){
    return this.belongsTo(status,'idStatus');
  },
  privilegio: function(){
    return this.belongsTo(privilegio,'idPrivilegio');
  }
});

module.exports = Usuario;
