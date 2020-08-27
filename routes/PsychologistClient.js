const routes = require(`express`).Router()
const {PsychologistClientCtr} = require(`../controllers`)
routes.post(`/add/records`, PsychologistClientCtr.addRecord)

module.exports = routes