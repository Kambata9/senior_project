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
if(!$data || !isset($data['ingredient_name'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    exit;
}

$ingredient_name = trim($data['ingredient_name']);
if(empty($ingredient_name)) {
    echo json_encode(['success' => false, 'message' => 'Ingredient name is required.']);
    exit;
}

// Look up ingredient_id from ingredients table (case-insensitive match)
$stmt = $conn->prepare("SELECT ingredient_id FROM ingredients WHERE LOWER(ingredient_name) = LOWER(:ingredient_name)");
$stmt->execute(['ingredient_name' => $ingredient_name]);
$ingredient = $stmt->fetch(PDO::FETCH_ASSOC);
if(!$ingredient) {
    echo json_encode(['success' => false, 'message' => 'Ingredient not found in the system.']);
    exit;
}

$user_id = $_SESSION['user']['user_id'];
$date_added = date("Y-m-d H:i:s");

try {
    $stmt = $conn->prepare("INSERT INTO user_shopping_list (ingredient_id, user_id, date_added) VALUES (:ingredient_id, :user_id, :date_added)");
    $stmt->execute([
        'ingredient_id' => $ingredient['ingredient_id'],
        'user_id'       => $user_id,
        'date_added'    => $date_added
    ]);
    echo json_encode(['success' => true, 'message' => 'Ingredient successfully added to shopping list.']);
} catch(Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error adding item to shopping list.']);
}

