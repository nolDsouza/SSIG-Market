import express from 'express'
import passport from 'passport'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const app = express()
const router = express.Router()
var usersRouter = require('./routes/users')
var companiesRouter = require('./routes/companies')
var accountsRouter = require('./routes/transaction_accounts')
var transactionsRouter = require('./routes/transactions')

require('./config/passport')

// Connecting to middleware
app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
app.use('/', usersRouter)
app.use('/companies', companiesRouter)
app.use('/users/accounts', accountsRouter)
app.use('/marketplace/transactions/', transactionsRouter)

// Connect to the database
mongoose.connect(process.env.__DATABASE__)

const connection = mongoose.connection
// Event listener
connection.once('open', () => {
  console.log('MongoDB database connection established successfully!')
})

router.route('/env').get((req, res) => {
  res.json(process.env)
})

// Attach middleware to default location.
app.use('/', router)

app.listen(4000, () => console.log('Express server running on port 4000'))
