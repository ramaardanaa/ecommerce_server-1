const request = require('supertest');
const app = require('../app')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize
const {hashPassword} = require('../helpers/bcrypt')

beforeAll((done) => {
    let admin = [{
      email: 'admin@mail.com',
      password: hashPassword('123456'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    queryInterface.bulkInsert('Users', admin, {})
    .then(() => {
      done()
    })
    .catch(err =>{
      done()
    })
})

afterAll(done => {
  queryInterface.bulkDelete('Users', null, {})
  .then(() => {
    done()
  })
  .catch(err => {
    done()
  })
})

describe('Test Login POST /login', () => {
  it('test login success', (done) => {
      request(app)
      .post('/login')
      .send({email: 'admin@mail.com', password: '123456'})
      .then(response => {
          let {body, status} = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('access_token', expect.any(String))
          done()
      })
      .catch(err => {
        done.fail(err)
      })
  })
  it('test login email found but wrong password', (done) => {
      request(app)
      .post('/login')
      .send({email: 'admin@mail.com', password: '111111'})
      .then(response => {
          let {body, status} = response
          expect(status).toBe(401)
          expect(body).toHaveProperty('error', 'Wrong email/password')
          done()
      })
      .catch(err => {
          done.fail(err)
      })
  })
  it('test login email not found in db', (done) => {
      request(app)
      .post('/login')
      .send({email: 'oke@mail.com', password: '123456'})
      .then(response => {
          let {body, status} = response

          expect(status).toBe(401)
          expect(body).toHaveProperty('error', 'Wrong email/password')
          done()
      })
      .catch(err => {
          ddone.fail(err)
      })
  })
  it('test login email and password empty', (done) => {
      request(app)
      .post('/login')
      .send({email: '', password: ''})
      .then(response => {
          let {body, status} = response

          expect(status).toBe(401)
          expect(body).toHaveProperty('error', 'Wrong email/password')
          done()
      })
      .catch(err => {
          done.fail(err)
      })
  })
}) 