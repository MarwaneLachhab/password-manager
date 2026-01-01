import React, { useState, useEffect } from 'react';
import PasswordForm from './PasswordForm';
import AccountSettings from './AccountSettings';
import Auth from './Auth';
import './PasswordList.css';

const PasswordList = () => {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [editingPassword, setEditingPassword] = useState(null);
  const [authenticatedPasswords, setAuthenticatedPasswords] = useState(new Set());
  const [showPassword, setShowPassword] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuth, setShowAuth] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setCurrentUser(JSON.parse(loggedInUser));
      setIsLoggedIn(true);
      setShowAuth(false);
      loadPasswords(JSON.parse(loggedInUser).email);
    }
  }, []);

  const loadPasswords = (userEmail) => {
    try {
      const allPasswords = JSON.parse(localStorage.getItem('allUserPasswords') || '{}');
      const userPasswords = allPasswords[userEmail] || [];
      setPasswords(userPasswords);
    } catch (err) {
      setError('Failed to load passwords');
    }
  };

  const savePasswords = (updatedPasswords) => {
    if (!currentUser) return;
    
    const allPasswords = JSON.parse(localStorage.getItem('allUserPasswords') || '{}');
    allPasswords[currentUser.email] = updatedPasswords;
    localStorage.setItem('allUserPasswords', JSON.stringify(allPasswords));
    setPasswords(updatedPasswords);
  };

  const handleLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      setIsLoggedIn(true);
      setShowAuth(false);
      loadPasswords(email);
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleRegister = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === email)) {
      setError('Email already registered');
      return;
    }
    
    const newUser = { email, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login after registration
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setShowAuth(false);
    loadPasswords(email);
    setError('');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsLoggedIn(false);
    setShowAuth(true);
    setPasswords([]);
    setAuthenticatedPasswords(new Set());
    setShowPassword({});
  };

  const authenticatePassword = async (passwordId) => {
    try {
      setError('');
      
      if (!window.PublicKeyCredential) {
        setError('Windows Hello is not supported on this browser. Please use Edge or Chrome.');
        return false;
      }

      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const credentialId = localStorage.getItem('webauthn_credential_id');
      
      if (!credentialId) {
        const publicKeyCredentialCreationOptions = {
          challenge: challenge,
          rp: {
            name: "Password Manager",
            id: window.location.hostname === 'localhost' ? 'localhost' : window.location.hostname,
          },
          user: {
            id: new Uint8Array(16),
            name: currentUser.email,
            displayName: currentUser.email,
          },
          pubKeyCredParams: [{alg: -7, type: "public-key"}],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
          },
          timeout: 60000,
          attestation: "direct"
        };

        const credential = await navigator.credentials.create({
          publicKey: publicKeyCredentialCreationOptions
        });
        
        const credId = btoa(String.fromCharCode(...new Uint8Array(credential.rawId)));
        localStorage.setItem('webauthn_credential_id', credId);
        
        setAuthenticatedPasswords(prev => new Set([...prev, passwordId]));
        return true;
      } else {
        const credIdBuffer = Uint8Array.from(atob(credentialId), c => c.charCodeAt(0));
        
        const publicKeyCredentialRequestOptions = {
          challenge: challenge,
          allowCredentials: [{
            id: credIdBuffer,
            type: 'public-key',
            transports: ['internal'],
          }],
          timeout: 60000,
          userVerification: "required",
        };

        await navigator.credentials.get({
          publicKey: publicKeyCredentialRequestOptions
        });
        
        setAuthenticatedPasswords(prev => new Set([...prev, passwordId]));
        return true;
      }
    } catch (err) {
      console.error('Authentication error:', err);
      if (err.name === 'NotAllowedError') {
        setError('Authentication was cancelled. Please try again.');
      } else {
        setError('Authentication failed: ' + err.message);
      }
      return false;
    }
  };

  const handleAdd = () => {
    setEditingPassword(null);
    setShowForm(true);
  };

  const handleEdit = (password) => {
    setEditingPassword(password);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this password?')) {
      const updatedPasswords = passwords.filter(pwd => pwd.id !== id);
      savePasswords(updatedPasswords);
    }
  };

  const handleFormSubmit = (passwordData) => {
    // Get account settings for auto-fill
    const accountSettings = JSON.parse(localStorage.getItem('accountSettings') || '{}');
    
    // Auto-fill email if enabled and not provided
    if (accountSettings.autoSaveEmail && accountSettings.email && !passwordData.username) {
      passwordData.username = accountSettings.email;
    }

    if (editingPassword) {
      const updatedPasswords = passwords.map(pwd =>
        pwd.id === editingPassword.id ? { ...passwordData, id: pwd.id } : pwd
      );
      savePasswords(updatedPasswords);
    } else {
      const newPassword = {
        ...passwordData,
        id: Date.now()
      };
      savePasswords([...passwords, newPassword]);
    }
    setShowForm(false);
    setEditingPassword(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPassword(null);
  };

  const togglePasswordVisibility = async (id) => {
    // If already authenticated for this password, just toggle visibility
    if (authenticatedPasswords.has(id)) {
      setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
      return;
    }
    
    // If trying to show password, authenticate first
    if (!showPassword[id]) {
      const authenticated = await authenticatePassword(id);
      if (authenticated) {
        setShowPassword(prev => ({ ...prev, [id]: true }));
      }
    }
  };

  const copyToClipboard = async (text, passwordId) => {
    // Check if this password is authenticated (only for password copies, not URL/username)
    if (passwordId && !authenticatedPasswords.has(passwordId)) {
      const authenticated = await authenticatePassword(passwordId);
      if (!authenticated) {
        return;
      }
    }
    
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const filteredPasswords = passwords.filter(pwd =>
    pwd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (pwd.username && pwd.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (pwd.url && pwd.url.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (showAuth) {
    return <Auth onLogin={handleLogin} onRegister={handleRegister} error={error} />;
  }

  return (
    <div className="password-list-container">
      <header className="password-header">
        <div className="header-content">
          <h1>🔐 Password Manager</h1>
          <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
            <span style={{color: 'white', fontSize: '0.9rem'}}>👤 {currentUser?.email}</span>
            <button onClick={() => setShowAccountSettings(true)} className="btn-secondary">
              ⚙️ Settings
            </button>
            <button onClick={handleLogout} className="btn-secondary">
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      <div className="password-content">
        {error && <div className="error-message">{error}</div>}

        {showAccountSettings && (
          <AccountSettings onClose={() => setShowAccountSettings(false)} />
        )}

        {showForm ? (
          <PasswordForm
            password={editingPassword}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        ) : (
          <>
            <div className="password-actions">
              <button onClick={handleAdd} className="btn-primary">
                ➕ Add New Password
              </button>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="🔍 Search passwords (e.g., github, gmail)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {loading ? (
              <div className="loading">Loading passwords...</div>
            ) : filteredPasswords.length === 0 ? (
              <div className="empty-state">
                <p>{searchTerm ? 'No passwords found matching your search.' : 'No passwords saved yet. Click "Add New Password" to get started.'}</p>
              </div>
            ) : (
              <div className="password-grid">
                {filteredPasswords.map((pwd) => (
                  <div key={pwd.id} className="password-card">
                    <div className="password-card-header">
                      <h3>{pwd.title}</h3>
                      <div className="password-card-actions">
                        <button onClick={() => handleEdit(pwd)} className="btn-icon" title="Edit">
                          ✏️
                        </button>
                        <button onClick={() => handleDelete(pwd.id)} className="btn-icon" title="Delete">
                          🗑️
                        </button>
                      </div>
                    </div>
                    
                    <div className="password-card-body">
                      {pwd.url && (
                        <div className="password-field">
                          <label>Website:</label>
                          <div className="field-with-copy">
                            <a href={pwd.url} target="_blank" rel="noopener noreferrer">
                              {pwd.url}
                            </a>
                            <button onClick={() => copyToClipboard(pwd.url)} className="btn-copy">
                              📋
                            </button>
                          </div>
                        </div>
                      )}
                      
                      <div className="password-field">
                        <label>Username/Email:</label>
                        <div className="field-with-copy">
                          <span>{pwd.username}</span>
                          <button onClick={() => copyToClipboard(pwd.username)} className="btn-copy">
                            📋
                          </button>
                        </div>
                      </div>
                      <div className="password-field">
                        <label>Password:</label>
                        <div className="field-with-copy">
                          <span className="password-value">
                            {showPassword[pwd.id] ? pwd.password : '•••••••••••'}
                          </span>
                          <button onClick={() => togglePasswordVisibility(pwd.id)} className="btn-copy" title="Show/Hide Password">
                            {showPassword[pwd.id] ? '🙈' : '👁️'}
                          </button>
                          <button onClick={() => copyToClipboard(pwd.password, pwd.id)} className="btn-copy" title="Copy Password">
                            📋
                          </button>
                        </div>
                      </div>
                      
                      {pwd.notes && (
                        <div className="password-field">
                          <label>Notes:</label>
                          <p className="notes-text">{pwd.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordList;
