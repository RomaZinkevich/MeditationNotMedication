const pool = require("./dbconfig")

//@desc Creates new user in database
const createUser = async (newUser) => {
    const query = `INSERT INTO "user" (user_name, email, image) VALUES ('${newUser.name}', '${newUser.email}', '${newUser.image}');`;
    try {
        await pool.query(query);
    } catch (error) {
        throw new Error(error);
    }
};

//@desc Clears database
const clearUsers = async () => {
    const query = `DELETE FROM "user";`;
    try {
        await pool.query(query);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    createUser: createUser,
    clearUsers: clearUsers
};



