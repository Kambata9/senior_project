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

$user_id = $_SESSION['user']['user_id'];

try {
    $stmt = $conn->prepare("
        SELECT us.shopping_list_id, i.ingredient_name, us.date_added 
        FROM user_shopping_list us 
        JOIN ingredients i ON us.ingredient_id = i.ingredient_id 
        WHERE us.user_id = :user_id
        ORDER BY us.date_added DESC
    ");
    $stmt->execute(['user_id' => $user_id]);
    $shoppingList = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'shoppingList' => $shoppingList]);
} catch(Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error fetching shopping list.']);
}

