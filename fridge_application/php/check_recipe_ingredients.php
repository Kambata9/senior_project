<?php
global $conn;
header('Content-Type: application/json');
session_start();
include 'db_connection.php';

if(!isset($_GET['recipe_id'])) {
    echo json_encode(['success' => false, 'message' => 'Recipe ID required.']);
    exit;
}

$recipe_id = intval($_GET['recipe_id']);
$user_id = $_SESSION['user']['user_id'];

try {
    // Get required ingredient IDs for the recipe
    $stmt = $conn->prepare("SELECT ingredient_id FROM recipe_ingredients WHERE recipe_id = :recipe_id");
    $stmt->execute(['recipe_id' => $recipe_id]);
    $required = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // Get user's inventory ingredient IDs
    $stmt = $conn->prepare("SELECT ingredient_id FROM user_inventory WHERE user_id = :user_id");
    $stmt->execute(['user_id' => $user_id]);
    $inventory = $stmt->fetchAll(PDO::FETCH_COLUMN);

    $missing = [];
    $missing_ids = [];
    foreach($required as $rid) {
        if(!in_array($rid, $inventory)) {
            $stmt2 = $conn->prepare("SELECT ingredient_name FROM ingredients WHERE ingredient_id = :id");
            $stmt2->execute(['id' => $rid]);
            $ing = $stmt2->fetch(PDO::FETCH_ASSOC);
            $missing[] = $ing ? $ing['ingredient_name'] : "Ingredient ID $rid";
            $missing_ids[] = $rid;
        }
    }
    echo json_encode(['success' => true, 'missing' => $missing, 'missing_ids' => $missing_ids]);
} catch(Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error checking recipe ingredients.']);
}

