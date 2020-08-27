const {Client, PsychologistClient, Psychologist} = require(`../models`)

class PsychologistClients {
    static addRecord(req, res){
        let data = {
            question: req.body.question,
            PsychologistId: req.body.PsychologistId,
            ClientId: req.session.ClientId
        }
        PsychologistClient.create(data)
            .then(result => {
                res.redirect(`/clients/page`)
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = PsychologistClients