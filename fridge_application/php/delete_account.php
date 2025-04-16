<?php
global $conn;
session_start();
header('Content-Type: application/json');
include 'db_connection.php';

// Check if user is authenticated
if (!isset($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'User not authenticated.']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (!$data || !isset($data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    exit;
}

$userId = $_SESSION['user']['user_id'];
$passwordInput = $data['password'];

// Retrieve the user's hashed password from the database
$stmt = $conn->prepare("SELECT user_password FROM users WHERE user_id = :user_id");
$stmt->execute(['user_id' => $userId]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    echo json_encode(['success' => false, 'message' => 'User not found.']);
    exit;
}

// Verify the provided password
if (!password_verify($passwordInput, $user['user_password'])) {
    echo json_encode(['success' => false, 'message' => 'Incorrect password.']);
    exit;
}

// Delete user data from the main table.

$stmtDel = $conn->prepare("DELETE FROM users WHERE user_id = :user_id");
if ($stmtDel->execute(['user_id' => $userId])) {
    session_destroy();
    echo json_encode(['success' => true, 'message' => 'Account deleted successfully.']);
}  else {
    error_log(print_r($stmtDel->errorInfo(), true));
    echo json_encode(['success' => false, 'message' => 'Error deleting account.']);
    exit;
}





