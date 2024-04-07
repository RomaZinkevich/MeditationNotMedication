const express = require("express");
const { checkToken, adminToken } = require("../middleware/auth");
const { getAllUsers, changeUserRole } = require("../db/userdb");
const { tryCatch } = require("../utils/tryCatch");
const { ALLOWED_USER_COLUMNS, ALLOWED_ORDER } = require("./allowedSortOptions");

const router = express.Router();

// @desc Gets info about all users
// @route GET /api/users/admin
// @access Private (Admin)
router.get("/", checkToken, adminToken,
    tryCatch(async (req, res, next) => {
        let sortBy = ALLOWED_USER_COLUMNS.includes(req.query.sortBy) ? req.query.sort : "user_id";
        let order = ALLOWED_ORDER.includes(req.query.order) ? req.query.order : "asc";
        let response = await getAllUsers(sortBy, order);
        return res.json({ "status": "success", "details": response });
}));

// @desc Change role for one of the users
// @route PUT /api/users/admin/:id
// @access Private (Admin)
router.put("/:id", checkToken, adminToken,
    tryCatch(async (req, res, next) => {
        let response = await changeUserRole(req.body.role, req.params.id);
        return res.json({ "status": "success", "details": response });
}));





module.exports = router;