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
const jwtSign = promisify(jwt.sign);

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

        if (accountname === "") {
            return respond.sendJSON(req, res, 500, [], "You must have a title for your account name.");
        }

        console.log(`account name: ${accountname}`);
        console.log(`account type: ${accounttype}`);

        const {
            rows
        } = await db.query(createAccount,
            [uuid.v4(), user_id, accountname, accounttype]
        );

        const getDetailsForToken = `
            select users.user_id, accounts.account_id 
            from users 
            inner join accounts 
            on (users.user_id = accounts.user_id) 
            where users.user_id = $1
        `;

        const rowsForToken = await db.query(getDetailsForToken, [rows[0].user_id]);
        const accountsForToken = rowsForToken.rows.map(row => row.account_id);
        const tokenPayload = {
            user_id: rowsForToken.rows[0].user_id,
            accounts: accountsForToken
        };
        const signedToken = await jwtSign(tokenPayload, "Secret", {
            algorithm: "HS256"
        });

        console.log(signedToken);

        cookie.setCookie(req, res, "auth_token", signedToken);
        console.log(rows);

        respond.sendJSON(req, res, 200, rows, "new account result");
    } catch (e) {
        console.log(e);
        respond.sendError(req, res, 500, e);
    }

}