'use strict';

const config = require('../knexfile');
const databaseEnvironment = process.env.DB_ENV || 'development';

let knex = require('knex')(config[databaseEnvironment]);
export default require('bookshelf')(knex);