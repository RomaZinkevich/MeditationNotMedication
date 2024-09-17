const express = require("express");
const router = express.Router();
const { getContent, getContentsTag } = require("../db/contentdb");
const { tryCatch } = require("../utils/tryCatch");


// @desc Get content by ID
// @route GET /api/contents/:id
// @access Public
router.get("/:id",
    tryCatch(async (req, res, next) => {
        const result = await getContent(req.params.id);
        res.json(result);
}));

// @desc Get content's tags
// @route GET /api/contents/tags/:id
// @access Public
router.get("/tags/:id",
    tryCatch(async (req, res, next) => {
            const result = await getContentsTag(req.params.id);
            res.json(result);
    }));

module.exports = router;