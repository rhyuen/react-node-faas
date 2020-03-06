const db = require("./db/index.js");
const validator = require("validator");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const {
    json
} = require("micro");

module.exports = async (req, res) => {
    try {
        const {
            email,
            password
        } = await json(req);

        if (!validator.isEmail(email)) {
            throw new Error("Not a valid email address.");
        }

        if (!password) {
            throw new Error("no password was sent.");
        }

        const saltRounds = 10;
        const insert = `insert into public.users (user_id, email, password) values ($1, $2, $3) returning *`;
        const hash = await bcrypt.hash(password, saltRounds);
        // const makeUsersTable = `create table if not exists users (
        //     user_id uuid not null primary key,
        //     email text unique not null,
        //     password text not null        
        // )`;
        // await db.query(makeUsersTable, []);
        const {
            rows
        } = await db.query(insert, [uuid.v4(), email, hash]);

        const makeFirstAccount = `insert into 
            public.accounts (account_id, user_id, account_name, type) 
            values ($1, $2, $3, 'savings') returning *`;

        const acctsResult = await db.query(makeFirstAccount,
            [uuid.v4(), rows[0].user_id, 'Your First Account']
        );

        console.log(acctsResult.rows[0].account_id);

        const payload = {
            message: "Sign-up success."
        };
        res.statusCode = 200;
        res.end(JSON.stringify(payload));
    } catch (e) {
        const payload = {
            error: true,
            details: e.message,
            stack: e.stack
        };
        res.end(JSON.stringify(payload));
    }
};