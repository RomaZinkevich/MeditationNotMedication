const express = require("express");
const sections = require("./sections");
const content = require("./content");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello API",
  });
});

router.use("/sections", sections);
router.use("/content", content);

module.exports = router;
