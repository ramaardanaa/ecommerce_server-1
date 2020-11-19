const { Product } = require('../models/');

class ProductController {

  static async addProduct(req, res, next) {
    try {
      let dataProduct = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock,
        UserId: req.loggedInUser.id
      }
      const product = await Product.create(dataProduct)

      res.status(201).json(product);
    } catch (error) {
      next(error)
    }
  }

  static async showProduct(req, res, next) {
    try {
      const product = await Product.findAll({order: [['id','ASC']]})
      res.status(200).json(product);
    } catch (error) {
      next(error)
    }
  }

  static async updateProduct(req, res, next) {
    try {
      let id = +req.params.id
      let dataProduct = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock,
      }
      console.log(dataProduct)
      console.log(id)
      const product = await Product.update(dataProduct, { where: {id}, returning: true })
      res.status(200).json(product[1][0])

    } catch (error) {
      next(error)
    }
  }

  static async deleteProduct(req,res,next){
    
    try{
    let id = +req.params.id
    
    await Product.destroy({where:{id}})

    res.status(200).json({message:`success delete product with id ${id}`})
    }
    catch(err){
      next(error)
    }
  }

  static async showProductById(req,res,next){
    try {
      let id= +req.params.id
      const product = await Product.findByPk(id)
      if(!product){
        throw ({name: "NotFound"})
      }
      res.status(200).json(product);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController