const knex = require('./knex');
const bookshelfInit = require('bookshelf');
const bookshelf = bookshelfInit(knex);

module.exports = bookshelf;