const API_BASE_URL = '/api';

class ApiService {
  async register(username, password) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Registration failed');
    }
    
    return response.json();
  }

  async login(username, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Login failed');
    }
    
    const data = await response.json();
    // Store user info in localStorage
    localStorage.setItem('userId', data.id);
    localStorage.setItem('username', username);
    return data;
  }

  async getAllPasswords(userId) {
    const response = await fetch(`${API_BASE_URL}/passwords/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch passwords');
    }
    
    return response.json();
  }

  async createPassword(passwordEntry) {
    const response = await fetch(`${API_BASE_URL}/passwords`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordEntry),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create password');
    }
    
    return response.json();
  }

  async updatePassword(id, passwordEntry) {
    const response = await fetch(`${API_BASE_URL}/passwords/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordEntry),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update password');
    }
    
    return response.json();
  }

  async deletePassword(id) {
    const response = await fetch(`${API_BASE_URL}/passwords/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete password');
    }
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }

  isAuthenticated() {
    return localStorage.getItem('userId') !== null;
  }

  getCurrentUserId() {
    return localStorage.getItem('userId');
  }

  getCurrentUsername() {
    return localStorage.getItem('username');
  }
}

const apiServiceInstance = new ApiService();
export default apiServiceInstance;
