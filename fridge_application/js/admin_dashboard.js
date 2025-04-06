document.addEventListener("DOMContentLoaded", function() {
    // Check if the user is authenticated and has admin role
    if (sessionStorage.getItem('user_role') !== 'admin') {
        // Create a popup element for the message
        const popup = document.createElement('div');
        popup.textContent = "Access denied. This page is for administrators only.";
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
    // Make the admin dashboard visible
    const dashboard = document.querySelector('.admin-dashboard');
    if (dashboard) {
        dashboard.style.display = 'block';
    }

    // Load navigation and footer
    fetch('../includes/nav.html')
        .then(res => res.text())
        .then(data => { document.getElementById('nav').innerHTML = data; });
    fetch('../includes/foot.html')
        .then(res => res.text())
        .then(data => { document.getElementById('foot').innerHTML = data; });

    // Load performance metrics
    loadAdminMetrics();

    // Load Ingredients Table (Table 1)
    loadIngredientsTable();

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

    // --- Performance Metrics Functions ---
    function loadAdminMetrics() {
        fetch('../php/get_admin_metrics.php')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    populateTopFavoritesTable(data.topFavorites);
                    document.getElementById('totalUsers').textContent = data.totalUsers;
                    document.getElementById('totalPremiumUsers').textContent = data.totalPremiumUsers;
            //        populateUserDietTable(data.topDietTypes);
                } else {
                    alert(data.message);
                }
            });
    }

    function populateTopFavoritesTable(favorites) {
        const tbody = document.getElementById('topFavoritesTable').querySelector('tbody');
        tbody.innerHTML = "";
        favorites.forEach(fav => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${fav.recipe_name}</td><td>${fav.favorite_count}</td>`;
            tbody.appendChild(tr);
        });
    }

   // function populateUserDietTable(userDiet) {
    //    const tbody = document.getElementById('userDietTable').querySelector('tbody');
    //    tbody.innerHTML = "";
    //    userDiet.forEach(diet => {
     //       const tr = document.createElement('tr');
     //       tr.innerHTML = `<td>${diet.diet_type}</td><td>${diet.dietType_count}</td>`;
     //       tbody.appendChild(tr);
     //   });
  //  }

    // --- Ingredients Table Functions ---
    let ingredientsCurrentPage = 1;
    const ingredientsPerPage = 10;
    function loadIngredientsTable() {
        fetch('../php/get_all_ingredients.php')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.ingredientsData = data.ingredients;
                    ingredientsCurrentPage = 1;
                    displayIngredientsPage(ingredientsCurrentPage);
                    setupIngredientsPagination();
                } else {
                    alert(data.message);
                }
            });
    }

    function displayIngredientsPage(page, filter = "") {
        const tbody = document.getElementById('ingredientsTable').querySelector('tbody');
        tbody.innerHTML = "";
        let filteredData = window.ingredientsData;
        if (filter) {
            filteredData = filteredData.filter(ing => ing.ingredient_name.toLowerCase().includes(filter.toLowerCase()));
        }
        const start = (page - 1) * ingredientsPerPage;
        const end = start + ingredientsPerPage;
        const pageData = filteredData.slice(start, end);
        pageData.forEach(ing => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${ing.ingredient_name}</td>
                <td>${ing.ingredient_type}</td>
                <td><button class="deleteIngredientBtn" data-id="${ing.ingredient_id}">Delete</button></td>
            `;
            tbody.appendChild(tr);
        });
        addIngredientDeleteListeners();
    }

    function setupIngredientsPagination(filter = "") {
        const paginationDiv = document.getElementById('ingredientsPagination');
        paginationDiv.innerHTML = "";
        let filteredData = window.ingredientsData;
        if (filter) {
            filteredData = filteredData.filter(ing => ing.ingredient_name.toLowerCase().includes(filter.toLowerCase()));
        }
        const totalPages = Math.ceil(filteredData.length / ingredientsPerPage);
        if (ingredientsCurrentPage > 1) {
            const prev = document.createElement('button');
            prev.textContent = "Previous";
            prev.addEventListener('click', () => {
                ingredientsCurrentPage--;
                displayIngredientsPage(ingredientsCurrentPage, filter);
                setupIngredientsPagination(filter);
            });
            paginationDiv.appendChild(prev);
        }
        if (ingredientsCurrentPage < totalPages) {
            const next = document.createElement('button');
            next.textContent = "Next";
            next.addEventListener('click', () => {
                ingredientsCurrentPage++;
                displayIngredientsPage(ingredientsCurrentPage, filter);
                setupIngredientsPagination(filter);
            });
            paginationDiv.appendChild(next);
        }
    }

    function addIngredientDeleteListeners() {
        document.querySelectorAll('.deleteIngredientBtn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                fetch('../php/delete_ingredient.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ingredient_id: id })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            loadIngredientsTable();
                        } else {
                            alert(data.message);
                        }
                    });
            });
        });
    }

    // Search and Clear for Ingredients
    document.getElementById('ingredientSearch').addEventListener('input', function() {
        ingredientsCurrentPage = 1;
        displayIngredientsPage(ingredientsCurrentPage, this.value);
        setupIngredientsPagination(this.value);
    });
    document.getElementById('clearIngredientFilters').addEventListener('click', function() {
        document.getElementById('ingredientSearch').value = "";
        ingredientsCurrentPage = 1;
        displayIngredientsPage(ingredientsCurrentPage);
        setupIngredientsPagination();
    });

    // --- Modal Opening for Add Ingredient ---
    document.getElementById('addIngredientBtn').addEventListener('click', function() {
        // Clear any previous data in the form
        document.getElementById('addIngredientForm').reset();
        // Display the add ingredient modal
        document.getElementById('addIngredientModal').style.display = 'block';
    });

    // Modal Close Button for Add Ingredient Modal
    document.getElementById('closeAddIngredient').addEventListener('click', function() {
        document.getElementById('addIngredientModal').style.display = 'none';
    });

    // --- Modal Submission Event Listener for Add Ingredient ---
    document.getElementById('addIngredientForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const ingredientType = document.getElementById('newIngredientType').value;
        const ingredientName = document.getElementById('newIngredientName').value.trim();
        if (!ingredientType || !ingredientName) {
            showModalMessage('addIngredientModal', 'All fields are required', 'success', 2000);
            return;
        }
        fetch('../php/add_ingredient.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ingredient_type: ingredientType,
                ingredient_name: ingredientName
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('addIngredientModal').style.display = 'none';
                    loadIngredientsTable();
                    showModalMessage('addIngredientModal', data.message, 'success', 2000);
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                } else {
                    showModalMessage('addIngredientModal', data.message, 'error', 2000);
                }
            })
    });

});