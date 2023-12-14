const express = require("express");
const router = express.Router();
const pool = require("../db/dbconfig");


// @desc Get content by ID
// @route GET /api/content/:id
// @access Public
router.get("/:id", (req, res) => {
    const query = `SELECT content_id, content_name, description, author, section_name, audio, image FROM Content LEFT JOIN Section ON Content.section_id = Section.section_id WHERE content_id=${req.params.id} ;`;
    pool.query(query, (err, result) => {
        if (err)
            res.status(500).json(err.message);
        else{
            if (result.rowCount===0) 
                res.status(404).json({"message":"ID not found"})
            else 
                res.json(result.rows);
        }
            
    });
  });

module.exports = router;