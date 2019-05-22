const {
    json
} = require("micro");


module.exports = async (req, res) => {
    const {
        accountName,
        accountType
    } = await json(req);
    console.log(accountName);
    console.log(accountType);
    const payload = {
        name: accountName,
        type: accountType
    };
    res.end(JSON.stringify(payload));
};