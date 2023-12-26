import React, { useState, useEffect } from 'react';
import StockCard from './StockCard';
import stockService from '../../services/stockService';
import './StockList.css';
import { addToFavorites, removeFromFavorites } from '../redux/actions';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../ThemeContext';

const StockList = () => {
  const { themeStyles } = useTheme();
  const [symbols, setSymbols] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  // const [filterActive, setFilterActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const stocksPerPage = 10;
  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state);
  useEffect(() => {
    // Fetch stock symbols
    stockService
      .getStockSymbols()
      .then((symbols) => {
        setSymbols(symbols);
        setSearchResults(symbols); // Set initial search results to all symbols
      })
      .catch((error) => console.error('Error fetching stock symbols:', error));
  }, []);

  if (!symbols || symbols.length === 0) {
    return <Loader />;
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchClick = () => {
    // Trigger the search when the button is clicked
    // Perform the search logic here
    const results = symbols.filter((symbol) =>
      symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const deleteStockFromFavorites = (symbolToDelete) => {
    dispatch(removeFromFavorites(symbolToDelete));
  };

  const saveStockDataToFavorites = async (symbol) => {
    try {
      const stockDataResponse = await stockService.getStockDataBySymbol(symbol);
      const { symbol: stockSymbol, companyName, latestPrice } = stockDataResponse;
      const isSymbolInFavorites = favorites.some((fav) => fav.symbol === stockSymbol);

      if (!isSymbolInFavorites) {
        dispatch(addToFavorites({ symbol: stockSymbol, companyName, latestPrice }));
      } else {
        console.warn(`${stockSymbol} is already in favorites.`);
      }
    } catch (error) {
      console.error('Error saving stock data to favorites:', error);
    }
  };

  const currentStocks =  searchResults.slice(indexOfFirstStock, indexOfLastStock);

  return (
    <div className='entire'  style={themeStyles}>
    <div className="stock-list-container">
      <div className="dashboard-search">
        <input
          type="text"
          placeholder="Search stocks..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="dashboard-search-input"
        />
        <button onClick={handleSearchClick} className="dashboard-filter-button">
          Search
        </button>
      </div>

      <div className="stock-list-stock-cards">
        {currentStocks.map((symbol) => (
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
          disabled={indexOfLastStock >= searchResults.length}
          className="stock-list-page-button"
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default StockList;
