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
con.connect(function(err, results, fields) {
    if (err) throw err;
    loadProcucts();
});

function loadProcucts() {
    //Display All Items available for sale
    con.query('SELECT * FROM products;', function(err, res) {
        if (err) throw err;

        var productArray = [];
        for (var i = 0; i < res.length; i++) {
            productArray.push(res[i].ProductName);
        }
        promptCustomer(productArray);
    });
}

function promptCustomer(productArray) {
    inquirer.prompt([{
            type: "list",
            name: "option",
            message: ("What is the product ID of the item would you like to buy?".rainbow),
            choices: productArray
        }])
        .then(function(val) {
            // Check if the user wants to quit the program
            checkIfExit(val.option);
            // var choiceId = (val.option).toString();
            // var product = checkInventory(choiceId, inventory);

            console.log(val.option + " is selected option");


            // // If there is a product with the id the user chose, prompt the customer for a desired quantity
            // if (product) {
            //     // Pass the chosen product to promptCustomerForQuantity
            //     promptCustomerForQuantity(product);
            // } else {
            //     // Otherwise let them know the item is not in the inventory, re-run loadProducts
            //     console.log("\nThat item is not in the inventory.");
            //     loadProducts();
            // }

            process.exit(0);
        });
}

function checkIfExit(choice) {
    if (choice.toLowerCase() === "q") {
        // Log a message and exit the current node process
        console.log("Goodbye!");
        process.exit(0);
    }
}


//2 messages

//First message = ID of the product they would like to buy

//Second message = how many of the product they would like to buy