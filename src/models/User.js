const bookshelf = require('../../db/bookshelf');

const User = bookshelf.model('User', {
  tableName: 'users',
  idAttribute: 'id'
});

module.exports = User;
