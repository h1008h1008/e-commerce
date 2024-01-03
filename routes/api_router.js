const { Router } = require('express')
const api_controller = require('../controllers/api_controller.js')

const api_router = Router()

api_router.get('/products', api_controller.returnProductHandler)
api_router.post('/update-products', api_controller.updateProductHandler)
api_router.post('/create', api_controller.createHandler)
api_router.post('/update', api_controller.updateHandler)
api_router.post('/delete', api_controller.deleteHandler)
module.exports = api_router
