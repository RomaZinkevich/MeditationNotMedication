const express = require("express");
const router = express.Router();
const pool = require("../db/dbconfig")


// @desc Get all Sections
// @route GET /api/sections
// @access Public
router.get("/", (req, res) => {
    const query = 'SELECT S.section_id, content_id, content_name, author, section_name, image FROM content AS C, section AS S WHERE S.section_id=C.section_id;';
    pool.query(query, (err, result) => {
        if (err)
            res.status(500).json(err.message);
        else
            res.json(result.rows);
    });
  });

// @desc Get all content related to one section
// @route GET /api/sections/:id 
// @access Public 
router.get("/:id", (req, res) => {
    const query = `SELECT content_id, content_name, author, section_name, image, description FROM Content AS C LEFT JOIN Section AS S ON C.section_id = S.section_id WHERE C.section_id=${req.params.id};`;
    pool.query(query, (err, result) => {
        if (err)
            res.status(500).json(err.message);
        else if (result.rowCount === 0)
            res.status(404).json({"message":"ID Not Found"})
        else
            res.json(result.rows);
    });
});



module.exports = router;