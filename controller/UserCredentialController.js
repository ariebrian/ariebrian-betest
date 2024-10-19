const express = require('express');
const UserCredentialService = require('../service/UserCredentialService');
const UserCredentialRepository = require('../repository/UserCredentialRepository');
const UserCredentialModel = require('../models/UserCredentials');
const UserService = require('../service/UserService');
const UserRepository = require('../repository/UserRepository');
const UserModel = require('../models/User');
const CacheService = require('../service/CacheService');

const router = express.Router();
const userCredentialRepository = new UserCredentialRepository(UserCredentialModel);
const userCredentialService = new UserCredentialService(new UserCredentialRepository());

const userRepository = new UserRepository(UserModel);
const userService = new UserService(new UserRepository(), new CacheService());

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('req', req.body);
    
    try {
      const result = await userCredentialService.loginUser(email, password);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = await userCredentialService.registerUser({ username, email, password });
    await userService.createUser({userName: username, emailAddress: email})
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
