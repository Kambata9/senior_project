document.addEventListener("DOMContentLoaded", function() {
    // Load navigation and footer
    fetch('../includes/nav.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('nav').innerHTML = data;
        });
    fetch('../includes/foot.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('foot').innerHTML = data;
        });

    // Global arrays for recipes and favorites
    let allRecipes = [];
    let suggestedRecipes = [];
    let favorites = []; // stores recipe IDs as strings

    // Pagination variables for All Recipes table
    let currentPage = 1;
    const recipesPerPage = 10;

    // Load external steps/images data from JSON file
    let stepsImagesData = {};
    fetch('../data/steps_images_for_recipe.json')
        .then(response => response.json())
        .then(data => { stepsImagesData = data; });

    // Load favorites for the current user
    function loadFavorites(callback) {
        fetch('../php/get_favorite_recipes.php')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    favorites = data.favorites.map(id => String(id));
                    if(callback) callback();
                } else {
                    alert(data.message);
                }
            });
    }

    // Load suggested recipes based on user inventory (at least 2 matching ingredients)
    function loadSuggestedRecipes() {
        fetch('../php/get_recipe_suggestions.php')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    suggestedRecipes = data.suggestedRecipes;
                    populateSuggestedRecipesTable(suggestedRecipes);
                } else {
                    document.querySelector("#suggestedRecipesTable tbody").innerHTML = `<tr><td colspan="4">${data.message}</td></tr>`;
                }
            });
    }

    function populateSuggestedRecipesTable(recipes) {
        const tbody = document.querySelector("#suggestedRecipesTable tbody");
        tbody.innerHTML = "";
        if (recipes.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4">No suggested recipes found.</td></tr>`;
            return;
        }
        recipes.forEach(recipe => {
            const tr = document.createElement('tr');
            // Determine button text based on favorites list
            const favText = favorites.includes(String(recipe.recipe_id)) ? "Unmark favorite" : "Favorite";
            tr.innerHTML = `
                <td>${recipe.recipe_name}</td>
                <td>${recipe.recipe_diet}</td>
                <td>${recipe.recipe_difficulty}</td>
                <td>
                    <button class="favoriteBtn" data-id="${recipe.recipe_id}">${favText}</button>
                    <button class="viewRecipeBtn" data-id="${recipe.recipe_id}">View Recipe</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        addRecipeTableEventListeners();
    }

    // Load all recipes (optionally filtered by diet)
    function loadAllRecipes(diet = "") {
        let url = '../php/get_all_recipes.php';
        if (diet) {
            url += "?diet=" + encodeURIComponent(diet);
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    allRecipes = data.recipes;
                    currentPage = 1; // Reset page on reload
                    populateAllRecipesTable();
                    updatePaginationControls();
                } else {
                    document.querySelector("#allRecipesTable tbody").innerHTML = `<tr><td colspan="4">${data.message}</td></tr>`;
                }
            });
    }

    // Populate the All Recipes table with pagination
    function populateAllRecipesTable() {
        const tbody = document.querySelector("#allRecipesTable tbody");
        tbody.innerHTML = "";
        const startIndex = (currentPage - 1) * recipesPerPage;
        const endIndex = currentPage * recipesPerPage;
        const pageRecipes = allRecipes.slice(startIndex, endIndex);
        if (pageRecipes.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4">No recipes found.</td></tr>`;
            return;
        }
        pageRecipes.forEach(recipe => {
            const tr = document.createElement('tr');
            const favText = favorites.includes(String(recipe.recipe_id)) ? "Unmark favorite" : "Favorite";
            tr.innerHTML = `
                <td>${recipe.recipe_name}</td>
                <td>${recipe.recipe_diet}</td>
                <td>${recipe.recipe_difficulty}</td>
                <td>
                    <button class="favoriteBtn" data-id="${recipe.recipe_id}">${favText}</button>
                    <button class="viewRecipeBtn" data-id="${recipe.recipe_id}">View Recipe</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        addRecipeTableEventListeners();
    }

    // Update pagination controls
    function updatePaginationControls() {
        const paginationDiv = document.getElementById("pagination");
        if (!paginationDiv) return;
        paginationDiv.innerHTML = "";
        const totalPages = Math.ceil(allRecipes.length / recipesPerPage);
        if (currentPage > 1) {
            const prevButton = document.createElement("button");
            prevButton.textContent = "Previous";
            prevButton.addEventListener("click", () => {
                currentPage--;
                populateAllRecipesTable();
                updatePaginationControls();
            });
            paginationDiv.appendChild(prevButton);
        }
        if (currentPage < totalPages) {
            const nextButton = document.createElement("button");
            nextButton.textContent = "Next";
            nextButton.addEventListener("click", () => {
                currentPage++;
                populateAllRecipesTable();
                updatePaginationControls();
            });
            paginationDiv.appendChild(nextButton);
        }
    }

    // Attach event listeners for favorite and view recipe buttons
    function addRecipeTableEventListeners() {
        document.querySelectorAll('.favoriteBtn').forEach(btn => {
            btn.addEventListener('click', function() {
                const recipeId = this.getAttribute('data-id');
                if (this.textContent.trim() === "Favorite") {
                    markFavorite(recipeId, this);
                } else {
                    unmarkFavorite(recipeId, this);
                }
            });
        });
        document.querySelectorAll('.viewRecipeBtn').forEach(btn => {
            btn.addEventListener('click', function() {
                const recipeId = this.getAttribute('data-id');
                viewRecipe(recipeId);
            });
        });
    }

    // Mark recipe as favorite
    function markFavorite(recipeId, buttonElement) {
        fetch('../php/mark_favorite_recipe.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipe_id: recipeId })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    buttonElement.textContent = "Unmark favorite";
                    if (!favorites.includes(String(recipeId))) {
                        favorites.push(String(recipeId));
                    }
                }
            });
    }

    // Unmark recipe as favorite
    function unmarkFavorite(recipeId, buttonElement) {
        fetch('../php/unmark_favorite_recipe.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipe_id: recipeId })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    buttonElement.textContent = "Favorite";
                    favorites = favorites.filter(id => id !== String(recipeId));
                }
            });
    }

    // Filter buttons for all recipes table
    document.getElementById('filterRecipesBtn').addEventListener('click', function() {
        const diet = document.getElementById('dietFilter').value;
        loadAllRecipes(diet);
    });
    document.getElementById('clearRecipeFilterBtn').addEventListener('click', function() {
        document.getElementById('dietFilter').value = "";
        loadAllRecipes();
    });

    // Recipe Modal functionality
    const recipeModal = document.getElementById('recipeModal');
    document.getElementById('recipeModalClose').addEventListener('click', () => {
        recipeModal.style.display = 'none';
    });

    // Function to view recipe details in a modal
    function viewRecipe(recipeId) {
        let recipeData = stepsImagesData[recipeId];
        if (recipeData) {
            document.getElementById('modalRecipeName').textContent = recipeData.recipe_name || ("Recipe " + recipeId);
            document.getElementById('modalRecipeImage').src = recipeData.image || "../images/placeholder.jpg";
            // Load preparation steps into the ordered list
            const stepsList = document.getElementById('modalPreparationSteps');
            stepsList.innerHTML = "";
            if (recipeData.steps && Array.isArray(recipeData.steps) && recipeData.steps.length > 0) {
                recipeData.steps.forEach(step => {
                    const li = document.createElement('li');
                    li.textContent = step;
                    stepsList.appendChild(li);
                });
            } else {
                stepsList.innerHTML = "<li>No preparation steps available.</li>";
            }
            // Display ingredients immediately using default servings
            const defaultServings = recipeData.default_servings || 4;
            displayIngredientsForServings(recipeId, defaultServings);
        } else {
            document.getElementById('modalRecipeName').textContent = "Recipe " + recipeId;
            document.getElementById('modalRecipeImage').src = "../images/placeholder.jpg";
            document.getElementById('modalPreparationSteps').innerHTML = "<li>No preparation steps available.</li>";
            document.getElementById('modalIngredientsList').innerHTML = "<li>No ingredient data available.</li>";
        }
        recipeModal.setAttribute('data-recipe-id', recipeId);
        recipeModal.style.display = 'block';
        document.getElementById('startPreparationBtn').onclick = function() {
            startPreparation(recipeId);
        };
    }

    // Portion adjustment: When user changes servings, adjust ingredients using JSON data
    document.getElementById('portionSelect').addEventListener('change', function() {
        const newServings = parseInt(this.value, 10);
        const recipeId = recipeModal.getAttribute('data-recipe-id');
        displayIngredientsForServings(recipeId, newServings);
    });

    // Function to display ingredients for a given serving size using JSON data
    function displayIngredientsForServings(recipeId, newServings) {
        const ul = document.getElementById('modalIngredientsList');
        ul.innerHTML = "";
        const recipeData = stepsImagesData[recipeId];
        if (!recipeData) {
            ul.innerHTML = "<li>No ingredient data available.</li>";
            return;
        }
        const defaultServings = recipeData.default_servings || 4;
        const factor = newServings / defaultServings;
        recipeData.ingredients.forEach(item => {
            const adjustedAmount = adjustAmount(item.amount, factor);
            const li = document.createElement('li');
            li.textContent = `${item.ingredient_name} - ${adjustedAmount}`;
            ul.appendChild(li);
        });
    }

    // Helper function to adjust ingredient amount based on serving factor
    function adjustAmount(amountStr, factor) {
        const parts = amountStr.split(" ");
        const num = parseFloat(parts[0]);
        if (isNaN(num)) return amountStr;
        const unit = parts.slice(1).join(" ");
        const newAmount = (num * factor).toFixed(2);
        return `${newAmount} ${unit}`;
    }

    // Placeholder for startPreparation function
    function startPreparation(recipeId) {
        fetch('../php/check_recipe_ingredients.php?recipe_id=' + recipeId)
            .then(response => response.json())
            .then(data => {
                if (data.missing && data.missing.length > 0) {
                    let msg = "Missing ingredients: " + data.missing.join(", ") + ".\n";
                    msg += "Click OK to add missing ingredients to your shopping list, or Cancel to continue with the recipe.";
                    if (confirm(msg)) {
                        fetch('../php/add_missing_to_shopping_list.php', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ recipe_id: recipeId, missing: data.missing_ids })
                        })
                            .then(response => response.json())
                            .then(result => {
                                alert(result.message);
                            });
                    } else {
                        alert("Continuing with recipe.");
                    }
                } else {
                    alert("All ingredients are present.");
                }
            });
    }

    // On page load, first load favorites then load suggested and all recipes
    loadFavorites(function(){
        loadSuggestedRecipes();
        loadAllRecipes();
    });
});
