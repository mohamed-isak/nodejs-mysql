const { response } = require("express");
const mysql = require("mysql");
// Mysql
 const conn = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'malligai_food'
}); 

module.exports = conn;

//Tl?6N@&te8Os