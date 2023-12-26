import React from 'react';
import stockService from '../../services/stockService';
import Favorites from './Favorites';
import './FavoritesList.css';
import { removeFromFavorites } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../ThemeContext';

const FavoritesList = () => {

  const { themeStyles } = useTheme();
  // const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state);
  const deleteStockFromFavorites = async (symbolToDelete) => {
    try {
      // Dispatch the action to remove favorite from Redux state
      dispatch(removeFromFavorites(symbolToDelete));
    } catch (error) {
      console.error('Error deleting stock data from favorites:', error);
    }
  };

  const handleFetchStockData = (symbol) => {
    console.log(symbol);
    stockService
      .getStockDataBySymbol(symbol)
      .then((data) => {
        console.log(data);
      })
      .catch((error) =>
        console.error(`Error fetching stock data for ${symbol}:`, error)
      );
  };

  return (
    <div className='fav-entire' style={themeStyles}>
      <div className="favorites-list-container ">
        {favorites && favorites.length === 0 ? (
          <p>No favorites found</p>
        ) : (
          <ul className="favorites-list">
            {favorites.map((symbol) => (
              <Favorites
                key={symbol.symbol}
                symbol={symbol.symbol}
                onClick={() => handleFetchStockData(symbol.symbol)}
                onDelete={() => deleteStockFromFavorites(symbol.symbol)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>

  );
};

export default FavoritesList;
