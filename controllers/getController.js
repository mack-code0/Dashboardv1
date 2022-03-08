const { validationResult } = require("express-validator")
const Product = require("../models/product")

exports.dashboard = (req, res, next) => {
    Product.getProducts(next, products => {
        res.render("dashboard", {
            pageUrl: "/",
            pageTitle: "Home",
            products
        })
    })
}

exports.add = (req, res) => {
    const error = req.flash("error")
    const errorMessage = error.length > 0 ? error : null

    res.render("add", {
        pageUrl: "/add",
        pageTitle: "Add Product",
        errorMessage,
        oldInput: { title: "", quantity: "", unitprice: "", description: "", imageurl: "", tag: "", category: "" }
    })
}

exports.updatePage = (req, res) => {
    const error = req.flash("error")
    const errorMessage = error.length > 0 ? error : null

    res.render("update", {
        pageUrl: "/update",
        pageTitle: "Update Product",
        errorMessage,
        oldInput: { prodId: "" }
    })
}

exports.updateWithId = (req, res, next) => {
    const { prodId } = req.params
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).render("update", {
            pageUrl: "/update",
            pageTitle: "Update Product",
            errorMessage: errors.array()[0].msg,
            oldInput: { prodId }
        })
    }

    Product.getOneProduct(next, prodId, product => {
        if (!product) {
            req.flash("error", "Product was not found!")
            return res.redirect("/updateproduct")
        }
        res.render("update", {
            pageUrl: "/update",
            pageTitle: "Update Product",
            product,
            errorMessage: "",
            successMessage: ""
        })
    })
}
