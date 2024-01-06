const express = require("express");
const { checkToken, adminToken } = require("../middleware/auth");
const { getAllUsers } = require("../db/userdb");
const { tryCatch } = require("../utils/tryCatch");

const router = express.Router();

// @desc Gets info about all users
// @route GET /api/users/admin
// @access Private
router.get("/", checkToken, adminToken,
    tryCatch(async (req, res, next) => {
        let response = await getAllUsers();
        return res.json({ "status": "success", "details": response });
}));





module.exports = router;