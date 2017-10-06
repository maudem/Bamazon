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



