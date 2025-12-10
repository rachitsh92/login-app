import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      navigate('/');
      return;
    }

    // TODO: Decode JWT token to get user info
    // For now, just show placeholder
    setUser({ username: 'User' });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <div className="auth-header">
          <div className="bank-logo">
            <div className="logo-icon">F</div>
            <span>IDFC FIRST Bank</span>
          </div>
          
          <h2 className="auth-title">Dashboard</h2>
          <p className="auth-subtitle">Welcome back, {user?.username}!</p>
        </div>

        <div className="success-message">
          You have successfully logged in using OAuth2 flow.
        </div>

        <div className="info-text">
          <p>Access Token: {localStorage.getItem('access_token')?.substring(0, 30)}...</p>
        </div>

        <div className="form-actions">
          <button onClick={handleLogout} className="btn btn-primary">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;