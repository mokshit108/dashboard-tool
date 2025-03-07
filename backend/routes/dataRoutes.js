const express = require('express');
const router = express.Router();
const DataController = require('../controllers/dataController');

// Get all data
router.get('/all', DataController.getAllData);

// Financial summary routes
router.get('/financial', DataController.getFinancialSummary);
router.post('/financial', DataController.addFinancialSummary);

// Monthly data routes
router.get('/monthly', DataController.getMonthlyData);
router.post('/monthly', DataController.addMonthlyData);

// Performance data routes
router.get('/performance', DataController.getPerformanceData);
router.post('/performance', DataController.addPerformanceData);

// Sales data routes
router.get('/sales', DataController.getSalesData);
router.post('/sales', DataController.addSalesData);

// Feedback routes
router.get('/feedback', DataController.getFeedback);
router.post('/feedback', DataController.addFeedback);

// Product data routes
router.get('/products', DataController.getProductData);
router.post('/products', DataController.addProductData);

module.exports = router;