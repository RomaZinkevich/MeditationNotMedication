const express = require("express");
const api = require("./api");
const session = require('express-session');
const googleAuth = require('./googleAuth');
const auth = require("./api/auth");
const cors = require('cors');

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));
app.use(cors());

app.use(googleAuth.initialize());
app.use(googleAuth.session());

app.get("/test", function(req, res) {
  res.render("pages/auth");
})

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});


app.use("/", auth);

app.use("/api", api);


module.exports = app;
