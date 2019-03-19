const db = require("./db/index.js");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Cookies = require("cookies");
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

        const statement = `select password from users where email = $1`;
        const result = await db.query(statement, [email]);
        if (result.rows.length === 0) {
            throw new Error("Username not found.");
        }

        console.log(result.rows);

        const isValidPassword = await bcrypt.compare(password, result.rows[0].password);
        if (!isValidPassword) {
            throw new Error("Username and/or password don't match.");
        }

        const key = ["A Signing key"];
        const cookies = new Cookies(req, res, {
            keys: key
        });
        const options = {
            signed: true,
            secure: false,
            httpOnly: true,
            path: "/",
            maxAge: 3000000
        };

        cookies.set("email", email, options);

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