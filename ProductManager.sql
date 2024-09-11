CREATE database product_manager;

USE product_manager CREATE TABLE customers(
   id INT PRIMARY KEY AUTO_INCREMENT,
   name VARCHAR(255) NOT NULL UNIQUE,
   adress VARCHAR(100) NOT NULL,
   email VARCHAR(255) NOT NULL UNIQUE,
   phone VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE purchase_orders(
   id INT PRIMARY KEY AUTO_INCREMENT,
   date DATE NOT NULL,
   delivery_address VARCHAR(100) NOT NULL,
   track_number VARCHAR(100) NOT NULL,
   status VARCHAR(50) NOT NULL,
   customer_id INT,
   FOREIGN KEY(customer_id) REFERENCES customers(id)
);

CREATE TABLE products(
   id INT PRIMARY KEY AUTO_INCREMENT,
   name VARCHAR(255) NOT NULL price DECIMAL(10, 2) NOT NULL,
   description VARCHAR(50) NOT NULL,
   stock INT NOT NULL,
   category VARCHAR(100) NOT NULL,
   barcode VARCHAR(50) NOT NULL,
   status VARCHAR(50) NOT NULL
);

CREATE TABLE order_details(
   id INT PRIMARY KEY AUTO_INCREMENT,
   quantity INT NOT NULL,
   price DECIMAL(10, 2) NOT NULL,
   product_id INT,
   order_id INT,
   FOREIGN KEY(product_id) REFERENCES products(id),
   FOREIGN KEY(order_id) REFERENCES purchase_orders(id)
);
-- mis à jour et ajout de la table payments
CREATE TABLE payments(
   id INT PRIMARY KEY AUTO_INCREMENT,
   order_id INT,
   date DATE NOT NULL,
   amount DECIMAL(10, 2) NOT NULL,
   payment_method VARCHAR(50),
   FOREIGN KEY(order_id) REFERENCES purchase_orders(id)
);

-- mis à jour de customers
ALTER TABLE
MODIFY
   address VARCHAR(100) NOT NULL UNIQUE;
MODIFY
   name VARCHAR(255) NOT NULL UNIQUE,
MODIFY
   email VARCHAR(255) NOT NULL UNIQUE,
MODIFY
   phone VARCHAR(20) NOT NULL UNIQUE,
   CHANGE adress address VARCHAR(255) NOT NULL;

-- mis à jour de products
ALTER TABLE
   products
MODIFY
   name VARCHAR(255) NOT NULL,
ADD
   category VARCHAR(100),
ADD
   barcode VARCHAR(50),
ADD
   status VARCHAR(50);

-- mis à jour de purchase_orders
ALTER TABLE
   purchase_orders
ADD
   track_number VARCHAR(100),
ADD
   status VARCHAR(50);