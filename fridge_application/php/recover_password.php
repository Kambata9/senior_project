<?php
global $conn;
header('Content-Type: application/json');
session_start();
include 'db_connection.php';

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    error_log("recover_password.php: No data received.");
    echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    exit;
}

$username = trim($data['username']);
$email = trim($data['email']);
$newPassword = $data['newPassword'] ?? '';



if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
    exit;
}


try {
    // Look up user by username
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['success' => false, 'message' => 'No matching user found.']);
        exit;
    }

    // Check that the provided email matches the one stored (case-insensitive)
    if (strtolower($user['user_email']) !== strtolower($email)) {
        echo json_encode(['success' => false, 'message' => 'The email provided does not match our records for this username.']);
        exit;
    }

    // Hash the new password and update it for the user
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("UPDATE users SET user_password = :password WHERE user_id = :user_id");
    if ($stmt->execute(['password' => $hashedPassword, 'user_id' => $user['user_id']])) {
        echo json_encode(['success' => true, 'message' => 'Password updated successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error updating password.']);
    }
} catch (Exception $e) {
    error_log("recover_password.php Exception: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'An error occurred.']);
}

