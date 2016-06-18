// First Display All of the Items available for sale. This initial display, should include the ids, names, and prices of products for sale

// Users should then be prompted with two messages. The first message should ask them the ID of the product they would like to buy. The second message should ask them how many of the product they would like to buy.

// Once the customer has placed the order: Your application should...

// Check if your store has enough quantity of the product to meet the customer's request. If not, you should respond to the user by saying: "Insufficient quantity" and prevent the order from going through.

// If your store DOES have enough of the product to meet the customer's request, you should fulfill their order. This means that you should show them the total cost of their puchase. Then update the SQL database to reflect the remaining quantity.

//connects to the Bamazon_db database
var mysql=require('mysql');
var connection=mysql.createConnection({
	host:"localhost",
	port: 3306,
	user:"root", //Your username
	password:"", //Your password
	database:"Bamazon_db"})

//shows if you're connected or not
connection.connect(function(err){
	if(err) throw err;
	console.log("connected as id "+connection.threadID);
	console.log();})

//Display All Items available for sale
connection.query('SELECT * FROM Bamazon_db',function(err,res){
	for(var i=0;i<res.length;i++){
		console.log(res[i].ItemID);
			//+" | "+res[i].ProductName+" | "+res[i].Price+" | "+res[i].StockQuantity);
		}
	console.log("-----------------------------------");})



// connection.query('SELECT * FROM Bamazon_db WHERE genre=?',['country'],function(err,res){
// 	for(var i=0;i<res.length;i++){
// 		console.log(res[i].ID+" | "+res[i].song+" | "+res[i].artist+" | "+res[i].genre);}})

