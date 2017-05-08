var mysql = require("mysql");
var Table = require("easy-table");
var prompt = require("prompt");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Poofey01!",
	database: "bamazon"
});

connection.connect(function(err) {
	if (err){
		console.log("Error: " + err);
	}
	console.log("connection as id" + connection.threadId);
});


connection.query("SELECT * FROM products", function(err, res) 
{
	

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
}); //connection.query
 
var customerPrompts = function(){
console.log("Welcome to Bamazon! Enter the number of the item you would like to purchase today.");

prompt.start();

prompt.get([{
	name: "number",
	type: "number",
	required: true
	}], function (err, result) {
		console.log("Yes! Got it!");
		console.log(JSON.stringify(result, null, 2));
//end of prompts
}); 
 
 // end of customerPrompts()
}
customerPrompts();
