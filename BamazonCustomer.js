//Welcome to Bamazon, use this application to find and purchase
//your favorite Bamazon items

var inquirer = require('inquirer');
var Table = require('cli-table');


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

        //creates a table for the information from the mysql database to be placed
        var table = new Table({
            head: ['Item Id#', 'Product Name', 'Price', 'Quantity'],
            style: {
                head: ['blue'],
                compact: false,
                colAligns: ['center'],
            }
        });

        // var productArray = [];
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].ItemID, res[i].ProductName, res[i].Price, res[i].StockQuanitiy]);
        }
        console.log(table.toString());
        promptCustomer();
    });
}

function promptCustomer(inventory) {
    inquirer.prompt([{
            type: "list",
            name: "option",
            message: "What product would you like to buy?",
            validate: function(val) {
                return !isNaN(val) || val.toLowerCase() === "q";
            },
            choices: [
                "Black Purse",
                "Velvet",
                "The Catcher in the Rye",
                "Staples",
                "i-Phone",
                "Go Pro Camera",
                "X-Box 360",
                "Girl with the Dragon tattoo",
                "Wooden spindle",
                "Dress",
                "Pants",
                "Pens",
            ]
        }])
        .then(function(val) {
            // Check if the user wants to quit the program
            checkIfShouldExit(val.option);
            var choiceId = parseInt(val.option);
            console.log(val.option + " is selected option");
            process.exit(0);
        });
}

function checkIfShouldExit(choice) {
    if (choice.toLowerCase() === "q") {
        // Log a message and exit the current node process
        console.log("Goodbye!");
        process.exit(0);
    }
}


//2 messages

//First message = ID of the product they would like to buy

//Second message = how many of the product they would like to buy