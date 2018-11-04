import passport from 'passport'
import User from '../models/User'
import TransactionAccount from '../models/TransactionAccount'

module.exports.all = function (req, res) {
  User.find((err, users) => {
    if (err) {
      console.log(err)
    } else {
      res.json(users)
    }
  })
}

module.exports.register = function(req, res) {
  let user = new User(req.body)
  user.accounts = []
  // save the user default account
  new TransactionAccount().save((err, account) => {
   if (err) return res.status(404).json(err)
   user.accounts.push(account.id)
  })
 
  user.save()
    .then(User => {
      var token = user.generateJWT()
      res.status(200).json({'token': token, 'user': 'added successfully'})
    })
    .catch(err => {
      res.status(400).send('Failed to create new record') 
    })
}

module.exports.login = function(req, res) {
  passport.authenticate('local', (err, user, info) => {
    var token
    // Unexpected error
    if (err) return res.status(404).json(err)

    if (user) {
      // Correct password
      token = user.generateJWT()
      res.status(200).json({ "token": token })
    } else {
      // Incorrect password
      res.status(401).json(info)
    }
  })(req, res)

}

module.exports.dashboard = function(req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    })
  } else {
    // Otherwise continue
    User.findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user)
      })
  }
}

module.exports.buy = function(req, res) {
    User.findById(req.params.id, (err, user) => {
    if (!user)
      return next(new Error('Could not load document'))
    else {
      user.balance = req.body.balance

      user.save().then(user => {
        res.json('Update done') 
      }).catch(err=> {
        res.status(400).send('Update failed') 
      })
    }
  })
}

module.exports.leaderboard = function (req, res) {
    User.find("5bc5a59d40bd4c671859bee5").select("username accounts").exec(function (err, user) {
    var item = {
        username: user.username,
        accounts: user.accounts
    }
    res.json(item);
})
}
/*router.route('/transaction_accounts/:id').get((req, res) => {
  TransactionAccount.findById(req.params.id, (err, transaction_account) => {
    if (err)
      console.log(err)
    else
      res.json(transaction_account)
  })
})*/
