const { validationResult } = require("express-validator")
const Product = require("../models/product")

exports.insertProduct = (req, res, next) => {
    const { title, quantity, unitprice, description, imageurl, tag, category } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).render("add", {
            pageUrl: "/add",
            errorMessage: errors.array()[0].msg,
            oldInput: { title, quantity, unitprice, description, imageurl, tag, category }
        })
    }

    const NewProduct = new Product(title, quantity, unitprice, description, imageurl, tag, category)
    NewProduct.save(next, null, null, cb => {
        res.redirect("/insertproduct")
    })
}

exports.updateProduct = (req, res, next) => {
    const { title, quantity, unitprice, description, imageurl, prodId, tag, category, oldprice } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).render("update", {
            pageUrl: "/update",
            errorMessage: errors.array()[0].msg,
            oldInput: { prodId }
        })
    }

    const updateProduct = new Product(title, quantity, unitprice, description, imageurl, category, tag)
    updateProduct.save(next, prodId, oldprice, cb => {
        res.redirect("/")
    })
}

exports.deleteProduct = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.redirect("/")
    }
    Product.deleteProduct(next, req.body.prodId, cb => {
        res.json({ success: "Done" })
    })
} 