const db = require("./db/index.js");
const Cookies = require("cookies");
const {
    json
} = require("micro");

module.exports = async (req, res) => {
    try {
        const key = ["A Signing key"];
        const cookies = new Cookies(req, res, {
            keys: key
        });

        cookies.set("email", {
            expires: new Date('August 19, 2000 22:00:31')
        });

        res.setStatus = 200;
        res.setHeader("Content-Type", "application/json");
        const payload = {
            message: "Logging out."
        };
        res.end(JSON.stringify(payload));
    } catch (e) {
        const errorPayload = {
            error: true,
            trace: e.stack,
            details: e.message
        };
        res.statusCode = 400;
        res.end(JSON.stringify(errorPayload));
    }
};