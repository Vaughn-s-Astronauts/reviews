const { Sequelize } = require("sequelize");

// var dbConfig = {
//   user: "postgres",
//   host: "ec2-52-53-213-40.us-west-1.compute.amazonaws.com",
//   database: "reviews",
//   password: "123",
//   port: 5432,
// };

const db = new Sequelize("reviews", "postgres", "12345678", {
  host: "ec2-50-18-12-167.us-west-1.compute.amazonaws.com",
  dialect: "postgres",
  port: 5432,
});

db.authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// var pool = new Pool(dbConfig);
module.exports = db;
