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
                head: ['yellow'],
                compact: false,
                colAligns: ['center'],
            }
        });

        var productArray = [];
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].ItemID, res[i].ProductName, res[i].Price, res[i].StockQuanitiy]
            );
            productArray.push(res[i].ProductName);
        }
        console.log("             Welcome to the Nooga Delivery CLI Store".america);
        console.log("                    Our Available inventory      ");
        console.log("********************************************************************");
        console.log(table.toString());
        promptCustomer(productArray);
    });
}

function promptCustomer(inventory) {
    inquirer.prompt([{
            type: "list",
            name: "option",
            message: ("What is the product ID of the item would you like to buy?".green),
            choices: inventory
        }])
        .then(function(val) {
            // TODO: Check if the user wants to quit the program (currently not working)
            // checkIfExit(val);


            var choiceProduct = val.option;
            console.log(choiceProduct + " Chosen option");
            var product = checkInventory(choiceProduct, inventory).red;


            // If there is a product with the name the user chose, prompt the customer for a desired quantity
            if (product) {
                console.log("There is a product " + product + " available for purchase");
                //   Pass the chosen product to promptCustomerForQuantity
                promptCustomerForQuantity(product);

            } else {
                //     // Otherwise let them know the item is not in the inventory, re-run loadProducts
                console.log("\nThat item is not in the inventory. " + product);
                // loadProducts();
            }

            process.exit(0);
        });
}



// Check to see if the product the user chose exists in the inventory
function checkInventory(choiceProduct, inventory) {
    for (var i = 0; i < inventory.length; i++) {
        if (choiceProduct === inventory[i]) {
            // If a matching product is found, return the product
            return inventory[i];
        }
    }
    // Otherwise return null
    return null;
}

function promptCustomerForQuantity(product) {
    inquirer.prompt([{
            type: "list",
            name: "quanitity",
            message: ("How many would you like to buy?".green),
            choices: ['1', '2', '3']
        }])
        .then(function(val) {
            console.log(val);
        });
}