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

if(empty($username) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
    exit;
}

if(!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/', $password)) {
    echo json_encode(['success' => false, 'message' => 'Password does not meet requirements.']);
    exit;
}

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

