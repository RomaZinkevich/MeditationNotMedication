const errorHandler = (error, req, res, next) => {
    if (error.name === "ValidationError") {
        return res.status(400).send({
            type: "ValidationError",
            details: error.details
        });
    }
    else if (error.type === "UserError" || error.type === "SectionError"){
        return res.status(400).send({
            type: error.type,
            details: error.details
        });
    }
    return res.status(400).send({
        type: "Unexpected error",
        details: error.message
    });
}

module.exports = errorHandler;