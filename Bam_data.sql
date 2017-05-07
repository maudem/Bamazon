CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER (4) NOT NULL AUTO_INCREMENT,
	product_name VARCHAR NOT NULL,
	department_name VARCHAR NOT NULL,
	price DECIMAL (5,2) NOT NULL,
	stock_quantity INTEGER (3) NOT NULL,
	primary key (position)

);

select * from bamazon;
