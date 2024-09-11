const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "sara@4655",
  database: "product_manager",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
