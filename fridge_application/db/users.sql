CREATE DATABASE IF NOT EXISTS fridge_application_db;
USE fridge_application_db;

-- Create users table in 3rd Normal Form
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_role ENUM('regular','premium','admin') NOT NULL DEFAULT 'regular',
    user_diet ENUM('keto','vegan','vegetarian') DEFAULT NULL
);

CREATE TABLE `user_security` (
  `user_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `security_answer` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `user_security`
  ADD PRIMARY KEY (`user_id`,`question_id`),
  ADD KEY `question_id` (`question_id`);

ALTER TABLE `user_security`
  ADD CONSTRAINT `user_security_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_security_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `security_questions` (`question_id`);
COMMIT;

CREATE TABLE `security_questions` (
  `question_id` int(11) NOT NULL PRIMARY KEY,
  `question_text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
