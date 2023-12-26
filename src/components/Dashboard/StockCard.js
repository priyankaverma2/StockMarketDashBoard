// src/components/StockCard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import stockService from '../../services/stockService';
import './StockCard.css'; // Import your CSS file
import Loader from './Loader';



const StockCard = ({ symbol, onSave, onDelete }) => {
 
  const [stockData, setStockData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchDataForSymbol = async () => {
      try {
         
        const data = await stockService.getStockDataBySymbol(symbol);
        setStockData(data);
      } catch (error) {
        console.error(`Error fetching stock data for ${symbol}:`, error);
      }
    };

    fetchDataForSymbol();
  }, [symbol]);

  const getLatestPriceColor = () => {
    if (stockData) {
      return '#00ab41';
    }
    return 'black';
  };

  const handleSaveToggle = () => {
    // Toggle the save state
    setIsSaved(prevState => !prevState);

    // Call the appropriate function based on the save state
    if (!isSaved) {
      onSave(symbol);
    } else {
      onDelete(symbol);
    }
  };

  return (
    
    <div className="stock-card">
  {stockData ? (
    <Link to={`/chart/${symbol}`} className="stock-link">
      {symbol}{'     '}
      <span style={{ color: getLatestPriceColor() }}>${stockData.latestPrice}</span>
      <p>{stockData.companyName}</p>
    </Link>
  ) : (
    <Loader/>
  )}

  <div className="stock-buttons">
    <button className="save-button" onClick={handleSaveToggle}>
      {isSaved ? 'Delete' : 'Save'}
    </button>
  </div>
</div>
  );
};

export default StockCard;
