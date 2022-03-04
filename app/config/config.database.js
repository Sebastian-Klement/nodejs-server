const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "users",
  password: "Your pw",
  dialect: "mysql",
  multipleStatements: true,
});

mysqlConnection.connect((error) => {
  if (error) {
    console.error("error: " + error.message);
  } else {
    console.log("Database connected");
  }
});

module.exports = mysqlConnection;
