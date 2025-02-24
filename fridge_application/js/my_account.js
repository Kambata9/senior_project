document.addEventListener("DOMContentLoaded", function() {
    // Load nav and footer includes
    fetch('../includes/nav.html').then(response => response.text()).then(data => {
        document.getElementById('nav').innerHTML = data;
    });
    fetch('../includes/foot.html').then(response => response.text()).then(data => {
        document.getElementById('foot').innerHTML = data;
    });

    // Simulate session authentication via sessionStorage (in real deployment, sessions are handled server-side)
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

    // Modal helper functions
    function openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }
    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

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
                    alert('You have unsubscribed from Premium plan.');
                    closeModal('planModal');
                    location.reload();
                } else {
                    alert(data.message);
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

        if(password !== passwordConfirm) {
            alert('Passwords do not match.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            alert('Invalid email format.');
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if(!passwordRegex.test(password)) {
            alert('Password must be at least 8 characters long, contain an uppercase letter, one lowercase letter, and one number.');
            return;
        }

        fetch('../php/signup.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    sessionStorage.setItem('authenticated', 'true');
                    sessionStorage.setItem('user_email', data.user_email);
                    sessionStorage.setItem('user_role', data.user_role);
                    sessionStorage.setItem('user_diet', data.user_diet);
                    location.reload();
                } else {
                    alert(data.message);
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
                    location.reload();
                } else {
                    alert(data.message);
                }
            });
    });

    // Recover Password Form Submission
    document.getElementById('recoverForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('recoverUsername').value.trim();
        const email = document.getElementById('recoverEmail').value.trim();
        fetch('../php/recover_password.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email })
        })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    alert('Password recovery successful. Please check your email for further instructions.');
                    closeModal('recoverModal');
                } else {
                    alert(data.message);
                }
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
                    alert('Email changed successfully.');
                    closeModal('changeEmailModal');
                } else {
                    alert(data.message);
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
                    alert('Password changed successfully.');
                    closeModal('changePasswordModal');
                } else {
                    alert(data.message);
                }
            });
    });

    // Payment Form Submission (for Premium Subscription)
    document.getElementById('paymentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const cardName = document.getElementById('cardName').value.trim();
        const cardExp = document.getElementById('cardExp').value.trim();
        const cardCVC = document.getElementById('cardCVC').value.trim();

        if(!/^\d{16}$/.test(cardNumber)) {
            alert('Debit card number must be 16 digits.');
            return;
        }
        if(!/^[A-Za-z]{2,}\s[A-Za-z]{2,}$/.test(cardName)) {
            alert('Name on card must contain two names, each at least 2 characters.');
            return;
        }
        if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExp)) {
            alert('Expiration date must be in MM/YY format.');
            return;
        }
        if(!/^\d{3}$/.test(cardCVC)) {
            alert('CVC must be 3 digits.');
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
                    alert('Successfully subscribed to Premium plan.');
                    closeModal('paymentModal');
                    closeModal('planModal');
                    location.reload();
                } else {
                    alert(data.message);
                }
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
                    alert(data.message);
                    closeModal('dietModal');
                } else {
                    alert(data.message);
                }
            });
    });

    // Sign Out
    document.getElementById('signoutBtn').addEventListener('click', function() {
        sessionStorage.clear();
        location.reload();
    });
});
