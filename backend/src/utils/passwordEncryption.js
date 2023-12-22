const bcrypt = require('bcrypt');

const encrypt = (plaintextPassword) => {
    return bcrypt.hash(plaintextPassword, 10);
}

const compare = async (password, encryptedPassword) => {
    let result = await bcrypt.compare(password, encryptedPassword);
    return result;
}

module.exports = {
    encrypt: encrypt,
    compare: compare
};