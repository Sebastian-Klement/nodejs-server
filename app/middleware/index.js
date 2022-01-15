const authJwt = require("./authJwt");
const mail = require("./mail");
const detect = require("./detect");
const { validate } = require("./validate");

module.exports = {
  authJwt,
  mail,
  detect,
  validate,
};
