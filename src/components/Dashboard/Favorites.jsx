import React, { useEffect, useState } from 'react';
import './Favorites.css';
import { Link } from 'react-router-dom';
import stockService from '../../services/stockService';
import Loader from './Loader';
import { useTheme } from '../ThemeContext';

const Favorites = ({ symbol, onDelete }) => {
  const [stockData, setStockData] = useState(null);

  const { themeStyles } = useTheme();

  const getLatestPriceColor = () => {
    if (stockData) {
      return '#00ab41';
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

    <div className="stock-card" style={themeStyles}>
      {stockData ? (
        <Link to={`/chart/${symbol}`} className="stock-link">
          {symbol}{'     '}
          <span style={{ color: getLatestPriceColor() }}>${stockData.latestPrice}</span>
          <p>{stockData.companyName}</p>
        </Link>
      ) : (
        <Loader />
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
