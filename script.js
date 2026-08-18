/**
 * Smart Port & Logistics Management System
 * Login Page JavaScript
 */

// ===== Form Elements =====
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const rememberMe = document.getElementById('rememberMe');
const loginButton = loginForm.querySelector('.login-button');

// ===== Error Display Elements =====
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// ===== Modal Elements =====
const successModal = document.getElementById('successModal');

// ===== Email Validation Regex =====
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ===== Password Validation Regex =====
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Validate Email Format
 */
function validateEmail(email) {
    return emailRegex.test(email);
}

/**
 * Validate Password Strength
 * Requirements: min 8 chars, uppercase, lowercase, number, special char
 */
function validatePassword(password) {
    return passwordRegex.test(password);
}

/**
 * Show Email Error
 */
function showEmailError(message) {
    emailInput.classList.add('error');
    emailError.textContent = message;
    emailError.style.display = 'block';
}

/**
 * Hide Email Error
 */
function hideEmailError() {
    emailInput.classList.remove('error');
    emailError.textContent = '';
    emailError.style.display = 'none';
}

/**
 * Show Password Error
 */
function showPasswordError(message) {
    passwordInput.classList.add('error');
    passwordError.textContent = message;
    passwordError.style.display = 'block';
}

/**
 * Hide Password Error
 */
function hidePasswordError() {
    passwordInput.classList.remove('error');
    passwordError.textContent = '';
    passwordError.style.display = 'none';
}

/**
 * Validate Form
 */
function validateForm() {
    let isValid = true;

    // Email Validation
    if (!emailInput.value.trim()) {
        showEmailError('Email address is required');
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        showEmailError('Please enter a valid email address');
        isValid = false;
    } else {
        hideEmailError();
    }

    // Password Validation
    if (!passwordInput.value) {
        showPasswordError('Password is required');
        isValid = false;
    } else if (passwordInput.value.length < 8) {
        showPasswordError('Password must be at least 8 characters');
        isValid = false;
    } else {
        hidePasswordError();
    }

    return isValid;
}

/**
 * Handle Form Submit
 */
loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Validate Form
    if (!validateForm()) {
        return;
    }

    // Show Loading State
    loginButton.disabled = true;
    loginButton.classList.add('loading');

    try {
        // Simulate API Call (Replace with actual API endpoint)
        await simulateLogin(emailInput.value, passwordInput.value);

        // Success
        showSuccessModal();

        // Reset Form and Redirect to Dashboard
        setTimeout(() => {
            loginForm.reset();
            loginButton.disabled = false;
            loginButton.classList.remove('loading');
            // Redirect to dashboard after login
            window.location.href = 'dashboard.html';
        }, 2500);

    } catch (error) {
        // Show Error
        showPasswordError(error.message || 'Login failed. Please try again.');
        loginButton.disabled = false;
        loginButton.classList.remove('loading');
    }
});

/**
 * Simulate Login API Call
 * Replace this with actual API integration
 */
function simulateLogin(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Mock authentication
            // In production, this should call your backend API
            if (email && password) {
                console.log('Login attempt:', { email, timestamp: new Date().toISOString() });
                resolve({ success: true, message: 'Login successful' });
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 1500);
    });
}

/**
 * Show Success Modal
 */
function showSuccessModal() {
    successModal.classList.add('active');
}

/**
 * Close Modal
 */
function closeModal() {
    successModal.classList.remove('active');
}

/**
 * Toggle Password Visibility
 */
togglePassword.addEventListener('click', function (e) {
    e.preventDefault();

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        togglePassword.textContent = '👁';
    }
});

/**
 * Clear Error on Email Input
 */
emailInput.addEventListener('input', function () {
    if (emailInput.classList.contains('error')) {
        hideEmailError();
    }
});

/**
 * Clear Error on Password Input
 */
passwordInput.addEventListener('input', function () {
    if (passwordInput.classList.contains('error')) {
        hidePasswordError();
    }
});

/**
 * Validate Email on Blur
 */
emailInput.addEventListener('blur', function () {
    if (emailInput.value && !validateEmail(emailInput.value)) {
        showEmailError('Please enter a valid email address');
    }
});

/**
 * Save Remember Me Preference
 */
rememberMe.addEventListener('change', function () {
    if (this.checked && emailInput.value) {
        localStorage.setItem('rememberedEmail', emailInput.value);
    } else {
        localStorage.removeItem('rememberedEmail');
    }
});

/**
 * Load Remembered Email
 */
function loadRememberedEmail() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberMe.checked = true;
    }
}

/**
 * Handle Social Login (Microsoft)
 */
document.querySelectorAll('.social-button.microsoft').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Microsoft OAuth would initiate here');
        alert('Microsoft login integration would be configured here');
    });
});

/**
 * Handle Social Login (Google)
 */
document.querySelectorAll('.social-button.google').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Google OAuth would initiate here');
        alert('Google login integration would be configured here');
    });
});

/**
 * Handle Forgot Password
 */
document.querySelectorAll('.forgot-password').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Forgot password flow would initiate here');
        alert('Password reset link would be sent to your email');
    });
});

/**
 * Handle Sign Up Link
 */
document.querySelectorAll('.signup-link a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Sign up flow would initiate here');
        alert('Access request form would be displayed here');
    });
});

/**
 * Handle Help Link
 */
document.querySelectorAll('.help-link a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Support contact would be displayed here');
        alert('Support contact: support@smartport.logistics\nPhone: +1-800-LOGISTICS');
    });
});

/**
 * Close Modal on Outside Click
 */
successModal.addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

/**
 * Keyboard Shortcuts
 */
document.addEventListener('keydown', function (e) {
    // Escape key closes modal
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Enter key submits form (if password field is focused)
    if (e.key === 'Enter' && document.activeElement === passwordInput) {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

/**
 * Prevent Auto-Fill Issues
 */
window.addEventListener('load', function () {
    // Check if browser auto-filled the form
    if (emailInput.value) {
        emailInput.dispatchEvent(new Event('blur'));
    }
});

/**
 * Initialize on Page Load
 */
document.addEventListener('DOMContentLoaded', function () {
    loadRememberedEmail();
    console.log('Smart Port & Logistics Login System Initialized');
    
    // Accessibility: Focus first input
    emailInput.focus();
});

/**
 * Session Timeout Handler (Optional)
 * Logs user out after 30 minutes of inactivity
 */
let sessionTimeout;
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

function resetSessionTimeout() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
        alert('Your session has expired. Please log in again.');
        loginForm.reset();
    }, SESSION_TIMEOUT);
}

document.addEventListener('mousemove', resetSessionTimeout);
document.addEventListener('keypress', resetSessionTimeout);
document.addEventListener('click', resetSessionTimeout);

// Initialize session timeout
resetSessionTimeout();
