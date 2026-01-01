import React, { useState, useEffect } from 'react';
import './PasswordForm.css';

const PasswordForm = ({ password, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    username: '',
    password: '',
    url: '',
    notes: '',
  });

  useEffect(() => {
    if (password) {
      setFormData(password);
    }
  }, [password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const generatePassword = () => {
    const length = 16;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData(prev => ({ ...prev, password }));
  };

  return (
    <div className="password-form-overlay" onClick={(e) => e.target.className === 'password-form-overlay' && onCancel()}>
      <div className="password-form-container">
        <div className="password-form-header">
          <h2>{password ? 'Edit Password' : 'Add New Password'}</h2>
          <button type="button" className="btn-close" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="password-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            autoComplete="off"
            required
            placeholder="e.g., Gmail, Facebook"
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username *</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="off"
            required
            placeholder="Email or username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <div className="password-input-group">
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              required
              placeholder="Enter password"
            />
            <button type="button" onClick={generatePassword} className="btn-generate">
              🎲 Generate
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="url">Website URL</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            autoComplete="off"
            placeholder="https://example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional notes (optional)"
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {password ? 'Update' : 'Save'}
          </button>
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default PasswordForm;
