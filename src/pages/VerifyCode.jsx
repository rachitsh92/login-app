import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { verifyCode, sendVerificationCode } from '../services/api';

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes countdown

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [email, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = async () => {
    setResending(true);
    setError('');

    try {
      await sendVerificationCode(email);
      setTimer(300);
      alert('Verification code resent successfully!');
    } catch (err) {
      setError(err.message || 'Failed to resend code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await verifyCode(email, code);
      console.log('Code verified:', response);
      
      // Navigate to reset password page with email and reset token
      navigate('/reset-password', { 
        state: { 
          email, 
          resetToken: response.resetToken 
        } 
      });
    } catch (err) {
      setError(err.message || 'Invalid or expired code. Please try again.');
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h2 className="auth-title">Verify Code</h2>
          <p className="auth-subtitle">Enter the verification code sent to your email</p>
        </div>

        <p className="info-text">
          We've sent a 6-digit verification code to<br />
          <strong>{email}</strong>
        </p>

        {timer > 0 && (
          <p className="info-text" style={{ color: '#d63447', fontWeight: 600 }}>
            Code expires in: {formatTime(timer)}
          </p>
        )}

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Verification Code</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                setError('');
              }}
              maxLength={6}
              pattern="[0-9]{6}"
              required
              style={{ fontSize: '24px', letterSpacing: '8px', textAlign: 'center' }}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading || code.length !== 6}>
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
            
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleResend}
              disabled={resending || timer > 240}
            >
              {resending ? 'Resending...' : 'Resend Code'}
            </button>
          </div>
        </form>

        <div className="auth-footer">
          <Link to="/forgot-password" className="auth-footer-link">
            ← Back to previous step
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
