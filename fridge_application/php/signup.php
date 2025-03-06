<?php
global $conn;
header('Content-Type: application/json');
session_start();
include 'db_connection.php';

$data = json_decode(file_get_contents("php://input"), true);
if(!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    exit;
}

$username = trim($data['username']);
$email = trim($data['email']);
$password = $data['password'];

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("SELECT * FROM users WHERE username = :username OR user_email = :email");
$stmt->execute(['username' => $username, 'email' => $email]);
if($stmt->rowCount() > 0) {
    echo json_encode(['success' => false, 'message' => 'Username or Email already exists.']);
    exit;
}

$stmt = $conn->prepare("INSERT INTO users (username, user_email, user_password, user_role, user_diet) VALUES (:username, :email, :password, 'regular', NULL)");
if($stmt->execute(['username' => $username, 'email' => $email, 'password' => $hashedPassword])) {
    $_SESSION['user'] = ['username' => $username, 'user_email' => $email, 'user_role' => 'regular', 'user_diet' => null];
    echo json_encode(['success' => true, 'user_email' => $email, 'user_role' => 'regular', 'user_diet' => null]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error creating account.']);
}

