<?php
global $conn;
header('Content-Type: application/json');
session_start();
include 'db_connection.php';

$data = json_decode(file_get_contents("php://input"), true);
if(!$data || !isset($data['inventory_id'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    exit;
}

$inventory_id = $data['inventory_id'];

try {
    $stmt = $conn->prepare("DELETE FROM user_inventory WHERE inventory_id = :inventory_id AND user_id = :user_id");
    $stmt->execute(['inventory_id' => $inventory_id, 'user_id' => $_SESSION['user']['user_id']]);
    echo json_encode(['success' => true, 'message' => 'Item deleted successfully.']);
} catch(Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error deleting item.']);
}

