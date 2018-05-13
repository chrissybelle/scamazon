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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lipstick", "beauty-face", 28.00, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("eyeliner", "beauty-face", 21.00, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("nail polish", "beauty-nails", 8.00, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hair brush", "beauty-hair", 15.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("curling iron", "beauty-hair", 149.00, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("eyeshadow", "beauty-face", 18.00, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("perfume", "beauty-body", 89.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lotion", "beauty-body", 28.00, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shampoo", "beauty-hair", 16.00, 19);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bronzer", "beauty-face", 26.00, 7);