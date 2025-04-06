# senior_project
Fridge Inventory Management System

The Fridge Inventory Management System is a web-based application designed to help households reduce food waste by efficiently managing kitchen inventories and planning meals. This system allows users to add, edit, delete, and view inventory items, track expiration dates, and receive recipe recommendations based on available ingredients. It further supports the generation of personalized 7-day meal plans that consider users’ dietary preferences and favorite recipes, and it includes a dedicated shopping list management feature for missing ingredients. The application is structured around three main tiers: the frontend, built with HTML, CSS, and JavaScript (with AJAX for dynamic interactions); the backend, developed in PHP using PDO for secure database interactions; and the database, which is powered by MySQL.

Features
	•	Inventory Management: Users can add, update, and remove items from their inventory with real-time sorting and filtering.
	•	Recipe Recommendations: The system suggests recipes based on items currently in the inventory.
	•	Meal Plan Generation: Automatically generates weekly meal plans based on dietary preferences and favorite recipes.
	•	Shopping List Management: Automatically adds missing ingredients for selected recipes, while also allowing manual adjustments.
	•	User Authentication: Secure user registration, login, and password recovery processes.
	•	Administrative Functions: An admin dashboard is provided for managing ingredients, user accounts, and system metrics.

Technologies

The application utilizes a robust stack with HTML, CSS, and JavaScript on the frontend to deliver an intuitive and responsive user interface. PHP is used on the backend to handle business logic and secure data processing, while MySQL serves as the database system to manage persistent data efficiently. This combination was selected due to its maturity, ease of integration, strong community support, and proven reliability in building web applications.

Installation and Deployment

Local Development with XAMPP
	1.	Install XAMPP: Download and install XAMPP to obtain Apache, MySQL, and PHP in one package.
	2.	Clone the Repository: Clone this repository to your local machine and copy the project files into the htdocs directory of your XAMPP installation.
	3.	Start Services: Open the XAMPP Control Panel and start the Apache and MySQL services.
	4.	Database Setup: Access phpMyAdmin at http://localhost/phpmyadmin and create a new database (e.g., fridge_inventory_db). Import the provided SQL schema file (fridge_application_db.sql) to set up the necessary tables and relationships.
	5.	Configure Connection: Update the database connection settings in db_connection.php to reflect your local MySQL credentials (commonly username root and an empty password).
	6.	Run the Application: Open your web browser and navigate to http://localhost/your_project_folder to start using the application.

Production Deployment

Deploying the application in a production environment involves several key steps to ensure security, reliability, and performance. First, choose a reliable hosting provider or cloud service that supports a LAMP/LEMP stack, such as AWS, DigitalOcean, or Linode. Set up the production server by installing and configuring Apache (or Nginx), PHP, and MySQL, and secure the server by applying the latest patches, configuring firewalls, and installing an SSL certificate to enable HTTPS. Transfer your entire codebase to the production server using Git or SFTP, and import the SQL schema into the production MySQL database. Update configuration files (like db_connection.php) with production credentials, and adjust file permissions to protect sensitive data. Finally, thoroughly test the deployed application to ensure that all features, including dynamic AJAX interactions and secure user sessions, function correctly before making the system live.

Usage

Users can register and log in to manage their inventory, view and save recipe recommendations, generate meal plans, and maintain a shopping list for missing ingredients. Premium users have access to additional functionalities, including dietary preference settings and advanced meal planning, while administrators can manage system-wide data and view performance metrics.

Acknowledgements

This project was developed as part of the INF Senior Project course at AUBG, under the supervision of Prof. Narasimha Rao Vajjhala. Special thanks to the United Nations and various environmental agencies for highlighting the importance of food waste reduction and sustainable practices.

This README provides a comprehensive overview of the Fridge Inventory Management System, its features, technologies, and step-by-step instructions for installation and deployment in both local and production environments.
