import Transaction from '../models/Transaction';

module.exports.create = function(req, res) {
  let company = new Company(req.body);
  company.save()
    .then(company => {
      res.status(200).json({'company': 'Added successfully'});
    })
    .catch(err=> {
      res.status(400).send('Failed to create new record'); 
    });
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
