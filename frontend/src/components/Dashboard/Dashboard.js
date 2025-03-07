import React from 'react';
import FinancialSummary from './FinancialSummary';
import MonthlyDataChart from './MonthlyDataChart';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Financial Summary Cards */}
      <FinancialSummary />
      
      {/* Monthly Data Chart */}
      <div className="mt-8">
        <MonthlyDataChart />
      </div>
      
      {/* Add more components as needed */}
    </div>
  );
};

export default Dashboard;