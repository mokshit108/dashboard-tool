import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyDataChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('6 months');

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        // Fetch monthly data from the API
        const response = await axios.get('http://localhost:8000/api/monthly');

        if (response.data && response.data.length > 0) {
          setMonthlyData(response.data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching monthly data:', err);
        setError('Failed to load monthly data. Please try again later.');
        setLoading(false);
      }
    };

    fetchMonthlyData();
  }, []);

  // Filter data based on selected timeframe
  const getFilteredData = () => {
    if (timeframe === '3 months') {
      return monthlyData.slice(-3);
    } else if (timeframe === '6 months') {
      return monthlyData.slice(-6);
    }
    return monthlyData.slice(-6); // Default to 6 months
  };

  const filteredData = getFilteredData();

  // Prepare data for Chart.js with the requested colors
  const chartData = {
    labels: filteredData.map(data => data.month),
    datasets: [
      {
        label: 'Last Year',
        data: filteredData.map(data => data.last_year),
        backgroundColor: '#7FFFD4', // Aquamarine color for last year
        borderColor: '#5ECFB4',
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
      {
        label: 'This Year',
        data: filteredData.map(data => data.this_year),
        backgroundColor: '#007FFF', // Azure color for this year
        borderColor: '#0065CC',
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide Chart.js built-in legend
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#666',
        bodyFont: {
          family: "'Inter', sans-serif",
        },
        titleFont: {
          family: "'Inter', sans-serif",
          weight: 'bold'
        },
        padding: 12,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        displayColors: true,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 3,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US').format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 11
          },
          color: '#6B7280'
        },
        border: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 11
          },
          color: '#6B7280',
          padding: 10,
          stepSize: 5000, // Set step size to 5000 as requested
          callback: function (value) {
            return new Intl.NumberFormat('en-US', {
              notation: 'compact',
              compactDisplay: 'short'
            }).format(value);
          }
        },
        border: {
          display: false
        }
      },
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    }
  };

  const timeframeOptions = ['3 months', '6 months'];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
        </div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-5 rounded-lg shadow-sm mb-6">
        <div className="flex items-center">
          <svg className="h-5 w-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="font-medium">Error Loading Data</p>
        </div>
        <p className="mt-2 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 bg-red-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-700 transition duration-200"
        >
          Refresh Data
        </button>
      </div>
    );
  }

  if (monthlyData.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-5 rounded-lg shadow-sm mb-6">
        <div className="flex items-center">
          <svg className="h-5 w-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="font-medium">No Data Available</p>
        </div>
        <p className="mt-2 text-sm">No monthly comparison data is available at this time.</p>
      </div>
    );
  }

  return (
    <div className="bg-white px-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Comparison</h2>
        <div className="relative flex items-center">
          {/* Select Wrapper to maintain full-rounded look */}
          <div className="relative w-full rounded-full overflow-hidden border border-gray-300 bg-white">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="appearance-none w-full bg-white text-gray-700 font-medium text-md py-2 px-4 pr-10 rounded-full focus:outline-none"
            >
              {timeframeOptions.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="bg-white text-gray-700 font-medium hover:bg-gray-100 px-3 py-2"
                >
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown Icon */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

      </div>
      <div className="h-72">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Custom Legend - Center positioned with square color indicators */}
      <div className="mt-4 flex justify-center items-center">
        <div className="flex items-center mr-6">
          <div className="w-4 h-4 bg-[#7FFFD4] mr-2"></div>
          <span className="text-sm text-gray-700">Last Year</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#007FFF] mr-2"></div>
          <span className="text-sm text-gray-700">This Year</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyDataChart;