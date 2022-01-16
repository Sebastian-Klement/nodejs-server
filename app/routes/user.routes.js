const controller = require("../controllers/user.controller");

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

  app.get("/alluser", controller.allUser);

  app.get("/allmedium", controller.allMedium);
};
