const express = require("express");
const pool = require("../db/dbconfig")
const router = express.Router();


// @desc ISHIDHLAS
// @route GET /api/user
router.post("/", (req, res) => {
    let user = {
        user_id: Math.random()*100000,
        user_name: req.body.name,
        email: req.body.email,
        image: req.body.image
    };
    const query = `INSERT INTO "User" (user_id, user_name, email, image) VALUES ('${Math.random()*100000}','${req.body.name}', '${req.body.email}', '${req.body.image}');`;
    pool.query(query, (err, result) => {
        if (err)
            res.status(500).json(err.message);
        else
            res.json("Done");
    });


  });

module.exports = router;