import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import moment from 'moment';

const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const API_KEY = process.env.__SECRET__;

let User = new Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  firstname: {
    type: String,
    required: true,
    index: { unique: true }
  },
  lastname: {
    type: String,
    required: true,
    index: { unique: true }
  },
  balance: {
    type: Number
  },
  accounts: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
});

User.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

   // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

User.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
}

User.methods.generateJWT = function() {
  var expiry = new Date();
  expiry = moment(expiry).add(30, 'm').toDate();

  return jwt.sign({
    _id: this._id,
    email: this.email,
    firstname: this.firstname,
    lastname: this.lastname,
    balance: this.balance,
    accounts: this.accounts,
    exp: parseInt(expiry.getTime() / 1000),
  }, API_KEY);
}

export default mongoose.model('User', User);
