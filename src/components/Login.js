import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './Login.css';
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogin = () => {
    // Perform authentication logic (replace with actual authentication)
    const isValidCredentials = username === 'p' && password === 'p';

    if (isValidCredentials) {
      onLogin(); // Update the isLoggedIn state in App.js
      navigate('/dashboard'); // Redirect to the dashboard using useNavigate
    } else {
      // Display an error message or handle authentication failure
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            placeholder='username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <p style={{ color: 'red' }}>{error}</p>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
