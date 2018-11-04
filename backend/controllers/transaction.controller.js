import Transaction from '../models/Transaction'
import TransactionAccount from '../models/TransactionAccount.js'

/**
 * Update can be used to cater for buying and selling as the price is
 * always subtracted, while the amount is subtracted as well, since
 * price and amount are multiplied the negatives cancel out for sell.
 * Just use negative amount to indicate sale.
 */
module.exports.update = function (req, res) {
  let transaction = new Transaction(req.body)
  TransactionAccount.findById(req.body.account_id, (err, account) => {
    if (err) return res.status(404).json(err)
    // Change total balance based on price.
    let price = Math.abs(transaction.value) * transaction.amount
    account.balance -= price
    // Add the amount of stock owned currently.
    let stock = account.shares[transaction.asx_code] || 0
    stock += transaction.amount
    account.shares[transaction.asx_code] = stock
    // Shares is schema-less, mongoose does not now if it was updated.
    // So we have to mark it.
    account.markModified('shares')
    if (account.balance < 0) return res.status(400).send('insufficient funds')
    // Try to update the account.
    account.save()
      .then(newAccount => {
        transaction.save()
          .then(data => {
            return res.json(transaction)
          })
      })
      .catch(err => {
        res.status(400).json(err)
      })
  })
}

module.exports.list = function (req, res) {
  Transaction.find((err, transactions) => {
    if (err) {
      console.log(err)
    } else {
      res.json(transactions)
    }
  })
}

module.exports.getForUser = (req, res) => {
  // The query is a mongoDB type query similar to SQL IN statement.
  Transaction.find({
    user_id: req.params.id
  }, (err, transactions) => {
    if (err) {
      console.log(err)
    } else {
      res.json(transactions)
    }
  })
}
