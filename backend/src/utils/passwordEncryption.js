const bcrypt = require('bcrypt');

const encrypt = (plaintextPassword) => {
    return bcrypt.hash(plaintextPassword, 10);
}

const compare = async (password, encryptedPassword) => {
    let result = false;
    try {
        result = await bcrypt.compare(password, encryptedPassword);
    } catch(error) {
        console.log(error);
    }
    return result;
}

module.exports = {
    encrypt: encrypt,
    compare: compare
};