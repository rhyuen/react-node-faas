const {
    Pool,
    Client
} = require("pg");

const {
    pg_user_faas,
    pg_host_faas,
    pg_dbname_faas,
    pg_password_faas
} = process.env;

const pool = new Pool({
    user: pg_user_faas,
    host: pg_host_faas,
    database: pg_dbname_faas,
    password: pg_password_faas,
    port: 5432,
    connectionTimeoutMillis: 1000,
    idleTimeoutMillis: 1000,
    max: 1
});

module.exports = {
    // query: (text, params) => {
    //     return new Promise((resolve, reject) => {
    //         pool.query(text, params).then(res => {
    //             resolve(res);
    //         }).catch(e => {
    //             reject(e);
    //         })
    //     });
    // },
    query: async (text, params) => {
        const client = await pool.connect();
        return new Promise((resolve, reject) => {
            client.query(text, params).then(res => {
                resolve(res);
            }).catch(e => {
                client.release();
                reject(e);
            }).then(() => {
                client.release();
            });
        });
    }
};


// async function query(text, params) {
//     const client = await pool.connect();
//     try {
//         const result = await client.query(text, params);
//         return result;
//     } catch (e) {
//         console.log(e)
//     } finally {
//         client.release();
//     }
// }

// module.exports = query;