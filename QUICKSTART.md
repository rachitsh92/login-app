# Quick Start Guide - IDFC FIRST Bank Auth App

## Getting Started in 5 Minutes

### 1. Navigate to Project Directory
```bash
cd idfc-auth-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm start
```

The app will automatically open in your browser at `http://localhost:3000`

## What You'll See

### Login Page (/)
- Clean, branded login form
- Username and password fields
- "Forgot Password?" link
- "Register here" link

### Try It Out
1. Enter any email in the username field
2. Enter any password
3. Click "Login" - you'll see a success message (placeholder API)

## Testing All Features

### Test User Registration
1. Click "Register here" from login page
2. Fill out the form:
   - Name: John Doe
   - Corporate ID: CORP123
   - Username: johndoe
   - Email: john@example.com
   - Select preferences from dropdowns
3. Click "Register" - redirects to login after 2 seconds

### Test Password Recovery Flow
1. Click "Forgot Password?" from login page
2. Enter email: test@example.com
3. Click "Send Verification Code"
4. Enter 6-digit code: 123456 (any 6 digits work in placeholder)
5. Click "Verify Code"
6. Create new password with confirmation
7. Click "Reset Password" - redirects to login

## All Available Routes

- `http://localhost:3000/` → Redirects to login
- `http://localhost:3000/login` → Login page
- `http://localhost:3000/register` → Registration page
- `http://localhost:3000/forgot-password` → Password recovery step 1
- `http://localhost:3000/verify-code` → Password recovery step 2
- `http://localhost:3000/reset-password` → Password recovery step 3

## Next Steps: Integrating Your API

### Where to Add Your API
Open `src/services/api.js` and replace placeholder functions:

```javascript
// Example: Replace the loginUser function
export const loginUser = async (username, password) => {
  const response = await fetch('https://your-api.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};
```

### API Functions to Replace
1. `loginUser()` - Login authentication
2. `registerUser()` - User registration
3. `sendVerificationCode()` - Send email code
4. `verifyCode()` - Verify email code
5. `resetPassword()` - Reset user password

## Customization

### Change Colors
Edit `src/App.css`:
```css
.App {
  background: linear-gradient(135deg, #yourColor1 0%, #yourColor2 100%);
}

.btn-primary {
  background: linear-gradient(135deg, #yourColor1 0%, #yourColor2 100%);
}
```

### Add More Fields to Registration
Edit `src/pages/UserRegistration.jsx` and add form fields in the same pattern.

## Troubleshooting

### Port Already in Use
If port 3000 is busy:
```bash
PORT=3001 npm start
```

### Dependencies Not Installing
Try:
```bash
npm cache clean --force
npm install
```

### Hot Reload Not Working
Restart the development server:
```bash
# Press Ctrl+C to stop
npm start
```

## Production Build

When ready to deploy:
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Questions?

Check the main README.md for detailed documentation!
