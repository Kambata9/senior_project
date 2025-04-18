<?php
global $conn;
header('Content-Type: application/json');
session_start();
include 'db_connection.php';

$user_id = $_SESSION['user']['user_id'];
$todayStr = $_GET['today'] ?? date("Y-m-d");

$today = new DateTime($todayStr);
$dayOfWeek = (int)$today->format("N"); // Monday=1, Sunday=7
$monday = clone $today;
$monday->modify('-' . ($dayOfWeek - 1) . ' days');
$sunday = clone $monday;
$sunday->modify('+6 days');

// Get user's dietary preference
$stmt = $conn->prepare("SELECT user_diet FROM users WHERE user_id = :user_id");
$stmt->execute(['user_id' => $user_id]);
$userData = $stmt->fetch(PDO::FETCH_ASSOC);
$userDiet = $userData['user_diet'] ?? '';

// Get user's favorite recipes
$stmt = $conn->prepare("SELECT recipe_id FROM user_favorite_recipes WHERE user_id = :user_id");
$stmt->execute(['user_id' => $user_id]);
$favorites = $stmt->fetchAll(PDO::FETCH_COLUMN);
$favorites = array_map('intval', $favorites);

// Query recipes matching user's diet
if ($userDiet) {
    $stmt = $conn->prepare("SELECT recipe_id FROM recipes WHERE recipe_diet = :diet");
    $stmt->execute(['diet' => $userDiet]);
    $dietRecipes = $stmt->fetchAll(PDO::FETCH_COLUMN);
    $dietRecipes = array_map('intval', $dietRecipes);
} else {
    $dietRecipes = [];
}

// Merge favorites with dietRecipes (favorites prioritized)
$preferred = array_unique(array_merge($favorites, $dietRecipes));
if (empty($preferred)) {
    // Fallback to all recipes if none match
    $stmt = $conn->query("SELECT recipe_id FROM recipes");
    $preferred = $stmt->fetchAll(PDO::FETCH_COLUMN);
    $preferred = array_map('intval', $preferred);
}

// Function to pick a random recipe from array
function pickRandomRecipe($recipes) {
    return $recipes[array_rand($recipes)];
}

$mealPlan = [];
$current = clone $today;
while ($current <= $sunday) {
    $dateStr = $current->format("Y-m-d");
    if ($dateStr >= $todayStr) {
        // For each day, assign two random recipes (lunch and dinner)
        $lunch = pickRandomRecipe($preferred);
        $dinner = pickRandomRecipe($preferred);
        if ($lunch == $dinner && count($preferred) > 1) {
            do {
                $dinner = pickRandomRecipe($preferred);
            } while ($lunch == $dinner);
        }
        $mealPlan[$dateStr] = [
            'lunch' => $lunch,
            'dinner' => $dinner,
            'comment' => ""
        ];
    }
    $current->modify('+1 day');
}

echo json_encode(['success' => true, 'mealPlan' => $mealPlan]);

