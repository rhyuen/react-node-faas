const {
    Pool,
    Client
} = require("pg");
const config = require("./keys.js");

const {
    pg_user_faas,
    pg_host_faas,
    pg_dbname_faas,
    pg_password_faas
} = config.prod;

const pool = new Pool({
    user: pg_user_faas,
    host: pg_host_faas,
    database: pg_dbname_faas,
    password: pg_password_faas,
    port: 5432,
});

module.exports = {
    query: (text, params) => {
        return new Promise((resolve, reject) => {
            pool.query(text, params).then(res => {
                resolve(res);
            }).catch(e => {
                reject(e);
            });
        });
    },
    getClient: () => {
        return pool;
    }
};