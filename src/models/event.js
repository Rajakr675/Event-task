const bookshelf = require('../../db/bookshelf');

const Event = bookshelf.model('Event', {
  tableName: 'events',
  idAttribute: 'id'
});

module.exports = Event;
