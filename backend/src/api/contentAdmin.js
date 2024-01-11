const express = require("express");
const router = express.Router();
const { getContent, changeContent } = require("../db/contentdb");
const { adminToken } = require("../middleware/auth");
const { tryCatch } = require("../utils/tryCatch");

// @desc Changes content item
// @route PUT /api/contents/admin/:id
// @access Private (Admin)
router.put("/:id", adminToken,
    tryCatch(async (req, res, next) => {
        const content = await getContent(req.params.id);

        content.content_name = req.body.name ? req.body.name : content.content_name;
        content.description = req.body.description ? req.body.description : content.description;
        content.audio = req.body.audio ? req.body.audio : content.audio;
        content.image = req.body.image ? req.body.image : content.image;
        content.author = req.body.author ? req.body.author : content.author;
        content.section_id = req.body.section_id ? req.body.section_id : content.section_id;

        await changeContent(content);

        return res.json({"status": "success", "details": content});
}));





module.exports = router;