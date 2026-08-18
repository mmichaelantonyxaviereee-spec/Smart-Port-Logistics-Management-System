/**
 * Smart Port & Logistics Management System
 * Backend Integration Examples
 * 
 * This file demonstrates how to integrate the login page with various backend frameworks
 * and authentication systems.
 */

// ===== Example 1: Node.js + Express Integration =====
/*

// Backend (Node.js + Express):
app.post('/api/auth/login', async (req, res) => {
    const { email, password, rememberMe } = req.body;
    
    try {
        // Validate credentials
        const user = await User.findOne({ email });
        if (!user || !await user.comparePassword(password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: rememberMe ? '30d' : '1h'
        });
        
        // Set secure HTTP-only cookie
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });
        
        res.json({
            success: true,
            token: token,
            user: { id: user.id, email: user.email, name: user.name }
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Frontend (Update in script.js):
async function performLogin(email, password, rememberMe) {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Send cookies
        body: JSON.stringify({ email, password, rememberMe })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
    }
    
    const data = await response.json();
    if (data.token) {
        localStorage.setItem('authToken', data.token);
    }
    return data;
}

*/

// ===== Example 2: Python + Flask Integration =====
/*

# Backend (Python + Flask):
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    remember_me = data.get('rememberMe', False)
    
    try:
        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Generate JWT token
        expires = timedelta(days=30) if remember_me else timedelta(hours=1)
        token = create_access_token(identity=user.id, expires_delta=expires)
        
        response = jsonify({
            'success': True,
            'token': token,
            'user': {'id': user.id, 'email': user.email, 'name': user.name}
        })
        return response, 200
    except Exception as e:
        return jsonify({'error': 'Login failed'}), 500

# Frontend remains the same
*/

// ===== Example 3: OAuth 2.0 Integration (Microsoft) =====
/*

// Include Microsoft Authentication Library
<script src="https://alcdn.msftauth.net/lib/1.4.0/msal.min.js"></script>

// Frontend (Update script.js):
const msalConfig = {
    auth: {
        clientId: getConfig('OAUTH.MICROSOFT.CLIENT_ID'),
        authority: 'https://login.microsoftonline.com/common',
        redirectUri: getConfig('OAUTH.MICROSOFT.REDIRECT_URI'),
    },
    cache: {
        cacheLocation: 'sessionStorage',
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

document.querySelector('.social-button.microsoft').addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const result = await msalInstance.loginPopup({
            scopes: getConfig('OAUTH.MICROSOFT.SCOPES')
        });
        
        // Get access token
        const tokenResponse = await msalInstance.acquireTokenSilent({
            scopes: getConfig('OAUTH.MICROSOFT.SCOPES'),
            account: result.account
        });
        
        // Send token to backend for verification
        const response = await fetch('/api/auth/microsoft', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: tokenResponse.accessToken })
        });
        
        if (response.ok) {
            showSuccessModal();
            // Redirect to dashboard
        }
    } catch (error) {
        console.error('Microsoft login failed:', error);
    }
});

*/

// ===== Example 4: Google OAuth Integration =====
/*

// Include Google Sign-In Library
<script src="https://accounts.google.com/gsi/client" async defer></script>

// Frontend (Update script.js):
document.querySelector('.social-button.google').addEventListener('click', (e) => {
    e.preventDefault();
    // Trigger Google Sign-In flow
    google.accounts.id.initialize({
        client_id: getConfig('OAUTH.GOOGLE.CLIENT_ID'),
        callback: handleGoogleSignIn
    });
    google.accounts.id.prompt();
});

async function handleGoogleSignIn(response) {
    try {
        // Send ID token to backend
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: response.credential })
        });
        
        if (res.ok) {
            showSuccessModal();
            // Redirect to dashboard
        }
    } catch (error) {
        console.error('Google login failed:', error);
    }
}

*/

// ===== Example 5: Two-Factor Authentication (2FA) =====
/*

// Backend (Node.js + Express):
app.post('/api/auth/verify-2fa', async (req, res) => {
    const { email, token } = req.body;
    
    try {
        const user = await User.findOne({ email });
        const isValid = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token: token,
            window: 2
        });
        
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid 2FA code' });
        }
        
        const authToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        res.json({ success: true, token: authToken });
    } catch (error) {
        res.status(500).json({ error: '2FA verification failed' });
    }
});

// Frontend (Add to login flow):
async function verifyTwoFactorCode(code) {
    const response = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: emailInput.value,
            token: code
        })
    });
    
    if (!response.ok) {
        throw new Error('Invalid 2FA code');
    }
    
    return await response.json();
}

*/

// ===== Example 6: Biometric Authentication (Web Authentication API) =====
/*

// Frontend (Web Authentication API):
async function registerBiometric() {
    const credential = await navigator.credentials.create({
        publicKey: {
            challenge: new Uint8Array(32),
            rp: { name: 'Smart Port & Logistics' },
            user: {
                id: new Uint8Array(16),
                name: 'user@example.com',
                displayName: 'User'
            },
            pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
            timeout: 60000,
            attestation: 'direct'
        }
    });
    return credential;
}

async function authenticateWithBiometric() {
    const assertion = await navigator.credentials.get({
        publicKey: {
            challenge: new Uint8Array(32),
            timeout: 60000,
            userVerification: 'preferred'
        }
    });
    return assertion;
}

*/

// ===== Example 7: Rate Limiting & Account Lockout =====
/*

// Backend (Node.js + Express):
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts
    message: 'Too many login attempts, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

app.post('/api/auth/login', loginLimiter, async (req, res) => {
    // Login logic...
});

// Frontend (Handle 429 response):
async function performLogin(email, password) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        if (response.status === 429) {
            throw new Error('Too many login attempts. Please try again in 15 minutes.');
        }
        
        // Handle other responses...
    } catch (error) {
        showPasswordError(error.message);
    }
}

*/

// ===== Example 8: SAML/SSO Integration =====
/*

// Backend (Node.js + Express):
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;

passport.use(new SamlStrategy({
    path: '/api/auth/saml/callback',
    entryPoint: process.env.SAML_ENTRY_POINT,
    issuer: process.env.SAML_ISSUER,
    cert: process.env.SAML_CERT
}, (profile, done) => {
    User.findOrCreate({ email: profile.email }, (err, user) => {
        return done(err, user);
    });
}));

app.post('/api/auth/saml', passport.authenticate('saml'), (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
});

*/

// ===== Example 9: Password Reset Flow =====
/*

// Backend (Node.js + Express):
app.post('/api/auth/forgot-password', async (req, res) => {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    user.passwordResetToken = tokenHash;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    
    // Send reset link via email
    await sendResetEmail(email, resetToken);
    
    res.json({ success: true, message: 'Reset link sent to email' });
});

// Frontend:
document.querySelector('.forgot-password').addEventListener('click', async (e) => {
    e.preventDefault();
    
    const email = prompt('Enter your email address:');
    if (!email) return;
    
    try {
        const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        
        if (response.ok) {
            alert('Password reset link has been sent to your email');
        } else {
            alert('Email not found');
        }
    } catch (error) {
        alert('Error sending reset email');
    }
});

*/

// ===== Example 10: Refresh Token Rotation =====
/*

// Backend (Node.js + Express):
app.post('/api/auth/refresh', (req, res) => {
    const { refreshToken } = req.body;
    
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
});

// Frontend:
async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    
    const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
    });
    
    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.accessToken);
        return data.accessToken;
    } else {
        // Token expired, redirect to login
        window.location.href = '/';
    }
}

*/

/**
 * API Helper Functions
 */

/**
 * Perform login with error handling
 */
async function loginWithErrorHandling(email, password, rememberMe) {
    try {
        const endpoint = getConfig('API.LOGIN_ENDPOINT');
        const baseUrl = getConfig('API.BASE_URL');
        const url = baseUrl + endpoint;

        const response = await Promise.race([
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'include',
                body: JSON.stringify({ email, password, rememberMe })
            }),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timeout')), getConfig('API.TIMEOUT'))
            )
        ]);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        const data = await response.json();
        
        // Store auth token
        if (data.token) {
            localStorage.setItem(getConfig('AUTH.TOKEN_STORAGE_KEY'), data.token);
        }
        
        return data;
    } catch (error) {
        throw new Error(error.message || 'Network error. Please check your connection.');
    }
}

/**
 * Setup CSRF token
 */
function setupCsrfToken() {
    if (!getConfig('SECURITY.CSRF_PROTECTION_ENABLED')) {
        return;
    }

    // Get CSRF token from meta tag or fetch from server
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content ||
                     localStorage.getItem('csrfToken');

    if (!csrfToken) {
        fetch('/api/csrf-token')
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('csrfToken', data.token);
            });
    }
}

/**
 * Add CSRF token to request headers
 */
function getRequestHeaders() {
    const headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    };

    if (getConfig('SECURITY.CSRF_PROTECTION_ENABLED')) {
        const csrfToken = localStorage.getItem('csrfToken') ||
                         document.querySelector('meta[name="csrf-token"]')?.content;
        if (csrfToken) {
            headers['X-CSRF-Token'] = csrfToken;
        }
    }

    return headers;
}

// Setup CSRF on page load
document.addEventListener('DOMContentLoaded', setupCsrfToken);
