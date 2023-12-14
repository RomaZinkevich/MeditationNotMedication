const pool = require("./dbconfig")

//@desc Creates new user in database
const createUser = async (name, email, image) => {
    const query = `INSERT INTO "user" (user_name, email, image) VALUES ('${name}', '${email}', '${image}');`;
    try {
        const results = await pool.query(query);
        return {"status":"success"};
    } catch (error) {
        return error;
    }
};

module.exports = {
    createUser: createUser
};



