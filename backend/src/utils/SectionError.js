class SectionError extends Error {
    constructor(type, details) {
      super(details);
      this.name = 'SectionError';
      this.type = type;
      this.details = details;
    }
  }
  
module.exports = SectionError;