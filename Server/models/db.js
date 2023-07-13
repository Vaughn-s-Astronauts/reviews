var pg = require('pg');
var Pool = pg.Pool;

var dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'reviews',
  password: '',
  port: 5432,
};

var pool = new Pool(dbConfig);
module.exports = { pool };