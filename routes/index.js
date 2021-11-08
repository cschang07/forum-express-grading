const restController = require('../controllers/restController.js')
module.exports = app => {

  //if user visits homepage, redirect to /restaurants
  app.get('/', (req, res) => res.redirect('/restaurants'))

  app.get('/restaurants', restController.getRestaurants)
}