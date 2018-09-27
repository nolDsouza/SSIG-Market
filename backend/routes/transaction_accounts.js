import express from 'express';

// express router middleware
const router = express.Router();

// require controllers
const AccountController = require('../controllers/transaction_account.controller');

// Company ROUTES 

// POST request for opening a new account
//router.post('/create', AccountController.create); 
// POST request for opening a new account
router.post('/create/:id', AccountController.create);

// GET request for retrieving list of accounts
router.get('/', AccountController.list);

router.get('/:id', AccountController.get);

router.post('/update/:id', AccountController.update);

router.get('/delete/:id', AccountController.delete);


module.exports = router;
