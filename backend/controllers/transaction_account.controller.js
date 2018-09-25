import TransactionAccount from '../models/TransactionAccount';



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

module.exports.create = (req, res) => {
  let transaction_account = new TransactionAccount(req.body);
  transaction_account.save()
    .then(transaction_account => {
      res.status(200).json({'transaction_account': 'Added successfully'});

    })
    .catch(err=> {
      res.status(400).send('Failed to create new record'); 
    });
};

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
  TransactionAccount.findByIdAndRemove({_id: req.params.id}, (err, transaction_account) => {
    if (err)
      res.json(err);
    else
      res.json('Removed successfully');
  });
};
