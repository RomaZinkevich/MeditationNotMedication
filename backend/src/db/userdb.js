const pool = require("./dbconfig")
const UserError = require('../utils/UserError');

//@desc Creates new user in database
const createUser = async (newUser) => {
    const query = `INSERT INTO "user" (user_name, email, password) VALUES ('${newUser.name}', '${newUser.email}', '${newUser.password}');`;
    try {
        await pool.query(query);
    } catch (error) {
        if (error.message === "duplicate key value violates unique constraint \"email\"")
            throw new UserError("EmailValidationError", "Email already exists");
        console.log(error)
        throw new UserError("UserError", "Unexpected database error");
    }
};

//@desc Clears database
const clearUsers = async () => {
    const query = `DELETE FROM "user";`;
    try {
        await pool.query(query);
    } catch (error) {
        console.log(error);
        throw new UserError("UserError", "Unexpected database error");
    }
};

module.exports = {
    createUser: createUser,
    clearUsers: clearUsers
};

