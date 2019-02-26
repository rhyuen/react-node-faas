const db = require("./backend/db/index.js");
const uuid = require("uuid");

//env var needs to be local.

(async () => {
    try {
        const pool = await db.getClient();
        const client = await pool.connect();
        const makeUsersTable = `create table users (
        user_id uuid not null primary key,
        email text unique not null,
        password text not null        
    )`;
        await client.query(makeUsersTable);
        client.end();
    } catch (e) {
        console.log(e)
    }
})();