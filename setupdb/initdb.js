const db = require("./db.js");
const uuid = require("uuid");
const usersData = require("./users.js");
const bcrypt = require("bcrypt");
const accountsData = require("./accounts.js");

function generateUserData(users) {
    let queryString = "";
    for (let i = 0; i < usersData.length; i++) {
        let {
            uuid,
            email,
            password
        } = usersData[i];
        const hashedPassword = bcrypt.hashSync(password, 10);
        queryString += `('${uuid}', '${email}', '${hashedPassword}')`;
        if (i !== usersData.length - 1) {
            queryString += ", ";
        } else {
            queryString += ";";
        }
    }
    return queryString;
}

function generateAccountData(accts) {
    let insertAccountsQuery = "";
    for (let i = 0; i < accts.length; i++) {
        let {
            uuid,
            user_id,
            account_name,
            type,
            balance
        } = accts[i];
        insertAccountsQuery += `('${uuid}', '${user_id}', '${account_name}', '${type}', ${balance})`;
        if (i !== accts.length - 1) {
            insertAccountsQuery += ", ";
        } else {
            insertAccountsQuery += ";";
        }
    }
    //console.log(insertAccountsQuery);
    return insertAccountsQuery
}

function generateTransactionsData(txs) {
    //I Want Deposits.
    //I want Withdrawls
    //I want transfers.
    //EVerything is effectively a transfer because there's always a sender/receiver.
    //Thus, everything is a transaction.

    //Instead of mixing and matching deposits, transfers, withdraws.
    //You can do a bunch of deposits, then transfers, then withdrawls.
    //It might be easier.
    let insertTransactionsQuery = "";
    for (let i = 0; i < txs.length; i++) {

        insertTransactionsQuery += `begin; \
            update accounts set balance = balance - ${txs[i].amount} \
            where account_id = ${txs[i].sender_id} ;\
            update accounts set balance = balance + ${txs[i].amount} \
            where account_id = ${txs[i].receiver_id};\
            insert into transactions(transaction_id, sender_id, receiver_id, type, amount) \
            values ('${uuid.v4()}', '${txs[i].sender_id}', '${txs[i].receiver_id}', '${txs[i].type}', ${txs[i].amount});
            commit;`;
    }
    return insertTransactionsQuery;
}

function generateDeposits(accts) {
    let depositQuery = ``;
    const externalAccts = accts.slice(0, 2);
    const normalAccts = accts.slice(2);
    for (let i = 0; i < normalAccts.length; i++) {
        let depositedIntoAcct = String(normalAccts[i].uuid);
        let outsideMoneyProxy = externalAccts[0].uuid;
        let transactionAmount = Math.floor(Math.random() * 100);
        depositQuery += `begin;\
            update accounts set balance = balance + ${transactionAmount} where account_id = '${depositedIntoAcct}';
            update accounts set balance = balance - ${transactionAmount} where account_id = '${outsideMoneyProxy}';
            insert into transactions(transaction_id, sender_id, receiver_id, type, amount)\
            values ('${uuid.v4()}', '${outsideMoneyProxy}', '${depositedIntoAcct}', 'deposit', ${transactionAmount});\
            commit;`;
    };
    return depositQuery;
}

function generateWithdrawls(accts) {
    let withdrawlQuery = ``;
    const normalAccts = accts.slice(2);
    const externalTypeAccts = accts.slice(0, 2);

    for (let i = 0; i < normalAccts.length; i++) {
        let acctToWithdrawFrom = String(normalAccts[i].uuid);
        let outsideAcctProxy = externalTypeAccts[1].uuid;
        let transactionAmount = 5 || Math.floor(Math.random() * 100);

        withdrawlQuery += `begin;\
            update accounts set balance = balance - ${transactionAmount} where account_id = '${acctToWithdrawFrom}';
            update accounts set balance = balance + ${transactionAmount} where account_id = '${outsideAcctProxy}';
            insert into transactions(transaction_id, sender_id, receiver_id, type, amount)\
            values ('${uuid.v4()}', '${acctToWithdrawFrom}', '${outsideAcctProxy}', 'withdrawl', ${transactionAmount});\
            commit;`;
    };
    return withdrawlQuery;
}

function generateTransfers(accts) {
    let transferQuery = ``;

    const normalAccts = accts.slice(2);

    for (let i = 0; i < normalAccts.length; i++) {
        let senderAcct = normalAccts[i].uuid;
        let receiverAcct;
        let rng = Math.floor(Math.random() * 100) % normalAccts.length;
        if (rng === i) {
            continue;
        }
        receiverAcct = normalAccts[rng].uuid;

        let transactionAmount = 30 || Math.floor(Math.random() * 100);
        transferQuery += `begin;\
            update accounts set balance = balance - ${transactionAmount} where account_id = '${senderAcct}';
            update accounts set balance = balance + ${transactionAmount} where account_id = '${receiverAcct}';
            insert into transactions(transaction_id, sender_id, receiver_id, type, amount)\
            values ('${uuid.v4()}', '${senderAcct}', '${receiverAcct}', 'transfer', ${transactionAmount});\
            commit;`;
    };
    return transferQuery;
}


(async () => {
    try {
        const pool = await db.getClient();
        const client = await pool.connect();
        const makeUsersTable = `drop table if exists users cascade; 
        create table users (
        user_id uuid not null primary key,
        email text unique not null,
        password text not null,
        created_at timestamp not null default current_timestamp,
        last_modified timestamp not null default current_timestamp        
    )`;

        const insertQueries = generateUserData(usersData);
        const populateUsers = `insert into users(user_id, email, password) values${insertQueries}`;

        const makeAccountTypeEnum = `drop type if exists account_type cascade; 
            create type account_type as enum('savings', 'chequing', 'external')`;

        const makeAccountsTable = `drop table if exists accounts cascade; 
            create table accounts(
            account_id uuid not null primary key,
            user_id uuid not null references users(user_id),
            account_name text not null default 'latest-account',
            type account_type not null default 'savings',
            balance numeric(8,2) not null default 0.00,
            created_at timestamp not null default current_timestamp,
            last_modified timestamp not null default current_timestamp
        )`;

        const insertAccountQueries = generateAccountData(accountsData);
        const populateAccountsTable = `insert into accounts(account_id, user_id, account_name, type, balance) values ${insertAccountQueries}`;

        const makeTransactionTypeEnum = `drop type if exists transaction_type cascade;
        create type transaction_type as enum('deposit', 'withdrawl', 'transfer')`;
        const makeTransactionsTable = `drop table if exists transactions cascade; 
            create table transactions(
            transaction_id uuid not null primary key,
            sender_id uuid not null references accounts(account_id),
            receiver_id uuid not null references accounts(account_id) check(sender_id != receiver_id),
            type transaction_type not null,
            amount numeric(8,2) not null check(amount > 0.00),            
            created_at timestamp not null default current_timestamp            
        )`;

        //const insertTransactionQueries = generateTransactionsData(transactionsData);
        const fillTransactionsTableWithDeposits = generateDeposits(accountsData);
        const withdrawlsForTransactionsTable = generateWithdrawls(accountsData);
        const transfersForTransactionsTable = generateTransfers(accountsData);

        await client.query(makeUsersTable);
        await client.query(populateUsers);

        await client.query(makeAccountTypeEnum);
        await client.query(makeAccountsTable);
        await client.query(populateAccountsTable);

        await client.query(makeTransactionTypeEnum);
        await client.query(makeTransactionsTable);

        await client.query(fillTransactionsTableWithDeposits);
        await client.query(withdrawlsForTransactionsTable);
        await client.query(transfersForTransactionsTable);


        client.end();
    } catch (e) {
        console.log(e)

    } finally {
        console.log('finally');
    }
})();