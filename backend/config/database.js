const { Pool } = require('pg');
require('dotenv').config();

class Database {
  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    // Bind error handler to pool
    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  async query(text, params) {
    try {
      return await this.pool.query(text, params);
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }

  async initializeDatabase() {
    const client = await this.pool.connect();
    try {
      // Create table with additional error handling and logging
      await client.query(`
        CREATE TABLE IF NOT EXISTS monthly_data (
          id SERIAL PRIMARY KEY,
          month VARCHAR(20) NOT NULL,
          last_year INTEGER NOT NULL,
          this_year INTEGER NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Table monthly_data created or already exists');

      // Optional: Clear existing data before inserting
      await client.query('DELETE FROM monthly_data');

      // Seed initial data
      const data = [
        { month: 'Jan', lastYear: 5000, thisYear: 6000 },
        { month: 'Feb', lastYear: 10000, thisYear: 2000 },
        { month: 'Mar', lastYear: 2000, thisYear: 40000 },
        { month: 'Apr', lastYear: 3200, thisYear: 21000 },
        { month: 'May', lastYear: 12000, thisYear: 9200 },
        { month: 'Jun', lastYear: 13000, thisYear: 8700 }
      ];

      for (const item of data) {
        await client.query(
          'INSERT INTO monthly_data (month, last_year, this_year) VALUES ($1, $2, $3)',
          [item.month, item.lastYear, item.thisYear]
        );
      }

      console.log('Data initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async connect() {
    try {
      const client = await this.pool.connect();
      console.log('Connected to PostgreSQL database successfully');
      client.release();
      return this;
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    }
  }
}

module.exports = new Database();