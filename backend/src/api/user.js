const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const axios = require('axios');
const UserError = require('../utils/UserError');
const { checkToken, adminToken } = require("../middleware/auth");
const { createUser, loginUser, getUser, changeUser, changeUserPassword, deleteSingleUser, getUserTags, postUserTags } = require("../db/userdb");
const { tryCatch } = require("../utils/tryCatch");

const DEFAULT_IMAGE = "https://ih1.redbubble.net/image.1046392292.3346/st,medium,507x507-pad,600x600,f8f8f8.jpg";

const router = express.Router();

const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(8)
    .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/)
    .required(),
    email: Joi.string().required(),
    image: Joi.string().required(),
    role: Joi.number()
});

const passwordSchema = Joi.object({
    password: Joi.string().min(8)
    .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/)
    .required()
})

// @desc Creates new user in the database
// @route POST /api/users
// @access Public
router.post("/",
    tryCatch(async (req, res, next) => {
        let newUser = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            image: DEFAULT_IMAGE,
            role: 0
        }
        const { error, value } = schema.validate(newUser);
        if (error) throw error;

        const response = await createUser(newUser);
        delete newUser.password;
        newUser.id = response.user_id

        let token = jwt.sign(newUser, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
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
        user.role = response.role;

        let token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
        });
        return res.json({ "status": "success", "token": token, "details": user });
}));

// @desc Google authorization
// @route POST /api/users/google_auth
// @access Public
router.post("/google_auth",
    tryCatch(async (req, res, next) => {
        let result;
        let response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${req.body.access_token}`)
        if (response.data.email!==req.body.email)
            throw new UserError("EmailValidationError","Emails are different");

        const newUser = {
            name: response.data.name,
            email: response.data.email,
            password: response.data.id
        }
        let isNewUser;
        try {
            result = await createUser({ ...newUser });
            isNewUser=true;
        }
        catch (error) {
            if (error.message === "Email already exists") {
                result = await loginUser(newUser)
                isNewUser=false;
            }
            else throw new UserError("UserError", error.message)
        }
        result.id = result.user_id
        // delete result.user_id
        let token = jwt.sign(result, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
        });
        return res.json({ "status": "success", "token": token, "details": result, "newUser": isNewUser })
    }));

// @desc Gets user info
// @route GET /api/users
// @access Private
router.get("/", checkToken,
    tryCatch(async (req, res, next) => {
        let response = await getUser(req.user);
        return res.json({ "status": "success", "details": response });
}));

// @desc Changes user info except for password
// @route PUT /api/users
// @access Private
router.put("/", checkToken,
    tryCatch(async (req, res, next) => {
        const user = await getUser(req.user);

        user.name = req.body.name ? req.body.name : user.name;
        user.image = req.body.image ? req.body.image : user.image;
        user.email = req.body.email ? req.body.email : user.email;

        await changeUser(user, req.user);

        let token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
        });
        return res.json({"status": "success", "token": token, "details": user});
}));

// @desc Changes user password
// @route PUT /api/users/password
// @access Private
router.put("/password", checkToken,
    tryCatch(async (req, res, next) => {
        let user = {"password": req.body.password};

        const { error, value } = passwordSchema.validate(user);
        if (error) throw error;

        const result = await changeUserPassword(user.password, req.user);
        user = result.rows[0];

        let token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
        });
        return res.json({"status": "success", "token": token, "details": user});
}));

// @desc Deletes User
// @route DELETE /api/users
// @access Private
router.delete("/", checkToken,
    tryCatch(async (req, res, next) => {
        const result = await deleteSingleUser(req.user);
        const user = result;

        return res.json({"status": "success", "details": user});
}));

// @desc Gets all user's tags
// @route GET /api/users/tags
// @access Private
router.get("/tags", checkToken,
    tryCatch(async (req, res, next) => {
        const result = await getUserTags(req.user);
        return res.json({"status": "success", "details": result});
    }));

// @desc Posts users tags
// @route POST /api/users/tags
// @access Private
router.post("/tags", checkToken,
    tryCatch(async (req, res, next) => {
        let { tag_ids } = req.body;
        if (tag_ids.length === 0) return res.json({"status": "failed", "details": "No new tags to add"})

        const id_pairs = tag_ids.map(tag_id => `(${req.user.id}, ${tag_id})`).join(', ');
        const result = await postUserTags(id_pairs, req.user.id);
        return res.json({"status": "success", "details": result});
    }));


module.exports = router;