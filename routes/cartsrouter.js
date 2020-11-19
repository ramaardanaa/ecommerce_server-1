const router = require('express').Router()
const CartController = require('../controllers/cartController')
const {customerAuthentication} = require('../middlewares/authentication')

router.use(customerAuthentication)
router.get("/", CartController.showCart)
router.get("/history", CartController.showCartHistory)
router.post("/", CartController.addCart)
router.put("/:id", CartController.updateQuantity)
router.delete("/:id", CartController.deleteCart)
router.patch("/", CartController.checkout)

module.exports = router