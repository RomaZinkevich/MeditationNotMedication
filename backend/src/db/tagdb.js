const pool = require("./dbconfig");
const TagError = require('../utils/TagError');

//@desc Gets all Tags from database
const getAllTags = async () => {
    const query = `SELECT * FROM tags;`;
    try {
        return await pool.query(query);
    } catch (error) {
        throw new TagError("TagDatabaseError", "Unexpected database error");
    }
};

//@desc Gets one Tag from database
const getTag = async (tag_id) => {
    const query = `SELECT * FROM tags WHERE tag_id=${tag_id};`;
    try {
        return await pool.query(query);
    } catch (error) {
        throw new TagError("TagDatabaseError", "Unexpected database error");
    }
};

//@desc Gets all tag's content
const getTagsContent = async (tag_id) => {
    const query = `SELECT c.content_id, c.content_name, c.image, c.description FROM content c JOIN contenttags ct ON c.content_id = ct.content_id WHERE ct.tag_id = ${tag_id};`;
    try {
        return await pool.query(query);
    } catch (error) {
        console.log(error)
        throw new TagError("ContentTagsDatabaseError", "Unexpected database error");
    }
};

module.exports = {
    getAllTags: getAllTags,
    getTag: getTag,
    getTagsContent: getTagsContent
};


