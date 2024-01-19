const express = require("express");
const router = express.Router();
const { getContent, changeContent, createContent } = require("../db/contentdb");
const { getSectionByName, createSection } = require("../db/sectiondb");
const { checkToken, adminToken } = require("../middleware/auth");
const { tryCatch } = require("../utils/tryCatch");

// @desc Changes content item
// @route PUT /api/contents/admin/:id
// @access Private (Admin)
router.put("/:id", checkToken, adminToken,
    tryCatch(async (req, res, next) => {
        const content = await getContent(req.params.id);

        content.content_name = req.body.content_name ? req.body.content_name : content.content_name;
        content.description = req.body.description ? req.body.description : content.description;
        content.audio = req.body.audio ? req.body.audio : content.audio;
        content.image = req.body.image ? req.body.image : content.image;
        content.author = req.body.author ? req.body.author : content.author;
        content.section_id = req.body.section_id ? req.body.section_id : content.section_id;

        await changeContent(content);

        return res.json({"status": "success", "details": content});
}));

// @desc Adds new item to Content table
// @route POST /api/contents/admin
// @access Private (Admin)
router.post("/", checkToken, adminToken,
    tryCatch(async (req, res, next) => {
        let section_id = await getSectionByName(req.body.section_name);
        console.log(section_id)
        if (!section_id) {
            section_id = await createSection(req.body.section_name);
        }
        console.log(section_id)
        const content = {
            "content_name": req.body.content_name,
            "description": req.body.description,
            "audio": req.body.audio,
            "image": req.body.image,
            "author": req.body.author,
            "section_id": section_id
        };
        const result = await createContent(content);
        console.log(result)
        return res.json({"status": "success", "details": result});
}));




module.exports = router;