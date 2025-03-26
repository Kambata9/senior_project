USE fridge_application_db;

-- Create recipes table
CREATE TABLE recipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_name VARCHAR(100) NOT NULL,
    recipe_diet ENUM('vegan','vegetarian','keto') NOT NULL,
    recipe_difficulty ENUM('Easy','Medium','Hard') NOT NULL
);

-- Insert 10 recipes (using ingredients that exist in the ingredients table)
INSERT INTO recipes (recipe_name, recipe_diet, recipe_difficulty) VALUES
('Chicken Salad', 'keto', 'Easy'),
('Fruit Smoothie', 'vegetarian', 'Easy'),
('Beef Stew', 'keto', 'Medium'),
('Veggie Stir Fry', 'vegan', 'Medium'),
('Tomato Avocado Salad', 'vegan', 'Easy'),
('Grilled Salmon with Vegetables', 'keto', 'Medium'),
('Pork Chop with Apples', 'keto', 'Medium'),
('Shrimp Salad', 'keto', 'Easy'),
('Vegetarian Pizza', 'vegetarian', 'Hard'),
('Mixed Fruit Bowl', 'vegetarian', 'Easy');

-- Create recipe_ingredients table
CREATE TABLE recipe_ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id) ON DELETE CASCADE
);


-- Create user_shopping_list table
CREATE TABLE user_shopping_list (
    shopping_list_id INT AUTO_INCREMENT PRIMARY KEY,
    ingredient_id INT NOT NULL,
    user_id INT NOT NULL,
    date_added DATETIME NOT NULL,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create user_favorite_recipes table
CREATE TABLE user_favorite_recipes (
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    PRIMARY KEY (user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE
);
