exports.sendJSON = (req, res, status = 200, data, message = "No message added.") => {
    res.setStatus = status;
    res.setHeader("Content-Type", "application/json");
    const payload = {
        data: data,
        message: message
    };
    return res.end(JSON.stringify(payload));
};

exports.sendError = (req, res, status, errorObject) => {
    const {
        NODE_ENV
    } = process.env;

    //TODO: MAY27/19 ADD request path and/or url to error payload
    let errorPayload = {
        time: new Date().toLocaleString(),
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
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(errorPayload));
};