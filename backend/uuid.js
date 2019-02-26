const uuid = require("uuid");

module.exports = async (req, res) => {
    try {
        const payload = {
            uuid: uuid.v4()
        };
        res.end(JSON.stringify(payload));
    } catch (e) {
        res.end(JSON.stringify({
            error: e,
            description: e.message
        }));
    }
}