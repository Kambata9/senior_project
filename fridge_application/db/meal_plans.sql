
CREATE TABLE `meal_plans` (
  `meal_plan_id` int(11) NOT NULL,
  `meal_plan_name` varchar(50) NOT NULL,
  `meal_plan_diet` enum('keto','vegan','vegetarian') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `meal_plans` (`meal_plan_id`, `meal_plan_name`, `meal_plan_diet`) VALUES
(1, 'Keto High', 'keto'),
(2, 'Veggie', 'vegetarian'),
(3, 'Vegan', 'vegan');


ALTER TABLE `meal_plans`
  ADD PRIMARY KEY (`meal_plan_id`) USING BTREE;


ALTER TABLE `meal_plans`
  MODIFY `meal_plan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
COMMIT;


CREATE TABLE `meal_plan_recipes` (
  `meal_plan_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


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


ALTER TABLE `meal_plan_recipes`
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `meal_plan_id` (`meal_plan_id`) USING BTREE;

ALTER TABLE `meal_plan_recipes`
  ADD CONSTRAINT `meal_plan_recipes_ibfk_1` FOREIGN KEY (`meal_plan_id`) REFERENCES `meal_plans` (`meal_plan_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `meal_plan_recipes_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE;
