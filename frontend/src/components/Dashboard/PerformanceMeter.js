import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PerformanceMeter = () => {
  const [performanceData, setPerformanceData] = useState({
    id: 1,
    score: 78,
    title: "You are Good",
    message: "Your sales performance is better than others"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
        const response = await axios.get(`${API_BASE_URL}/api/performance`);
        if (response.data && response.data.length > 0) {
          setPerformanceData(response.data[0]);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching performance data:', err);
        setError('Failed to load performance data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate the end angle for the arc based on score
  const getProgressPath = (score) => {
    // Ensure score is between 0 and 100
    const normalizedScore = Math.min(Math.max(score, 0), 100);

    // Convert to percentage of the half circle (0 to 180 degrees)
    const endAngle = (normalizedScore / 100) * 180;

    // Parameters for the arc
    const radius = 75;
    const centerX = 100;
    const centerY = 100;

    // For 0 score, return empty path
    if (normalizedScore === 0) return "";

    // Create SVG arc path
    // Start from bottom left (-180 degrees or π radians)
    // End at the calculated angle
    const startAngle = -180;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = ((startAngle + endAngle) * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    // Large arc flag is 1 if the arc is > 180 degrees
    const largeArcFlag = endAngle > 180 ? 1 : 0;

    // Create the SVG path
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  const progressPath = getProgressPath(performanceData.score);

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg px-8 pt-4 pb-8 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105">
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Half-circle meter */}
          <div className="relative w-full flex justify-center mb-4">
            <svg width="200" height="140" viewBox="0 0 200 140">
              {/* Decorative elements around the meter */}
              <circle cx="100" cy="100" r="85" fill="none" stroke="#f3f4f6" strokeWidth="2" strokeDasharray="4 2" />
              <circle cx="100" cy="100" r="90" fill="none" stroke="#f3f4f6" strokeWidth="1" />

              {/* Small decorative circles */}
              <circle cx="20" cy="100" r="3" fill="#f3f4f6" />
              <circle cx="180" cy="100" r="3" fill="#f3f4f6" />
              <circle cx="100" cy="15" r="3" fill="#f3f4f6" />

              {/* Background gray arc (full half-circle) */}
              <path
                d="M 25 100 A 75 75 0 0 1 175 100"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="14"
                strokeLinecap="round"
              />

              {/* Blue progress arc */}
              {progressPath && (
                <path
                  d={progressPath}
                  fill="none"
                  stroke="#007FFF"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
              )}

              {/* Score display inside the half-circle */}
              <text
                x="100"
                y="100"
                fontSize="32"
                fontWeight="bold"
                textAnchor="middle"
                fill="#00308F"
              >
                {performanceData.score}
              </text>

              <text
                x="100"
                y="120"
                fontSize="12"
                textAnchor="middle"
                fill="#6b7280"
              >
                of 100 points
              </text>
            </svg>
          </div>

          {/* Horizontal divider line */}
          <hr className="w-full border-gray-200 mb-4" />

          {/* Title and message - left aligned */}
          <div className="text-left mt-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">{performanceData.title}</h2>
            <p className="text-gray-600 text-sm">{performanceData.message}</p>
          </div>

          {/* Improve score button - left aligned with more curve */}
          <div className="text-left">
            <button className="bg-white border hover:bg-gray-100 hover:text-gray-400 border-gray-300 text-gray-900 text-sm font-semibold py-2 px-4 rounded-full shadow-sm hover:border-gray-400 transition-all">
              Improve your score
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMeter;