import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedbackDashboard = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ positive: 0, neutral: 0, negative: 0 });

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/feedback");
        console.log("Fetched Feedback Data:", response.data);

        if (response.data.length > 0) {
          const feedbackStats = response.data[0]; // First object contains counts
          setStats({
            positive: feedbackStats.positive || 0,
            neutral: feedbackStats.neutral || 0,
            negative: feedbackStats.negative || 0,
          });
        } else {
          setStats({ positive: 0, neutral: 0, negative: 0 });
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load feedback data");
        setLoading(false);
        console.error("Error fetching feedback:", err);
      }
    };

    fetchFeedback();
  }, []);

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "border-green-500";
      case "neutral":
        return "border-yellow-500";
      case "negative":
        return "border-red-500";
      default:
        return "border-gray-300";
    }
  };

  const calculateSentimentPercentages = () => {
    const total = stats.positive + stats.neutral + stats.negative;
    if (total === 0) return { positive: 0, neutral: 0, negative: 0 };

    return {
      positive: Math.round((stats.positive / total) * 100),
      neutral: Math.round((stats.neutral / total) * 100),
      negative: Math.round((stats.negative / total) * 100)
    };
  };

  const getSentimentStatus = () => {
    const percentages = calculateSentimentPercentages();
    
    if (percentages.positive > percentages.neutral && percentages.positive > percentages.negative) {
      return "Mostly Positive";
    } else if (percentages.negative > percentages.neutral && percentages.negative > percentages.positive) {
      return "Mostly Negative";
    } else if (percentages.neutral > percentages.positive && percentages.neutral > percentages.negative) {
      return "Mostly Neutral";
    } else {
      return "Mixed Feedback";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-semibold mb-4">Community Feedback</h2>
        <div className="flex justify-center items-center p-6">
          <p>Loading feedback data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h2 className="text-lg font-semibold mb-4">Community Feedback</h2>
        <div className="flex justify-center items-center p-6 text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const percentages = calculateSentimentPercentages();

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 mt-6">
      <h2 className="text-lg font-semibold mb-4">Community Feedback</h2>
      <h3 className="text-md font-medium mb-4 text-left">{getSentimentStatus()}</h3>

      {/* Percentage Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-4 flex overflow-hidden gap-1">
  {percentages.negative > 0 && (
    <div 
      className="h-full bg-red-500 rounded-full mx-[1px]" 
      style={{ width: `${percentages.negative}%` }}
    ></div>
  )}
  {percentages.neutral > 0 && (
    <div 
      className="h-full bg-yellow-500 rounded-full mx-[1px]" 
      style={{ width: `${percentages.neutral}%` }}
    ></div>
  )}
  {percentages.positive > 0 && (
    <div 
      className="h-full bg-green-500 rounded-full mx-[1px]" 
      style={{ width: `${percentages.positive}%` }}
    ></div>
  )}
</div>


      {/* Legend and Counts */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="flex flex-col items-center">
         
          <span className="text-xs text-gray-600">Negative</span>
          <span className="font-medium text-gray-800">{stats.negative}</span>
        </div>
        <div className="flex flex-col items-center">
       
          <span className="text-xs text-gray-600">Neutral</span>
          <span className="font-medium text-gray-800">{stats.neutral}</span>
        </div>
        <div className="flex flex-col items-center">
        
          <span className="text-xs text-gray-600">Positive</span>
          <span className="font-medium text-gray-800">{stats.positive}</span>
        </div>
      </div>

    </div>
  );
};

export default FeedbackDashboard;
