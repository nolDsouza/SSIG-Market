import express from 'express';
import passport from 'passport';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import TransactionAccount from './models/TransactionAccount.js';
import User from './models/User.js';

require('./config/passport');

const app = express();
const router = express.Router();
var usersRouter = require('./routes/users');
var companiesRouter = require('./routes/companies');

// Connecting to middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/', usersRouter);
app.use('/companies', companiesRouter);

// Connect to the database
mongoose.connect(process.env.__DATABASE__);

const connection = mongoose.connection;
// Event listener
connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

router.route('/transaction_accounts').get((req, res) => {
  TransactionAccount.find((err, transaction_accounts) => {
    if (err)
      console.log(err);
    else
      res.json(transaction_accounts);
  });
});

router.route('/transaction_accounts/:id').get((req, res) => {
  TransactionAccount.findById(req.params.id, (err, transaction_account) => {
    if (err)
      console.log(err);
    else
      res.json(transaction_account);
  });
});

router.route('/transaction_accounts/add').post((req, res) => {
  let transaction_account = new TransactionAccount(req.body);
  transaction_account.save()
    .then(transaction_account => {
      res.status(200).json({'transaction_account': 'Added successfully'});

    })
    .catch(err=> {
      res.status(400).send('Failed to create new record'); 
    });
});

router.route('/transaction_accounts/update/:id').post((req, res)=> {
  TransactionAccount.findById(req.params.id, (err, transaction_account) => {
    if (!transaction_account)
      return next(new Error('Could not load document'));
    else {
      transaction_account.name = req.body.name;
      transaction_account.owner = req.body.owner;
      transaction_account.balance = req.body.balance;
      transaction_account.shares = req.body.shares;
      transaction_account.value = req.body.value;
      transaction_account.description = req.body.description;

      transaction_account.save().then(transaction_account=> {
        res.json('Update done'); 
      }).catch(err=> {
        res.status(400).send('Update failed'); 
      });
    }
  });
});

router.route('/transaction_accounts/delete/:id').get((req, res)=> {
  TransactionAccount.findByIdAndRemove({_id: req.params.id}, (err, transaction_account) => {
    if (err)
      res.json(err);
    else
      res.json('Removed successfully');
  });
});

router.route('/users').get((req, res) => {
  User.find((err, users) => {
    if (err)
      console.log(err);
    else
      res.json(users);
  });
});

router.route('/dashboard/:id').get((req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err)
      console.log(err);
    else
      res.json(user);
  });
});


/*router.route('/login').post((req, res) => {
  if (!req.body.id || !req.body.password) {
    res.json('Please input username and password');
  } else {
    var query = {
      $or: [
        { username: req.body.id },
        { email: req.body.id }
      ]
    };
    // fetch user and apply validation
    User.findOne(query, (err, user) => {
      // unforseen exceptions
      if (err) res.json(err);
      // invalid username
      else if (!user) {
        res.json('Incorrect username or password provided');
      // valid username
      } else {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (err) res.json(err);
          else if (isMatch === true) {
            res.json(user);
          } else {
            res.json('Incorrect username or password provided');
          }
        });
      }
    });
  }
  
});
*/
router.route('/users/update/:id').post((req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!user)
      return next(new Error('Could not load document'));
    else {
      user.username = req.body.username;
      user.email = req.body.email;
      user.bio = req.body.bio;
      user.image = req.body.image;
      user.save().then(user => {
        res.json('Update done'); 
      }).catch(err=> {
        res.status(400).send('Update failed'); 
      });
    }
  });
});

router.route('/users/reset_password/:id').post((req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (!user)
      return next(new Error('Could not load document'));
    else {
      user.password = req.body.password;
      user.save().then(user => {
        res.json('Update done'); 
      }).catch(err=> {
        res.status(400).send('Update failed'); 
      });
    }
  });
});

router.route('/users/delete/:id').get((req, res) => {
  User.findByIdAndRemove({_id: req.params.id}, (err, user) => {
    if (err)
      res.json(err);
    else
      res.json('Removed successfully');
  });
});

router.route('/env').get((req, res) => {
  res.json(process.env)
});


// Attach middleware to default location 
app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));
