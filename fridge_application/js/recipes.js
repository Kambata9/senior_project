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

    /**
     * Displays a message in the modal's message container.
     * @param {string} modalId - The id of the modal (e.g., 'loginModal').
     * @param {string} message - The message text to display.
     * @param {string} type - The type of message ('success' or 'error').
     * @param {number} duration - Duration in milliseconds to display the message.
     */
    function showModalMessage(modalId, message, type = 'success', duration = 2000) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        // Find the message container inside the modal
        let messageContainer = modal.querySelector('.modal-message');
        if (!messageContainer) {
            // If not found, create one and insert it after the first h2 element
            messageContainer = document.createElement('div');
            messageContainer.classList.add('modal-message');
            const header = modal.querySelector('h2');
            if (header) {
                header.parentNode.insertBefore(messageContainer, header.nextSibling);
            } else {
                modal.prepend(messageContainer);
            }
        }

        // Set the message and apply the correct type styling
        messageContainer.textContent = message;
        messageContainer.classList.remove('success', 'error');
        messageContainer.classList.add(type);
        messageContainer.style.display = 'block';

        // Hide the message after the specified duration
        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, duration);
    }

    /**
     * Displays a custom confirmation modal with a message and OK/Cancel buttons.
     * Returns a Promise that resolves to true if OK is clicked and false if Cancel is clicked.
     * @param {string} message - The confirmation message to display.
     * @returns {Promise<boolean>}
     */
    function showConfirmationModal(message) {
        return new Promise((resolve) => {
            // Create the overlay for the modal
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.zIndex = '2000';

            // Create the modal container with updated styling
            const modalContainer = document.createElement('div');
            modalContainer.style.backgroundColor = '#A27B5C';
            modalContainer.style.color = '#fff';
            modalContainer.style.padding = '20px';
            modalContainer.style.borderRadius = '8px';
            modalContainer.style.boxShadow = '0px 0px 150px #3f4f44';
            modalContainer.style.maxWidth = '400px';
            modalContainer.style.width = '80%';
            modalContainer.style.textAlign = 'center';
            modalContainer.style.fontFamily = 'Arial, sans-serif';

            // Create the message element
            const messageParagraph = document.createElement('p');
            messageParagraph.textContent = message;
            modalContainer.appendChild(messageParagraph);

            // Create a container for the buttons
            const buttonsContainer = document.createElement('div');
            buttonsContainer.style.display = 'flex';
            buttonsContainer.style.justifyContent = 'flex-end';
            buttonsContainer.style.marginTop = '20px';

            // Create the Cancel button
            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel';
            cancelButton.style.marginRight = '10px';
            cancelButton.style.borderRadius = '5px';
            cancelButton.addEventListener('click', () => {
                document.body.removeChild(overlay);
                resolve(false);
            });
            buttonsContainer.appendChild(cancelButton);

            // Create the OK button
            const okButton = document.createElement('button');
            okButton.textContent = 'OK';
            okButton.style.borderRadius = '5px';
            okButton.addEventListener('click', () => {
                document.body.removeChild(overlay);
                resolve(true);
            });
            buttonsContainer.appendChild(okButton);

            // Add buttons to the modal container
            modalContainer.appendChild(buttonsContainer);
            // Add the modal container to the overlay
            overlay.appendChild(modalContainer);
            // Append the overlay to the document body
            document.body.appendChild(overlay);
        });
    }

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
        const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
        const suggestedRecipesSection = document.getElementById("suggestedRecipesSection"); // Ensure this ID exists in HTML

        if (!isAuthenticated) {
            if (suggestedRecipesSection) {
                suggestedRecipesSection.style.display = "none"; // Hide the section
            }
            return;
        }

        fetch('../php/get_recipe_suggestions.php')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    suggestedRecipes = data.suggestedRecipes;
                    populateSuggestedRecipesTable(suggestedRecipes);
                    if (suggestedRecipesSection) {
                        suggestedRecipesSection.style.display = "block"; // Show when authenticated
                    }
                } else {
                    document.querySelector("#suggestedRecipesTable tbody").innerHTML = `<tr><td colspan="4">${data.message}</td></tr>`;
                }
            });
    }

    function populateSuggestedRecipesTable(recipes) {
        const tbody = document.querySelector("#suggestedRecipesTable tbody");
        tbody.innerHTML = "";
        const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
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
                    ${isAuthenticated ? `<button class="favoriteBtn" style="border-radius: 5px" data-id="${recipe.recipe_id}">${favText}</button>` : ''}
                    <button class="viewRecipeBtn" style="border-radius: 5px" data-id="${recipe.recipe_id}">View Recipe</button>
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
        const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
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
                    ${isAuthenticated ? `<button class="favoriteBtn" style="border-radius: 5px" data-id="${recipe.recipe_id}">${favText}</button>` : ''}
                    <button class="viewRecipeBtn" style="border-radius: 5px" data-id="${recipe.recipe_id}">View Recipe</button>
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
            nextButton.style.borderRadius = "5px";
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
    const startPreparationBtn = document.getElementById('startPreparationBtn');
    const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
    if (!isAuthenticated) {
        startPreparationBtn.style.display = 'none';
    } else {
        startPreparationBtn.style.display = 'block';
        startPreparationBtn.onclick = function() {
            startPreparation(recipeId);
        };
    }
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

    // Updated startPreparation function in recipes.js
    function startPreparation(recipeId) {
        fetch('../php/check_recipe_ingredients.php?recipe_id=' + recipeId)
            .then(response => response.json())
            .then(data => {
                if (data.missing && data.missing.length > 0) {
                    let msg = "Missing ingredients: " + data.missing.join(", ") + ".\n";
                    msg += "Click OK to add missing ingredients to your shopping list, or Cancel to continue with the recipe.";

                    // Use the custom confirmation modal instead of confirm()
                    showConfirmationModal(msg).then((confirmed) => {
                        if (confirmed) {
                            fetch('../php/add_missing_to_shopping_list.php', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ recipe_id: recipeId, missing: data.missing_ids })
                            })
                                .then(response => response.json())
                                .then(result => {
                                    showModalMessage('recipeModal', result.message, 'success', 3000);
                                });
                        } else {
                            showModalMessage('recipeModal', 'Continuing with recipe', 'success', 3000);
                        }
                    });
                } else {
                    showModalMessage('recipeModal', 'There was an error', 'success', 3000);
                }
            });

    }

    // On page load, first load favorites then load suggested and all recipes
    loadFavorites(function(){
        loadSuggestedRecipes();
        loadAllRecipes();
    });
});
