<?php
global $conn;
header('Content-Type: application/json');
session_start();
include 'db_connection.php';

$data = json_decode(file_get_contents("php://input"), true);
if(!$data || !isset($data['recipe_id'])) {
    echo json_encode(['success' => false, 'message' => 'Recipe ID required.']);
    exit;
}

if(!isset($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'User not authenticated.']);
    exit;
}

$user_id = $_SESSION['user']['user_id'];
$recipe_id = intval($data['recipe_id']);

try {
    $stmt = $conn->prepare("INSERT IGNORE INTO user_favorite_recipes (user_id, recipe_id) VALUES (:user_id, :recipe_id)");
    $stmt->execute(['user_id' => $user_id, 'recipe_id' => $recipe_id]);
  echo json_encode(['success' => true, 'message' => 'Recipe marked as favorite.']);
} catch(Exception $e) {
   echo json_encode(['success' => false, 'message' => 'Error marking favorite.']);
}

