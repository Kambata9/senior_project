<?php
global $conn;
require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['ingredient_id'])) {
    echo json_encode(['success' => false, 'message' => 'Ingredient ID is required.']);
    exit;
}

$ingredient_id = $data['ingredient_id'];

try {
    $stmt = $conn->prepare("DELETE FROM ingredients WHERE ingredient_id = :ingredient_id");
    $stmt->execute(['ingredient_id' => $ingredient_id]);
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error deleting ingredient.']);
}