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
        })
    }
    return res.status(400).json(error.message);
}

module.exports = errorHandler;