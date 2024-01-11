const pool = require("./dbconfig");
const ContentError = require('../utils/ContentError');

//@desc Gets one Content by id
const getContent = async (id) => {
    const query = `SELECT content_id, Content.section_id, content_name, description, author, section_name, audio, image FROM Content LEFT JOIN Section ON Content.section_id = Section.section_id WHERE content_id=${id};`;
    try {
        let result = await pool.query(query);
        if (result.rowCount === 0)
            throw new ContentError("ContentDatabaseError", "Content ID Not Found");
        return result;
    } catch (error) {
        throw new ContentError("ContentDatabaseError", error.details ? error.details : "Unexpected database error");
    }
};

//@desc Changes one Content by id
const changeContent = async (content) => {
    const query = "UPDATE \"content\" SET content_name=$1, section_id=$2, audio=$3, image=$4, description=$5, author=$6 WHERE content_id=$7;";
    try {
        let result = await pool.query(query, [content.content_name, content.section_id, content.audio, content.image, content.description, content.author, content.content_id]);
        if (result.rowCount === 0)
            throw new ContentError("ContentDatabaseError", "Content ID Not Found");
        return result;
    } catch (error) {
        throw new ContentError("ContentDatabaseError", error.details ? error.details : "Unexpected database error");
    }
};

module.exports = {
    getContent: getContent,
    changeContent: changeContent
};


