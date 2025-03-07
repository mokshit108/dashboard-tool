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


module.exports = router;