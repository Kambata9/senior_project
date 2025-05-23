document.addEventListener("DOMContentLoaded", function() {
    // Check if user is premium using sessionStorage
    if (sessionStorage.getItem('user_role') !== 'premium') {
        // Create a popup element for the message
        const popup = document.createElement('div');
        popup.textContent = "Access denied. Shopping Lists only available to authenticated premium users. Please subscribe to access this page.";
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

    // Load navigation and footer includes
    fetch('../includes/nav.html').then(response => response.text()).then(data => {
        document.getElementById('nav').innerHTML = data;
    });
    fetch('../includes/foot.html').then(response => response.text()).then(data => {
        document.getElementById('foot').innerHTML = data;
    });

    // Load ingredients for the datalist (for manual entry)
    function loadIngredients() {
        fetch('../php/get_ingredients.php')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const dataList = document.getElementById('ingredientsList');
                    dataList.innerHTML = "";
                    data.ingredients.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item.ingredient_name;
                        dataList.appendChild(option);
                    });
                } else {
                    alert("Error loading ingredients for shopping list.");
                }
            });
    }

    // Load the shopping list for the current user
    function loadShoppingList() {
        fetch('../php/get_shopping_list.php')
            .then(response => response.json())
            .then(data => {
                const tbody = document.querySelector("#shoppingListTable tbody");
                tbody.innerHTML = "";
                if (data.success) {
                    if (data.shoppingList.length === 0) {
                        tbody.innerHTML = "<tr><td colspan='3'>No items in your shopping list.</td></tr>";
                    } else {
                        data.shoppingList.forEach(item => {
                            const tr = document.createElement('tr');
                            tr.innerHTML = `
                <td>${item.ingredient_name}</td>
                <td>${item.date_added}</td>
                <td><button class="deleteShoppingItemBtn" data-id="${item.shopping_list_id}">Delete</button></td>
              `;
                            tbody.appendChild(tr);
                        });
                        // Attach event listeners for delete buttons
                        document.querySelectorAll('.deleteShoppingItemBtn').forEach(btn => {
                            btn.addEventListener('click', function() {
                                const id = this.getAttribute('data-id');
                                deleteShoppingItem(id);
                            });
                        });
                    }
                } else {
                    tbody.innerHTML = `<tr><td colspan='3'>${data.message}</td></tr>`;
                }
            });
    }

    // Handle the manual add form submission
    document.getElementById('addShoppingItemForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const ingredientName = document.getElementById('shoppingIngredientInput').value.trim();
        if (!ingredientName) {
            // You could also choose to silently return if the input is empty
            return;
        }
        fetch('../php/add_item_to_shopping_list.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ ingredient_name: ingredientName })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('addShoppingItemForm').reset();
                    loadShoppingList();
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error("Error adding item to shopping list:", error);
            });
    });

    // Delete a shopping list item
    function deleteShoppingItem(shopping_list_id) {
        fetch('../php/delete_shopping_list_item.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ shopping_list_id: shopping_list_id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadShoppingList();
            }
        })
        .catch(error => {
            console.error("Error removing item from shopping list:", error);
        });
    }

    // Initial load
    loadIngredients();
    loadShoppingList();
});
