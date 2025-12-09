import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const resetToken = location.state?.resetToken || '';
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  useEffect(() => {
    if (!email || !resetToken) {
      navigate('/forgot-password');
    }
  }, [email, resetToken, navigate]);

  const calculatePasswordStrength = (password) => {
    if (password.length === 0) return '';
    if (password.length < 6) return 'weak';
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return 'weak';
    if (strength <= 3) return 'medium';
    return 'strong';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');

    if (name === 'newPassword') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword(email, resetToken, formData.newPassword);
      console.log('Password reset successful:', response);
      
      alert('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'strong': return '#27ae60';
      default: return '#e0e0e0';
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="bank-logo">
            <div className="logo-icon">F</div>
            <span>IDFC FIRST Bank</span>
          </div>
          
          <div className="security-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>

          <h2 className="auth-title">Reset Password</h2>
          <p className="auth-subtitle">Create a new secure password</p>
        </div>

        <p className="info-text">
          Your password must be at least 8 characters long and include 
          a mix of uppercase, lowercase, numbers, and special characters.
        </p>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                className="form-input"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            {passwordStrength && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ 
                  height: '4px', 
                  background: '#e0e0e0', 
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: passwordStrength === 'weak' ? '33%' : passwordStrength === 'medium' ? '66%' : '100%',
                    background: getStrengthColor(),
                    transition: 'all 0.3s ease'
                  }} />
                </div>
                <p style={{ 
                  fontSize: '12px', 
                  marginTop: '4px', 
                  color: getStrengthColor(),
                  fontWeight: 500,
                  textTransform: 'capitalize'
                }}>
                  Password Strength: {passwordStrength}
                </p>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                className="form-input"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading || !formData.newPassword || !formData.confirmPassword}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>

        <div className="auth-footer">
          <Link to="/login" className="auth-footer-link">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
