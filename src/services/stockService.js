const API_KEY = 'pk_19114b1b99eb4341b66a18b9085aad05'; // Replace with API key

const getStockSymbols = async () => {
  try {
    const response = await fetch(`https://cloud.iexapis.com/stable/ref-data/symbols?token=${API_KEY}`);

    if (!response.ok) {
      throw new Error('Failed to fetch stock symbols');
    }

    const data = await response.json();
    const symbols = data.map(stock => stock.symbol);
    return symbols;
  } catch (error) {
    console.error('Error fetching stock symbols:', error);
    throw error;
  }
};

const getStockDataBySymbol = async (symbol) => {
  try {
    const response = await fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch stock data for ${symbol}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    throw error;
  }
};

const getStockCashFlow = async (symbol) => {
  try {
    const response = await fetch(`https://api.iex.cloud/v1/data/core/cash_flow/${symbol}?token=${API_KEY}&last=100`);

    if (!response.ok) {
      throw new Error(`Failed to fetch cash flow data for ${symbol}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching cash flow data for ${symbol}:`, error);
    throw error;
  }
};

const getFundamentalsData = async (symbol) => {
  try {
    const response = await fetch(`https://api.iex.cloud/v1/data/core/fundamentals/${symbol}?token=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch fundamentals data for ${symbol}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching fundamentals data for ${symbol}:`, error);
    throw error;
  }
};
const stockService = {
  getStockSymbols,
  getStockDataBySymbol,
  getStockCashFlow,
  getFundamentalsData
};

export default stockService;
