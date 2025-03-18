<?php
global $conn;
header('Content-Type: application/json');
session_start();
include 'db_connection.php';

if($_SESSION['user']['user_role'] !== 'premium'){
    echo json_encode(['success' => false, 'message' => 'You are not a premium user.']);
    exit;
}

$user_id = $_SESSION['user']['user_id'];
$stmt = $conn->prepare("UPDATE users SET user_role = 'regular' WHERE user_id = :user_id");
if($stmt->execute(['user_id' => $user_id])){
    $_SESSION['user']['user_role'] = 'regular';
    echo json_encode(['success' => true, 'message' => 'Successfully unsubscribed from Premium plan.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error unsubscribing.']);
}

