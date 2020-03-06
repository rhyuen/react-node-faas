const db = require("./db/index.js");
const cookie = require("./helper/cookie.js");
const jwt = require("jsonwebtoken");
const {
    promisify
} = require("util");
const {
    sendJSON,
    sendError
} = require("./helper/response.js");
const validator = require("validator");
const bcrypt = require("bcrypt");
const {
    json
} = require("micro");

const jwtSign = promisify(jwt.sign);

module.exports = async (req, res) => {
    try {
        const {
            email,
            password
        } = await json(req);

        if (!email) {
            throw new Error("You're missing the password.");
        }

        if (!password) {
            throw new Error("There's no password.");
        }

        if (!validator.isEmail(email)) {
            throw new Error("Invalid email address");
        }

        const statement = `
            select user_id, password 
            from users 
            where email = $1
        `;

        const {
            rows
        } = await db.query(statement, [email]);
        if (rows.length === 0) {
            throw new Error("Username not found.");
        }

        console.log(rows);

        const isValidPassword = await bcrypt.compare(password, rows[0].password);
        if (!isValidPassword) {
            throw new Error("Username and/or password don't match.");
        }

        const getDetailsForToken = `
            select users.user_id, accounts.account_id 
            from users 
            inner join accounts 
            on (users.user_id = accounts.user_id) 
            where users.user_id = $1
        `;
        const rowsForToken = await db.query(getDetailsForToken, [rows[0].user_id]);
        const accountsForToken = rowsForToken.rows.map(row => row.account_id);

        //TODO: Hyp: case where no accounts bound to new user causes failure.
        console.log(rowsForToken);

        const tokenPayload = {
            user_id: rowsForToken.rows[0].user_id,
            accounts: accountsForToken
        };
        const signedToken = await jwtSign(tokenPayload, "Secret", {
            algorithm: "HS256"
        });

        console.log(signedToken);

        cookie.setCookie(req, res, "auth_token", signedToken);

        const payloadMessage = `Logged in at ${new Date().toLocaleString()}`;
        sendJSON(req, res, 200, payloadMessage, "Sign in Success.");

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