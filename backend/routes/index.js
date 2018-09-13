const jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.__SECRET__,
  userProperty: 'payload'
});
