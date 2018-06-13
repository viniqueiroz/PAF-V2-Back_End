var bookshelf = require('../bookshelf');
var status = require('./status');
var categoria = require('./categoria');
var fornecedor = require('./fornecedor');
var produto = require('./produto');
var transportadora = require('./transportadora');
var movimentacao = require('./movimentacao');
var unidadeMedida = require('./unidadeMedida');
var area = require('./area');
var registroOperacional = require('./registroOperacional');

var Planejamento = bookshelf.Model.extend({
  tableName: 'planejamento',
  status: function(){
    return this.belongsTo(status,'idStatus');
  },
  categoria: function(){
    return this.belongsTo(categoria,'idCategoria');
  },
  fornecedor: function(){
    return this.belongsTo(fornecedor,'idFornecedor');
  },
  produto: function(){
    return this.belongsTo(produto,'idProduto');
  },
  transportadora: function(){
    return this.belongsTo(transportadora,'idTransportadora');
  },
  area: function(){
    return this.belongsTo(area,'idArea');
  },
  movimentacao: function(){
    return this.belongsTo(movimentacao,'idMovimentacao');
  },
  registroOperacional: function(){
    return this.belongsTo(registroOperacional,'idRegistroOperacional');
  }
});

module.exports = Planejamento;
