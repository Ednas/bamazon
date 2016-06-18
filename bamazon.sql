CREATE DATABASE Bamazon_db

use Bamazon_db;


create table products (
	ItemID integer(90) not null,
    ProductName varchar(255) not null,
    DepartmentName varchar(255) not null,
    Price integer(255) not null,
    StockQuanitiy integer(100) not null
);


INSERT INTO products
VALUES (01, "Purse-blk", "ladies", 89.99, 15)

INSERT INTO products
VALUES (02, "Velvet", "crafts", 12, 39)

INSERT INTO products
VALUES (03, "The Catcher in the Rye", "books", 14.99, 59)

INSERT INTO products
VALUES (04, "Staples", "office", 0.99, 380)

INSERT INTO products
VALUES (05, "i-Phone", "electronics", 799.00, 3)

INSERT INTO products
VALUES (06, "Go Pro Camera", "electronics", 599, 48)

INSERT INTO products
VALUES (07, "X-Box 360", "electronics", 199, 38)

INSERT INTO products
VALUES (08, "Girl with the Dragon tattoo", "books", 16.99, 38)

INSERT INTO products
VALUES (09, "Wooden spindle", "crafts", 3.99, 69)

INSERT INTO products
VALUES (10, "Dress", "ladies", 980.00, 3)

INSERT INTO products
VALUES (11, "Pants", "ladies", 25, 94)

INSERT INTO products
VALUES (12, "Pens", "office", 3.99, 93)