<?php
global $conn;
header('Content-Type: application/json');
session_start();
include 'db_connection.php';

if(!isset($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'User not authenticated.']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if(!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    exit;
}

$username = trim($data['username']);
$oldPassword = $data['oldPassword'];
$newPassword = $data['newPassword'];

if(empty($username) || empty($oldPassword) || empty($newPassword)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

$user = $_SESSION['user'];
if($username !== $user['username'] || !password_verify($oldPassword, $user['user_password'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid username or old password.']);
    exit;
}

if(!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/', $newPassword)) {
    echo json_encode(['success' => false, 'message' => 'New password does not meet requirements.']);
    exit;
}

$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
$stmt = $conn->prepare("UPDATE users SET user_password = :password WHERE user_id = :user_id");
if($stmt->execute(['password' => $hashedPassword, 'user_id' => $user['user_id']])) {
    $_SESSION['user']['user_password'] = $hashedPassword;
    echo json_encode(['success' => true, 'message' => 'Password updated successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error updating password.']);
}

