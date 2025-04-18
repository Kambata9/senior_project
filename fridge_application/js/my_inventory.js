document.addEventListener("DOMContentLoaded", function() {
    // Check authentication status
    if (!sessionStorage.getItem('authenticated')) {
        const popup = document.createElement('div');
        popup.textContent = "Access denied. Inventory Management only available to logged-in users. Please login to access this page.";
        popup.style.position = 'fixed';
        popup.style.top = '20px';
        popup.style.left = '50%';
        popup.style.fontSize = '20px';
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
    fetch('../includes/nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav').innerHTML = data;
        });

    fetch('../includes/foot.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('foot').innerHTML = data;
        });

    // Global variables for inventory management
    let ingredientsData = []; // will hold ingredients from DB
    let currentFilter = "";
    let currentSort = ""; // sort parameter

    // Load ingredients for dropdown
    function loadIngredients() {
        fetch('../php/get_ingredients.php')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    ingredientsData = data.ingredients;
                    const dataList = document.getElementById('ingredientsList');
                    dataList.innerHTML = "";
                    ingredientsData.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item.ingredient_name;
                        dataList.appendChild(option);
                    });
                } else {
                    alert("Error loading ingredients.");
                }
            });
    }

    // Load user's inventory
    function loadInventory() {
        let url = '../php/get_inventory.php';
        let params = [];
        if (currentFilter) {
            params.push("filter=" + encodeURIComponent(currentFilter));
        }
        if (currentSort === "ingredient_type") {
            params.push("sort=ingredient_type");
        }
        if (params.length > 0) {
            url += "?" + params.join("&");
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    populateInventoryTable(data.inventory);
                } else {
                    alert(data.message);
                }
            });
    }

    function populateInventoryTable(inventory) {
        const tbody = document.querySelector("#inventoryTable tbody");
        tbody.innerHTML = "";
        if (inventory.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 8;
            cell.textContent = "No inventory items found.";
            row.appendChild(cell);
            tbody.appendChild(row);
            return;
        }
        inventory.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.ingredient_type}</td>
                <td>${item.ingredient_name}</td>
                <td>${item.unit_measure || ''}</td>
                <td>${item.quantity || ''}</td>
                <td>${item.date_added}</td>
                <td>${item.expiration_date}</td>
                <td>${item.comment || ''}</td>
                <td>
                    <button class="editBtn" data-id="${item.inventory_id}">Edit</button>
                    <button class="deleteBtn" data-id="${item.inventory_id}">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
        // Attach event listeners for edit and delete buttons
        document.querySelectorAll('.editBtn').forEach(btn => {
            btn.addEventListener('click', openEditModal);
        });
        document.querySelectorAll('.deleteBtn').forEach(btn => {
            btn.addEventListener('click', deleteInventoryItem);
        });
    }

    // Modal helper functions
    function openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }
    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    // --- Add Item Modal ---
    document.getElementById('addItemBtn').addEventListener('click', () => openModal('addItemModal'));
    document.getElementById('addItemClose').addEventListener('click', () => closeModal('addItemModal'));

    // Handle Add Item Form Submission
    document.getElementById('addItemForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Get form values
        const ingredientName = document.getElementById('ingredientInput').value.trim();
        const unitMeasure = document.getElementById('unitMeasure').value;
        const quantity = document.getElementById('quantity').value;
        const expirationDate = document.getElementById('expirationDate').value;
        const comment = document.getElementById('comment').value.trim();

        // Validate: ingredient must match one of the loaded ingredients
        const ingredient = ingredientsData.find(item => item.ingredient_name.toLowerCase() === ingredientName.toLowerCase());
        if (!ingredient) {
            alert("Please select a valid ingredient from the list.");
            return;
        }
        if (comment.length > 50) {
            alert("Comment cannot exceed 50 characters.");
            return;
        }

        // Prepare data
        const data = {
            ingredient_id: ingredient.ingredient_id,
            unit_measure: unitMeasure,
            quantity: quantity,
            expiration_date: expirationDate,
            comment: comment
        };

        fetch('../php/add_item_to_inventory.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    showPopup(result.message);
                    document.getElementById('addItemForm').reset();
                    closeModal('addItemModal');
                    loadInventory();
                } else {
                    showPopup(result.message);
                }
            });
    });

    // --- Sort & Filter Buttons ---
    document.getElementById('sortBtn').addEventListener('click', function() {
        currentSort = "ingredient_type";
        loadInventory();
    });
    document.getElementById('filterBtn').addEventListener('click', function() {
        currentFilter = document.getElementById('filterInput').value.trim();
        loadInventory();
    });
    document.getElementById('clearFilterBtn').addEventListener('click', function() {
        currentFilter = "";
        document.getElementById('filterInput').value = "";
        currentSort = ""; // revert to default sort by expiration date
        loadInventory();
    });

    // --- Edit Item Modal ---
    function openEditModal(e) {
        const inventoryId = e.target.getAttribute('data-id');
        // Fetch current row data (could also store in data attributes)
        const row = e.target.closest('tr');
        const cells = row.getElementsByTagName('td');
        // Pre-populate form fields
        document.getElementById('editInventoryId').value = inventoryId;
        document.getElementById('editIngredientInput').value = cells[1].textContent;
        document.getElementById('editUnitMeasure').value = cells[2].textContent;
        document.getElementById('editQuantity').value = cells[3].textContent;
        // Convert date_added to appropriate format (assuming stored as YYYY-MM-DD HH:MM:SS)
        let dateAdded = cells[4].textContent;
        if (dateAdded.length === 10) dateAdded += "T00:00";
        document.getElementById('editDateAdded').value = dateAdded;
        document.getElementById('editExpirationDate').value = cells[5].textContent;
        document.getElementById('editComment').value = cells[6].textContent;
        openModal('editItemModal');
    }
    document.getElementById('editItemClose').addEventListener('click', () => closeModal('editItemModal'));

    document.getElementById('editItemForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const inventoryId = document.getElementById('editInventoryId').value;
        const ingredientName = document.getElementById('editIngredientInput').value.trim();
        const unitMeasure = document.getElementById('editUnitMeasure').value;
        const quantity = document.getElementById('editQuantity').value;
        const dateAdded = document.getElementById('editDateAdded').value;
        const expirationDate = document.getElementById('editExpirationDate').value;
        const comment = document.getElementById('editComment').value.trim();
        // Validate ingredient against loaded list
        const ingredient = ingredientsData.find(item => item.ingredient_name.toLowerCase() === ingredientName.toLowerCase());
        if (!ingredient) {
            alert("Please select a valid ingredient from the list.");
            return;
        }
        if (comment.length > 50) {
            alert("Comment cannot exceed 50 characters.");
            return;
        }
        const data = {
            inventory_id: inventoryId,
            ingredient_id: ingredient.ingredient_id,
            unit_measure: unitMeasure,
            quantity: quantity,
            date_added: dateAdded,
            expiration_date: expirationDate,
            comment: comment
        };

        fetch('../php/edit_inventory_item.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    showPopup(result.message);
                    closeModal('editItemModal');
                    loadInventory();
                } else {
                    alert(result.message);
                }
            });
    });

    // --- Delete Inventory Item ---
    function deleteInventoryItem(e) {
        const inventoryId = e.target.getAttribute('data-id');
        fetch('../php/delete_inventory_item.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inventory_id: inventoryId })
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    loadInventory();
                }
            })
            .catch(error => {
                console.error("Error deleting inventory item:", error);
            });
    }

    // Popup message display for 2 seconds
    function showPopup(message) {
        const popup = document.createElement('div');
        popup.className = 'popupMessage';
        popup.textContent = message;
        document.body.appendChild(popup);
        setTimeout(() => {
            popup.remove();
        }, 2000);
    }

    // Initial load of ingredients and inventory
    loadIngredients();
    loadInventory();
});
