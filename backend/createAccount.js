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

        //TODO: MAY13 Add redirect if invalid JWT
        console.log("we're here! in the creataccounts endpoint");

        const authToken = cookie.getCookies(req, res, "auth_token");
        const decodedToken = await jwtVerify(authToken, "Secret");
        const {
            user_id
        } = decodedToken;

        const createAccount = `insert into 
            accounts (account_id, user_id, account_name, type)
            values ($1, $2, $3, $4)
            returning *
        `;

        const {
            accountname,
            accounttype
        } = await json(req);

        console.log(`account name: ${accountname}`);
        console.log(`account type: ${accounttype}`);

        const {
            rows
        } = await db.query(createAccount,
            [uuid.v4(), user_id, accountname, accounttype]
        );
        console.log(rows);

        respond.sendJSON(req, res, 200, rows, "new account result");
    } catch (e) {
        console.log(e);
        respond.sendError(req, res, 500, e);
    }

}