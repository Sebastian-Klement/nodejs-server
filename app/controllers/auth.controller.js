const mysqlConnection = require("../config/config.database");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const { validationResult, check } = require("express-validator");
const { mail } = require("../middleware");
var bcrypt = require("bcryptjs");

exports.signin = async (request, response) => {
  mail.sentSafetyMail();

  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  } else {
    try {
      mysqlConnection.query(
        "SELECT * FROM user WHERE username = ?",
        [request.body.username],
        (error, results) => {
          if (error) {
            console.error("error: " + error);
            return;
          }
          let isPasswordValid = bcrypt.compareSync(
            request.body.userpassword,
            results[0].userpassword
          );
          if (isPasswordValid) {
            var payload = { username: results[0].username };
            const token = jwt.sign(payload, config.secret, {
              algorithm: "HS256",
              expiresIn: "1d",
            });
            response.status(200).send({
              studentId: results[0].studentId,
              username: results[0].username,
              firstname: results[0].firstname,
              surname: results[0].surname,
              birthday: results[0].birthday,
              libraryId: results[0].libraryId,
              credit: results[0].credit,
              token: token,
            });
          } else {
            response.status(401).send({
              token: null,
              message: "Upps ... Invalid username or password",
            });
          }
        }
      );
    } catch (error) {
      console.error("error: " + error.message);
    }
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
    return response.status(401).send("Authorisation is not possible!");
  }
};

exports.loginValidate = [
  check("username", "Username must be an name with a number")
    .isLength({ min: 7 })
    .trim()
    .escape(),
  check("userpassword")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 Characters")
    .matches("[0-9]")
    .withMessage("Password must contain numbers")
    .trim()
    .escape(),
];
