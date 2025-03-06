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

// Optional filter and sort parameters via GET
$filter = isset($_GET['filter']) ? trim($_GET['filter']) : "";
$sort = isset($_GET['sort']) ? trim($_GET['sort']) : "";

// Build SQL query joining user_inventory and ingredients
$sql = "SELECT ui.inventory_id, i.ingredient_name, i.ingredient_type, ui.unit_measure, ui.quantity, ui.date_added, ui.expiration_date, ui.comment
        FROM user_inventory ui
        JOIN ingredients i ON ui.ingredient_id = i.ingredient_id
        WHERE ui.user_id = :user_id";

$params = ['user_id' => $user_id];

if($filter !== "") {
    $sql .= " AND LOWER(i.ingredient_name) LIKE :filter";
    $params['filter'] = "%" . strtolower($filter) . "%";
}

if($sort === "ingredient_type") {
    $sql .= " ORDER BY i.ingredient_type ASC";
} else {
    $sql .= " ORDER BY ui.expiration_date ASC";
}

try {
    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    $inventory = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if(count($inventory) === 0 && $filter !== "") {
        echo json_encode(['success' => false, 'message' => 'No matching ingredient found in your inventory.']);
        exit;
    }
    echo json_encode(['success' => true, 'inventory' => $inventory]);
} catch(Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error fetching inventory.']);
}

