import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header';
import StockChart from './components/Dashboard/StockChart';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import { ThemeProvider } from './components/ThemeContext';
import FavoritesList from './components/Dashboard/FavoritesList';

const App = () => {
  const api_key=process.env.REACT_APP_STOCK_API_KEY;
  console.log(api_key);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {

    setLoggedIn(false);

  };
   
  return (
    <ThemeProvider>
    <Provider store={store}>
     
    <Router>
      <div >
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard isLoggedIn={isLoggedIn} onLogout={handleLogout} /> : <Navigate to="/" />}
          />
          <Route
         
            path="/saved"
            element={isLoggedIn ? <FavoritesList  isLoggedIn={isLoggedIn} onLogout={handleLogout} /> : <Navigate to="/" />}
          />
           <Route
            path="/chart/:symbol"
            element={isLoggedIn ? <StockChart /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
    
    </Provider>
    </ThemeProvider>
  );
};

export default App;