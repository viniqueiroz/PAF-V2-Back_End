var bookshelf = require('../bookshelf');


var Area = bookshelf.Model.extend({
  tableName: 'area'
});

module.exports = Area;
