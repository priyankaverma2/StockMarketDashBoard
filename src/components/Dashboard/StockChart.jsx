import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import stockService from '../../services/stockService';
import * as echarts from 'echarts';
import './StockChart.css';
import Loader from './Loader';
import { useTheme } from '../ThemeContext';

const StockChart = () => {
  const { themeStyles } = useTheme();
  const { symbol } = useParams();
  const [dates, setDates] = useState([]);
  const [selectedParam, setSelectedParam] = useState('Net Income'); // Default parameter
  const [netIncome, setNetIncome] = useState([]);
  const [cashFlow, setCashFlow] = useState([]);
  const [cashChange, setCashChange] = useState([]);
  const [capitalExpenditures, setCapitalExpenditures] = useState([]);
  const [netBorrowings, setNetBorrowings] = useState([]);
  const [stockData, setStockData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await stockService.getStockDataBySymbol(symbol);
        setStockData(data);
      } catch (error) {
        console.error(`Error fetching stock chart data for ${symbol}:`, error);
      }
    };

    fetchData();
  }, [symbol]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        let data;
        switch (selectedParam) {
          case 'Net Income':
            data = await stockService.getStockCashFlow(symbol);
            setNetIncome(data.map(entry => entry.netIncome));
            break;
          case 'Cash Flow':
            data = await stockService.getStockCashFlow(symbol);
            setCashFlow(data.map(entry => entry.cashFlow));
            break;
          case 'Cash Change':
            data = await stockService.getStockCashFlow(symbol);
            setCashChange(data.map(entry => entry.cashChange));
            break;
          case 'Capital Expenditures':
            data = await stockService.getStockCashFlow(symbol);
            setCapitalExpenditures(data.map(entry => entry.capitalExpenditures));
            break;
          case 'Net Borrowings':
            data = await stockService.getStockCashFlow(symbol);
            setNetBorrowings(data.map(entry => entry.netBorrowings));
            break;
          default:
            break;
        }
        if (data) {
          setDates(data.map(entry => entry.fiscalDate));
        }
      } catch (error) {
        console.error(`Error fetching ${selectedParam} data:`, error);
      }
    };

    fetchDataFromApi();
  }, [symbol, selectedParam]);

  useEffect(() => {
    const chartContainer = document.getElementById('main');

    if (chartContainer) {
      const myChart = echarts.init(chartContainer);
      const reversedDates = [...dates].reverse();
      let selectedData;

      switch (selectedParam) {
        case 'Net Income':
          selectedData = netIncome;
          break;
        case 'Cash Flow':
          selectedData = cashFlow;
          break;
        case 'Cash Change':
          selectedData = cashChange;
          break;
        case 'Capital Expenditures':
          selectedData = capitalExpenditures;
          break;
        case 'Net Borrowings':
          selectedData = netBorrowings;
          break;
        default:
          break;
      }

      const option = {
        xAxis: {
          type: 'category',
          data: reversedDates,
          axisPointer: {
            handle: {
              show: false,
            },
          },
        },
        yAxis: {
          type: 'value',
          scale: true,
        },
        series: [
          {
            data: selectedData ? selectedData.reverse() : [],
            type: 'line',
            smooth: true,
          },
        ],
      };

      myChart.setOption(option);

      window.addEventListener('resize', function () {
        myChart.resize();
      })

      return () => {
        myChart.dispose();
      };
    }
  }, [dates, netIncome, cashFlow, cashChange, capitalExpenditures, netBorrowings, selectedParam]);

  if (!stockData) {
    return <Loader />;
  }


  return (
    <div className='chart-entire' style={themeStyles}>
      <div className="stock-chart-container">
        <h2>Explore about {stockData.symbol}</h2>
        <div className="stock-info">
          <p className="company-name"><b>Company Name: </b>{stockData.companyName}</p>
          <p className="latest-price"><b>Latest Price: </b> ${stockData.latestPrice}</p>
          <p className="avg-volume"><b>Avg Volume: </b> {stockData.avgTotalVolume}</p>
          <p className="market-cap"><b>Market Cap: </b> {stockData.marketCap}</p>

          <label htmlFor="param-selector" className="param-selector-label">Select Parameter:</label>
          <select
            id="param-selector"
            className="param-selector"
            value={selectedParam}
            onChange={(e) => setSelectedParam(e.target.value)}
          >
            <option value="Net Income">Net Income</option>
            <option value="Cash Flow">Cash Flow</option>
            <option value="Cash Change">Cash Change</option>
            <option value="Capital Expenditures">Capital Expenditures</option>
            <option value="Net Borrowings">Net Borrowings</option>
          </select>
          {dates.length === 0 ? (
            <p>--- no data found for graphical visuals ---</p>
          ) : (
            <div id="main" style={{ width: '100%', height: '600px' }} ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockChart;
