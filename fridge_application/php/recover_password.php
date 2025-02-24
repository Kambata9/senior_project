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
$newPassword = isset($data['newPassword']) ? $data['newPassword'] : null;

if(empty($username) || empty($email)) {
    echo json_encode(['success' => false, 'message' => 'Username and Email are required.']);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM users WHERE username = :username AND user_email = :email");
$stmt->execute(['username' => $username, 'email' => $email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if(!$user) {
    echo json_encode(['success' => false, 'message' => 'No matching user found.']);
    exit;
}

if($newPassword) {
    if(!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/', $newPassword)) {
        echo json_encode(['success' => false, 'message' => 'New password does not meet requirements.']);
        exit;
    }
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("UPDATE users SET user_password = :password WHERE user_id = :user_id");
    if($stmt->execute(['password' => $hashedPassword, 'user_id' => $user['user_id']])) {
        echo json_encode(['success' => true, 'message' => 'Password updated successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error updating password.']);
    }
} else {
    echo json_encode(['success' => true, 'message' => 'User verified. Proceed to set new password.']);
}

