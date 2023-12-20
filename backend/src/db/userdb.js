const pool = require("./dbconfig")
const UserError = require('../utils/UserError');

//@desc Creates new user in database
const createUser = async (newUser) => {
    const query = `INSERT INTO "user" (user_name, email, password) VALUES ('${newUser.name}', '${newUser.email}', '${newUser.password}');`;
    pool.query(query, (error, result) => {
        if (error) {
            if (error.message === "duplicate key value violates unique constraint \"email\"")
                throw new UserError("EmailValidationError", "Email already exists");
            throw new UserError("UserError", "Unexpected database error");
        }
        else 
            return result;
    });
};

//@desc Clears database
const clearUsers = async () => {
    const query = `DELETE FROM "user";`;
    pool.query(query, (result, error) => {
        if (error)
            throw new UserError("UserError", "Unexpected database error");
        else
            return result;
    });
};

module.exports = {
    createUser: createUser,
    clearUsers: clearUsers
};


