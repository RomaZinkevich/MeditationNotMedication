const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const checkToken = require("../middleware/auth");
const { createUser, loginUser, getUser, changeUser } = require("../db/userdb");
const { tryCatch } = require("../utils/tryCatch");

const DEFAULT_IMAGE = "https://ih1.redbubble.net/image.1046392292.3346/st,medium,507x507-pad,600x600,f8f8f8.jpg";

const router = express.Router();

const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .required(),
    email: Joi.string().required(),
    image: Joi.string().required()
});

// @desc Creates new user in the database
// @route POST /api/users
// @access Public
router.post("/",
    tryCatch(async (req, res, next) => {
        let newUser = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            image: DEFAULT_IMAGE
        }
        const { error, value } = schema.validate(newUser);
        if (error) throw error;

        const response = await createUser(newUser);
        delete newUser.password;
        newUser.id = response.user_id
        newUser.image = DEFAULT_IMAGE;

        let token = jwt.sign(newUser, process.env.JWT_SECRET_KEY, {
            expiresIn: "10m",
        });
        return res.json({"status": "success", "token": token, "details": newUser});
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
        user.id = response.user_id;
        user.name = response.name;
        user.image = response.image;

        let token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
            expiresIn: "10m",
        });
        return res.json({ "status": "success", "token": token, "details": user });
}));

// @desc Gets user info
// @route GET /api/users
// @access Private
router.get("/", checkToken,
    tryCatch(async (req, res, next) => {
        let response = await getUser(req.user);
        return res.json({ "status": "success", "details": response });
}));

// @desc Changes user info
// @route PUT /api/users
// @access Private
router.put("/", checkToken,
    tryCatch(async (req, res, next) => {
        let updatedUser = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            image: req.body.image
        }
        const { error, value } = schema.validate(updatedUser);
        if (error) throw error;

        await changeUser(updatedUser, req.user);
        delete updatedUser.password;
        updatedUser.id = req.user.id;
        
        let token = jwt.sign(updatedUser, process.env.JWT_SECRET_KEY, {
            expiresIn: "10m",
        });
        return res.json({"status": "success", "token": token, "details": updatedUser});
}));


module.exports = router;