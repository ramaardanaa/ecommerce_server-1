const BannerController = require('../controllers/bannerController')
const ProductController = require('../controllers/productController')
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

const router = require('express').Router()

router.post("/login",UserController.login)
router.post("/register", UserController.register)

router.use(authentication)

router.post("/products",authorization, ProductController.addProduct)
router.get("/products", ProductController.showProduct)
router.get("/products/:id", ProductController.showProductById)
router.put("/products/:id", authorization, ProductController.updateProduct)
router.delete("/products/:id",authorization, ProductController.deleteProduct)

router.get("/banners", BannerController.showBanner)
router.post("/banners", authorization, BannerController.addBanner)
router.put("/banners/:id", authorization, BannerController.updateBanner)
router.patch("banners/:id", authorization, BannerController.updateStatus) 
router.delete("/banners/:id",authorization, BannerController.deleteBanner)


module.exports = router