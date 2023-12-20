import React, { useEffect, useState } from 'react';
import './Favorites.css'; 
import { Link } from 'react-router-dom';
import stockService from '../../services/stockService';
import Loader from './Loader';


const Favorites = ({ symbol, onDelete }) => {
  const [stockData, setStockData] = useState(null);
  const getLatestPriceColor = () => {
    if (stockData) {
      const latestPrice = stockData.latestPrice;
      return latestPrice > 0 ? 'green' : latestPrice < 0 ? 'red' : 'black';
    }
    return 'black';
  };
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
      <button className="delete-button" onClick={() => onDelete(symbol)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Favorites;
