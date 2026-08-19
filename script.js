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
 * Start OAuth with Authorization Code + PKCE.
 */
document.querySelectorAll('.social-button.microsoft').forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        startOAuth('microsoft');
    });
});

document.querySelectorAll('.social-button.google').forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();
        startOAuth('google');
    });
});

const oauthProviders = {
    microsoft: {
        config: CONFIG.OAUTH.MICROSOFT,
        authorizationEndpoint: `${CONFIG.OAUTH.MICROSOFT.AUTHORITY}/oauth2/v2.0/authorize`,
        tokenEndpoint: `${CONFIG.OAUTH.MICROSOFT.AUTHORITY}/oauth2/v2.0/token`,
        userInfoEndpoint: 'https://graph.microsoft.com/oidc/userinfo'
    },
    google: {
        config: CONFIG.OAUTH.GOOGLE,
        authorizationEndpoint: CONFIG.OAUTH.GOOGLE.AUTHORIZATION_ENDPOINT,
        tokenEndpoint: CONFIG.OAUTH.GOOGLE.TOKEN_ENDPOINT,
        userInfoEndpoint: 'https://openidconnect.googleapis.com/v1/userinfo'
    }
};

function isConfigured(clientId) {
    return clientId && !clientId.startsWith('your-');
}

function base64UrlEncode(value) {
    return btoa(String.fromCharCode(...new Uint8Array(value)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function randomValue() {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    return base64UrlEncode(bytes);
}

async function createCodeChallenge(verifier) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
    return base64UrlEncode(digest);
}

async function startOAuth(providerName) {
    const provider = oauthProviders[providerName];
    if (!provider || !provider.config.ENABLED) {
        showOAuthError(`${providerName} sign-in is disabled.`);
        return;
    }

    if (!isConfigured(provider.config.CLIENT_ID)) {
        showOAuthError(`Add the ${providerName} OAuth client ID in config.js before signing in.`);
        return;
    }

    if (window.location.protocol === 'file:') {
        showOAuthError('OAuth needs a local web server. Open this page with Live Server or another HTTP server.');
        return;
    }

    const state = randomValue();
    const verifier = randomValue();
    const challenge = await createCodeChallenge(verifier);
    sessionStorage.setItem('oauthTransaction', JSON.stringify({ providerName, state, verifier }));

    const params = new URLSearchParams({
        client_id: provider.config.CLIENT_ID,
        response_type: 'code',
        redirect_uri: provider.config.REDIRECT_URI,
        response_mode: 'query',
        scope: provider.config.SCOPES.join(' '),
        state,
        code_challenge: challenge,
        code_challenge_method: 'S256'
    });
    window.location.assign(`${provider.authorizationEndpoint}?${params}`);
}

async function handleOAuthCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const returnedState = params.get('state');
    const error = params.get('error_description') || params.get('error');
    const transaction = JSON.parse(sessionStorage.getItem('oauthTransaction') || 'null');
    if (!code && !error) return;

    window.history.replaceState({}, document.title, window.location.pathname);
    sessionStorage.removeItem('oauthTransaction');
    if (error) throw new Error(error);
    if (!transaction || transaction.state !== returnedState) throw new Error('OAuth state validation failed.');

    const provider = oauthProviders[transaction.providerName];
    const body = new URLSearchParams({
        client_id: provider.config.CLIENT_ID,
        grant_type: 'authorization_code',
        code,
        redirect_uri: provider.config.REDIRECT_URI,
        code_verifier: transaction.verifier
    });
    const tokenResponse = await fetch(provider.tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
    });
    if (!tokenResponse.ok) throw new Error('The provider could not complete sign-in. Check the registered redirect URI.');

    const tokens = await tokenResponse.json();
    const userResponse = await fetch(provider.userInfoEndpoint, {
        headers: { Authorization: `Bearer ${tokens.access_token}` }
    });
    const user = userResponse.ok ? await userResponse.json() : {};
    localStorage.setItem(CONFIG.AUTH.TOKEN_STORAGE_KEY, tokens.access_token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.assign('dashboard.html');
}

function showOAuthError(message) {
    showPasswordError(message);
}

handleOAuthCallback().catch(error => showOAuthError(error.message || 'Sign-in failed.'));

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
