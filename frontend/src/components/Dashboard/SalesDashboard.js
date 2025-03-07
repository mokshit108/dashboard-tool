import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CustomersDeviceChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalWebSales, setTotalWebSales] = useState(0);
  const [totalOfflineSales, setTotalOfflineSales] = useState(0);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        // Fetch sales data from the API
        const response = await axios.get('http://localhost:8000/api/sales');

        if (response.data && response.data.length > 0) {
          setSalesData(response.data);

          // Calculate totals
          const webTotal = response.data.reduce((sum, item) => sum + item.web_sales, 0);
          const offlineTotal = response.data.reduce((sum, item) => sum + item.offline_sales, 0);

          setTotalWebSales(webTotal);
          setTotalOfflineSales(offlineTotal);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching sales data:', err);
        setError('Failed to load sales data. Please try again later.');
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  // Prepare data for Chart.js with the requested colors
  const chartData = {
    labels: salesData.map(() => ''), // Empty labels to remove Dec 13, Dec 14, etc.
    datasets: [
      {
        label: 'Web Sales',
        data: salesData.map(data => data.web_sales),
        backgroundColor: '#007FFF', // Azure color
        borderColor: '#007FFF',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 1,
        pointBackgroundColor: '#007FFF',
        pointBorderColor: '#007FFF',
        pointBorderWidth: 1,
        pointHoverRadius: 6,
        fill: false
      },
      {
        label: 'Offline Sales',
        data: salesData.map(data => data.offline_sales),
        backgroundColor: '#7FFFD4', // Aquamarine color
        borderColor: '#7FFFD4',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 1,
        pointBackgroundColor: '#7FFFD4',
        pointBorderColor: '#7FFFD4',
        pointBorderWidth: 1,
        pointHoverRadius: 6,
        fill: false
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the legend, as we'll show it below the chart
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
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(context.parsed.y);
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
        min: 0,
        max: 8000,
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 11
          },
          color: '#6B7280',
          padding: 10,
          stepSize: 4000,
          callback: function(value) {
            if (value === 0) return '0';
            if (value === 4000) return '4K';
            if (value === 8000) return '8K';
            return value;
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

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse mt-8">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
        </div>
        <div className="h-52 bg-gray-200 rounded"></div>
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

  if (salesData.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-5 rounded-lg shadow-sm mb-6">
        <div className="flex items-center">
          <svg className="h-5 w-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="font-medium">No Data Available</p>
        </div>
        <p className="mt-2 text-sm">No sales data is available at this time.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="px-6 pt-6 text-xl font-semibold text-gray-800">Customers by Device</h2>
      </div>

      <div className="h-52">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Legend below the graph with square markers */}
      <div className="flex justify-center space-x-8 pb-8">
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">Web Sales</span>
            <div className="w-3 h-3" style={{ backgroundColor: '#007FFF' }}></div>
          </div>
          <span className="text-sm items-start font-bold mt-1">1304%</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">Offline Sales</span>
            <div className="w-3 h-3" style={{ backgroundColor: '#7FFFD4' }}></div>
          </div>
          <span className="text-sm items-start font-bold mt-1">473%</span>
        </div>
      </div>
    </div>
  );
};

export default CustomersDeviceChart;