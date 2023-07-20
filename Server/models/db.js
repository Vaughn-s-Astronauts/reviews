var pg = require("pg");
var Pool = pg.Pool;

var dbConfig = {
  user: "postgres",
  host: "ec2-52-53-213-40.us-west-1.compute.amazonaws.com",
  database: "reviews",
  password: "123",
  port: 5432,
};

var pool = new Pool(dbConfig);
module.exports = { pool };
