import React, { useState, useEffect } from 'react';
import { fetchDashboardData } from '../../services/dataService';
import MonthlyChart from './MonthlyChart';
import DataTable from './DataTable';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const data = await fetchDashboardData();
  //       setDashboardData(data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError('Failed to load dashboard data');
  //       setLoading(false);
  //     }
  //   };

  //   loadData();
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div className="dashboard p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlyChart data={dashboardData} />
        <DataTable data={dashboardData} />
      </div>
    </div>
  );
};

export default Dashboard;