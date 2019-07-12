const db = require("./db/index.js");
const respond = require("./helper/response.js");
const {
    json
} = require("micro");
const uuid = require("uuid");
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
            user_id,
            accounts
        } = decodedToken;

        const {
            type,
            amount,
            transferTarget,
            origin
        } = await json(req);

        const listOfAccounts = new Set(accounts);
        if (!listOfAccounts.has(origin)) {
            console.log(`${origin} is not in the accounts in the token.`);
            return respond.sendJSON(req, res, 400, "Source Acct is not in the Token.");
        }

        const typesOfTransactions = new Set("withdrawl", "deposit", "transfer");
        if (!typesOfTransactions.has(type)) {
            console.log(`${type} is valid as a transaction type.`);
            return respond.sendJSON(req, res, 400, "Invalid Transaction Type in POST.");
        }

        let depositAcct = "00000000-0000-0000-0000-000000000002";
        let withdrawlAcct = "00000000-0000-0000-0000-000000000001";
        let designatedFinalTarget = depositAcct;
        if (type === "deposit") {
            designatedFinalTarget = depositAcct;
        } else if (type === "withdrawl") {
            designatedFinalTarget = withdrawlAcct;
        } else {
            designatedFinalTarget = transferTarget
        }


        const createTransaction = `insert into 
            transactions (transaction_id, sender_id, receiver_id, type, amount)
            values ($1, $2, $3, $4, $5)
            returning *
        `;

        const {
            rows
        } = await db.query(createTransaction, [
            uuid.v4(), origin, designatedFinalTarget, type, amount
        ]);

        respond.sendJSON(req, res, 200, rows, "CreateTransaction Endpoint Result");
    } catch (e) {
        console.log(e);
        respond.sendError(req, res, 500, e);
    }

}