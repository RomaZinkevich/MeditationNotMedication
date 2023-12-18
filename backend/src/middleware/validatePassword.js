const UserError = require('../utils/UserError');
const hasSpecialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
const hasNumberRegex = /[0123456789]/;
const hasUppercaseRegex = /[A-Z]/;
const hasLowercaseRegex = /[a-z]/;

const validatePassword = (req, res, next) => {
  const password = req.body.password;
  const hasUppercase = hasUppercaseRegex.test(password);
  const hasLowercase = hasLowercaseRegex.test(password);
  const hasNumber = hasNumberRegex.test(password);
  const hasSpecialCharacter = hasSpecialCharacterRegex.test(password);
  
  if (!password || password.length < 8) {
    return next(new UserError('PasswordValidationError', 'Password must be at least 8 characters'));
  }
  if (!(hasLowercase && hasUppercase && hasNumber && hasSpecialCharacter)) {
    return next(new UserError('PasswordValidationError', 'Password must contain at least one uppercase letter, one lowercase letter, one special character and one number'));
  }
  next();
};

module.exports = validatePassword;
