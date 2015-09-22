'use strict';

const config = require('../knexfile');
const databaseEnvironment = process.env.DB_ENV || 'development';

var pg = require('pg')
pg.types.setTypeParser(20, 'text', parseInt)

let knex = require('knex')(config[databaseEnvironment]);
export default require('bookshelf')(knex);