const express = require(`express`)

const routes = require(`./routes`)
const session = require("express-session")

const app = express()
const PORT = 3000

app.set(`view engine`, `ejs`)
app.use(express.urlencoded({ extended:true }))
app.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: true
}))

app.use(routes)

app.listen(PORT, () => console.log(`Listenin on PORT ${PORT}`))