document.addEventListener("DOMContentLoaded", function() {
    // Load nav and footer includes
    fetch('../includes/nav.html').then(response => response.text()).then(data => {
        document.getElementById('nav').innerHTML = data;
    });
    fetch('../includes/foot.html').then(response => response.text()).then(data => {
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

    function showConfirmPopup(message) {
        return new Promise((resolve) => {
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

            const popup = document.createElement('div');
            popup.style.backgroundColor = '#A27B5C';
            popup.style.color = '#fff';
            popup.style.padding = '20px';
            popup.style.borderRadius = '8px';
            popup.style.boxShadow = '0 0 150px #3f4f44';
            popup.style.textAlign = 'center';
            popup.style.fontFamily = 'Arial, sans-serif';
            popup.style.maxWidth = '400px';
            popup.style.width = '80%';

            const msgP = document.createElement('p');
            msgP.textContent = message;
            popup.appendChild(msgP);

            const buttonsDiv = document.createElement('div');
            buttonsDiv.style.marginTop = '20px';
            buttonsDiv.style.display = 'flex';
            buttonsDiv.style.justifyContent = 'center';

            const noBtn = document.createElement('button');
            noBtn.textContent = 'No';
            noBtn.style.marginRight = '10px';
            noBtn.style.borderRadius = '5px';
            noBtn.addEventListener('click', function() {
                document.body.removeChild(overlay);
                resolve(false);
            });
            buttonsDiv.appendChild(noBtn);

            const yesBtn = document.createElement('button');
            yesBtn.textContent = 'Yes';
            yesBtn.style.borderRadius = '5px';
            yesBtn.addEventListener('click', function() {
                document.body.removeChild(overlay);
                resolve(true);
            });
            buttonsDiv.appendChild(yesBtn);

            popup.appendChild(buttonsDiv);
            overlay.appendChild(popup);
            document.body.appendChild(overlay);
        });
    }

    // client-side authentication
    let isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
    if(isAuthenticated) {
        document.getElementById('account-details').style.display = 'block';
        document.getElementById('auth-options').style.display = 'none';
        document.getElementById('display-email').textContent = sessionStorage.getItem('user_email');
        document.getElementById('display-plan').textContent = sessionStorage.getItem('user_role');
        if(sessionStorage.getItem('user_role') === 'premium') {
            document.getElementById('dietary-preferences-section').style.display = 'block';
            document.getElementById('display-diet').textContent = sessionStorage.getItem('user_diet') || 'Not set';
            document.getElementById('unsubscribePremiumBtn').style.display = 'inline-block';
        } else {
            document.getElementById('unsubscribePremiumBtn').style.display = 'none';
        }
    } else {
        document.getElementById('auth-options').style.display = 'block';
        document.getElementById('account-details').style.display = 'none';
    }

    if(isAuthenticated) {
        let userRole = sessionStorage.getItem('user_role');
        if(userRole === 'premium') {
            document.getElementById('subscribePremiumBtn').style.display = 'none';
        } else {
            document.getElementById('subscribePremiumBtn').style.display = 'inline-block';
        }
    }

    // Modal helper functions
    function openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }
    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }


    if(isAuthenticated) {
        if(sessionStorage.getItem('user_role') === 'admin') {
            document.getElementById('selectPlanBtn').style.display = 'none';
        }
    }

    document.getElementById('deleteAccountBtn').addEventListener('click', function() {
        showConfirmPopup("Are you sure you want to delete your account and all your data? This action cannot be undone.")
            .then((confirmed) => {
                if (confirmed) {
                    openModal('deleteAccountModal');
                }
            });
    });

    // Delete Account Modal close button listener:
    document.getElementById('deleteAccountClose').addEventListener('click', function() {
        closeModal('deleteAccountModal');
    });

    // Delete Account Form submission listener:
    document.getElementById('deleteAccountForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('deleteAccountPassword').value;
        fetch('../php/delete_account.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: password })
        })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    showModalMessage('deleteAccountModal', data.message, 'success', 2000);
                    setTimeout(() => {
                        sessionStorage.clear();
                        window.location.href = '../webpages/my_account.html';
                    }, 2000);
                } else {
                    showModalMessage('deleteAccountModal', data.message, 'error', 3000);
                }
            })
            .catch(error => {
                console.error("Error deleting account:", error);
                showModalMessage('deleteAccountModal', "Error deleting account. Please try again later.", 'error', 3000);
            });
    });


    // Event listeners for opening/closing modals
    document.getElementById('signupBtn').addEventListener('click', () => openModal('signupModal'));
    document.getElementById('signupClose').addEventListener('click', () => closeModal('signupModal'));

    document.getElementById('loginBtn').addEventListener('click', () => openModal('loginModal'));
    document.getElementById('loginClose').addEventListener('click', () => closeModal('loginModal'));

    document.getElementById('recoverBtn').addEventListener('click', () => openModal('recoverModal'));
    document.getElementById('recoverClose').addEventListener('click', () => closeModal('recoverModal'));

    document.getElementById('changeEmailBtn').addEventListener('click', () => openModal('changeEmailModal'));
    document.getElementById('changeEmailClose').addEventListener('click', () => closeModal('changeEmailModal'));

    document.getElementById('changePasswordBtn').addEventListener('click', () => openModal('changePasswordModal'));
    document.getElementById('changePasswordClose').addEventListener('click', () => closeModal('changePasswordModal'));

    document.getElementById('selectPlanBtn').addEventListener('click', () => openModal('planModal'));
    document.getElementById('planClose').addEventListener('click', () => closeModal('planModal'));

    document.getElementById('subscribePremiumBtn').addEventListener('click', () => openModal('paymentModal'));
    document.getElementById('paymentClose').addEventListener('click', () => closeModal('paymentModal'));



    if(isAuthenticated && sessionStorage.getItem('user_role') === 'premium') {
        document.getElementById('setDietBtn').addEventListener('click', () => openModal('dietModal'));
        document.getElementById('dietClose').addEventListener('click', () => closeModal('dietModal'));
    }

    // Unsubscribe Premium Button for premium users
    document.getElementById('unsubscribePremiumBtn').addEventListener('click', function() {
        fetch('../php/unsubscribe_premium.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    sessionStorage.setItem('user_role', 'regular');
                    showModalMessage('planModal', data.message, 'success', 2000);
                    setTimeout(() => {
                        closeModal('planModal');
                        location.reload();
                    }, 2000);
                } else {
                    showModalMessage('planModal', data.message, 'error', 2000);
                }
            });
    });

    // --- AJAX calls and validations ---

    // Signup Form Submission
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('signupUsername').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const passwordConfirm = document.getElementById('signupPasswordConfirm').value;
        const securityQuestion = document.getElementById('signupSecurityQuestion').value;
        const securityAnswer = document.getElementById('signupSecurityAnswer').value;

        if(password !== passwordConfirm) {
            showModalMessage('signupModal', 'Passwords do not match.', 'error', 3000);
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            showModalMessage('signupModal', 'Invalid email format.', 'error', 3000);
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if(!passwordRegex.test(password)) {
            showModalMessage('signupModal', 'Password must be at least 8 characters long, contain an uppercase letter, one lowercase letter, and one number.', 'error', 8000);
            return;
        }

        fetch('../php/signup.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, signupSecurityQuestion: securityQuestion, signupSecurityAnswer: securityAnswer })
        })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    sessionStorage.setItem('authenticated', 'false');
                    sessionStorage.setItem('user_email', data.email);
                    sessionStorage.setItem('user_role', data.user_role);
                    sessionStorage.setItem('user_diet', data.user_diet);
                    showModalMessage('signupModal', data.message, 'success', 2000);
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                } else {
                    showModalMessage('signupModal', data.message, 'error', 3000);
                }
            });
    });

    // Login Form Submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const identifier = document.getElementById('loginIdentifier').value.trim();
        const password = document.getElementById('loginPassword').value;
        fetch('../php/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                sessionStorage.setItem('authenticated', 'true');
                sessionStorage.setItem('user_email', data.user_email);
                sessionStorage.setItem('user_role', data.user_role);
                sessionStorage.setItem('user_diet', data.user_diet);
                showModalMessage('loginModal', data.message, 'success', 1000);
                setTimeout(() => {
                    location.reload();
                }, 1000);
            } else {
                showModalMessage('loginModal', data.message, 'error', 3000);

            }
        });
    });


    // Recover Password Form Submission
    document.getElementById('recoverForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Retrieve input values
        const username = document.getElementById('recoverUsername').value.trim();
        const email = document.getElementById('recoverEmail').value.trim();
        const newPassword = document.getElementById('recoverNewPassword').value;
        const newPasswordConfirm = document.getElementById('recoverNewPasswordConfirm').value;
        const recoverSecurityAnswer = document.getElementById('recoverSecurityAnswer').value;

        // Validate all fields are filled
        if (!username || !email || !newPassword || !newPasswordConfirm) {
            showModalMessage('recoverModal', 'Please fill in all fields.', 'error', 2000);
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showModalMessage('recoverModal', 'Invalid email format.', 'error', 2000);
            return;
        }

        // Validate new password criteria: at least 8 characters, one uppercase, one lowercase, and one number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            showModalMessage('recoverModal', 'New password must be at least 8 characters long and contain an uppercase letter, one lowercase letter, and one number.', 'error', 8000);
            return;
        }

        // Check that the new password and its confirmation match
        if (newPassword !== newPasswordConfirm) {
            showModalMessage('recoverModal', 'The new passwords do not match.', 'error', 2000);
            return;
        }


        fetch('../php/recover_password.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, newPassword, recoverSecurityAnswer} )
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showModalMessage('recoverModal', data.message, 'success', 2000);
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                } else {
                    showModalMessage('recoverModal', data.message, 'error', 3000);
                }
            })
            .catch(error => {
                console.error("Error during password recovery:", error);
                showModalMessage('recoverModal', 'There was an error while recovering password. Please try again later.', 'error', 3000);

            });
    });



    // Change Email Form Submission
    document.getElementById('changeEmailForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const newEmail = document.getElementById('newEmail').value.trim();
        fetch('../php/change_email.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newEmail })
        })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    sessionStorage.setItem('user_email', newEmail);
                    document.getElementById('display-email').textContent = newEmail;
                    showModalMessage('changeEmailModal', data.message, 'success', 3000);
                    setTimeout(() => {
                    closeModal('changeEmailModal');
                    }, 3000);
                } else {
                    showModalMessage('changeEmailModal', data.message, 'error', 3000);
                }
            });
    });

    // Change Password Form Submission
    document.getElementById('changePasswordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('cpUsername').value.trim();
        const oldPassword = document.getElementById('oldPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const newPasswordConfirm = document.getElementById('newPasswordConfirm').value;
        if(newPassword !== newPasswordConfirm) {
            alert('New passwords do not match.');
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if(!passwordRegex.test(newPassword)) {
            alert('New password must be at least 8 characters long, contain an uppercase letter, one lowercase letter, and one number.');
            return;
        }
        fetch('../php/change_password.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, oldPassword, newPassword })
        })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    showModalMessage('changePasswordModal', data.message, 'success', 2000);
                    setTimeout(() => {
                    closeModal('changePasswordModal');
                    }, 2000);
                } else {
                    showModalMessage('changePasswordModal', data.message, 'error', 3000);
                }
            });
    });

    // Plan modal (unsubscribe, subscribe)
    document.getElementById('unsubscribePremiumBtn').addEventListener('click', function() {
        fetch('../php/unsubscribe_premium.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(data => {
                // Now data is the parsed JSON from the server
                if (data.success) {
                    sessionStorage.setItem('user_role', 'regular');
                    showModalMessage('planModal', data.message, 'success', 3000);
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                } else {
                    showModalMessage('planModal', data.message, 'error', 3000);
                }
            })
            .catch(error => {
                console.error('Error unsubscribing:', error);
            });
    });

    // Payment Form Submission
    document.getElementById('paymentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const cardName = document.getElementById('cardName').value.trim();
        const cardExp = document.getElementById('cardExp').value.trim();
        const cardCVC = document.getElementById('cardCVC').value.trim();

        if (!/^(?:5[1-5]\d{14}|4\d{15})$/.test(cardNumber)) {
            showModalMessage('paymentModal', 'Invalid card number. For Mastercard, the number must start with 51-55. For Visa, the number must start with 4. Card number should be 16 digits long.', 'error', 15000);
            return;
        }
        if(!/^[A-Za-z]{2,}\s[A-Za-z]{2,}$/.test(cardName)) {
            showModalMessage('paymentModal','Name on card must be two names, each at least 2 letters.', 'error', 15000);
            return;
        }
        if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExp)) {
            showModalMessage('paymentModal', 'Expiration date must be in MM/YY format.', 'error', 15000);
            return;
        }
        if(!/^\d{3}$/.test(cardCVC)) {
            showModalMessage('paymentModal', 'CVC must be 3 digits.', 'error', 15000);
            return;
        }

        fetch('../php/subscribe_premium.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cardNumber, cardName, cardExp, cardCVC })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                sessionStorage.setItem('user_role', 'premium');
                showModalMessage('paymentModal', data.message, 'success', 3000);
                setTimeout(() => {
                window.location.reload();
                }, 3000);
            } else {
                showModalMessage('paymentModal', data.message, 'error', 3000);
            }
        })
        .catch(error => {
            console.error("Subscription error:", error);
        });
    });

    // Dietary Preferences Form Submission (Premium only)
    document.getElementById('dietForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const diet = document.querySelector('input[name="diet"]:checked').value;
        fetch('../php/set_dietary_preference.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ diet })
        })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    sessionStorage.setItem('user_diet', data.user_diet);
                    document.getElementById('display-diet').textContent = data.user_diet;
                    showModalMessage('dietModal', data.message, 'success', 2000);
                    setTimeout(() => {
                    closeModal('dietModal');
                    }, 2000);
                } else {
                    showModalMessage('dietModal', data.message, 'error', 3000);
                }
            });
    });

    // Sign Out
    document.getElementById('signoutBtn').addEventListener('click', function() {
        sessionStorage.clear();
        location.reload();
    });
});


