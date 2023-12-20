const pool = require("./dbconfig");
const ContentError = require('../utils/ContentError');

//@desc Gets one Content by id
const getContent = async (id) => {
    const query = `SELECT content_id, content_name, description, author, section_name, audio, image FROM Content LEFT JOIN Section ON Content.section_id = Section.section_id WHERE content_id=${id};`;
    const result = await pool.query(query);
    if (result.rowCount === 0)
        throw new ContentError("ContentError", "Content ID Not Found");
    return result;
};

module.exports = {
    getContent: getContent
};



