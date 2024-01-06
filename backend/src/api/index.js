const express = require("express");
const sections = require("./sections");
const content = require("./content");
const user = require("./user");
const userAdmin = require("./userAdmin");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello API",
  });
});

router.use("/sections", sections);
router.use("/contents", content);
router.use("/users", user);
router.use("/users/admin", userAdmin);

module.exports = router;