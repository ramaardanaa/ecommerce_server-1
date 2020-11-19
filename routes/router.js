const BannerController = require('../controllers/bannerController')
const ProductController = require('../controllers/productController')
const UserController = require('../controllers/userController')
const {adminAuthentication} = require('../middlewares/authentication')
const {adminAuthorization} = require('../middlewares/authorization')
const cartrouter = require('./cartsrouter')
const router = require('express').Router()

router.post("/login",UserController.login)
router.post("/register", UserController.register)

router.get("/banners", BannerController.showBanner)
router.get("/products", ProductController.showProduct)
router.use("/carts", cartrouter)

router.use(adminAuthentication)

router.post("/products",adminAuthorization, ProductController.addProduct)
router.get("/products/:id", ProductController.showProductById)
router.put("/products/:id", adminAuthorization, ProductController.updateProduct)
router.delete("/products/:id",adminAuthorization, ProductController.deleteProduct)


router.post("/banners", adminAuthorization, BannerController.addBanner)
router.put("/banners/:id", adminAuthorization, BannerController.updateBanner)
router.patch("banners/:id", adminAuthorization, BannerController.updateStatus) 
router.delete("/banners/:id",adminAuthorization, BannerController.deleteBanner)

module.exports = router