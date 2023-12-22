const pool = require("./dbconfig")
const UserError = require('../utils/UserError');
const { encrypt, compare } = require("../utils/passwordEncryption");

//@desc Creates new user in database
const createUser = async (newUser) => {
    const query = `INSERT INTO "user" (user_name, email, password) VALUES ('${newUser.name}', '${newUser.email}', '${newUser.password}');`;
    try {
        await pool.query(query);
    } catch (error) {
        if (error.message === "duplicate key value violates unique constraint \"email\"")
            throw new UserError("EmailValidationError", "Email already exists");
        throw new UserError("UserError", "Unexpected database error");
    }
};

//@desc Logs in user
const loginUser = async (user) => {
    const query = `SELECT user_name AS name, password FROM "user" WHERE email = '${user.email}'`;
    try {
        let result = await pool.query(query);
        let { name, password } = result.rows[0]; 
        if (compare(user.password, password)) return {"status":"success","details":{"name": name }};
        return {"status":"failed","details":"wrong password"}
    } catch (error) {
        //More errors to handle 
        console.log(error);
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
    clearUsers: clearUsers,
    loginUser: loginUser
};

