const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (request, response) => {
  response.json({ message: "Welcome to my first server application." });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server up at http://localhost: ${port}`);
});
