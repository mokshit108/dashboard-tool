import React from 'react';
import FinancialSummary from './FinancialSummary';
import MonthlyDataChart from './MonthlyDataChart';
import PerformanceMeter from './PerformanceMeter';
import SalesDashboard from './SalesDashboard';
import FeedbackDashboard from './FeedbackDashboard';
import TopProducts from './TopProducts';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-1">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Financial Summary and Performance Meter side by side */}
      <div className="flex flex-wrap">
        <div className="w-full lg:w-3/4 pr-0 lg:pr-4">
          <FinancialSummary />
          <MonthlyDataChart />
          <TopProducts />
        </div>
        <div className="w-full lg:w-1/4 mt-4 lg:mt-0">
          <PerformanceMeter />
          <SalesDashboard/>
          <FeedbackDashboard/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;