var mysql = require("mysql");
var Table = require("easy-table");
var prompt = require("prompt");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Poofey01!",
	database: "bamazon"
});

//connection to mysql
connection.connect(function(err) {
	if (err){
		console.log("Error: " + err);
	}
	console.log("connection as id" + connection.threadId);

});



connection.query("SELECT * FROM products", function(err, res) 
{

var end = function(){
 	inquirer.prompt([{
 		name: "startOver",
 		type: "confirm",
 		message: "would you like to make another purchase?"
 	//default: False
	}]).then(function(answer){
 		
 		if (answer.startOver === "Yes"){
 			customerPrompts();
 		}else if(answer.startOver === "No"){
 		connection.end();
 		}
 });
}	



//function to ask customer for sale
var customerPrompts = function(){
	//item to be bought
	inquirer.prompt([{
		name: "buyItem",
		type: "input",
		message: "Welcome to Bamazon! Enter the number of the item you would like to purchase today.",
		//check if entry is a number
		validate: function(value) { 
			if (isNaN(value)=== true){
				console.log("Try again with a valid number.");
			}
			return true;
		}
	},

	//how many?
	{
		name: "quantity",
		type: "input",
		message: "How many would you like to buy?"
	}
	]).then(function(answer) {
		
		//easier or different way?
		var i = (answer.buyItem) - 1;
		if (res.stock_quantity < answer.quantity)
			{
				console.log("We only have " + res[i].stock_quantity + " in stock.  Please try again.");
				customerPrompts();
			} 

		console.log("Your total is $" + answer.quantity*res[i].price + " Thank you for your purchase.");

		
		//updates mySql
		var newQuantity = res[i].stock_quantity- answer.quantity;

	
		connection.query("UPDATE products set stock_quantity=?, WHERE item_id=?", [newQuantity, answer.buyItem], function(err, res) {});
	
	});
	end();
}




var newT = new Table;

			//shortened for loop
res.forEach(function(product){

    newT.cell("Item ID", product.item_id);

    newT.cell("Category", product.department_name);

    newT.cell("Product Name", product.product_name);

    newT.cell("Price", product.price, Table.number(2));
                    
    newT.newRow();
     });     
    console.log(newT.toString());  
    
   
    customerPrompts();
    
 });  

 


