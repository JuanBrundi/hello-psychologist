module.exports = (req, res, next) => {
    if(req.session.client){
        next()
    } else {
        req.app.locals.errors = "Unauthorized! Silakan login terlebih dahulu"
        res.redirect(`/login`)
    }
}