const bcrypt = require('bcrypt');

const encrypt = (plaintextPassword) => {
    return bcrypt.hash(plaintextPassword, 10);
}

const compare = async (password, encryptedPassword) => {
    let result;
    try {
        result = await bcrypt.compare(password, encryptedPassword);
    } catch(error) {
        result = false;
    }
    return result;
}

module.exports = {
    encrypt: encrypt,
    compare: compare
};