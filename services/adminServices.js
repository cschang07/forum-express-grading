const db = require('../models')
const Category = db.Category
const fs = require('fs')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
const Restaurant = db.Restaurant
const User = db.User

const adminService = {
  getRestaurants: (req, res, callback) => {
    return Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category]
    }).then(restaurants => {
      callback({ restaurants: restaurants })
    })
  },
  getRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id, {
      include: [Category]
    }).then(restaurant => {
      // console.log(restaurant)// 加入 console 觀察資料的變化
      // return res.render('admin/restaurant', {
      //   restaurant: restaurant.toJSON()
      // })
      callback({restaurant: restaurant.toJSON()})
    })
  },
}

module.exports = adminService