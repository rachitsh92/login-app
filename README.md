# IDFC FIRST Bank - Enterprise Authentication App

A modern React application for IDFC FIRST Bank's enterprise authentication system, featuring login, user registration, and account recovery flows.

## Features

### 1. Login Page
- Username/email and password authentication
- Password visibility toggle
- "Forgot Password" link
- Placeholder API integration for login
- Responsive design matching IDFC FIRST Bank branding

### 2. User Registration Page
- Comprehensive user registration form with fields:
  - Full Name
  - Corporate ID
  - Username
  - Email
  - Status (Active/Inactive/Pending)
  - Role (User/Admin/Manager/Viewer)
  - Timezone selection
  - Base Currency
  - Correspondence Language
- Form validation
- Placeholder API integration

### 3. Account Recovery Flow
Three-step password recovery process:

#### Step 1: Forgot Password
- Enter registered email address
- Send verification code to email

#### Step 2: Verify Code
- Enter 6-digit verification code
- Code expiry timer (5 minutes)
- Resend code functionality

#### Step 3: Reset Password
- Create new password
- Password strength indicator
- Confirm password validation
- Password requirements enforcement

## Project Structure

```
idfc-auth-app/
├── public/
│   └── index.html
├── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── UserRegistration.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── VerifyCode.jsx
│   │   └── ResetPassword.jsx
│   ├── services/
│   │   └── api.js                 # API service with placeholder functions
│   ├── App.jsx                    # Main app with routing
│   ├── App.css                    # Global styles
│   ├── index.js                   # Entry point
│   └── index.css
├── package.json
└── README.md
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```

3. **Build for production:**
   ```bash
   npm build
   ```

## API Integration

All API calls are currently using placeholder functions in `src/services/api.js`. To integrate with your backend:

### 1. Update API Base URL
```javascript
const API_BASE_URL = 'https://your-api-domain.com';
```

### 2. Replace Placeholder Functions

#### Login API
```javascript
export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};
```

#### User Registration API
```javascript
export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};
```

#### Forgot Password Flow APIs
```javascript
// Send verification code
export const sendVerificationCode = async (email) => {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  
  if (!response.ok) throw new Error('Failed to send code');
  return response.json();
};

// Verify code
export const verifyCode = async (email, code) => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code })
  });
  
  if (!response.ok) throw new Error('Invalid code');
  return response.json();
};

// Reset password
export const resetPassword = async (email, resetToken, newPassword) => {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, resetToken, newPassword })
  });
  
  if (!response.ok) throw new Error('Password reset failed');
  return response.json();
};
```

## Routes

- `/` - Redirects to login
- `/login` - Login page
- `/register` - User registration page
- `/forgot-password` - Enter email for password recovery
- `/verify-code` - Verify code from email
- `/reset-password` - Create new password

## Design Features

- **Gradient Background**: Red to pink gradient matching IDFC FIRST Bank branding
- **Card-based Layout**: Clean, centered authentication cards
- **Smooth Animations**: Slide-up animations and transitions
- **Password Visibility Toggle**: Eye icon to show/hide passwords
- **Password Strength Indicator**: Visual feedback on password strength
- **Responsive Design**: Works on all device sizes
- **Form Validation**: Client-side validation for all inputs
- **Loading States**: Button loading indicators during API calls
- **Error Handling**: User-friendly error messages

## Customization

### Colors
Edit the gradient colors in `src/App.css`:
```css
.App {
  background: linear-gradient(135deg, #e85d75 0%, #d63447 50%, #c62e41 100%);
}
```

### Bank Logo
Modify the logo in the `auth-header` section of each page component.

### Form Fields
Add or remove fields in `src/pages/UserRegistration.jsx` as needed for your requirements.

## Dependencies

- **React** (^18.2.0): UI library
- **React Router DOM** (^6.20.0): Routing
- **React Scripts** (5.0.1): Build tooling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- All API functions in `src/services/api.js` currently return mock data
- Replace mock implementations with actual API calls before deployment
- Update error handling based on your API's error response format
- Add authentication state management (Context API or Redux) as needed
- Implement protected routes after successful authentication

## Security Considerations

Before deploying to production:
1. Implement proper HTTPS
2. Add CSRF protection
3. Implement rate limiting on backend
4. Use secure password hashing (bcrypt, argon2)
5. Implement JWT token expiration
6. Add input sanitization
7. Enable security headers
8. Implement proper session management

## License

Proprietary - IDFC FIRST Bank

## Support

For technical support or questions, contact your development team.
