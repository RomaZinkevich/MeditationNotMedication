const express = require("express");
const router = express.Router();
const { getContent } = require("../db/contentdb");
const { tryCatch } = require("../utils/tryCatch");
const ContentError = require('../utils/ContentError');


// @desc Get content by ID
// @route GET /api/content/:id
// @access Public
router.get("/:id", 
    tryCatch(async (req, res, next) => {
        const result = await getContent(req.params.id);
        res.json(result.rows);
}));

module.exports = router;