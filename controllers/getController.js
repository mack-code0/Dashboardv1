const Product = require("../models/product")

exports.dashboard = (req, res)=>{
    Product.getProducts(products=>{
        res.render("dashboard", {pageUrl: "/", products})
    })
}

exports.add = (req, res)=>{
    res.render("add", {pageUrl: "/add"})
}

exports.updatePage = (req, res)=>{
    res.render("update", {pageUrl: "/update"})
}

exports.updateWithId = (req, res)=>{
    console.log(req.params);
    const { prodId } = req.params
    Product.getOneProduct(prodId, product =>{
        res.render("update", {pageUrl: "/update", product})
    })
}