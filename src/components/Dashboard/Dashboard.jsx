// Dashboard.js
import React from 'react';
import StockList from './StockList';
import './Dashboard.css';
import { useTheme } from '../ThemeContext';

const Dashboard = () => {
  const {themeStyles } = useTheme();

  return (
    <div className='entire'  style={themeStyles}>
    <div className="dashboard-container">
      <h1 className="dashboard-title">Explore</h1>
      <StockList />
    </div>
    </div>
  );
};

export default Dashboard;
