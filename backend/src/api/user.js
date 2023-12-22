const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { createUser, clearUsers, loginUser } = require("../db/userdb");
const { encrypt, compare } = require("../utils/passwordEncryption");
const { tryCatch } = require("../utils/tryCatch");

const router = express.Router();

const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .required(),
    email: Joi.string().required()
});

// @desc Creates new user in the database
// @route POST /api/user
// @access Public
router.post("/",
    tryCatch(async (req, res, next) => {
        let newUser = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        }
        const { error, value } = schema.validate(newUser);
        if (error) throw error;

        newUser.password = await encrypt(newUser.password);
        await createUser(newUser);
        let token = jwt.sign(newUser, process.env.JWT_SECRET_KEY, {
            expiresIn: "10m",
        });
        return res.json({"status": "success", "token": token});
}));

// @desc Logs in user if he/she exists
// @route GET /api/user
// @access Public
router.get("/",
    tryCatch(async (req, res, next) => {
        let user = {
            email: req.body.email,
            password: req.body.password
        };

        let response = await loginUser(user);
}));

module.exports = router;