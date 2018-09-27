import express from 'express';
import jwt from 'express-jwt';

// express router middleware
const router = express.Router();

// require controllers
const UserController = require('../controllers/user.controller');

var auth = jwt({
  secret: process.env.__SECRET__,
  userProperty: 'payload'
});

// USER ROUTES 

// POST request for registering a new user
router.post('/register', UserController.register); 

// POST request for sending a password
router.post('/login', UserController.login);

// GET request for user details
router.get('/dashboard', auth, UserController.dashboard);

module.exports = router;
