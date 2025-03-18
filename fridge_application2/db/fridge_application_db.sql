-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2025 at 07:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fridge_application_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `ingredient_id` int(11) NOT NULL,
  `ingredient_name` varchar(100) NOT NULL,
  `ingredient_type` enum('fruit','vegetable','meat','dairy') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`ingredient_id`, `ingredient_name`, `ingredient_type`) VALUES
(1, 'Apple', 'fruit'),
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
(99, 'Evaporated Milk', 'dairy');

-- --------------------------------------------------------

--
-- Table structure for table `meal_plans`
--

CREATE TABLE `meal_plans` (
  `meal_plan_id` int(11) NOT NULL,
  `meal_plan_name` varchar(50) NOT NULL,
  `meal_plan_diet` enum('keto','vegan','vegetarian') NOT NULL,
  `recipe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meal_plans`
--

INSERT INTO `meal_plans` (`meal_plan_id`, `meal_plan_name`, `meal_plan_diet`, `recipe_id`) VALUES
(1, 'Keto high', 'keto', 51),
(2, 'Keto high', 'keto', 52),
(3, 'Keto high', 'keto', 53),
(4, 'Keto high', 'keto', 54),
(5, 'Keto high', 'keto', 55),
(6, 'Keto high', 'keto', 56),
(7, 'Keto high', 'keto', 57),
(8, 'Keto high', 'keto', 58),
(9, 'Keto high', 'keto', 59),
(10, 'Keto high', 'keto', 60),
(11, 'Keto high', 'keto', 61),
(12, 'Keto high', 'keto', 62),
(13, 'Keto high', 'keto', 63),
(14, 'Keto high', 'keto', 64),
(15, 'Vegan plan', 'vegan', 65),
(16, 'Vegan plan', 'vegan', 66),
(17, 'Vegan plan', 'vegan', 67),
(18, 'Vegan plan', 'vegan', 68),
(19, 'Vegan plan', 'vegan', 69),
(20, 'Vegan plan', 'vegan', 70),
(21, 'Vegan plan', 'vegan', 71),
(22, 'Vegan plan', 'vegan', 72),
(23, 'Vegan plan', 'vegan', 73),
(24, 'Vegan plan', 'vegan', 74),
(25, 'Vegan plan', 'vegan', 75),
(26, 'Vegan plan', 'vegan', 76),
(27, 'Vegan plan', 'vegan', 77),
(28, 'Vegan plan', 'vegan', 65),
(29, 'Veggie', 'vegetarian', 78),
(30, 'Veggie', 'vegetarian', 79),
(31, 'Veggie', 'vegetarian', 80),
(32, 'Veggie', 'vegetarian', 81),
(33, 'Veggie', 'vegetarian', 82),
(34, 'Veggie', 'vegetarian', 83),
(35, 'Veggie', 'vegetarian', 84),
(36, 'Veggie', 'vegetarian', 85),
(37, 'Veggie', 'vegetarian', 86),
(38, 'Veggie', 'vegetarian', 87),
(39, 'Veggie', 'vegetarian', 88),
(40, 'Veggie', 'vegetarian', 89),
(41, 'Veggie', 'vegetarian', 90),
(42, 'Veggie', 'vegetarian', 78);

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
  `id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipe_ingredients`
--

INSERT INTO `recipe_ingredients` (`id`, `recipe_id`, `ingredient_id`) VALUES
(1, 1, 21),
(2, 1, 14),
(3, 1, 15),
(4, 1, 16),
(5, 1, 17),
(6, 2, 2),
(7, 2, 6),
(8, 2, 5),
(9, 2, 4),
(10, 2, 33),
(11, 3, 22),
(12, 3, 19),
(13, 3, 11),
(14, 3, 18),
(15, 3, 15),
(16, 4, 12),
(17, 4, 11),
(18, 4, 17),
(19, 4, 18),
(20, 4, 46),
(21, 4, 20),
(22, 5, 15),
(23, 5, 44),
(24, 5, 16),
(25, 5, 14),
(26, 5, 18),
(27, 6, 49),
(28, 6, 12),
(29, 6, 11),
(30, 6, 18),
(31, 7, 23),
(32, 7, 1),
(33, 7, 18),
(34, 8, 27),
(35, 8, 14),
(36, 8, 15),
(37, 8, 16),
(38, 8, 44),
(39, 9, 15),
(40, 9, 17),
(41, 9, 18),
(42, 9, 46),
(43, 9, 39),
(44, 10, 1),
(45, 10, 2),
(46, 10, 3),
(47, 10, 6),
(48, 10, 43),
(49, 51, 21),
(50, 51, 14),
(51, 51, 35),
(52, 51, 50),
(53, 52, 30),
(54, 52, 55),
(55, 52, 22),
(56, 52, 18),
(57, 53, 44),
(58, 53, 15),
(59, 53, 50),
(60, 53, 51),
(61, 54, 22),
(62, 54, 12),
(63, 54, 18),
(64, 54, 50),
(65, 55, 21),
(66, 55, 20),
(67, 55, 52),
(68, 55, 50),
(69, 56, 49),
(70, 56, 13),
(71, 56, 50),
(72, 56, 18),
(73, 57, 27),
(74, 57, 50),
(75, 57, 18),
(76, 57, 51),
(77, 58, 23),
(78, 58, 22),
(79, 58, 50),
(80, 58, 18),
(81, 59, 21),
(82, 59, 18),
(83, 59, 53),
(84, 59, 50),
(85, 60, 56),
(86, 60, 35),
(87, 60, 50),
(88, 60, 18),
(89, 61, 21),
(90, 61, 50),
(91, 61, 18),
(92, 61, 57),
(93, 62, 22),
(94, 62, 46),
(95, 62, 18),
(96, 62, 50),
(97, 63, 17),
(98, 63, 35),
(99, 63, 15),
(100, 63, 52),
(101, 64, 58),
(102, 64, 14),
(103, 64, 50),
(104, 64, 51),
(105, 65, 59),
(106, 65, 60),
(107, 65, 10),
(108, 65, 61),
(109, 66, 62),
(110, 66, 11),
(111, 66, 18),
(112, 66, 63),
(113, 67, 64),
(114, 67, 65),
(115, 67, 10),
(116, 67, 66),
(117, 68, 67),
(118, 68, 18),
(119, 68, 68),
(120, 68, 10),
(121, 69, 59),
(122, 69, 60),
(123, 69, 11),
(124, 69, 14),
(125, 70, 69),
(126, 70, 12),
(127, 70, 18),
(128, 70, 70),
(129, 71, 44),
(130, 71, 10),
(131, 71, 71),
(132, 71, 50),
(133, 72, 72),
(134, 72, 10),
(135, 72, 12),
(136, 72, 14),
(137, 73, 73),
(138, 73, 13),
(139, 73, 10),
(140, 73, 50),
(141, 74, 60),
(142, 74, 67),
(143, 74, 10),
(144, 74, 68),
(145, 75, 20),
(146, 75, 14),
(147, 75, 10),
(148, 75, 50),
(149, 76, 60),
(150, 76, 59),
(151, 76, 10),
(152, 76, 14),
(153, 77, 17),
(154, 77, 60),
(155, 77, 10),
(156, 77, 11),
(157, 78, 15),
(158, 78, 35),
(159, 78, 14),
(160, 78, 50),
(161, 79, 12),
(162, 79, 11),
(163, 79, 18),
(164, 79, 17),
(165, 80, 13),
(166, 80, 35),
(167, 80, 10),
(168, 80, 50),
(169, 81, 46),
(170, 81, 72),
(171, 81, 18),
(172, 81, 50),
(173, 82, 72),
(174, 82, 10),
(175, 82, 12),
(176, 82, 14),
(177, 83, 10),
(178, 83, 35),
(179, 83, 14),
(180, 83, 50),
(181, 84, 17),
(182, 84, 35),
(183, 84, 10),
(184, 84, 52),
(185, 85, 74),
(186, 85, 18),
(187, 85, 63),
(188, 85, 50),
(189, 86, 10),
(190, 86, 18),
(191, 86, 67),
(192, 86, 68),
(193, 87, 10),
(194, 87, 14),
(195, 87, 35),
(196, 87, 50),
(197, 88, 73),
(198, 88, 72),
(199, 88, 10),
(200, 88, 50),
(201, 89, 12),
(202, 89, 11),
(203, 89, 17),
(204, 89, 35),
(205, 90, 74),
(206, 90, 72),
(207, 90, 73),
(208, 90, 50);

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
(1, 'Kambata9', 'Sleepysheep9@gmail.com', 'a77bcf639cd61a7222704611bf507f9b8754f7566e950f2204947bfd72f62c62', 'premium', NULL),
(2, 'Kambata1', 'kambata1@gmail.com', '$2y$10$PIRZNlMRh5xYbNRZa65uF.1ra.dfvobeVFXzIOhW17eikAkD6xIAu', 'regular', NULL),
(3, 'Kambata8', 'Sleepysheep8@gmail.com', '$2y$10$fXVRT9wXe2f3jwDb9atKIu.bMjJFyV.HPcV5Ky5F7DPKLJ/h0eaTK', 'premium', 'vegetarian'),
(4, 'Anzza', 'ana.sarandeva@yahoo.com', '$2y$10$ZkMUKUqTeDY6CWS/Y12O4eHA8WVV9wCk73sUWPpgqHtbv6hMc9T7m', 'regular', NULL),
(5, 'Kambata7', 'Sleepysheep7@gmail.com', '$2y$10$EElRZXOwopuo4Teh.UkB/OGbZ42t9u5MXq3laNvewsnv0xwUfZyWS', 'premium', 'vegan'),
(6, 'Kon Kon', 'anasarandeva@gmail.com', '$2y$10$lr4s3E5Xg7iuivkWmRgr4uBumBZUOLpV8XrCu78WVZoz3/yxijpKW', 'regular', NULL),
(7, 'kamencho', 'kamencho@gmail.com', '$2y$10$33uT4El6tHJjLzg9JvSB3umBv9olguFJyK8vfYmtSTWqkoVATqbPe', 'premium', NULL),
(8, 'Kamencho1', 'kamencho1@gmail.com', '$2y$10$cMfFz8OxkbB7BsxG9/dEnuLTRrCGn3xy9tpkDUMztiOn4hJ17A1Um', 'regular', NULL),
(9, 'kamencho2', 'kamencho2@gmail.com', '$2y$10$fZWl0241ctNOkcke4aNBDOTO9BE83tIiN0k6hMeEjbclU8XvPPYNW', 'premium', 'vegetarian'),
(10, 'Kamencho3', 'Kamencho3@gmail.com', '$2y$10$pEB4hnCrtxVB0yfLZGR.NueIGFtuebo5s0Pq2xCbmzjdnrbHshokK', 'premium', 'vegetarian');

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
(3, 8),
(4, 10),
(10, 1);

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
(17, 4, 2, 'kg', 45.00, '6789-03-03', '', '2025-02-22'),
(18, 4, 7, 'g', 12.00, '2025-02-13', '', '2025-02-22'),
(21, 5, 8, 'units', 3.00, '2025-03-05', '', '2025-02-27'),
(22, 5, 2, 'units', 3.00, '2025-03-07', '', '2025-02-27'),
(23, 5, 6, 'units', 2.00, '2025-03-05', '', '2025-02-27'),
(27, 6, 8, 'kg', 1.00, '2025-03-05', '', '2025-02-28'),
(28, 9, 10, 'g', 3.00, '2025-03-05', '', '2025-02-28'),
(29, 9, 21, 'units', 2.00, '2025-02-27', '', '2025-02-28'),
(30, 9, 14, 'kg', 1.00, '2025-03-06', '', '2025-02-28'),
(31, 9, 47, 'g', 800.00, '2025-03-04', '', '2025-02-28'),
(34, 10, 8, '', 0.00, '2025-03-05', '', '2025-02-28'),
(35, 10, 9, 'units', 2.00, '2025-03-05', '', '2025-02-28'),
(36, 10, 13, 'kg', 1.00, '2025-03-05', '123', '2025-02-28'),
(37, 10, 22, '', 0.00, '2025-03-08', '', '2025-02-28'),
(38, 10, 6, 'units', 3.00, '2025-02-23', '', '2025-02-28'),
(39, 10, 14, 'units', 2.00, '2025-03-05', '', '2025-02-28'),
(40, 10, 21, 'units', 2.00, '2025-03-05', '', '2025-02-28'),
(90, 3, 7, 'g', 2.00, '2025-03-13', '', '2025-03-05'),
(93, 3, 11, '', 0.00, '2025-03-13', '', '2025-03-05'),
(94, 5, 18, '', 0.00, '2025-03-19', '', '2025-03-05'),
(95, 5, 8, 'l', 0.00, '2025-03-12', '', '2025-03-05'),
(96, 5, 20, 'g', 3.00, '2025-03-12', '', '2025-03-05'),
(97, 3, 9, 'units', 2.00, '2025-03-13', '', '2025-03-06'),
(98, 3, 21, 'units', 2.00, '2025-03-13', '', '2025-03-06'),
(99, 3, 14, 'units', 2.00, '2025-03-13', '', '2025-03-06');

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
(24, 14, 4, '2025-02-22 15:42:35'),
(25, 15, 4, '2025-02-22 15:42:35'),
(26, 16, 4, '2025-02-22 15:42:35'),
(27, 17, 4, '2025-02-22 15:42:35'),
(28, 1, 4, '2025-02-22 15:43:30'),
(29, 2, 4, '2025-02-22 15:43:30'),
(30, 3, 4, '2025-02-22 15:43:30'),
(31, 6, 4, '2025-02-22 15:43:30'),
(32, 43, 4, '2025-02-22 15:43:30'),
(36, 21, 4, '2025-02-22 15:53:11'),
(37, 14, 4, '2025-02-22 15:53:11'),
(38, 15, 4, '2025-02-22 15:53:11'),
(39, 16, 4, '2025-02-22 15:53:11'),
(40, 17, 4, '2025-02-22 15:53:11'),
(53, 6, 3, '2025-02-28 13:33:50'),
(54, 4, 3, '2025-02-28 13:33:57'),
(55, 15, 9, '2025-02-28 17:08:26'),
(56, 16, 9, '2025-02-28 17:08:26'),
(57, 17, 9, '2025-02-28 17:08:26'),
(58, 15, 10, '2025-02-28 17:41:33'),
(59, 16, 10, '2025-02-28 17:41:33'),
(60, 17, 10, '2025-02-28 17:41:33'),
(61, 7, 3, '2025-03-05 17:48:46'),
(62, 6, 3, '2025-03-06 19:03:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`ingredient_id`);

--
-- Indexes for table `meal_plans`
--
ALTER TABLE `meal_plans`
  ADD PRIMARY KEY (`meal_plan_id`,`recipe_id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`recipe_id`);

--
-- Indexes for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

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
  ADD PRIMARY KEY (`user_id`,`recipe_id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `user_inventory`
--
ALTER TABLE `user_inventory`
  ADD PRIMARY KEY (`inventory_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

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
  MODIFY `ingredient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `meal_plans`
--
ALTER TABLE `meal_plans`
  MODIFY `meal_plan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `recipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=209;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_inventory`
--
ALTER TABLE `user_inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `user_shopping_list`
--
ALTER TABLE `user_shopping_list`
  MODIFY `shopping_list_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `meal_plans`
--
ALTER TABLE `meal_plans`
  ADD CONSTRAINT `meal_plans_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE;

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
-- Constraints for table `user_shopping_list`
--
ALTER TABLE `user_shopping_list`
  ADD CONSTRAINT `user_shopping_list_ibfk_1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_shopping_list_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
