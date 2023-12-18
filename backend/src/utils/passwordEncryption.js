const bcrypt = require('bcrypt');

const encrypt = (plaintextPassword) => {
    return bcrypt.hash(plaintextPassword, 10);
}

module.exports = encrypt;