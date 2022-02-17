const Product = require("../models/product")

exports.dashboard = (req, res)=>{
    Product.getProducts(products=>{
        res.render("dashboard", {pageUrl: "/admin", products})
    })
}

exports.add = (req, res)=>{
    res.render("add", {pageUrl: "/admin/add"})
}

exports.updatePage = (req, res)=>{
    res.render("update", {pageUrl: "/admin/update"})
}

exports.updateWithId = (req, res)=>{
    console.log(req.params);
    const { prodId } = req.params
    Product.getOneProduct(prodId, product =>{
        res.render("update", {pageUrl: "/admin/update", product})
    })
}
