const db = require("./db.js");

async function getItem() {
    const email = "hometwo@home.ca";
    const statement = `select user_id, password from users where email = $1`;
    const result = await db.query(statement, [email]);
    return result;
}


getItem().then(res => {
    console.log(res.rows);
}).catch(e => {
    console.log(e);
}).finally {

}