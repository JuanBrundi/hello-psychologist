const routes = require(`express`).Router()
const {PsychologistCtr} = require(`../controllers`)
const checkAuth = require(`../middlewares/loginValidation`)


// Register
routes.get(`/create`, PsychologistCtr.createForm)
routes.post(`/create`, PsychologistCtr.create)

// Psychologist Page
routes.use(checkAuth)
routes.get(`/page`, PsychologistCtr.page)
routes.get(`/answer/:id`, PsychologistCtr.answer)
routes.post(`/answer/:id`, PsychologistCtr.answered)


module.exports = routes