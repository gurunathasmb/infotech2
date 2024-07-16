let userIdCounter = 1; //  ID to count users
let deleteTargetRow;

document.addEventListener('DOMContentLoaded', function() {
    // Loading users List
    loadUsersFromLocalStorage();

    document.getElementById('addButton').addEventListener('click', function() {
        document.getElementById('popupForm').style.display = 'flex';
    });

    document.getElementById('closePopup').addEventListener('click', function() {
        document.getElementById('popupForm').style.display = 'none';
    });

    document.getElementById('addUserForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const gender = document.getElementById('gender').value; 
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const city = document.getElementById('city').value;

        const tableBody = document.getElementById('userTableBody');

        const noUsersRow = document.querySelector('.no-users');
        if (noUsersRow) {
            noUsersRow.parentNode.removeChild(noUsersRow);
        }

        const newRow = document.createElement('tr');
        newRow.classList.add('slide-in');
        newRow.innerHTML = `
            <td>${String(userIdCounter).padStart(2, '0')}</td>
            <td>${name}</td>
            <td class="gender-cell">${gender}</td>
            <td>${city}</td>
            <td>${phone}</td>
            <td>
                <span class="view-btn" onclick="viewUser(this)"><img src="view.png" alt="View"></span>
                <span class="delete-btn" onclick="confirmDeleteUser(this)"><img src="delete.png" alt="Delete"></span>
            </td>
            <td style="display: none;">${email}</td>
        `;

        tableBody.appendChild(newRow);

        // Show gender column
        const genderCells = document.querySelectorAll('.gender-cell');
        genderCells.forEach(cell => {
            cell.style.display = 'table-cell';
        });

        // Show gender
        const genderHeader = document.querySelector('.gender-header');
        if (genderHeader) {
            genderHeader.style.display = 'table-cell';
        }

        // Save user 
        saveUserToLocalStorage({ id: userIdCounter, name, gender, email, phone, city });

        userIdCounter++; // Increment the user ID 

        document.getElementById('addUserForm').reset();
        document.getElementById('popupForm').style.display = 'none'; // Close the popup 
    });

    document.getElementById('closeViewPopup').addEventListener('click', function() {
        document.getElementById('viewPopup').style.display = 'none';
    });

    document.getElementById('cancelDelete').addEventListener('click', function() {
        document.getElementById('deletePopup').style.display = 'none';
    });

    document.getElementById('confirmDelete').addEventListener('click', function() {
        deleteUser();
        document.getElementById('deletePopup').style.display = 'none';
    });
});

function viewUser(button) {
    const row = button.parentElement.parentElement;
    const cells = row.children;

    document.getElementById('viewName').textContent = cells[1].textContent;
    document.getElementById('viewGender').textContent = cells[2].textContent; 
    document.getElementById('viewEmail').textContent = cells[5].textContent;
    document.getElementById('viewPhone').textContent = cells[4].textContent;
    document.getElementById('viewCity').textContent = cells[3].textContent;

    document.getElementById('viewPopup').style.display = 'flex';
}

function confirmDeleteUser(button) {
    deleteTargetRow = button.parentElement.parentElement;
    const userName = deleteTargetRow.children[1].textContent;
    document.getElementById('deleteUserName').textContent = userName;
    document.getElementById('deletePopup').style.display = 'flex';
}

function deleteUser() {
    if (deleteTargetRow) {
        const userId = parseInt(deleteTargetRow.children[0].textContent, 10); // Get user ID 
        deleteTargetRow.remove();
        deleteTargetRow = null;

        // Delete user 
        deleteUserFromLocalStorage(userId);

        const tableBody = document.getElementById('userTableBody');
        if (tableBody.children.length === 0) {
            const noUsersRow = document.createElement('tr');
            noUsersRow.innerHTML = `<td colspan="6" class="no-users">No Users added</td>`;
            tableBody.appendChild(noUsersRow);
        }
    }
}

function saveUserToLocalStorage(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsersFromLocalStorage() {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length > 0) {
        const tableBody = document.getElementById('userTableBody');
        const noUsersRow = document.querySelector('.no-users');
        if (noUsersRow) {
            noUsersRow.parentNode.removeChild(noUsersRow);
        }

        users.forEach(user => {
            const newRow = document.createElement('tr');
            newRow.classList.add('slide-in');
            newRow.innerHTML = `
                <td>${String(user.id).padStart(2, '0')}</td>
                <td>${user.name}</td>
                <td class="gender-cell">${user.gender}</td>
                <td>${user.city}</td>
                <td>${user.phone}</td>
                <td>
                    <span class="view-btn" onclick="viewUser(this)"><img src="assets/view.png" alt="View"></span>
                    <span class="delete-btn" onclick="confirmDeleteUser(this)"><img src="assets/delete.png" alt="Delete"></span>
                </td>
                <td style="display: none;">${user.email}</td>
            `;

            tableBody.appendChild(newRow);
        });

        // Show gender column 
        const genderCells = document.querySelectorAll('.gender-cell');
        genderCells.forEach(cell => {
            cell.style.display = 'table-cell';
        });

        const genderHeader = document.querySelector('.gender-header');
        if (genderHeader) {
            genderHeader.style.display = 'table-cell';
        }

        userIdCounter = Math.max(...users.map(user => user.id)) + 1;
    }
}

