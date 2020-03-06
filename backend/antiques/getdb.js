const db = require("./db/index.js");
const {
    json
} = require("micro");

module.exports = async (req, res) => {
    try {
        const statement = `select * from users`;
        const result = db.query(statement, []);

        const payload = {
            result: result,
            data: result.rows
        };
        res.end(JSON.stringify(payload));
    } catch (e) {
        const payload = {
            path: req.path,
            error: e.message
        };
        res.statusCode = 400;
        res.end(JSON.stringify(payload));
    }
};