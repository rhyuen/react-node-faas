const jwt = require("jsonwebtoken");
const {
    promisify
} = require("util");
const cookie = require("./cookie.js");
const jwtVerify = promisify(jwt.verify);

async function getProperty(req, res, name) {
    const result = await isValidToken(req, res);
    console.log(result);
    return result.name;
}

async function isValidToken(req, res) {
    try {
        const authToken = cookie.getCookies(req, res, "auth_token");
        const decodedToken = await jwtVerify(authToken, "Secret");
        Promise.resolve(decodedToken);
    } catch (e) {
        console.log("Invalid Token : %s", e);
        Promise.reject(new Error("Couldn't verify the token with the given secret."));
    }

}

module.exports = {
    getProperty
};