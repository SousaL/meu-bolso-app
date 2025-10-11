const { error } = require("winston");


const errorHandler = (err, req, res, next) => {
    let { statusCode, message} = err;

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        stack: err.stack
    }
    
    logger.error(err);

    res.status(statusCode).send(reponse);
}

module.exports = {
    errorHandler
}