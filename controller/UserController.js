const express = require('express');
require('dotenv').config();
const UserService = require('../service/UserService');
const UserRepository = require('../repository/UserRepository');
const AuthService = require('../service/AuthService');
const CacheService = require('../service/CacheService');

const router = express.Router();
const cacheService = new CacheService();
const userService = new UserService(new UserRepository(), cacheService);
const authService = new AuthService(process.env.JWT_SECRET);

router.use(authService.authenticateJWT);

// Create a user
router.post('/user', async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get user by accountNumber
router.get('/user/account/:accountNumber', async (req, res) => {
  try {
    const user = await userService.getUserByAccountNumber(req.params.accountNumber);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get user by identityNumber
router.get('/user/identity/:identityNumber', async (req, res) => {
  try {
    const user = await userService.getUserByIdentityNumber(req.params.identityNumber);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Update user
router.put('/user/:id', async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    console.log('return updated user', updatedUser);
    
    res.send(updatedUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete user
router.delete('/user/:id', async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.send('User deleted');
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
