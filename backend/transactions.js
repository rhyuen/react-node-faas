const db = require("./db/index.js");
const {
    getCookies
} = require("./helper/cookie.js");
const jwt = require("jsonwebtoken");
const {
    sendJSON,
    sendError
} = require("./helper/response.js");
const {
    promisify
} = require("util");
const jwtVerify = promisify(jwt.verify);


module.exports = async (req, res) => {
    try {
        let getTransactions = `
            select * 
            from accounts, transactions
            where accounts.user_id = $1 
                and (accounts.account_id = transactions.sender_id or accounts.account_id = transactions.receiver_id)
        `;

        const authToken = getCookies(req, res, "auth_token");
        const decodedToken = await jwtVerify(authToken, "Secret");
        const {
            user_id
        } = decodedToken;

        const {
            rows
        } = await db.query(getTransactions, [user_id]);
        console.log(rows);
        //db.getClient().end();
        sendJSON(req, res, 200, rows, "transactions response");
    } catch (e) {
        console.log(e);
        sendError(req, res, 500, e);
    }
}