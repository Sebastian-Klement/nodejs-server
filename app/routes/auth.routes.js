const controller = require("../controllers/auth.controller");

module.exports = (app) => {
  app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Content-Type", "application/json");
    response.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept, authorization"
    );
    next();
  });

  app.post("/login", controller.loginValidate, controller.signin);
  //mögliche implemenierung prüfen: erst aufruf von _loginValidate. If true dann in LoginValidate die signIn ausführen

  app.get("/home", controller.checkToken);
};
