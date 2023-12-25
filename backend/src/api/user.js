const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const checkToken = require("../middleware/auth");
const { createUser, loginUser } = require("../db/userdb");
const { tryCatch } = require("../utils/tryCatch");

const DEFAULT_IMAGE = "https://ih1.redbubble.net/image.1046392292.3346/st,medium,507x507-pad,600x600,f8f8f8.jpg";

const router = express.Router();

const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .required(),
    email: Joi.string().required()
});

// @desc Creates new user in the database
// @route POST /api/users
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
        newUser.image = DEFAULT_IMAGE;

        let token = jwt.sign(newUser, process.env.JWT_SECRET_KEY, {
            expiresIn: "10m",
        });
        return res.json({"status": "success", "token": token});
}));

// @desc Logs in user if it exists
// @route POST /api/users/login
// @access Public
router.post("/login",
    tryCatch(async (req, res, next) => {
        let user = {
            email: req.body.email,
            password: req.body.password
        };
        let response = await loginUser(user);

        delete user.password;
        user.name = response.name;
        user.image = response.image;

        let token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
            expiresIn: "10m",
        });
        return res.json({ "status": "success", "token": token, "details": response });
}));

// @desc Gets user info
// @route GET /api/users
// @access Private
router.get("/", checkToken,
    tryCatch(async (req, res, next) => {
        return res.json({ "status": "success", "data": req.user });
}));


module.exports = router;