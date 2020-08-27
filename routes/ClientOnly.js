const routes = require(`express`).Router()
const {ClientCtr} = require(`../controllers`)
const checkAuth = require(`../middlewares/loginValidation`)

// Register
routes.get(`/create`, ClientCtr.createForm)
routes.post(`/create`, ClientCtr.create)

// Client Page
routes.get(`/page`, checkAuth, ClientCtr.page)

module.exports = routes