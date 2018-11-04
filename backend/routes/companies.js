import express from 'express'

// express router middleware
const router = express.Router()

// require controllers
const CompanyController = require('../controllers/company.controller')

// Company ROUTES

// POST request for registering a new company
router.post('/create', CompanyController.create)

// GET request for retrieving list of companies
router.get('/', CompanyController.read)

router.get('/:id', CompanyController.search)

module.exports = router
