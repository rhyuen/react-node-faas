const respond = require("./helper/response.js");
const db = require("./db/index.js");
const cookie = require("./helper/cookie.js");
const {
    promisify
} = require("util");
const jwt = require("jsonwebtoken");
const jwtVerify = promisify(jwt.verify);
const url = require("url");


module.exports = async (req, res) => {
    try {
        const authToken = cookie.getCookies(req, res, "auth_token");
        const decodedToken = await jwtVerify(authToken, "Secret");
        const {
            accounts
        } = decodedToken;
        const listOfAccounts = new Set(accounts);

        const parsedQueryParam = url.parse(req.url, true).query.account_id;

        if (!listOfAccounts.has(parsedQueryParam)) {
            return respond.sendJSON(req, res, "account_id not there", "getSingleAccountDetails EP")
        }

        //TODO: NEED Account Type from query.  Need to clarify values needed out of query.
        const query = `select * 
            from accounts, transactions            
            where accounts.account_id = $1 and 
            (accounts.account_id = transactions.sender_id or accounts.account_id = transactions.receiver_id)            
        `;

        const {
            rows
        } = await db.query(query, [parsedQueryParam]);
        console.log(rows);

        respond.sendJSON(req, res, 200, rows, "getSingleAccountDetails EP");
    } catch (e) {
        console.log(e);
        respond.sendError(req, res, "errored out");
    }
}