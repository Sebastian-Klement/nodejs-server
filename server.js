const express = require("express");
const cors = require("cors");
var requestIp = require("request-ip");
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (request, response) => {
  var clientIp = requestIp.getClientIp(request);
  console.log(clientIp);
  response.json({
    message: "Welcome to my app user: " + clientIp + " !",
  });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server up at http://localhost:${port}`);
});
