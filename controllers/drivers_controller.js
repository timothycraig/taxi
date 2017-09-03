
const Driver = require('../models/Driver')

module.exports = {

  greeting (req, res) {
    res.send({ hi: 'there' })
  },

  create (req, res, next) {
    const driverProps = req.body

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next)
  },

  edit (req, res, next) {
    const driverID = req.params.id
    const driverProps = req.body

    Driver.findByIdAndUpdate({ _id: driverID }, driverProps)
      .then(() => Driver.findById({ _id: driverID }))
      .then(driver => res.send(driver))
      .catch(next)
  },

  delete (req, res, next) {
    const driverID = req.params.id

    Driver.findByIdAndRemove({ _id: driverID })
      .then(driver => res.status(204).send(driver))
      .catch(next)
  }
}
