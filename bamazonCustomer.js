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

//function to ask customer for sale
var customerPrompts = function(){
	
	inquirer.prompt([{
		name: "buyItem",
		type: "input",
		message: "Welcome to Bamazon! Enter the number of the item you would like to purchase today.",
		validate: function(value) { 
			if (isNaN(value)=== true){//something wrong
				console.log("Try again with a valid number.");
			}
			return true;
		}
	},
	{
		name: "quantity",
		type: "input",
		message: "How many would you like to buy?"
	}
	]).then(function(answer) {
		//var wantItem = ;
		for (var i = 0; i< res.length; i++)
			{
				if (results[i].stock_quantity < answer.quantity)
				{
					console.log("We only have " + results[i].stock_quantity + " in stock.  Please try again.");
					customerPrompts();
				} 

				console.log("Your total is $" + answer.quantity*results[i].price + " Thank you for your purchase.");
				var newQuantity = results[i].stock_quantity- answer.quantity;

				connection.query("UPDATE products SET quantity= " + newQuantity + "WHERE id= " + answer.buyItem);
			}
		});
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
}); //connection.query
 


