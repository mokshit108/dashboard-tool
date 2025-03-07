import React from 'react';
import FinancialSummary from './FinancialSummary';
import MonthlyDataChart from './MonthlyDataChart';
import PerformanceMeter from './PerformanceMeter';
import SalesDashboard from './SalesDashboard';
import FeedbackDashboard from './FeedbackDashboard';
import TopProducts from './TopProducts';

const Dashboard = () => {
  return (
    <div className="container">

      {/* Financial Summary and Performance Meter side by side */}
      <div className="flex flex-wrap">
        <div className="w-full lg:w-3/4 pr-0 lg:pr-4">
          {/* Single card wrapper for the three components */}
          <div className="bg-white rounded-lg shadow-md pl-4 pt-4 pr-4 mb-6">
            <div className="pb-2 px-4 mb-4">
              <FinancialSummary />
            </div>
            <div className="border-b pb-4 mb-4">
              <MonthlyDataChart />
            </div>
            <div className="px-4 pb-2">
              <TopProducts />
            </div>
          </div>
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