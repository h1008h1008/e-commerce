const { Router } = require('express')
const product_controller = require('../controllers/product_controller.js')
const product_router = Router()
const {  validateadminToken} = require("../service/JWT.js");

product_router.get('/', product_controller.renderIndexPageHandler)
product_router.get('/shoppingcar', product_controller.renderShooppingPageHandler)
product_router.get('/product/:productId', product_controller.renderProductPageHandler)
product_router.get('/admin', validateadminToken , product_controller.returnadminHandler)
product_router.get('/admin/:productId',validateadminToken, product_controller.returneditHandler)

module.exports = product_router


