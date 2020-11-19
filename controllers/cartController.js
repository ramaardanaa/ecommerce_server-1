const { Cart, Product } = require('../models/')

class CartController {
  static async addCart(req, res, next) {
    try {
      let sameCart = false
      const data = {
        ProductId: req.body.ProductId,
        UserId: req.loggedInUser.id,
        quantity: +req.body.quantity
      }
      const cart = await Product.findByPk(data.ProductId)

      if (cart.dataValues.stock < data.quantity) {
        res.status(400).json({ error: "out of stock" })
      } else {
        const carts = await Cart.findAll({
          where: {
            UserId: req.loggedInUser.id,
            status: false
          },
          include: [Product]
        })
        carts.forEach(el => {
          if (el.dataValues.ProductId == data.ProductId) {
            sameCart = true
            const quantity = el.dataValues.quantity + data.quantity
            if (cart.dataValues.stock < quantity) {
              res.status(400).json({ error: "out of stock" })
            } else {
              Cart.update({ quantity }, { where: { id: el.dataValues.id }, returning: true })
                .then(data => {
                  res.status(200).json(data[1][0]);
                })
                .catch(err => {
                  res.status(400).json(err)
                })
            }
          }
        });
        if (sameCart === false) {
          const addCart = await Cart.create(data)
          res.status(201).json(addCart)
        }
      }

    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async showCart(req, res, next) {
    try {
      const cart = await Cart.findAll({
        where: {
          UserId: req.loggedInUser.id,
          status: false
        },
        include: [Product],
        order: [['id','ASC']]
      })
      res.status(200).json(cart);
    } catch (error) {
      next(error)
    }
  }

  static async showCartHistory(req, res, next) {
    try {
      const cart = await Cart.findAll({
        where: {
          UserId: req.loggedInUser.id,
          status: true
        },
        include: [Product]
      })
      res.status(200).json(cart);
    } catch (error) {
      next(error)
    }
  }

  static async updateQuantity(req, res, next) {
    try {
      const id = +req.params.id
      const data = {
        quantity: req.body.quantity
      }
      const productStock = await Cart.findByPk(id, { include: [Product] })
      if (productStock.Product.dataValues.stock < data.quantity) {
        res.status(400).json({ error: "out of stock" })
      } else {
        const cart = await Cart.update(data, { where: { id }, returning: true })
        res.status(200).json(cart[1][0])
      }
    } catch (error) {
      next(error)
    }
  }

  static async checkout(req, res, next) {
    try {
      const data = {
        status: true
      }

      const carts = await Cart.findAll({
        where: {
          UserId: req.loggedInUser.id,
          status:false
        },
        include: [Product]
      })

      carts.map(el => {
        let newStock = el.Product.stock - el.quantity
        Product.update({
          stock: newStock
        }, {
          where: {
            id: el.ProductId
          }
        })
          .then(() => {
            return el
          })
          .catch(err => {
            next(err)
          })
      })
      await Cart.update(data, {
        where: { UserId: req.loggedInUser.id, status: false }
      })

      res.status(200).json({ msg: "success checkout" })
    } catch (error) {
      next(error)
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const id = +req.params.id
      await Cart.destroy({ where: { id } })
      res.status(200).json({ msg: `Success remove product` })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartController