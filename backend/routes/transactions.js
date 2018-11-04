import express from 'express'

// express router middleware
const router = express.Router()

// require controllers
const TransactionController = require('../controllers/transaction.controller')

// Company ROUTES

// Http requests
router.post('/', TransactionController.update)
router.get('/', TransactionController.list)
router.get('/:id', TransactionController.getForUser)

module.exports = router
