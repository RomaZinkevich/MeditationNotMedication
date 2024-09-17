const express = require("express");
const sections = require("./sections");
const content = require("./content");
const user = require("./user");
const tag = require("./tag");
const userAdmin = require("./userAdmin");
const contentAdmin = require("./contentAdmin");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello API",
  });
});

router.use('/media', express.static('/mnt/volume_1/eazyeaze_files'));
router.use("/sections", sections);
router.use("/contents", content);
router.use("/users", user);
router.use("/users/admin", userAdmin);
router.use("/contents/admin", contentAdmin);
router.use("/tags", tag);

module.exports = router;