const db = require("./db/index.js");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Cookies = require("cookies");
const {
    json
} = require("micro");

module.exports = async (req, res) => {
    try {
        res.setStatus = 200;
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