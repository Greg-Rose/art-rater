const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/art-rater';

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// BRING IN SCHEMAS & MODELS
require('./user');
require('./poem');
