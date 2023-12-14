const express = require("express");
const userdb = require("../db/userdb");
const jwt = require("jsonwebtoken");
const router = express.Router();



// @desc Creates new user in the database
// @route POST /api/user
// @access Public
router.post("/", async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let image = req.body.image;

    const results = await userdb.createUser(name, email, image);

    if (results.status==="success"){
        let token = jwt.sign({ name: name, email: email, image: image }, process.env.JWT_SECRET_KEY, {
            expiresIn: "10m",
        });
        res.send({"status": "success", "token": token});
    } 
    else{
        res.status(500).json(results.message);
    } 
});

module.exports = router;