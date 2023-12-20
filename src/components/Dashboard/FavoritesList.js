import React, { useState, useEffect } from 'react';
import stockService from '../../services/stockService';
import Favorites from './Favorites';
import './FavoritesList.css';

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoritesResponse = await fetch('http://localhost:3001/favorites');
        if (!favoritesResponse.ok) {
          throw new Error('Failed to fetch favorites data');
        }

        const favoritesData = await favoritesResponse.json();
        setFavorites(favoritesData.map(stock => stock.id)); 
        console.log('Favorites received:', favoritesData);
      } catch (error) {
        console.error('Error fetching or parsing favorites data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteStockFromFavorites = async (symbolToDelete) => {
    try {
   
      const deleteResponse = await fetch(`http://localhost:3001/favorites/${symbolToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (deleteResponse.ok) {
        console.log('Stock data deleted from favorites:', symbolToDelete);
        setFavorites((prevFavorites) => prevFavorites.filter(symbol => symbol !== symbolToDelete));
      } else {
        console.error('Failed to delete stock data:', deleteResponse.statusText);
      }
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
    <div className="favorites-list-container">
      <h2>Favorites List</h2>
      <ul className="favorites-list">
        {favorites.map((symbol) => (
          <Favorites
            key={symbol}
            symbol={symbol}
            onClick={() => handleFetchStockData(symbol)}
            onDelete={() => deleteStockFromFavorites(symbol)}
          />
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
