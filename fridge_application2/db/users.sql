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

