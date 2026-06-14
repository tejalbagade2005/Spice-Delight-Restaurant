-- Create database
CREATE DATABASE cafe_erp;

-- Connect to database
\c cafe_erp;

-- Create foods table
CREATE TABLE foods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(500)
);

-- Create orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10, 2),
  image VARCHAR(500),
  date VARCHAR(255)
);

-- Insert sample data
INSERT INTO foods (name, price, image) VALUES
('Pizza', 12.99, 'https://via.placeholder.com/200?text=Pizza'),
('Burger', 8.99, 'https://via.placeholder.com/200?text=Burger'),
('Pasta', 10.99, 'https://via.placeholder.com/200?text=Pasta'),
('Salad', 6.99, 'https://via.placeholder.com/200?text=Salad'),
('Steak', 24.99, 'https://via.placeholder.com/200?text=Steak'),
('Chicken Curry', 14.99, 'https://via.placeholder.com/200?text=Chicken+Curry'),
('Fish and Chips', 16.99, 'https://via.placeholder.com/200?text=Fish+and+Chips'),
('Sushi', 18.99, 'https://via.placeholder.com/200?text=Sushi'),
('Tacos', 9.99, 'https://via.placeholder.com/200?text=Tacos'),
('Ramen', 11.99, 'https://via.placeholder.com/200?text=Ramen'),
('Ice Cream', 5.99, 'https://via.placeholder.com/200?text=Ice+Cream'),
('Coffee', 3.99, 'https://via.placeholder.com/200?text=Coffee');