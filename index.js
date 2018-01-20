/* ===================
   Import Node Modules
=================== */
const express = require('express'), // Fast, unopinionated, minimalist web framework for node.
	app = express(), // Initiate Express Application
	mongoose = require('mongoose'), // Node Tool for MongoDB
	config = require('./config/database'), // Mongoose Config
	path = require('path'); // NodeJS Package for file paths

// Database Connection
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Could not connect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});

// Provide static directory for frontend
app.use(express.static(__dirname + '/client/dist/'));

// Connect server to Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

// Start Server: Listen on port 8080
app.listen(8080, () => console.log('Listening on port 8080'));
