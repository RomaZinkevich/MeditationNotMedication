const errorHandler = (error, req, res, next) => {
    if (error.name === "ValidationError") {
        return res.status(400).send({
            type: "ValidationError",
            details: error.details
        });
    }
    else if (error.name === "UserError" || error.name === "SectionError" || error.name === "ContentError"){
        return res.status(400).send({
            type: error.type,
            details: error.details
        });
    }

    console.log(error)
    return res.status(400).send({
        type: "Unexpected error",
        details: error.message
    });
}

module.exports = errorHandler;