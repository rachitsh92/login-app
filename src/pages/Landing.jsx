import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Redirect to Hydra OAuth2 authorization endpoint
    const hydraAuthUrl = 'https://your-hydra-domain.com/oauth2/auth';
    const clientId = 'your-client-id';
    const redirectUri = encodeURIComponent('http://localhost:3000/callback');
    const state = Math.random().toString(36).substring(7);
    const scope = 'openid profile email';
    
    // Store state for validation in callback
    sessionStorage.setItem('oauth_state', state);
    
    const authUrl = `${hydraAuthUrl}?client_id=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;
    
    window.location.href = authUrl;
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h2 className="auth-title">Welcome to IDFC FIRST Bank</h2>
          <p className="auth-subtitle">Enterprise Authentication Portal</p>
        </div>

        <div className="form-actions">
          <button onClick={handleLogin} className="btn btn-primary">
            Login to Continue
          </button>
        </div>

        <div className="auth-footer">
          <span className="auth-footer-text">
            Don't have an account?
            <a href="/register" className="auth-footer-link">Register here</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Landing;