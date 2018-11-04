import Company from '../models/Company'

module.exports.create = function (req, res) {
  let company = new Company(req.body)
  company.save()
    .then(company => {
      res.status(200).json({ 'company': 'Added successfully' })
    })
    .catch(err => {
      res.status(400).json(err)
    })
}

module.exports.read = function (req, res) {
  Company.find((err, companies) => {
    if (err) {
      res.status(400).json(err)
    } else {
      res.json(companies)
    }
  })
}

module.exports.search = function (req, res) {
  var query = {
    $or: [
      { asx_code: req.params.id.toUpperCase() },
      { name: req.params.id.toUpperCase() }
    ]
  }
  Company.findOne(query, (err, company) => {
    if (err) {
      res.status(400).json(err)
    } else {
      res.json(company)
    }
  })
}
