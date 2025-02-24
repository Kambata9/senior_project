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

$cardNumber = trim($data['cardNumber']);
$cardName = trim($data['cardName']);
$cardExp = trim($data['cardExp']);
$cardCVC = trim($data['cardCVC']);

if(!preg_match('/^\d{16}$/', $cardNumber)) {
    echo json_encode(['success' => false, 'message' => 'Invalid card number.']);
    exit;
}
if(!preg_match('/^[A-Za-z]{2,}\s[A-Za-z]{2,}$/', $cardName)) {
    echo json_encode(['success' => false, 'message' => 'Invalid name on card.']);
    exit;
}
if(!preg_match('/^(0[1-9]|1[0-2])\/\d{2}$/', $cardExp)) {
    echo json_encode(['success' => false, 'message' => 'Invalid expiration date.']);
    exit;
}
if(!preg_match('/^\d{3}$/', $cardCVC)) {
    echo json_encode(['success' => false, 'message' => 'Invalid CVC.']);
    exit;
}

// Simulate successful payment and update subscription
$user_id = $_SESSION['user']['user_id'];
$stmt = $conn->prepare("UPDATE users SET user_role = 'premium' WHERE user_id = :user_id");
if($stmt->execute(['user_id' => $user_id])) {
    $_SESSION['user']['user_role'] = 'premium';
    echo json_encode(['success' => true, 'message' => 'Subscribed to premium successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error updating subscription.']);
}
