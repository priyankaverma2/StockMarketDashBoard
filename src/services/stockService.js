const getStockData = async (symbol) => {
    const API_KEY = 'pk_19114b1b99eb4341b66a18b9085aad05'
// const API_KEY = process.env.STOCK_API_KEY;
console.log('API_KEY:', API_KEY);
  try {
    const response = await fetch(`https://cloud.iexapis.com/stable/stock/AAPL/quote?token=${API_KEY}`);
    // `https://cloud.iexapis.com/stable/ref-data/symbols?token=${API_KEY}`
    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

const stockService = {
  getStockData,
};

export default stockService;
