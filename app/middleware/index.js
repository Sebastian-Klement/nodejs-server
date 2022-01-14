const authJwt = require("./authJwt");
const { validate } = require("./validate");
const mail = require("./mail");

module.exports = {
  authJwt,
  validate,
  mail,
};
