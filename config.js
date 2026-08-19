/**
 * Smart Port & Logistics Management System
 * Configuration File
 * 
 * This file contains all configurable settings for the login page.
 * Modify these values to customize the application behavior.
 */

const CONFIG = {
    // ===== API Configuration =====
    API: {
        // Backend API endpoint for login
        BASE_URL: 'http://localhost:3000/api',
        LOGIN_ENDPOINT: '/auth/login',
        FORGOT_PASSWORD_ENDPOINT: '/auth/forgot-password',
        SIGNUP_ENDPOINT: '/auth/signup',
        
        // Timeout for API requests (in milliseconds)
        TIMEOUT: 30000,
        
        // Enable mock API for development/testing
        USE_MOCK_API: true,
        
        // Mock API delay (in milliseconds)
        MOCK_API_DELAY: 1500,
    },

    // ===== Authentication Configuration =====
    AUTH: {
        // Password validation requirements
        PASSWORD_MIN_LENGTH: 8,
        PASSWORD_REQUIRE_UPPERCASE: true,
        PASSWORD_REQUIRE_LOWERCASE: true,
        PASSWORD_REQUIRE_NUMBERS: true,
        PASSWORD_REQUIRE_SPECIAL_CHARS: true,
        PASSWORD_SPECIAL_CHARS: '@$!%*?&',
        
        // Session timeout (in milliseconds)
        SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
        
        // Token storage key
        TOKEN_STORAGE_KEY: 'authToken',
        
        // Remember me persistence
        REMEMBER_ME_STORAGE_KEY: 'rememberedEmail',
        REMEMBER_ME_DURATION: 30 * 24 * 60 * 60 * 1000, // 30 days
    },

    // ===== OAuth Configuration =====
    OAUTH: {
        // Microsoft OAuth
        MICROSOFT: {
            ENABLED: true,
            CLIENT_ID: 'your-microsoft-client-id',
            AUTHORITY: 'https://login.microsoftonline.com/common',
            REDIRECT_URI: window.location.origin + window.location.pathname,
            SCOPES: ['openid', 'profile', 'email', 'User.Read'],
        },
        
        // Google OAuth
        GOOGLE: {
            ENABLED: true,
            CLIENT_ID: 'your-google-client-id',
            AUTHORIZATION_ENDPOINT: 'https://accounts.google.com/o/oauth2/v2/auth',
            TOKEN_ENDPOINT: 'https://oauth2.googleapis.com/token',
            REDIRECT_URI: window.location.origin + window.location.pathname,
            SCOPES: ['openid', 'profile', 'email'],
        },
    },

    // ===== UI Configuration =====
    UI: {
        // Page title
        PAGE_TITLE: 'Smart Port & Logistics Management System - Login',
        
        // Company name
        COMPANY_NAME: 'Smart Port & Logistics',
        
        // Company tagline
        COMPANY_TAGLINE: 'Management System',
        
        // Company description
        COMPANY_DESCRIPTION: 'Efficient cargo tracking and port operations management for modern logistics',
        
        // App version
        VERSION: '1.0.0',
        
        // Enable animations
        ANIMATIONS_ENABLED: true,
        
        // Default language
        DEFAULT_LANGUAGE: 'en',
    },

    // ===== Feature Flags =====
    FEATURES: {
        // Enable remember me functionality
        REMEMBER_ME_ENABLED: true,
        
        // Enable forgot password flow
        FORGOT_PASSWORD_ENABLED: true,
        
        // Enable sign up / access request flow
        SIGNUP_ENABLED: true,
        
        // Enable social login
        SOCIAL_LOGIN_ENABLED: true,
        
        // Enable session timeout
        SESSION_TIMEOUT_ENABLED: true,
        
        // Enable success modal
        SUCCESS_MODAL_ENABLED: true,
        
        // Enable password strength indicator
        PASSWORD_STRENGTH_INDICATOR_ENABLED: false,
        
        // Enable two-factor authentication
        TWO_FACTOR_AUTH_ENABLED: false,
        
        // Enable biometric login
        BIOMETRIC_LOGIN_ENABLED: false,
    },

    // ===== Links Configuration =====
    LINKS: {
        // Support
        SUPPORT_EMAIL: 'support@smartport.logistics',
        SUPPORT_PHONE: '+1-800-LOGISTICS',
        SUPPORT_URL: 'https://support.smartport.logistics',
        
        // Legal
        PRIVACY_POLICY_URL: 'https://www.smartport.logistics/privacy',
        TERMS_OF_SERVICE_URL: 'https://www.smartport.logistics/terms',
        SECURITY_POLICY_URL: 'https://www.smartport.logistics/security',
        
        // Other
        FORGOT_PASSWORD_URL: '/forgot-password',
        SIGNUP_URL: '/signup',
        DASHBOARD_URL: '/dashboard',
    },

    // ===== Validation Configuration =====
    VALIDATION: {
        // Email regex pattern
        EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        
        // Maximum email length
        EMAIL_MAX_LENGTH: 254,
        
        // Maximum password length
        PASSWORD_MAX_LENGTH: 128,
        
        // Allow special characters in password
        ALLOW_SPECIAL_CHARS_IN_PASSWORD: true,
    },

    // ===== Logging Configuration =====
    LOGGING: {
        // Enable console logging
        CONSOLE_ENABLED: true,
        
        // Log level (debug, info, warn, error)
        LOG_LEVEL: 'info',
        
        // Enable error tracking (Sentry, etc.)
        ERROR_TRACKING_ENABLED: false,
        ERROR_TRACKING_DSN: '',
    },

    // ===== Analytics Configuration =====
    ANALYTICS: {
        // Enable analytics tracking
        ENABLED: false,
        
        // Google Analytics ID
        GOOGLE_ANALYTICS_ID: '',
        
        // Track login events
        TRACK_LOGIN_EVENTS: true,
        
        // Track form interactions
        TRACK_FORM_INTERACTIONS: false,
    },

    // ===== Color Theme Configuration =====
    THEME: {
        PRIMARY_COLOR: '#0066cc',
        PRIMARY_DARK: '#004a99',
        PRIMARY_LIGHT: '#e6f0ff',
        SECONDARY_COLOR: '#667085',
        SUCCESS_COLOR: '#28a745',
        ERROR_COLOR: '#dc3545',
        WARNING_COLOR: '#ffc107',
        INFO_COLOR: '#17a2b8',
        BORDER_COLOR: '#d1d5db',
        BG_LIGHT: '#f9fafb',
        BG_WHITE: '#ffffff',
        TEXT_PRIMARY: '#1f2937',
        TEXT_SECONDARY: '#6b7280',
    },

    // ===== Dark Mode Configuration =====
    DARK_MODE: {
        // Enable dark mode support
        ENABLED: false,
        
        // Auto-detect based on system preference
        AUTO_DETECT: true,
        
        // Default theme (light or dark)
        DEFAULT_THEME: 'light',
    },

    // ===== Security Configuration =====
    SECURITY: {
        // Enable CSRF protection
        CSRF_PROTECTION_ENABLED: true,
        
        // Enable rate limiting (client-side)
        RATE_LIMITING_ENABLED: true,
        
        // Maximum login attempts
        MAX_LOGIN_ATTEMPTS: 5,
        
        // Lockout duration (in milliseconds)
        LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
        
        // Enable HTTPS redirect
        FORCE_HTTPS: false,
        
        // Content Security Policy
        CSP_ENABLED: true,
    },

    // ===== Accessibility Configuration =====
    ACCESSIBILITY: {
        // Enable high contrast mode
        HIGH_CONTRAST_ENABLED: false,
        
        // Enable screen reader support
        SCREEN_READER_SUPPORT_ENABLED: true,
        
        // Enable keyboard navigation
        KEYBOARD_NAVIGATION_ENABLED: true,
        
        // Enable focus indicators
        FOCUS_INDICATORS_ENABLED: true,
    },
};

/**
 * Get configuration value
 * @param {string} key - Configuration key path (e.g., 'API.BASE_URL')
 * @param {*} defaultValue - Default value if key not found
 * @returns {*} Configuration value
 */
function getConfig(key, defaultValue = null) {
    const keys = key.split('.');
    let value = CONFIG;
    
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            return defaultValue;
        }
    }
    
    return value;
}

/**
 * Set configuration value
 * @param {string} key - Configuration key path (e.g., 'API.BASE_URL')
 * @param {*} value - Value to set
 */
function setConfig(key, value) {
    const keys = key.split('.');
    let obj = CONFIG;
    
    for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!(k in obj) || typeof obj[k] !== 'object') {
            obj[k] = {};
        }
        obj = obj[k];
    }
    
    obj[keys[keys.length - 1]] = value;
}

/**
 * Get full API endpoint URL
 * @param {string} endpoint - Endpoint path
 * @returns {string} Full API URL
 */
function getApiUrl(endpoint) {
    const baseUrl = getConfig('API.BASE_URL', '');
    return baseUrl + endpoint;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, getConfig, setConfig, getApiUrl };
}
