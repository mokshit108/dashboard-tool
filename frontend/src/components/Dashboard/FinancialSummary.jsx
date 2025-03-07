import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FinancialSummary = () => {
  const [financialData, setFinancialData] = useState({
    purchases: 0,
    revenue: 0,
    refunds: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [percentChange, setPercentChange] = useState({
    purchases: '+2.5%',
    revenue: '+4.3%',
    refunds: '+0.8%'
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Purchases Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 text-sm font-medium">Purchases</h3>
          <div className="p-2 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xl">#</span>
          </div>
        </div>
        <p className="text-3xl font-bold mt-2">{financialData.purchases.toLocaleString()}</p>
        <div className="flex items-center mt-2">
          <span className="text-green-500 text-sm font-medium">{percentChange.purchases}</span>
          <span className="text-gray-500 text-sm ml-2">from last month</span>
        </div>
      </div>

      {/* Revenue Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
          <div className="p-2 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-green-600 font-bold text-xl">$</span>
          </div>
        </div>
        <p className="text-3xl font-bold mt-2">{formatCurrency(financialData.revenue)}</p>
        <div className="flex items-center mt-2">
          <span className="text-green-500 text-sm font-medium">{percentChange.revenue}</span>
          <span className="text-gray-500 text-sm ml-2">from last month</span>
        </div>
      </div>

      {/* Refunds Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 text-sm font-medium">Refunds</h3>
          <div className="p-2 bg-red-100 rounded-lg flex items-center justify-center">
            <span className="text-red-600 font-bold text-xl">↓</span>
          </div>
        </div>
        <p className="text-3xl font-bold mt-2">{formatCurrency(financialData.refunds)}</p>
        <div className="flex items-center mt-2">
          <span className="text-red-500 text-sm font-medium">{percentChange.refunds}</span>
          <span className="text-gray-500 text-sm ml-2">from last month</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;