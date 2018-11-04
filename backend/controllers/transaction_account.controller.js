import TransactionAccount from '../models/TransactionAccount';
import User from '../models/User';

module.exports.create = function(req, res) {
  const newAccount = new TransactionAccount({ 
    name: req.body.accountName, 
    balance: 0 
  }); 
  // Get the correct user so it's list of accounts can be accessed.
  User.findById(req.params.id, (err, user) => {
    if (err || !user) res.status(404).json(err);
    else {
      // Add new account to database.
      newAccount.save((err, account) => {
        if (err) return res.status(404).json(err);
        // Add account ref to user update.
        console.log(user);
        user.accounts.push(account.id);
        user.save().then(success => {
          res.status(200).json(account.id);
        }).catch(err => {
          res.status(400).json(err); 
        });
      });
    }
  });
};

/**
 * Update all ennummerable properties of an account based on the body
 * parameters defined in the request. (It should only be used to modify the 
 * name or the balance, but that may change in a future date).
 */
module.exports.update = function(req, callback) {
  TransactionAccount.findById(req.params.id, (err, account) => {
    if (err)
      res.status(400).json(err);
    else {
      // Assign values from source to dest.
      Object.assign(account, req.body);
      account.save().then(res => {
        callback.json(res); 
      }).catch(err => {
        callback.status(400).send('Update failed'); 
      });
    }
  });
};

/**
 * Returns a total list of all account objects including the number of shares
 * they own. The number of shares is an object. This request is not expected to
 * be used outside of testing as some documents in the collection may be very 
 * larege.
 */
module.exports.list = (req, res) => {
  TransactionAccount.find((err, transaction_accounts) => {
  if (err)
    console.log(err);
  else
    res.json(transaction_accounts);
  });
};

/**
 * Returns the a list of account objects, including the number of shares they
 * own. Parameters of the http request are expected to be account ids seperated
 * by a semi-colon.
 */
module.exports.get = (req, res) => {
  // The query is a mongoDB type query similar to SQL IN statement.
  TransactionAccount.find({
    // The id parameter is an array of ids, including the singular request
    '_id' : req.params.id.split(';')
  }, (err, accounts) => {
    if (err)
      console.log(err);
    else
      res.json(accounts);
  });
};

/*module.exports.create = (req, res) => {
  let transaction_account = new TransactionAccount(req.body);
  transaction_account.save()
    .then(transaction_account => {
      res.status(200).json({'transaction_account': 'Added successfully'});

    })
    .catch(err=> {
      res.status(400).send('Failed to create new record'); 
    });
};*/

module.exports.delete = (req, res)=> {
  // get and delete the account, it is returned as a callback
  TransactionAccount.findByIdAndRemove({_id: req.params.id}, (err, transaction_account) => {
    if (err) return res.status(400).send('Could not get account');
    // find the user who had this account
    User.findOne({ accounts: req.params.id}, (err, user) => {
      if (err) return res.status(400).send('Could not get user');
      // remove the account from the users list of accounts
      user.accounts = user.accounts.filter(e => e !== req.params.id);
      // save changes
      user.save((err) => {
        if (err) return res.status(400).send('Could not update accounts');
        res.status(200).json(user.accounts);
      });
    });
  });
};
