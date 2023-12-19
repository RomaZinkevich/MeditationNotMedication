const express = require("express");
const sections = require("./sections");
const content = require("./content");
const user = require("./user");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello API",
  });
});

router.use("/section", sections);
router.use("/content", content);
router.use("/user", user);

module.exports = router;
