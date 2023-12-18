const PasswordError = require('../utils/PasswordError');
const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

const validatePassword = (req, res, next) => {
  const password = req.body.password;
  if (!password || password.length < 8) {
    return next(new PasswordError('PasswordValidationError', 'Password must be at least 8 characters'));
  }
  if (!specialCharacterRegex.test(password)) {
    return next(new PasswordError('PasswordValidationError', 'Password must contain at least one special character'));
  }
  next();
};

module.exports = validatePassword;
