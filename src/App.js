import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header';
import StockChart from './components/Dashboard/StockChart';
import SavedtoFav from './components/Dashboard/SavedtoFav';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {

    setLoggedIn(false);

  };
   
  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard isLoggedIn={isLoggedIn} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
         
            path="/saved"
            element={isLoggedIn ? <SavedtoFav  isLoggedIn={isLoggedIn} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
           <Route
            path="/chart/:symbol"
            element={isLoggedIn ? <StockChart /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;