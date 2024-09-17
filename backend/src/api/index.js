const express = require("express");
const path = require('path');
const sections = require("./sections");
const content = require("./content");
const user = require("./user");
const tag = require("./tag");
const userAdmin = require("./userAdmin");
const contentAdmin = require("./contentAdmin");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello APIS",
  });
});

const isProduction = process.env.NODE_ENV === 'PROD';

const mediaPath = isProduction
    ? '/mnt/volume_1/eazyeaze_files' // Server path
    : path.join(__dirname, 'local_media'); // Local path for development

// Serve media files
router.use('/media', express.static(mediaPath));

router.use("/sections", sections);
router.use("/contents", content);
router.use("/users", user);
router.use("/users/admin", userAdmin);
router.use("/contents/admin", contentAdmin);
router.use("/tags", tag);

module.exports = router;