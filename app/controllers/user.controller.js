const { request, response } = require("express");
const mysqlConnection = require("../config/config.database");

//Idee einer möglichen Vaöidierung des Studentenausweis
// exports.validator = async (request, response) => {
//   try {
//     mysqlConnection.query(
//       "SELECT * FROM user WHERE username = ?",
//       [request.body.username],
//       (error, results, fields) => {
//         if (error) {
//           console.error("error: " + error);
//           return;
//         }
//         if (request.body.username === results[0].username) {
//           response.status(200).send({
//             username: results[0].username,
//             text: "isValide",
//           });
//         } else {
//           response.status(400).send("Upps ... Invalid studentcard");
//         }
//       }
//     );
//   } catch (error) {
//     console.error("error: " + error.message);
//   }
// };

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
          response.status(202).send({
            title: results[0].title,
            author: results[0].author,
            isbn: results[0].isbn,
            timestamp: results[0].timestamp,
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
