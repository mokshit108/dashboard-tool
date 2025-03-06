const DataModel = require('../models/dataModel');

class DataController {
  async initializeData(req, res) {
    const data = [
      { month: 'Jan', lastYear: 5000, thisYear: 6000 },
      { month: 'Feb', lastYear: 10000, thisYear: 2000 },
      { month: 'Mar', lastYear: 2000, thisYear: 40000 },
      { month: 'Apr', lastYear: 3200, thisYear: 21000 },
      { month: 'May', lastYear: 12000, thisYear: 9200 },
      { month: 'Jun', lastYear: 13000, thisYear: 8700 }
    ];

    try {
      await DataModel.createDataTable();

      for (const item of data) {
        await DataModel.insertData(item.month, item.lastYear, item.thisYear);
      }

      res.status(200).json({ message: 'Data initialized successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getData(req, res) {
    try {
      const result = await DataModel.getAllData();
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DataController();