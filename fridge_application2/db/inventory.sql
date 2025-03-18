CREATE DATABASE IF NOT EXISTS fridge_application_db;
USE fridge_application_db;

-- Ingredients table (only fruit, vegetables, meat, and dairy)
CREATE TABLE ingredients (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    ingredient_name VARCHAR(100) NOT NULL,
    ingredient_type ENUM('fruit', 'vegetable', 'meat', 'dairy') NOT NULL
);

INSERT INTO ingredients (ingredient_name, ingredient_type) VALUES
('Apple', 'fruit'),
('Banana', 'fruit'),
('Orange', 'fruit'),
('Strawberry', 'fruit'),
('Blueberry', 'fruit'),
('Mango', 'fruit'),
('Grapes', 'fruit'),
('Pineapple', 'fruit'),
('Peach', 'fruit'),
('Watermelon', 'fruit'),
('Carrot', 'vegetable'),
('Broccoli', 'vegetable'),
('Spinach', 'vegetable'),
('Lettuce', 'vegetable'),
('Tomato', 'vegetable'),
('Cucumber', 'vegetable'),
('Bell Pepper', 'vegetable'),
('Onion', 'vegetable'),
('Potato', 'vegetable'),
('Zucchini', 'vegetable'),
('Chicken Breast', 'meat'),
('Beef Steak', 'meat'),
('Pork Chop', 'meat'),
('Lamb', 'meat'),
('Turkey', 'meat'),
('Fish Fillet', 'meat'),
('Shrimp', 'meat'),
('Bacon', 'meat'),
('Sausage', 'meat'),
('Ham', 'meat'),
('Milk', 'dairy'),
('Cheddar Cheese', 'dairy'),
('Yogurt', 'dairy'),
('Butter', 'dairy'),
('Cream', 'dairy'),
('Cottage Cheese', 'dairy'),
('Ice Cream', 'dairy'),
('Sour Cream', 'dairy'),
('Mozzarella', 'dairy'),
('Parmesan', 'dairy'),
('Feta Cheese', 'dairy'),
('Grapefruit', 'fruit'),
('Kiwi', 'fruit'),
('Avocado', 'fruit'),
('Eggplant', 'vegetable'),
('Mushroom', 'vegetable'),
('Brussels Sprouts', 'vegetable'),
('Pork Belly', 'meat'),
('Salmon', 'meat'),
('Cod', 'meat');

CREATE TABLE user_inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    unit_measure ENUM('kg', 'g', 'l', 'ml', 'units') DEFAULT NULL,
    quantity DECIMAL(10,2) DEFAULT NULL,
    expiration_date DATE NOT NULL,
    comment VARCHAR(50) DEFAULT NULL,
    date_added DATE NOT NULL,               -- <--- Changed to DATE
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id) ON DELETE CASCADE
);
