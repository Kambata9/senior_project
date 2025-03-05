<?php
global $conn;
header('Content-Type: application/json');
include 'db_connection.php';

try {
    $stmt = $conn->prepare("
        SELECT mp.meal_plan_name, mp.meal_plan_diet, mp.recipe_id, r.recipe_name
        FROM meal_plans mp
        JOIN recipes r ON mp.recipe_id = r.recipe_id
        ORDER BY mp.meal_plan_name, mp.recipe_id ASC
    ");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $mealPlans = [];
    foreach ($rows as $row) {
        $planName = $row['meal_plan_name'];
        if (!isset($mealPlans[$planName])) {
            $mealPlans[$planName] = [
                'meal_plan_name' => $planName,
                'meal_plan_diet' => $row['meal_plan_diet'],
                'recipes' => []
            ];
        }
        $mealPlans[$planName]['recipes'][] = [
            'recipe_id' => $row['recipe_id'],
            'recipe_name' => $row['recipe_name']
        ];
    }
    echo json_encode(['success' => true, 'mealPlans' => array_values($mealPlans)]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error retrieving meal plans.']);
}

