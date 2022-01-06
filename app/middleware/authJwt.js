const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

verifyToken = (request, response, next) => {
  const token = request.headers["x-access-token"];

  if (!token) {
    return response.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (error, decoded) => {
    if (error) {
      return response.status(401).send({
        message: "Unauthorized!",
      });
    }
    next();
  });
};

module.exports =  { verifyToken: verifyToken };
