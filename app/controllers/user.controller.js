const mysqlConnection = require("../config/config.database");

exports.allUser = async (request, response) => {
  mysqlConnection.query("SELECT * FROM user", (error, results, fields) => {
    if (!error) {
      response.send(results);
    } else {
      console.error("error: " + error.message);
    }
  });
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
