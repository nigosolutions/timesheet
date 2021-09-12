const express = require("express");
const router = express.Router();
const sql = require("./../database.js");

function routes(app) {
  //SINGLE ENTRY
  router.post("/addPass", (req, res) => {
    console.log(req.body);
    let PFID = req.body.PFID || "";
    let REF = req.body.REF || "";
    let DI = req.body.DI || "";
    let DE = req.body.DE || "";
    let SITE = req.body.SITE || "";
    let sites = [];

    if (Array.isArray(SITE)) SITE.map((site) => sites.push(site.name));

    sites = sites.length > 0 ? sites.join("::") : "";

    sql.query(
      `INSERT INTO passes (PFID, REF, DI, DE, SITE, PASSIMG) VALUES ('${PFID}', '${REF}', '${DI}', '${DE}', '${sites}', '')`,
      (err, response) => {
        if (err) {
          console.log("error: ", err);
          res.status(400).send({ mssg: "Error!" });
        }

        if (response) {
          console.log(response);
          res.status(200).send({ mssg: `Pass uploaded for PFID# ${PFID}` });
        }
        res.status(400).send({ mssg: "Error!" });
      }
    );
  });

  router.get("/getAllSites", (req, res) => {
    sql.query(`SELECT (id, name) from sites`, (err, response) => {
      if (err) {
        console.log("error: ", err);
        res.status(400).send({ mssg: "Error!" });
      }

      if (response.length) {
        res.status(200).send({ data: response[0] });
      }
    });
    res.status(400).send({ mssg: "Error!" });
  });

  return router;
}

module.exports = routes;
