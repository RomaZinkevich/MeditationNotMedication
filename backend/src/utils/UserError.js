class UserError extends Error {
    constructor(type, details) {
      super(details);
      this.name = 'UserError';
      this.type = type;
      this.details = details;
    }
  }
  
module.exports = UserError;