const express = require("express");
const router = express.Router();
const sql = require("./../database.js");

function routes(app) {
  //LOGIN
  router.post("/login", (req, res) => {
    console.log(req.body);
    let pfid = req.body.pfid;
    let password = req.body.password;

    sql.query(
      `SELECT Name, Role FROM users WHERE PFID = ${pfid} AND Password = PASSWORD('${password}')`,
      (err, response) => {
        if (err) {
          console.log("error: ", err);
          res.status(400).send({ mssg: "Error!" });
        }

        if (response.length) {
          console.log("found users: ", response[0].Name);
          if (response[0].Name && response[0].Role) {
            req.session.user_name = response[0].Name;
            req.session.user_role = response[0].Role;
            res.status(200).send({ mssg: "Logged in Successfully!" });
          }
        } else {
          res.status(400).send({ mssg: "Invalid Username or Password!" });
        }
      }
    );
  });

  //LOGOUT
  router.get("/logout", (req, res) => {
    req.session.destroy();
    res.status(200).send({ mssg: "Logged out Successfully!" });
  });
  return router;
}

module.exports = routes;
