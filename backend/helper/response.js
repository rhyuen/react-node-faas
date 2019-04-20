exports.sendJSON = (req, res, status = 200, data, message) => {
    res.setStatus = status;
    res.setHeader("Content-Type", "application/json");
    const payload = {
        data,
        message
    };
    res.end(JSON.stringify(payload));
};

exports.sendError = (req, res, status, errorObject) => {
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