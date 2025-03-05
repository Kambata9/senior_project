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

$newEmail = trim($data['newEmail']);

if(empty($newEmail) || !filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email.']);
    exit;
}

$user_id = $_SESSION['user']['user_id'];
$stmt = $conn->prepare("UPDATE users SET user_email = :email WHERE user_id = :user_id");
if($stmt->execute(['email' => $newEmail, 'user_id' => $user_id])) {
    $_SESSION['user']['user_email'] = $newEmail;
    echo json_encode(['success' => true, 'message' => 'Email updated successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error updating email.']);
}

