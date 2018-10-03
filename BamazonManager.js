//Welcome to Bamazon, use this application to find and purchase
//your favorite Bamazon items

var inquirer = require('inquirer');
var Table = require('cli-table');
var colors = require('colors');

//connects to the Bamazon_db database
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root", //Your username
    password: "coast", //Your password
    database: "Bamazon_db"
});

//shows if you're connected or not
con.connect(function(err, res, fields) {
    if (err) throw err;

});

con.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
    console.log(fields);
});

con.end();