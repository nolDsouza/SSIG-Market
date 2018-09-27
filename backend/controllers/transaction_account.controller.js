import TransactionAccount from '../models/TransactionAccount';
import User from '../models/User';

module.exports.create = function(req, res) {
  const newAccount = new TransactionAccount({ 
    name: req.body.accountName, 
    balance: 0 
  }); 
  // Get the correct user so it's list of accounts can be accessed
  User.findById(req.params.id, (err, user) => {
    if (err || !user) res.status(404).json(err);
    else {
      // add new account to database
      newAccount.save((err, account) => {
        if (err) return res.status(404).json(err);
        // add account ref to user update
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

module.exports.update = function(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (!user)
      return next(new Error('Could not load document'));
    else {
      user = new User(req);
      user.save().then(user => {
        res.json('Update done'); 
      }).catch(err=> {
        res.status(400).send('Update failed'); 
      });
    }
  });
};

module.exports.list = (req, res) => {
  TransactionAccount.find((err, transaction_accounts) => {
  if (err)
    console.log(err);
  else
    res.json(transaction_accounts);
  });
};

module.exports.get = (req, res) => {
  TransactionAccount.findById(req.params.id, (err, transaction_account) => {
    if (err)
      console.log(err);
    else
      res.json(transaction_account);
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

module.exports.update = (req, res)=> {
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
};

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
