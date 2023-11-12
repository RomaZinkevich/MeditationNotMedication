const express = require("express");
const sections = require("./sections");
const content = require("./content");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello API",
  });
});

router.get('/getUserData', async (req, res) => {
  const userData = await req.session.user;
  console.log("DASJFHJKASs")
  console.log(req.session.user)
  res.json(req.session.user);
});

router.use("/sections", sections);
router.use("/content", content);

module.exports = router;
