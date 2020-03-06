const respond = require("./helper/response.js");
const db = require("./db/index.js");
const cookie = require("./helper/cookie.js");
const {
  promisify
} = require("util");
const jwt = require("jsonwebtoken");
const jwtVerify = promisify(jwt.verify);
const url = require("url");

module.exports = async (req, res) => {
  try {

    const authToken = cookie.getCookies(req, res, "auth_token");
    const decodedToken = await jwtVerify(authToken, "Secret");
    const {
      accounts
    } = decodedToken;
    const listOfAccounts = new Set(accounts);

    const parsedQueryParam = url.parse(req.url, true).query.account_id;
    console.log(parsedQueryParam);

    if (!listOfAccounts.has(parsedQueryParam)) {
      console.log(`${parsedQueryParam} : Account is not in the cookie.`);
      return respond.sendJSON(
        req,
        res,
        "This account doesn't exist",
        "getSingleAccountGeneralDetails EP"
      );
    }

    const query = `select a.account_id, a.account_name, a.created_at, a.last_modified, a.balance, a.type
      from accounts a
      where a.account_id = $1;            
    `;

    const {
      rows
    } = await db.query(query, [parsedQueryParam]);
    console.log(rows);

    respond.sendJSON(req, res, 200, rows, "getSingleAccountGeneralDetails Endpoint");
  } catch (e) {
    console.log(e);
    respond.sendError(req, res, "errored out");
  }
};