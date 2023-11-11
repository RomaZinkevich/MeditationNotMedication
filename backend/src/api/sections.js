const express = require("express");
const router = express.Router();
const pool = require("../db/dbconfig")

const SSL = process.env.SSL;
const db_user = process.env.DB_USER;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT; 
const db_name = (process.env.NODE_ENV === "BUILD") ? process.env.DB_NAME : process.env.DB_TESTNAME;
const db_password = process.env.DB_PASSWORD;

// @desc Get all Sections
// @route GET /api/sections
router.get("/", (req, res) => {
    pool.query('SELECT section_name, content_name, image FROM content AS C, section AS S WHERE S.section_id=C.section_id;', (err, result) => {
        if (err)
            res.status(500).json({db_host,db_name,db_port,db_user});
        else
            res.json(result.rows);
    });
  });



module.exports = router;