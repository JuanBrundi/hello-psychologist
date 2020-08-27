const {Client, Psychologist} = require(`../models`)
const bcrypt = require(`bcryptjs`)

class Home {
    static display(req, res){
        let success = req.app.locals.success
        delete req.app.locals.success
        res.render(`home`, {success})
    }

    static logginForm(req, res){
        let errors = req.app.locals.errors
        delete req.app.locals.errors
        res.render(`logginForm`, {errors})
    }

    static loginValidation(req, res){
        let role = req.body.role
        if(role === "client"){
            Client.findOne({where: {username: req.body.username}})
            .then(data => {
                    if(data){
                        let flag = bcrypt.compareSync(req.body.password, data.password);
                        if(flag){
                            req.session.client = data.username;
                            req.session.role = data.role;
                            req.session.ClientId = data.id;
                            res.redirect(`/clients/page`)
                        } else {
                            req.app.locals.errors = "Username/Password salah"
                            res.redirect(`/login`)
                        }
                    } else {
                        req.app.locals.errors = "Client belum terdaftar, silakan register terlebih dahulu"
                        res.redirect(`/clients/login`)
                    }
                })
                .catch(err => {
                    console.log(err)
                    req.app.locals.errors = "Username/Password salah"
                    res.redirect(`/login`)
                })
        } else {
            Psychologist.findOne({where: {username: req.body.username}})
                .then(data => {
                    if(data){
                        let flag = bcrypt.compareSync(req.body.password, data.password);
                    if(flag){
                        req.session.client = data.username;
                        req.session.role = data.role;
                        req.session.PsychologistId = data.id;
                        res.redirect(`/psychologists/page`)
                    } else {
                        req.app.locals.errors = "Username/Password salah"
                        res.redirect(`/login`)
                    }
                    } else {
                        req.app.locals.errors = "Client belum terdaftar, silakan register terlebih dahulu"
                        res.redirect(`/login`)
                    }
                })
                .catch(err => {
                    console.log(err)
                    req.app.locals.errors = "Username/Password salah"
                    res.redirect(`/clients/login`)
                 })
        }
    }

    static logout(req, res){
        req.session.destroy((err) => {
            if(err){
                console.log(err)
                res.send(err)
            }else{
                res.redirect(`/`)
            }
        })
    }
}

module.exports = Home