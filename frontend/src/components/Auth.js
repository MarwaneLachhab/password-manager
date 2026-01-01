import React, { useState } from 'react';
import './Auth.css';

const Auth = ({ onLogin, onRegister, error }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLogin && password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (isLogin) {
      onLogin(email, password);
      
      // Prompt browser to save credentials
      if (window.PasswordCredential) {
        const cred = new window.PasswordCredential({
          id: email,
          password: password,
          name: email
        });
        navigator.credentials.store(cred);
      }
    } else {
      onRegister(email, password);
      
      // Prompt browser to save credentials
      if (window.PasswordCredential) {
        const cred = new window.PasswordCredential({
          id: email,
          password: password,
          name: email
        });
        navigator.credentials.store(cred);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🔐 Password Manager</h1>
          <p>{isLogin ? 'Welcome back! Sign in to access your passwords.' : 'Create your account to start managing passwords securely.'}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              autoComplete="username email"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Master Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your master password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
              minLength="6"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                required
                minLength="6"
              />
            </div>
          )}

          <button type="submit" className="btn-primary">
            {isLogin ? '🔓 Sign In' : '✨ Create Account'}
          </button>
        </form>

        <div className="auth-toggle">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setIsLogin(false)} className="link-button">
                Create one now
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => setIsLogin(true)} className="link-button">
                Sign in
              </button>
            </p>
          )}
        </div>

        <div className="auth-info">
          <h3>🛡️ Your passwords are protected by:</h3>
          <ul>
            <li>✅ Master password authentication</li>
            <li>✅ Windows Hello per-password protection</li>
            <li>✅ Local encrypted storage</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Auth;
