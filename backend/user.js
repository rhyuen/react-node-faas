const db = require("./db/index.js");
const Cookies = require("cookies");

module.exports = async (req, res) => {
    try {
        const key = ["A Signing key"];
        const cookies = new Cookies(req, res, {
            keys: key
        });
        const userEmail = cookies.get("email");

        const selfQuery = `select * from users where email = $1`;
        const {
            rows
        } = await db.query(selfQuery, [userEmail]);
        res.setStatus = 200;
        // res.setHeader("Content-Type", "application/json");
        const payload = {
            data: rows
        };
        res.end(JSON.stringify(payload));
    } catch (e) {
        const errorPayload = {
            error: true,
            trace: e.stack,
            details: e.message
        };
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 400;
        res.end(JSON.stringify(errorPayload));
    }
};