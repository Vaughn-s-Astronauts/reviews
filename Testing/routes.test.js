const app = require('../Server/controllers/index.js')
const request = require('supertest');

describe('GET /reviews', () => {
  it('responds with 200 when successful' , (done) => {
    request(app)
    .get('/reviews/?product_id=102&page=1&count=5&sort=newest')
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err)
    } else {
      done()
    }
    })
  })

  it('responds with object containing product property', (done) => {
    request(app)
    .get('/reviews/?product_id=102&page=1&count=5&sort=newest')
    .then((response) => {
      expect(response.body).toHaveProperty('product')
      done()
    })
    .catch((error) => {
      done(error)
      console.log('ERROR')
    })
  })
})