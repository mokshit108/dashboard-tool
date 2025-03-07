const DataModel = require('../models/dataModel');

class DataController {

  // Get All Data
  async getAllData(req, res) {
    try {
      const monthlyData = await DataModel.getAllMonthlyData();
      const productData = await DataModel.getAllProductData();
      const salesData = await DataModel.getAllSalesData();
      const financialSummary = await DataModel.getFinancialSummary();
      const performanceData = await DataModel.getPerformanceData();
      const tweetStatistics = await DataModel.getTweetStatistics();
      const feedback = await DataModel.getFeedback();

      res.status(200).json({
        monthlyData: monthlyData.rows,
        productData: productData.rows,
        salesData: salesData.rows,
        financialSummary: financialSummary.rows,
        performanceData: performanceData.rows,
        tweetStatistics: tweetStatistics.rows,
        feedback: feedback.rows
      });
    } catch (error) {
      console.error('Error getting all data:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Get Financial Summary specifically
  async getFinancialSummary(req, res) {
    try {
      const result = await DataModel.getFinancialSummary();

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "No financial data found" });
      }

      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error getting financial summary:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Add Financial Summary
  async addFinancialSummary(req, res) {
    try {
      const { purchases, revenue, refunds } = req.body;

      if (!purchases || !revenue || !refunds) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const result = await DataModel.addFinancialSummary({
        purchases,
        revenue,
        refunds
      });

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding financial summary:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getMonthlyData(req, res) {
    try {
      const result = await DataModel.getAllMonthlyData();

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "No monthly data found" });
      }

      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error getting monthly data:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Add Monthly Data
  async addMonthlyData(req, res) {
    try {
      const { month, last_year, this_year } = req.body;

      if (!month || last_year === undefined || this_year === undefined) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const result = await DataModel.addMonthlyData({
        month,
        last_year,
        this_year
      });

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding monthly data:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Get Performance Data
async getPerformanceData(req, res) {
  try {
    const result = await DataModel.getPerformanceData();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No performance data found" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error getting performance data:', error);
    res.status(500).json({ error: error.message });
  }
}

// Add Performance Data
async addPerformanceData(req, res) {
  try {
    const { score, title, message } = req.body;

    if (score === undefined || !title || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await DataModel.addPerformanceData({
      score,
      title,
      message
    });

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding performance data:', error);
    res.status(500).json({ error: error.message });
  }
}

 // Get Sales Data
 async getSalesData(req, res) {
  try {
    const result = await DataModel.getAllSalesData();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No sales data found" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error getting sales data:', error);
    res.status(500).json({ error: error.message });
  }
}

// Add Sales Data
async addSalesData(req, res) {
  try {
    const { date, web_sales, offline_sales } = req.body;

    if (!date || web_sales === undefined || offline_sales === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await DataModel.addSalesData({
      date,
      web_sales,
      offline_sales
    });

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding sales data:', error);
    res.status(500).json({ error: error.message });
  }
}

// Get Feedback Data
async getFeedback(req, res) {
  try {
    const result = await DataModel.getFeedback();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No feedback data found" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error getting feedback data:', error);
    res.status(500).json({ error: error.message });
  }
}

// Add Feedback Data
async addFeedback(req, res) {
  try {
    const { customer_name, feedback_text, sentiment, date } = req.body;

    if (!customer_name || !feedback_text || !sentiment || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate sentiment value
    if (!['positive', 'neutral', 'negative'].includes(sentiment)) {
      return res.status(400).json({ 
        message: "Invalid sentiment value. Must be 'positive', 'neutral', or 'negative'"
      });
    }

    const result = await DataModel.addFeedback({
      customer_name,
      feedback_text,
      sentiment,
      date
    });

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding feedback data:', error);
    res.status(500).json({ error: error.message });
  }
}

// Get Product Data
async getProductData(req, res) {
  try {
    const result = await DataModel.getAllProductData();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No product data found" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error getting product data:', error);
    res.status(500).json({ error: error.message });
  }
}

// Add Product Data
async addProductData(req, res) {
  try {
    const { product, soldAmount, unitPrice, revenue, rating } = req.body;

    if (!product || soldAmount === undefined || unitPrice === undefined || 
        revenue === undefined || rating === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await DataModel.addProductData({
      product,
      soldAmount,
      unitPrice,
      revenue,
      rating
    });

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding product data:', error);
    res.status(500).json({ error: error.message });
  }
}

}

module.exports = new DataController();