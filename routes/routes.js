const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController.js')
const categoryController = require('../controllers/categoryController.js')
const commentController = require('../controllers/commentController.js')
const helpers = require('../_helpers')
const multer = require('multer')
const passport = require('../config/passport')
const restController = require('../controllers/restController.js')
const userController = require('../controllers/userController.js')
const upload = multer({ dest: 'temp/' })
// const { render } = require('../router.js')


  const authenticated = (req, res, next) => {
    if (helpers.ensureAuthenticated(req)) {
      return next()
    }
    res.redirect('/signin')
  }
  const authenticatedAdmin = (req, res, next) => {
    if (helpers.ensureAuthenticated(req)) {
      if (helpers.getUser(req).isAdmin) { return next() }
      return res.redirect('/')
    }
    res.redirect('/signin')
  }

  router.get('/', authenticated, (req, res) => res.redirect('/restaurants'))
  router.get('/restaurants', authenticated, restController.getRestaurants)
  router.get('/restaurants/:id', authenticated, restController.getRestaurant)

  router.get('/admin', authenticatedAdmin, (req, res) => res.redirect('/admin/restaurants'))
  router.get('/admin/restaurants', authenticatedAdmin, adminController.getRestaurants)
  //create a restaurant
  router.get('/admin/restaurants/create', authenticatedAdmin, adminController.createRestaurant)
  router.post('/admin/restaurants', authenticatedAdmin, upload.single('image'), adminController.postRestaurant)
  //render detail page
  router.get('/admin/restaurants/:id', authenticatedAdmin, adminController.getRestaurant)
  //edit a restaurant
  router.get('/admin/restaurants/:id/edit', authenticatedAdmin, adminController.editRestaurant)
  router.put('/admin/restaurants/:id', authenticatedAdmin, upload.single('image'), adminController.putRestaurant)
  //delete a restaurant
  router.delete('/admin/restaurants/:id', authenticatedAdmin, adminController.deleteRestaurant)
  //render users page
  router.get('/admin/users', authenticatedAdmin, adminController.getUsers)
  //change users' authority
  router.put('/admin/users/:id/toggleAdmin', authenticatedAdmin, adminController.toggleAdmin)

  router.get('/signup', userController.signUpPage)
  router.post('/signup', userController.signUp)

  router.get('/signin', userController.signInPage)
  router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)

  router.get('/logout', userController.logout)

  //render categories page/ add category
  router.get('/admin/categories', authenticatedAdmin, categoryController.getCategories)
  router.post('/admin/categories', authenticatedAdmin, categoryController.postCategory)
  //render category edit page/ edit category
  router.get('/admin/categories/:id', authenticatedAdmin, categoryController.getCategories)
  router.put('/admin/categories/:id', authenticatedAdmin, categoryController.putCategory)
  //delete category
  router.delete('/admin/categories/:id', authenticatedAdmin, categoryController.deleteCategory)

  //comments
  router.post('/comments', authenticated, commentController.postComment)
  router.delete('/comments/:id', authenticatedAdmin, commentController.deleteComment)

  //favorite
  router.post('/favorite/:restaurantId', authenticated, userController.addFavorite)
  router.delete('/favorite/:restaurantId', authenticated, userController.removeFavorite)

  //like
  router.post('/like/:restaurantId', authenticated, userController.addLike)
  router.delete('/like/:restaurantId', authenticated, userController.removeLike)

  //profile
  router.get('/users/:id', authenticated, userController.getUser)
  router.get('/users/:id/edit', authenticated, userController.editUser)
  router.put('/users/:id', authenticated, upload.single('image'), userController.putUser)

module.exports = router