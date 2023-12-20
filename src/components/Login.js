// Login.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const usersData = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = () => {
    const user = users.find(u => u.id === username && u.password === password);
  if (user) {
    onLogin();
    navigate('/dashboard');
  } else {
    setError('Invalid credentials');
  }
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      <form className="login-form">
        <label>
          
          <input
            type="text"
            value={username}
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
          />
        </label>
        <label>
          
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </label>
        <p className="error-message">{error}</p>
        <button type="button" onClick={handleLogin} className="login-button">
        Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
