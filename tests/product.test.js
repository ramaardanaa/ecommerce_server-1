const request = require('supertest');
const app = require('../app')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize
const { User, Product } = require("../models/");
const { signToken } = require('../helpers/jwt');
const { hashPassword } = require("../helpers/bcrypt")

let access_token = ""
let customer_token = ""
let id

beforeAll((done) => {
  let user = {
    email: 'admin@mail.com',
    password: hashPassword('123456'),
    role: 'admin',
  }
  let customer = {
    email: 'customer@mail.com',
    password: hashPassword('123456'),
    role: 'customer'
  }

  User.create(user)
    .then(data => {
      access_token = signToken({
        id: data.id,
        email: data.email
      })
      return User.create(customer)
    })
    .then(data => {
      customer_token = signToken({
        id: data.id,
        email: data.email
      })
      done()
    })
    .catch(err => {
      done(err)
    })

})


afterAll((done) => {
  queryInterface.bulkDelete('Products')
    .then(() => {
      return queryInterface.bulkDelete('Users')
    })
    .then(() => {
      done()
    })
    .catch(err => {
      done(err)
    })
})


describe('Test product POST /products', () => {
  it('Add product success', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Iphone 12',
        image_url: 'https://awsimages.detik.net.id/visual/2020/05/13/4133def8-32d9-4e76-a3fa-f1fbd6a8a74b.jpeg?w=650',
        price: 20000000,
        stock: 20
      })
      .then(response => {
        let { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('name', 'Iphone 12')
        expect(body).toHaveProperty('image_url', 'https://awsimages.detik.net.id/visual/2020/05/13/4133def8-32d9-4e76-a3fa-f1fbd6a8a74b.jpeg?w=650')
        expect(body).toHaveProperty('price', 20000000)
        expect(body).toHaveProperty('stock', 20)
        expect(body).toHaveProperty('UserId', expect.any(Number))
        id = +body.id
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('Add product failed, empty name', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: '',
        image_url: 'https://awsimages.detik.net.id/visual/2020/05/13/4133def8-32d9-4e76-a3fa-f1fbd6a8a74b.jpeg?w=650',
        price: 20000000,
        stock: 20
      })
      .then(response => {
        let { body, status } = response

        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Name cannot be empty')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Add product failed, empty image_url', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Iphone 12',
        image_url: '',
        price: 20000000,
        stock: 20
      })
      .then(response => {
        let { body, status } = response

        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Image_url cannot be empty')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Add product failed, empty price', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Iphone 12',
        image_url: 'https://awsimages.detik.net.id/visual/2020/05/13/4133def8-32d9-4e76-a3fa-f1fbd6a8a74b.jpeg?w=650',
        price: null,
        stock: 20
      })
      .then(response => {
        let { body, status } = response

        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Price cannot be empty')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Add product failed, minus price', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Iphone 12',
        image_url: 'https://awsimages.detik.net.id/visual/2020/05/13/4133def8-32d9-4e76-a3fa-f1fbd6a8a74b.jpeg?w=650',
        price: -20000000,
        stock: 20
      })
      .then(response => {
        let { body, status } = response

        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Price cannot be less than zero')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Add product failed, price not a number', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Iphone 12',
        image_url: 'https://awsimages.detik.net.id/visual/2020/05/13/4133def8-32d9-4e76-a3fa-f1fbd6a8a74b.jpeg?w=650',
        price: 'aaaaaaaa',
        stock: 20
      })
      .then(response => {
        let { body, status } = response

        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Price must be a number value')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Add product failed, empty stock', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Iphone 12',
        image_url: 'https://awsimages.detik.net.id/visual/2020/05/13/4133def8-32d9-4e76-a3fa-f1fbd6a8a74b.jpeg?w=650',
        price: 20000000,
        stock: null
      })
      .then(response => {
        let { body, status } = response

        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Stock cannot be empty')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Add product failed, minus stock', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Iphone 12',
        image_url: 'https://awsimages.detik.net.id/visual/2020/05/13/4133def8-32d9-4e76-a3fa-f1fbd6a8a74b.jpeg?w=650',
        price: 20000000,
        stock: -20
      })
      .then(response => {
        let { body, status } = response

        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Stock cannot be less than zero')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Add product failed, stock not a number', (done) => {
    request(app)
      .post('/products')
      .set('access_token', access_token)
      .send({
        name: 'Iphone 12',
        image_url: 'https://awsimages.detik.net.id/visual/2020/05/13/4133def8-32d9-4e76-a3fa-f1fbd6a8a74b.jpeg?w=650',
        price: 20000000,
        stock: 'aaaaaaaaa'
      })
      .then(response => {
        let { body, status } = response

        expect(status).toBe(400)
        expect(body).toHaveProperty('error', 'Stock must be a number value')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Add product failed, no access_token', (done) => {
    request(app)
      .post('/products')
      .set('access_token', '')
      .send({
        name: 'Iphone 12',
        image_url: 'https://awsimages.detik.net.id/visual/2020/05/13/4133def8-32d9-4e76-a3fa-f1fbd6a8a74b.jpeg?w=650',
        price: 20000000,
        stock: 20
      })
      .then(response => {
        let { body, status } = response

        expect(status).toBe(401)
        expect(body).toHaveProperty('error', 'Authentication Failed')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  it('Add product failed, not admin', (done) => {
    request(app)
      .post('/products')
      .set('access_token', customer_token)
      .send({
        name: 'Iphone 12',
        image_url: 'https://awsimages.detik.net.id/visual/2020/05/13/4133def8-32d9-4e76-a3fa-f1fbd6a8a74b.jpeg?w=650',
        price: 20000000,
        stock: 20
      })
      .then(response => {
        let { body, status } = response

        expect(status).toBe(403)
        expect(body).toHaveProperty('error', 'Not Authorized')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('Test product GET /products', () => {
  it('Show all product success', (done) => {
      request(app)
      .get('/products')
      .set('access_token', access_token)
      .then(response => {
          let {body, status} = response

          expect(status).toBe(200)
          expect(body.length).toEqual(1)
          done()
      })
      .catch(err => {
          done(err)
      })
  })
  it('Show all product failed, no access_token', (done) => {
      request(app)
      .get('/products')
      .set('access_token', '')
      .then(response => {
          let {body, status} = response

          expect(status).toBe(401)
          expect(body).toHaveProperty('error', 'Authentication Failed')
          done()
      })
      .catch(err => {
          done(err)
      })
  })
})


describe('Test product PUT /products', () => {
  it('Update product success', (done) => {
      request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token)
      .send({
          name: 'Macbook Pro', 
          image_url: 'https://techcrunch.com/wp-content/uploads/2020/05/00100trPORTRAIT_00100_BURST20200506153653558_COVER.jpg?w=1390&crop=1',
          price: 24000000,
          stock: 15
      })
      .then(response => {
          let {body, status} = response
          expect(status).toBe(200)
          expect(body).toHaveProperty('id', expect.any(Number))
          expect(body).toHaveProperty('name', 'Macbook Pro')
          expect(body).toHaveProperty('image_url', 'https://techcrunch.com/wp-content/uploads/2020/05/00100trPORTRAIT_00100_BURST20200506153653558_COVER.jpg?w=1390&crop=1')
          expect(body).toHaveProperty('price', 24000000)
          expect(body).toHaveProperty('stock', 15)
          done()
      })
      .catch(err => {
          done(err)
      })
  })
  it('Update product failed, empty name', (done) => {
      request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token)
      .send({
          name: '', 
          image_url: 'https://techcrunch.com/wp-content/uploads/2020/05/00100trPORTRAIT_00100_BURST20200506153653558_COVER.jpg?w=1390&crop=1',
          price: 24000000,
          stock: 15
      })
      .then(response => {
          let {body, status} = response

          expect(status).toBe(400)
          expect(body).toHaveProperty('error', 'Name cannot be empty')
          done()
      })
      .catch(err => {
          done(err)
      })
  })
  it('Update product failed, emtpy image_url', (done) => {
      request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token)
      .send({
          name: 'Macbook Pro', 
          image_url: '',
          price: 24000000,
          stock: 15
      })
      .then(response => {
          let {body, status} = response

          expect(status).toBe(400)
          expect(body).toHaveProperty('error', 'Image_url cannot be empty')
          done()
      })
      .catch(err => {
          done(err)
      })
  })
  it('Update product failed, empty price', (done) => {
      request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token)
      .send({
          name: 'Macbook Pro', 
          image_url: 'https://techcrunch.com/wp-content/uploads/2020/05/00100trPORTRAIT_00100_BURST20200506153653558_COVER.jpg?w=1390&crop=1',
          price: null,
          stock: 15
      })
      .then(response => {
          let {body, status} = response

          expect(status).toBe(400)
          expect(body).toHaveProperty('error', 'Price cannot be empty')
          done()
      })
      .catch(err => {
          done(err)
      })
  })
  it('Update product failed, minus price', (done) => {
      request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token)
      .send({
          name: 'Macbook Pro', 
          image_url: 'https://techcrunch.com/wp-content/uploads/2020/05/00100trPORTRAIT_00100_BURST20200506153653558_COVER.jpg?w=1390&crop=1',
          price: -24000000,
          stock: 15
      })
      .then(response => {
          let {body, status} = response

          expect(status).toBe(400)
          expect(body).toHaveProperty('error', 'Price cannot be less than zero')
          done()
      })
      .catch(err => {
          done(err)
      })
  })
  it('Update product failed, price not a number', (done) => {
      request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token)
      .send({
          name: 'Macbook Pro', 
          image_url: 'https://techcrunch.com/wp-content/uploads/2020/05/00100trPORTRAIT_00100_BURST20200506153653558_COVER.jpg?w=1390&crop=1',
          price: 'aaaaaaaaaa',
          stock: 15
      })
      .then(response => {
          let {body, status} = response

          expect(status).toBe(400)
          expect(body).toHaveProperty('error', 'Price must be a number value')
          done()
      })
      .catch(err => {
          done(err)
      })
  })
  it('Update product failed, empty stock', (done) => {
      request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token)
      .send({
          name: 'Macbook Pro', 
          image_url: 'https://techcrunch.com/wp-content/uploads/2020/05/00100trPORTRAIT_00100_BURST20200506153653558_COVER.jpg?w=1390&crop=1',
          price: 24000000,
          stock: null
      })
      .then(response => {
          let {body, status} = response

          expect(status).toBe(400)
          expect(body).toHaveProperty('error', 'Stock cannot be empty')
          done()
      })
      .catch(err => {
          done(err)
      })
  })
  it('Update product failed, minus stock', (done) => {
      request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token)
      .send({
          name: 'Macbook Pro', 
          image_url: 'https://techcrunch.com/wp-content/uploads/2020/05/00100trPORTRAIT_00100_BURST20200506153653558_COVER.jpg?w=1390&crop=1',
          price: 24000000,
          stock: -15
      })
      .then(response => {
          let {body, status} = response

          expect(status).toBe(400)
          expect(body).toHaveProperty('error', 'Stock cannot be less than zero')
          done()
      })
      .catch(err => {
          done(err)
      })
  })
  it('Update product failed, stock not a number', (done) => {
      request(app)
      .put(`/products/${id}`)
      .set('access_token', access_token)
      .send({
          name: 'Macbook Pro', 
          image_url: 'https://techcrunch.com/wp-content/uploads/2020/05/00100trPORTRAIT_00100_BURST20200506153653558_COVER.jpg?w=1390&crop=1',
          price: 24000000,
          stock: 'aaaaaaaaa'
      })
      .then(response => {
          let {body, status} = response

          expect(status).toBe(400)
          expect(body).toHaveProperty('error', 'Stock must be a number value')
          done()
      })
      .catch(err => {
          done(err)
      })
  })
  it('Update product failed, no access_token', (done) => {
      request(app)
      .put(`/products/${id}`)
      .set('access_token', '')
      .send({
          name: 'Macbook Pro', 
          image_url: 'https://techcrunch.com/wp-content/uploads/2020/05/00100trPORTRAIT_00100_BURST20200506153653558_COVER.jpg?w=1390&crop=1',
          price: 24000000,
          stock: 15
      })
      .then(response => {
          let {body, status} = response

          expect(status).toBe(401)
          expect(body).toHaveProperty('error', 'Authentication Failed')
          done()
      })
      .catch(err => {
          done(err)
      })
  })
  it('Update product failed, not admin', (done) => {
      request(app)
      .put(`/products/${id}`)
      .set('access_token', customer_token)
      .send({
          name: 'Macbook Pro', 
          image_url: 'https://techcrunch.com/wp-content/uploads/2020/05/00100trPORTRAIT_00100_BURST20200506153653558_COVER.jpg?w=1390&crop=1',
          price: 24000000,
          stock: 15
      })
      .then(response => {
          let {body, status} = response

          expect(status).toBe(403)
          expect(body).toHaveProperty('error', 'Not Authorized')
          done()
      })
      .catch(err => {
          done(err)
      })
  })
})

describe('Test product DELETE /products', () => {
  it('Delete product success', (done) => {
      request(app)
      .delete(`/products/${id}`)
      .set('access_token', access_token)
      .then(response => {
          let {body, status} = response

          expect(status).toBe(200)
          expect(body).toHaveProperty('message', `success delete product with id ${id}`)

          done()
      })
      .catch(err => {
          done(err)
      })
  })
  it('Delete product failed, no access_token', (done) => {
      request(app)
      .delete(`/products/${id}`)
      .set('access_token', '')
      .then(response => {
          let {body, status} = response

          expect(status).toBe(401)
          expect(body).toHaveProperty('error', 'Authentication Failed')
          done()
      })
      .catch(err => {
          done(err)
      })
  })
  it('Delete product failed, not admin', (done) => {
      request(app)
      .delete(`/products/${id}`)
      .set('access_token', customer_token)
      .then(response => {
          let {body, status} = response

          expect(status).toBe(403)
          expect(body).toHaveProperty('error', 'Not Authorized')
          done()
      })
      .catch(err => {
          done(err)
      })
  })
}) 