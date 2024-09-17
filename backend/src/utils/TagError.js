class TagError extends Error {
    constructor(type, details) {
        super(details);
        this.name = TagError;
        this.type = type;
        this.details = details;
    }
}

module.exports = TagError;