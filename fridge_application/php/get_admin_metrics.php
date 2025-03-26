<?php
global $conn;
session_start();
require 'db_connection.php';

// Ensure the user is an admin
if (!isset($_SESSION['user']) || $_SESSION['user']['user_role'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Access denied.']);
    exit;
}

// Query for Top 3 Favorite Recipes
$sqlTopFavorites = "
    SELECT r.recipe_name, COUNT(ufr.recipe_id) AS favorite_count
    FROM user_favorite_recipes ufr
    JOIN recipes r ON ufr.recipe_id = r.recipe_id
    GROUP BY ufr.recipe_id
    ORDER BY favorite_count DESC
    LIMIT 3
";
$stmt = $conn->query($sqlTopFavorites);
$topFavorites = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Query for user diet types
//$sqlTopDietTypes = "
  //  SELECT d.diet_type, COUNT(u.user_id) AS dietType_count
  //  FROM users u
  //  GROUP BY u.diet_type
  //  ORDER BY dietType_count DESC
//";
//$stmt = $conn->query($sqlTopDietTypes);
//$topDietTypes = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Query for total users (regular and premium, excl. admin)
$sqlTotalUsers = "SELECT COUNT(*) AS total_users FROM users WHERE user_role = 'regular' OR user_role = 'premium'";
$stmt = $conn->query($sqlTotalUsers);
$totalUsers = $stmt->fetch(PDO::FETCH_ASSOC)['total_users'];

// Query for total premium users
$sqlPremiumUsers = "SELECT COUNT(*) AS total_premium FROM users WHERE user_role = 'premium'";
$stmt = $conn->query($sqlPremiumUsers);
$totalPremiumUsers = $stmt->fetch(PDO::FETCH_ASSOC)['total_premium'];


echo json_encode([
    'success' => true,
    'topFavorites' => $topFavorites,
   // 'topDietTypes' => $topDietTypes,
    'totalUsers' => $totalUsers,
    'totalPremiumUsers' => $totalPremiumUsers,

]);