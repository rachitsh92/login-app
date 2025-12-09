import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendVerificationCode } from '../services/api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await sendVerificationCode(email);
      console.log('Verification code sent:', response);
      
      // Navigate to verify code page with email
      navigate('/verify-code', { state: { email } });
    } catch (err) {
      setError(err.message || 'Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h2 className="auth-title">Forgot Password?</h2>
          <p className="auth-subtitle">Enter your email to receive a verification code</p>
        </div>

        <p className="info-text">
          We'll send a verification code to your registered email address. 
          Please enter the code on the next page to reset your password.
        </p>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
            <Link to="/login">
              <button type="button" className="btn btn-secondary">
                Back to Login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
