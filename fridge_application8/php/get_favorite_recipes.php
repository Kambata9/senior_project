<?php
global $conn;
header('Content-Type: application/json');
session_start();
include 'db_connection.php';

if(!isset($_SESSION['user'])){
    echo json_encode(['success'=>false, 'message'=>'User not authenticated.']);
    exit;
}

$user_id = $_SESSION['user']['user_id'];
try {
    $stmt = $conn->prepare("SELECT recipe_id FROM user_favorite_recipes WHERE user_id = :user_id");
    $stmt->execute(['user_id' => $user_id]);
    $favorites = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo json_encode(['success'=>true, 'favorites'=>$favorites]);
} catch(Exception $e) {
    echo json_encode(['success'=>false, 'message'=>'Error fetching favorite recipes.']);
}

