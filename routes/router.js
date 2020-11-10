const ProductController = require('../controllers/productController')
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

const router = require('express').Router()

router.post("/login",UserController.login)

router.use(authentication)

router.post("/products",authorization, ProductController.addProduct)
router.get("/products", ProductController.showProduct)
router.put("/products/:id", authorization, ProductController.updateProduct)
router.delete("/products/:id",authorization, ProductController.deleteProduct)

module.exports = router