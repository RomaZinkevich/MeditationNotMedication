const errorHandler = (error, req, res, next) => {
    console.log(error);
    if (error.name === "ValidationError") {
        return res.status(400).send({
            type: "ValidationError",
            details: error.details
        });
    }
    else if (error.message === "error: duplicate key value violates unique constraint \"email\""){
        return res.status(400).send({
            type: "Email not unique",
            details: error.message
        });
    }
    else if (error.type === "PasswordValidationError"){
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