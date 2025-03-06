import React from 'react';

const DataTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Month</th>
            <th className="px-4 py-2 border">Last Year</th>
            <th className="px-4 py-2 border">This Year</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{item.month}</td>
              <td className="px-4 py-2 border text-right">{item.last_year}</td>
              <td className="px-4 py-2 border text-right">{item.this_year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;