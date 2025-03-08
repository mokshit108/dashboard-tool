import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";

const FinancialSummary = () => {
  const [financialData, setFinancialData] = useState({
    purchases: 0,
    revenue: 0,
    refunds: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [percentChange, setPercentChange] = useState({
    purchases: '+32%',
    revenue: '+49%',
    refunds: '+7%'
  });

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        // Fetch financial summary from the updated endpoint
        const response = await axios.get('http://localhost:8000/api/financial');
        
        if (response.data && response.data.length > 0) {
          const latestData = response.data[0];
          setFinancialData({
            purchases: latestData.purchases || 0,
            revenue: latestData.revenue || 0,
            refunds: latestData.refunds || 0
          });
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching financial summary:', err);
        setError('Failed to load financial data. Please try again later.');
        setLoading(false);
      }
    };

    fetchFinancialData();
  }, []);

  // Format the currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format numbers with K for thousands
  const formatNumberWithK = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  // Format currency with K for thousands
  const formatCurrencyWithK = (value) => {
    if (value >= 1000) {
      return '$' + (value / 1000) + 'K';
    }
    return '$' + value.toString();
  };

  // Helper function to determine badge color based on value and type
  const getBadgeColor = (value, type) => {
    // Always make refunds red regardless of value
    if (type === 'refunds') {
      return 'bg-red-100 text-red-600';
    }
    
    if (value.startsWith('+')) {
      return 'bg-green-100 text-green-600';
    } else if (value.startsWith('-')) {
      return 'bg-red-100 text-red-600';
    } else {
      return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        <p className="font-bold">Error</p>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
    <h1 className="text-2xl font-bold mb-6 mt-2">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      
      {/* Purchases Card */}
      <div className="bg-white rounded-lg shadow p-6 transition duration-300 ease-in-out hover:shadow-lg hover:bg-blue-50">
        <h3 className="text-gray-500 text-sm font-medium">Purchases</h3>
        <div className="flex items-center mt-2">
          <p className="text-2xl font-bold">${financialData.purchases}</p>
          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium flex items-center ${getBadgeColor(percentChange.purchases, 'purchases')}`}>
          {percentChange.purchases}
            {percentChange.purchases.startsWith('+') ? (
              <FaArrowTrendUp className="ml-1" />
            ) : (
              <FaArrowTrendDown className="ml-1" />
            )}
           
          </span>
        </div>
      </div>

      {/* Revenue Card */}
      <div className="bg-white rounded-lg shadow p-6 transition duration-300 ease-in-out hover:shadow-lg hover:bg-green-50">
        <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
        <div className="flex items-center mt-2">
          <p className="text-2xl font-bold">{formatCurrencyWithK(financialData.revenue)}</p>
          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium flex items-center ${getBadgeColor(percentChange.revenue, 'revenue')}`}>
          {percentChange.revenue}
            {percentChange.revenue.startsWith('+') ? (
              <FaArrowTrendUp className="ml-1" />
            ) : (
              <FaArrowTrendDown className="ml-1" />
            )}
           
          </span>
        </div>
      </div>

      {/* Refunds Card */}
      <div className="bg-white rounded-lg shadow p-6 transition duration-300 ease-in-out hover:shadow-lg hover:bg-red-50">
        <h3 className="text-gray-500 text-sm font-medium">Refunds</h3>
        <div className="flex items-center mt-2">
          <p className="text-2xl font-bold">{formatCurrencyWithK(financialData.refunds)}</p>
          <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600 flex items-center">
            {percentChange.refunds}
            <FaArrowTrendUp className="ml-1" />
          </span>
        </div>
      </div>
    </div>
    </>
  );
};

export default FinancialSummary;