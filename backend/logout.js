const db = require("./db/index.js");
const Cookies = require("cookies");
const {
    sendJSON,
    sendError
} = require("./helper/response.js");
const {
    setCookie
} = require("./helper/cookie.js");
const {
    json
} = require("micro");

module.exports = async (req, res) => {
    try {

        setCookie(req, res, "auth_token", {
            expires: new Date('August 19, 2000 22:00:31')
        });

        sendJSON(req, res, 200, "log out", "Logging out now.");
    } catch (e) {
        const errorPayload = {
            error: true,
            trace: e.stack,
            details: e.message
        };
        sendError(req, res, 500, errorPayload);
    }
};