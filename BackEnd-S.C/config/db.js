//incluir bilioteca de conexão

const mysql = require("mysql2/promise");

//criar conexão com banco de dados 
const client = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "smartcoach"
})

module.exports = client;