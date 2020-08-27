const routes = require(`express`).Router()
const HomeRts = require(`./Home`)
const PublicRts = require(`./Public`)
const ClientRts = require(`./ClientOnly`)
const PsychologistRts = require(`./PsychologistOnly`)
const PsychologistClient = require(`./PsychologistClient`)
const checkAuth = require(`../middlewares/loginValidation`)


routes.use(`/`, HomeRts)
routes.use(`/publics`, PublicRts)
routes.use(`/clients`, ClientRts)
routes.use(`/psychologists`, PsychologistRts)
routes.use(`/psychologistclients`, checkAuth, PsychologistClient)

module.exports = routes