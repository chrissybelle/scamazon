DROP DATABASE IF EXISTS glamazon_db;
CREATE DATABASE glamazon_db;
USE glamazon_db;

CREATE TABLE products (
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    product_sales INTEGER
    PRIMARY KEY (item_id)
);