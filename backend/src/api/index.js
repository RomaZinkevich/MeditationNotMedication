const express = require("express");
const sections = require("./sections");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello API",
  });
});

router.use("/sections", sections);

module.exports = router;
