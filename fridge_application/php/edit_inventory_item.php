<?php
global $conn;
header('Content-Type: application/json');
session_start();
include 'db_connection.php';

$data = json_decode(file_get_contents("php://input"), true);
if(!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    exit;
}

// Expected fields: inventory_id, ingredient_id, unit_measure, quantity, date_added (optional), expiration_date, comment
$inventory_id    = $data['inventory_id'];
$ingredient_id   = $data['ingredient_id'];
$unit_measure    = $data['unit_measure'] ?? null;
$quantity        = $data['quantity'] ?? null;
$expiration_date = $data['expiration_date'];
$comment         = isset($data['comment']) ? substr(trim($data['comment']), 0, 50) : null;
$date_added      = isset($data['date_added']) ? trim($data['date_added']) : '';

// Validate mandatory fields
if(empty($inventory_id) || empty($ingredient_id) || empty($expiration_date)) {
    echo json_encode(['success' => false, 'message' => 'Required fields missing.']);
    exit;
}

// Validate expiration date
if(!DateTime::createFromFormat('Y-m-d', $expiration_date)) {
    echo json_encode(['success' => false, 'message' => 'Invalid expiration date format (YYYY-MM-DD).']);
    exit;
}

// Build SQL dynamically
$sql = "UPDATE user_inventory
        SET ingredient_id = :ingredient_id,
            unit_measure  = :unit_measure,
            quantity      = :quantity,
            expiration_date = :expiration_date,
            comment       = :comment";

$params = [
    'ingredient_id'   => $ingredient_id,
    'unit_measure'    => $unit_measure,
    'quantity'        => $quantity,
    'expiration_date' => $expiration_date,
    'comment'         => $comment,
    'inventory_id'    => $inventory_id,
    'user_id'         => $_SESSION['user']['user_id']
];

// If user provided a new date_added, validate and update it
if($date_added !== '') {
    if(!DateTime::createFromFormat('Y-m-d', $date_added)) {
        echo json_encode(['success' => false, 'message' => 'Invalid date_added format (YYYY-MM-DD).']);
        exit;
    }
    $sql .= ", date_added = :date_added";
    $params['date_added'] = $date_added;
}

$sql .= " WHERE inventory_id = :inventory_id AND user_id = :user_id";

try {
    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    echo json_encode(['success' => true, 'message' => 'Item updated successfully.']);
} catch(Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error updating item.']);
}

