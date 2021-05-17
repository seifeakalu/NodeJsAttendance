const mysql = require("mysql");
const config = require("../config/database.config");

// create a connection to the database
const connection = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
});

// open the MySql connection
connection.connect((error) => {
  if (error) throw error;
  // eslint-disable-next-line no-console
  console.log("Database connected successfully :) !");
});

module.exports = connection;
