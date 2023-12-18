const pool = require("./dbconfig")
const UserError = require('../utils/UserError');

//@desc Creates new user in database
const createUser = async (newUser) => {
    const query = `INSERT INTO "user" (user_name, email, image) VALUES ('${newUser.name}', '${newUser.email}', '${newUser.image}');`;
    try {
        await pool.query(query);
    } catch (error) {
        if (error.message === "error: duplicate key value violates unique constraint \"email\"")
            throw new UserError("EmailValidationError", "Email already exists");
        throw new UserError("UserError", "Unexpected database error");
    }
};

//@desc Clears database
const clearUsers = async () => {
    const query = `DELETE FROM "user";`;
    try {
        await pool.query(query);
    } catch (error) {
        throw new UserError("UserError", "Unexpected database error");
    }
};

module.exports = {
    createUser: createUser,
    clearUsers: clearUsers
};



