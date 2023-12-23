const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { createUser, clearUsers, loginUser } = require("../db/userdb");
const { tryCatch } = require("../utils/tryCatch");
const checkAuth = require("../middleware/auth");

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

        await createUser(newUser);
        delete newUser.password;
        console.log(newUser);

        let token = jwt.sign(newUser, process.env.JWT_SECRET_KEY, {
            expiresIn: "10m",
        });
        return res.json({"status": "success", "token": token});
}));

// @desc Logs in user if it exists
// @route GET /api/user
// @access Public
router.post("/login",
    tryCatch(async (req, res, next) => {
        let user = {
            email: req.body.email,
            password: req.body.password
        };
        let response = await loginUser(user);
        let token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
            expiresIn: "10m",
        });
        return res.json({ "status":"success", "token":token, "details":response });
}));

module.exports = router;