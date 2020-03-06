const db = require("./db/index.js");
const cookie = require("./helper/cookie.js");

module.exports = async (req, res) => {
    try {
        const user_id = cookie.getCookies(req, res, "user_id");

        const selfQuery = `select * from users where user_id = $1`;
        const {
            rows
        } = await db.query(selfQuery, [user_id]);
        res.setStatus = 200;
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