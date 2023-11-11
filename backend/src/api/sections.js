const express = require("express");
const router = express.Router();
const pool = require("../db/dbconfig")


// @desc Get all Sections
// @route GET /api/sections
router.get("/", (req, res) => {
    const query = 'SELECT content_id, content_name, author, section_name, image FROM content AS C, section AS S WHERE S.section_id=C.section_id;';
    pool.query(query, (err, result) => {
        if (err)
            res.status(500).json(err.message);
        else
            res.json(result.rows);
    });
  });



module.exports = router;