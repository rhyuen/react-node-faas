const db = require("./db/index.js");
const respond = require("./helper/response.js");
const {
    json
} = require("micro");
const uuid = require("uuid");
const cookie = require("./helper/cookie.js");
const {
    promisify
} = require("util");
const jwt = require("jsonwebtoken");
const jwtVerify = promisify(jwt.verify);

module.exports = async (req, res) => {
    try {
        const authToken = cookie.getCookies(req, res, "auth_token");
        const decodedToken = await jwtVerify(authToken, "Secret");
        const {
            user_id,
            accounts
        } = decodedToken;

        const {
            type,
            amount,
            transferTarget,
            origin
        } = await json(req);

        const listOfAccounts = new Set(accounts);



        const parsedAmount = parseFloat(amount);

        console.log(type);
        console.log(parsedAmount);
        console.log(transferTarget);
        console.log(origin);

        if (!listOfAccounts.has(origin)) {
            console.log(`${origin} is not in the accounts in the token.`);
            return respond.sendJSON(req, res, 400, "Source Acct is not in the Token.");
        }

        const typesOfTransactions = new Set(["withdrawl", "deposit", "transfer"]);
        if (!typesOfTransactions.has(type)) {
            console.log(`${type} is not valid as a transaction type.`);
            return respond.sendJSON(req, res, 400, "Invalid Transaction Type in POST.");
        }

        if (typeof parsedAmount !== 'number') {
            console.log("Amount is not a number");
            return respond.sendJSON(req, res, 400, `${parsedAmount} is not a number`);
        }

        if (parsedAmount <= 0) {
            console.log("Amount is less than or equal to 0.");
            return respond.sendJSON(req, res, 400, `${parsedAmount} is equal to or less than 0`);
        }

        const checkAccountBalanceQuery = `select balance from accounts where account_id = $1`;
        const currentAccountBalance = await db.query(checkAccountBalanceQuery, [origin]);
        console.log("BEGINNING curr account balance");
        console.log(currentAccountBalance.rows);
        console.log("END curr account balance");

        if ((currentAccountBalance.rows[0].balance < parsedAmount) &&
            ((type === "transfer") || (type === "withdrawl"))) {
            console.log(`'${parsedAmount}' is an amount that is greater than the amount in this account.`);
            respond.sendJSON(req, res, 400, "You sent an amount that is greater than the amount in this account.");
        }



        //TODO: You cannot withdraw more funds than you own.  
        //TODO: FED: Show prompt if value is larger than current value of acct for WITHDRAW AND TRANSFER
        //TODO: You cannot transfer more than is in your account.
        //TODO: JOI validation for 'transferTarget',  only uuids allowed.


        let moneyBeingDeposited = "00000000-0000-0000-0000-000000000002";
        let moneyBeingWithdrawn = "00000000-0000-0000-0000-000000000001";

        switch (type) {
            case "deposit":
                const beginResultD = await db.query(`begin;`);
                const originUpdateD = await db.query(`update accounts set balance = balance + $1 where account_id = $2;`, [parsedAmount, origin]);
                const bankUpdateD = await db.query(`update accounts set balance = balance - $1 where account_id = $2;`, [parsedAmount, moneyBeingDeposited]);
                const {
                    rowsD
                } = await db.query(`insert into transactions (transaction_id, sender_id, receiver_id, type, amount) 
            values ($1, $2, $3, $4, $5) returning *;`,
                    [uuid.v4(), moneyBeingDeposited, origin, type, parsedAmount]
                );
                const commitResultD = await db.query(`commit;`);
                console.log(beginResultD);
                console.log(originUpdateD);
                console.log(bankUpdateD);
                console.log(commitResultD)

                return respond.sendJSON(req, res, 200, rowsD, "Deposit: Create Transaction Deposit");
            case "withdrawl":
                const beginResultW = await db.query(`begin;`);
                const originUpdateW = await db.query(`update accounts set balance = balance + $1 where account_id = $2;`, [parsedAmount, moneyBeingWithdrawn]);
                const bankUpdateW = await db.query(`update accounts set balance = balance - $1 where account_id = $2;`, [parsedAmount, origin]);
                const {
                    rowsW
                } = await db.query(`insert into transactions 
                    (transaction_id, sender_id, receiver_id, type, amount) 
                    values ($1, $2, $3, $4, $5) returning *;`,
                    [uuid.v4(), origin, moneyBeingWithdrawn, type, parsedAmount]
                );
                const commitResultW = await db.query(`commit;`);

                console.log(beginResultW);
                console.log(originUpdateW);
                console.log(bankUpdateW);
                console.log(commitResultW)

                return respond.sendJSON(req, res, 200, rowsW, "Withdrawl: Create Transaction Deposit");
            case "transfer":
                const beginResultT = await db.query(`begin;`);
                const originUpdateT = await db.query(`update accounts set balance = balance + $1 where account_id = $2;`, [parsedAmount, transferTarget]);
                const bankUpdateT = await db.query(`update accounts set balance = balance - $1 where account_id = $2;`, [parsedAmount, origin]);
                const {
                    rowsT
                } = await db.query(`insert into transactions 
                    (transaction_id, sender_id, receiver_id, type, amount) 
                    values ($1, $2, $3, $4, $5) returning *;`,
                    [uuid.v4(), origin, transferTarget, type, parsedAmount]
                );
                const commitResultT = await db.query(`commit;`);
                console.log(beginResultT);
                console.log(originUpdateT);
                console.log(bankUpdateT);
                console.log(commitResultT)

                return respond.sendJSON(req, res, 200, rowsT, "Transfer: Create Transaction Deposit");
            default:
                return respond.sendJSON(req, res, 200, [], "Default Case Hit.");
        }
    } catch (e) {
        console.log(e);
        respond.sendError(req, res, 500, e);
    }

}