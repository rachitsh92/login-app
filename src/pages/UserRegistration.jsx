import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    corporate_id: '',
    username: '',
    email: '',
    status: 'active',
    timezone: 'Asia/Kolkata',
    base_currency: 'INR',
    correspondence_language: 'en',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await registerUser(formData);
      console.log('Registration successful:', response);
      setSuccess('Registration successful! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <div className="auth-header">
          <div className="bank-logo">
            <div className="logo-icon">F</div>
            <span>IDFC FIRST Bank</span>
          </div>
          
          <div className="security-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>

          <h2 className="auth-title">User Registration</h2>
          <p className="auth-subtitle">Create your account</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Corporate ID *</label>
              <input
                type="text"
                name="corporate_id"
                className="form-input"
                placeholder="Corp ID"
                value={formData.corporate_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Username *</label>
              <input
                type="text"
                name="username"
                className="form-input"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Role</label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Timezone</label>
              <select
                name="timezone"
                className="form-select"
                value={formData.timezone}
                onChange={handleChange}
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="America/New_York">America/New York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Base Currency</label>
              <select
                name="base_currency"
                className="form-select"
                value={formData.base_currency}
                onChange={handleChange}
              >
                <option value="INR">INR - Indian Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="AED">AED - UAE Dirham</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Correspondence Language</label>
            <select
              name="correspondence_language"
              className="form-select"
              value={formData.correspondence_language}
              onChange={handleChange}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
            <Link to="/login">
              <button type="button" className="btn btn-secondary">
                Cancel
              </button>
            </Link>
          </div>
        </form>

        <div className="auth-footer">
          <span className="auth-footer-text">
            Already have an account?
            <Link to="/login" className="auth-footer-link">Login here</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
