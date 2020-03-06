const {
    Client
} = require("pg");

module.exports = async (req, res) => {
    try {
        const {
            pg_user_faas,
            pg_host_faas,
            pg_dbname_faas,
            pg_password_faas
        } = process.env;
        const client = new Client({
            user: pg_user_faas,
            host: pg_host_faas,
            database: pg_dbname_faas,
            password: pg_password_faas,
            port: 5432,
        });
        await client.connect();
        const statement = await client.query('SELECT NOW()');
        client.end();
        const payload = {
            rows: statement.rows
        }
        res.end(JSON.stringify(payload));
    } catch (e) {
        const payload = {
            error: true,
            details: e,
            stack: e.stack
        };
        res.end(JSON.stringify(payload));
    }
};