const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
var session = require("express-session");
const oneDay = 1000 * 60 * 60 * 24;

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    const userApis = require("./routes/userApis.js");
    const passApis = require("./routes/passApis.js");
    server.use(
      session({
        secret: process.env.SECRET_KEY,
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
        resave: false,
      })
    );
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use(bodyParser.raw());
    server.use("/userApi", userApis(server));
    server.use("/passApi", passApis(server));

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
