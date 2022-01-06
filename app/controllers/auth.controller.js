const mysqlConnection = require("../config/config.database");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
//const express = require("express");
//const router = express.Router();
//const { request, response } = require("express");

exports.signin = async (request, response) => {
  try {
    mysqlConnection.query(
      "SELECT * FROM user WHERE username = ? AND userpassword = ?",
      [request.body.username, request.body.userpassword],
      (error, results, fields) => {
        if (error) {
          console.error("error: " + error);
          return;
        }
        if (
          request.body.userpassword === results[0].userpassword &&
          request.body.username === results[0].username
        ) {
          var payload = { username: results[0].username };
          const token = jwt.sign(payload, config.secret, {
            algorithm: "HS256",
            expiresIn: "30d",
          });
          console.log(JSON.stringify(results[0]), token);
          response.status(200).send({
            studentId: results[0].studentId,
            username: results[0].username,
            email: results[0].email,
            firstname: results[0].firstname,
            surname: results[0].surname,
            birthday: results[0].birthday,
            libraryId: results[0].libraryId,
            token: token,
          });
        } else {
          response.status(400).send("Invalid username or password");
        }
      }
    );
  } catch (error) {
    console.error("error: " + error.message);
  }
};

exports.checkToken = async (request, response) => {
  if (request.header("authorization")) {
    try {
      let authorization = request.headers["authorization"].split(" ");
      if (authorization[0] !== "Basic") {
        return response.status(401).send();
      } else {
        request.jwt = jwt.verify(authorization[1], config.secret);
        response.status(202).send("User content");
      }
    } catch (error) {
      return response.status(403).send("Bad token");
    }
  } else {
    return response.status(401).send();
  }
};
