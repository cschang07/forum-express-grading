const express = require('express')
const handlebars = require('express-handlebars')
const db = require('./models')
const app = express()
const flash = require('connect-flash')
const session = require('express-session')
const port = 3000

//Set handlebars as the view engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' })) //{ defaultLayout: 'main' } could be ignored since it has become default in handlebars v3.1.0 
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
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
const router = require('./routes')
router(app)

module.exports = app
