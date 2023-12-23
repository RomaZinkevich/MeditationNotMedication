const pool = require("./dbconfig")
const UserError = require('../utils/UserError');
const { encrypt, compare } = require("../utils/passwordEncryption");

//@desc Creates new user in database
const createUser = async (newUser) => {
    newUser.password = await encrypt(newUser.password);
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
    const query = `SELECT user_name AS name, password AS encryptedpassword, image  FROM "user" WHERE email = '${user.email}'`;
    try {
        const results = await pool.query(query);

        if (results.rowCount === 0) 
            throw new UserError("UserError", "Email doesn't exist")

        const { name, encryptedpassword, image } = results.rows[0]; 
        const isPasswordValid = await compare(user.password, encryptedpassword)

        if (isPasswordValid) 
            return { "name": name, "image": image  };
        throw new UserError("UserError", "Wrong or no password");
    } catch (error) {
        throw new UserError("UserError", error.details ? error.details : "Unexpected database error");
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

