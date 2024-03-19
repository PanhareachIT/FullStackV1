const mysql = require("mysql");
const util = require("util")
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nitnode",
    port: "3306"
})
// promise wrapper to enable async await with MYSQL
// https://medium.com/fullstackwebdev/a-guide-to-mysql-with-node-js-fc4f6abce33b
db.query = util.promisify(db.query).bind(db);
module.exports = db;