<?php
global $conn;
require 'db_connection.php';

try {
    $stmt = $conn->query("SELECT ingredient_id, ingredient_name, ingredient_type FROM ingredients ORDER BY ingredient_name ASC");
    $ingredients = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'ingredients' => $ingredients]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error retrieving ingredients.']);
}