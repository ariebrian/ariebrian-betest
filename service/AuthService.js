const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthService {
  constructor(secretKey) {
    this.secretKey = process.env.JWT_SECRET;
  }

  // Generate JWT token
  generateToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '24h' });
  }

  // Middleware to verify JWT token
  authenticateJWT(req, res, next) {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
        
    if (!token) {
      return res.status(403).send({ message: 'Access denied, no token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: 'Invalid token.' });
      }
      
      req.user = decoded; // Attach user data from token to request object
      next();
    });
  }
}

module.exports = AuthService;
