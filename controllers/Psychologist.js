const {Psychologist, PsychologistClient, Client} = require(`../models`)
const PsychologistClients = require("./PsychologistClient")
const nodemailer = require('nodemailer');

class Psychologists {
    static createForm(req,res){
        let errors = req.app.locals.errors
        delete req.app.locals.errors
        res.render(`psychologistCreateForm`, {errors})
    }

    static create(req, res){
        let data = {
            name: req.body.name,
            specialist: req.body.specialist,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        Psychologist.create(data)
            .then(() => {
                req.app.locals.success = "Create new account success. Please login"
                res.redirect(`/`)
            })
            .catch(err => {
                console.log(err)
                let errors = []
                err.errors.forEach(datum => {
                    errors.push(datum.message)
                })
                req.app.locals.errors = errors
                res.redirect(`/psychologists/create`)
            })
    }

    static page(req, res){
        let answer = req.app.locals.answer
        delete req.app.locals.answer

        let clientQuestionId = req.app.locals.cliId
        delete req.app.locals.cliId

        PsychologistClient.findAll({where: {PsychologistId: req.session.PsychologistId}, include: [Client, Psychologist]})
            .then(data => {
                // res.send(data)
                console.log(data)
                res.render(`psychologistPage`, {data, answer, cliId: clientQuestionId})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static answer(req, res){
        req.app.locals.answer = true
        req.app.locals.cliId = req.params.id
        res.redirect(`/psychologists/page`)
    }

    static answered(req, res){
        let answered = req.body.answer

        PsychologistClient.update({answer: answered},{where: {id: req.params.id}})
            .then(data => {
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'juanbrundism@gmail.com',
                        pass: 'juankokgagah123'
                    }
                  });

                let config = {
                    from: 'juanbrundism@gmail.com',
                    to: 'pao@mailinator.com',
                    subject: 'Jawaban',
                    text: 'Menurut Saya'
                }

                transporter.sendMail(config, (err, success) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/psychologists/page`)
                        console.log('Email Sent: ', success.response )
                    }
                })
            })
            .catch(err => {
                res.send(err)
            })
    }


}

module.exports = Psychologists