import React, { useState } from 'react';
import StockList from './StockList';
import './Dashboard.css';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActive, setFilterActive] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterToggle = () => {
    setFilterActive((prevFilter) => !prevFilter);
  };
  
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Explore</h1>

      <div className="dashboard-search">
        <input
          type="text"
          placeholder="Search stocks..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="dashboard-search-input"
        />
        <button onClick={handleFilterToggle} className="dashboard-filter-button">
          {filterActive ? 'Reset' : 'Filter'}
        </button>
      </div>

      <StockList searchQuery={searchQuery} filterActive={filterActive}  />
    </div>
  );
};

export default Dashboard;
