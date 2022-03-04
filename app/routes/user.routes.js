const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

module.exports = (app) => {
  app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Content-Type", "application/json");
    response.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/alluser", userController.allUser);

  app.get("/allmedium", authController.checkToken, userController.allMedium);
};
