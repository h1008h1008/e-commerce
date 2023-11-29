const { Router } = require('express')
const pay_controller = require('../controllers/pay_controller.js')

const pay_router = Router()

pay_router.get('/checkout',  pay_controller.renderpaymentPageHandler);
pay_router.post('/return',  pay_controller.ReturnHandler);
pay_router.get('/clientReturn',  pay_controller.renderReturnPageHandler);

module.exports = pay_router
