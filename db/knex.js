const config = require('config');
const NODE_ENV  = config.get('NODE_ENV')
const connect = require('../knexfile');
const envConfig = connect[NODE_ENV];
const knex = require('knex');
const connection = knex(envConfig);


module.exports = connection;