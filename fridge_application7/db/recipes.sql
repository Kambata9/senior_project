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

-- Insert ingredients for each recipe
-- Recipe 1: Chicken Salad: Chicken Breast (#21), Lettuce (#14), Tomato (#15), Cucumber (#16), Bell Pepper (#17)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(1, 21), (1, 14), (1, 15), (1, 16), (1, 17);

-- Recipe 2: Fruit Smoothie: Banana (#2), Mango (#6), Blueberry (#5), Strawberry (#4), Yogurt (#33)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(2, 2), (2, 6), (2, 5), (2, 4), (2, 33);

-- Recipe 3: Beef Stew: Beef Steak (#22), Potato (#19), Carrot (#11), Onion (#18), Tomato (#15)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(3, 22), (3, 19), (3, 11), (3, 18), (3, 15);

-- Recipe 4: Veggie Stir Fry: Broccoli (#12), Carrot (#11), Bell Pepper (#17), Onion (#18), Mushroom (#46), Zucchini (#20)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(4, 12), (4, 11), (4, 17), (4, 18), (4, 46), (4, 20);

-- Recipe 5: Tomato Avocado Salad: Tomato (#15), Avocado (#44), Cucumber (#16), Lettuce (#14), Onion (#18)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(5, 15), (5, 44), (5, 16), (5, 14), (5, 18);

-- Recipe 6: Grilled Salmon with Vegetables: Salmon (#49), Broccoli (#12), Carrot (#11), Onion (#18)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(6, 49), (6, 12), (6, 11), (6, 18);

-- Recipe 7: Pork Chop with Apples: Pork Chop (#23), Apple (#1), Onion (#18)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(7, 23), (7, 1), (7, 18);

-- Recipe 8: Shrimp Salad: Shrimp (#27), Lettuce (#14), Tomato (#15), Cucumber (#16), Avocado (#44)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(8, 27), (8, 14), (8, 15), (8, 16), (8, 44);

-- Recipe 9: Vegetarian Pizza: Tomato (#15), Bell Pepper (#17), Onion (#18), Mushroom (#46), Mozzarella (#39)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(9, 15), (9, 17), (9, 18), (9, 46), (9, 39);

-- Recipe 10: Mixed Fruit Bowl: Apple (#1), Banana (#2), Orange (#3), Mango (#6), Kiwi (#43)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(10, 1), (10, 2), (10, 3), (10, 6), (10, 43);

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
