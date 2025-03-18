<?php
global $conn;
header('Content-Type: application/json');
session_start();
include 'db_connection.php';

// Ensure user is authenticated and is premium
if(!isset($_SESSION['user']) || $_SESSION['user']['user_role'] !== 'premium') {
    echo json_encode(['success' => false, 'message' => 'Access denied. This functionality is available for premium users only.']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if(!$data || !isset($data['shopping_list_id'])) {
    echo json_encode(['success' => false, 'message' => 'Shopping list ID required.']);
    exit;
}

$shopping_list_id = intval($data['shopping_list_id']);
$user_id = $_SESSION['user']['user_id'];

try {
    $stmt = $conn->prepare("DELETE FROM user_shopping_list WHERE shopping_list_id = :shopping_list_id AND user_id = :user_id");
    $stmt->execute(['shopping_list_id' => $shopping_list_id, 'user_id' => $user_id]);
    echo json_encode(['success' => true, 'message' => 'Item removed from shopping list.']);
} catch(Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error removing item from shopping list.']);
}

