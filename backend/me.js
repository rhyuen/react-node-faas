const db = require("./db/index.js");
const cookie = require("./helper/cookie.js");
const {
    sendJSON,
    sendError
} = require("./helper/response.js");
const {
    promisify
} = require("util");
const jwt = require("jsonwebtoken");
const jwtVerify = promisify(jwt.verify);

module.exports = async (req, res) => {
    try {
        //const user_id = cookie.getCookies(req, res, "user_id");
        const authToken = cookie.getCookies(req, res, "auth_token");
        const decodedToken = await jwtVerify(authToken, "Secret");
        console.dir(decodedToken);

        const selfQuery = `
            select users.email, users.user_id, accounts.account_id, accounts.account_name, accounts.balance, accounts.type 
            from users 
            inner join accounts 
            on (users.user_id = accounts.user_id)
            where users.user_id = $1
        `;

        const {
            rows
        } = await db.query(selfQuery, [decodedToken.user_id]);
        //db.getClient().end();
        const payload = {
            data: rows
        };
        sendJSON(req, res, 200, payload, "Me Route");
    } catch (e) {
        console.log(e);
        const errorPayload = {
            error: true,
            trace: e.stack,
            details: e.message
        };
        sendError(req, res, 500, errorPayload);
    }
};