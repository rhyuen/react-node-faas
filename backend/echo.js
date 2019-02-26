const {
    json
} = require("micro");
const uuid = require("uuid");

module.exports = async (req, res) => {
    try {
        const {
            email,
            password
        } = await json(req);
        const id = uuid.v4()
        const payload = {
            id,
            email,
            password
        };
        res.end(JSON.stringify(payload));
    } catch (e) {
        res.end(JSON.stringify({
            error: e,
            description: e.message
        }));
    }
};