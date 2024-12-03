const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fileRoutes = require('./routes/fileRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/files', fileRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('DB connection error:', error));

module.exports = app;
