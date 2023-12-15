const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const userdb = require("../db/userdb");
const { tryCatch } = require("../utils/tryCatch");

const router = express.Router();

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string(),
    image: Joi.string()
});

// @desc Creates new user in the database
// @route POST /api/user
// @access Public
router.post("/", 
    tryCatch(async (req, res, next) => {
        let newUser = {
            name: req.body.name,
            email: req.body.email,
            image: req.body.image
        }
        
        const { error, value } = schema.validate(newUser);
        if (error) throw error;

        await userdb.createUser(newUser);
        let token = jwt.sign(newUser, process.env.JWT_SECRET_KEY, {
            expiresIn: "10m",
        });
        return res.json({"status": "success", "token": token});
}));

module.exports = router;