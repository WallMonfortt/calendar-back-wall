const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require('./database/config');

// Create a new express application instance
const app = express();

// Database
dbConnection();

// cors
app.use(cors());




// Public folder
app.use(express.static('public'));

// Parse request body as JSON
app.use(express.json());

// Routes
// TODO: Add routes
app.use('/api/auth', require('./Routes/auth'));
// TODO: CRUD:Events


// The port the express app will listen on
app.listen(process.env.PORT || 5000 , ()=>{
  console.log(`Server is running on port ${process.env.PORT}`);
});

