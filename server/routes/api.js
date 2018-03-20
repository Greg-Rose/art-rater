const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
  secret: process.env.JWT_SECRET
});

const ctrlProfile = require('../controllers/profile');
const ctrlAuth = require('../controllers/authentication');
const ctrlPoems = require('../controllers/poem');

// profile
router.get('/profile', auth, ctrlProfile.show);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// Get poems
router.get('/poems', ctrlPoems.index);

// Create poem
router.post('/poems', auth, ctrlPoems.create);

// Show poem
router.get('/poems/:id', ctrlPoems.show);

// Delete poem
router.delete('/poems/:id', auth, ctrlPoems.delete);

module.exports = router;
