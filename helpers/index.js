const formatJoiError = (errorObject) => {
    const errors = {};

    (errorObject.details && Array.isArray(errorObject.details) && errorObject.details.length) && errorObject.details.forEach(errorDetail => {
        const error = Object.keys(errorDetail);
        const {message, context} = error.length && (errorDetail);
        errors[context.key] = message.replace(/^("[a-zA-Z_]+")*/g, context.key);
    });
    return errors;
}

module.exports = {formatJoiError};