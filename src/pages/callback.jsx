import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { exchangeCodeForToken } from '../services/api';

const Callback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const errorParam = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      // Check for errors
      if (errorParam) {
        setStatus('error');
        setError(errorDescription || errorParam);
        return;
      }

      // Validate state
      const savedState = sessionStorage.getItem('oauth_state');
      if (state !== savedState) {
        setStatus('error');
        setError('Invalid state parameter. Possible CSRF attack.');
        return;
      }

      // No code received
      if (!code) {
        setStatus('error');
        setError('No authorization code received');
        return;
      }

      try {
        // Exchange code for tokens
        const tokenResponse = await exchangeCodeForToken(code);
        console.log('Token exchange successful:', tokenResponse);

        // Store tokens
        localStorage.setItem('access_token', tokenResponse.access_token);
        localStorage.setItem('id_token', tokenResponse.id_token);
        if (tokenResponse.refresh_token) {
          localStorage.setItem('refresh_token', tokenResponse.refresh_token);
        }

        // Clean up
        sessionStorage.removeItem('oauth_state');

        // Success
        setStatus('success');
        
        // Redirect to dashboard or home
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } catch (err) {
        setStatus('error');
        setError(err.message || 'Failed to exchange authorization code');
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="bank-logo">
            <div className="logo-icon">F</div>
            <span>IDFC FIRST Bank</span>
          </div>
          
          <div className="security-icon">
            {status === 'processing' && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="animate-spin">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            {status === 'success' && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {status === 'error' && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>

          <h2 className="auth-title">
            {status === 'processing' && 'Processing...'}
            {status === 'success' && 'Login Successful!'}
            {status === 'error' && 'Authentication Failed'}
          </h2>
          <p className="auth-subtitle">
            {status === 'processing' && 'Please wait while we complete your login'}
            {status === 'success' && 'Redirecting you to dashboard...'}
            {status === 'error' && 'There was a problem with your authentication'}
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {status === 'success' && (
          <div className="success-message">
            Authentication successful! You will be redirected shortly.
          </div>
        )}

        {status === 'error' && (
          <div className="form-actions">
            <button 
              onClick={() => navigate('/')} 
              className="btn btn-primary"
            >
              Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Callback;