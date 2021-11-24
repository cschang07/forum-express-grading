const db = require('../../models')
const categoryService = require('../../services/categoryService')
const Category = db.Category

const categoryController = {
  getCategories: (req, res) => {
    // return Category.findAll({
    //   raw: true,
    //   nest: true
    // }).then(categories => {
    //   if (req.params.id) {
    //     Category.findByPk(req.params.id)
    //       .then((category) => {
    //         return res.json({
    //           categories: categories,
    //           category: category.toJSON()
    //         })
    //       })
    //   } else {
    //     return res.json({ categories: categories })
    //   }
    // })
    categoryService.getCategories(req, res, (data) => {
      return res.json(data)
    })
  },
}
module.exports = categoryController