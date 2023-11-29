const { Router } = require('express')
const api_controller = require('../controllers/api_controller.js')

const api_router = Router()

api_router.get('/products', api_controller.returnProductHandler)
api_router.post('/update-products', api_controller.updateProductHandler)

module.exports = api_router
