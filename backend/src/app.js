const express = require("express");
const api = require("./api");
const pool = require("./db/dbconfig");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  pool.query("SELECT * FROM section;", (err, result) => {
    if (err)
      res.status(500).send(err);
    else {
      res.json(result.rows);
    }
      
  })
});

app.use("/api", api);

module.exports = app;
