<?php
global $conn;
header('Content-Type: application/json');
session_start();
include 'db_connection.php';

$data = json_decode(file_get_contents("php://input"), true);
if(!$data || !isset($data['recipe_id']) || !isset($data['missing'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    exit;
}

if(!isset($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'User not authenticated.']);
    exit;
}

$user_id = $_SESSION['user']['user_id'];
$missing_ids = $data['missing'];

try {
    $date_added = date("Y-m-d H:i:s");
    $stmt = $conn->prepare("INSERT INTO user_shopping_list (ingredient_id, user_id, date_added) VALUES (:ingredient_id, :user_id, :date_added)");
    foreach($missing_ids as $ingredient_id) {
        $stmt->execute([
            'ingredient_id' => $ingredient_id,
            'user_id' => $user_id,
            'date_added' => $date_added
        ]);
    }
    echo json_encode(['success' => true, 'message' => 'Missing ingredients added to your shopping list.']);
} catch(Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error adding missing ingredients to shopping list.']);
}

