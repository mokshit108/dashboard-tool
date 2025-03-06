const express = require('express');
const router = express.Router();
const DataController = require('../controllers/dataController');

router.post('/initialize', DataController.initializeData);
router.get('/data', DataController.getData);

module.exports = router;