const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { createUser, clearUsers } = require("../db/userdb");
const encrypt = require("../utils/passwordEncryption");
const validatePasswordMiddleware = require("../middleware/validatePassword");
const { tryCatch } = require("../utils/tryCatch");

const router = express.Router();

const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string(),
    image: Joi.string()
});

// @desc Creates new user in the database
// @route POST /api/user
// @access Public
router.post("/", validatePasswordMiddleware,
    tryCatch(async (req, res, next) => {
        let newUser = {
            name: req.body.name,
            password: await encrypt(req.body.password),
            email: req.body.email,
            image: req.body.image
        }
        const { error, value } = schema.validate(newUser);
        if (error) throw error;

        await createUser(newUser);
        let token = jwt.sign(newUser, process.env.JWT_SECRET_KEY, {
            expiresIn: "10m",
        });
        return res.json({"status": "success", "token": token});
}));

module.exports = router;