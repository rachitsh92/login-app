// API Service - Complete with OAuth and original functions

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

// OAuth/Hydra Configuration
const HYDRA_ADMIN_URL = 'https://your-hydra-admin-url.com';
const HYDRA_PUBLIC_URL = 'https://your-hydra-public-url.com';
const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';
const REDIRECT_URI = 'http://localhost:3000/callback';

// ============================================
// ORIGINAL API FUNCTIONS
// ============================================

/**
 * Login API
 * @param {string} username - User's email/username
 * @param {string} password - User's password
 */
export const loginUser = async (username, password) => {
  console.log('Login API called with:', { username, password });
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        token: 'dummy-jwt-token',
        user: {
          id: '123',
          username: username,
          email: username
        }
      });
    }, 1000);
  });
};

/**
 * User Registration API
 * @param {Object} userData - User registration data
 */
export const registerUser = async (userData) => {
  console.log('Registration API called with:', userData);
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'User registered successfully',
        userId: 'user-' + Date.now()
      });
    }, 1000);
  });
};

/**
 * Forgot Password - Send verification code
 * @param {string} email - User's email
 */
export const sendVerificationCode = async (email) => {
  console.log('Send verification code API called with:', { email });
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Verification code sent to email',
        codeExpiry: 300
      });
    }, 1000);
  });
};

/**
 * Verify code from email
 * @param {string} email - User's email
 * @param {string} code - Verification code
 */
export const verifyCode = async (email, code) => {
  console.log('Verify code API called with:', { email, code });
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Code verified successfully',
        resetToken: 'reset-token-' + Date.now()
      });
    }, 1000);
  });
};

/**
 * Reset password
 * @param {string} email - User's email
 * @param {string} resetToken - Reset token from verification
 * @param {string} newPassword - New password
 */
export const resetPassword = async (email, resetToken, newPassword) => {
  console.log('Reset password API called with:', { email, resetToken, newPassword: '***' });
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Password reset successfully'
      });
    }, 1000);
  });
};

// ============================================
// OAUTH/HYDRA API FUNCTIONS
// ============================================

/**
 * Accept Hydra login challenge
 * @param {string} loginChallenge - The login challenge from Hydra
 * @param {Object} acceptData - Data to accept the challenge with
 */
export const acceptLoginChallenge = async (loginChallenge, acceptData) => {
  console.log('Accept login challenge called with:', { loginChallenge, acceptData });
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        redirect_to: `${HYDRA_PUBLIC_URL}/oauth2/auth?login_verifier=${loginChallenge}`
      });
      
      // Actual implementation:
      /*
      fetch(`${HYDRA_ADMIN_URL}/oauth2/auth/requests/login/accept?login_challenge=${loginChallenge}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(acceptData)
      })
      .then(res => res.json())
      .then(resolve)
      .catch(reject);
      */
    }, 1000);
  });
};

/**
 * Get login request information from Hydra
 * @param {string} loginChallenge - The login challenge from Hydra
 */
export const getLoginRequest = async (loginChallenge) => {
  console.log('Get login request called with:', { loginChallenge });
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        challenge: loginChallenge,
        client: {
          client_id: CLIENT_ID,
          client_name: 'IDFC Auth App'
        },
        skip: false,
        subject: ''
      });
      
      // Actual implementation:
      /*
      fetch(`${HYDRA_ADMIN_URL}/oauth2/auth/requests/login?login_challenge=${loginChallenge}`)
      .then(res => res.json())
      .then(resolve)
      .catch(reject);
      */
    }, 500);
  });
};

/**
 * Exchange authorization code for access token
 * @param {string} code - Authorization code from callback
 */
export const exchangeCodeForToken = async (code) => {
  console.log('Exchange code for token called with:', { code });
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        access_token: 'mock_access_token_' + Date.now(),
        token_type: 'Bearer',
        expires_in: 3600,
        id_token: 'mock_id_token_' + Date.now(),
        refresh_token: 'mock_refresh_token_' + Date.now()
      });
      
      // Actual implementation:
      /*
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
      params.append('redirect_uri', REDIRECT_URI);
      params.append('client_id', CLIENT_ID);
      params.append('client_secret', CLIENT_SECRET);

      fetch(`${HYDRA_PUBLIC_URL}/oauth2/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      })
      .then(res => res.json())
      .then(resolve)
      .catch(reject);
      */
    }, 1000);
  });
};

/**
 * Revoke token (logout)
 * @param {string} token - Access or refresh token to revoke
 */
export const revokeToken = async (token) => {
  console.log('Revoke token called with:', { token: token.substring(0, 20) + '...' });
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
      
      // Actual implementation:
      /*
      const params = new URLSearchParams();
      params.append('token', token);
      params.append('client_id', CLIENT_ID);
      params.append('client_secret', CLIENT_SECRET);

      fetch(`${HYDRA_PUBLIC_URL}/oauth2/revoke`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      })
      .then(res => res.json())
      .then(resolve)
      .catch(reject);
      */
    }, 500);
  });
};

/**
 * Change password (for account recovery or logged-in user)
 * @param {Object} data - Password change data
 * @param {string} data.userId - User ID
 * @param {string} data.token - Recovery token (optional, if from recovery flow)
 * @param {string} data.currentPassword - Current password (required if not using token)
 * @param {string} data.newPassword - New password
 */
export const changePassword = async (data) => {
  console.log('Change password API called with:', { 
    userId: data.userId, 
    token: data.token ? 'present' : 'not present',
    currentPassword: data.currentPassword ? '***' : 'not provided',
    newPassword: '***' 
  });
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Password changed successfully'
      });
      
      // Actual implementation:
      /*
      fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(resolve)
      .catch(reject);
      */
    }, 1000);
  });
};

/**
 * Helper function to handle API errors
 */
export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    return 'No response from server';
  } else {
    return error.message || 'An unexpected error occurred';
  }
};