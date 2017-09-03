
const assert    = require('assert')
const request   = require('supertest')
const mongoose  = require('mongoose')

const app       = require('../../app')
const Driver    = mongoose.model('driver')

describe('Drivers controller', () => {
  it('POST to /api/drivers creates a new driver', done => {
    Driver.count().then(count => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {
          Driver.count().then(newCount => {
            assert(count + 1 === newCount)
            done()
          })
        })
    })
  })

  it('PUT to /api/drivers/id edits an existing driver', done => {
    const driver = new Driver({ email: 'test@test.com', driving: false })

    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: 'test@test.com' })
            .then(driver => {
              assert(driver.driving === true)
              done()
            })
        })
    })
  })

  it('DELETE to /api/drivers/id deletes a driver', done => {
    const driver = new Driver({ email: 'test@test' })

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: 'test@test.com' })
            .then(driver => {
              assert(driver === null)
              done()
            })
        })
    })
  })
})
