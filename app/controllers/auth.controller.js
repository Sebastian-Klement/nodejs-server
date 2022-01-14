const mysqlConnection = require("../config/config.database");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const { validationResult, check } = require("express-validator");
const { mail}  = require("../middleware");
const MobileDetect = require("mobile-detect");

exports.signin = async (request, response) => {
   
  mail.sentSafetyMail();

  md = new MobileDetect(request.headers["user-agent"]);
  if (!md.mobile()) {
    console.log("is browser!");
    response.status(400).json({ message: "uuups ... please use the app" });
  } else {
    console.log("is mobile");

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    } else {
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
              response
                .status(400)
                .send("Upps ... Invalid username or password");
            }
          }
        );
      } catch (error) {
        console.error("error: " + error.message);
      }
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
    return response.status(401).send();
  }
};

exports.loginValidate = [
  check("username", "Username Must Be an Email Address").trim().escape(),
  check("userpassword")
    .isLength({ min: 3 })
    .withMessage("Password Must Be at Least 8 Characters")
    .matches("[0-9]")
    .withMessage("Password Must Contain a Number")
    .trim()
    .escape(),
];