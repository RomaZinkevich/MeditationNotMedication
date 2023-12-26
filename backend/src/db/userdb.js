const pool = require("./dbconfig")
const UserError = require('../utils/UserError');
const { encrypt, compare } = require("../utils/passwordEncryption");

//@desc Creates new user in database
const createUser = async (newUser) => {
    newUser.password = await encrypt(newUser.password);
    const query = `INSERT INTO "user" (user_name, email, password) VALUES ($1, $2, $3) RETURNING *;`;
    try {
        const result = await pool.query(query, [newUser.name, newUser.email, newUser.password]);
        return result.rows[0];
    } catch (error) {
        if (error.message === "duplicate key value violates unique constraint \"email\"")
            throw new UserError("EmailValidationError", "Email already exists");
        throw new UserError("UserDatabaseError", "Unexpected database error");
    }
};

//@desc Logs in user
const loginUser = async (user) => {
    const query = `SELECT user_id, user_name AS name, password AS encryptedpassword, image  FROM "user" WHERE email = $1`;
    try {
        const results = await pool.query(query, [user.email]);

        if (results.rowCount === 0) 
            throw new UserError("AuthenticationError", "Email doesn't exist");

        const { user_id, name, encryptedpassword, image } = results.rows[0]; 
        const isPasswordValid = await compare(user.password, encryptedpassword)

        if (isPasswordValid) 
            return { "name": name, "image": image, "user_id": user_id  };
        throw new UserError("AuthenticationError", "Wrong or no password");
    } catch (error) {
        throw new UserError("AuthenticationError", error.details ? error.details : "Unexpected database error");
    }
};

//@desc Change user's data

//FIX: IF QUERY RETURNS EMPTY STILL SUCCESS
const changeUser = async (updatedUser, user) => {
    updatedUser.password = await encrypt(updatedUser.password);
    const query = `UPDATE "user" SET user_name=$1, email=$2, image=$3, password=$4 WHERE user_id=$5`;
    try {
        await pool.query(query, [updatedUser.name, updatedUser.email, updatedUser.image, updatedUser.password, user.id]);
    } catch (error) {
        console.log(error)
        throw new UserError("UserDatabaseError", error.details ? error.details : "Unexpected database error");
    }
};

//@desc Clears database
const clearUsers = async () => {
    const query = `DELETE FROM "user";`;
    try {
        await pool.query(query);
    } catch (error) {
        console.log(error);
        throw new UserError("UserDatabaseError", "Unexpected database error");
    }
};

module.exports = {
    createUser: createUser,
    changeUser: changeUser,
    loginUser: loginUser,
    clearUsers: clearUsers
};

