const express = require("express");
const router = express.Router();
const { getAllTags, getTagsContent } = require("../db/tagdb");
const { tryCatch } = require("../utils/tryCatch");


// @desc Get all Tags
// @route GET /api/tags
// @access Public
router.get("/",
    tryCatch(async (req, res, next) => {
        const result = await getAllTags();
        res.json(result.rows);
    }));

// @desc Get Tag's content
// @route GET /api/tags/contents/:id
// @access Public
router.get("/contents/:id",
    tryCatch(async (req, res, next) => {
        const result = await getTagsContent(req.params.id);
        res.json(result.rows);
    }));


module.exports = router;