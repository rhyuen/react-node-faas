const db = require("./db/index.js");
const cookie = require("./helper/cookie.js");
const validator = require("validator");
const bcrypt = require("bcrypt");
const {
    json
} = require("micro");

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

        const statement = `select user_id, password from users where email = $1`;
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

        cookie.setCookie(req, res, "user_id", rows[0].user_id);

        res.setStatus = 200;

        const payload = {
            message: "You've successfully logged in."
        };
        res.end(JSON.stringify(payload));

    } catch (e) {
        console.log(e);
        const errorPayload = {
            error: true,
            trace: e.stack,
            details: e.message
        };
        res.statusCode = 400;
        res.end(JSON.stringify(errorPayload));
    }
};