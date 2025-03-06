import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Last Year',
        data: data.map(item => item.last_year),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'This Year',
        data: data.map(item => item.this_year),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { 
        display: true, 
        text: 'Monthly Data Comparison' 
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default MonthlyChart;