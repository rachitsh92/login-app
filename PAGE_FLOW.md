# Page Flow & Navigation

## Visual Flow Diagram

```
┌─────────────────┐
│   Login Page    │ ──────────────────────────────────┐
│   /login        │                                    │
└────────┬────────┘                                    │
         │                                             │
         ├─── Click "Forgot Password?" ───────────┐   │
         │                                         │   │
         └─── Click "Register here" ──────┐       │   │
                                          │       │   │
                                          │       │   │
┌─────────────────────────┐              │       │   │
│  User Registration      │ <────────────┘       │   │
│  /register              │                      │   │
│                         │                      │   │
│  Fields:                │                      │   │
│  - Name                 │                      │   │
│  - Corporate ID         │                      │   │
│  - Username             │                      │   │
│  - Email                │                      │   │
│  - Status               │                      │   │
│  - Timezone             │                      │   │
│  - Base Currency        │                      │   │
│  - Language             │                      │   │
│  - Role                 │                      │   │
└──────────┬──────────────┘                      │   │
           │                                     │   │
           └─── After Registration ──────────────┤   │
                                                 │   │
                                                 │   │
┌─────────────────────────┐                     │   │
│  Forgot Password        │ <───────────────────┘   │
│  /forgot-password       │                         │
│                         │                         │
│  Enter Email            │                         │
└──────────┬──────────────┘                         │
           │                                         │
           │ Submit Email                            │
           ↓                                         │
┌─────────────────────────┐                         │
│  Verify Code            │                         │
│  /verify-code           │                         │
│                         │                         │
│  - Enter 6-digit code   │                         │
│  - 5 minute timer       │                         │
│  - Resend option        │                         │
└──────────┬──────────────┘                         │
           │                                         │
           │ Code Verified                           │
           ↓                                         │
┌─────────────────────────┐                         │
│  Reset Password         │                         │
│  /reset-password        │                         │
│                         │                         │
│  - New Password         │                         │
│  - Confirm Password     │                         │
│  - Strength Indicator   │                         │
└──────────┬──────────────┘                         │
           │                                         │
           └─── Password Reset Success ──────────────┘
```

## User Journeys

### Journey 1: New User Registration
1. User visits `/login`
2. Clicks "Register here"
3. Fills registration form at `/register`
4. Submits form
5. Redirected to `/login` to sign in

### Journey 2: Login
1. User visits `/login`
2. Enters username and password
3. Clicks "Login"
4. API call authenticates user
5. Redirected to dashboard (to be implemented)

### Journey 3: Forgot Password
1. User visits `/login`
2. Clicks "Forgot Password?"
3. Enters email at `/forgot-password`
4. Receives verification code via email
5. Enters code at `/verify-code`
6. Creates new password at `/reset-password`
7. Redirected to `/login` with new password

## State Management

### Login Page State
- `username`: string
- `password`: string
- `showPassword`: boolean
- `loading`: boolean
- `error`: string

### Registration Page State
- `formData`: object with all user fields
- `loading`: boolean
- `error`: string
- `success`: string

### Forgot Password State
- `email`: string
- `loading`: boolean
- `error`: string

### Verify Code State
- `email`: string (from navigation state)
- `code`: string
- `timer`: number (countdown in seconds)
- `loading`: boolean
- `resending`: boolean
- `error`: string

### Reset Password State
- `email`: string (from navigation state)
- `resetToken`: string (from navigation state)
- `newPassword`: string
- `confirmPassword`: string
- `showPassword`: boolean
- `showConfirmPassword`: boolean
- `passwordStrength`: string ('weak', 'medium', 'strong')
- `loading`: boolean
- `error`: string

## Navigation Guards

### Verify Code Page
- Redirects to `/forgot-password` if email is not in navigation state
- Starts 5-minute countdown timer
- Enables resend after 1 minute

### Reset Password Page
- Redirects to `/forgot-password` if email or resetToken is missing
- Validates password strength
- Validates password match

## API Integration Points

### Login (/login)
**Endpoint:** `POST /auth/login`
**Payload:**
```json
{
  "username": "user@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": { "id": "123", "username": "user@example.com" }
}
```

### Registration (/register)
**Endpoint:** `POST /auth/register`
**Payload:**
```json
{
  "name": "John Doe",
  "corporate_id": "CORP123",
  "username": "johndoe",
  "email": "john@example.com",
  "status": "active",
  "timezone": "Asia/Kolkata",
  "base_currency": "INR",
  "correspondence_language": "en",
  "role": "user"
}
```

### Send Verification Code (/forgot-password)
**Endpoint:** `POST /auth/forgot-password`
**Payload:**
```json
{
  "email": "user@example.com"
}
```

### Verify Code (/verify-code)
**Endpoint:** `POST /auth/verify-code`
**Payload:**
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```
**Response:**
```json
{
  "success": true,
  "resetToken": "reset-token-here"
}
```

### Reset Password (/reset-password)
**Endpoint:** `POST /auth/reset-password`
**Payload:**
```json
{
  "email": "user@example.com",
  "resetToken": "reset-token-here",
  "newPassword": "newSecurePassword123!"
}
```

## Security Features

### Client-Side
- Password visibility toggle
- Password strength indicator
- Form validation
- Input sanitization
- Loading states prevent double submission

### To Implement (Backend)
- JWT token authentication
- Bcrypt password hashing
- Rate limiting on API endpoints
- Email verification tokens
- Token expiration (5 minutes for reset codes)
- HTTPS enforcement
- CSRF protection

## Responsive Design

All pages are fully responsive:
- Desktop: Full-width cards centered
- Tablet: Adjusted padding and spacing
- Mobile: Single-column layouts, larger touch targets
