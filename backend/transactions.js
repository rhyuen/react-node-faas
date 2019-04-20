const db = require("./db/index.js");
const cookie = require("./helper/cookie.js");


module.exports = async (req, res) => {
    const getTransactions = `select * from transactions where account_id = $1`;
    const user_id = cookie.getCookie(req, res, "account_id");

    const {
        rows
    } = db.query(getTransactions, [user_id]);
    const payload = {
        data: rows
    }
    res.end(JSON.stringify(payload));
}