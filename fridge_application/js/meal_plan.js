document.addEventListener("DOMContentLoaded", function() {
    // Check if user is premium using sessionStorage
    if (sessionStorage.getItem('user_role') !== 'premium') {
        // Create a popup element for the message
        const popup = document.createElement('div');
        popup.textContent = "Access denied. Meal Plans only available to authenticated premium users. Please subscribe to access this page.";
        popup.style.position = 'fixed';
        popup.style.fontSize = '20px';
        popup.style.top = '20px';
        popup.style.left = '50%';
        popup.style.transform = 'translateX(-50%)';
        popup.style.backgroundColor = '#3F4F44';
        popup.style.color = '#fff';
        popup.style.padding = '15px 25px';
        popup.style.borderRadius = '5px';
        popup.style.zIndex = '1000';
        document.body.appendChild(popup);
        setTimeout(() => {
            popup.remove();
            window.location.href = "../webpages/my_account.html";
        }, 3000);
        return;
    }

    fetch('../includes/nav.html')
        .then(res => res.text())
        .then(data => { document.getElementById('nav').innerHTML = data; });
    fetch('../includes/foot.html')
        .then(res => res.text())
        .then(data => { document.getElementById('foot').innerHTML = data; });

    // Global variables
    let allRecipes = [];    // All recipes from the recipes table
    let mealPlans = [];     // Array of meal plan objects from meal_plans table
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    // Compute current week (Monday to Sunday)
    function getCurrentWeekBounds() {
        const day = today.getDay(); // 0=Sunday, 1=Monday,...
        const diffToMonday = (day === 0 ? -6 : 1 - day);
        const monday = new Date(today);
        monday.setDate(today.getDate() + diffToMonday);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        return { monday, sunday };
    }
    const { monday, sunday } = getCurrentWeekBounds();
    const mondayStr = monday.toISOString().split("T")[0];

    // Set up date info display
    function setDateInfo() {
        document.getElementById('calendarWeek').textContent = getWeekNumber(today);
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        document.getElementById('currentDay').textContent = today.toLocaleDateString(undefined, options);
    }
    // ISO week number calculation
    function getWeekNumber(date) {
        const target = new Date(date.valueOf());
        const dayNr = (date.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        const firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() !== 4) {
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - target) / 604800000);
    }
    setDateInfo();

    // Build the meal plan table for the current week (one row per day, Monday-Sunday)
    function buildMealPlanTable() {
        const tbody = document.querySelector("#mealPlanTable tbody");
        tbody.innerHTML = "";
        const currentMonday = new Date(monday);
        for (let i = 0; i < 7; i++) {
            const currentDay = new Date(currentMonday);
            currentDay.setDate(currentMonday.getDate() + i);
            const dateStr = currentDay.toISOString().split('T')[0];
            const dayName = currentDay.toLocaleDateString(undefined, { weekday: 'long' });
            const row = document.createElement('tr');
            row.setAttribute('data-date', dateStr);
            row.innerHTML = `
                <td>${dayName} (${dateStr})</td>
                <td>
                    <select class="lunchDropdown">
                        <option value="">--Select Lunch--</option>
                    </select>
                </td>
                <td>
                    <select class="dinnerDropdown">
                        <option value="">--Select Dinner--</option>
                    </select>
                </td>
                <td>
                    <textarea class="dayComment" maxlength="100" placeholder="Enter comments..."></textarea>
                </td>
            `;
            tbody.appendChild(row);
        }
    }
    buildMealPlanTable();

    // Persist meal plan: Use localStorage with key "mealPlan_<mondayStr>"
    const storageKey = "mealPlan_" + mondayStr;

    function loadStoredMealPlan() {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Error parsing stored meal plan:", e);
            }
        }
        return null;
    }

    function storeMealPlan(plan) {
        localStorage.setItem(storageKey, JSON.stringify(plan));
    }

    // Populate table from a meal plan object (keys: date, each with {lunch, dinner, comment})
    function populateMealPlanTableFromPlan(plan) {
        const rows = document.querySelectorAll("#mealPlanTable tbody tr");
        rows.forEach(row => {
            const rowDate = row.getAttribute('data-date');
            // Only update rows for today and future dates
            if (rowDate >= todayStr && plan[rowDate]) {
                row.querySelector(".lunchDropdown").value = plan[rowDate].lunch || "";
                row.querySelector(".dinnerDropdown").value = plan[rowDate].dinner || "";
                row.querySelector(".dayComment").value = plan[rowDate].comment || "";
            }
        });
    }

    // On page load, load stored meal plan if the week has not passed
    const storedPlan = loadStoredMealPlan();
    if (storedPlan) {
        populateMealPlanTableFromPlan(storedPlan);
    }

    // Load all recipes for dropdown menus
    function loadAllRecipes() {
        fetch('../php/get_all_recipes.php')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    allRecipes = data.recipes;
                    populateMealPlanDropdowns();
                } else {
                    alert(data.message);
                }
            });
    }
    function populateMealPlanDropdowns() {
        document.querySelectorAll(".lunchDropdown, .dinnerDropdown").forEach(dropdown => {
            dropdown.innerHTML = `<option value="">--Select--</option>`;
            allRecipes.forEach(recipe => {
                const option = document.createElement('option');
                option.value = recipe.recipe_id;
                option.textContent = recipe.recipe_name;
                dropdown.appendChild(option);
            });
        });
    }
    loadAllRecipes();

    // Load meal plans from the server for the dropdown (meal_plans table)
    function loadMealPlans() {
        fetch('../php/get_meal_plans.php')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    mealPlans = data.mealPlans; // expected format: [{ meal_plan_name, meal_plan_diet, recipes: [ { recipe_id, recipe_name } ] }, ...]
                    populateMealPlanDropdown();
                } else {
                    alert(data.message);
                }
            });
    }
    function populateMealPlanDropdown() {
        const dropdown = document.getElementById('mealPlanDropdown');
        dropdown.innerHTML = `<option value="">--Select a Meal Plan--</option>`;
        mealPlans.forEach(plan => {
            const option = document.createElement('option');
            option.value = plan.meal_plan_name;
            option.textContent = plan.meal_plan_name;
            dropdown.appendChild(option);
        });
    }
    loadMealPlans();

    // Apply Meal Plan: populate remaining days with recipes from the selected plan
    document.getElementById('applyMealPlanBtn').addEventListener('click', function() {
        const selectedPlanName = document.getElementById('mealPlanDropdown').value;
        if (!selectedPlanName) {
            alert("Please select a meal plan.");
            return;
        }
        const plan = mealPlans.find(p => p.meal_plan_name === selectedPlanName);
        if (!plan || !plan.recipes || plan.recipes.length < 14) {
            alert("Selected meal plan data is incomplete.");
            return;
        }
        // Split plan recipes: first 7 for lunch, next 7 for dinner
        const lunchRecipes = plan.recipes.slice(0, 7);
        const dinnerRecipes = plan.recipes.slice(7, 14);
        const newPlan = loadStoredMealPlan() || {};
        const rows = document.querySelectorAll("#mealPlanTable tbody tr");
        rows.forEach((row, index) => {
            const rowDate = row.getAttribute('data-date');
            // Only update if the day is today or in the future
            if (rowDate >= todayStr) {
                const lunchValue = lunchRecipes[index] ? lunchRecipes[index].recipe_id : "";
                const dinnerValue = dinnerRecipes[index] ? dinnerRecipes[index].recipe_id : "";
                row.querySelector(".lunchDropdown").value = lunchValue;
                row.querySelector(".dinnerDropdown").value = dinnerValue;
                // Optionally, clear any existing comment:
                row.querySelector(".dayComment").value = "";
                newPlan[rowDate] = { lunch: lunchValue, dinner: dinnerValue, comment: "" };
            }
        });
        storeMealPlan(newPlan);
        showPopup("Meal plan applied successfully.");
    });

    // Generate 7-day Meal Plan button: auto-populate remaining days (from today onward)
    document.getElementById('generateMealPlanBtn').addEventListener('click', function() {
        fetch('../php/generate_meal_plan.php?today=' + todayStr)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // data.mealPlan is expected to be an object keyed by date for days >= today
                    const generatedPlan = data.mealPlan;
                    const newPlan = loadStoredMealPlan() || {};
                    const rows = document.querySelectorAll("#mealPlanTable tbody tr");
                    rows.forEach(row => {
                        const rowDate = row.getAttribute('data-date');
                        if (rowDate >= todayStr && generatedPlan[rowDate]) {
                            row.querySelector(".lunchDropdown").value = generatedPlan[rowDate].lunch;
                            row.querySelector(".dinnerDropdown").value = generatedPlan[rowDate].dinner;
                            row.querySelector(".dayComment").value = generatedPlan[rowDate].comment || "";
                            newPlan[rowDate] = generatedPlan[rowDate];
                        }
                    });
                    storeMealPlan(newPlan);
                    showPopup("Meal plan generated successfully.");
                } else {
                    alert(data.message);
                }
            });
    });

    // Reset Meal Plan button: clear all selections and stored plan
    document.getElementById('resetMealPlanBtn').addEventListener('click', function() {
        const rows = document.querySelectorAll("#mealPlanTable tbody tr");
        rows.forEach(row => {
            row.querySelector(".lunchDropdown").value = "";
            row.querySelector(".dinnerDropdown").value = "";
            row.querySelector(".dayComment").value = "";
        });
        localStorage.removeItem(storageKey);
        showPopup("Meal plan reset successfully.");
    });

    });

