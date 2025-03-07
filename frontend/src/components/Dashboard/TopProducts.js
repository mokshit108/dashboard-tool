import React, { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa6";

const TopProducts = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        console.log(data,"response")
        setProductData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4">Loading product data...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white p-4 mb-6 relative">
      <h2 className="text-xl font-bold mb-4">Top Products</h2>
      
      {/* Full Results button */}
      <div className="absolute top-4 right-4">
        <span className="px-4 py-3 text-sm bg-white border font-semibold text-gray-500 border-gray-300 rounded-full">
          Full Results
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y mt-3 divide-gray-200">
          <thead>
            <tr className="border-b-2 shadow-lg border-gray-200 bg-white">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500  tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                Sold Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500  tracking-wider">
                Unit Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500  tracking-wider">
                Rating
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productData.map((item, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-black">
                  {item.product}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                  {item.sold_amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                  ${item.unit_price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                  ${item.revenue.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-md text-black flex items-center">
                  <FaStar className='text-yellow-500 mr-1 h-3 w-3' />
                  {item.rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProducts;