const express = require("express");
const router = express.Router();
const { getAllSections, getSection } = require("../db/sectiondb");
const { tryCatch } = require("../utils/tryCatch");
const SectionError = require('../utils/SectionError');


// @desc Gets all Sections
// @route GET /api/sections
// @access Public
router.get("/", 
    tryCatch(async (req, res, next) => {
        const result = await getAllSections();
        return res.json(result.rows);
  }));

// @desc Gets all content related to one section
// @route GET /api/sections/:id 
// @access Public 
router.get("/:id", 
    tryCatch(async (req, res, next) => {
        const result = await getSection(req.params.id);
        if (result.rowCount === 0)
            throw new SectionError("SectionError","Section ID Not Found");
        else
            res.json(result.rows);
}));



module.exports = router;