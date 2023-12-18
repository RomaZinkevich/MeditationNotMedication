class PasswordError extends Error {
    constructor(type, details) {
      super(details);
      this.name = 'PasswordError';
      this.type = type;
      this.details = details;
    }
  }
  
module.exports = PasswordError;