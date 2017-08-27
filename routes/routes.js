
const DriversController = require('../controllers/drivers_controller')

module.exports = (app) => {
  // Watch for incoming GET requests
  app.get('/api', DriversController.greeting)

  app.post('/api/drivers', DriversController.create)
}
