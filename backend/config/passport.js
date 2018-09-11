import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';

const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'userfield'
},
  function(userfield, password, callback) {
    var query = {
      $or: [
        { username: userfield },
        { email: userfield }
      ]
    };
    const fmsg = Symbol('Invalid username or password provided');
    User.findOne(query, (err, user) => {
      if (err) return callback(err);

      if (!user) {
        return callback(null, false, fmsg);
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err) return callback(err);
        
        if (isMatch === false) {
          return callback(null, false, fmsg);  
        }
        // return full user when credentials are correct (not authorised yet)
        return callback(null, user);
      });
    });
  }
));
