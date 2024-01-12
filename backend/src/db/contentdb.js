const pool = require("./dbconfig");
const ContentError = require('../utils/ContentError');

//@desc Gets one Content by id
const getContent = async (id) => {
    const query = `SELECT content_id, Content.section_id, content_name, description, author, section_name, audio, image FROM Content LEFT JOIN Section ON Content.section_id = Section.section_id WHERE content_id=${id};`;
    try {
        let result = await pool.query(query);
        if (result.rowCount === 0)
            throw new ContentError("ContentDatabaseError", "Content ID Not Found");
        return result.rows[0];
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

//@desc Clears database
const clearContents = async () => {
    const query = `DELETE FROM "content"; DELETE FROM "section";`;
    try {
        await pool.query(query);
    } catch (error) {
        throw new ContentError("ContentDatabaseError", "Unexpected database error");
    }
};

//@desc Seeds database with mock data
const seedDb = async () => {
    query = `INSERT INTO Section (section_id, section_name) VALUES
        (1, 'Section 1'),
        (2, 'Section 2');

    INSERT INTO Content (content_id, section_id, content_name, description, author, audio, image)
    VALUES
        (1, 1, 'content_1', 'This is the description for content_id 1', 'author 1', 'audio_url_1', 'image_url_1'),
        (2, 1, 'content_2', 'This is the description for content_id 2', 'author 1', 'audio_url_2', 'image_url_2'),
        (3, 2, 'content_3', 'This is the description for content_id 3', 'author 2', 'audio_url_3', 'image_url_3'),
        (4, 2, 'content_4', 'This is the description for content_id 4', 'author 3', 'audio_url_4', 'image_url_4'),
        (5, 2, 'content_5', 'This is the description for content_id 5', 'author 2', 'audio_url_5', 'image_url_5');`;
    try {
        await pool.query(query);
    } catch (error) {
        console.log(error);
        throw new ContentError("ContentDatabaseError", "Unexpected database error");
    }
};

module.exports = {
    getContent: getContent,
    changeContent: changeContent,
    clearContents: clearContents,
    seedDb: seedDb
};


