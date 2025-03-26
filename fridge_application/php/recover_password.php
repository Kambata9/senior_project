<?php
global $conn;
header('Content-Type: application/json');
session_start();
include 'db_connection.php';

// If this is a GET request with a username, return the stored security question
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['username'])) {
    $username = trim($_GET['username']);
    // Retrieve the user's ID based on the username
    $stmt = $conn->prepare("SELECT user_id FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user) {
        echo json_encode(['success' => false, 'message' => 'User not found.']);
        exit;
    }
    // Fetch the question_id from the user_security table
    $stmt_sec = $conn->prepare("SELECT question_id FROM user_security WHERE user_id = :user_id");
    $stmt_sec->execute(['user_id' => $user['user_id']]);
    $security = $stmt_sec->fetch(PDO::FETCH_ASSOC);
    if (!$security) {
        echo json_encode(['success' => false, 'message' => 'Security question not set for this user.']);
        exit;
    }
    // Now fetch the question_text from the security_questions table using the question_id
    $stmt_q = $conn->prepare("SELECT question_text FROM security_questions WHERE question_id = :question_id");
    $stmt_q->execute(['question_id' => $security['question_id']]);
    $question = $stmt_q->fetch(PDO::FETCH_ASSOC);
    if (!$question) {
        echo json_encode(['success' => false, 'message' => 'Security question text not found.']);
        exit;
    }
    echo json_encode(['success' => true, 'security_question' => $question['question_text']]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    error_log("recover_password.php: No data received.");
    echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    exit;
}

$username = trim($data['username']);
$email = trim($data['email']);
$newPassword = $data['newPassword'] ?? '';
$providedSecurityAnswer = trim($data['recoverSecurityAnswer'] ?? '');
if (empty($providedSecurityAnswer)) {
    echo json_encode(['success' => false, 'message' => 'Security answer is required.']);
    exit;
}

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

    // Verify the security answer
    $stmt_sec = $conn->prepare("SELECT security_answer FROM user_security WHERE user_id = :user_id");
    $stmt_sec->execute(['user_id' => $user['user_id']]);
    $security = $stmt_sec->fetch(PDO::FETCH_ASSOC);
    if (!$security) {
        echo json_encode(['success' => false, 'message' => 'Security data not found for this user.']);
        exit;
    }

    if (!password_verify($providedSecurityAnswer, $security['security_answer'])) {
        echo json_encode(['success' => false, 'message' => 'Security answer is incorrect.']);
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

