// API Service - Placeholder functions for backend integration

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

/**
 * Login API
 * @param {string} username - User's email/username
 * @param {string} password - User's password
 */
export const loginUser = async (username, password) => {
  // TODO: Replace with actual API call
  console.log('Login API called with:', { username, password });
  
  // Simulated API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful login
      resolve({
        success: true,
        token: 'dummy-jwt-token',
        user: {
          id: '123',
          username: username,
          email: username
        }
      });
      
      // To simulate error, uncomment below:
      // reject(new Error('Invalid credentials'));
    }, 1000);
  });
};

/**
 * User Registration API
 * @param {Object} userData - User registration data
 */
export const registerUser = async (userData) => {
  // TODO: Replace with actual API call
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
  // TODO: Replace with actual API call
  console.log('Send verification code API called with:', { email });
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Verification code sent to email',
        codeExpiry: 300 // 5 minutes
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
  // TODO: Replace with actual API call
  console.log('Verify code API called with:', { email, code });
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful verification
      resolve({
        success: true,
        message: 'Code verified successfully',
        resetToken: 'reset-token-' + Date.now()
      });
      
      // To simulate invalid code, uncomment below:
      // reject(new Error('Invalid or expired code'));
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
  // TODO: Replace with actual API call
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

/**
 * Helper function to handle API errors
 */
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // Request made but no response
    return 'No response from server';
  } else {
    // Error in request setup
    return error.message || 'An unexpected error occurred';
  }
};
