const chai = require('chai')
const dirtyChai = require('dirty-chai')
const request = require('supertest')
const httpStatus = require('http-status')
const app = require('../../source/server/index')

const expect = chai.expect
chai.use(dirtyChai)

describe('Integration Tests: Status API', () => {
  describe('GET /status', () => {
    it('should return message OK', () => request(app)
      .get('/status')
      .expect(httpStatus.OK)
      .then(res => {
        expect(res.body).to.include({ message: 'OK' })
      }))
  })
})
