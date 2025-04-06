<?php
global $conn;
header('Content-Type: application/json');
include 'db_connection.php';

try {
    $stmt = $conn->prepare("SELECT ingredient_id, ingredient_name, ingredient_type FROM ingredients");
    $stmt->execute();
    $ingredients = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'ingredients' => $ingredients]);
} catch(Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error fetching ingredients.']);
}

