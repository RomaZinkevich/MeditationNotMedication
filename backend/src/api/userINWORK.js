const pool = require("../db/dbconfig")

const checkUser = async (id) => {
    const query = `SELECT * FROM "User" WHERE user_id='${id}'`;
    try {
        const result = await pool.query(query);
        const finresult = result.rows;
        if (finresult.length === 0 ){
            return false;
        }
        return finresult[0];
    } catch (err) {
        console.error(err);
        return err;
    }      
};

const createUser = async (profile) => {
    const fullname = profile.name.givenName + " " + profile.name.familyName;
    const query = `INSERT INTO "User" (user_id, user_name, email, image) VALUES (${profile.id}, '${fullname}', '${profile.emails[0].value}', '${profile.photos[0].value}');`;
    try {
        await pool.query(query);
        const finresult = {"user_id":profile.id, "user_name":fullname, "email":profile.emails[0].value, "image":profile.photos[0].value};
        return finresult;
    } catch (err) {
        console.error(err);
        return err;
    } 
};

module.exports = {
    checkUser: checkUser,
    createUser: createUser
};
