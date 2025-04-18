CREATE DATABASE IF NOT EXISTS fridge_application_db_test;
USE fridge_application_db_test;

CREATE TABLE `ingredients` (
  `ingredient_id` int(11) NOT NULL,
  `ingredient_name` varchar(100) NOT NULL,
  `ingredient_type` enum('fruit','vegetable','meat','dairy') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`ingredient_id`, `ingredient_name`, `ingredient_type`) VALUES
(2, 'Banana', 'fruit'),
(3, 'Orange', 'fruit'),
(4, 'Strawberry', 'fruit'),
(5, 'Blueberry', 'fruit'),
(6, 'Mango', 'fruit'),
(7, 'Grapes', 'fruit'),
(8, 'Pineapple', 'fruit'),
(9, 'Peach', 'fruit'),
(10, 'Watermelon', 'fruit'),
(11, 'Carrot', 'vegetable'),
(12, 'Broccoli', 'vegetable'),
(13, 'Spinach', 'vegetable'),
(14, 'Lettuce', 'vegetable'),
(15, 'Tomato', 'vegetable'),
(16, 'Cucumber', 'vegetable'),
(17, 'Bell Pepper', 'vegetable'),
(18, 'Onion', 'vegetable'),
(19, 'Potato', 'vegetable'),
(20, 'Zucchini', 'vegetable'),
(21, 'Chicken Breast', 'meat'),
(22, 'Beef Steak', 'meat'),
(23, 'Pork Chop', 'meat'),
(24, 'Lamb', 'meat'),
(25, 'Turkey', 'meat'),
(26, 'Fish Fillet', 'meat'),
(27, 'Shrimp', 'meat'),
(28, 'Bacon', 'meat'),
(29, 'Sausage', 'meat'),
(30, 'Ham', 'meat'),
(31, 'Milk', 'dairy'),
(32, 'Cheddar Cheese', 'dairy'),
(33, 'Yogurt', 'dairy'),
(34, 'Butter', 'dairy'),
(35, 'Cream', 'dairy'),
(36, 'Cottage Cheese', 'dairy'),
(37, 'Ice Cream', 'dairy'),
(38, 'Sour Cream', 'dairy'),
(39, 'Mozzarella', 'dairy'),
(40, 'Parmesan', 'dairy'),
(41, 'Feta Cheese', 'dairy'),
(42, 'Grapefruit', 'fruit'),
(43, 'Kiwi', 'fruit'),
(44, 'Avocado', 'fruit'),
(45, 'Eggplant', 'vegetable'),
(46, 'Mushroom', 'vegetable'),
(47, 'Brussels Sprouts', 'vegetable'),
(48, 'Pork Belly', 'meat'),
(49, 'Salmon', 'meat'),
(50, 'Cod', 'meat'),
(51, 'Pomegranate', 'fruit'),
(52, 'Lychee', 'fruit'),
(53, 'Dragonfruit', 'fruit'),
(54, 'Persimmon', 'fruit'),
(55, 'Blackberry', 'fruit'),
(56, 'Raspberry', 'fruit'),
(57, 'Cranberry', 'fruit'),
(58, 'Fig', 'fruit'),
(59, 'Date', 'fruit'),
(60, 'Passion Fruit', 'fruit'),
(61, 'Mandarin', 'fruit'),
(62, 'Pomelo', 'fruit'),
(63, 'Artichoke', 'vegetable'),
(64, 'Beetroot', 'vegetable'),
(65, 'Celery', 'vegetable'),
(66, 'Leek', 'vegetable'),
(67, 'Cabbage', 'vegetable'),
(68, 'Pumpkin', 'vegetable'),
(69, 'Butternut Squash', 'vegetable'),
(70, 'Radish', 'vegetable'),
(71, 'Okra', 'vegetable'),
(72, 'Green Bean', 'vegetable'),
(73, 'Snap Pea', 'vegetable'),
(74, 'Corn', 'vegetable'),
(75, 'Fennel', 'vegetable'),
(76, 'Bok Choy', 'vegetable'),
(77, 'Endive', 'vegetable'),
(78, 'Duck Breast', 'meat'),
(79, 'Venison', 'meat'),
(80, 'Rabbit', 'meat'),
(81, 'Goat', 'meat'),
(82, 'Bison', 'meat'),
(83, 'Quail', 'meat'),
(84, 'Pheasant', 'meat'),
(85, 'Ostrich', 'meat'),
(86, 'Ham Steak', 'meat'),
(87, 'Liver', 'meat'),
(88, 'Tri-Tip', 'meat'),
(89, 'Salami', 'meat'),
(90, 'Pepperoni', 'meat'),
(91, 'Greek Yogurt', 'dairy'),
(92, 'Gouda Cheese', 'dairy'),
(93, 'Brie', 'dairy'),
(94, 'Camembert', 'dairy'),
(95, 'Blue Cheese', 'dairy'),
(96, 'Ricotta', 'dairy'),
(97, 'Provolone', 'dairy'),
(98, 'Colby Jack', 'dairy'),
(99, 'Evaporated Milk', 'dairy'),
(101, 'Apple', 'fruit'),
(139, 'plum', 'fruit');

-- --------------------------------------------------------

--
-- Table structure for table `meal_plans`
--

CREATE TABLE `meal_plans` (
  `meal_plan_id` int(11) NOT NULL,
  `meal_plan_name` varchar(50) NOT NULL,
  `meal_plan_diet` enum('keto','vegan','vegetarian') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meal_plans`
--

INSERT INTO `meal_plans` (`meal_plan_id`, `meal_plan_name`, `meal_plan_diet`) VALUES
(1, 'Keto High', 'keto'),
(2, 'Veggie', 'vegetarian'),
(3, 'Vegan', 'vegan');

-- --------------------------------------------------------

--
-- Table structure for table `meal_plan_recipes`
--

CREATE TABLE `meal_plan_recipes` (
  `meal_plan_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meal_plan_recipes`
--

INSERT INTO `meal_plan_recipes` (`meal_plan_id`, `recipe_id`) VALUES
(1, 51),
(1, 52),
(1, 53),
(1, 54),
(1, 55),
(1, 56),
(1, 57),
(1, 58),
(1, 59),
(1, 60),
(1, 61),
(1, 62),
(1, 63),
(1, 64),
(3, 65),
(3, 66),
(3, 67),
(3, 68),
(3, 69),
(3, 70),
(3, 71),
(3, 72),
(3, 73),
(3, 74),
(3, 75),
(3, 76),
(3, 77),
(3, 65),
(2, 78),
(2, 79),
(2, 80),
(2, 81),
(2, 82),
(2, 83),
(2, 84),
(2, 85),
(2, 86),
(2, 87),
(2, 88),
(2, 89),
(2, 90),
(2, 78);

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `recipe_id` int(11) NOT NULL,
  `recipe_name` varchar(100) NOT NULL,
  `recipe_diet` enum('vegan','vegetarian','keto') NOT NULL,
  `recipe_difficulty` enum('Easy','Medium','Hard') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`recipe_id`, `recipe_name`, `recipe_diet`, `recipe_difficulty`) VALUES
(1, 'Chicken Salad', 'keto', 'Easy'),
(2, 'Fruit Smoothie', 'vegetarian', 'Easy'),
(3, 'Beef Stew', 'keto', 'Medium'),
(4, 'Veggie Stir Fry', 'vegan', 'Medium'),
(5, 'Tomato Avocado Salad', 'vegan', 'Easy'),
(6, 'Grilled Salmon with Vegetables', 'keto', 'Medium'),
(7, 'Pork Chop with Apples', 'keto', 'Medium'),
(8, 'Shrimp Salad', 'keto', 'Easy'),
(9, 'Vegetarian Pizza', 'vegetarian', 'Hard'),
(10, 'Mixed Fruit Bowl', 'vegetarian', 'Easy'),
(51, 'Grilled Chicken Caesar Salad', 'keto', 'Easy'),
(52, 'Bacon-Wrapped Asparagus', 'keto', 'Medium'),
(53, 'Avocado Egg Boats', 'keto', 'Easy'),
(54, 'Beef Stir-Fry with Broccoli', 'keto', 'Medium'),
(55, 'Zucchini Noodles with Pesto Chicken', 'keto', 'Hard'),
(56, 'Salmon with Creamy Spinach', 'keto', 'Medium'),
(57, 'Garlic Butter Shrimp', 'keto', 'Easy'),
(58, 'Pork Tenderloin with Green Beans', 'keto', 'Medium'),
(59, 'Keto Meatballs in Marinara', 'keto', 'Hard'),
(60, 'Cheesy Cauliflower Rice', 'keto', 'Easy'),
(61, 'Crispy Chicken Wings', 'keto', 'Medium'),
(62, 'Steak with Garlic Mushrooms', 'keto', 'Hard'),
(63, 'Eggplant Lasagna', 'keto', 'Medium'),
(64, 'Spicy Tuna Salad', 'keto', 'Easy'),
(65, 'Quinoa Black Bean Salad', 'vegan', 'Easy'),
(66, 'Vegan Lentil Soup', 'vegan', 'Medium'),
(67, 'Roasted Cauliflower Tacos', 'vegan', 'Hard'),
(68, 'Chickpea Curry', 'vegan', 'Easy'),
(69, 'Vegan Buddha Bowl', 'vegan', 'Medium'),
(70, 'Spicy Tofu Stir-Fry', 'vegan', 'Hard'),
(71, 'Avocado Toast with Tomato', 'vegan', 'Easy'),
(72, 'Vegan Pasta Primavera', 'vegan', 'Medium'),
(73, 'Sweet Potato and Kale Salad', 'vegan', 'Easy'),
(74, 'Vegan Chili', 'vegan', 'Hard'),
(75, 'Zucchini Noodle Salad', 'vegan', 'Easy'),
(76, 'Vegan Burrito Bowl', 'vegan', 'Medium'),
(77, 'Stuffed Bell Peppers', 'vegan', 'Hard'),
(78, 'Caprese Salad', 'vegetarian', 'Easy'),
(79, 'Vegetable Stir-Fry', 'vegetarian', 'Medium'),
(80, 'Spinach and Feta Pie', 'vegetarian', 'Hard'),
(81, 'Mushroom Risotto', 'vegetarian', 'Medium'),
(82, 'Pasta Primavera', 'vegetarian', 'Easy'),
(83, 'Margherita Pizza', 'vegetarian', 'Medium'),
(84, 'Eggplant Parmesan', 'vegetarian', 'Hard'),
(85, 'Butternut Squash Soup', 'vegetarian', 'Easy'),
(86, 'Vegetarian Curry', 'vegetarian', 'Medium'),
(87, 'Greek Salad', 'vegetarian', 'Easy'),
(88, 'Ricotta Gnocchi', 'vegetarian', 'Hard'),
(89, 'Roasted Vegetable Lasagna', 'vegetarian', 'Medium'),
(90, 'Pumpkin Ravioli', 'vegetarian', 'Hard');

-- --------------------------------------------------------

--
-- Table structure for table `recipe_ingredients`
--

CREATE TABLE `recipe_ingredients` (
  `recipe_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipe_ingredients`
--

INSERT INTO `recipe_ingredients` (`recipe_id`, `ingredient_id`) VALUES
(1, 21),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(2, 2),
(2, 6),
(2, 5),
(2, 4),
(2, 33),
(3, 22),
(3, 19),
(3, 11),
(3, 18),
(3, 15),
(4, 12),
(4, 11),
(4, 17),
(4, 18),
(4, 46),
(4, 20),
(5, 15),
(5, 44),
(5, 16),
(5, 14),
(5, 18),
(6, 49),
(6, 12),
(6, 11),
(6, 18),
(7, 23),
(7, 18),
(8, 27),
(8, 14),
(8, 15),
(8, 16),
(8, 44),
(9, 15),
(9, 17),
(9, 18),
(9, 46),
(9, 39),
(10, 2),
(10, 3),
(10, 6),
(10, 43),
(51, 21),
(51, 14),
(51, 35),
(51, 50),
(52, 30),
(52, 55),
(52, 22),
(52, 18),
(53, 44),
(53, 15),
(53, 50),
(53, 51),
(54, 22),
(54, 12),
(54, 18),
(54, 50),
(55, 21),
(55, 20),
(55, 52),
(55, 50),
(56, 49),
(56, 13),
(56, 50),
(56, 18),
(57, 27),
(57, 50),
(57, 18),
(57, 51),
(58, 23),
(58, 22),
(58, 50),
(58, 18),
(59, 21),
(59, 18),
(59, 53),
(59, 50),
(60, 56),
(60, 35),
(60, 50),
(60, 18),
(61, 21),
(61, 50),
(61, 18),
(61, 57),
(62, 22),
(62, 46),
(62, 18),
(62, 50),
(63, 17),
(63, 35),
(63, 15),
(63, 52),
(64, 58),
(64, 14),
(64, 50),
(64, 51),
(65, 59),
(65, 60),
(65, 10),
(65, 61),
(66, 62),
(66, 11),
(66, 18),
(66, 63),
(67, 64),
(67, 65),
(67, 10),
(67, 66),
(68, 67),
(68, 18),
(68, 68),
(68, 10),
(69, 59),
(69, 60),
(69, 11),
(69, 14),
(70, 69),
(70, 12),
(70, 18),
(70, 70),
(71, 44),
(71, 10),
(71, 71),
(71, 50),
(72, 72),
(72, 10),
(72, 12),
(72, 14),
(73, 73),
(73, 13),
(73, 10),
(73, 50),
(74, 60),
(74, 67),
(74, 10),
(74, 68),
(75, 20),
(75, 14),
(75, 10),
(75, 50),
(76, 60),
(76, 59),
(76, 10),
(76, 14),
(77, 17),
(77, 60),
(77, 10),
(77, 11),
(78, 15),
(78, 35),
(78, 14),
(78, 50),
(79, 12),
(79, 11),
(79, 18),
(79, 17),
(80, 13),
(80, 35),
(80, 10),
(80, 50),
(81, 46),
(81, 72),
(81, 18),
(81, 50),
(82, 72),
(82, 10),
(82, 12),
(82, 14),
(83, 10),
(83, 35),
(83, 14),
(83, 50),
(84, 17),
(84, 35),
(84, 10),
(84, 52),
(85, 74),
(85, 18),
(85, 63),
(85, 50),
(86, 10),
(86, 18),
(86, 67),
(86, 68),
(87, 10),
(87, 14),
(87, 35),
(87, 50),
(88, 73),
(88, 72),
(88, 10),
(88, 50),
(89, 12),
(89, 11),
(89, 17),
(89, 35),
(90, 74),
(90, 72),
(90, 73),
(90, 50);

-- --------------------------------------------------------

--
-- Table structure for table `security_questions`
--

CREATE TABLE `security_questions` (
  `question_id` int(11) NOT NULL,
  `question_text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `security_questions`
--

INSERT INTO `security_questions` (`question_id`, `question_text`) VALUES
(1, 'What is your mother\'s maiden name?'),
(2, 'What was the name of your first pet?'),
(3, 'In what city were you born?');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_role` enum('regular','premium','admin') NOT NULL DEFAULT 'regular',
  `user_diet` enum('keto','vegan','vegetarian') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `user_email`, `user_password`, `user_role`, `user_diet`) VALUES
(10027, 'KamenG9', 'kvg009@aubg.edu', '$2y$10$pIrWA1ts2lmdsxre.Q0ZeOJLVszOJy822Pf89c9z/cBOAIcdkk.9O', 'premium', 'vegan'),
(10031, 'KamenG8', 'kvg008@aubg.edu', '$2y$10$ZzhRIK9dxd1jnH2KoaP1F.XfZ.82t..ewUMRVmZrqd5YO81oMkjZm', 'regular', NULL),
(10032, 'Admin1', 'admin@aubg.edu', '$2y$10$QlEmI2xxZ6w32GRtOHReGuaLgSfJv9LbgH.ALbdZvi1bDcy8FTNQe', 'admin', NULL);
-- user with ID 10032 is admin with password - 'AD1190P9a', username is 'Admin1'

-- --------------------------------------------------------

--
-- Table structure for table `user_favorite_recipes`
--

CREATE TABLE `user_favorite_recipes` (
  `user_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_favorite_recipes`
--

INSERT INTO `user_favorite_recipes` (`user_id`, `recipe_id`) VALUES
(10027, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_inventory`
--

CREATE TABLE `user_inventory` (
  `inventory_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `unit_measure` enum('kg','g','l','ml','units') DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `expiration_date` date NOT NULL,
  `comment` varchar(50) DEFAULT NULL,
  `date_added` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_inventory`
--

INSERT INTO `user_inventory` (`inventory_id`, `user_id`, `ingredient_id`, `unit_measure`, `quantity`, `expiration_date`, `comment`, `date_added`) VALUES
(139, 10027, 21, 'units', 3.00, '2025-04-20', '', '2025-04-16'),
(140, 10027, 14, 'units', 1.00, '2025-04-23', 'from Billa', '2025-04-16'),
(141, 10027, 15, 'kg', 2.00, '2025-04-19', '', '2025-04-16'),
(142, 10027, 6, 'units', 3.00, '2025-04-22', '', '2025-04-16'),
(143, 10027, 53, 'units', 4.00, '2025-04-21', 'brought from Zanzibar', '2025-04-16'),
(144, 10031, 22, 'units', 3.00, '2025-05-01', '', '2025-04-16'),
(145, 10031, 15, 'kg', 3.00, '2025-05-02', '', '2025-04-16');

-- --------------------------------------------------------

--
-- Table structure for table `user_security`
--

CREATE TABLE `user_security` (
  `user_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `security_answer` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_security`
--

INSERT INTO `user_security` (`user_id`, `question_id`, `security_answer`) VALUES
(10027, 3, '$2y$10$FFgFn.HnwU4Dt4nRg5Pi4e9AypXDXccFVe3DbjyxDZnxPs0Uihtk2'),
(10031, 3, '$2y$10$oy5jR5LLbKeLM2Ol6YgYlOaxBbr.1kZ5Iyb7FvL3CDOnLYrxvec4i'),
(10032, 3, '$2y$10$U7I.OTsFx3mth0fHxDkCgehYlGKno9mq7cFrp2oI3C9hss0TU12x.');


-- --------------------------------------------------------

--
-- Table structure for table `user_shopping_list`
--

CREATE TABLE `user_shopping_list` (
  `shopping_list_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_added` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_shopping_list`
--

INSERT INTO `user_shopping_list` (`shopping_list_id`, `ingredient_id`, `user_id`, `date_added`) VALUES
(192, 18, 10027, '2025-04-16 09:09:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`ingredient_id`),
  ADD UNIQUE KEY `unique_ingredient_name` (`ingredient_name`);

--
-- Indexes for table `meal_plans`
--
ALTER TABLE `meal_plans`
  ADD PRIMARY KEY (`meal_plan_id`) USING BTREE;

--
-- Indexes for table `meal_plan_recipes`
--
ALTER TABLE `meal_plan_recipes`
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `meal_plan_id` (`meal_plan_id`) USING BTREE;

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`recipe_id`);

--
-- Indexes for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- Indexes for table `security_questions`
--
ALTER TABLE `security_questions`
  ADD PRIMARY KEY (`question_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- Indexes for table `user_favorite_recipes`
--
ALTER TABLE `user_favorite_recipes`
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `user_id` (`user_id`,`recipe_id`) USING BTREE;

--
-- Indexes for table `user_inventory`
--
ALTER TABLE `user_inventory`
  ADD PRIMARY KEY (`inventory_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- Indexes for table `user_security`
--
ALTER TABLE `user_security`
  ADD KEY `fk_user_security_question` (`question_id`),
  ADD KEY `user_id` (`user_id`,`question_id`) USING BTREE;

--
-- Indexes for table `user_shopping_list`
--
ALTER TABLE `user_shopping_list`
  ADD PRIMARY KEY (`shopping_list_id`),
  ADD KEY `ingredient_id` (`ingredient_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `ingredient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT for table `meal_plans`
--
ALTER TABLE `meal_plans`
  MODIFY `meal_plan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `recipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `security_questions`
--
ALTER TABLE `security_questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10033;

--
-- AUTO_INCREMENT for table `user_inventory`
--
ALTER TABLE `user_inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT for table `user_shopping_list`
--
ALTER TABLE `user_shopping_list`
  MODIFY `shopping_list_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `meal_plan_recipes`
--
ALTER TABLE `meal_plan_recipes`
  ADD CONSTRAINT `meal_plan_recipes_ibfk_1` FOREIGN KEY (`meal_plan_id`) REFERENCES `meal_plans` (`meal_plan_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `meal_plan_recipes_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE;

--
-- Constraints for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD CONSTRAINT `recipe_ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `recipe_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_favorite_recipes`
--
ALTER TABLE `user_favorite_recipes`
  ADD CONSTRAINT `user_favorite_recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_favorite_recipes_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_inventory`
--
ALTER TABLE `user_inventory`
  ADD CONSTRAINT `user_inventory_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_inventory_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_security`
--
ALTER TABLE `user_security`
  ADD CONSTRAINT `fk_user_security_question` FOREIGN KEY (`question_id`) REFERENCES `security_questions` (`question_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user_security_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_security_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_security_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `security_questions` (`question_id`);

--
-- Constraints for table `user_shopping_list`
--
ALTER TABLE `user_shopping_list`
  ADD CONSTRAINT `user_shopping_list_ibfk_1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_shopping_list_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;
