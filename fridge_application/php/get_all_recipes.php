<?php
global $conn;
header('Content-Type: application/json');
include 'db_connection.php';

$diet = isset($_GET['diet']) ? trim($_GET['diet']) : "";

try {
    if($diet !== "") {
        $stmt = $conn->prepare("SELECT recipe_id, recipe_name, recipe_diet, recipe_difficulty FROM recipes WHERE recipe_diet = :diet");
        $stmt->execute(['diet' => $diet]);
    } else {
        $stmt = $conn->prepare("SELECT recipe_id, recipe_name, recipe_diet, recipe_difficulty FROM recipes");
        $stmt->execute();
    }
    $recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'recipes' => $recipes]);
} catch(Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error fetching recipes.']);
}

