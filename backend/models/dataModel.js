const db = require('../config/database');

class DataModel {
  async createMonthlyDataTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS monthly_data (
        id SERIAL PRIMARY KEY,
        month VARCHAR(20),
        last_year INTEGER,
        this_year INTEGER
      )
    `;
    await db.query(createTableQuery);
  }

  async insertMonthlyData(month, lastYear, thisYear) {
    const insertQuery = `
      INSERT INTO monthly_data (month, last_year, this_year)
      VALUES ($1, $2, $3)
    `;
    return db.query(insertQuery, [month, lastYear, thisYear]);
  }

  async getAllMonthlyData() {
    const selectQuery = 'SELECT * FROM monthly_data';
    return db.query(selectQuery);
  }

  async createProductTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS product_data (
        id SERIAL PRIMARY KEY,
        product VARCHAR(100),
        sold_amount INTEGER,
        unit_price NUMERIC(10,2),
        revenue NUMERIC(10,2),
        rating NUMERIC(3,2)
      )
    `;
    await db.query(createTableQuery);
  }

  async insertProductData(product, soldAmount, unitPrice, revenue, rating) {
    const insertQuery = `
      INSERT INTO product_data (product, sold_amount, unit_price, revenue, rating)
      VALUES ($1, $2, $3, $4, $5)
    `;
    return db.query(insertQuery, [product, soldAmount, unitPrice, revenue, rating]);
  }

  async getAllProductData() {
    const selectQuery = 'SELECT * FROM product_data';
    return db.query(selectQuery);
  }

  async createSalesTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS sales_data (
        id SERIAL PRIMARY KEY,
        date TIMESTAMP NOT NULL,
        web_sales INTEGER NOT NULL,
        offline_sales INTEGER NOT NULL
      )
    `;
    await db.query(createTableQuery);
  }

  async insertSalesData(date, webSales, offlineSales) {
    const insertQuery = `
      INSERT INTO sales_data (date, web_sales, offline_sales)
      VALUES ($1, $2, $3)
    `;
    return db.query(insertQuery, [date, webSales, offlineSales]);
  }

  async getAllSalesData() {
    const selectQuery = 'SELECT * FROM sales_data';
    return db.query(selectQuery);
  }

  async createFinancialSummaryTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS financial_summary (
        id SERIAL PRIMARY KEY,
        purchases INTEGER,
        revenue NUMERIC(12,2),
        refunds NUMERIC(12,2)
      )
    `;
    await db.query(query);


  }

  async insertFinancialSummary(purchases, revenue, refunds) {
    const query = `
      INSERT INTO financial_summary (purchases, revenue, refunds)
      VALUES ($1, $2, $3)
    `;
    return db.query(query, [purchases, revenue, refunds]);
  }

  async getFinancialSummary() {
    return db.query('SELECT * FROM financial_summary');
  }

  async createPerformanceTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS performance_data (
        id SERIAL PRIMARY KEY,
        score INTEGER,
        title VARCHAR(100),
        message TEXT
      )
    `;
    await db.query(createTableQuery);
  }

  async insertPerformanceData(score, title, message) {
    const insertQuery = `
      INSERT INTO performance_data (score, title, message)
      VALUES ($1, $2, $3)
    `;
    return db.query(insertQuery, [score, title, message]);
  }

  async getPerformanceData() {
    const selectQuery = 'SELECT * FROM performance_data';
    return db.query(selectQuery);
  }

  async createTweetStatisticsTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS tweet_statistics (
        id SERIAL PRIMARY KEY,
        date2 TIMESTAMP,
        unique_count INTEGER,
        cumulative_tweets INTEGER
      )
    `;
    await db.query(query);
  }

  async insertTweetStatistics(date2, uniqueCount, cumulativeTweets) {
    const query = `
      INSERT INTO tweet_statistics (date2, unique_count, cumulative_tweets)
      VALUES ($1, $2, $3)
    `;
    return db.query(query, [date2, uniqueCount, cumulativeTweets]);
  }

  async getTweetStatistics() {
    const query = 'SELECT * FROM tweet_statistics ORDER BY date2 ASC';
    return db.query(query);
  }

  async createFeedbackTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS feedback (
        id SERIAL PRIMARY KEY,
        negative INTEGER,
        positive INTEGER,
        neutral INTEGER
      )
    `;
    await db.query(query);
  }

  async insertFeedback(negative, positive, neutral) {
    const query = `
      INSERT INTO feedback (negative, positive, neutral)
      VALUES ($1, $2, $3)
    `;
    return db.query(query, [negative, positive, neutral]);
  }

  async getFeedback() {
    const query = 'SELECT * FROM feedback';
    return db.query(query);
  }

  
async createUserTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await db.query(createTableQuery);
}

async insertUser(username, password) {
  // In a production environment, you should hash the password
  // For this demo, we're storing it as plain text
  const insertQuery = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING id, username, created_at
  `;
  return db.query(insertQuery, [username, password]);
}

async getUserByUsername(username) {
  const query = `
    SELECT * FROM users WHERE username = $1
  `;
  const result = await db.query(query, [username]);
  return result.rows[0];
}
  

}

module.exports = new DataModel();