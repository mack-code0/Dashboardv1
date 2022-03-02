const { validationResult } = require("express-validator")
const Product = require("../models/product")

exports.dashboard = (req, res) => {
    Product.getProducts(products => {
        res.render("dashboard", { pageUrl: "/", products })
    })
}

exports.add = (req, res) => {
    res.render("add", { pageUrl: "/add" })
}

exports.updatePage = (req, res) => {
    const error = req.flash("error")
    const errorMessage = error.length > 0 ? error : null

    res.render("update", {
        pageUrl: "/update",
        errorMessage,
        oldInput: { prodId: "" }
    })
}

exports.updateWithId = (req, res) => {
    const { prodId } = req.params
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).render("update", {
            pageUrl: "/update",
            errorMessage: errors.array()[0].msg,
            oldInput: { prodId }
        })
    }

    Product.getOneProduct(prodId, product => {
        if (!product) {
            req.flash("error", "Product was not found!")
            return res.redirect("/updateproduct")
        }
        res.render("update", { pageUrl: "/update", product, errorMessage: "", successMessage: "" })
    })
}
