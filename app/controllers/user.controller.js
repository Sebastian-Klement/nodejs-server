const { request, response } = require("express");
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

exports.allMedium = async (request, response) => {
  try {
    mysqlConnection.query(
      "SELECT * FROM booking WHERE studentId = ?",
      [request.body.studentId],
      (error, results, fields) => {
        if (error) {
          console.error("error: " + error);
          return;
        }
        if (request.body.studentId === results[0].studentId) {
          response.status(200).send({
            studentId: results[0].studentId,
            title: results[0].title,
            author: results[0].author,
            isbn: results[0].isbn,
          });
        } else {
          response.status(400).send("Upps ... Invalid studentId");
        }
      }
    );
  } catch (error) {
    console.error("error: " + error.message);
  }
};
