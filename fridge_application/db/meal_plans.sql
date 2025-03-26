USE fridge_application_db;

DROP TABLE IF EXISTS meal_plans;
CREATE TABLE meal_plans (
    meal_plan_id INT AUTO_INCREMENT,
    meal_plan_name VARCHAR(50) NOT NULL,
    meal_plan_diet ENUM('keto', 'vegan', 'vegetarian') NOT NULL,
    recipe_id INT NOT NULL,
    PRIMARY KEY (meal_plan_id, recipe_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE
);

-- Sample Data Insertions:
-- Note: Adjust the recipe_id values below so that they correspond to recipes 
-- in your recipes table that have the appropriate 'recipe_diet'.

-- Meal Plan: Keto high (14 recipes; only recipes where recipe_diet = 'keto')
INSERT INTO meal_plans (meal_plan_name, meal_plan_diet, recipe_id) VALUES
('Keto high', 'keto', 3),
('Keto high', 'keto', 7),
('Keto high', 'keto', 8),
('Keto high', 'keto', 10),
('Keto high', 'keto', 13),
('Keto high', 'keto', 15),
('Keto high', 'keto', 17),
('Keto high', 'keto', 19),
('Keto high', 'keto', 21),
('Keto high', 'keto', 22),
('Keto high', 'keto', 25),
('Keto high', 'keto', 27),
('Keto high', 'keto', 29),
('Keto high', 'keto', 31);

-- Meal Plan: Vegan plan (14 recipes; only recipes where recipe_diet = 'vegan')
INSERT INTO meal_plans (meal_plan_name, meal_plan_diet, recipe_id) VALUES
('Vegan plan', 'vegan', 4),
('Vegan plan', 'vegan', 5),
('Vegan plan', 'vegan', 9),
('Vegan plan', 'vegan', 11),
('Vegan plan', 'vegan', 14),
('Vegan plan', 'vegan', 16),
('Vegan plan', 'vegan', 18),
('Vegan plan', 'vegan', 20),
('Vegan plan', 'vegan', 23),
('Vegan plan', 'vegan', 26),
('Vegan plan', 'vegan', 28),
('Vegan plan', 'vegan', 30),
('Vegan plan', 'vegan', 32),
('Vegan plan', 'vegan', 34);

-- Meal Plan: Veggie (14 recipes; only recipes where recipe_diet = 'vegetarian')
INSERT INTO meal_plans (meal_plan_name, meal_plan_diet, recipe_id) VALUES
('Veggie', 'vegetarian', 2),
('Veggie', 'vegetarian', 6),
('Veggie', 'vegetarian', 12),
('Veggie', 'vegetarian', 15),
('Veggie', 'vegetarian', 19),
('Veggie', 'vegetarian', 24),
('Veggie', 'vegetarian', 28),
('Veggie', 'vegetarian', 33),
('Veggie', 'vegetarian', 35),
('Veggie', 'vegetarian', 36),
('Veggie', 'vegetarian', 37),
('Veggie', 'vegetarian', 38),
('Veggie', 'vegetarian', 40),
('Veggie', 'vegetarian', 41);
