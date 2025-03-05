<?php
global $conn;
header('Content-Type: application/json');
session_start();
include 'db_connection.php';

if(!isset($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'User not authenticated.']);
    exit;
}

$user_id = $_SESSION['user']['user_id'];

try {
    // Get user's inventory ingredient IDs
    $stmt = $conn->prepare("SELECT ingredient_id FROM user_inventory WHERE user_id = :user_id");
    $stmt->execute(['user_id' => $user_id]);
    $inventory = $stmt->fetchAll(PDO::FETCH_COLUMN);

    if(empty($inventory)) {
        echo json_encode(['success' => true, 'suggestedRecipes' => []]);
        exit;
    }

    // Find recipes with at least 2 matching ingredients
    $sql = "SELECT r.recipe_id, r.recipe_name, r.recipe_diet, r.recipe_difficulty, COUNT(*) as match_count
            FROM recipes r
            JOIN recipe_ingredients ri ON r.recipe_id = ri.recipe_id
            WHERE ri.ingredient_id IN (" . implode(',', array_map('intval', $inventory)) . ")
            GROUP BY r.recipe_id
            HAVING match_count >= 2";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $suggestedRecipes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'suggestedRecipes' => $suggestedRecipes]);
} catch(Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error fetching recipe suggestions.']);
}

