const {Client, PsychologistClient, Psychologist} = require(`../models`)

console.log('CLIENT =====================', Client)
class Clients {
    static createForm(req,res){
        let errors = req.app.locals.errors
        delete req.app.locals.errors
        res.render(`clientCreateForm`, {errors})
    }

    static create(req, res){
        let data = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        Client.create(data)
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
                res.redirect(`/clients/create`)
            })
    }

    static loginValidation(req, res){
        Client.findOne({where: {username: req.body.username}})
            .then(data => {
                if(data){
                    let flag = bcrypt.compareSync(req.body.password, data.password);
                    if(flag){
                        req.session.client = data.username;
                        req.session.role = data.role;
                        res.redirect(`/clients/page`)
                    } else {
                        req.app.locals.errors = "Username/Password salah"
                        res.redirect(`/clients/login`)
                    }
                } else {
                    req.app.locals.errors = "Client belum terdaftar, silakan register terlebih dahulu"
                    res.redirect(`/clients/login`)
                }
            })
            .catch(err => {
                console.log(err)
                req.app.locals.errors = "Username/Password salah"
                res.redirect(`/clients/login`)
            })
    }

    static page(req, res){
        let clientData, mixed
        Client.findOne({where: {username: req.session.client}})
            .then(data => {
                clientData = data
                return PsychologistClient.findAll({where: {ClientId: clientData['id']}, include: [Client, Psychologist]})
            })
            .then(data => {
                mixed = data
                return Psychologist.findAll()
            })
            .then(data => {
                res.render(`clientPage`, {clientData, mixed, psychologistData: data})
            })
            .catch(err => {
                console.log(err)
            })
    }

}

module.exports = Clients