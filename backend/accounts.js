const db = require("./db/index.js");
const respond = require("./helper/response.js");
const cookie = require("./helper/cookie.js");
const {
    promisify
} = require("util");
const jwt = require("jsonwebtoken");
const jwtVerify = promisify(jwt.verify);

module.exports = async (req, res) => {
    try {
        const authToken = cookie.getCookies(req, res, "auth_token");
        const decodedToken = await jwtVerify(authToken, "Secret");
        const {
            user_id
        } = decodedToken;

        const getAccounts = `select * from accounts where user_id = $1`;
        const {
            rows
        } = await db.query(getAccounts, [user_id]);

        const payload = {
            user: user_id,
            data: rows
        };
        respond.sendJSON(req, res, 200, payload, "from accounts ep");
    } catch (e) {
        console.log(e);
        respond.sendError(req, res, 500, e);
    }

}