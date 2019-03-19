exports.respondWithJSON = async (req, res, status = 200, message) => {

    res.setStatus = status;
    const payload = {
        message
    };
    res.end(JSON.stringify(payload));
};

exports.respondWithError = async (req, res, status, errorObject) => {
    const {
        NODE_ENV
    } = process.env;

    let errorPayload = {
        error: true
    };
    if (NODE_ENV === "production") {
        Object.assign(errorPayload, {
            message: "These are unimportant user messages. Wink.",
            trace: errorObject.stack,
            details: errorObject.message
        });
    } else {
        Object.assign(errorPayload, {
            trace: errorObject.stack,
            details: errorObject.message
        });
    }
    res.statusCode = status;
    res.end(JSON.stringify(errorPayload));

};