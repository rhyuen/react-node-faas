const db = require("./db/index.js");

module.exports = async (req, res) => {
    try {
        const statement = await db.query("SELECT NOW()", []);
        const payload = {
            rows: statement.rows
        };
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