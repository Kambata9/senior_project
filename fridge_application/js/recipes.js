document.addEventListener("DOMContentLoaded", function() {
    // Check authentication status (assumes login sets sessionStorage 'authenticated' to "true")
    const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';

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
    let favorites = []; // will store recipe IDs as strings

    // Load external steps/images data from JSON file
    let stepsImagesData = {};
    fetch('../data/steps_images_for_recipe.json')
        .then(response => response.json())
        .then(data => { stepsImagesData = data; });

    // If the user is authenticated, load favorites; otherwise, favorites remain empty.
    function loadFavorites(callback) {
        if (!isAuthenticated) {
            favorites = [];
            if(callback) callback();
            return;
        }
        fetch('../php/get_favorite_recipes.php')
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    favorites = data.favorites.map(id => String(id));
                    if(callback) callback();
                } else {
                    alert(data.message);
                }
            });
    }

    // Load suggested recipes (only for authenticated users)
    function loadSuggestedRecipes() {
        const tbody = document.querySelector("#suggestedRecipesTable tbody");
        if (!isAuthenticated) {
            tbody.innerHTML = `<tr><td colspan="4">Please log in or sign up to see recipe suggestions.</td></tr>`;
            return;
        }
        fetch('../php/get_recipe_suggestions.php')
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    suggestedRecipes = data.suggestedRecipes;
                    populateSuggestedRecipesTable(suggestedRecipes);
                } else {
                    tbody.innerHTML = `<tr><td colspan="4">${data.message}</td></tr>`;
                }
            });
    }

    function populateSuggestedRecipesTable(recipes) {
        const tbody = document.querySelector("#suggestedRecipesTable tbody");
        tbody.innerHTML = "";
        if(recipes.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4">No suggested recipes found.</td></tr>`;
            return;
        }
        recipes.forEach(recipe => {
            const tr = document.createElement('tr');
            // Only authenticated users can mark favorites
            const favButton = isAuthenticated
                ? `<button class="favoriteBtn" data-id="${recipe.recipe_id}">${favorites.includes(String(recipe.recipe_id)) ? "Unmark favorite" : "Favorite"}</button>`
                : `<button class="favoriteBtn" data-id="${recipe.recipe_id}">Favorite</button>`;
            tr.innerHTML = `
                <td>${recipe.recipe_name}</td>
                <td>${recipe.recipe_diet}</td>
                <td>${recipe.recipe_difficulty}</td>
                <td>
                    ${favButton}
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
        if(diet) {
            url += "?diet=" + encodeURIComponent(diet);
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    allRecipes = data.recipes;
                    populateAllRecipesTable(allRecipes);
                } else {
                    document.querySelector("#allRecipesTable tbody").innerHTML = `<tr><td colspan="4">${data.message}</td></tr>`;
                }
            });
    }

    function populateAllRecipesTable(recipes) {
        const tbody = document.querySelector("#allRecipesTable tbody");
        tbody.innerHTML = "";
        if(recipes.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4">No recipes found.</td></tr>`;
            return;
        }
        recipes.forEach(recipe => {
            const tr = document.createElement('tr');
            const favButton = isAuthenticated
                ? `<button class="favoriteBtn" data-id="${recipe.recipe_id}">${favorites.includes(String(recipe.recipe_id)) ? "Unmark favorite" : "Favorite"}</button>`
                : `<button class="favoriteBtn" data-id="${recipe.recipe_id}">Favorite</button>`;
            tr.innerHTML = `
                <td>${recipe.recipe_name}</td>
                <td>${recipe.recipe_diet}</td>
                <td>${recipe.recipe_difficulty}</td>
                <td>
                    ${favButton}
                    <button class="viewRecipeBtn" data-id="${recipe.recipe_id}">View Recipe</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        addRecipeTableEventListeners();
    }

    // Attach event listeners for favorite and view recipe buttons
    function addRecipeTableEventListeners() {
        document.querySelectorAll('.favoriteBtn').forEach(btn => {
            btn.addEventListener('click', function() {
                if(!isAuthenticated) {
                    alert("Marking favorites requires an account. Please log in or sign up.");
                    return;
                }
                const recipeId = this.getAttribute('data-id');
                if(this.textContent.trim() === "Favorite") {
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
                if(data.success) {
                    alert(data.message);
                    buttonElement.textContent = "Unmark favorite";
                    if(!favorites.includes(String(recipeId))) {
                        favorites.push(String(recipeId));
                    }
                } else {
                    alert(data.message);
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
                if(data.success) {
                    alert(data.message);
                    buttonElement.textContent = "Favorite";
                    favorites = favorites.filter(id => id !== String(recipeId));
                } else {
                    alert(data.message);
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
        } else {
            document.getElementById('modalRecipeName').textContent = "Recipe " + recipeId;
            document.getElementById('modalRecipeImage').src = "../images/placeholder.jpg";
            document.getElementById('modalPreparationSteps').innerHTML = "<li>No preparation steps available.</li>";
        }
        // If user is not authenticated, disable the start preparation functionality
        if (!isAuthenticated) {
            document.getElementById('startPreparationBtn').onclick = function() {
                alert("Starting recipe preparation requires an account. Please log in or sign up.");
            };
        } else {
            document.getElementById('startPreparationBtn').onclick = function() {
                startPreparation(recipeId);
            };
        }
        // (Additional logic for loading ingredients can be added here.)
        recipeModal.setAttribute('data-recipe-id', recipeId);
        recipeModal.style.display = 'block';
    }

    // Portion adjustment: When user changes servings, adjust ingredients using JSON data
    document.getElementById('portionSelect').addEventListener('change', function() {
        const newServings = parseInt(this.value, 10);
        const recipeId = recipeModal.getAttribute('data-recipe-id');
        displayIngredientsForServings(recipeId, newServings);
    });

    // Function to display ingredients for a given serving size
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
                if(data.missing && data.missing.length > 0) {
                    let msg = "Missing ingredients: " + data.missing.join(", ") + ".\n";
                    msg += "Click OK to add missing ingredients to your shopping list, or Cancel to continue with the recipe.";
                    if(confirm(msg)) {
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

    // On page load, load favorites (if authenticated), then load recipes
    loadFavorites(function(){
        loadSuggestedRecipes();
        loadAllRecipes();
    });
});
