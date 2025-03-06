const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const dataRoutes = require('./routes/dataRoutes');
const DataModel = require('./models/dataModel'); // Import DataModel

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ensure the tables are created on startup
(async () => {
  try {
    await DataModel.createMonthlyDataTable();
    await DataModel.createProductTable();
    await DataModel.createSalesTable();
    await DataModel.createFinancialSummaryTable(); // New table for purchases, revenue, refunds
    await DataModel.createPerformanceTable();
    await DataModel.createTweetStatisticsTable();
    await DataModel.createFeedbackTable();
    console.log('Tables created or already exist.');
  } catch (error) {
    console.error('Error creating tables:', error.message);
  }
})();

// Routes
app.use('/api', dataRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
