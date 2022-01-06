const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "users",
  password: "1986",
  dialect: "mysql",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (err) {
    console.error("error: " + err.message);
  } else {
    console.log("Database connected");
  }
});

module.exports = mysqlConnection;
