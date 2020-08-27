const routes = require(`express`).Router()
const {HomeCtr} = require(`../controllers`)

routes.get(`/`, HomeCtr.display)

// Loggin
routes.get(`/login`, HomeCtr.logginForm)
routes.post(`/login/validation`, HomeCtr.loginValidation)

// Logout
routes.get(`/logout`, HomeCtr.logout)

module.exports = routes