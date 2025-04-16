<?php
global $conn;
header('Content-Type: application/json');
session_start();
include 'db_connection.php';

if(!isset($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'User not authenticated.']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if(!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    exit;
}

// Expected fields: ingredient_id, unit_measure, quantity, expiration_date, comment
$ingredient_id = $data['ingredient_id'];
$unit_measure = !empty($data['unit_measure']) ? $data['unit_measure'] : null;
$quantity = !empty($data['quantity']) ? $data['quantity'] : null;
$expiration_date = $data['expiration_date'];
$comment = isset($data['comment']) ? substr(trim($data['comment']), 0, 50) : null;

// Validate mandatory fields
if(empty($ingredient_id) || empty($expiration_date)) {
    echo json_encode(['success' => false, 'message' => 'Required fields missing.']);
    exit;
}

// Validate date format
if(!DateTime::createFromFormat('Y-m-d', $expiration_date)) {
    echo json_encode(['success' => false, 'message' => 'Invalid expiration date format (YYYY-MM-DD expected).']);
    exit;
}

// Store today's date in YYYY-MM-DD format
$date_added = date("Y-m-d");
$user_id = $_SESSION['user']['user_id'];

try {
    $stmt = $conn->prepare("
        INSERT INTO user_inventory (
            user_id, 
            ingredient_id, 
            unit_measure, 
            quantity, 
            expiration_date, 
            comment, 
            date_added
        ) VALUES (
            :user_id, 
            :ingredient_id, 
            :unit_measure, 
            :quantity, 
            :expiration_date, 
            :comment, 
            :date_added
        )
    ");
    $stmt->execute([
        'user_id'         => $user_id,
        'ingredient_id'   => $ingredient_id,
        'unit_measure'    => $unit_measure,
        'quantity'        => $quantity,
        'expiration_date' => $expiration_date,
        'comment'         => $comment,
        'date_added'      => $date_added
    ]);
    echo json_encode(['success' => true, 'message' => 'Inventory updated successfully.']);
} catch(Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error adding item to inventory.']);
}

