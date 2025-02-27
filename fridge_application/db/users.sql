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

-- Insert one initial premium user.
-- The password "Megatron!2002" is hashed using PHP's password_hash function.
INSERT INTO users (user_id, username, user_email, user_password, user_role, user_diet)
VALUES (1, 'Kambata9', 'Sleepysheep9@gmail.com', '$2y$10$abcdefghijklmnopqrstuv0123456789ABCDEFGHIJKLMNOPQRSTU', 'premium', 'vegan');
