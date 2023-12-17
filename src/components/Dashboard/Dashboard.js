import React, { useEffect, useState } from 'react';
import stockService from '../../services/stockService';

const Dashboard = () => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    // Example: Fetching stock data for symbol 'AAPL'
    const fetchStockData = async () => {
      try {
        const data = await stockService.getStockData('AAPL');
        setStockData(data);

        // Log the fetched data to the console
        console.log('Fetched Stock Data:', data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []); // Run once on component mount

  return (
    <div>
      <h2>Dashboard</h2>
      {stockData && (
        <div>
          <p>Symbol: {stockData.symbol}</p>
          <p>Last Price: {stockData.latestPrice}</p>
          {/* Add more stock data as needed */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
