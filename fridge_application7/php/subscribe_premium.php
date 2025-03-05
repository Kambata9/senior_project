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

$cardNumber = trim($data['cardNumber']);
$cardName = trim($data['cardName']);
$cardExp = trim($data['cardExp']);
$cardCVC = trim($data['cardCVC']);


// Simulate successful payment processing here

$user_id = $_SESSION['user']['user_id'];
$stmt = $conn->prepare("UPDATE users SET user_role = 'premium' WHERE user_id = :user_id");
if($stmt->execute(['user_id' => $user_id])){
    $_SESSION['user']['user_role'] = 'premium';
    // Force session data to be saved so it's immediately available
    session_write_close();
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error updating subscription.']);
}

