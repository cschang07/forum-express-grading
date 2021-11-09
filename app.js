const express = require('express')
const handlebars = require('express-handlebars')
const db = require('./models')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')

const app = express()
const port = 3000


//Set handlebars as the view engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' })) //{ defaultLayout: 'main' } could be ignored since it has become default in handlebars v3.1.0 
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true })) //body-parser
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//1. Requires routes 2. Assigns "app" arg, so that the routes could use the object "app" to assign routes. 
require('./routes')(app, passport)

module.exports = app
