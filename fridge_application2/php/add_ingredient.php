<?php
global $conn;
require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['ingredient_name']) || !isset($data['ingredient_type'])) {
    echo json_encode(['success' => false, 'message' => 'Ingredient name and type are required.']);
    exit;
}

$ingredient_name = trim($data['ingredient_name']);
$ingredient_type = $data['ingredient_type'];

try {
    $stmt = $conn->prepare("INSERT INTO ingredients (ingredient_name, ingredient_type) VALUES (:ingredient_name, :ingredient_type)");
    $stmt->execute([
        'ingredient_name' => $ingredient_name,
        'ingredient_type' => $ingredient_type
    ]);
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error adding ingredient.']);
}