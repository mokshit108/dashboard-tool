// controllers/authController.js
const DataModel = require('../models/dataModel');

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await DataModel.getUserByUsername(username);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Compare passwords (in a real app, you would compare hashed passwords)
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // For a real application, you would generate a JWT token here
      // For simplicity, we'll just return user info
      const userInfo = {
        id: user.id,
        username: user.username
      };
      
      res.status(200).json({
        message: "Login successful",
        user: userInfo
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();