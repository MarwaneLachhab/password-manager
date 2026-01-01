import React, { useState, useEffect } from 'react';
import './AccountSettings.css';

const AccountSettings = ({ onClose }) => {
  const [accountData, setAccountData] = useState({
    email: '',
    autoSavePassword: true,
    autoSaveEmail: true
  });

  useEffect(() => {
    // Load account settings from localStorage
    const savedAccount = localStorage.getItem('accountSettings');
    if (savedAccount) {
      setAccountData(JSON.parse(savedAccount));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAccountData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('accountSettings', JSON.stringify(accountData));
    alert('Account settings saved successfully!');
    onClose();
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This will remove all saved passwords and settings.')) {
      localStorage.removeItem('accountSettings');
      localStorage.removeItem('passwords');
      localStorage.removeItem('webauthn_credential_id');
      alert('Account deleted successfully. Please refresh the page.');
      window.location.reload();
    }
  };

  return (
    <div className="account-overlay" onClick={(e) => e.target.className === 'account-overlay' && onClose()}>
      <div className="account-container">
        <div className="account-header">
          <h2>⚙️ Account Settings</h2>
          <button type="button" className="btn-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSave} className="account-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={accountData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
            <small>This email will be used as your account identifier</small>
          </div>

          <div className="settings-section">
            <h3>Auto-Save Preferences</h3>
            
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="autoSavePassword"
                  checked={accountData.autoSavePassword}
                  onChange={handleChange}
                />
                <span>Automatically save passwords when creating new accounts</span>
              </label>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="autoSaveEmail"
                  checked={accountData.autoSaveEmail}
                  onChange={handleChange}
                />
                <span>Automatically save email address in new password entries</span>
              </label>
            </div>
          </div>

          <div className="account-info">
            <h3>Account Information</h3>
            <div className="info-row">
              <span className="info-label">Total Passwords:</span>
              <span className="info-value">{JSON.parse(localStorage.getItem('passwords') || '[]').length}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Windows Hello:</span>
              <span className="info-value">{localStorage.getItem('webauthn_credential_id') ? '✅ Enabled' : '❌ Not Set Up'}</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              💾 Save Settings
            </button>
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
          </div>

          <div className="danger-zone">
            <h3>⚠️ Danger Zone</h3>
            <button type="button" onClick={handleDeleteAccount} className="btn-danger">
              🗑️ Delete Account & All Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
