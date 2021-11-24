const db = require('../../models')
const Category = db.Category
// const categoryService = require('../../services/categoryServices')

const categoryController = {
  getCategories: (req, res) => {
    return Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      if (req.params.id) {
        Category.findByPk(req.params.id)
          .then((category) => {
            return res.json({
              categories: categories,
              category: category.toJSON()
            })
          })
      } else {
        return res.json({ categories: categories })
      }
    })
  },
  // getRestaurant: (req, res) => {
  //   return Restaurant.findByPk(req.params.id, {
  //     include: [Category]
  //   }).then(restaurant => {
  //     return res.json({ restaurant: restaurant.toJSON() })
  //   })
  // },
}
module.exports = categoryController