const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');

const userRoutes = require('./controller/UserController');
const userCredentialRoutes = require('./controller/UserCredentialController');

const app = express();

app.use(bodyParser.json());
app.use(userCredentialRoutes)
app.use(userRoutes);

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

console.log('connection', `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/`);


mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.listen(3000, () => console.log('Server running on port 3000'));
