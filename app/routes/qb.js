// const express = require("express");
// const router = express.Router();
// const mysqlConnection = require("../config/config.database");
// const config = require("../config/auth.config");
// const jwt = require("jsonwebtoken");
// //var bcrypt = require("bcryptjs");
// //const auth = require("../middleware/authJwt");

// // router.get("/", async (request, response) => {
// //   response.json({ message: "Welcome to ohmcard-server application." });
// // });

// // router.get("/alluser", async (request, response) => {
// //   mysqlConnection.query("SELECT * FROM user", (error, results, fields) => {
// //     if (!error) {
// //       response.send(results);
// //     } else {
// //       console.error("error: " + error.message);
// //     }
// //   });
// // });

// // router.post("/login", async (request, response) => {
// //   try {
// //     mysqlConnection.query(
// //       "SELECT * FROM user WHERE username = ? AND userpassword = ?",
// //       [request.body.username, request.body.userpassword],
// //       (error, results, fields) => {
// //         if (error) {
// //           console.error("error: " + error);
// //           return;
// //         }
// //         if (
// //           request.body.userpassword === results[0].userpassword &&
// //           request.body.username === results[0].username
// //         ) {
// //           var payload = { username: results[0].username };
// //           const token = jwt.sign(payload, config.secret, {
// //             algorithm: "HS256",
// //             expiresIn: "30d",
// //           });
// //           console.log(JSON.stringify(results[0]), token);
// //           response.status(200).send({
// //             studentId: results[0].studentId,
// //             username: results[0].username,
// //             email: results[0].email,
// //             firstname: results[0].firstname,
// //             surname: results[0].surname,
// //             birthday: results[0].birthday,
// //             libraryId: results[0].libraryId,
// //             token: token,
// //           });
// //         } else {
// //           response.status(400).send("Invalid username or password");
// //         }
// //       }
// //     );
// //   } catch (error) {
// //     console.error("error: " + error.message);
// //   }
// // });

// // router.get("/home", async (request, response) => {
// //   let str = request.header("x-access-token");
// //   try {
// //     jwt.verify(str, config.secret, { algorithm: "HS256" });
// //     response.status(202).send("User content");
// //   } catch {
// //     response.status(403).send("Bad Token");
// //   }
// // });

// // router.get("/home", async (request, response) => {
// //   if (request.header("authorization")) {
// //     try {
// //       let authorization = request.headers["authorization"].split(" ");
// //       if (authorization[0] !== "Basic") {
// //         return response.status(401).send();
// //       } else {
// //         request.jwt = jwt.verify(authorization[1], config.secret);
// //         response.status(202).send("User content");
// //       }
// //     } catch (error) {
// //       return response.status(403).send("Bad token");
// //     }
// //   } else {
// //     return response.status(401).send();
// //   }
// // });

// // router.get("/home", async (request, response) => {
// //   //token
// //   console.log("header value bzw. der token: " + request.headers.value);
// //   const token = request.headers.value;
// //   var _username;
// //   try {
// //     if (jwt.verify(token, config.secret, { algorithm: "HS256" })) {
// //       //Decode jwt-token
// //       const base64Url = token.split(".")[1];
// //       const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// //       const buff = new Buffer.from(base64, "base64");
// //       const payloadinit = buff.toString("ascii");
// //       const payload = JSON.parse(payloadinit);
// //       // Kontrolllog :)
// //       console.log("Payload.username: " + payload.username);

// //       _username = payload.username;
// //     }
// //      else {
// //       response.status(401).send("Bad Token");
// //     }
// //     if (_username != null) {
// //       //console.log(_username);
// //       mysqlConnection.query(
// //         "SELECT * FROM user WHERE username = ? ",
// //         [_username],
// //         (error, results, fields) => {
// //           if (error) {
// //             console.error("error: " + error);
// //             return;
// //           }
// //           console.log(JSON.stringify(results[0]));
// //           return response.status(200).send({
// //             studentId: results[0].studentId,
// //             username: results[0].username,
// //             email: results[0].email,
// //             firstname: results[0].firstname,
// //             surname: results[0].surname,
// //             birthday: results[0].birthday,
// //             libraryId: results[0].libraryId,
// //           });
// //         }
// //       );
// //     }
// //   } catch (error) {
// //     console.error("error: " + error.message);
// //   }
// // });

// // //token
// // console.log("header value bzw. der token: " + request.headers.value);
// // const token = request.headers.value;
// // //Decode jwt-token
// // const base64Url = token.split(".")[1];
// // const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
// // const buff = new Buffer.from(base64, "base64");
// // const payloadinit = buff.toString("ascii");
// // const payload = JSON.parse(payloadinit);
// // // Kontrolllog :)
// // console.log("Payload: " + payload);
// // console.log("Payload.username: " + payload.username);

// // const _username = payload.username;

// //TODO
// // router.get("/user", async (request, response) => {
// //   try {
// //     mysqlConnection.query(
// //       "SELECT * FROM user WHERE username = ?",
// //       [request.body.username],
// //       (error, results, fields) => {
// //         if (error) {
// //           console.error("error: " + error);
// //           return;
// //         }

// //         console.log(JSON.stringify(results[0]));
// //         return response.status(200).send({ username: results[0].username });
// //       }
// //     );
// //     //response.send("Very Secret Data");
// //   } catch {
// //     response.status(401);
// //     response.send("Bad Token");
// //   }
// // });

// module.exports = router;
