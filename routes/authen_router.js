const { Router } = require('express')
const auth_controller = require('../controllers/auth_controller.js')
const {  validateToken } = require("../service/JWT.js");
const authen_router = Router()

authen_router.get('/login', auth_controller.renderLoginPageHandler)
authen_router.post('/login', auth_controller.LoginHandler)
authen_router.get('/logout', auth_controller.renderlogoutPageHandler)
authen_router.get('/register', auth_controller.renderRegisterPageHandler)
authen_router.post('/register', auth_controller.RegisterPageHandler)
authen_router.get('/forget', auth_controller.renderforgetPageHandler)
authen_router.post('/forget', auth_controller.forgetHandler)
authen_router.get('/reset',  auth_controller.renderResetPageHandler)
authen_router.post('/reset', auth_controller.RegisterPageHandler)
authen_router.get('/profile', validateToken, auth_controller.renderprofilePageHandler);

module.exports = authen_router