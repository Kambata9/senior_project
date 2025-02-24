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

$identifier = trim($data['identifier']);
$password = $data['password'];

if(empty($identifier) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM users WHERE username = :identifier OR user_email = :identifier");
$stmt->execute(['identifier' => $identifier]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if($user && password_verify($password, $user['user_password'])) {
    $_SESSION['user'] = $user;
    echo json_encode(['success' => true, 'user_email' => $user['user_email'], 'user_role' => $user['user_role'], 'user_diet' => $user['user_diet']]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials.']);
}

