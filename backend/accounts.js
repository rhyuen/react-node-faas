const db = require("./db/index.js");
const respond = require("./helper/response.js");
const cookie = require("./helper/cookie.js");

module.exports = async (req, res) => {
    try {
        const user_id = cookie.getCookies(req, res, "user_id");
        console.log(user_id)
        const getAccounts = `select * from accounts where user_id = $1`;
        const {
            rows
        } = await db.query(getAccounts, [user_id]);
        console.log(rows);
        const payload = {
            user: user_id,
            data: rows
        };
        respond.sendJSON(req, res, 200, payload, "your accounts");
    } catch (e) {
        console.log(e);
        respond.sendError(req, res, 500, e);
    }

}