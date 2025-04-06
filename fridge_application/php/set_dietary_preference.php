<?php
global $conn;
header('Content-Type: application/json');
session_start();
include 'db_connection.php';

if(!isset($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'User not authenticated.']);
    exit;
}

if($_SESSION['user']['user_role'] !== 'premium') {
    echo json_encode(['success' => false, 'message' => 'Only premium users can set dietary preferences.']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if(!$data || !isset($data['diet'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    exit;
}

$diet = $data['diet'];
if(!in_array($diet, ['keto', 'vegan', 'vegetarian'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid dietary preference.']);
    exit;
}

$user_id = $_SESSION['user']['user_id'];
$stmt = $conn->prepare("UPDATE users SET user_diet = :diet WHERE user_id = :user_id");
if($stmt->execute(['diet' => $diet, 'user_id' => $user_id])) {
    $_SESSION['user']['user_diet'] = $diet;
    echo json_encode(['success' => true, 'message' => 'Dietary preference updated successfully.', 'user_diet' => $diet]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error updating dietary preference.']);
}

