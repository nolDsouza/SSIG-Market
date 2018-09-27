import Transaction from '../models/Transaction';
import TransactionAccount from '../models/TransactionAccount.js';

module.exports.buy = function(req, res) {
  let transaction = new Transaction(req.body);
  TransactionAccount.findById(req.body.account_id, (err, account) => {
    if (err) return res.status(404).json(err);
    let price = transaction.value * transaction.amount;
    let stock = account.shares[transaction.asx_code] || 0;
    stock += transaction.amount;
    account.shares[transaction.asx_code] = stock;
    account.balance -= price;
    if (account.balance < 0) return res.status(400).send('insufficient funds');
    return res.json(account);
  });

  /*company.save()
    .then(company => {
      res.status(200).json({'company': 'Added successfully'});
    })
    .catch(err=> {
      res.status(400).send('Failed to create new record'); 
    });*/
};

module.exports.read = function(req, res) {
  Company.find((err, companies) => {
    if (err)
      console.log(err);
    else
      res.json(companies);
  });
};

module.exports.search = function(req, res) {
  var query = {
    $or: [
      { asx_code: req.params.id },
      { name: req.params.id }
    ]
  };
  Company.findOne(query, (err, company) => {
    if (err)
      console.log(err);
    else
      res.json(company);
  });
};
