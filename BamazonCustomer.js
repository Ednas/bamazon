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
        var pName = [];

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].ItemID, res[i].ProductName, res[i].Price, res[i].StockQuanitiy]

            );
            productArray.push(
                [res[i].ItemID, res[i].ProductName, res[i].Price, res[i].StockQuanitiy]
            );
            pName.push(res[i].ProductName);
        }
        console.log("             Welcome to the Nooga Delivery CLI Store".america);
        console.log("                    Our Available inventory      ");
        console.log("********************************************************************");
        console.log(table.toString());

        promptCustomer(pName, productArray);
    });
}

function promptCustomer(inventory, table) {
    inquirer
        .prompt([{
            type: "list",
            name: "option",
            message: ("What is the name of the item would you like to buy?".green),
            choices: inventory
        }])
        .then(function(val) {
            var choiceProduct = val.option;

            for (var i = 0; i < table.length; i++) {
                if (table[i][1] === choiceProduct) {
                    console.log(choiceProduct + " Chosen option");
                    var product = checkInventory(choiceProduct, table[i]);
                }
            }

            // If there is a product with the name the user chose, prompt the customer for a desired quantity
            if (product) {
                console.log("There is a product " + choiceProduct.red + " available for purchase");
                //   Pass the chosen product to promptCustomerForQuantity
                promptCustomerForQuantity(product, choiceProduct);

            } else {
                //     // Otherwise let them know the item is not in the inventory, re-run loadProducts
                console.log("\nThat item is not in the inventory. " + product).red;
                loadProducts();
            }
        });
}


// Check to see if the product the user chose exists in the inventory
function checkInventory(choiceProduct, inventory) {
    console.log(choiceProduct + " Chosen | " + inventory[3] + " available");
    var currentInventory = inventory[3];
    for (var i = 0; i < currentInventory; i++) {
        if (choiceProduct === currentInventory[i]) {}
        // If a matching product is found, return the product
        return currentInventory;
    }
    // Otherwise return null
    return null;
}

var quantityQuestions = [{
    type: "input",
    name: "quantity",
    message: ("How many would you like to buy?".green),
    validate: function(val) {
        return !isNaN(val) || val.toLowerCase() === "q";
    }
}];


function promptCustomerForQuantity(product, choiceProduct) {
    inquirer
        .prompt(quantityQuestions)
        .then((val) => {
            checkIfExit(val.quantity);

            var quantity = parseInt(val.quantity);
            // If there isn't enough of the chosen product and quantity, let the user know and re-run loadProducts
            if (quantity > product) {
                console.log("\nInsufficient quantity!");
                // loadProducts();
            } else {
                // Otherwise run makePurchase, give it the product information and desired quantity to purchase
                console.log("Purchased!");
                makePurchase(choiceProduct, quantity);
            }

            // console.log(JSON.stringify(answers, null, '  '));
            console.log(quantity + " Is the Quantity requested");
            console.log(product + " is the quantity on hand");
        });
}

// Purchase the desired quantity of the desired item
function makePurchase(choiceProduct, quantity) {
    con.query(
        "UPDATE products SET StockQuanitiy = StockQuanitiy - ? WHERE ProductName = ?", [quantity, choiceProduct],
        function(err, res) {
            if (err) throw err;
            console.log(res);
            // Let the user know the purchase was successful, re-run loadProducts
            console.log("\nSuccessfully purchased " + quantity + " " + choiceProduct + "'s!");
            // loadProcucts();
            shopMore();
        }
    );
}



function shopMore() {
    inquirer.prompt(
            [{
                type: "list",
                name: "shop",
                message: ("Have you finished Shopping?".green),
                choices: ['Yes', 'No']
            }]
        )
        .then(answers => {
            if (answers.shop === "No") {
                loadProcucts();
            } else {
                console.log("Thank you for Shopping with us!");
                process.exit(0);
            }
        })
};

function checkIfExit(choice) {
    if (choice.toLowerCase() === "q") {
        // Log a message and exit the current node process
        console.log("Goodbye!");
        process.exit(0);
    }
}




// console.log(table[1][1] + " is name");
// console.log(table[1][3] + " is the quantity on hand");