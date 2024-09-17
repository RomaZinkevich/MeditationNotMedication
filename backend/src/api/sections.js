const express = require("express");
const router = express.Router();
const { getAllSections, getSection } = require("../db/sectiondb");
const { tryCatch } = require("../utils/tryCatch");
const { ALLOWED_SECTION_COLUMNS, ALLOWED_ORDER } = require("./allowedSortOptions");


// @desc Gets all Sections
// @route GET /api/sections
// @access Public
router.get("/",
    tryCatch(async (req, res, next) => {
        let sortBy = ALLOWED_SECTION_COLUMNS.includes(req.query.sort) ? req.query.sort : "section_id";
        let order = ALLOWED_ORDER.includes(req.query.order) ? req.query.order : "asc";
        const result = await getAllSections(sortBy, order);
        console.log(result)
        return res.json(result.rows);
  }));

// @desc Gets all content related to one section
// @route GET /api/sections/:id
// @access Public
router.get("/:id",
    tryCatch(async (req, res, next) => {
        let sortBy = ALLOWED_SECTION_COLUMNS.includes(req.query.sort) ? req.query.sort : "content_id";
        let order = ALLOWED_ORDER.includes(req.query.order) ? req.query.order : "asc";
        const result = await getSection(req.params.id, sortBy, order);
        res.json(result.rows);
}));



module.exports = router;