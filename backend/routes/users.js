import express from 'express';
// express router middleware
const router = express.Router();

const auth = require('./index');
// require controllers
const UserController = require('../controllers/user.controller');

/// USER ROUTES ///

// POST request for registering a new user
router.post('/register', UserController.register); 

// POST request for sending a password
router.post('/login', UserController.login);

// Get request for user details
//router.get('/dashboard', auth, UserController.dashboard);

module.exports = router;
