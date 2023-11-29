const { Router } = require('express')
const product_controller = require('../controllers/product_controller.js')
const product_router = Router()

product_router.get('/', product_controller.renderIndexPageHandler)
product_router.get('/shoppingcar', product_controller.renderShooppingPageHandler)
product_router.get('/product/:productId', product_controller.renderProductPageHandler)


module.exports = product_router


