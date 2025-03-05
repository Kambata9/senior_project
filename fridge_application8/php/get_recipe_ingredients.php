<?php
global $conn;
header('Content-Type: application/json');
include 'db_connection.php';

if(!isset($_GET['recipe_id'])) {
    echo json_encode(['success' => false, 'message' => 'Recipe ID not provided.']);
    exit;
}

$recipe_id = intval($_GET['recipe_id']);

try {
    $stmt = $conn->prepare("SELECT ri.recipe_id, ri.ingredient_id, i.ingredient_name 
                            FROM recipe_ingredients ri 
                            JOIN ingredients i ON ri.ingredient_id = i.ingredient_id 
                            WHERE ri.recipe_id = :recipe_id");
    $stmt->execute(['recipe_id' => $recipe_id]);
    $ingredients = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'ingredients' => $ingredients]);
} catch(Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error fetching recipe ingredients.']);
}

