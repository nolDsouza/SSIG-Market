import express from 'express';

// express router middleware
const router = express.Router();

// require controllers
const TransactionController = require('../controllers/transaction.controller');

// Company ROUTES 

// POST request for opening a new account
//router.post('/create', AccountController.create); 
// POST request for opening a new account
router.post('/buy', TransactionController.buy);

module.exports = router;
