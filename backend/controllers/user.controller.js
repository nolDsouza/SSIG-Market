import passport from 'passport';
import User from '../models/User';

module.exports.register = function(req, res) {
  let user = new User(req.body);

  user.save()
    .then(User => {
      var token = user.generateJWT();
      res.status(200).json({'token': token, 'user': 'added successfully'});
    })
    .catch(err => {
      res.status(400).send('Failed to create new record'); 
    });
};

module.exports.login = function(req, res) {
  passport.authenticate('local', (err, user, info) => {
    var token;

    if (err) return res.status(404).json(err);

    if (user) {
      token = user.generateJWT();
      res.status(200).json({ "token": token });
    } else {
      res.status(401).json(info);
    }
  })(req, res);

};

module.exports.dashboard = function(req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User.findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }
};

/*router.route('/transaction_accounts/:id').get((req, res) => {
  TransactionAccount.findById(req.params.id, (err, transaction_account) => {
    if (err)
      console.log(err);
    else
      res.json(transaction_account);
  });
});*/
