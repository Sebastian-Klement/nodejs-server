const { check } = require("express-validator");

 exports.loginValidate = function () {
  return check("username", "Username Must Be an Email Address").trim().escape(),
    check("userpassword")
      .isLength({ min: 3 })
      .withMessage("Password Must Be at Least 8 Characters")
      .matches("[0-9]")
      .withMessage("Password Must Contain a Number")
      .trim()
      .escape();
};
