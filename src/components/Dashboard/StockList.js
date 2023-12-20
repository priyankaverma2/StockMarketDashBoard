import React, { useState, useEffect } from 'react';
import StockCard from './StockCard';
import stockService from '../../services/stockService'; 
import './StockList.css';
import Loader from './Loader';

const StockList = ({ searchQuery, filterActive}) => {
  const [symbols, setSymbols] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const stocksPerPage = 10;
  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;

  useEffect(() => {
    // Fetch stock symbols
    stockService.getStockSymbols()
      .then(symbols => setSymbols(symbols))
      .catch(error => console.error('Error fetching stock symbols:', error));
  }, []);

  if (!symbols || symbols.length === 0) {
    return  <Loader />; 
  }

  // Filter stocks based on searchQuery and filterActive
  const filteredSymbols = symbols.filter(symbol =>
    symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentStocks = filterActive
    ? filteredSymbols.slice(0, 5)
    : filteredSymbols.slice(indexOfFirstStock, indexOfLastStock);

    const deleteStockFromFavorites = async (symbolToDelete) => {
      try {
        // Send a DELETE request to remove the stock with the specified symbol
        const deleteResponse = await fetch(`http://localhost:3001/favorites/${symbolToDelete}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (deleteResponse.ok) {
          console.log('Stock data deleted from favorites:', symbolToDelete);
        } else {
          console.error('Failed to delete stock data:', deleteResponse.statusText);
        }
      } catch (error) {
        console.error('Error deleting stock data from favorites:', error);
      }
    };
    
    

  const saveStockDataToFavorites = async (symbol) => {
    try {
      // Fetch stock data for the current symbol
      const stockDataResponse = await stockService.getStockDataBySymbol(symbol);
      const { symbol: stockSymbol, companyName, latestPrice } = stockDataResponse;
  
      // Fetch existing favorites from db.json
      const favoritesResponse = await fetch('http://localhost:3001/favorites');
      if (!favoritesResponse.ok) {
        throw new Error('Failed to fetch favorites data');
      }
  
      const favorites = await favoritesResponse.json();
      console.log('Favorites received:', favorites);
  
      // Check if the symbol is already in favorites
      const isSymbolInFavorites = favorites.some((fav) => fav.id === stockSymbol);
  
      if (!isSymbolInFavorites) {
        const postResponse = await fetch('http://localhost:3001/favorites', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: stockSymbol, companyName, latestPrice }),
        });
  
        if (postResponse.ok) {
          console.log('Stock data saved to favorites:', stockSymbol);
        } else {
          console.error('Failed to add to favorites:', postResponse.statusText);
        }
      } else {
        console.warn(`${stockSymbol} is already in favorites.`);
      }
    } catch (error) {
      console.error('Error saving stock data to favorites:', error);
    }
  };
  
  
  

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="stock-list-container">
      
      <div className="stock-list-stock-cards">
        {currentStocks.map(symbol => (
          <StockCard
            key={symbol}
            symbol={symbol}
            onDelete={() => deleteStockFromFavorites(symbol)}
            onSave={() => saveStockDataToFavorites(symbol)}
          />
        ))}
      </div>

      <div className="stock-list-pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="stock-list-page-button"
        >
          Previous
        </button>
        <span className="stock-list-page-info">Page {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastStock >= symbols.length}
          className="stock-list-page-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StockList;
