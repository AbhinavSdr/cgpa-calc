const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cgpaRoutes = require('./routes/cgpaRoutes');
//const authMiddleware = require('./middleware/authMiddleware');
require('dotenv').config()

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/cgpa', cgpaRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
