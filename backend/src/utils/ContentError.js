class ContentError extends Error {
    constructor(type, details) {
      super(details);
      this.name = 'ContentError';
      this.type = type;
      this.details = details;
    }
  }
  
module.exports = ContentError;